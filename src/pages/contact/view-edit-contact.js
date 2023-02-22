import React, { useEffect ,useCallback } from "react";
import { Avatar, Box, Button, Grid, IconButton, TablePagination, TextField, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import moment from "moment";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import Image from "next/image";
import { useState } from "react";
import Link from "@mui/material/Link";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import { MobileDatePicker } from '@mui/x-date-pickers';
import styles from '../../components/searchBox/searchBox.module.scss'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";


import { getDate,getDateWithDay, orderArray } from '../../utils/utils'
import { _fetchContactById, _updateContactById } from "../../services/contactServices";
import { _gatVariabels } from "../../services/variabelService.js";
import { _getUserById } from "../../services/authServices";
import { _getApplications } from '../../services/applicationService'
import { s3URL } from "../../utils/config";
import SearchBox from "../../components/searchBox/searchBox";
const label = { inputProps: { "aria-label": "Switch demo" } };

// table-with-pagination-------------------
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Contact() {
const router = useRouter();
const [searchKey, setSearchKey] = useState("");
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);
const [contactData, setContactData] = useState([]);
const [value, setValue] = useState(0);
const [switchEditMode, setSwitchEditMode] = useState(false);
const [phoneNumber, setPhoneNumber] = useState("");
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [dob, setDob] = useState("");
const [idNumber, setIdNumber] = useState("");
const [streetAddress, setStreetAddress] = useState("");
const [postalCode, setPostalCode] = useState("");
//const [country, setCountry] = useState("");
const [companyName, setCompanyName] = useState("");
const [jobTitle, setJobTitle] = useState("");
const [city, setCity]= useState("")
const [province, setProvince] = useState("")
const [additionalInfomations, setAdditionalInfomations] = useState({})
const [updatedBy, setUpdatedBy] = useState({})
const [applications, setApplications] = useState([]);
const [variableData, setVariableData] = useState([]);
const [ error, setError ] = useState({formError:"", error:""})
const [message, setMessage] = useState({})

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

  const onChangeHandler = useCallback(
    ({ target }) => {
      setAdditionalInfomations((state) => ({ ...state, [target.name]: target.value }));
    }, []
  );

  const getVariables = async () => {
    try {
      const res = await _gatVariabels();
      let data = await res?.data?.data?.Items.filter((variable) => variable?.variableType == "contact");
      data = await orderArray(data,"createTime")
      setVariableData([...data]);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUpdatedUser = async (userId) =>{
    try{
      const response = await _getUserById(userId);
      if(response?.status == 200){
        setUpdatedBy(response?.data?.data?.Items[0])
      }
    }catch(err){
      console.log(err)
    }
  } 

  const handelSubmitContact = async (id) => {
    try {
      if (!firstName || firstName == "" || firstName == null) {
        setError({...error,formError:"first name can not be empty !"});
      } else if (!lastName || lastName == "" || lastName == null) {
        setError({...error,formError:"last name can not be empty !"});
      } else if (!email || email == "" || email == null) {
        setError({...error,formError:"email can not be empty !"});
      } else if (!dob || dob == "" || dob == null) {
        setError({...error,formError:"date of birth can not be empty !"});
      } else if (!idNumber || idNumber == "" || idNumber == null) {
        setError({...error,formError:"ID number can not be empty !"});
      } else if (!city || city == "" || city == null) {
        setError({...error,formError:"city can not be empty !"});
      } else if ( !streetAddress || streetAddress == "" || streetAddress == null) {
        setError({...error,formError:"street address can not be empty !"});
      } else if (!postalCode || postalCode == "" || postalCode == null) {
        setError({...error,formError:"postal code can not be empty !"});
      } else if (!province || province == "" || province == null) {
        setError({...error,formError:"province code can not be empty !"});
      } 
      // else if (!country || country == "" || country == null) {
      //   setError({...error,formError:"country code can not be empty !"});
      // } 
      else if (!phoneNumber || phoneNumber == "" || phoneNumber == null) {
        setError({...error,formError:"phone number code can not be empty !"});
      } else if (!companyName || companyName == "" || companyName == null) {
        setError({...error,formError:"Company Name code can not be empty !"});
      } else if (!jobTitle || jobTitle == "" || jobTitle == null) {
        setError({...error,formError:"job Title code can not be empty !"});
      } else {
        setError({...error,formError:""});
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
        if (res?.status == 200) {
          setMessage({ severity: 'success', message: 'Profile updated!' })
          setSwitchEditMode((switchEditMode) => !switchEditMode);
          fetchContactById(contactData?.PK)
        }else{
          setMessage({ severity: 'error', message: 'Profile updating failed!' })
          setSwitchEditMode((switchEditMode) => !switchEditMode);
          fetchContactById(contactData?.PK)
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchContactById = async ( contactId )=>{
    try{
      if(contactId){
        const response = await _fetchContactById(contactId)
        if(response?.status == 200){
          let contact = response?.data?.Item;
          fetchUpdatedUser(contact?.updatedBy?.split("#")[1])

          setContactData(contact)
          setPhoneNumber(contact?.basicInformation?.phone);
          setFirstName(contact?.basicInformation?.firstName);
          setLastName(contact?.basicInformation?.lastName);
          setEmail(contact?.basicInformation?.email);
          setDob(contact?.basicInformation?.dob);
          setIdNumber(contact?.basicInformation?.idNumber);
          setStreetAddress(contact?.basicInformation?.streetAddress);
          setPostalCode(contact?.basicInformation?.postalCode);
          //setCountry(contact?.basicInformation?.country);
          setCity(contact?.basicInformation?.city)
          setProvince(contact?.basicInformation?.state)
          setCompanyName(contact?.jobInformation?.companyName);
          setJobTitle(contact?.jobInformation?.jobTitle);
          setAdditionalInfomations(contact?.additionalInformation)
        }
      }else{
        setError({...error, error:"Contact Id not found!"})
      }
    }catch(err){
      console.log(err)
    }
  }

  const fetchApplications = async () =>{
    try{
      if(applications?.length == 0){
        const response = await _getApplications();
        if(response?.status == 200){
          const applicationsResponse = response?.data?.data?.Items;
          let filteredApplications = [];

          await applicationsResponse?.map((application)=>{
            if(application?.contactId?.includes(contactData?.PK)){
              filteredApplications.push(application)
            }
          })
          const OrderdFilteredApplications = await orderArray(filteredApplications,"createTime")
          setApplications(OrderdFilteredApplications);
        }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    if (!router.isReady) return;
    const query = router.query;
    let contactId = query?.contactId;
    fetchContactById(contactId);
    getVariables();
  }, [router.isReady, router.query]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [showContent, setShowContent] = useState(false);

  const handleEditDetails = () => {
    setShowContent(!showContent);
  };

  return (
    <div>
      {message && <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={message}
          autoHideDuration={3000}
          onClose={() => setMessage()}
        >
          <Alert variant="filled" severity={message.severity}>
            {message.message}
          </Alert>
        </Snackbar>}

        <Box p={3} style={{ marginTop: 40 }}>
          {/* top-Header */}
          <Grid item xs={12} md={9}>
            <h1 className="page_header">{firstName} {lastName}</h1>
            <Grid item xs={12} my={3}>
              <Stack direction="row" spacing={1}>
                <Stack direction="row" spacing={1}>
                <Avatar alt={updatedBy?.PK?.split("#")[1]} src={`${s3URL}/${updatedBy?.imageId}`} />{" "}
                  <span style={{ fontSize: 16, fontWeight: 500, marginTop: 2 }}>
                    Updated {getDateWithDay(contactData?.updateTime) || ""}
                  </span>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          {/* 1st-header-section */}
          <Grid container mb={5}>
            <Grid item xs={12} md={6}>
              {/* <h1 className="page_header">Contacts</h1> */}
             {value == 1 && 
              <div className={styles.search}>
                  <SearchOutlinedIcon className={styles.icon} fontSize='medium'/>
                  <TextField 
                    name="applicationSearch" 
                    className={styles.input} 
                    id="input-with-icon-textfield" 
                    label="Search" 
                    variant="standard"
                    onChange={(e)=>setSearchKey(e.target.value)}
                  />
              </div>}
              {value == 2 && 
              <div className={styles.search}>
                  <SearchOutlinedIcon className={styles.icon} fontSize='medium'/>
                  <TextField name="emailSearch" className={styles.input} id="input-with-icon-textfield" label="Search" variant="standard"  />
              </div>}
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "right" }}>
                {value == 1 && <Button
                  variant="contained"
                  sx={{ padding: "10px 40px" }}
                  style={{ marginLeft: 20, textTransform: "capitalize" }}
                  onClick={()=>{}}
                >
                  New Application
                </Button> }
              
                {value == 2 && <Button
                  variant="contained"
                  sx={{ padding: "10px 40px" }}
                  style={{ marginLeft: 20, textTransform: "capitalize" }}
                  onClick={()=>{}}
                >
                  Send Email
                </Button>}
              </Box>
            </Grid>
          </Grid>

          {/* body-content-tab-set */}
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Profile" {...a11yProps(0)} />
                <Tab label="Applications" {...a11yProps(1)} onClick ={fetchApplications}/>
                <Tab label="Emails" {...a11yProps(2)} />
              </Tabs>
            </Box>

            {/* task-related-tab */}
            <TabPanel value={value} index={0}>
            <Grid item xs={12} md={6} mt={2}>
              <Typography variant="h5" mt={3} mb={2}>
                <span style={{ fontSize: 25, fontWeight: 700 }}>
                    Profile
                </span>{" "}
              </Typography>
              <Stack direction="row" spacing={1}>
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
                  <div style={{ marginBottom: 100, display: "flex", justifyContent: "left", margin: 0 }} >
                    <Button variant="contained" onClick={() => { handelSubmitContact(contactData.PK)}} >
                      Save
                    </Button>
                    <Button style={{marginLeft:10}} variant="contained" onClick={() => {setSwitchEditMode((switchEditMode) => !switchEditMode)}} >
                      Close
                    </Button>
                    
                  </div>
                )}
              
              </Stack>
              <br />
              <p style={{color:"red"}}>{error?.formError}</p>
            </Grid>
              <Box sx={{ minWidth: 275 }}>
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
                                />:contactData?.basicInformation?.email || ""}
                              
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
                                />: contactData?.basicInformation?.streetAddress || ""}
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
                              {"Country"}
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
                                  value={country}
                                  onChange={(e) => {
                                    setCountry(e.target.value);
                                  }}
                                  style={{ margin: 0 }}
                                />: contactData?.basicInformation?.country || ""}
                            </TableCell>
                          </TableRow> */}
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
                                /> : contactData?.basicInformation?.phone || "" }
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
                                onChange={(event) => setDob(event) }
                                renderInput={(params) => <TextField size="small" fullWidth margin="normal" {...params} error={false} />}
                              />: moment(contactData?.basicInformation?.dob).format("YYYY-MM-DD") || "" }
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
                                /> : contactData?.basicInformation?.postalCode || "" }
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
                                  type={variable.dataType}
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
            </TabPanel>
            <TabPanel value={value} index={1}>
              {/* 2st-header-section */}

              {/* 1st-header-section */}
              <Grid container p={0} mb={2}>
                <Grid item xs={12} md={6}>
                  <Typography style={{ fontSize: 21, fontWeight: 700 }}>
                    Loan Applications Submitted
                  </Typography>
                </Grid>
              </Grid>

              {/* table-related-section----- */}
              {applications && applications?.length > 0 && (
                <Grid container>
                  <TableContainer>
                    <Table
                      sx={{ minWidth: 500 }}
                      aria-label="custom pagination table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell
                            align="left"
                            style={{ fontSize: 14, fontWeight: 700 }}
                          >
                            CAMPAIGN
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ fontSize: 14, fontWeight: 700 }}
                          >
                            APPLICATION ID
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ fontSize: 14, fontWeight: 700 }}
                          >
                            APPLICATION DATE
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ fontSize: 14, fontWeight: 700 }}
                          >
                            STATUS
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ fontSize: 14, fontWeight: 700 }}
                          >
                            LOAN AMOUNT
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {applications
                          ?.filter((data) => {
                            if (searchKey == "") {
                              return data;
                            } else {
                              return data?.applicationBasicInfo?.loan_amount?.toLowerCase()?.includes(searchKey?.toLocaleLowerCase())
                              || data?.PK?.toLowerCase()?.includes(searchKey?.toLocaleLowerCase())
                              || data?.status_?.toLowerCase()?.includes(searchKey?.toLocaleLowerCase())
                              || moment(data?.createTime).format("YYYY-MM-DD")?.includes(searchKey)
                            }
                          })
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row,key) => {
                            
                            return (
                              <TableRow
                                className="contact-list-row"
                                key={key}
                                onClick={() =>{}}
                              >
                                <TableCell component="th" scope="row">
                                  Application {key + 1}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.PK?.split("_")[1] || ""}
                                </TableCell>
                                <TableCell align="left">
                                  {moment(row.createTime).format("YYYY-MM-DD") || ""}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.status_ || ""}
                                </TableCell>
                                <TableCell align="left">
                                $ {row?.applicationBasicInfo?.loan_amount || ""}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[
                              5,
                              10,
                              25,
                              { label: "All", value: -1 },
                            ]}
                            count={applications?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                              inputProps: {
                                "aria-label": "rows per page",
                              },
                              native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                </Grid>
              )}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {/* 2st-header-section */}

              {/* 1st-header-section */}
              <Grid container p={0} mb={2}>
                <Grid item xs={12} md={6}>
                  <Typography style={{ fontSize: 21, fontWeight: 700 }}>
                    Past Emails Submitted
                  </Typography>
                </Grid>
              </Grid>

              {/* table-related-section----- */}
              {contactData && contactData.length > 0 && (
                <Grid container>
                  <TableContainer>
                    <Table
                      sx={{ minWidth: 500 }}
                      aria-label="custom pagination table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell
                            align="left"
                            style={{ fontSize: 14, fontWeight: 700 }}
                          >
                            DATE
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ fontSize: 14, fontWeight: 700 }}
                          >
                            FROM
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ fontSize: 14, fontWeight: 700 }}
                          >
                            TO
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ fontSize: 14, fontWeight: 700 }}
                          >
                            SUBJECT
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {[]
                          ?.filter((data) => {
                            if (searchKey == "") {
                              return data;
                            } else {
                              return data?.basicInformation?.email
                                .toLowerCase()
                                .includes(searchKey.toLocaleLowerCase());
                            }
                          })
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row) => {
                            const basicInfo = row.basicInformation;
                            return (
                              <TableRow
                                className="contact-list-row"
                                key={row.name}
                                onClick={() =>{}}
                              >
                                <TableCell component="th" scope="row">
                                  {basicInfo.firstName +
                                    " " +
                                    basicInfo.lastName}
                                </TableCell>
                                <TableCell align="left">
                                  {basicInfo.idNumber}
                                </TableCell>
                                <TableCell align="left">
                                  {basicInfo.phone}
                                </TableCell>
                                <TableCell align="left">
                                  {basicInfo.email}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[
                              5,
                              10,
                              25,
                              { label: "All", value: -1 },
                            ]}
                            count={[].length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                              inputProps: {
                                "aria-label": "rows per page",
                              },
                              native: true,
                            }}
                            onPageChange={()=>{}}
                            onRowsPerPageChange={()=>{}}
                            ActionsComponent={()=>{}}
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                </Grid>
              )}
            </TabPanel>
            <TabPanel value={value} name="email-tab" index={3}>
              {/* 1st-header-section */}
              <Grid container p={0} mb={2}>
                <Grid item xs={12} md={6}>
                  <Typography style={{ fontSize: 21, fontWeight: 700 }}>
                    Emails
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ textAlign: "right" }}>
                    <Button
                      variant="outlined"
                      sx={{ padding: "10px 40px" }}
                      onClick={handleClickOpen}
                    >
                      Connect Email
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ padding: "10px 40px", marginLeft: "5px" }}
                      onClick={handleClickOpen}
                    >
                      Send Email
                    </Button>
                  </Box>
                </Grid>
              </Grid>

              <Grid container>
                <Grid xs={8}>
                  <Typography>
                    To connect emails to the DigiFi Loan Origination System,
                    please CC or BCC the following email address on your
                    outbound emails:
                  </Typography>

                  <Typography mt={1}>
                    0-fw19519jeweweeruidfkjdfh@mail.digifyllc
                  </Typography>
                </Grid>

                <Grid xs={4}>
                  <Image
                    src="/Group 455.svg"
                    alt="Picture of the author"
                    width={500}
                    height={500}
                  />
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </Box>
    </div>
  );
}
Contact.layout = "AdminLayout";

export default Contact;
