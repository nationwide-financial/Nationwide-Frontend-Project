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
import CircularProgress from '@mui/material/CircularProgress';
import { _updateRejections } from '../../services/applicationService'



import { _getApplications } from '../../services/applicationService'
import { FastForward } from "@mui/icons-material";
function topcreateData(leftData, rightData) {
  return { leftData, rightData };
}

const toprows = [
  topcreateData("Decline Reason 1", "Failed credit underwiting requirements"),
  topcreateData("Decline Reason 2", "Unable  to verify required information"),
  topcreateData("Decline Reason 3", "Incomplete application"),
  topcreateData("Decline Reason 4", "Customer declined the after"),
];

// bottom rowws

function downcreateData(leftData, rightData) {
  return { leftData, rightData };
}

const downrows = [
  downcreateData("Reject in Process Applications After", "12 Days"),
  downcreateData("Decline Reason ", "The Customer did not respond"),
];

function RejectionOption() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState('');
  const [rejectionUpdateMsg, setRejectionUpdateMsg] = useState();
  const [trigger,setTrigger] = useState(false)
  const [appId,setAppId]=useState('');
  const [days, setDays] = useState(0);
  const [reason,setReason]=useState('');
  const [checkedReasonAuto, setCheckedReasonAuto] = useState(false);
  const [userInputs, setUserInputs] = useState({});

  const [declineRejectionsUpdateSwitch, setdeclineRejectionsUpdateSwitch] = useState(false);
  const [automatedRejectionsUpdateSwitch, setAutomatedRejectionsUpdateSwitch] = useState(false);

  async function getData() {
    try{
      let inputs={}
      const data = await _getApplications();
      console.log("_getApplications",data) 
      setApplications(data.data.data.Items);
      data.data.data.Items.map((val)=>{
       if(val?.applicationRejection){
        inputs[`REASOIN_${val.PK}`] = val?.applicationRejection?.reason;
        inputs[`DAYS_${val.PK}`] = val?.applicationRejection?.days;
        inputs[`AUTO_${val.PK}`] = val?.applicationRejection?.auto;
       }  
      })
      setUserInputs({...inputs})
    }catch(err){
      console.log(err)
    }
  }
  console.log("userInputs",userInputs)
  const onChangeHandler = useCallback(({ target }) => {
    setUserInputs((state) => ({ ...state, [target.name]: target.value }));
  }, []);
  const updateRejection = async (id,days,auto,reason) =>{
    console.log("id,days,auto,reason",id,"  ",days,"  ",auto,"  ",reason)
    try{
      let body = {
          applicationRejection: {
          auto: auto,
          days: days,
          reason: reason
        }
      }
      setLoading(id)
      const res = await _updateRejections(id,body)
      setLoading("")
      console.log("_updateRejections",res)
      if(res?.status == 200){
        handleCloseRejectionPopup();
        setRejectionUpdateMsg({ severity: 'success', message: 'Rejection Reasion updated' })
      }else{
        setRejectionUpdateMsg({ severity: 'error', message: 'Rejection Reasion update failed' })
      }
      setDays(0);
      setReason('');
    }catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    getData();
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
      <Grid container mb={5}>
        <Grid item xs={12} md={6} mb={2}>
          <h1 className="page_header">Rejection Options</h1>
        </Grid>
      </Grid>

      <Grid container mb={5}>
        <Grid item xs={12} md={8}>
          <Stack direction="row" spacing={1}>
            <Typography variant="h5" className=" page_sub_header">
              <span>Decline Reasons</span>
            </Typography>
            {declineRejectionsUpdateSwitch
              ? <Button variant="contained" onClick={() => {
                setdeclineRejectionsUpdateSwitch((declineRejectionsUpdateSwitch) => !declineRejectionsUpdateSwitch)
                setDays(0);
                setReason('');
              }}>Cancel</Button>
              : <Link href="#" onClick={() => {
                setdeclineRejectionsUpdateSwitch((declineRejectionsUpdateSwitch) => !declineRejectionsUpdateSwitch)
                setDays(0);
                setReason('');
              }}
                className="page_sub_outlineless_text_btn">
                <Stack
                  direction="row"
                  spacing={1}
                  mt={1}
                  style={{ fontSize: 18, fontWeight: 500 }}
                >
                  <NoteAltOutlinedIcon mt={1} />
                  <Typography> Edit Decline Reasons </Typography>
                </Stack>
              </Link>}
          </Stack>
        </Grid>

        <Grid item xs={12} mt={4}>
          <TableContainer style={{ backgroundColor: "transparent" }}>
            <Grid item xs={8} sx={{ paddingTop: 1, paddingBottom: 1 }}>
              <Divider />
            </Grid>
            <Table aria-label="simple table">
              <TableBody>
               {applications && applications.map((application,key)=>{
                if( application?.applicationRejection && application?.applicationRejection?.auto == false){
                  return  ( <TableRow
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
                    {declineRejectionsUpdateSwitch 
                    ? <div>
                      <TextField
                        name={`REASOIN_${application.PK}`}
                        type="text"
                        onChange={onChangeHandler}
                        value={(userInputs && userInputs[`REASOIN_${application.PK}`]) || ""}
                        fullWidth
                        size="small"
                        margin="normal"
                        id="outlined-basic"
                        placeholder="reasion"
                        variant="outlined"
                        multiline
                        rows={3}
                        style={{width:500}}
                      />
                      <br />
                      <Button variant="contained" onClick={ async () => {
                       await updateRejection(application.PK,0,false,(userInputs && userInputs[`REASOIN_${application.PK}`]) )
                       await setdeclineRejectionsUpdateSwitch(false)
                       setTrigger((trigger)=>!trigger)
                      }}>
                        Save 
                     {application.PK == loading && <CircularProgress style={{ height:20,width:20, marginLeft:10,color:"white" }}/>} 
                      </Button>
                    </div>
                    : <TableCell
                      align="left"
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "#858585",
                      }}
                    >
                      {application?.applicationRejection?.reason}
                    </TableCell>}
                   
                   
                  </TableRow>)
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
            {automatedRejectionsUpdateSwitch
              ? <Button variant="contained" onClick={() => {
                setAutomatedRejectionsUpdateSwitch((automatedRejectionsUpdateSwitch) => !automatedRejectionsUpdateSwitch)
                setDays(0);
                setReason('');
              }}>Cancel</Button>
              : <Link href="#" onClick={() => {
                setAutomatedRejectionsUpdateSwitch((automatedRejectionsUpdateSwitch) => !automatedRejectionsUpdateSwitch)
                setDays(0);
                setReason('');
              }}
                className="page_sub_outlineless_text_btn">
                <Stack
                  direction="row"
                  spacing={1}
                  mt={1}
                  style={{ fontSize: 18, fontWeight: 500 }}
                >
                  <NoteAltOutlinedIcon mt={1} />
                  <Typography> Edit Automated Rejections </Typography>
                </Stack>
              </Link>}
          </Stack>
        </Grid>

        <Grid item xs={12} mt={4}>
          <TableContainer style={{ backgroundColor: "transparent" }}>
            <Grid item xs={8} sx={{ paddingTop: 1, paddingBottom: 1 }}>
              <Divider />
            </Grid>
            <Table aria-label="simple table">
              <TableBody>
              {applications && applications.map((application,key)=>{
                if( application?.applicationRejection && application?.applicationRejection?.auto == true){
                  return ( <div >
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
                      {automatedRejectionsUpdateSwitch ? <div>
                        <TextField
                        name={`DAYS_${application.PK}`}
                        type="number"
                        onChange={onChangeHandler}
                        value={(userInputs && userInputs[`DAYS_${application.PK}`]) || ""}
                        fullWidth
                        size="small"
                        margin="normal"
                        id="outlined-basic"
                        placeholder="days"
                        variant="outlined"
                        style={{width:500}}
                      />
                      </div>: <TableCell
                        align="left"
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: "#858585",
                        }}
                      >
                        {`${application?.applicationRejection?.days} days`}
                      </TableCell>}
                     
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

                      {automatedRejectionsUpdateSwitch ? <div>
                        <TextField
                        name={`REASOIN_${application.PK}`}
                        type="text"
                        onChange={onChangeHandler}
                        value={(userInputs && userInputs[`REASOIN_${application.PK}`]) || ""}
                        fullWidth
                        size="small"
                        margin="normal"
                        id="outlined-basic"
                        placeholder="reasion"
                        variant="outlined"
                        multiline
                        rows={3}
                        style={{width:500}}
                      />
                      <br />
                      <Button variant="contained" onClick={ async () => {
                      setLoading(application.PK)
                       await updateRejection(application.PK,userInputs && userInputs[`DAYS_${application.PK}`],true,userInputs && userInputs[`REASOIN_${application.PK}`])
                       await setAutomatedRejectionsUpdateSwitch(false)
                       setTrigger((trigger)=>!trigger)
                      }}>
                        Save 
                     {application.PK == loading && <CircularProgress style={{ height:20,width:20, marginLeft:10,color:"white" }}/>} 
                      </Button>
                      </div>: 
                      <TableCell
                        align="left"
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: "#858585",
                        }}
                      >
                        {application?.applicationRejection?.reason}
                      </TableCell>}
                    </TableRow>
                  </div>)
                }})}
                  
              </TableBody>
            </Table>
            <Grid item xs={8} sx={{ paddingTop: 1, paddingBottom: 1 }}>
              <Divider />
            </Grid>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

RejectionOption.layout = "AdminLayout";

export default RejectionOption;
