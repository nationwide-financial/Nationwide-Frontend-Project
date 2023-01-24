import * as React from "react";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import Link from "next/link";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Stack from "@mui/material/Stack";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// -------tbl-data--
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

const downrightrows = [downrightcreateData("Year at Job", "8")];

const handleChange = (newValue) => {
  setValue(newValue);
};

// -----------------
// tab-set---
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
//____

function ApplicationContact() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [age, setAge] = React.useState("");
  // const handleChange = (event) => {
  //     setAge(event.target.value);
  //   };

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

  // const [tabBtnStyle, setTabBtnStyle] = useState({
  //   color: "#B4B1B1",
  //   fontWeight: "700",
  // });
  // const handleTabBtnClick = () => {
  //   setTabBtnStyle({ color: "#393939", fontWeight: "700" });
  // };
  return (
    <div>
      <Box>
        <Grid container style={{ backgroundColor: "#fff", color: "#393939" }}>
          <Grid item xs={12}>
            {/* <Item> */}
            <Grid container style={{ display: "inline-flex" }} mt={2}>
              <Grid item xs={5}>
                <Typography
                  align="left"
                  variant="h5"
                  fontWeight={700}
                  fontSize={45}
                  pl={4}
                >
                  Application Form
                </Typography>
              </Grid>
              <Grid item xs={2} mt={1} pl={1}>
                <div>
                  <AvatarGroup total={24}>
                    <Avatar alt="Remy Sharp" src="/images/avatar1.png" />
                    <Avatar alt="Travis Howard" src="/images/avatar2.png" />
                    <Avatar alt="Agnes Walker" src="/images/avatar3.png" />
                    <Avatar alt="Trevor Henderson" src="/images/avatar4.png" />
                  </AvatarGroup>
                </div>
              </Grid>
              <Grid item xs={5} rl={3} mt={1}>
                <Stack direction="row" spacing={1} pl={1}>
                  <Link
                    href="#"
                    className="page_sub_outlineless_text_btn"
                    style={{ textDecoration: "none" }}
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
              </Grid>
            </Grid>

            {/* body section  */}
            <Grid container></Grid>

            <Box sx={{ width: "100%", paddingBottom: "150px" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }} p={4}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    label="Contact Profile"
                    {...a11yProps(0)}
                    // style={tabBtnStyle}
                    // onClick={handleTabBtnClick}
                  />
                  <Tab
                    label="Co-Contact Profile"
                    {...a11yProps(1)}
                    // style={tabBtnStyle}
                    // onClick={handleTabBtnClick}
                  />
                  <Tab
                    label="Application Details"
                    {...a11yProps(2)}
                    // style={tabBtnStyle}
                    // onClick={handleTabBtnClick}
                  />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Grid container>
                  <Grid item xs={12}>
                    {/* <Item> */}
                    <Grid container>
                      <Grid xs={12}>
                        <Typography align="left" fontWeight={700} fontSize={25}>
                          Contact Profile
                        </Typography>
                      </Grid>
                      <Grid xs={12} mt={1}>
                        <Stack direction="row" spacing={1}>
                          <Typography
                            align="left"
                            fontWeight={700}
                            fontSize={20}
                          >
                            Phillip Cooper
                          </Typography>
                          <Link
                            href="#"
                            className="page_sub_outlineless_text_btn"
                            style={{ textDecoration: "none" }}
                          >
                            <Stack
                              direction="row"
                              spacing={1}
                              style={{ fontSize: 18, fontWeight: 500 }}
                              pt={1}
                            >
                              {" "}
                              <NoteAltOutlinedIcon mt={1} />
                              <Typography fontSize={18} fontWeight={500}>
                                {" "}
                                Edit Profile{" "}
                              </Typography>
                            </Stack>
                          </Link>
                        </Stack>
                      </Grid>
                    </Grid>

                    <Box sx={{ minWidth: 275 }}>
                      <Grid mt={4}>
                        <Typography align="left" fontSize={20} fontWeight={700}>
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
                                {topleftrows.map((row) => (
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
                                      className=" application_Contact_table_left_data"
                                    >
                                      {row.leftData}
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      className=" application_Contact_table_right_data"
                                    >
                                      {row.rightData}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                        <Grid item xs={6}>
                          {/* <Typography>Financial Information</Typography> */}

                          <TableContainer
                            style={{ backgroundColor: "transparent" }}
                          >
                            <Table aria-label="simple table">
                              <TableBody>
                                {toprightrows.map((row) => (
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
                                      className=" application_Contact_table_left_data"
                                    >
                                      {row.leftData}
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      className=" application_Contact_table_right_data"
                                    >
                                      {row.rightData}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid>
                      {/* down */}
                      <Grid mt={4}>
                        <Typography align="left" fontSize={20} fontWeight={700}>
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
                                {downleftrows.map((row) => (
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
                                      className=" application_Contact_table_left_data"
                                    >
                                      {row.leftData}
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      className=" application_Contact_table_right_data"
                                    >
                                      {row.rightData}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>

                        {/* <Grid item xs={6}>
                              <TableContainer
                                style={{ backgroundColor: "transparent" }}
                              >
                                <Table aria-label="simple table">
                                  <TableBody>
                                    {downrightrows.map((row) => (
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
                                          fontSize={20}
                                          fontWeigh={400}
                                        >
                                          {row.leftData}
                                        </TableCell>
                                        <TableCell
                                          align="left"
                                          fontSize={20}
                                          fontWeigh={600}
                                          className=" table_right_data"
                                        >
                                          {row.rightData}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Grid> */}

                        <Grid mt={6}>
                          <div
                            style={{
                              marginBottom: 100,
                              display: "flex",
                              justifyContent: "left",
                              margin: 20,
                            }}
                          >
                            {/* <Button variant="outlined">Continue</Button> */}
                          </div>
                        </Grid>
                      </Grid>
                    </Box>
                    {/* </Item> */}
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                Item Two
              </TabPanel>
              <TabPanel value={value} index={2}>
                Item Three
              </TabPanel>
            </Box>
            {/* </Item> */}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

ApplicationContact.layout = "AdminLayout";

export default ApplicationContact;
