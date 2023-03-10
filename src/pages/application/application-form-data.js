import React, { useEffect, useState, useCallback } from "react";
import { Box, Button, Grid, Typography, Autocomplete } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import { TextField } from "@mui/material";
import { _gatSingleLoanType } from '../../services/loanTypeService.js'
import { _fetchContactById, _updateContactById } from '../../services/contactServices.js'
import { _gatVariabels } from '../../services/variabelService.js';
import { MobileDatePicker } from '@mui/x-date-pickers';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { getDate } from "../../utils/utils.js"; 

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function ApplicationFormData() {
  const router = useRouter();
  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const [message,setMessage] =useState('');
  const handleSuccessMessage = () => {
    setOpenSuccessMessage(true);
  };

  const handleCloseSuccessMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessage('')
    setOpenSuccessMessage(false);
  };

  const [loanType, setLoanType] = useState("");
  const [contactStr, setContactStr] = useState("");

  const [contactId, setcontactId] = useState('');
  const [cocontactId, setcocontactId] = useState([]);
  

 // application edit 
 const [submitErr, setSubmitErr] = useState("");
  const [switchEditMode, setSwitchEditMode] = useState(false);
  const [contact, setContact] = useState({});
  const [contactEdit, setContactEdit] = useState({});
  const [applicationId,setApplicationId] = useState("");
  console.log("contactEdit",contactEdit)

  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [province, setProvince] = useState("");
 // const [country, setCountry] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [additionalInfomations, setAdditionalInfomations] = useState({})

  const languages = ["English","Spanish","Russian","French"]
  const bestTimes = [
    "6.00 AM - 7.00 AM",
    "7.00 AM - 8.00 AM",
    "8.00 AM - 9.00 AM",
    "9.00 AM - 10.00 AM",
    "11.00 AM - 12.00 AM",
    "12.00 AM - 1.00 PM",
    "2.00 PM - 3.00 PM",
    "3.00 PM - 4.00 PM",
    "6.00 PM - 5.00 PM",
    "5.00 PM - 6.00 PM",
  ]
  const timeZones = ["timeZones","timeZones","timeZones"]
  const creditReportTypes = ["type 01","type 02"]
  const maritalStatusData=["Divorced", "Separated", "Widowed","Never Married"]
  const employmentStatusData =["self employed","part time","full time"]
  
  const handelSubmitContact = async (id) => {
    console.log("96",id)
    try {
        let body = {
          basicInformation: contactEdit || {}
        };
        const res = await _updateContactById(id, body);
        console.log("_updateContactById", res);
        if (res?.status == 200) {
          handleSuccessMessage()
          setMessage("Updated")
          setSwitchEditMode((switchEditMode) => !switchEditMode);
          getContactData(contactId);
        }
      
    } catch (err) {
      console.log(err);
    }
  };

  const handleContinue = (product, contact) => {
    // let string = cocontactId.join('S')
    // cocontactId.length > 0 ? router.push(`/application/application-details?product=${product}&contact=${contact}&cocontact=${string}`) : router.push(`/application/application-details?product=${product}&contact=${contact}`)
   if(applicationId) router.push(`/application/applications-data?applicationId=${applicationId}`)

  };

  const handleChange = (param, event) => {
    console.log(param, event)
    //setError("");
    switch (param) {
      case "firstName": {
        setContactEdit({ ...contactEdit, firstName: event.target.value });
        break;
      }
      case "lastName": {
        setContactEdit({ ...contactEdit, lastName: event.target.value });
        break;
      }
      case "middleInitial": {
        setContactEdit({ ...contactEdit, middleInitial: event.target.value });
        break;
      }
      case "otherName": {
        setContactEdit({ ...contactEdit, otherName: event.target.value });
        break;
      }
      case "emailAddress": {
        setContactEdit({ ...contactEdit, emailAddress: event.target.value });
        break;
      }
      case "homePhoneNumber": {
        setContactEdit({ ...contactEdit, homePhoneNumber: event.target.value });
        break;
      }
      case "mobilePhoneNumber": {
        setContactEdit({ ...contactEdit, mobilePhoneNumber: event.target.value });
        break;
      }
      case "work": {
        setContactEdit({ ...contactEdit, work: event.target.value });
        break;
      }
      case "fax": {
        setContactEdit({ ...contactEdit, fax: event.target.value });
        break;
      }
      case "address1": {
        setContactEdit({ ...contactEdit, address1: event.target.value });
        break;
      }
      case 'address2': {
        setContactEdit({ ...contactEdit, address2: event.target.value });
        break;
      }
      case "cityOrState": {
        setContactEdit({ ...contactEdit, cityOrState: event.target.value });
        break;
      }
      case "Zip": {
        setContactEdit({ ...contactEdit, Zip: event.target.value });
        break;
      }
      case "primaryLanguage": {
        setContactEdit({ ...contactEdit, primaryLanguage: event });
        break;
      }
      case "bestTimeToCall": {
        setContactEdit({ ...contactEdit, bestTimeToCall: event });
        break;
      }
      case "timeZone": {
        setContactEdit({ ...contactEdit, timeZone: event});
        break;
      }
      case "creditScore": {
        setContactEdit({ ...contactEdit, creditScore: event.target.value });
        break;
      }
      case "date": {
        setContactEdit({ ...contactEdit, date: event.target.value });
        break;
      }
      case "creditReportType": {
        setContactEdit({ ...contactEdit, creditReportType: event });
        break;
      }
      case "dob": {
        setContactEdit({ ...contactEdit, dob: event.target.value });
        break;
      }
      case "ssn": {
        setContactEdit({ ...contactEdit, ssn: event.target.value });
        break;
      }
      case "dl": {
        setContactEdit({ ...contactEdit, dl: event.target.value });
        break;
      }
      case "state": {
        setContactEdit({ ...contactEdit, state: event.target.value });
        break;
      }
      case "employer": {
        setContactEdit({ ...contactEdit, employer: event.target.value });
        break;
      }
      case "occ": {
        setContactEdit({ ...contactEdit, occ: event.target.value });
        break;
      }
      case "empLengthY": {
        setContactEdit({ ...contactEdit, empLengthY: event.target.value });
        break;
      }
      case "empLengthM": {
        setContactEdit({ ...contactEdit, empLengthM: event.target.value });
        break;
      }
      case "mortgageBalance": {
        setContactEdit({ ...contactEdit, mortgageBalance: event.target.value });
        break;
      }
      case "homeValue": {
        setContactEdit({ ...contactEdit, homeValue: event.target.value });
        break;
      }
      case "maritalStatus": {
        setContactEdit({ ...contactEdit, maritalStatus: event });
        break;
      }
      case "state_": {
        setContactEdit({ ...contactEdit, state_: event.target.value });
        break;
      }
      case "employmentStatus": {
        setContactEdit({ ...contactEdit, employmentStatus: event });
        break;
      }
      case "mortgagePayment": {
        setContactEdit({ ...contactEdit, mortgagePayment: event.target.value });
        break;
      }
      case "doYouRentOrOwn": {
        setContactEdit({ ...contactEdit, doYouRentOrOwn: event.target.value });
        break;
      }
      default: {
        setContactEdit({ ...contactEdit });
        break;
      }
    }
  };
  
  const getContactData = async (id) => {
    try {
      if (id) {
        const res = await _fetchContactById(id);
        console.log("320_fetchContactById",res)
        if (res?.data?.Item && res.status == 200) {
          setContact(res?.data?.Item);
          setContactEdit(res?.data?.Item?.basicInformation)
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [variableData, setVariableData] = useState([]);
  const getVariables = async () => {
    try {
      const res = await _gatVariabels();
      let data = await res?.data?.data?.Items.filter((variable) => variable?.variableType == "contact")
      data = await data.sort((a, b) => (a.createTime > b.createTime) ? 1 : ((b.createTime > a.createTime) ? -1 : 0));
      console.log(res)
      setVariableData([...data])
    } catch (err) {
      console.log(err)
    }
  }

  const getLoanType =async(id)=>{
    try{
      const res = await _gatSingleLoanType(id)
      console.log("_gatSingleLoanType",res)
      setLoanType(res?.data?.data?.Items[0])
    }catch(err){
      console.log(err)
    }
  }
  
  useEffect(() => {
    async function getData() {
      if (!router.isReady) return;
      getVariables();
      const query = router.query;
      let contactString = query?.contact;
      let coContactString = query?.cocontact;
      let applicationId = query?.applicationId;
      if(applicationId) setApplicationId(applicationId)
      setContactStr(contactString)
      let ids = [contactString] || [];
      console.log("173",ids[0])
      let cocontactIds = [coContactString] || [];
      setcontactId(ids)
      getContactData(ids[0])
      setcocontactId(cocontactIds)
      getContactData(ids)
      getLoanType(query.compaign)
    }
    getData()
  }, [router.isReady, router.query]);

  return (
    <div>
       <Snackbar open={openSuccessMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage}>
        <Alert onClose={handleCloseSuccessMessage} severity="success" sx={{ width:"100%" }} style={{backgroundColor:'lightgreen'}}>
          {message}
        </Alert>
     </Snackbar>
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <Item>
              <Grid m={4}>
                <Typography
                  align="left"
                  variant="h5"
                  fontWeight={700}
                  fontSize={45}
                  lineHeight={1}
                >
                  Application Form
                </Typography>
                <Typography align="left" lineHeight={3}>
                  Personal Loan
                </Typography>

                <Grid item xs={12} md={6} mt={2}>
              <Typography variant="h5" mt={3} mb={2} style={{ textAlign: "left" }}>
                <span style={{ fontSize: 25, fontWeight: 700 }}>
                  Contact Profile
                </span>{" "}
              </Typography>

              <Stack direction="row" spacing={1}>
                <Typography variant="h5">
                  <span style={{ fontSize: 20, fontWeight: 700 }}>
                    {contact?.basicInformation?.firstName || ""}{" "}
                    {contact?.basicInformation?.lastName || ""}
                  </span>{" "}
                </Typography>

                {!switchEditMode ? (
                  <Link
                    className="page_sub_outlineless_text_btn"
                    style={{ textDecoration: "none", cursor: "pointer" }}
                    onClick={() => {
                      setSwitchEditMode((switchEditMode) => !switchEditMode);
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      mt={1}
                      style={{ fontSize: 18, fontWeight: 500 }}
                    >
                      <NoteAltOutlinedIcon mt={1} />
                      <Typography> Edit Profile </Typography>
                    </Stack>
                  </Link>
                ) : (
                  <div>
                    <Button variant="contained" style={{ marginRight:10 }} onClick={() => { handelSubmitContact(contact.PK)}} >
                      Save
                    </Button>
                    <Button variant="contained" onClick={() => {setSwitchEditMode((switchEditMode)=>!switchEditMode)}} >
                      Cancel
                    </Button>
                  </div>
                )}
              </Stack>
            </Grid>
            <Box sx={{ minWidth: 275 }}>
            <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TableContainer style={{ backgroundColor: "transparent", marginTop:40 }}>
                      <Table aria-label="simple table">
                        <TableBody>
                          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 },}} >
                            <TableCell component="th" scope="row" style={{fontSize: 20,fontWeight: 400, color: "#393939", }} >
                              {"Campaign"}
                            </TableCell>
                            <TableCell component="th" scope="row" style={{fontSize: 20, fontWeight: 600, color: "#393939",}} >
                            {loanType?.loanName || ""}
                            </TableCell>
                          </TableRow>
                          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 },}} >
                          <TableCell component="th" scope="row" style={{fontSize: 20,fontWeight: 400, color: "#393939", }} >
                              {"Reservation/Offer Code"}
                            </TableCell>
                            <TableCell component="th" scope="row" style={{fontSize: 20,fontWeight: 400, color: "#393939", }} >
                              {""}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
                <Grid mt={4}>
                <Typography
                  align="left"
                  style={{ fontSize: 20, fontWeight: 700 }}
                >
                  Basic Information
                </Typography>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TableContainer style={{ backgroundColor: "transparent" }}>
                      <Table aria-label="simple table">
                        <TableBody>
                         <TableRow sx={{"&:last-child td, &:last-child th": { border: 0 },  }} >
                            <TableCell component="th" scope="row" style={{fontSize: 20, fontWeight: 400, color: "#393939", }} >
                              {"First Name"}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                fontSize: 20,
                                fontWeight: 600,
                                color: "#393939",
                              }}
                            >
                              {switchEditMode ? <TextField
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("firstName", event)}
                                  value = {contactEdit?.firstName}
                                  style={{ margin: 0 }}
                                /> : contact?.basicInformation?.firstName || ""}
                            </TableCell>
                          </TableRow>
                          {console.log("contact",contact)}
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              style={{
                                fontSize: 20,
                                fontWeight: 400,
                                color: "#393939",
                              }}
                            >
                              {"Last Name"}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                fontSize: 20,
                                fontWeight: 600,
                                color: "#393939",
                              }}
                            >
                              {switchEditMode ? <TextField
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("lastName", event)}
                                  value = {contactEdit?.lastName}
                                  style={{ margin: 0 }}
                                /> : contact?.basicInformation?.lastName || "" }
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              style={{
                                fontSize: 20,
                                fontWeight: 400,
                                color: "#393939",
                              }}
                            >
                              {"Middle Initial"}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                fontSize: 20,
                                fontWeight: 600,
                                color: "#393939",
                              }}
                            >
                             
                               {switchEditMode ? <TextField
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("middleInitial", event)}
                                  value = {contactEdit?.middleInitial}
                                  style={{ margin: 0 }}
                                /> : contact?.basicInformation?.middleInitial || "" }
                            </TableCell>
                          </TableRow>

                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              style={{
                                fontSize: 20,
                                fontWeight: 400,
                                color: "#393939",
                              }}
                            >
                              {"Other Names"}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                fontSize: 20,
                                fontWeight: 600,
                                color: "#393939",
                              }}
                            >
                               {switchEditMode ? <TextField
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("otherName", event)}
                                  value = {contactEdit?.otherName}
                                  style={{ margin: 0 }}
                                /> : contact?.basicInformation?.otherName || "" }
                            </TableCell>
                          </TableRow>
                       
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              style={{
                                fontSize: 20,
                                fontWeight: 400,
                                color: "#393939",
                              }}
                            >
                              {"Email Address"}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                fontSize: 20,
                                fontWeight: 600,
                                color: "#393939",
                              }}
                            >
                               {switchEditMode ? <TextField
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("emailAddress", event)}
                                  value = {contactEdit?.emailAddress}
                                  style={{ margin: 0 }}
                                /> : contact?.basicInformation?.emailAddress || "" }
                            </TableCell>
                          </TableRow>    
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              style={{
                                fontSize: 20,
                                fontWeight: 400,
                                color: "#393939",
                              }}
                            >
                              {"Home / Mobile"}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                fontSize: 20,
                                fontWeight: 600,
                                color: "#393939",
                              }}
                            >
                              {/* {switchEditMode ?<TextField
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  value={email}
                                  onChange={(e) => {
                                    setEmail(e.target.value);
                                  }}
                                  style={{ margin: 0 }}
                                />:contact?.basicInformation?.emailAddress || ""} */}
                                 {switchEditMode ? <div>
                                  <TextField
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("homePhoneNumber", event)}
                                  value = {contactEdit?.homePhoneNumber}
                                  style={{ margin: 0 }}
                                /> 
                                 <TextField
                                  style={{ marginTop:10 }}
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("mobilePhoneNumber", event)}
                                  value = {contactEdit?.mobilePhoneNumber}
                                 
                                /> 
                                 </div>: `${contact?.basicInformation?.homePhoneNumber} / ${contact?.basicInformation?.mobilePhoneNumber}` || "" }
                            </TableCell>
                          </TableRow>

                          {/* <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              style={{
                                fontSize: 20,
                                fontWeight: 400,
                                color: "#393939",
                              }}
                            >
                              {"ID Number"}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                fontSize: 20,
                                fontWeight: 600,
                                color: "#393939",
                              }}
                            >
                              {switchEditMode ?<TextField
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  value={idNumber}
                                  onChange={(e) => {
                                    setIdNumber(e.target.value);
                                  }}
                                  style={{ margin: 0 }}
                                /> : contact?.basicInformation?.idNumber || ""}
                            </TableCell>
                          </TableRow> */}
                          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                            <TableCell component="th" scope="row" style={{fontSize: 20, fontWeight: 400, color: "#393939", }} >
                              {"Best Time To Call"}
                            </TableCell>
                            <TableCell align="left"style={{ fontSize: 20, fontWeight: 600, color: "#393939", }} >
                             { switchEditMode ? <div>
                              <Autocomplete
                                renderInput={(params) => ( <TextField  {...params} size="small" label="Select Best Time To Call" />)}
                                value={contactEdit?.bestTimeToCall}
                                onChange={(e, val) => {
                                  handleChange("bestTimeToCall", val)
                                  return val;
                                }}
                                options={bestTimes?.map((time) => time )}
                              ></Autocomplete>
                            </div> : contact?.basicInformation?.bestTimeToCall || ""}
                            </TableCell>
                          </TableRow>

                          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                            <TableCell component="th" scope="row" style={{fontSize: 20, fontWeight: 400, color: "#393939", }} >
                              {"Work / Fax"}
                            </TableCell>
                            <TableCell align="left"style={{ fontSize: 20, fontWeight: 600, color: "#393939", }} >
                                {switchEditMode ?  <div>
                                  <TextField
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("work", event)}
                                  value = {contactEdit?.work}
                                  style={{ margin: 0 }}
                                /> 
                                 <TextField
                                  style={{ marginTop:10 }}
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("fax", event)}
                                  value = {contactEdit?.fax}
                                 
                                /> 
                                 </div>:`${contact?.basicInformation?.work} / ${contact?.basicInformation?.fax}` || "" }
                            </TableCell>
                          </TableRow>

                          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                            <TableCell component="th" scope="row" style={{fontSize: 20, fontWeight: 400, color: "#393939", }} >
                              {"Address 1"}
                            </TableCell>
                            <TableCell align="left"style={{ fontSize: 20, fontWeight: 600, color: "#393939", }} >
                              {switchEditMode ?  <TextField
                                  style={{ marginTop:10 }}
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("address1", event)}
                                  value = {contactEdit?.address1}
                                 
                                /> : contact?.basicInformation?.address1 || ""}
                            </TableCell>
                          </TableRow>

                          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                            <TableCell component="th" scope="row" style={{fontSize: 20, fontWeight: 400, color: "#393939", }} >
                              {"Address 2"}
                            </TableCell>
                            <TableCell align="left"style={{ fontSize: 20, fontWeight: 600, color: "#393939", }} >
                            {switchEditMode ?  <TextField
                                  style={{ marginTop:10 }}
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("address2", event)}
                                  value = {contactEdit?.address2}
                                 
                                /> : contact?.basicInformation?.address2} 
                            </TableCell>
                          </TableRow>

                          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                            <TableCell component="th" scope="row" style={{fontSize: 20, fontWeight: 400, color: "#393939", }} >
                              {"City, State, Zip"}
                            </TableCell>
                            <TableCell align="left"style={{ fontSize: 20, fontWeight: 600, color: "#393939", }} >
                            {switchEditMode ? <div>
                                  <TextField
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("cityOrState", event)}
                                  value = {contactEdit?.cityOrState}
                                  style={{ margin: 0 }}
                                /> 
                                 <TextField
                                  style={{ marginTop:10 }}
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("state_", event)}
                                  value = {contactEdit?.state_}
                                 
                                /> 
                                <TextField
                                  style={{ marginTop:10 }}
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("Zip", event)}
                                  value = {contactEdit?.Zip}
                                 
                                /> 
                                 </div>: `${contact?.basicInformation?.cityOrState} / ${contact?.basicInformation?.state_} / ${contact?.basicInformation?.Zip}` || "" }
                            </TableCell>
                          </TableRow>

                          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                            <TableCell component="th" scope="row" style={{fontSize: 20, fontWeight: 400, color: "#393939", }} >
                              {"Primary Language"}
                            </TableCell>
                            <TableCell align="left"style={{ fontSize: 20, fontWeight: 600, color: "#393939", }} >
                              {switchEditMode ?   <Autocomplete 
                                    renderInput={(params) => (
                                    <TextField
                                      value={contactEdit?.primaryLanguage}
                                      {...params}
                                      size="small"
                                      label="Select Primary Language"
                                    />
                                    )}
                                    onChange={(e, val) => {
                                    handleChange("primaryLanguage", val)
                                    return val;
                                    }}
                                    options={languages?.map((language) => language )}
                                  >
                                </Autocomplete> : contact?.basicInformation?.primaryLanguage || ""}
                            </TableCell>
                          </TableRow>
                          
                          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                            <TableCell component="th" scope="row" style={{fontSize: 20, fontWeight: 400, color: "#393939", }} >
                              {"DL# / State"}
                            </TableCell>
                            <TableCell align="left"style={{ fontSize: 20, fontWeight: 600, color: "#393939", }} >
                            {switchEditMode ? <div>
                                  <TextField
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("dl", event)}
                                  value = {contactEdit?.dl}
                                  style={{ margin: 0 }}
                                /> 
                                 <TextField
                                  style={{ marginTop:10 }}
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("state", event)}
                                  value = {contactEdit?.state}
                                 
                                /> 
                                 </div>: `${contact?.basicInformation?.dl} / ${contact?.basicInformation?.state}` || "" }
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item xs={6}>
                    <TableContainer style={{ backgroundColor: "transparent" }}>
                      <Table aria-label="simple table">
                        <TableBody>
                          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                            <TableCell component="th" scope="row" style={{fontSize: 20, fontWeight: 400, color: "#393939", }} >
                              {"Employer / Occ"}
                            </TableCell>
                            <TableCell align="left"style={{ fontSize: 20, fontWeight: 600, color: "#393939", }} >
                              {switchEditMode ? <div>
                                  <TextField
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("employer", event)}
                                  value = {contactEdit?.employer}
                                  style={{ margin: 0 }}
                                /> 
                                 <TextField
                                  style={{ marginTop:10 }}
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("occ", event)}
                                  value = {contactEdit?.occ}
                                 
                                /> 
                                 </div>: `${contact?.basicInformation?.employer} / ${contact?.basicInformation?.occ}` || ""}
                            </TableCell>
                          </TableRow>

                          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                            <TableCell component="th" scope="row" style={{fontSize: 20, fontWeight: 400, color: "#393939", }} >
                              {"Employment status"}
                            </TableCell>
                            <TableCell align="left"style={{ fontSize: 20, fontWeight: 600, color: "#393939", }} >
                              {switchEditMode ? <Autocomplete 
                                  renderInput={(params) => (
                                  <TextField
                                    value={contactEdit?.employmentStatus}
                                    {...params}
                                    size="small"
                                    label="Select Primary Language"
                                  />
                                  )}
                                  onChange={(e, val) => {
                                  handleChange("employmentStatus", val)
                                  return val;
                                  }}
                                  options={employmentStatusData?.map((language) => language )}
                                >
                              </Autocomplete> : contact?.basicInformation?.employmentStatus}
                            </TableCell>
                          </TableRow>

                          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                            <TableCell component="th" scope="row" style={{fontSize: 20, fontWeight: 400, color: "#393939", }} >
                              {"Emp Length Y/M"}
                            </TableCell>
                            <TableCell align="left"style={{ fontSize: 20, fontWeight: 600, color: "#393939", }} >
                            {switchEditMode ? <div>
                                  <TextField
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("empLengthY", event)}
                                  value = {contactEdit?.empLengthY}
                                  style={{ margin: 0 }}
                                /> 
                                 <TextField
                                  style={{ marginTop:10 }}
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("empLengthM", event)}
                                  value = {contactEdit?.empLengthM}
                                 
                                /> 
                                 </div>: `${contact?.basicInformation?.empLengthY} / ${contact?.basicInformation?.empLengthM}` || "" }
                            </TableCell>
                          </TableRow>

                          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                            <TableCell component="th" scope="row" style={{fontSize: 20, fontWeight: 400, color: "#393939", }} >
                              {"Mortgage payment"}
                            </TableCell>
                            <TableCell align="left"style={{ fontSize: 20, fontWeight: 600, color: "#393939", }} >
                              {switchEditMode ?   <TextField
                                  style={{ marginTop:10 }}
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("mortgagePayment", event)}
                                  value = {contactEdit?.mortgagePayment}
                                 
                                /> : contact?.basicInformation?.mortgagePayment || ""}
                            </TableCell>
                          </TableRow>

                          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                            <TableCell component="th" scope="row" style={{fontSize: 20, fontWeight: 400, color: "#393939", }} >
                              {"Martgage Balance"}
                            </TableCell>
                            <TableCell align="left"style={{ fontSize: 20, fontWeight: 600, color: "#393939", }} >
                              
                            {switchEditMode ?   <TextField
                                  style={{ marginTop:10 }}
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("mortgageBalance", event)}
                                  value = {contactEdit?.mortgageBalance}
                                 
                                /> : contact?.basicInformation?.mortgageBalance || "" } 
                            </TableCell>
                          </TableRow>

                          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                            <TableCell component="th" scope="row" style={{fontSize: 20, fontWeight: 400, color: "#393939", }} >
                              {"Home Value"}
                            </TableCell>
                            <TableCell align="left"style={{ fontSize: 20, fontWeight: 600, color: "#393939", }} >
                            {switchEditMode ?   <TextField
                                  style={{ marginTop:10 }}
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("homeValue", event)}
                                  value = {contactEdit?.homeValue}
                                 
                                /> :contact?.basicInformation?.homeValue || ""} 
                            </TableCell>
                          </TableRow>
                          
                          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                            <TableCell component="th" scope="row" style={{fontSize: 20, fontWeight: 400, color: "#393939", }} >
                              {"Marital Status"}
                            </TableCell>
                            <TableCell align="left"style={{ fontSize: 20, fontWeight: 600, color: "#393939", }} >
                              {switchEditMode ? <Autocomplete 
                                  renderInput={(params) => (
                                  <TextField
                                    value={contactEdit?.maritalStatus}
                                    {...params}
                                    size="small"
                                    label="Select Marital Status"
                                  />
                                  )}
                                  onChange={(e, val) => {
                                  handleChange("maritalStatus", val)
                                  return val;
                                  }}
                                  options={maritalStatusData?.map((state) => state )}
                                >
                              </Autocomplete> : contact?.basicInformation?.maritalStatus || "" }
                            </TableCell>
                          </TableRow>

                          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                            <TableCell component="th" scope="row" style={{fontSize: 20, fontWeight: 400, color: "#393939", }} >
                              {"Do You Rent Or Own"}
                            </TableCell>
                            <TableCell align="left"style={{ fontSize: 20, fontWeight: 600, color: "#393939", }} >

                            {switchEditMode ?   <TextField
                                  style={{ marginTop:10 }}
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("doYouRentOrOwn", event)}
                                  value = {contactEdit?.doYouRentOrOwn}
                                 
                                />: contact?.basicInformation?.doYouRentOrOwn || ""} 
                            </TableCell>
                          </TableRow>

                          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                            <TableCell component="th" scope="row" style={{fontSize: 20, fontWeight: 400, color: "#393939", }} >
                              {"Time Zone"}
                            </TableCell>
                            <TableCell align="left"style={{ fontSize: 20, fontWeight: 600, color: "#393939", }} >
                            {switchEditMode ? <Autocomplete 
                                  renderInput={(params) => (
                                  <TextField
                                    value={contactEdit?.maritalStatus}
                                    {...params}
                                    size="small"
                                    label="Select Time Zone"
                                  />
                                  )}
                                  onChange={(e, val) => {
                                  handleChange("timeZone", val)
                                  return val;
                                  }}
                                  options={timeZones?.map((state) => state )}
                                >
                              </Autocomplete> : contact?.basicInformation?.timeZone || ""} 
                            </TableCell>
                          </TableRow>

                          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                            <TableCell component="th" scope="row" style={{fontSize: 20, fontWeight: 400, color: "#393939", }} >
                              {"Credit Score / Date"}
                            </TableCell>
                            <TableCell align="left"style={{ fontSize: 20, fontWeight: 600, color: "#393939", }} >
                            {switchEditMode ? <div>
                                  <TextField
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("creditScore", event)}
                                  value = {contactEdit?.creditScore}
                                  style={{ margin: 0 }}
                                /> 
                                 <TextField
                                  style={{ marginTop:10 }}
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("date", event)}
                                  value = {contactEdit?.date}
                                 
                                /> 
                                 </div>: `${contact?.basicInformation?.creditScore} / ${contact?.basicInformation?.date}` || "" }
                            </TableCell>
                          </TableRow>

                          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                            <TableCell component="th" scope="row" style={{fontSize: 20, fontWeight: 400, color: "#393939", }} >
                              {"Credit Report Type"}
                            </TableCell>
                            <TableCell align="left"style={{ fontSize: 20, fontWeight: 600, color: "#393939", }} >
                              {switchEditMode ? <Autocomplete 
                                  renderInput={(params) => (
                                  <TextField
                                    value={contactEdit?.creditReportType}
                                    {...params}
                                    size="small"
                                    label="Select Credit Report Type"
                                  />
                                  )}
                                  onChange={(e, val) => {
                                  handleChange("creditReportType", val)
                                  return val;
                                  }}
                                  options={creditReportTypes?.map((state) => state )}
                                >
                              </Autocomplete> :contact?.basicInformation?.creditReportType || ""} 
                            </TableCell>
                          </TableRow>

                          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                            <TableCell component="th" scope="row" style={{fontSize: 20, fontWeight: 400, color: "#393939", }} >
                              {"DOB / SSN"}
                            </TableCell>
                            <TableCell align="left"style={{ fontSize: 20, fontWeight: 600, color: "#393939", }} >
                            {switchEditMode ? <div>
                                  <TextField
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("dob", event)}
                                  value = {contactEdit?.dob}
                                  style={{ margin: 0 }}
                                /> 
                                 <TextField
                                  style={{ marginTop:10 }}
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  onChange = {(event) => handleChange("ssn", event)}
                                  value = {contactEdit?.ssn}
                                 
                                /> 
                                 </div>: `${contact?.basicInformation?.dob} / ${contact?.basicInformation?.mobilePhoneNumber}` || "" }
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
                {/* <Grid mt={4}>
                <Typography
                  align="left"
                  style={{ fontSize: 20, fontWeight: 700 }}
                >
                  Financial Information
                </Typography>
                </Grid> */}
                {/* <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TableContainer style={{ backgroundColor: "transparent" }}>
                      <Table aria-label="simple table">
                        <TableBody>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              style={{
                                fontSize: 20,
                                fontWeight: 400,
                                color: "#393939",
                              }}
                            >
                              {"Company Name"}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                fontSize: 20,
                                fontWeight: 600,
                                color: "#393939",
                              }}
                            >
                              {switchEditMode ? <TextField
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  value={companyName}
                                  onChange={(e) => {
                                    setCompanyName(e.target.value);
                                  }}
                                  style={{ margin: 0 }}
                                /> : contact?.jobInformation?.companyName || "" }
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              style={{
                                fontSize: 20,
                                fontWeight: 400,
                                color: "#393939",
                              }}
                            >
                              {"Job Title"}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                fontSize: 20,
                                fontWeight: 600,
                                color: "#393939",
                              }}
                            >
                              {switchEditMode ? <TextField
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  value={jobTitle}
                                  onChange={(e) => {
                                    setJobTitle(e.target.value);
                                  }}
                                  style={{ margin: 0 }}
                                /> : contact?.jobInformation?.jobTitle || "" }
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  <Grid item xs={6}>
                    <TableContainer style={{ backgroundColor: "transparent" }}>
                      <Table aria-label="simple table">
                        <TableBody>

                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid mt={6}></Grid>
                </Grid> */}

                {/* <Grid mt={4}>
                <Typography
                  align="left"
                  style={{ fontSize: 20, fontWeight: 700 }}
                >
                 Additional Information
                </Typography>
                </Grid> */}
                {/* <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TableContainer style={{ backgroundColor: "transparent" }}>
                      <Table aria-label="simple table">
                        <TableBody>
                          {variableData && variableData.map((variable,key)=>{
                            return( 
                            <TableRow key={key}
                              sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                              }}
                            >
                              <TableCell
                              component="th"
                              scope="row"
                              style={{ fontSize:20, fontWeight: 400}}
                              >
                              {variable?.displayName}
                              </TableCell>
                              <TableCell
                              align="left"
                              
                              style={{ fontSize:20, fontWeight: 600}}
                              >
                                {switchEditMode ? <TextField
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  name={variable?.systemName}
                                  value={additionalInfomations?.[variable?.systemName]}
                                  onChange={onChangeHandler}
                                  style={{ margin: 0 }}
                                /> : contact?.additionalInformation?.[variable?.systemName] || ""}
                              </TableCell>
                            </TableRow>
                            )
                          })}	
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid mt={6}></Grid>
                </Grid> */}
              </Box>

                <Grid mt={6}>
                  <div
                    style={{
                      marginBottom: 100,
                      display: "flex",
                      justifyContent: "left",
                    }}
                  >
                    <Button variant="outlined" onClick={() => handleContinue(loanType, contactStr)}>
                      Continue
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Box >
    </div >
  );
}

ApplicationFormData.layout = "AdminLayout";

export default ApplicationFormData;
