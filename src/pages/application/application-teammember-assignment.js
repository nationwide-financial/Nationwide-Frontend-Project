import React, { useState } from "react";
import { Avatar, Box, Button, Grid, IconButton, Typography } from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
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

  const [open, setOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = useState("Do not assign a team member to application");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };

  const handelSelectOption = (value) => {
    setSelectedOption(value);
  }
  const handleContinue = () => {
    router.push("/application/new-application");
  };

  const teamAssignOptions = [
    {
      option: "Do not assign a team member to application",
    },
    {
      option: "Created user",
    },
    {
      option: "Use round-robin process",
    },
    {
      option: "Assigning a specific team member to new application",
    },

  ];

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
                handleClickOpen();
              }}
            >
              Edit Settings
            </Button>
          </Stack>
        </Box>
        <Divider />
        {/* body-content-tab-set */}
        <Grid item xs={12} mt={4}>
          <TableContainer style={{ backgroundColor: "transparent" }}>
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
                    {selectedOption}
                  </TableCell>
                </TableRow>
                {selectedOption != "Do not assign a team member to application" && <TableRow
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
                    {selectedOption == "Created user"
                      ? "Team members included in Created user"
                      : selectedOption == "Use round-robin process"
                        ? "Team members included in round-robin selection"
                        : selectedOption ==
                          "Assigning a specific team member to new application"
                          ? "Team members included in specific team member selection"
                          : selectedOption ==
                            "Do not assign a team member to application"
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
                        <AvatarGroup total={5} sx={{ width: 24, height: 24 }}>
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
                        </AvatarGroup>
                      </Grid>
                    </React.Fragment>
                  </TableCell>
                </TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth m={4}>
        <Box sx={{ width: 1000, maxWidth: "100%" }} p={2}>
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
                          handleClose();
                        }}
                      >
                        <Grid container display={"flex"} fontWeight={700}>
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
                        </Grid>
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
    </div>
  );
}
ApplicationTeamMemberAsignment.layout = "AdminLayout";

export default ApplicationTeamMemberAsignment;
