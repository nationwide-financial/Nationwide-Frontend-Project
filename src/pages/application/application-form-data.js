import React, { useEffect, useState, useCallback } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
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
  const [contactData, setContactData] = useState({});

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

  const onChangeHandler = useCallback(
    ({ target }) => {
      setAdditionalInfomations((state) => ({ ...state, [target.name]: target.value }));
    }, []
  );
  const handelSubmitContact = async (id) => {
    try {
      if (!firstName || firstName == "" || firstName == null) {
        setSubmitErr("first name can not be empty !");
      } else if (!lastName || lastName == "" || lastName == null) {
        setSubmitErr("last name can not be empty !");
      } else if (!email || email == "" || email == null) {
        setSubmitErr("email can not be empty !");
      } else if (!dob || dob == "" || dob == null) {
        setSubmitErr("date of birth can not be empty !");
      } else if (!idNumber || idNumber == "" || idNumber == null) {
        setSubmitErr("ID number can not be empty !");
      } else if (!city || city == "" || city == null) {
        setSubmitErr("city can not be empty !");
      } else if ( !streetAddress || streetAddress == "" || streetAddress == null) {
        setSubmitErr("street address can not be empty !");
      } else if (!postalCode || postalCode == "" || postalCode == null) {
        setSubmitErr("postal code can not be empty !");
      } else if (!province || province == "" || province == null) {
        setSubmitErr("province code can not be empty !");
      } 
      // else if (!country || country == "" || country == null) {
      //   setSubmitErr("country code can not be empty !");
      // } 
      else if (!phoneNumber || phoneNumber == "" || phoneNumber == null) {
        setSubmitErr("phone number code can not be empty !");
      } else if (!companyName || companyName == "" || companyName == null) {
        setSubmitErr("Company Name code can not be empty !");
      } else if (!jobTitle || jobTitle == "" || jobTitle == null) {
        setSubmitErr("job Title code can not be empty !");
      } else {
        setSubmitErr("");
        console.log("inside");
        let body = {
          basicInformation: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phoneNumber,
            idNumber: idNumber,
            dob: dob,
            streetAddress: streetAddress,
            city: city,
            state: province,
            postalCode: postalCode,
           // country: country,
          },
          jobInformation: {
            companyName: companyName,
            jobTitle: jobTitle,
          },
          additionalInformation:{...additionalInfomations}
        };
        const res = await _updateContactById(id, body);
        console.log("_updateContactById", res);
        if (res?.status == 200) {
          handleSuccessMessage()
          setMessage("Updated")
          setSwitchEditMode((switchEditMode) => !switchEditMode);
          getContactData(contactId);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleContinue = (product, contact) => {
    // let string = cocontactId.join('S')
    // cocontactId.length > 0 ? router.push(`/application/application-details?product=${product}&contact=${contact}&cocontact=${string}`) : router.push(`/application/application-details?product=${product}&contact=${contact}`)
    router.push(`/application/dashbord`)

  };

  const getContactData = async (id) => {
    try {
      if (id) {
        const res = await _fetchContactById(id);
        console.log("320_fetchContactById",res)
        if (res?.data?.Item && res.status == 200) {
          setContactData(res?.data?.Item);

          setPhoneNumber(res?.data?.Item?.basicInformation?.phone);
          setFirstName(res?.data?.Item?.basicInformation?.firstName);
          setLastName(res?.data?.Item?.basicInformation?.lastName);
          setEmail(res?.data?.Item?.basicInformation?.email);
          setDob(res?.data?.Item?.basicInformation?.dob);
          setIdNumber(res?.data?.Item?.basicInformation?.idNumber);
          setCity(res?.data?.Item?.basicInformation?.city);
          setStreetAddress(res?.data?.Item?.basicInformation?.streetAddress);
          setPostalCode(res?.data?.Item?.basicInformation?.postalCode);
          setProvince(res?.data?.Item?.basicInformation?.state);
          //setCountry(res?.data?.Item?.basicInformation?.country);
          setCompanyName(res?.data?.Item?.jobInformation?.companyName);
          setJobTitle(res?.data?.Item?.jobInformation?.jobTitle);
          setAdditionalInfomations(res?.data?.Item?.additionalInformation)
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
                    {contactData?.basicInformation?.firstName || ""}{" "}
                    {contactData?.basicInformation?.lastName || ""}
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
                  <div style={{ marginBottom: 100, display: "flex", justifyContent: "left", margin: 20 }} >
                    <Button variant="contained" onClick={() => { handelSubmitContact(contactData.PK)}} >
                      Save
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
                              {"Campaign"}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                fontSize: 20,
                                fontWeight: 600,
                                color: "#393939",
                              }}
                            >
                            {loanType?.loanName || ""}
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
                              {"Reservation/Offer Code"}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                fontSize: 20,
                                fontWeight: 600,
                                color: "#393939",
                              }}
                            >
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
                                  value={firstName}
                                  onChange={(e) => {
                                    setFirstName(e.target.value);
                                  }}
                                  style={{ margin: 0 }}
                                />:contactData?.basicInformation?.firstName || "" }
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
                              {"Email"}
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
                                  value={email}
                                  onChange={(e) => {
                                    setEmail(e.target.value);
                                  }}
                                  style={{ margin: 0 }}
                                />:contactData?.basicInformation?.emailAddress || ""}
                              
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
                                /> : contactData?.basicInformation?.idNumber || ""}
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
                              {"Street Address"}
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
                                  value={streetAddress}
                                  onChange={(e) => {
                                    setStreetAddress(e.target.value);
                                  }}
                                  style={{ margin: 0 }}
                                />: contactData?.basicInformation?.address1 || ""}
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
                              {switchEditMode ?  <TextField
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  value={lastName}
                                  onChange={(e) => {
                                    setLastName(e.target.value);
                                  }}
                                  style={{ margin: 0 }}
                                /> : contactData?.basicInformation?.lastName || ""}
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
                              {"Phone"}
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
                                  value={phoneNumber}
                                  onChange={(e) => {
                                    setPhoneNumber(e.target.value);
                                  }}
                                  style={{ margin: 0 }}
                                /> : contactData?.basicInformation?.mobilePhoneNumber || "" }
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
                              {"Date Of Birth"}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                fontSize: 20,
                                fontWeight: 600,
                                color: "#393939",
                              }}
                            >
                              {switchEditMode ? <MobileDatePicker
                                inputFormat="MM/DD/YYYY"
                                value={dob}
                                onChange={(event) => {console.log(event) 
                                  setDob(event)}}
                                renderInput={(params) => <TextField size="small" fullWidth margin="normal" {...params} error={false} />}
                              />:getDate(contactData?.basicInformation?.dob)  || "" }
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
                              {"Postal Code"}
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
                                  value={postalCode}
                                  onChange={(e) => {
                                    setPostalCode(e.target.value);
                                  }}
                                  style={{ margin: 0 }}
                                /> : contactData?.basicInformation?.Zip || "" }
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
                  Financial Information
                </Typography>
                </Grid>
                <Grid container spacing={2}>
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
                                /> : contactData?.jobInformation?.companyName || "" }
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
                                /> : contactData?.jobInformation?.jobTitle || "" }
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
                </Grid>

                <Grid mt={4}>
                <Typography
                  align="left"
                  style={{ fontSize: 20, fontWeight: 700 }}
                >
                 Additional Information
                </Typography>
                </Grid>
                <Grid container spacing={2}>
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
                                /> : contactData?.additionalInformation?.[variable?.systemName] || ""}
                              </TableCell>
                            </TableRow>
                            )
                          })}	
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid mt={6}></Grid>
                </Grid>
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
