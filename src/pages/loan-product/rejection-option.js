import React, { useState, useCallback, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControlLabel,
  FormControl,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Switch from "@mui/material/Switch";
import DialogActions from "@mui/material/DialogActions";

import CircularProgress from "@mui/material/CircularProgress";
import { _getApplications } from "../../services/applicationService";
import {
  _addRejection,
  _gatReason,
  _updateRejection,
  _deleteReason,
} from "../../services/rejectionOptionService";
import { FastForward, Flag } from "@mui/icons-material";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import OutlinedInput from "@mui/material/OutlinedInput";

// dialog-box--
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

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

// dialog-box--

function RejectionOption() {
  // dialog-box--
  const [open, setOpen] = React.useState(false);
  const [EditAutomatedOpen, setEditAutomatedOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickEditAutomatedOpen = () => {
    setEditAutomatedOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setToggelAddRejection(false)
    setAddReasion("")
  };

  const handleAutomatedClose = () => {
    setEditAutomatedOpen(false);
  };

  // dialog-box--

  const [openRejectionPopup, setOpenRejectionPopup] = useState(false);
  const handleClickOpenRejectionPopup = () => {
    setOpenRejectionPopup(true);
  };

  const handleClickCloseRejectionPopup = () => {
    setRejectionDays(0);
    setRejectionReason("");
    setRejectionCheckedReasonAuto(false);
    setFormError("");
    setOpenRejectionPopup(false);
  };

  const handleChangeReasonAuto = (event) => {
    setRejectionCheckedReasonAuto(event.target.checked);
  };
  const [reasions, setReasons] = useState([]);
  const [rejectionDays, setRejectionDays] = useState(0);
  const [rejectionReason, setRejectionReason] = useState("");
  // const [rejectionLabel,setRejectionLabel]=useState('');
  const [rejectionCheckedReasonAuto, setRejectionCheckedReasonAuto] =
    useState(false);
  const [formError, setFormError] = useState("");
  const [addRejectionLoading, setAddRejectionLoading] = useState(false);

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState();
  const [trigger, setTrigger] = useState(false);
  const [appId, setAppId] = useState("");
  const [days, setDays] = useState(0);
  const [reason, setReason] = useState("");
  const [checkedReasonAuto, setCheckedReasonAuto] = useState(false);
  const [userInputs, setUserInputs] = useState({});
  const [isEditInputs, setIsEditInputs] = useState({});
  const [addReasion, setAddReasion] = useState("");
  const [toggelAddRejection, setToggelAddRejection] = useState(false);
  const [loadingDeleteReasion, setLoadingDeleteReasion] = useState(false);


  const [declineRejectionsUpdateSwitch, setdeclineRejectionsUpdateSwitch] =
    useState(false);
  const [automatedRejectionsUpdateSwitch, setAutomatedRejectionsUpdateSwitch] =
    useState(false);

  async function getRejections() {
    try {
      let inputs = {};
      const data = await _gatReason();
      //console.log("_gatReason",data)

      setReasons(data.data.data.Items);
      data.data.data.Items.map((val) => {
        inputs[`REASOIN_${val.PK}`] = val?.description;
        inputs[`LABEL_${val.PK}`] = val?.label;
        inputs[`DAYS_${val.PK}`] = val?.days;
        inputs[`AUTO_${val.PK}`] = val?.auto_;
      });
      //console.log("input************",inputs)
      setUserInputs({ ...inputs });
      setIsEditInputs({ ...inputs });
    } catch (err) {
      console.log(err);
    }
  }

  const onChangeHandler = useCallback(({ target }) => {
    setUserInputs((state) => ({ ...state, [target.name]: target.value }));
  }, []);
  const updateRejection = async (id, days, auto, reason) => {

    try {
      let body = {
        auto_: auto,
        days: days,
        description: reason,
        label: "Decline Reason",
      };
      setLoading(id);
      const res = await _updateRejection(id, body);
      setLoading("");
      console.log("_updateRejections", res);
      if (res?.status == 200) {
        handleCloseRejectionPopup();
        setMessage({
          severity: "success",
          message: "Rejection Reasion updated",
        });
      } else {
        setMessage({
          severity: "error",
          message: "Rejection Reasion update failed",
        });
      }
      setDays(0);
      setReason("");
      getRejections();
      // console.log("updateRejection",res)
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRejection = async (reasionId) => {
    console.log("reasionId215", reasionId);
    try {
      if (reasionId) {
        setLoadingDeleteReasion(true)
        const response = await _deleteReason(reasionId);
        if(response?.status == 200 ){
          getRejections();
          setMessage({
            severity: "success",
            message: "Rejection Reasion Deleted!",
          });
        }else{
          setMessage({
            severity: "error",
            message: "Rejection Reasion Delete failed",
          })
          getRejections();
        }
      }
      setLoadingDeleteReasion(false)
    } catch (err) {
      console.log(err);
    }
  };

  const addRejection = async () => {
    console.log("first")
    try {
      let body = {
        label: "Decline Reason",
        description: addReasion,
        auto_: false,
        days: 0,
      };
      // console.log(body)
      if (!addReasion || addReasion == "" || addReasion == null ) {
        setFormError("Reasion can not be empty!");
      } else {
        setFormError("");
        console.log("setFormError",formError)
        setAddRejectionLoading(true);
        const res = await _addRejection(body);
        console.log("_addRejection",res)
        if (res?.status == 200) {
          setAddRejectionLoading(false);
          handleClickCloseRejectionPopup();
          getRejections();
          setToggelAddRejection(false)
          setMessage({
            severity: "success",
            message: "Rejection Reasion Added",
          });
        } else {
          setAddRejectionLoading(false);
          setMessage({
            severity: "error",
            message: "Rejection Reasion Adding is failed",
          });
          setToggelAddRejection(false)
          getRejections();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getRejections();
  }, [trigger]);

  return (
    <Box
      style={{
        paddingLeft: 20,
        paddingTop: 30,
        paddingBottom: 100,
        margin: 20,
      }}
    >
      {message && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={message}
          autoHideDuration={3000}
          onClose={() => setMessage()}
        >
          <Alert variant="filled" severity={message.severity}>
            {message.message}
          </Alert>
        </Snackbar>
      )}
      <Grid container mb={5}>
        <Grid item xs={12} md={6} mb={2}>
          <h1 className="page_header">Rejection Options</h1>
        </Grid>
        <Grid item xs={12} md={6} mb={2}>
          {/* <div
            style={{
              display: "flex",
              justifyContent: "right",
              marginRight: 40,
            }}
          >
            <Button
              variant="contained"
              sx={{ padding: "10px 40px" }}
              style={{ marginLeft: 20 }}
              onClick={() => {
                handleClickOpenRejectionPopup();
              }}
            >
              Add Rejection
            </Button>
          </div> */}
        </Grid>
      </Grid>
      <Grid container mb={5} mt={3}>
        <Grid item xs={12} md={8}>
          <Stack direction="row" spacing={1}>
            <Typography variant="h5" className=" page_sub_header">
              <span>Decline Reasons</span>
            </Typography>
            <Link
              href="#"
              // onClick={() => {
              //   setdeclineRejectionsUpdateSwitch(
              //     (declineRejectionsUpdateSwitch) =>
              //       !declineRejectionsUpdateSwitch
              //   );
              //   setDays(0);
              //   setReason("");
              // }}
              className="page_sub_outlineless_text_btn"
            >
              <Stack
                direction="row"
                spacing={1}
                mt={1}
                style={{ fontSize: 18, fontWeight: 500 }}
              >
                <NoteAltOutlinedIcon mt={1} />
                <Typography onClick={handleClickOpen}>
                  {" "}
                  Edit Decline Reasons{" "}
                </Typography>
              </Stack>
            </Link>
          </Stack>
        </Grid>

        {/* dialog-box-- */}
        <Grid container>
          <Grid item xs={12}>
            <BootstrapDialog
              className="rj-dialog"
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
              style={{ minWidth: 550, maxHeight: "auto" }}
            >
              <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={handleClose}
                style={{ fontSize: 30, fontWeight: 600 }}
              >
                Edit Decline Reasons
              </BootstrapDialogTitle>
              <DialogContent>
                {reasions &&
                  reasions?.map((reasion, key) => {
                    if (reasion && reasion?.auto_ == false) {
                      return (
                        <Grid key={key}>
                          <label>
                            <Typography
                              align="left"
                              variant="h6"
                              style={{
                                fontSize: 17,
                                fontWeight: 700,
                              }}
                            >
                              Decline Reason
                            </Typography>
                          </label>

                          <FormControl
                            sx={{ width: "100%" }}
                            variant="outlined"
                          >
                            <OutlinedInput
                              style={{ marginTop: 10, marginBottom: 30 }}
                              fullWidth
                              placeholder="Text"
                              name={`REASOIN_${reasion.PK}`}
                              size="small"
                              margin="dense"
                              type="text"
                              id="outlined-basic"
                              className="nwInput"
                              value={
                                (userInputs &&
                                  userInputs[`REASOIN_${reasion.PK}`]) ||
                                ""
                              }
                              onChange={onChangeHandler}
                              endAdornment={
                                <InputAdornment position="end">
                                  {console.log(
                                    "userInputs[`REASOIN_${reasion.PK}`]",
                                    userInputs[`REASOIN_${reasion.PK}`],
                                    isEditInputs[`REASOIN_${reasion.PK}`]
                                  )}

                                  {userInputs[`REASOIN_${reasion.PK}`] !=
                                    isEditInputs[`REASOIN_${reasion.PK}`] && (
                                    <Button
                                      style={{ height: 30 }}
                                      variant="contained"
                                      href="#contained-buttons"
                                      onClick={async () => {
                                        await updateRejection(
                                          reasion.PK,
                                          0,
                                          false,
                                          userInputs &&
                                            userInputs[`REASOIN_${reasion.PK}`]
                                        );
                                        await setdeclineRejectionsUpdateSwitch(
                                          false
                                        );
                                        //setTrigger((trigger) => !trigger);
                                      }}
                                    >
                                      {reasion.PK == loading
                                        ? "Saving"
                                        : "Save"}
                                      {reasion.PK == loading && (
                                        <CircularProgress
                                          style={{
                                            height: 20,
                                            width: 20,
                                            marginLeft: 10,
                                            color: "white",
                                          }}
                                        />
                                      )}
                                    </Button>
                                  )}
                                  <IconButton
                                    onClick={async () => {
                                      await deleteRejection(reasion.PK);
                                      // await setdeclineRejectionsUpdateSwitch(false);
                                      // setTrigger((trigger) => !trigger);
                                    }}
                                  >
                                    <DeleteOutlinedIcon
                                      style={{
                                        borderRadius: 5,
                                      }}
                                    />
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </Grid>
                      );
                    }
                  })}
              </DialogContent>

              <DialogContent>
                {toggelAddRejection && (
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <OutlinedInput
                      style={{ marginTop: 10, marginBottom: 30 }}
                      fullWidth
                      placeholder="Reasion"
                      name="reasion"
                      size="small"
                      margin="dense"
                      type="text"
                      id="outlined-basic"
                      className="nwInput"
                      value={addReasion}
                      onChange={(e) => {
                        setAddReasion(e.target.value);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <Button
                            style={{ height: 30 }}
                            variant="contained"
                            href="#contained-buttons"
                            onClick={() => {
                              addRejection();
                            }}
                          >
                            Add
                            {/* {reasion.PK == loading && (
                            <CircularProgress
                              style={{
                                height: 20,
                                width: 20,
                                marginLeft: 10,
                                color: "white",
                              }}
                            />
                          )} */}
                          </Button>
                          <Button
                            style={{ height: 30, marginLeft: 5 }}
                            variant="contained"
                            href="#contained-buttons"
                            onClick={() => {
                              setToggelAddRejection(
                                (toggelAddRejection) => !toggelAddRejection
                              );
                              setAddReasion("");
                            }}
                          >
                            Close
                          </Button>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                )}
                <Stack direction="row" spacing={1}>
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      setToggelAddRejection(
                        (toggelAddRejection) => !toggelAddRejection
                      );
                    }}
                  >
                    <AddCircleOutlineOutlinedIcon
                      style={{ color: "#1478F1" }}
                    />
                  </a>
                  <Typography
                    style={{
                      color: "#858585",
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    Add decline reason
                  </Typography>
                </Stack>
              </DialogContent>
              <DialogActions
                style={{ display: "flex", justifyContent: "left" }}
              >
                <Button
                  variant="contained"
                  autoFocus
                  onClick={handleClose}
                  style={{
                    textTransform: "capitalize",
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                >
                  Save
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </Grid>
        </Grid>
        {/* dialog-box-- */}

        <Grid item xs={12} mt={4}>
          <TableContainer style={{ backgroundColor: "transparent" }}>
            <Grid item xs={10} sx={{ paddingTop: 1, paddingBottom: 1 }}>
              <Divider />
            </Grid>
            <Table aria-label="simple table">
              <TableBody>
                {reasions &&
                  reasions?.map((reasion, key) => {
                    if (reasion && reasion?.auto_ == false) {
                      return (
                        <TableRow
                          key={key}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{
                              fontSize: 16,
                              fontWeight: 500,
                              color: "#858585",
                              paddingLeft: 0,
                              width: 400,
                            }}
                          >
                            {"Decline Reason"}
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: "#858585",
                            }}
                          >
                            {reasion?.description}
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })}
              </TableBody>
            </Table>
            <Grid item xs={10} sx={{ paddingTop: 1, paddingBottom: 1 }}>
              <Divider />
            </Grid>
          </TableContainer>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} md={8}>
          <Stack
            direction="row"
            spacing={1}
            style={{ fontSize: 18, fontWeight: 500 }}
          >
            <Typography variant="h5" className=" page_sub_header">
              <span>Automated Rejections</span>
            </Typography>

            <Link
              href="#"
              // onClick={() => {
              //   setAutomatedRejectionsUpdateSwitch(
              //     (automatedRejectionsUpdateSwitch) =>
              //       !automatedRejectionsUpdateSwitch
              //   );
              //   setDays(0);
              //   setReason("");
              // }}
              className="page_sub_outlineless_text_btn"
            >
              <Stack
                direction="row"
                spacing={1}
                mt={1}
                style={{ fontSize: 18, fontWeight: 500 }}
              >
                <NoteAltOutlinedIcon mt={1} />
                <Typography onClick={handleClickEditAutomatedOpen}>
                  {" "}
                  Edit Automated Rejections{" "}
                </Typography>
              </Stack>
            </Link>
          </Stack>
        </Grid>

        {/* dialog-box-- */}
        <Grid container>
          <Grid item xs={12}>
            <BootstrapDialog
              className="rj-dialog"
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={EditAutomatedOpen}
              style={{ minWidth: 550, maxHeight: "auto" }}
            >
              <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={handleAutomatedClose}
                style={{ fontSize: 30, fontWeight: 600 }}
              >
                Edit Automated Rejections
              </BootstrapDialogTitle>
              <DialogContent>
                <Grid>
                  <label>
                    <Typography
                      align="left"
                      variant="h6"
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                      }}
                    >
                      Reject in process applications after
                    </Typography>
                  </label>

                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <OutlinedInput
                      style={{ marginTop: 10, marginBottom: 30 }}
                      fullWidth
                      placeholder="000000"
                      autoFocus
                      size="small"
                      margin="dense"
                      type="number"
                      id="outlined-basic"
                      className="nwInput"
                      onChange={onChangeHandler}
                      // endAdornment={
                      //   <InputAdornment position="end">
                      //     <IconButton>
                      //       <DeleteOutlinedIcon
                      //         style={{
                      //           borderRadius: 5,
                      //         }}
                      //       />
                      //     </IconButton>
                      //   </InputAdornment>
                      // }
                    />
                  </FormControl>
                </Grid>
                {/* 2 */}
                <Grid>
                  <label>
                    <Typography
                      align="left"
                      variant="h6"
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                      }}
                    >
                      Decline Reason
                    </Typography>
                  </label>

                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <OutlinedInput
                      style={{ marginTop: 10, marginBottom: 30 }}
                      fullWidth
                      placeholder="Customet did not respond"
                      autoFocus
                      size="small"
                      margin="dense"
                      type="text"
                      id="outlined-basic"
                      className="nwInput"
                      onChange={onChangeHandler}
                      // endAdornment={
                      //   <InputAdornment position="end">
                      //     <IconButton>
                      //       <DeleteOutlinedIcon
                      //         style={{
                      //           backgroundColor: "#D9D9D9",
                      //           color: "#fff",
                      //           borderRadius: 5,
                      //         }}
                      //       />
                      //     </IconButton>
                      //   </InputAdornment>
                      // }
                    />
                  </FormControl>
                </Grid>
              </DialogContent>

              <DialogActions
                style={{ display: "flex", justifyContent: "left" }}
              >
                <Button
                  variant="contained"
                  autoFocus
                  onClick={handleClose}
                  style={{
                    textTransform: "capitalize",
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                >
                  Save
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </Grid>
        </Grid>
        {/* dialog-box-- */}

        <Grid item xs={12} mt={4}>
          <TableContainer style={{ backgroundColor: "transparent" }}>
            {/* <Grid item xs={8} sx={{ paddingTop: 1, paddingBottom: 1 }}>
              <Divider />
            </Grid> */}
            <Table aria-label="simple table">
              <TableBody>
                {reasions &&
                  reasions.map((reasion, key) => {
                    if (reasion && reasion?.auto_ == true) {
                      return (
                        <div key={key}>
                          <Grid
                            item
                            xs={10}
                            sx={{ paddingTop: 1, paddingBottom: 1 }}
                          >
                            <Divider />
                          </Grid>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                            style={{ fontSize: 16, fontWeight: 500 }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              style={{
                                fontSize: 16,
                                fontWeight: 500,
                                color: "#858585",
                                paddingLeft: 0,
                                width: 400,
                              }}
                            >
                              {"Reject in Process Applications After"}
                            </TableCell>

                            <TableCell
                              align="left"
                              style={{
                                fontSize: 16,
                                fontWeight: 600,
                                color: "#858585",
                              }}
                            >
                              {`${reasion?.days} days`}
                            </TableCell>

                            <Grid
                              item
                              xs={10}
                              sx={{ paddingTop: 1, paddingBottom: 1 }}
                            >
                              <Divider />
                            </Grid>
                          </TableRow>

                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                            style={{ fontSize: 16, fontWeight: 500 }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              style={{
                                fontSize: 16,
                                fontWeight: 500,
                                color: "#858585",
                                paddingLeft: 0,
                                width: 400,
                              }}
                            >
                              {"Decline Reason"}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                fontSize: 16,
                                fontWeight: 600,
                                color: "#858585",
                              }}
                            >
                              {reasion?.description}
                            </TableCell>
                          </TableRow>
                        </div>
                      );
                    }
                  })}
              </TableBody>
            </Table>
            <Grid item xs={10} sx={{ paddingTop: 1, paddingBottom: 1 }}>
              <Divider />
            </Grid>
          </TableContainer>
        </Grid>
        {/* <div>
          <Grid container>
            <Grid item xs={12}>
              <Dialog
                open={openRejectionPopup}
                onClose={handleClickCloseRejectionPopup}
              >
                <DialogTitle>Add Rejection</DialogTitle>
                <DialogContent>
                  <DialogContentText>please enter the reason</DialogContentText>
                  <TextField
                    name="reason"
                    type="text"
                    onChange={(e) => {
                      setRejectionReason(e.target.value);
                    }}
                    value={rejectionReason}
                    fullWidth
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    placeholder="Reason"
                    variant="outlined"
                    multiline
                    rows={4}
                    style={{ width: 500 }}
                  />
                  <FormControlLabel
                    style={{ marginLeft: 0 }}
                    value="start"
                    control={<Switch color="primary" />}
                    label="Auto"
                    labelPlacement="start"
                    onChange={handleChangeReasonAuto}
                  />
                  {rejectionCheckedReasonAuto && (
                    <TextField
                      name="days"
                      type="number"
                      onChange={(e) => {
                        setRejectionDays(e.target.value);
                      }}
                      value={rejectionDays}
                      fullWidth
                      size="small"
                      margin="normal"
                      id="outlined-basic"
                      placeholder="Days"
                      variant="outlined"
                      style={{ width: 500 }}
                    />
                  )}
                  <p style={{ color: "red" }}>{formError}</p>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    onClick={() => {
                      addRejection();
                    }}
                  >
                    Add Reason
                    {addRejectionLoading && (
                      <CircularProgress
                        style={{
                          height: 20,
                          width: 20,
                          marginLeft: 10,
                          color: "white",
                        }}
                      />
                    )}
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </div> */}
      </Grid>
    </Box>
  );
}

RejectionOption.layout = "AdminLayout";

export default RejectionOption;
