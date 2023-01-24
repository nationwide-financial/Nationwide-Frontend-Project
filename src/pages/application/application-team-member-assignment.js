import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  CardHeader,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Card, CardContent, Popover } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

import CardActions from "@mui/material/CardActions";
// import dayjs from 'dayjs';
// import Stack from '@mui/material/Stack';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

//   const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));
// TopLeft

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

const handleChange = (newValue) => {
  setValue(newValue);
};

function ApplicationTeamMemberAssignment() {
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  let closeImg = {
    cursor: "pointer",
    float: "right",
    marginTop: "5px",
    width: "20px",
  };
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCreateApplication = () => {
    // setOpen(false);

    router.push("/application/application-form-data");
  };

  return (
    <div>
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <Item>
              <Grid p={4} style={{ padding: 20, height: 1000 }}>
                <Typography
                  align="left"
                  variant="h5"
                  fontWeight={700}
                  fontSize={45}
                >
                  Application Form
                </Typography>
                <Typography
                  align="left"
                  fontSize={18}
                  fontWeight={700}
                  color="#B4B1B1"
                >
                  Personal Loan
                </Typography>

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
                        <label htmlFor="outlined-adornment-amount">
                          {" "}
                          <Typography
                            align="left"
                            variant="h6"
                            style={{
                              fontSize: 16,
                              fontWeight: 700,
                              fontStyle: "normal",
                            }}
                          >
                            Loan Amount
                            <span style={{ color: "#FF0000" }}>*</span>
                          </Typography>
                        </label>
                        <Box sx={{ maxWidth: "100%", marginTop: 2 }}>
                          <OutlinedInput
                            fullWidth
                            size="small"
                            id="outlined-adornment-amount"
                            startAdornment={
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            }
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
                              fontSize: 16,
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
                          />
                        </Box>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container mt={5}>
                    <div
                      style={{
                        marginBottom: 100,
                        display: "flex",
                        justifyContent: "left",
                      }}
                    >
                      {/* <CardContent style={{display:'flex',justifyContent:'left' }}> */}
                      <Button
                        variant="contained"
                        onClick={handleCreateApplication}
                        disabled
                      >
                        Create Application
                      </Button>
                      {/* </CardContent> */}
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

ApplicationTeamMemberAssignment.layout = "AdminLayout";

export default ApplicationTeamMemberAssignment;
