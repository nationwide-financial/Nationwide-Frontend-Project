import React, { useState, useEffect, useCallback, useContext } from "react";
import { Box, Button, Grid,TextField,Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import { useRouter } from "next/router";
import { _addApplication } from '../../services/applicationService.js'
import { _addHistory } from '../../services/applicationHistory.js'
import { _fetchSingleContacts } from '../../services/contactServices.js'
import { _gatVariabels } from '../../services/variabelService.js';
import { Context } from "../../context";
import {_getAutoAssignMember, _setActiveMember} from '../../services/common.js'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function ApplicationDetails() {
  const { state, dispatch} = useContext(Context);
  const router = useRouter();
  const [variable, setVariable] = useState([]);
  const [aditionalInfo, setAditionalInfo] = useState({});
  const [amount, setAmount] = useState('');
  const [offerCode, setOfferCode] = useState('');
  const [product, setProduct] = useState('');
  const [contactIds, setContactIds] = useState([]);
  const [cocontactIds, setCoContactIds] = useState([]);
  const [referralSource, setReferralSource] = useState('');
  const [error, setError] = useState('');

  const profile = state?.user || {}
  
  const getVariables = async () => {
    try {
      const res = await _gatVariabels();
      let data = await res?.data?.data?.Items.filter((variable) => variable?.variableType == "application")
      data = await data.sort((a, b) => (a.createTime > b.createTime) ? 1 : ((b.createTime > a.createTime) ? -1 : 0));
      console.log(res)
      setVariable([...data])
    } catch (err) {
      console.log(err)
    }
  }

  const onChangeHandler = useCallback(
    ({ target }) => {
      setAditionalInfo((state) => ({ ...state, [target.name]: target.value }));
    }, []
  );

  const handleCreateApplication = async () => {
    if (!amount || amount == "" || amount == null ) {
      setError('Amount can not be empty !')
    } else if (!referralSource || referralSource == "" || referralSource == null) {
      setError('Referral Source can not be empty !')
    } else if (!contactIds || contactIds == [] || referralSource == null) {
      setError('ContactIds can not be empty !')
    } else if (!product || product == '' || product == null) {
      setError('Loan type can not be empty !')
    } else {
      setError('')
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
      const contactDetails = await _fetchSingleContacts(contactIds[0])
      let constactFname = contactDetails?.data?.Item?.basicInformation?.firstName;
      let contactLname = contactDetails?.data?.Item?.basicInformation?.lastName;
      // console.log("contactDetails*****",contactDetails)
      // console.log("cocontactIds----------", cocontactIds)
      let body = {
        productId: product,
        contactId: [...contactIds],
        status_: "New Applications",
        coContact: [...cocontactIds],
        members: addmember || [],
        applicationBasicInfo:{
          loan_amount : amount,
          referralSource: referralSource,
          //offerCode:offerCode, 
        },
        aditionalInfo:{...aditionalInfo}

      }
      //console.log("body",body)
      const res = await _addApplication(body)
      let history = {
        action: "Application Created",
        description: `The application for ${constactFname} ${contactLname} was created`,
        applicationId: res?.data?.applicationId
      }
      const resHistory = await _addHistory(history)
     
      if (res?.status == 200 && resHistory?.status == 200 && contactDetails?.status == 200) {
        router.push("/application/dashbord");
      } else {
        setError('some thing worng!')
      }
      console.log("_addApplication", res)
    }
  };

  const inputValidations =  (application) =>{
    let error = "";
    for (const [key, val] of Object.entries({ ...application})) {
      if (val.length === 0 || val === '') {
        setError("Required field cannot be empty!");
        error = "Required field cannot be empty!";
      } else{
        setError();
      }
    }
    if(Object.keys(application).length < variable.length) {
      setError("Missing required fields");
      error = "Missing required fields";
    }
    return error;
  }

  // const handleCreateApplication = async () => {
  //   let inputErrors = await inputValidations(application);
  //   if (inputErrors) {
  //     setError(inputErrors);
  //   }
  //   if(!inputErrors){
  //     const contactDetails = await _fetchSingleContacts(contactIds[0]);
  //     let constactFname = contactDetails?.data?.Item?.basicInformation?.firstName;
  //     let contactLname = contactDetails?.data?.Item?.basicInformation?.lastName;
  //     let body = {
  //       productId: product,
  //       contactId: [...contactIds],
  //       loanAmount: amount,
  //       referralSource: referralSource,
  //       status_: "New Applications",
  //       coContact: [...cocontactIds],
  //       members: [],
  //       applicationBasicInfo: { ...application },
  //     };
  //     const res = await _addApplication(body);
  //     let history = {
  //       action: "Application Created",
  //       description: `The application for ${constactFname} ${contactLname} was created`,
  //       applicationId: res?.data?.applicationId,
  //     };
  //     const resHistory = await _addHistory(history);
  //     if (
  //       res?.status == 200 &&
  //       resHistory?.status == 200 &&
  //       contactDetails?.status == 200
  //     ) {
  //       router.push("/application/application-table-view");
  //     } else {
  //       setError("some thing worng!");
  //     }
  //   }
  // };


  useEffect(() => {

    async function getData() {
      if (!router.isReady) return;
      const query = router.query;
      let contactString = query?.contact;
      let cocontactString = query?.cocontact;
      let ids = await contactString ? contactString.split("S") : [];
      let cocontactIds = await cocontactString ? cocontactString.split("S") : [];
      getVariables();
      setProduct(query.product);
      setContactIds([...ids])
      setCoContactIds([...cocontactIds])
    }
    getData()
  }, [router.isReady, router.query]);
  return (
    <div>
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <Item style={{ height: 800 }}>
              <Grid m={4}>
                <Typography
                  align="left"
                  variant="h5"
                  fontWeight={700}
                  fontSize={45}
                >
                  Application Form
                </Typography>
                <Typography align="left">Personal Loan</Typography>

                <Grid container mt={2}>
                  <Grid xs={12}>
                    <Typography align="left" fontWeight={700} fontSize={25}>
                      Application Details
                    </Typography>
                  </Grid>
                  <Grid xs={12} mt={2}>
                    <Typography align="left" fontWeight={700} fontSize={20}>
                      Basic Information
                    </Typography>
                  </Grid>
                </Grid>

                <Box sx={{ minWidth: 275, marginTop: 2 }}>
                  <Grid container spacing={2}>
                     <Grid item xs={6}>
                      <FormControl
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <label>
                          {" "}
                          <Typography
                            align="left"
                            variant="h6"
                            style={{
                              fontSize: 17,
                              fontWeight: 700,
                              fontStyle: "normal",
                            }}
                          >
                            Loan amount{" "}
                            <span style={{ color: "#FF0000" }}>*</span>
                          </Typography>
                        </label>
                        <Box sx={{ maxWidth: "100%" }}>
                          <TextField
                            fullWidth
                            autoFocus
                            size="small"
                            type="number"
                            margin="normal"
                            id="outlined-basic"
                            variant="outlined"
                            value={amount}
                            onChange={(e)=>{
                              setAmount(e.target.value)
                            }}
                          />
                        </Box>
                      </FormControl>
                    </Grid>
              
                    <Grid item xs={6}>
                      <FormControl
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <label>
                          {" "}
                          <Typography
                            align="left"
                            variant="h6"
                            style={{
                              fontSize: 17,
                              fontWeight: 700,
                              fontStyle: "normal",
                            }}
                          >
                            Referral Source{" "}
                            <span style={{ color: "#FF0000" }}>*</span>
                          </Typography>
                        </label>
                        <Box sx={{ maxWidth: "100%" }}>
                          <TextField
                            fullWidth
                            autoFocus
                            size="small"
                            margin="normal"
                            id="outlined-basic"
                            variant="outlined"
                            value={referralSource}
                            onChange={(e)=>{
                              setReferralSource(e.target.value)
                            }}
                          />
                        </Box>
                      </FormControl>
                    </Grid>
                    {/* <Grid item xs={6}>
                      <FormControl
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <label>
                          {" "}
                          <Typography
                            align="left"
                            variant="h6"
                            style={{
                              fontSize: 17,
                              fontWeight: 700,
                              fontStyle: "normal",
                            }}
                          >
                            Offer code {" "}
                           
                          </Typography>
                        </label>
                        <Box sx={{ maxWidth: "100%" }}>
                          <TextField
                            fullWidth
                            autoFocus
                            size="small"
                            type="text"
                            margin="normal"
                            id="outlined-basic"
                            variant="outlined"
                            value={offerCode}
                            onChange={(e)=>{
                              setOfferCode(e.target.value)
                            }}
                          />
                        </Box>
                      </FormControl>
                    </Grid> */}
                  </Grid>
                  <Grid container spacing={2}>
                  {variable && variable.map((variable, key)=>{
                      return(<Grid item xs={6} key={key}>
                        <FormControl
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <label htmlFor="outlined-adornment-amount">
                            {" "}
                            <Typography
                              align="left"
                              variant="h6"
                              style={{
                                fontSize: 17,
                                fontWeight: 700,
                                fontStyle: "normal",
                              }}
                            >
                              {variable?.displayName}
                             
                            </Typography>
                          </label>
                          <Box sx={{ maxWidth: "100%" }}>
                            {/* <OutlinedInput
                              fullWidth
                              size="small"
                              id="outlined-adornment-amount"
                              startAdornment={
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              }
                              value={application && application[`${variable?.systemName}`]}
                              onChange={onChangeHandler}
                            /> */}
                            <TextField
                            fullWidth
                            name={variable?.systemName}
                            type={variable.dataType} 
                            size="small"
                            margin="normal"
                            id="outlined-basic"
                            variant="outlined"
                            value={aditionalInfo && aditionalInfo[`${variable?.systemName}`]}
                            onChange={onChangeHandler}
                          />
                          </Box>
                        </FormControl>
                      </Grid>)
                    })}
                    <p style={{ color: 'red',marginLeft:16 }}>{error}</p>
                  </Grid>

                  <Grid container mt={5}>
                    <div
                      style={{
                        marginBottom: 100,
                        display: "flex",
                        justifyContent: "left",
                      }}
                    >
                      <Button
                        variant="outlined"
                        onClick={()=>{router.back()}}
                        style={{ textTransform: "capitalize", fontSize: 16, fontWeight: 700 , marginRight:10}}
                      >
                        Go Back
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleCreateApplication}
                        style={{ textTransform: "capitalize", fontSize: 16, fontWeight: 700 }}
                      >
                        Create Application
                      </Button>
                    </div>
                  </Grid>
                </Box>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

ApplicationDetails.layout = "AdminLayout";

export default ApplicationDetails;
