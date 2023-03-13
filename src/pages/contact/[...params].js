import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Box, Button,CircularProgress, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import LoanApplicationTypePopup from "../../components/LoanApplicationTypePopup";

import  ApplicationFields  from "../../components/applicationFields/ApplicationFields.js" 
import ApplicantFields from "../../components/applicationFields/ApplicantFields.js"
import CoApplicantFields from "../../components/applicationFields/CoApplicantFields";
import ApplicationMainFields from "../../components/applicationFields/ApplicationMainFields";

import { _gatLoanType } from "../../services/loanTypeService.js";
import { _addHistory } from "../../services/applicationHistory.js";
import { _addApplication } from "../../services/applicationService.js";
import { _getAutoAssignMember } from "../../services/common.js";
import { _addContact, _fetchAllContacts, _fetchContactById, _updateContactById } from "../../services/contactServices";
import { _gatVariabels } from "../../services/variabelService.js";
function AddNewContact() {
  const router = useRouter();
  const id = router.query.params[0];
  const applicationProductId = router.query.params[1];
  const coEnabled = router.query.params[2];
  const [loading, setLoading] = useState(false);
  const [variableData, setVariableData] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [addedUserId, setAddedUserId] = useState();
  const [LoanTypes, setLoanTypes] = useState([]);
  const [selectedApplicant,setSelectedApplicant] = useState("");
  const [selectedCoApplicant,setSelectedCoApplicant] = useState("");
  const [applicant,setApplicant] = useState({});
  const [coApplicant,setCoApplicant] = useState({});
  const [applicationDetails,setApplicationDetails] = useState({});
  const [applicationMainData,setApplicationMainData] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if(id == "addApplication"){
      fetchAllContacts();
      getVariables();
      getLoanType();
    }
  }, [id, router.pathname]);

  const addApplicant =async()=>{
    const body = {
      basicInformation: applicant,
    };
    const res = await _addContact(body);
    if(res?.status == 200 || 201){
      router.push(`/contact`);
    }else{
      setError("Contact adding failed!")
    }
  }

  const getLoanType = async () => {
    try {
      const res = await _gatLoanType();
      console.log("getLoanType",res)
      setLoanTypes(res?.data?.data?.Items)
    } catch (err) {
      console.log(err)
    }
  };

  const getVariables = async () => {
    try {
      const res = await _gatVariabels();
      let data = await res?.data?.data?.Items?.filter(
        (variable) => variable?.variableType == "contact"
      );
      data = await data.sort((a, b) =>
        a.createTime > b.createTime ? 1 : b.createTime > a.createTime ? -1 : 0
      );
      console.log(res);
      setVariableData([...data]);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllContacts = async () => {
    try {
      const res = await _fetchAllContacts();
      setContactList(res?.data?.Items ? res?.data?.Items : []);
    } catch (err) {
      console.log(err);
    }
  };

  const addApplication = async () =>{
    let contactIds = [];
    let cocontactIds = []

    try{
      if (!applicationMainData?.loanAmount || applicationMainData?.loanAmount == "" || applicationMainData?.loanAmount == null ) {
        setError('Amount can not be empty !')
      }else{
        const applicantData = {
          basicInformation: applicant,
        };
        if(!selectedApplicant || selectedApplicant == "" || selectedApplicant == null || selectedApplicant == undefined){
          const responseContact = await _addContact(applicantData);
          contactIds.push(responseContact?.data?.ID)
          console.log("responseContact",responseContact)
        }else{
          contactIds.push(selectedApplicant)
        }
        if(router.query.params[2] == "coEnabled"){
          if(!selectedCoApplicant || selectedCoApplicant == "" || selectedCoApplicant == null || selectedCoApplicant == undefined){
            const coApplicantData = {
              basicInformation: coApplicant,
            };
            const responseCoContact = await _addContact(coApplicantData);
            cocontactIds.push(responseCoContact?.data?.ID)
          }else{
            cocontactIds.push(selectedCoApplicant)
          }
        }
  
    
       
          const auto_member = await _getAutoAssignMember();
          const activeMember = auto_member?.data?.activeMember
          let addmember = auto_member?.data?.members;
  
          if (auto_member?.data?.type === 1) addmember = [state?.user?.info?.email];
          if (auto_member?.data?.type === 2) {
            const newActiveMember = activeMember !== null ? activeMember === addmember.length ? 0 : activeMember + 1 : 0
            const body = {
              activeMember: newActiveMember
            }
            _setActiveMember(body);
            addmember = [addmember[newActiveMember]];
          }
  
          let body = {
            productId: applicationProductId,
            contactId: [...contactIds],
            status_: "New Applications",
            coContact: [...cocontactIds],
            members: addmember || [],
            applicationBasicInfo:{
              loan_amount : applicationMainData?.loanAmount,
              referralSource: applicationMainData?.ref,
              //offerCode:offerCode, 
            },
            aditionalInfo:{}
          }
          console.log("body",body)
          const res = await _addApplication(body)
          console.log("_addApplication",res?.response?.status == 400)
          if(res?.status == 200){
            let history = {
              action: "Application Created",
              description: `The application for ${applicantData?.firstName} ${applicantData?.lastName} was created`,
              applicationId: res?.data?.applicationId
            }
            const resHistory = await _addHistory(history)
            console.log("resHistory",resHistory)
            if(res?.status == 200 && resHistory?.status == 200){
              setError('')
              router.push(`/application/application-form-data?cocontact=${cocontactIds[0]}&contact=${contactIds[0]}&compaign=${applicationProductId}&applicationId=${res?.data?.applicationId}`);
            }
          }else if(res?.response?.status == 400){
            setError(`${res?.response?.data?.message}`)
          }else{
            setError('Application creation is failed')
          }
      }
    }catch(err){
      console.log(err)
    }
  }

  const handlePopupClose = () => {
    setPopupOpen(false);
  };
  return (
    <>
      <LoanApplicationTypePopup
        popupOpen={!applicationProductId && popupOpen}
        userId={addedUserId}
        handleClose={handlePopupClose}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <div style={{ backgroundColor: "#fff" }}>
          <Box style={{ paddingBottom: 40 }}>
            <Grid container>
              {applicationProductId ? (
                <Grid
                  item
                  xs={12}
                  md={6}
                  p={2}
                  mb={0}
                  style={{ marginTop: 50 }}
                >
                  <h1 className="page_header">Application Form</h1>
                </Grid>
              ) : (
                <Grid
                  item
                  xs={12}
                  md={6}
                  p={2}
                  mb={5}
                  style={{ marginTop: 50 }}
                >
                  <h1 className="page_header">
                    {id === "add" ? "Add" : "Update"} Contact
                  </h1>
                </Grid>
              )}
            </Grid>
                {id == "addApplication" && <ApplicationFields
                  setData={setApplicationDetails} 
                  compaigns={LoanTypes} 
                  Selected={applicationProductId}
                />}
                
                <ApplicantFields
                  setSelect={setSelectedApplicant}
                  contactList={contactList}   
                  addApplicationFlag={id}  
                  setContactData={setApplicant}
                />

                {coEnabled == "coEnabled" && id == "addApplication" &&
                  <CoApplicantFields 
                  contactList={contactList} 
                  setContactData={setCoApplicant}
                  setSelect={setSelectedCoApplicant}
                  addApplicationFlag={id}  
                />} 
                {id == "addApplication" && <ApplicationMainFields 
                  setData={setApplicationMainData}
                />}
            <Grid
              container
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid item xs={6}>
                <Stack direction="column" spacing={2} m={2}></Stack>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Stack direction="column" spacing={2} mx={2.5}>
                <p style={{ color: "red" }}>{error}</p>
              </Stack>
            </Grid>
            <div
              style={{
                marginBottom: 100,
                display: "flex",
                justifyContent: "left",
                padding: 20,
              }}
            >
               {id == "addApplication" &&<Button variant="contained" onClick={addApplication}>
                ADD APPLICATION
              </Button>}
              {id == "add" &&<Button variant="contained" onClick={addApplicant}>
                ADD CONTACT
              </Button>}
              
            </div>
          </Box>
        </div>
      )}
    </>
  );
}

AddNewContact.layout = "AdminLayout";

export default AddNewContact;
