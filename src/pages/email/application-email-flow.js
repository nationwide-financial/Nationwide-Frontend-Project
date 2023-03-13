// import { Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import {
//   Avatar,
//   Grid,
//   InputAdornment,
//   TextField,
//   AvatarGroup,
//   CircularProgress,
//   Box,
//   Alert,
//   Stack,
//   Snackbar,
//   TableHead,
// } from "@mui/material";
// import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
// import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
// import Button from "@mui/material/Button";

// function ApplicationEmailFlow() {
//   return (
//     <>
//       <Box>
//         <Grid container>
//           <Grid item xs={8}>
//             <Stack direction="row">
//               <Typography style={{ fontWeight: 700, fontSize: 45 }}>
//                 Cameron Williamson
//               </Typography>
//               <Typography
//                 style={{ fontWeight: 700, fontSize: 45, color: "#0B72F1" }}
//               >
//                 $200,000
//               </Typography>
//             </Stack>
//             <Stack direction="row">

//             </Stack>
//           </Grid>
//           <Grid
//             item
//             xs={4}
//             style={{ display: "flex", justifyContent: "right" }}
//           >
//             <Stack direction="row" spacing={1}>
//               <LoopOutlinedIcon />
//               <Button variant="contained">Change status</Button>
//               <MoreVertOutlinedIcon />
//             </Stack>
//           </Grid>
//         </Grid>
//       </Box>
//     </>
//   );
// }

// ApplicationEmailFlow.layout = "AdminLayout";

// export default ApplicationEmailFlow;

import React from "react";
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
import { useState } from "react";
// import MultipleSelectDemo from "../../components/popM";
import Chip from "@mui/material/Chip";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
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

const avatarSet = (
  <React.Fragment>
    <Grid item md={1} align="right" pl={14} ml={2}>
      <AvatarGroup total={5} sx={{ width: 24, height: 24 }}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
      </AvatarGroup>
    </Grid>
  </React.Fragment>
);

// email-related-table-data--------------
function emailcreateData(datedata, fromdata, todata, subject) {
  return { datedata, fromdata, todata, subject };
}

const emaildatarows = [
  emailcreateData(
    "Feb 23, 2022 8:38 PM",
    "tim.jennings@example.com",
    "d.chambers@example.com",
    "The information you requested"
  ),
  emailcreateData(
    "Feb 23, 2022 8:38 PM",
    "no-reply@example.com",
    "tim.jennings@example.com",
    "We need additional Information"
  ),
  emailcreateData(
    "Feb 23, 2022 8:38 PM",
    "no-reply@example.com",
    "tim.jennings@example.com",
    "Your document were reviewed"
  ),
  emailcreateData(
    "Feb 23, 2022 8:38 PM",
    "no-reply@example.com",
    "Nevaeh.simmons@example.com",
    "Your application is in review"
  ),
  emailcreateData(
    "Feb 23, 2022 8:38 PM",
    "tim.jennings@example.com",
    "d.chambers@example.com",
    "My application information"
  ),
];

// application-related-table-data-set----
// TopLeft

function topfirsttblcreateData(leftData, rightData) {
  return { leftData, rightData };
}

const topfirstrows = [
  topfirsttblcreateData("Application Date", " Oct. 17, 2021, 9:48 AM"),
  topfirsttblcreateData("Team Members", avatarSet),
  topfirsttblcreateData("Intermediary", " ABC Broker (1.5%)"),
];

// second---

function topsecondtblcreateData(leftData, rightData) {
  return { leftData, rightData };
}

const topsecondrows = [
  topsecondtblcreateData("Email", " j.adams@example.com"),
  topsecondtblcreateData("Phone", "(555) 555-0118"),
  topfirsttblcreateData("ID Number", " 123-45-6789"),
  topfirsttblcreateData("Date of Birth", " Nov 25, 1987"),
  topfirsttblcreateData(
    "Address",
    " 271S Ash Dr., San Jose SouthDakota, USA 83475"
  ),
];

function topthirdtblcreateData(leftData, rightData) {
  return { leftData, rightData };
}

const topthirdrows = [
  topsecondtblcreateData("Email", " j.adams@example.com"),
  topsecondtblcreateData("Phone", "(555) 555-0118"),
  topfirsttblcreateData("ID Number", " 123-45-6789"),
  topfirsttblcreateData("Date of Birth", " Nov 25, 1987"),
  topfirsttblcreateData(
    "Address",
    " 271S Ash Dr., San Jose SouthDakota, USA 83475"
  ),
];

// down

function downfirsttblcreateData(leftData, rightData) {
  return { leftData, rightData };
}

const downfirstrows = [
  downfirsttblcreateData("Stated Income", " $90,000"),
  downfirsttblcreateData("Job Title", "Data Engineer"),
  downfirsttblcreateData("Company", "ABC Company"),
  downfirsttblcreateData("Employed since", "02/01/2019"),
  downfirsttblcreateData("Active Military?", "FALSE"),
];

function downsecondtblcreateData(leftData, rightData) {
  return { leftData, rightData };
}

const downsecondrows = [
  downsecondtblcreateData("Credit Score", " 726"),
  downsecondtblcreateData("Recent Credit Inquiries", "1"),
  downsecondtblcreateData("Number of Open Accountsr", " 4"),
  downsecondtblcreateData("Total Debt Outstanding", " $284,019"),
  downsecondtblcreateData("None Mortgage Debt Outsta..", " $8201"),
];

function downthirdtblcreateData(leftData, rightData) {
  return { leftData, rightData };
}

const downthirdrows = [
  downthirdtblcreateData("Property Type", " Apartment"),
  downthirdtblcreateData("Estimated Property Value", "$410,000"),
];

// --------end---------------------------
// task-related-data
function createData(
  status,
  assignto,
  description,
  blockstatus,
  duedate,
  updated
) {
  return { status, assignto, description, blockstatus, duedate, updated };
}

const rows = [
  createData(
    <span
      className="verified_label"
      style={{ color: "red", backgroundColor: " #ffa199 " }}
    >
      {" "}
      NOT DONE{" "}
    </span>,
    "ABC Loan Broker",
    "Review the Borrower’s ID doc...",
    "Approved",
    "Dec. 19, 2021",
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/Ellise 179(1).png" />
      <span>Dec 19,2021 11.24 AM</span>
    </Stack>,
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/Ellise 179(1).png" />
      <span>Dec 19,2021 11.24 AM</span>
    </Stack>
  ),
  createData(
    <span
      className="verified_label"
      style={{ color: "red", backgroundColor: "#ffa199 " }}
    >
      {" "}
      NOT DONE
    </span>,
    "ABC Loan Broker",
    "Upload your financial Statement",
    "Approved",
    "Dec. 19, 2021",
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/Ellise 179(1).png" />
      <span>Dec 19,2021 11.24 AM</span>
    </Stack>,
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/Ellise 179(1).png" />
      <span>Dec 19,2021 11.24 AM</span>
    </Stack>
  ),
  createData(
    <span
      className="verified_label"
      style={{ color: "red", backgroundColor: "#ffa199 " }}
    >
      {" "}
      NOT DONE{" "}
    </span>,
    "ABC Loan Broker",
    "Select loan amount",
    "Approved",
    "Dec. 19, 2021",
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/Ellise 179(1).png" />
      <span>Dec 19,2021 11.24 AM</span>
    </Stack>,
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/Ellise 179(1).png" />
      <span>Dec 19,2021 11.24 AM</span>
    </Stack>
  ),
  createData(
    <span
      className="verified_label"
      style={{ color: "blue", backgroundColor: "#9bc0ff" }}
    >
      {" "}
      IN REVIEW
    </span>,
    "ABC Loan Broker",
    "Request all documents",
    "Underwriting",
    "Dec. 19, 2021",
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/Ellise 179(1).png" />
      <span>Dec 19,2021 11.24 AM</span>
    </Stack>,
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/Ellise 179(1).png" />
      <span>Dec 19,2021 11.24 AM</span>
    </Stack>
  ),
  createData(
    <span
      className="verified_label"
      style={{ color: "green", backgroundColor: "#9bc0ff" }}
    >
      {" "}
      DONE
    </span>,
    "ABC Loan Broker",
    "Complete application forms",
    "Underwriting",
    "Dec. 19, 2021",
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/Ellise 179(1).png" />
      <span>Dec 19,2021 11.24 AM</span>
    </Stack>,
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/Ellise 179(1).png" />
      <span>Dec 19,2021 11.24 AM</span>
    </Stack>
  ),
].sort((a, b) => (a.assignto < b.assignto ? -1 : 1));

// history-related-table-data------
function createHistoryData(leftdata, rightdata) {
  return { leftdata, rightdata };
}

const historyrelatedrows = [
  createHistoryData(
    <Stack direction="row" spacing={1}>
      <DatasetRoundedIcon
        fontSize="large"
        style={{
          borderRadius: 50,
          backgroundColor: "#1478F1",
          color: "#fff",
          marginTop: 5,
        }}
      />{" "}
      <Grid>
        <Typography align="left" style={{ fontSize: 16, fontWeight: 600 }}>
          Application Created
        </Typography>
        <Typography align="left" style={{ fontSize: 16, fontWeight: 400 }}>
          The application for Cameron Williamson was created.
        </Typography>
      </Grid>
    </Stack>,
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/Ellise 179(1).png" />
      <span style={{ marginTop: 5 }}>Feb 23, 2022 8:38 PM</span>
    </Stack>
  ),
  createHistoryData(
    <Stack direction="row" spacing={1}>
      <DatasetRoundedIcon
        fontSize="large"
        style={{
          borderRadius: 50,
          backgroundColor: "#1478F1",
          color: "#fff",
          marginTop: 5,
        }}
      />{" "}
      <Grid>
        <Typography align="left" style={{ fontSize: 16, fontWeight: 600 }}>
          Changed Application Status
        </Typography>
        <Typography align="left" style={{ fontSize: 16, fontWeight: 400 }}>
          This status of Cameron Williamson’s application was updated from
          Received to New Opportunities
        </Typography>
      </Grid>
    </Stack>,
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/Ellise 179(1).png" />
      <span style={{ marginTop: 5 }}>Feb 23, 2022 8:38 PM</span>
    </Stack>
  ),
  createHistoryData(
    <Stack direction="row" spacing={1}>
      <DatasetRoundedIcon
        fontSize="large"
        style={{
          borderRadius: 50,
          backgroundColor: "#1478F1",
          color: "#fff",
          marginTop: 5,
        }}
      />{" "}
      <Grid>
        <Typography align="left" style={{ fontSize: 16, fontWeight: 600 }}>
          Added New Task
        </Typography>
        <Typography align="left" style={{ fontSize: 16, fontWeight: 400 }}>
          The following task was created. “Verify identification documents”.
        </Typography>
      </Grid>
    </Stack>,
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/Ellise 179(1).png" />
      <span style={{ marginTop: 5 }}>Feb 23, 2022 8:38 PM</span>
    </Stack>
  ),
  createHistoryData(
    <Stack direction="row" spacing={1}>
      <DatasetRoundedIcon
        fontSize="large"
        style={{
          borderRadius: 50,
          backgroundColor: "#1478F1",
          color: "#fff",
          marginTop: 5,
        }}
      />{" "}
      <Grid>
        <Typography align="left" style={{ fontSize: 16, fontWeight: 600 }}>
          Updated Task Status
        </Typography>
        <Typography align="left" style={{ fontSize: 16, fontWeight: 400 }}>
          The status the following task was updated from Not Done to In Review:
          “Verify identification documents”.
        </Typography>
      </Grid>
    </Stack>,
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/Ellise 179(1).png" />
      <span style={{ marginTop: 5 }}>Feb 23, 2022 8:38 PM</span>
    </Stack>
  ),
].sort((a, b) => (a.leftdata < b.leftdata ? -1 : 1));

// note-related-table-data
function createNoteData(leftdata, middledata, rightdata) {
  return { leftdata, middledata, rightdata };
}

const noterelatedrows = [
  createNoteData(
    <Typography>Feb 23, 2022 8:38 PM</Typography>,
    <Typography>
      The borrower called to discuss their income documentation. They indicated
      that more....<span style={{ color: "#1478F1" }}>Read more</span>{" "}
    </Typography>,
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/Ellise 179(1).png" />
      <span style={{ marginTop: 5 }}>Debra Holt</span>
    </Stack>
  ),
  createNoteData(
    <Typography>Feb 23, 2022 8:38 PM</Typography>,
    <Typography>
      I reached out to the borrower about their income. They will call back.{" "}
    </Typography>,
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/Ellise 179(1).png" />
      <span style={{ marginTop: 5 }}>Debra Holt</span>
    </Stack>
  ),
].sort((a, b) => (a.leftdata < b.leftdata ? -1 : 1));

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

function ApplicationEmailFlow() {
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
  const [showContent, setShowContent] = useState(false);

  const handleEditDetails = () => {
    // setShowContent(true)
    setShowContent(!showContent);
  };

  return (
    <div>
      <Box p={6}>
        {/* 1st-header-section */}
        <Grid container mb={5}>
          <Grid item xs={12} md={9}>
            <h1 className="page_header">
              Cameron Williamson
              <span style={{ color: "#0B72F1" }}>$200,000</span>
            </h1>
            <Grid item xs={12} my={3}>
              <Stack direction="row" spacing={1}>
                <Stack direction="row" spacing={1}>
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 24, height: 24 }}
                  />{" "}
                  <span style={{ fontSize: 16, fontWeight: 500, marginTop: 2 }}>
                    Updated December 19, 2021, 11:24 AM
                  </span>
                </Stack>
                <Chip
                  label="PHONE LEAD"
                  onClick={handleClick}
                  onDelete={handleDelete}
                  style={{
                    color: "#16C6AF",
                    backgroundColor: "#E4F7F6",
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                  CloseOutlinedIcon={<CloseOutlinedIcon />}
                />

                <Chip
                  label="EXISTING CUSTOMER"
                  onClick={handleClick}
                  onDelete={handleDelete}
                  style={{
                    color: "#393939",
                    backgroundColor: "#D9D9D9",
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                />

                <ControlPointIcon />
              </Stack>
            </Grid>
          </Grid>

          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: "right" }}>
              {/* icon-4 */}
              <Stack direction="row" spacing={2}>
                <Grid>
                  <IconButton
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: 1,
                      border: "1px solid",
                      borderColor: "gray",
                      marginRight: 2,
                    }}
                    aria-label="save"
                  >
                    <SyncOutlinedIcon fontSize="large" sx={{ color: "gray" }} />
                  </IconButton>
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    className="changeStatus_btn1"
                    style={{ borderRadius: 12, padding: 5 }}
                  >
                    Change Status
                  </Button>
                </Grid>
                <Grid>
                  <IconButton
                    sx={{ width: 10, height: 10, marginRight: 2 }}
                    aria-label="save"
                  >
                    <MoreVertIcon fontSize="large" />
                  </IconButton>
                </Grid>
              </Stack>
              {/* dialog -start--- */}

              <Dialog open={open} onClose={handleClose} fullWidth m={4}>
                {/* <DialogTitle >New Product</DialogTitle> */}
                <Box sx={{ width: 1000, maxWidth: "100%" }}>
                  <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                  >
                    <Typography variant="h6" style={{ fontSize: 30 }}>
                      New Application
                    </Typography>
                  </BootstrapDialogTitle>

                  <DialogContent>
                    <h1>dialog content</h1>
                  </DialogContent>
                  <div style={{ marginBottom: 100 }}>
                    <DialogActions
                      style={{ display: "flex", justifyContent: "left" }}
                    >
                      <Button variant="contained" onClick={handleContinue}>
                        Continue
                      </Button>
                    </DialogActions>
                  </div>
                </Box>
              </Dialog>
            </Box>
            {/* dialog- end----- */}
          </Grid>
        </Grid>

        {/* 2nd-sub-content-section */}
        <Box sx={{ backgroundColor: "#fff", padding: 5 }}>
          <Stack direction="row" spacing={1} p={5}>
            <Typography variant="h5" pl={0} id="applicationDataRelatedSubHead">
              Commercial Loan: New Opportunities{" "}
              <span style={{ color: "#0B72F1" }}>1/5</span>
            </Typography>
            {/* <Link href="#" style={{fontSize:18,fontWeight:500}}>  <span style={{paddingTop:15}}><NoteAltOutlinedIcon mt={2} /></span>Edit Decline Reasons</Link> */}
            <span style={{ color: "#0B72F1", paddingTop: 5 }}>
              <NoteAltOutlinedIcon fontSize="medium" />
            </span>
            <Button
              variant="text"
              style={{ fontSize: 18, fontWeight: 500 }}
              pb={3}
            >
              Edit Decline Reasons
            </Button>
          </Stack>

          <Grid container>
            <Grid xs={4} p={5}>
              <Stack direction="column">
                <div
                  align="left"
                  style={{
                    display: "inline-flex",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <Typography style={{ fontSize: 18, fontWeight: 700 }}>
                    Application ID{" "}
                  </Typography>
                  <span style={{ fontSize: 18, fontWeight: 700 }}>:</span>
                  <Typography style={{ fontSize: 18, fontWeight: 700 }}>
                    #6838960
                  </Typography>
                </div>
                <Divider />
                <Typography
                  align="left"
                  mt={2}
                  style={{ fontSize: 18, fontWeight: 500, color: "#858585" }}
                >
                  Application Date
                </Typography>
                <Typography
                  align="left"
                  mt={0}
                  style={{ fontSize: 20, fontWeight: 600, color: "#858585" }}
                >
                  Oct. 17, 2021, 9:48 AM
                </Typography>
              </Stack>
            </Grid>
            <Grid xs={4} p={5}>
              <Stack direction="column">
                <div
                  align="left"
                  style={{
                    display: "inline-flex",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <Typography style={{ fontSize: 18, fontWeight: 700 }}>
                    Borrower{" "}
                  </Typography>
                  <span style={{ fontSize: 18, fontWeight: 700 }}>:</span>
                  <Typography style={{ fontSize: 18, fontWeight: 700 }}>
                    Jennifer Adams
                  </Typography>
                </div>
                <Divider />
                <Typography
                  align="left"
                  mt={2}
                  style={{ fontSize: 18, fontWeight: 500, color: "#858585" }}
                >
                  Email
                </Typography>
                <Typography
                  align="left"
                  mt={0}
                  style={{ fontSize: 20, fontWeight: 600, color: "#858585" }}
                >
                  j.adams@example.com
                </Typography>
              </Stack>
            </Grid>
            <Grid xs={4} p={5}>
              <Stack direction="column">
                <div
                  align="left"
                  style={{
                    display: "inline-flex",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <Typography style={{ fontSize: 18, fontWeight: 700 }}>
                    Co-Borrower{" "}
                  </Typography>
                  <span style={{ fontSize: 18, fontWeight: 700 }}>:</span>
                  <Typography style={{ fontSize: 18, fontWeight: 700 }}>
                    Devone Lane
                  </Typography>
                </div>
                <Divider />
                <Typography
                  align="left"
                  mt={2}
                  style={{ fontSize: 18, fontWeight: 500, color: "#858585" }}
                >
                  Email
                </Typography>
                <Typography
                  align="left"
                  mt={0}
                  style={{ fontSize: 20, fontWeight: 600, color: "#858585" }}
                >
                  lane@example.com
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* body-content-tab-set */}
        <Box sx={{ width: "100%" }} p={5}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Application Data" {...a11yProps(0)} />
              <Tab label="Tasks" {...a11yProps(1)} />
              <Tab label="Emails" {...a11yProps(2)} />
              <Tab label="Notes" {...a11yProps(3)} />
              <Tab label="Application History" {...a11yProps(4)} />
            </Tabs>
          </Box>
          {/* application-related-tab */}
          <TabPanel value={value} index={0}>
            {showContent ? (
              <Box id="edite-related-form">
                <Grid
                  item
                  xs={12}
                  md={6}
                  my={2}
                  pl={2}
                  mt={4}
                  mb={4}
                  display="inline-flex"
                >
                  <Stack direction="row" spacing={1}>
                    <Typography variant="h5" className=" page_sub_header">
                      <span style={{ paddingRight: 5 }}> Application Data</span>
                    </Typography>
                    <Link href="#" className="page_sub_outlineless_text_btn">
                      <Stack direction="row" spacing={1} mt={1}>
                        <NoteAltOutlinedIcon mt={4} />
                        <Typography>Edit Application Form</Typography>
                      </Stack>
                    </Link>
                  </Stack>
                </Grid>
                <Grid container>
                  {/* col-1 */}
                  <Grid item xs={4}>
                    <TableContainer style={{ backgroundColor: "transparent" }}>
                      <Typography fontWeight={700} pl={2}>
                        Financial Details
                      </Typography>

                      <Table aria-label="simple table">
                        <TableBody>
                          {downfirstrows.map((row) => (
                            <TableRow
                              key={row.leftData}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.leftData}
                              </TableCell>
                              <TableCell align="left">
                                {" "}
                                <TextField
                                  id="outlined-required"
                                  size="small"
                                  defaultValue={row.rightData}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  {/* col-2 */}

                  <Grid item xs={4} px={1}>
                    <TableContainer style={{ backgroundColor: "transparent" }}>
                      <Typography fontWeight={700} pl={2}>
                        Credit Report Summary
                      </Typography>

                      <Table aria-label="simple table">
                        <TableBody>
                          {downsecondrows.map((row) => (
                            <TableRow
                              key={row.leftData}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.leftData}
                              </TableCell>
                              {/* <TableCell align="left" sx={{width:20}}>{row.rightData}</TableCell> */}
                              <TableCell align="left">
                                {" "}
                                <TextField
                                  fullWidth
                                  id="outlined-required"
                                  size="small"
                                  defaultValue={row.rightData}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  {/* col=3 */}
                  <Grid item xs={4} px={1}>
                    {/* tbl2 */}
                    <TableContainer style={{ backgroundColor: "transparent" }}>
                      <Typography fontWeight={700} pl={2}>
                        Property Information
                      </Typography>

                      <Table aria-label="simple table">
                        <TableBody>
                          {downthirdrows.map((row) => (
                            <TableRow
                              key={row.leftData}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                sx={{ width: 20 }}
                              >
                                {row.leftData}
                              </TableCell>
                              {/* <TableCell align="left">{row.rightData}</TableCell> */}
                              <TableCell align="left">
                                {" "}
                                <TextField
                                  fullWidth
                                  id="outlined-required"
                                  size="small"
                                  defaultValue={row.rightData}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <Box id="default-valu-set-1">
                <Grid
                  item
                  xs={12}
                  md={6}
                  my={2}
                  pl={2}
                  mt={4}
                  mb={4}
                  display="inline-flex"
                >
                  <Typography variant="h6">
                    <span style={{ fontSize: 25, fontWeight: 700 }}>
                      Application Data
                    </span>
                    <span style={{ color: "#1478F1" }}>4/5</span>
                  </Typography>
                  <Link
                    href="#"
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: 18,
                      fontWeight: 500,
                    }}
                    onClick={handleEditDetails}
                  >
                    {" "}
                    <span style={{ paddingTop: 15 }}>
                      <NoteAltOutlinedIcon mt={2} />
                    </span>
                    Edit Data
                  </Link>
                </Grid>
                <Grid container>
                  {/* col-1 */}
                  <Grid item xs={4}>
                    <TableContainer style={{ backgroundColor: "transparent" }}>
                      <Typography fontWeight={700} pl={2}>
                        Financial Details
                      </Typography>

                      <Table aria-label="simple table">
                        <TableBody>
                          {downfirstrows.map((row) => (
                            <TableRow
                              key={row.leftData}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.leftData}
                              </TableCell>
                              <TableCell align="left">
                                {row.rightData}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  {/* col-2 */}

                  <Grid item xs={4} px={1}>
                    <TableContainer style={{ backgroundColor: "transparent" }}>
                      <Typography fontWeight={700} pl={2}>
                        Credit Report Summary
                      </Typography>

                      <Table aria-label="simple table">
                        <TableBody>
                          {downsecondrows.map((row) => (
                            <TableRow
                              key={row.leftData}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.leftData}
                              </TableCell>
                              <TableCell align="left" sx={{ width: 20 }}>
                                {row.rightData}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  {/* col=3 */}
                  <Grid item xs={4} px={1}>
                    {/* tbl2 */}
                    <TableContainer style={{ backgroundColor: "transparent" }}>
                      <Typography fontWeight={700} pl={2}>
                        Property Information
                      </Typography>

                      <Table aria-label="simple table">
                        <TableBody>
                          {downthirdrows.map((row) => (
                            <TableRow
                              key={row.leftData}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                sx={{ width: 20 }}
                              >
                                {row.leftData}
                              </TableCell>
                              <TableCell align="left">
                                {row.rightData}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Box>
            )}
          </TabPanel>
          {/* task-related-tab */}
          <TabPanel value={value} index={1}>
            {/* 1st-header-section */}
            <Grid container p={0} mb={2}>
              <Grid item xs={12} md={6}>
                <Typography style={{ fontSize: 21, fontWeight: 700 }}>
                  Tasks
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: "right" }}>
                  <Button
                    variant="contained"
                    sx={{ padding: "10px 40px" }}
                    onClick={handleClickOpen}
                  >
                    Create Task
                  </Button>

                  {/* dialog -start--- */}

                  <Dialog open={open} onClose={handleClose} fullWidth m={4}>
                    <Box sx={{ width: 1000, maxWidth: "100%" }}>
                      <BootstrapDialogTitle
                        id="customized-dialog-title"
                        onClose={handleClose}
                      >
                        <Typography
                          variant="h6"
                          style={{
                            fontSize: 21,
                            fontWeight: 700,
                            fontStyle: "normal",
                          }}
                        >
                          Create Task
                        </Typography>
                      </BootstrapDialogTitle>

                      <DialogContent>
                        <FormControl
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}

                          {/* Description related field */}
                          <FormControl
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
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
                                Description{" "}
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
                              />
                            </Box>
                          </FormControl>

                          {/* Assign To-related-field */}
                          <FormControl
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
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
                                Assign To{" "}
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
                              />
                            </Box>
                          </FormControl>

                          {/* Due Date related field */}

                          <FormControl
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
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
                                Due Date{" "}
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
                              />
                            </Box>
                          </FormControl>

                          <Stack direction="row" spacing={1}>
                            <Box sx={{ maxWidth: "100%" }}>
                              <FormGroup>
                                <Switch {...label} disabled />
                              </FormGroup>
                            </Box>
                            <label>
                              {" "}
                              <Typography
                                pt={1}
                                variant="h6"
                                style={{
                                  fontSize: 15,
                                  fontWeight: 500,
                                  color: "gray",
                                }}
                              >
                                Prevent applications from entering status(es) if
                                task is not done
                              </Typography>
                            </label>
                          </Stack>
                          <Stack direction="row" spacing={1}>
                            {/* <Box sx={{  maxWidth: '100%', }} >   */}
                            <FormGroup>
                              <Switch {...label} disabled />
                            </FormGroup>
                            {/* </Box> */}
                            <label>
                              {" "}
                              <Typography
                                pt={1}
                                variant="h6"
                                style={{
                                  fontSize: 15,
                                  fontWeight: 500,
                                  color: "gray",
                                }}
                              >
                                Include editable application data within the
                                task
                              </Typography>
                            </label>
                          </Stack>
                        </FormControl>
                      </DialogContent>
                      <div style={{ marginBottom: 100 }}>
                        <DialogActions
                          style={{ display: "flex", justifyContent: "left" }}
                        >
                          <Button variant="contained" onClick={handleContinue}>
                            Create Task
                          </Button>
                        </DialogActions>
                      </div>
                    </Box>
                  </Dialog>
                  {/* dialog- end----- */}
                </Box>
              </Grid>
            </Grid>

            <Grid container p={0} mt={2}>
              <Grid item xs={6}>
                <Grid container>
                  <Stack direction="row">
                    {/* header-search-section */}

                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <SearchOutlinedIcon fontSize="medium" />
                      </Grid>
                      <TextField
                        id="input-with-icon-textfield"
                        label="Search"
                        variant="standard"
                      />
                    </Grid>

                    {/* active-user-display-section */}

                    <AvatarGroup total={9}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      <Avatar
                        alt="Travis Howard"
                        src="/static/images/avatar/2.jpg"
                      />
                      <Avatar
                        alt="Agnes Walker"
                        src="/static/images/avatar/4.jpg"
                      />
                      <Avatar
                        alt="Trevor Henderson"
                        src="/static/images/avatar/5.jpg"
                      />
                    </AvatarGroup>
                  </Stack>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                {/* other-icon-set */}
                {/* <Grid item xs={12} md={6}> */}
                <Box sx={{ textAlign: "right" }}>
                  {/* icon-2 */}
                  <IconButton
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: 1,
                      border: "1px solid",
                      borderColor: "gray",
                      padding: 2,
                      marginRight: 2,
                    }}
                    aria-label="save"
                  >
                    <TuneOutlined sx={{ color: "gray" }} />
                  </IconButton>
                </Box>
                {/* </Grid> */}
              </Grid>
            </Grid>

            {/* table-related-section----- */}
            <Grid container>
              <TableContainer>
                <Table
                  sx={{ minWidth: 500 }}
                  aria-label="custom pagination table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">STATUS</TableCell>
                      <TableCell align="left">ASSIGNED TO</TableCell>
                      <TableCell align="left">DESCRIPTION</TableCell>
                      <TableCell align="left">BLOCKED STATUSES</TableCell>
                      <TableCell align="left">DUE DATE</TableCell>
                      <TableCell align="left">UPDATED</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? rows.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : rows
                    ).map((row) => (
                      <TableRow key={row.status}>
                        <TableCell component="th" scope="row">
                          {row.status}
                        </TableCell>
                        <TableCell align="left">{row.assignto}</TableCell>
                        <TableCell align="left">{row.description}</TableCell>
                        <TableCell align="left">{row.blockstatus}</TableCell>
                        <TableCell align="left">{row.duedate}</TableCell>
                        <TableCell align="left">{row.updated}</TableCell>
                      </TableRow>
                    ))}

                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
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
                        colSpan={3}
                        count={rows.length}
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
          </TabPanel>
          {/* email-related-tab */}
          <TabPanel value={value} index={2}>
            {/* 1st-header-section */}
            {showContent ? (
              <Box>
                <Grid container>
                  {/* email  table */}

                  <Grid item>
                    <Grid container p={0} mb={2}>
                      <Grid item xs={12} md={6}>
                        <Typography style={{ fontSize: 21, fontWeight: 700 }}>
                          Email
                        </Typography>
                      </Grid>
                    </Grid>

                    {/* sub-section */}
                    <Grid
                      container
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Stack direction="row">
                        {/* header-search-section */}

                        <Grid container spacing={1} alignItems="flex-end">
                          <Grid item>
                            <SearchOutlinedIcon fontSize="medium" />
                          </Grid>
                          <TextField
                            id="input-with-icon-textfield"
                            label="Search"
                            variant="standard"
                          />
                        </Grid>
                      </Stack>
                      {/* active-user-display-section */}
                    </Grid>
                  </Grid>
                  <Grid container>
                    {/* col-1 */}
                    <Grid item xs={12}>
                      <TableContainer
                        style={{ backgroundColor: "transparent" }}
                      >
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">Date</TableCell>
                              <TableCell align="left">From</TableCell>
                              <TableCell align="left">To</TableCell>
                              <TableCell align="left">Subject</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {emaildatarows.map((row) => (
                              <TableRow
                                key={row.datedata}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.datedata}
                                </TableCell>
                                <TableCell align="left">
                                  {row.fromdata}
                                </TableCell>
                                <TableCell align="left">{row.todata}</TableCell>

                                <TableCell align="left">
                                  {row.subject}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>

                    {/* </Grid> */}
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <Box>
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
                        onClick={handleEditDetails}
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

                      {/* dialog -start--- */}

                      <Dialog open={open} onClose={handleClose} fullWidth m={4}>
                        <Box sx={{ width: 1000, maxWidth: "100%" }}>
                          <BootstrapDialogTitle
                            id="customized-dialog-title"
                            onClose={handleClose}
                          >
                            <Typography
                              variant="h6"
                              style={{
                                fontSize: 21,
                                fontWeight: 700,
                                fontStyle: "normal",
                              }}
                            >
                              Create Task
                            </Typography>
                          </BootstrapDialogTitle>

                          <DialogContent>
                            <FormControl
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {/* Description related field */}
                              <FormControl
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
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
                                    Description{" "}
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
                                  />
                                </Box>
                              </FormControl>

                              {/* Assign To-related-field */}
                              <FormControl
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
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
                                    Assign To{" "}
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
                                  />
                                </Box>
                              </FormControl>

                              {/* Due Date related field */}

                              <FormControl
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
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
                                    Due Date{" "}
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
                                  />
                                </Box>
                              </FormControl>

                              <Stack direction="row" spacing={1}>
                                <Box sx={{ maxWidth: "100%" }}>
                                  <FormGroup>
                                    {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Include Co-Borrower Page" /> */}
                                    <Switch {...label} disabled />
                                  </FormGroup>
                                </Box>
                                <label>
                                  {" "}
                                  <Typography
                                    pt={1}
                                    variant="h6"
                                    style={{
                                      fontSize: 15,
                                      fontWeight: 500,
                                      color: "gray",
                                    }}
                                  >
                                    Prevent applications from entering
                                    status(es) if task is not done
                                  </Typography>
                                </label>
                              </Stack>
                              <Stack direction="row" spacing={1}>
                                {/* <Box sx={{  maxWidth: '100%', }} >   */}
                                <FormGroup>
                                  {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Include Co-Borrower Page" /> */}
                                  <Switch {...label} disabled />
                                </FormGroup>
                                {/* </Box> */}
                                <label>
                                  {" "}
                                  <Typography
                                    pt={1}
                                    variant="h6"
                                    style={{
                                      fontSize: 15,
                                      fontWeight: 500,
                                      color: "gray",
                                    }}
                                  >
                                    Include editable application data within the
                                    task
                                  </Typography>
                                </label>
                              </Stack>
                            </FormControl>
                          </DialogContent>
                          <div style={{ marginBottom: 100 }}>
                            <DialogActions
                              style={{
                                display: "flex",
                                justifyContent: "left",
                              }}
                            >
                              <Button
                                variant="contained"
                                onClick={handleContinue}
                              >
                                Create Task
                              </Button>
                            </DialogActions>
                          </div>
                        </Box>
                      </Dialog>
                      {/* dialog- end----- */}
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
                    {/* <Image
             src="/Group 455.svg"
             
             alt="Picture of the author"
             width={500}
             height={500}
    /> */}
                  </Grid>
                </Grid>{" "}
              </Box>
            )}
          </TabPanel>
          {/* Note-related-tab */}
          <TabPanel value={value} index={3}>
            {/* 1st-header-section */}
            <Grid container p={0} mb={2}>
              <Grid item xs={12} md={6}>
                <Typography style={{ fontSize: 21, fontWeight: 700 }}>
                  Notes
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: "right" }}>
                  <Button
                    variant="contained"
                    sx={{ padding: "10px 40px" }}
                    onClick={handleClickOpen}
                  >
                    Add Note
                  </Button>

                  {/* dialog -start--- */}

                  <Dialog open={open} onClose={handleClose} fullWidth m={4}>
                    <Box sx={{ width: 1000, maxWidth: "100%" }}>
                      <BootstrapDialogTitle
                        id="customized-dialog-title"
                        onClose={handleClose}
                      >
                        <Typography
                          variant="h6"
                          style={{
                            fontSize: 21,
                            fontWeight: 700,
                            fontStyle: "normal",
                          }}
                        >
                          Add Note
                        </Typography>
                      </BootstrapDialogTitle>

                      <DialogContent>
                        <FormControl
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}

                          {/* -------- */}

                          {/* Description related field */}
                          <FormControl
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
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
                                Content{" "}
                                <span style={{ color: "#FF0000" }}>*</span>
                              </Typography>
                            </label>
                            <Box sx={{ maxWidth: "100%" }}>
                              {/* <TextField fullWidth  autoFocus size="small"  margin="normal" id="outlined-basic"  variant="outlined"  /> */}
                              <TextareaAutosize
                                aria-label="empty textarea"
                                style={{ width: 555, height: 200 }}
                                id="outlined-basic"
                                variant="outlined"
                              />
                            </Box>
                          </FormControl>
                        </FormControl>
                      </DialogContent>
                      <div style={{ marginBottom: 100 }}>
                        <DialogActions
                          style={{ display: "flex", justifyContent: "left" }}
                        >
                          <Button variant="contained" onClick={handleContinue}>
                            Add Note
                          </Button>
                        </DialogActions>
                      </div>
                    </Box>
                  </Dialog>
                  {/* dialog- end----- */}
                </Box>
              </Grid>
            </Grid>

            <Grid container p={0} mt={2}>
              <Grid item xs={6}>
                <Grid container>
                  <Stack direction="row">
                    {/* header-search-section */}

                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <SearchOutlinedIcon fontSize="medium" />
                      </Grid>
                      <TextField
                        id="input-with-icon-textfield"
                        label="Search"
                        variant="standard"
                      />
                    </Grid>

                    {/* active-user-display-section */}

                    <AvatarGroup total={9}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      <Avatar
                        alt="Travis Howard"
                        src="/static/images/avatar/2.jpg"
                      />
                      <Avatar
                        alt="Agnes Walker"
                        src="/static/images/avatar/4.jpg"
                      />
                      <Avatar
                        alt="Trevor Henderson"
                        src="/static/images/avatar/5.jpg"
                      />
                    </AvatarGroup>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>

            {/* body-section-table-note related-- */}
            <Grid container>
              <TableContainer>
                <Table
                  sx={{ minWidth: 500 }}
                  aria-label="custom pagination table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">DATE</TableCell>
                      <TableCell align="left">CONTENT</TableCell>
                      <TableCell align="left">AUTHOR</TableCell>

                      {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? noterelatedrows.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : rows
                    ).map((row) => (
                      <TableRow key={row.leftdata}>
                        <TableCell component="th" scope="row">
                          {row.leftdata}
                        </TableCell>
                        <TableCell align="left">{row.middledata}</TableCell>

                        <TableCell align="left">{row.rightdata}</TableCell>
                      </TableRow>
                    ))}

                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
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
                        colSpan={3}
                        count={rows.length}
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
          </TabPanel>
          {/* Application History -related-tab */}
          <TabPanel value={value} index={4}>
            {/* 1st-header-section */}
            <Grid container p={0} mb={2}>
              <Grid item xs={12} md={6}>
                <Typography style={{ fontSize: 21, fontWeight: 700 }}>
                  Application History
                </Typography>
              </Grid>
            </Grid>
            {/* 2nd-head-section */}
            <Grid container p={0} mt={2}>
              <Grid item xs={6}>
                <Grid container>
                  <Stack direction="row">
                    {/* header-search-section */}

                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <SearchOutlinedIcon fontSize="medium" />
                      </Grid>
                      <TextField
                        id="input-with-icon-textfield"
                        label="Search"
                        variant="standard"
                      />
                    </Grid>

                    {/* active-user-display-section */}

                    <AvatarGroup total={9}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      <Avatar
                        alt="Travis Howard"
                        src="/static/images/avatar/2.jpg"
                      />
                      <Avatar
                        alt="Agnes Walker"
                        src="/static/images/avatar/4.jpg"
                      />
                      <Avatar
                        alt="Trevor Henderson"
                        src="/static/images/avatar/5.jpg"
                      />
                    </AvatarGroup>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>

            {/* body-section */}

            {/* table-related-section----- */}
            <Grid container>
              <TableContainer>
                <Table
                  sx={{ minWidth: 500 }}
                  aria-label="custom pagination table"
                >
                  <TableBody>
                    {(rowsPerPage > 0
                      ? historyrelatedrows.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : rows
                    ).map((row) => (
                      <TableRow key={row.leftdata}>
                        <TableCell component="th" scope="row">
                          {row.leftdata}
                        </TableCell>
                        {/* <TableCell align="left">{row.rightdata}</TableCell> */}

                        <TableCell align="left">{row.rightdata}</TableCell>
                      </TableRow>
                    ))}

                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
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
                        colSpan={3}
                        count={rows.length}
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
          </TabPanel>
        </Box>
      </Box>
    </div>
  );
}
ApplicationEmailFlow.layout = "AdminLayout";

export default ApplicationEmailFlow;
