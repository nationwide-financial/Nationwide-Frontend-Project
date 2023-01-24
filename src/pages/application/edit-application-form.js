import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CachedIcon from "@mui/icons-material/Cached";
import SyncAltOutlinedIcon from "@mui/icons-material/SyncAltOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ViewCompactOutlinedIcon from "@mui/icons-material/ViewCompactOutlined";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import { styled } from "@mui/material/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AvatarGroup from "@mui/material/AvatarGroup";
import {
  MoreVert,
  Rotate90DegreesCcw,
  Search,
  TuneOutlined,
} from "@mui/icons-material";
import Switch, { SwitchProps } from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import { useRouter } from "next/router";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Paper from "@mui/material/Paper";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import Link from "@mui/material/Link";
// import { styled } from '@mui/material/styles';
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

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
import OutlinedInput from "@mui/material/OutlinedInput";
// import Switch from '@mui/material/Switch';
import Image from "next/image";
import DatasetRoundedIcon from "@mui/icons-material/DatasetRounded";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// import AvatarGroup from '@mui/material/AvatarGroup';
import {
  _fetchContactById,
  _updateContactById,
} from "../../services/contactServices.js";
import {
  _getApplicationById,
  _manageTeamMembers,
} from "../../services/applicationService.js";
import { _getAllPlatformUserByAdmin } from "../../services/authServices.js";
function topleftcreateData(leftData, rightData) {
  return { leftData, rightData };
}

const topleftrows = [
  topleftcreateData("First Name", "Phillip"),
  topleftcreateData("Email", "Johnsmith@gmail.com"),
  topleftcreateData("ID Number", "555-55-5555"),
  topleftcreateData("Street Address", "123 Apple Lane"),
];

// TopRight

function toprightcreateData(leftData, rightData) {
  return { leftData, rightData };
}

const toprightrows = [
  toprightcreateData("Last Name", "Cooper"),
  toprightcreateData("Phone", "(239) 555-0108"),
  toprightcreateData("Date of Birth", "04/23/1980"),
  toprightcreateData("Postal Code", "10004"),
];

// bottom rowws

// DownLeft

function downleftcreateData(leftData, rightData) {
  return { leftData, rightData };
}

const downleftrows = [
  downleftcreateData("Company Name", "ABC Technology"),
  downleftcreateData("Job Title ", "Software Engineer"),
];

// DownRight

function downrightcreateData(leftData, rightData) {
  return { leftData, rightData };
}

const downrightrows = [
  downrightcreateData("Year at Job", "8"),
  // downcreateData('Decline Reason ','The Customer did not respond'),
];

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

// table-with-pagination-related-----end---

// tab-set-related-------

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
// ------

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

function EditApplicationForm() {
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

  const [EditMemberOpen, setEditMemberOpen] = React.useState(false);

  const handleEditMemberClickOpen = () => {
    setEditMemberOpen(true);
  };
  const handleEditMemberClose = () => {
    setEditMemberOpen(false);
  };

  const members = [
    {
      value: "name",
      label: "Denise Yancovec",
    },
  ];

  const [member, setMember] = React.useState("text");

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleContinue = () => {
    // setOpen(false);

    router.push("/application/new-application");
  };

  const handleAddContacts = () => {
    router.push("/application/add-new-contact");
  };

  // table-related---
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // table-related---

  // application-related-function--

  const handleEditDetails = () => {
    // setShowContent(true)
    setShowContent(!showContent);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const [switchEditMode, setSwitchEditMode] = useState(false);
  const [applicationData, setApplicationData] = useState([]);
  const [contactData, setContactData] = useState({});
  const [cocontactData, setCocontactData] = useState([]);
  const [teamMembersData, setTeamMembersData] = useState([]);

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
  const [country, setCountry] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [yearAtJob, setYearAtJob] = useState("");

  //console.log(applicationData?.members);
  const [personName, setPersonName] = useState([]);
  const setInitialStateOfTeam = (ids) => {
    setPersonName([...ids]);
  };
  const handleChangeEditTeamMember = async (event) => {
    const {
      target: { value },
    } = event;
    let users = typeof value === "string" ? value.split(",") : value;
    setPersonName(users);
  };

  const handleAddTeamMember = async (id, users) => {
    try {
      let body = {
        members: users,
      };
      const res = await _manageTeamMembers(id, body);
      if (res && res?.status == 200) {
       // alert("Updated the team members");
        handleSuccessMessage()
        setMessage("Updated the team members")
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getTeamMembers = async () => {
    try {
      const res = await _getAllPlatformUserByAdmin(1, 100);
      if (res?.status == 200) {
        return res.data?.users?.results;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCocontactData = async (ids) => {
    try {
      if (ids) {
        let cocontactDataArray = [];
        for (let i = 0; i < ids.length; i++) {
          const res = await _fetchContactById(ids[i]);
          cocontactDataArray.push(res?.data?.Item);
        }
        return cocontactDataArray;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getContactData = async (id) => {
    try {
      if (id) {
        const res = await _fetchContactById(id);
        if (res?.data?.Item && res.status == 200) {
          return res?.data?.Item;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getApplicationData = async (id) => {
    try {
      const res = await _getApplicationById(id);
      let dataObject = res?.data?.data?.Items[0];
      return dataObject;
    } catch (err) {
      console.log(err);
    }
  };

  async function getData() {
    if (!router.isReady) return;
    const query = router.query;
    let applicationID = query.applicationId;
    console.log("****applicationID", applicationID);

    const applicationDataObject = await getApplicationData(applicationID);
    setInitialStateOfTeam(applicationDataObject?.members);
    setApplicationData(applicationDataObject);

    console.log("*****applicationDataObject", applicationDataObject);

    const contactDataArray = await getContactData(
      applicationDataObject?.contactId[0]
    );
    setContactData(contactDataArray);
    console.log("*****contactDataArray", contactDataArray);

    const coContactDataArray = await getCocontactData(
      applicationDataObject?.coContact
    );
    setCocontactData([...coContactDataArray]);
    console.log("******coContactDataArray", coContactDataArray);

    const teamMembersArray = await getTeamMembers();
    setTeamMembersData([...teamMembersArray]);
    console.log("*****teamMembersArray", teamMembersArray);

    setPhoneNumber(contactDataArray?.basicInformation?.phone);
    setFirstName(contactDataArray?.basicInformation?.firstName);
    setLastName(contactDataArray?.basicInformation?.lastName);
    setEmail(contactDataArray?.basicInformation?.email);
    setDob(contactDataArray?.basicInformation?.dob);
    setIdNumber(contactDataArray?.basicInformation?.idNumber);
    setCity(contactDataArray?.basicInformation?.city);
    setStreetAddress(contactDataArray?.basicInformation?.streetAddress);
    setPostalCode(contactDataArray?.basicInformation?.postalCode);
    setProvince(contactDataArray?.basicInformation?.state);
    setCountry(contactDataArray?.basicInformation?.country);
    setCompanyName(contactDataArray?.jobInformation?.companyName);
    setJobTitle(contactDataArray?.jobInformation?.jobTitle);
    setYearAtJob("");
  }

  const [submitErr, setSubmitErr] = useState("");

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
      } else if (
        !streetAddress ||
        streetAddress == "" ||
        streetAddress == null
      ) {
        setSubmitErr("street address can not be empty !");
      } else if (!postalCode || postalCode == "" || postalCode == null) {
        setSubmitErr("postal code can not be empty !");
      } else if (!province || province == "" || province == null) {
        setSubmitErr("province code can not be empty !");
      } else if (!country || country == "" || country == null) {
        setSubmitErr("country code can not be empty !");
      } else if (!phoneNumber || phoneNumber == "" || phoneNumber == null) {
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
            country: country,
          },
          jobInformation: {
            companyName: companyName,
            jobTitle: jobTitle,
          },
        };
        const res = await _updateContactById(id, body);
        console.log("_updateContactById", res);
        if (res?.status == 200) {
          //alert("Updated");
          handleSuccessMessage()
          setMessage("Updated")
          setSwitchEditMode((switchEditMode) => !switchEditMode);
          getData();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [router.isReady, router.query]);

  return (
    <div>
      <Snackbar open={openSuccessMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage}>
        <Alert onClose={handleCloseSuccessMessage} severity="success" sx={{ width:"100%" }} style={{backgroundColor:'lightgreen'}}>
          {message}
        </Alert>
     </Snackbar>
      <Box p={4} style={{ marginTop:40 }}>
        {/* 1st-header-section */}
        <Grid container mb={5}>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1}>
              <h1 className="page_header">Application Form</h1>
              <Stack direction="row" spacing={1} pb={2} bottom={15}>
                <AvatarGroup max={4}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                  />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar
                    alt="Agnes Walker"
                    src="/static/images/avatar/4.jpg"
                  />
                  <Avatar
                    alt="Trevor Henderson"
                    src="/static/images/avatar/5.jpg"
                  />
                  <Avatar
                    alt="Trevor Henderson"
                    src="/static/images/avatar/5.jpg"
                  />
                  <Avatar
                    alt="Trevor Henderson"
                    src="/static/images/avatar/5.jpg"
                  />
                  <Avatar
                    alt="Trevor Henderson"
                    src="/static/images/avatar/5.jpg"
                  />
                </AvatarGroup>

                <Link
                  className="page_sub_outlineless_text_btn"
                  style={{ textDecoration: "none", cursor: "pointer" }}
                  onClick={handleEditMemberClickOpen}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    mt={1}
                    style={{ fontSize: 18, fontWeight: 500 }}
                  >
                    <NoteAltOutlinedIcon mt={1} />
                    <Typography> Edit Team Members </Typography>
                  </Stack>
                </Link>
              </Stack>
              <Dialog
                open={EditMemberOpen}
                onClose={handleEditMemberClose}
                fullWidth
              >
                <Box sx={{ width: 1000, maxWidth: "100%" }}>
                  <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleEditMemberClose}
                  >
                    <Typography
                      variant="h6"
                      style={{
                        fontSize: 30,
                        fontFamily: "Gilroy-Bold",
                        fontWeight: "bold",
                      }}
                    >
                      Team Members
                    </Typography>
                    <Typography
                      variant="h6"
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        fontFamily: "Montserrat",
                        fontStyle: "normal",
                      }}
                    >
                      Assign team Members
                    </Typography>
                  </BootstrapDialogTitle>

                  <DialogContent>
                    <FormControl
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <label></label>
                      <Box sx={{ maxWidth: "100%" }}>
                        <Box
                          sx={{
                            width: "100%",
                            height: 300,
                          }}
                        >
                          <div>
                            <Grid container spacing={{ xs: 2, md: 3 }}>
                              <div style={{ marginTop: "20px" }}>
                                <FormControl sx={{ m: 1, width: 580 }}>
                                  {/* <InputLabel id="demo-multiple-chip-label">Chip</InputLabel> */}
                                  <Select
                                    // labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={personName}
                                    onChange={handleChangeEditTeamMember}
                                    // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => (
                                      <Box
                                        sx={{
                                          display: "flex",
                                          flexWrap: "wrap",
                                          gap: 0.5,
                                        }}
                                      >
                                        {selected.map((value) => (
                                          <Chip
                                            key={value}
                                            label={value}
                                            avatar={
                                              <Avatar
                                                alt="Natacha"
                                                src="../images/img1.png"
                                              />
                                            }
                                          />
                                        ))}
                                      </Box>
                                    )}
                                    MenuProps={MenuProps}
                                  >
                                    {teamMembersData.map((object, key) => (
                                      <MenuItem
                                        key={key}
                                        value={object?.PK.split("#")[1] || ""}
                                      >
                                        {object?.PK.split("#")[1] || ""}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </div>
                              {/* {Array.from(Array(6)).map((_, index) => (
                                <Grid item xs={6} sm={6} md={6} key={index}>
                                  {members.map((option) => (
                                    <div
                                      key={option.value}
                                      value={option.value}
                                      style={{
                                        backgroundColor: "#e0e0e0",
                                        width: 200,
                                        height: 50,
                                        padding: 5,
                                      }}
                                    >
                                      <Grid container spacing={1}>
                                        <Grid item xs>
                                          <Avatar
                                            alt="avatar1"
                                            src="../images/img1.png"
                                          />
                                        </Grid>

                                        <Grid item xs align="left">
                                          <div>{option.label}</div>
                                        </Grid>
                                      </Grid>
                                    </div>
                                  ))}
                                </Grid>
                              ))}
                               */}
                            </Grid>
                          </div>
                        </Box>
                      </Box>
                    </FormControl>
                  </DialogContent>

                  <DialogActions>
                    <Button
                      variant="contained"
                      alignItems="left"
                      onClick={() => {
                        handleAddTeamMember(applicationData?.PK, personName);
                        handleEditMemberClose();
                      }}
                    >
                      Save Changes
                    </Button>
                  </DialogActions>
                </Box>
              </Dialog>
            </Stack>
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
              <Tab label="Contact Profile" {...a11yProps(0)} />
              <Tab label="Co-Contact Profile" {...a11yProps(1)} />
              <Tab label="Application Details" {...a11yProps(1)} />
            </Tabs>
          </Box>

          {/* Profile-related-tab */}
          <TabPanel value={value} index={0}>
            <Grid item xs={12} md={6} mt={2}>
              <Typography variant="h5" mt={3} mb={2}>
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
                      <Typography> Back </Typography>
                    </Stack>
                  </Link>
                )}
              </Stack>
            </Grid>

            {!switchEditMode ? (
              <Box sx={{ minWidth: 275 }}>
                <Grid mt={4}>
                  <Typography align="left" fontSize={20} fontWeigh={700}>
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
                              {contactData?.basicInformation?.firstName || ""}
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
                              {contactData?.basicInformation?.email || ""}
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
                              {contactData?.basicInformation?.idNumber || ""}
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
                              {contactData?.basicInformation?.streetAddress ||
                                ""}
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
                              {contactData?.basicInformation?.lastName || ""}
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
                              {contactData?.basicInformation?.phone || ""}
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
                              {contactData?.basicInformation?.dob || ""}
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
                              {contactData?.basicInformation?.postalCode || ""}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
                <Grid mt={4}>
                  <Typography align="left" fontSize={20} fontWeigh={700}>
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
                              {contactData?.jobInformation?.companyName || ""}
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
                              {contactData?.jobInformation?.jobTitle || ""}
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
                            {/* <TableCell
                              component="th"
                              scope="row"
                              style={{
                                fontSize: 20,
                                fontWeight: 400,
                                color: "#393939",
                              }}
                            >
                              {"Year at Job"}
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
                            </TableCell> */}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid mt={6}></Grid>
                </Grid>
              </Box>
            ) : (
              <div>
                <Box sx={{ minWidth: 275 }}>
                  <Grid mt={4}>
                    <Typography align="left" fontSize={20} fontWeigh={700}>
                      Basic Information
                    </Typography>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TableContainer
                        style={{ backgroundColor: "transparent" }}
                      >
                        <Table aria-label="simple table">
                          <TableBody>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
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
                                <TextField
                                  fullWidth
                                  autoFocus
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
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
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
                                <TextField
                                  fullWidth
                                  autoFocus
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
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
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
                                <TextField
                                  fullWidth
                                  autoFocus
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
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
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
                                <TextField
                                  fullWidth
                                  autoFocus
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
                                />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid item xs={6}>
                      <TableContainer
                        style={{ backgroundColor: "transparent" }}
                      >
                        <Table aria-label="simple table">
                          <TableBody>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
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
                                <TextField
                                  fullWidth
                                  autoFocus
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
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
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
                                <TextField
                                  fullWidth
                                  autoFocus
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
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
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
                                <TextField
                                  fullWidth
                                  autoFocus
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  value={dob}
                                  onChange={(e) => {
                                    setDob(e.target.value);
                                  }}
                                  style={{ margin: 0 }}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
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
                                <TextField
                                  fullWidth
                                  autoFocus
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
                                />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                  {/* down */}
                  <Grid mt={4}>
                    <Typography align="left" fontSize={20} fontWeigh={700}>
                      Financial Information
                    </Typography>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TableContainer
                        style={{ backgroundColor: "transparent" }}
                      >
                        <Table aria-label="simple table">
                          <TableBody>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
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
                                <TextField
                                  fullWidth
                                  autoFocus
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
                                />
                              </TableCell>
                            </TableRow>

                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
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
                                <TextField
                                  fullWidth
                                  autoFocus
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
                                />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>

                    <Grid item xs={6}>
                      <TableContainer
                        style={{ backgroundColor: "transparent" }}
                      >
                        <Table aria-label="simple table">
                          <TableBody>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              {/* <TableCell
                                component="th"
                                scope="row"
                                style={{
                                  fontSize: 20,
                                  fontWeight: 400,
                                  color: "#393939",
                                }}
                              >
                                {"Year at Job"}
                              </TableCell>
                              <TableCell
                                align="left"
                                style={{
                                  fontSize: 20,
                                  fontWeight: 600,
                                  color: "#393939",
                                }}
                              >
                                <TextField
                                  fullWidth
                                  autoFocus
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder="Text"
                                  value={yearAtJob}
                                  onChange={(e) => {
                                    setYearAtJob(e.target.value);
                                  }}
                                  style={{ margin: 0 }}
                                />
                              </TableCell> */}
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid mt={6}>
                      <p style={{ color: "red" }}> {submitErr} </p>
                      <div
                        style={{
                          marginBottom: 100,
                          display: "flex",
                          justifyContent: "left",
                          margin: 20,
                        }}
                      >
                        <Button
                          onClick={() => {
                            handelSubmitContact(contactData.PK);
                          }}
                          variant="outlined"
                        >
                          Save
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            )}
          </TabPanel>
        </Box>
      </Box>
    </div>
  );
}
EditApplicationForm.layout = "AdminLayout";

export default EditApplicationForm;
