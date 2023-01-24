import React from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import Chip from "@mui/material/Chip";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import Link from "@mui/material/Link";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

const avatarSetwithtext = (
  <React.Fragment>
    <Grid item>
      <Stack direction="row" spacing={1}>
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 24, height: 24 }}
        />{" "}
        <span style={{ fontSize: 16, fontWeight: 500, marginTop: 2 }}>
          Team members assigned to the application
        </span>
      </Stack>
    </Grid>
  </React.Fragment>
);

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

function topcreateData(leftData, rightData) {
  return { leftData, rightData };
}

const toprows = [
  topcreateData("Description", "Verify the borrower’s income information"),
  topcreateData("Assigned To", "Unable  to verify required information"),
  topcreateData(
    "Approved",
    avatarSetwithtext,
    "Team members assigned to the application"
  ),
  topcreateData("Due Date", "Feb 5, 2021"),
];

// bottom rowws

function downcreateData(leftData, rightData) {
  return { leftData, rightData };
}

const downrows = [
  downcreateData("Stated Income", "$41,000"),
  downcreateData("Bureau State Income", "$41,000"),
  downcreateData("Verified Income", "$41,000"),

  downcreateData("Decline Reason ", "The Customer did not respond"),
];

function ApplicationTaskDetails() {
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
  const [showContent, setShowContent] = useState(false);

  const handleEditDetails = () => {
    // setShowContent(true)
    setShowContent(!showContent);
  };

  return (
    <div style={{ backgroundColor: "#fff", padding: 20 }}>
      <Box p={4}>
        {/* 1st-header-section */}
        <Grid container mb={5}>
          <Grid item xs={12} md={6}>
            <Stack pl={2}>
              <h1 className="page_header_two" pl={2}>
                Task Details
              </h1>
            </Stack>
            <Stack direction="row" spacing={1} pt={2} pl={2}>
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
                label="NOT DONE"
                onClick={handleClick}
                onDelete={handleDelete}
                style={{
                  color: "#F98988",
                  backgroundColor: "#FFF0F0",
                  fontSize: 12,
                  fontWeight: 700,
                }}
                CloseOutlinedIcon={<CloseOutlinedIcon />}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "right" }}>
              <Button
                variant="contained"
                sx={{ padding: "10px 40px" }}
                onClick={handleClickOpen}
              >
                Mark as Details
              </Button>

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

        <Grid>
          <Stack direction="row" spacing={1} pt={2} pl={2}>
            <Typography variant="h5">
              <span style={{ fontSize: 25, fontWeight: 700 }}>Overview</span>{" "}
            </Typography>
            <Link
              href="#"
              style={{ fontSize: 18, fontWeight: 500, textDecoration: "None" }}
            >
              <Stack direction="row" spacing={1} mt={1}>
                <NoteAltOutlinedIcon mt={4} />
                <Typography> Edit Task</Typography>
              </Stack>
            </Link>
          </Stack>
        </Grid>
        {/* body-content */}

        <Box>
          <Grid container mb={5}>
            <Grid item xs={12} mt={4}>
              <TableContainer style={{ backgroundColor: "transparent" }}>
                <Table aria-label="simple table">
                  <TableBody>
                    {toprows.map((row) => (
                      <TableRow
                        key={row.leftData}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.leftData}
                        </TableCell>
                        <TableCell align="left">{row.rightData}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1} pt={2} pl={2}>
                <Typography variant="h5">
                  <span style={{ fontSize: 25, fontWeight: 700 }}>Data</span>{" "}
                </Typography>
                <Link
                  href="#"
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    textDecoration: "None",
                  }}
                >
                  <Stack direction="row" spacing={1} mt={1}>
                    <NoteAltOutlinedIcon mt={4} />
                    <Typography> Edit Data</Typography>
                  </Stack>
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12} mt={4}>
              <TableContainer style={{ backgroundColor: "transparent" }}>
                <Table aria-label="simple table">
                  <TableBody>
                    {downrows.map((row) => (
                      <TableRow
                        key={row.leftData}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.leftData}
                        </TableCell>
                        <TableCell align="left">{row.rightData}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1} pl={2}>
                <Typography variant="h5">
                  <span style={{ fontSize: 25, fontWeight: 700 }}>
                    Comments
                  </span>{" "}
                </Typography>
                <Link
                  href="#"
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    textDecoration: "None",
                  }}
                >
                  <Stack direction="row" spacing={1} mt={1}>
                    <AddIcon mt={4} />
                    <Typography> Add Comment</Typography>
                  </Stack>
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12} mt={4}>
              <Stack direction="row" spacing={1} pl={2}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Stack direction="column">
                  <Typography style={{ fontSize: 18, fontWeight: 700 }}>
                    Jane Cooper
                  </Typography>
                  <Typography>#6623960 | Oct. 24, 2021</Typography>
                </Stack>
              </Stack>
              <Typography
                mt={2}
                style={{ fontSize: 16, fontWeight: 600 }}
                pl={2}
              >
                Sounds good. Let’s follow up if they did not sent today
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
ApplicationTaskDetails.layout = "AdminLayout";

export default ApplicationTaskDetails;
