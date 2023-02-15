import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Grid, IconButton, Typography } from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import { useRouter } from "next/router";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import {_setAutoAssignMember, _getAutoAssignMember} from "../../services/common"
import { _getAllPlatformUserByAdmin, _getUser } from "../../services/authServices.js";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import { s3URL } from '../../utils/config'


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

function ApplicationTeamMemberAsignment() {

  const ITEM_HEIGHT = 100;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const teamAssignOptions = [
    {
      id: 0,
      option: "Do not assign a team member to new applications, which does not assign a team member."
    },
    {
      id: 1,
      option: "Assign the team member that created the new application will assign the team member that completed the application form"
    },
    {
      id: 2,
      option: "Assigning a team member based on round-robin selection will assign an equal number of created applications to the team members you select (using a round-robin process). This is recommended for most lenders."
    },
    {
      id: 3,
      option: "Assigning a specific team member to new applications will assign the same team member(s) to all new applications."
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [memberOpen, setMemberOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedId, setSelectedId] = useState(0);
  const [teamMembersData, setTeamMembersData] = useState([]);
  const [personName, setPersonName] = useState([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };

  const handelSelectOption = (value, id) => {
    setSelectedOption(value);
    const body = {
      autoType: id,
      members: [],
      activeMember: null
    }
    _setAutoAssignMember(body)
    setSelectedTeamMembers([]);
  }
  
  const handleEditMemberClickOpen = () => {
    setMemberOpen(true);
  };
  const handleEditMemberClose = () => {
    setMemberOpen(false);
  };

  const handleChangeEditTeamMember = async (event) => {
    const {
      target: { value },
    } = event;
    let users = typeof value === "string" ? value.split(",") : value;
    setPersonName(users);
  };

  const handleAddTeamMember = async (users) => {
    try {
      console.log("usersusersusers", users)
      const body = {
        autoType: selectedId,
        members: users,
        activeMember: null
      }
      setSelectedTeamMembers(users)
      _setAutoAssignMember(body)
      handleEditMemberClose();
    } catch (err) {
      console.log(err);
    }
  };

  const getTeamMembers = async () => {
    try {
      const loginUser = await _getUser();
      const res = await _getAllPlatformUserByAdmin();
      if (res?.status == 200) {
        let data = [...res.data?.users,loginUser?.data]
        return data;
      }
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(()=>{

    const getdata = async () => {
      const auto_member = await _getAutoAssignMember();
      setSelectedOption(teamAssignOptions[auto_member?.data?.type].option);
      setSelectedId(auto_member?.data?.type);
      setSelectedTeamMembers(auto_member?.data?.members);
      const teamMembersArray = await getTeamMembers();
      setTeamMembersData([...teamMembersArray]);
    }
    getdata();
    
  }, [])

  return (
    <div>
      <Box p={2}>
        {/* 1st-header-section */}
        <Grid container mb={4}>
          <Grid item xs={12}>
            <h1 className="page_header">Team Member Assignment</h1>
          </Grid>
        </Grid>

        {/* 2nd-sub-content-section */}
        <Box mt={8}>
          <Stack direction="row" spacing={1} pl={1}>
            <Typography
              variant="h5"
              style={{ color: "#393939", fontSize: 25, fontWeight: 700 }}
            >
              Assignment Settings
            </Typography>
            <span style={{ color: "#0B72F1", paddingTop: 7 }}>
              <NoteAltOutlinedIcon fontSize="medium" />
            </span>
            <Button
              variant="text"
              style={{
                fontSize: 18,
                fontWeight: 500,
                textTransform: "capitalize",
              }}
              pb={3}
              onClick={() => {
                open ? handleClose() : handleClickOpen();
              }}
            >
              {open ? "Close" : "Edit Settings"}
            </Button>
          </Stack>
        </Box>
        <Divider />
        {/* body-content-tab-set */}
        <Grid item xs={12} mt={4}>
          
            <Table aria-label="simple table">
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: "#858585",
                    }}
                  >
                    {"New Applications"}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#858585",
                      paddingLeft: 20,
                    }}
                  >
                    { open ? 
                      <FormControl size="large" sx={{ m: 1, width: 580 }}>
                          {/* <InputLabel id="demo-multiple-chip-label">Chip</InputLabel> */}
                        <Select
                          // labelId="demo-multiple-chip-label"
                          id="demo-multiple-chip"
                          
                          value={selectedOption}
                          onChange={handleChangeEditTeamMember}
                          placeholder="select team Members"
                          // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                          renderValue={(selected) => (
                             selectedOption
                          )}
                          MenuProps={MenuProps}
                        >
                            {teamAssignOptions.map((row, key) => (
                              <div key={key}>
                                <Box sx={{ maxWidth: "100%" }} className="hover_effect">
                                  <Stack spacing={2} direction="row">
                                    <Button
                                      fullWidth
                                      style={{
                                        backgroundColor:
                                          row.option == selectedOption ? "#1478F1" : "",
                                        color: row.option == selectedOption ? "#FFFFFF" : "",
                                        borderBottom:"1px solid #ccc"
                                      }}
                                      onMouseOver={() => {
                                        backgroundColor: "#1478F1";
                                        color: "#FFFFFF";
                                      }}
                                      onClick={() => {
                                        setSelectedId(row.id);
                                        handelSelectOption(row.option, row.id);
                                        handleClose();
                                      }}
                                    >
                                      <Typography
                                            className="page_sub_content_header"
                                            p={1}
                                            style={{textAlign: "left"}}
                                          >
                                            {row.option}
                                          </Typography>
                                    </Button>
                                  </Stack>
                                </Box>
                                <br />
                              </div>
                            ))}
                        </Select>
                      </FormControl>
                     : selectedOption
                    }
                  </TableCell>
                </TableRow>
                { selectedId != 0 && selectedId != 1 ? <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: "#858585",
                    }}
                  >
                    {selectedId == 1
                      ? "Team members included in Created user"
                      : selectedId == 2
                        ? "Team members included in round-robin selection"
                        : selectedId == 3
                          ? "Team members included in specific team member selection"
                          : selectedId == 0
                            ? "Do not assign a team member"
                            : ""}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#858585",
                      paddingLeft: 20,
                    }}
                  >
                    <React.Fragment>
                      <Grid
                        item
                        md={1}
                        align="left"
                        pl={14}
                        ml={2}
                        className="teamAssignmentAvatarGroup"
                      >
                        { selectedTeamMembers?.length <= 0 && 
                          <Button onClick={handleEditMemberClickOpen} variant="contained" sx={{ padding: "10px 40px" }}>
                            Add members
                          </Button> 
                        }

                        {selectedTeamMembers?.length > 0 && 
                        
                        <AvatarGroup sx={{ width: 24, height: 24 }}>
                         
                          {selectedTeamMembers.map((value,key) => {
                            console.log("value613",value)
                            let user = teamMembersData.filter((user)=>{
                              return user?.PK == `USER#${value}`
                            })[0]
                            console.log(`userName${key}`,user)
                            return (
                              <Avatar
                                key={key} 
                                alt={user?.PK.split("#")[1]}
                                src={`${s3URL}/${user?.imageId}`}
                              />
                            )
                          })}
                        </AvatarGroup>
                        }

                        
{/* 
                        { selectedTeamMembers?.length > 0 && selectedTeamMembers.map(data=>{
                          return data
                        })} */}
                        {/* <AvatarGroup total={5} sx={{ width: 24, height: 24 }}>
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
                        </AvatarGroup> */}
                      </Grid>
                    </React.Fragment>
                  </TableCell>
                </TableRow>: ""}
              </TableBody>
            </Table>
      
        </Grid>
      </Box>
      <Dialog open={false } onClose={handleClose} fullWidth m={4}>
        <Box sx={{ maxWidth: "100%" }} p={2}>
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            <Typography variant="h6" style={{ fontWeight: 700, fontSize: 30 }}>
              Automated Assignment Options
            </Typography>
          </BootstrapDialogTitle>

          <DialogContent>
            <FormControl style={{ display: "flex", justifyContent: "center" }}>
              <label>
                {" "}
                <Typography
                  variant="h6"
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    fontStyle: "normal",
                    marginBottom: 10,
                  }}
                >
                  Selected Option
                </Typography>
              </label>

              {teamAssignOptions.map((row, key) => (
                <div key={key}>
                  <Box sx={{ maxWidth: "100%" }} className="hover_effect">
                    <Stack spacing={2} direction="row">
                      <Button
                        fullWidth
                        variant="outlined"
                        borderColor="#393939"
                        style={{
                          backgroundColor:
                            row.option == selectedOption ? "#1478F1" : "",
                          color: row.option == selectedOption ? "#FFFFFF" : "",
                        }}
                        onMouseOver={() => {
                          backgroundColor: "#1478F1";
                          color: "#FFFFFF";
                        }}
                        onClick={() => {
                          handelSelectOption(row.option);
                          setSelectedId(row.id);
                          handleClose();
                        }}
                      >
                        {/* <Grid container display={"flex"} fontWeight={700}>
                          <Grid
                            xs={6}
                            align="left"
                            color={"#393939"}
                            textTransform="capitalize"
                          >
                            <Typography
                              className="page_sub_content_header"
                              p={1}
                            >
                              {row.option}
                            </Typography>
                          </Grid>{" "}
                          <Grid xs={6} align="right" color={"#393939"}></Grid>
                        </Grid> */}
                        <Typography
                              className="page_sub_content_header"
                              p={1}
                              style={{textAlign: "left"}}
                            >
                              {row.option}
                            </Typography>
                      </Button>
                    </Stack>
                  </Box>
                  <br />
                </div>
              ))}
            </FormControl>
          </DialogContent>
        </Box>
      </Dialog>

      <Dialog
        open={memberOpen}
        onClose={handleEditMemberClose}
        fullWidth
      >
        <Box sx={{ maxWidth: "100%" }}>
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
                            placeholder="select team Members"
                            // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value,key) => {
                                  console.log("value613",value)
                                  let user = teamMembersData.filter((user)=>{
                                    return user?.PK == `USER#${value}`
                                  })[0]
                                  console.log(`userName${key}`,user)
                                  return (
                                    <Chip
                                    style={{borderRadius:0,height:40}}
                                      key={value}
                                      label={`${user?.info?.firstName && user?.info?.lastName ? user?.info?.firstName+" "+user?.info?.lastName : user?.PK.split("#")[1]} `}
                                      avatar={
                                        <Avatar key={key} alt={user?.PK.split("#")[1]} src={`${s3URL}/${user?.imageId}`} />
                                      }
                                    />
                                  )
                                })}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                          >
                            {teamMembersData.map((object, key) => (
                              <MenuItem
                                key={key}
                                value={object?.PK.split("#")[1] || ""}
                                // value={`${object?.PK.split("#")[1] || ""+ object?.info?.firstName && object?.info?.lastName ? "|"+object?.info?.firstName+" "+object?.info?.lastName : "" }`}
                              >
                                
                                {object?.PK.split("#")[1] || ""} { (object?.info?.firstName || object?.info?.lastName) && "|"} {object?.info?.firstName && object?.info?.lastName} {object?.info?.firstName && object?.info?.lastName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      
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
                handleAddTeamMember(personName);
                handleEditMemberClose();
              }}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
ApplicationTeamMemberAsignment.layout = "AdminLayout";

export default ApplicationTeamMemberAsignment;
