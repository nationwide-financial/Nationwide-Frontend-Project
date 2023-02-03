import React, { useState, useCallback, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControlLabel,
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
import DialogContentText from '@mui/material/DialogContentText';
import Switch from "@mui/material/Switch";
import DialogActions from "@mui/material/DialogActions";

import CircularProgress from '@mui/material/CircularProgress';
import { _getApplications } from '../../services/applicationService'
import { _addRejection, _gatReason, _updateRejection } from '../../services/rejectionOptionService'
import { FastForward, Flag } from "@mui/icons-material";
import { Snackbar } from "@material-ui/core";
import {Alert} from "@mui/material";





function RejectionOption() {
	
  const [openRejectionPopup, setOpenRejectionPopup] = useState(false);
  const handleClickOpenRejectionPopup = () => {
    setOpenRejectionPopup(true);
  };

  const handleClickCloseRejectionPopup = () => {
    setRejectionDays(0);
    setRejectionReason('');
    setRejectionCheckedReasonAuto(false);
    setFormError('')
    setOpenRejectionPopup(false);
  };

  const handleChangeReasonAuto = (event) => {
    setRejectionCheckedReasonAuto(event.target.checked);
  };
  const [reasions, setReasons] = useState([]);
  const [rejectionDays, setRejectionDays] = useState(0);
  const [rejectionReason,setRejectionReason]=useState('');
 // const [rejectionLabel,setRejectionLabel]=useState('');
  const [rejectionCheckedReasonAuto, setRejectionCheckedReasonAuto] = useState(false);
  const [formError,setFormError]=useState("");
  const [addRejectionLoading, setAddRejectionLoading] = useState(false);
  
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState('');
  const [message, setMessage] = useState();
  const [trigger,setTrigger] = useState(false)
  const [appId,setAppId]=useState('');
  const [days, setDays] = useState(0);
  const [reason,setReason]=useState('');
  const [checkedReasonAuto, setCheckedReasonAuto] = useState(false);
  const [userInputs, setUserInputs] = useState({});

  const [declineRejectionsUpdateSwitch, setdeclineRejectionsUpdateSwitch] = useState(false);
  const [automatedRejectionsUpdateSwitch, setAutomatedRejectionsUpdateSwitch] = useState(false);

  async function getRejections() {
    try{
      let inputs={}
      const data = await _gatReason();
      //console.log("_gatReason",data) 

      setReasons(data.data.data.Items);
      data.data.data.Items.map((val)=>{
        inputs[`REASOIN_${val.PK}`] = val?.description;
        inputs[`LABEL_${val.PK}`] = val?.label;
        inputs[`DAYS_${val.PK}`] = val?.days;
        inputs[`AUTO_${val.PK}`] = val?.auto_;
      })
      //console.log("input************",inputs)
      setUserInputs({...inputs})
    }catch(err){
      console.log(err)
    }
  }

  
  const onChangeHandler = useCallback(({ target }) => {
    setUserInputs((state) => ({ ...state, [target.name]: target.value }));
  }, []);
  const updateRejection = async (id,days,auto,reason) =>{
    //console.log("id,days,auto,reason",id,"  ",days,"  ",auto,"  ",reason)
    try{
      let body = {
          auto_: auto,
          days: days,
          description: reason,
          label:"Decline Reason"
      }
      setLoading(id)
      const res = await _updateRejection(id,body)
      setLoading("")
      //console.log("_updateRejections",res)
      if(res?.status == 200){
        handleCloseRejectionPopup();
        setMessage({ severity: 'success', message: 'Rejection Reasion updated' })
      }else{
        setMessage({ severity: 'error', message: 'Rejection Reasion update failed' })
      }
      setDays(0);
      setReason('');
     // console.log("updateRejection",res)
    }
    catch(err){
      console.log(err)
    }
  }

  const addRejection = async () =>{
    try{
      let body={
        label:"Decline Reason",
        description:rejectionReason,
        auto_:rejectionCheckedReasonAuto,
        days:rejectionDays
      }
     // console.log(body)
      if(!rejectionReason || rejectionReason == "" || rejectionReason == null){
        setFormError("Reasion can not be empty!")
      }else if((rejectionDays == 0) && rejectionCheckedReasonAuto){
        setFormError("Days can not be zero!")
      }else if((Math.sign(rejectionDays) == -1) && rejectionCheckedReasonAuto){
        setFormError("Days can not be negative!")
      }else{
        setFormError("")
        setAddRejectionLoading(true)
        const res = await _addRejection(body);
        //console.log(res)
        if(res?.status == 200){
          setAddRejectionLoading(false)
          handleClickCloseRejectionPopup()
          getRejections()
          setMessage({ severity: 'success', message: 'Rejection Reasion Added' })
        }else{
          setAddRejectionLoading(false)
          setMessage({ severity: 'error', message: 'Rejection Reasion Adding is failed' })
          getRejections()
        }
      }
    }catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
   // getData();
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
       {message && <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={message} autoHideDuration={3000} onClose={() => setMessage()}>
        <Alert variant='filled' severity={message.severity}>
          {message.message}
        </Alert>
      </Snackbar>}
      <Grid container mb={5}>
        <Grid item xs={12} md={6} mb={2}>
          <h1 className="page_header">Rejection Options</h1>
        </Grid>
        <Grid item xs={12} md={6} mb={2}>
          <div
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
          </div>
        </Grid>
      </Grid>
      <Grid container mb={5} mt={3}>
        <Grid item xs={12} md={8}>
          <Stack direction="row" spacing={1}>
            <Typography variant="h5" className=" page_sub_header">
              <span>Decline Reasons</span>
            </Typography>
            {declineRejectionsUpdateSwitch ? (
              <Button
                variant="contained"
                onClick={() => {
                  setdeclineRejectionsUpdateSwitch(
                    (declineRejectionsUpdateSwitch) =>
                      !declineRejectionsUpdateSwitch
                  );
                  setDays(0);
                  setReason("");
                }}
              >
                Cancel
              </Button>
            ) : (
              <Link
                href="#"
                onClick={() => {
                  setdeclineRejectionsUpdateSwitch(
                    (declineRejectionsUpdateSwitch) =>
                      !declineRejectionsUpdateSwitch
                  );
                  setDays(0);
                  setReason("");
                }}
                className="page_sub_outlineless_text_btn"
              >
                <Stack
                  direction="row"
                  spacing={1}
                  mt={1}
                  style={{ fontSize: 18, fontWeight: 500 }}
                >
                  <NoteAltOutlinedIcon mt={1} />
                  <Typography> Edit Decline Reasons </Typography>
                </Stack>
              </Link>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} mt={4}>
          <TableContainer style={{ backgroundColor: "transparent" }}>
            <Grid item xs={8} sx={{ paddingTop: 1, paddingBottom: 1 }}>
              <Divider />
            </Grid>
            <Table aria-label="simple table">
              <TableBody>
                {reasions &&
                  reasions?.map((reasion, key) => {
                    if (
                      reasion &&
                      reasion?.auto_ == false
                    ) {
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
                            }}
                          >
                            {"Decline Reason"}
                          </TableCell>
                          {declineRejectionsUpdateSwitch ? (
                            <div>
                              <TextField
                                name={`REASOIN_${reasion.PK}`}
                                type="text"
                                onChange={onChangeHandler}
                                value={
                                  (userInputs &&
                                    userInputs[`REASOIN_${reasion.PK}`]) ||
                                  ""
                                }
                                fullWidth
                                size="small"
                                margin="normal"
                                id="outlined-basic"
                                placeholder="reasion"
                                variant="outlined"
                                multiline
                                rows={3}
                                style={{ width: 500 }}
                              />
                              <br />
                              <Button
                                variant="contained"
                                onClick={async () => {
                                  await updateRejection(
                                    reasion.PK,
                                    0,
                                    false,
                                    userInputs &&
                                      userInputs[`REASOIN_${reasion.PK}`]
                                  );
                                  await setdeclineRejectionsUpdateSwitch(false);
                                  setTrigger((trigger) => !trigger);
                                }}
                              >
                                Save
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
                            </div>
                          ) : (
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
                          )}
                        </TableRow>
                      );
                    }
                  })}
              </TableBody>
            </Table>
            <Grid item xs={8} sx={{ paddingTop: 1, paddingBottom: 1 }}>
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
            {automatedRejectionsUpdateSwitch ? (
              <Button
                variant="contained"
                onClick={() => {
                  setAutomatedRejectionsUpdateSwitch(
                    (automatedRejectionsUpdateSwitch) =>
                      !automatedRejectionsUpdateSwitch
                  );
                  setDays(0);
                  setReason("");
                }}
              >
                Cancel
              </Button>
            ) : (
              <Link
                href="#"
                onClick={() => {
                  setAutomatedRejectionsUpdateSwitch(
                    (automatedRejectionsUpdateSwitch) =>
                      !automatedRejectionsUpdateSwitch
                  );
                  setDays(0);
                  setReason("");
                }}
                className="page_sub_outlineless_text_btn"
              >
                <Stack
                  direction="row"
                  spacing={1}
                  mt={1}
                  style={{ fontSize: 18, fontWeight: 500 }}
                >
                  <NoteAltOutlinedIcon mt={1} />
                  <Typography> Edit Automated Rejections </Typography>
                </Stack>
              </Link>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} mt={4}>
          <TableContainer style={{ backgroundColor: "transparent" }}>
            <Grid item xs={8} sx={{ paddingTop: 1, paddingBottom: 1 }}>
              <Divider />
            </Grid>
            <Table aria-label="simple table">
              <TableBody>
                {reasions &&
                  reasions.map((reasion, key) => {
                    if (
                      reasion &&
                      reasion?.auto_ == true
                    ) {
                      return (
                        <div key={key}>
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
                              }}
                            >
                              {"Reject in Process Applications After"}
                            </TableCell>
                            {automatedRejectionsUpdateSwitch ? (
                              <div>
                                <TextField
                                  name={`DAYS_${reasion.PK}`}
                                  type="number"
                                  onChange={onChangeHandler}
                                  value={
                                    (userInputs &&
                                      userInputs[`DAYS_${reasion.PK}`]) ||
                                    ""
                                  }
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  placeholder="days"
                                  variant="outlined"
                                  style={{ width: 500 }}
                                />
                              </div>
                            ) : (
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
                            )}
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
                              }}
                            >
                              {"Decline Reason"}
                            </TableCell>

                            {automatedRejectionsUpdateSwitch ? (
                              <div>
                                <TextField
                                  name={`REASOIN_${reasion.PK}`}
                                  type="text"
                                  onChange={onChangeHandler}
                                  value={
                                    (userInputs &&
                                      userInputs[
                                        `REASOIN_${reasion.PK}`
                                      ]) ||
                                    ""
                                  }
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  id="outlined-basic"
                                  placeholder="reasion"
                                  variant="outlined"
                                  multiline
                                  rows={3}
                                  style={{ width: 500 }}
                                />
                                <br />
                                <Button
                                  variant="contained"
                                  onClick={async () => {
                                    setLoading(reasion.PK);
                                    await updateRejection(
                                      reasion.PK,
                                      userInputs &&
                                        userInputs[`DAYS_${reasion.PK}`],
                                      true,
                                      userInputs &&
                                        userInputs[`REASOIN_${reasion.PK}`]
                                    );
                                    await setAutomatedRejectionsUpdateSwitch(
                                      false
                                    );
                                    setTrigger((trigger) => !trigger);
                                  }}
                                >
                                  Save
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
                              </div>
                            ) : (
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
                            )}
                          </TableRow>
                        </div>
                      );
                    }
                  })}
              </TableBody>
            </Table>
            <Grid item xs={8} sx={{ paddingTop: 1, paddingBottom: 1 }}>
              <Divider />
            </Grid>
          </TableContainer>
        </Grid>
        <div>
          <Grid container>
            <Grid item xs={12}>
              <Dialog
                open={openRejectionPopup}
                onClose={handleClickCloseRejectionPopup}
              >
                <DialogTitle>Add Rejection</DialogTitle>
                <DialogContent>
                  <DialogContentText>please enter the reason</DialogContentText>
                  {/* <TextField
                    name="label"
                    type="text"
                    onChange={(e) => {
                      setRejectionLabel(e.target.value);
                    }}
                    value={rejectionLabel}
                    fullWidth
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    placeholder="Label"
                    variant="outlined"
                     style={{width:500}}
                  /> */}
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
                    style={{width:500}}
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
                       style={{width:500}}
                    />
                  )}
                  <p style={{color:"red"}}>{formError}</p>
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
        </div>
      </Grid>
    </Box>
  );
}

RejectionOption.layout = "AdminLayout";

export default RejectionOption;
