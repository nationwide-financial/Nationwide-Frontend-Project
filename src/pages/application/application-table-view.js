import React ,{useState,useEffect}from "react";
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

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AvatarGroup from "@mui/material/AvatarGroup";
import { TuneOutlined } from "@mui/icons-material";
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
import SyncAltOutlinedIcon from "@mui/icons-material/SyncAltOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ViewCompactOutlinedIcon from "@mui/icons-material/ViewCompactOutlined";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { height } from "@mui/system";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import Checkbox from "@mui/material/Checkbox";
import SearchBox from "../../components/searchBox/searchBox";
import LoanApplicatioTable from "../../components/table/table";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
import { useRouter } from "next/router";
import LoanAppDialogFormController from "../../components/applicationTableDialogboxFormController/loanApplicationDialogFormController";
import { s3URL } from '../../utils/config'
import { _getAllPlatformUserByAdmin } from '../../services/authServices'
import { _getApplications } from '../../services/applicationService';
import { _listLabel } from '../../services/labelService'
import { _fetchAllContacts } from '../../services/contactServices'



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// ----------------

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

// card-related---

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>

      <Typography sx={{ mb: 1.5 }} color="text.secondary style_">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

// card-related---

function ApplicationTableView() {
  // const [value, setValue] = useState("t");
  const [tableData,setTableData]=useState([])
  const [teamMembersArr, setTeamMembersArr] = useState([]);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  // const changeStatOfElement = () =>{

  // }
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

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 40,
    height: 24,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#1976d2",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 20,
      height: 20,
    },
    "& .MuiSwitch-track": {
      borderRadius: 24 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));
  async function getLabels() {
    try{
      const response = await _listLabel();
      // console.log("_listLabel",response);
      return  response.data.data.Items
      
    }catch(err){
      console.log(err)
    } 
  }

  async function getTableData(){
    try{
      const res = await _getApplications();
     // console.log("resresresresresres",res)
    //  console.log(res?.data?.data?.Items)
      let tableDt = await res?.data?.data?.Items.sort((a,b) => (a.createTime < b.createTime) ? 1 : ((b.createTime < a.createTime) ? -1 : 0));
     
      console.log("_getApplications",tableDt)
      mergeDocuments(tableDt)
    }catch(err){
      console.log(err)
    }
  }

const mergeDocuments = async (tempApplications) =>{
    try{
      const res = await _getAllPlatformUserByAdmin()
      const resContact = await _fetchAllContacts();
      let tempUsers = res?.data?.users;
      let userIds = [];
      let teamMembers = [];
      await tempApplications.map( async (tempApplications)=>{
        if(tempApplications?.members){
         await userIds.push(...tempApplications?.members)
        }
      })
      let removedduplicatesUsers = [...new Set(userIds)];
      await removedduplicatesUsers.map( async (id)=>{
        let tempU = await tempUsers.filter((user)=> user?.PK == 'USER#'+id)
        teamMembers.push(...tempU)
      })
      setTeamMembersArr([...teamMembers])

      let labelsArr = await getLabels();
      console.log("labels",labelsArr)

      let tableDataArry =[];
      await tempApplications.map((application) => {
        let object ={}
        let team=[];
        let labels = [];
        let contact = {};
        object.application = application
        if (application?.members){
          application?.members.map((user)=>{
            team.push(...teamMembers.filter((member)=>{ return member?.PK == 'USER#'+user}));
          })
          object.teamArr = team;
        }
        
        if (application?.appLabel){
          application?.appLabel.map((applabel)=>{
            labels.push(...labelsArr.filter((label)=>{ return label?.PK == applabel}));
          })
          object.labelArr = labels;
        }

        if (application?.contactId){
            object.contact= resContact?.data?.Items.filter((con)=>{ return con?.PK == application?.contactId[0]})[0]; 
        }
        tableDataArry.push(object)
      })
      setTableData([...tableDataArry])
    }catch(err){
      console.log(err)
    }
  }

 useEffect(() => {
  getTableData();
 }, []);


  return (
    <div>
      <Box p={4}>
        {/* 1st-header-section */}
        <Grid container mb={5}>
          <Grid item xs={12} md={6}>
            <h1 className="page_header">Loan Applications</h1>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "right" }}>
              {/* icon-4 */}
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
                <SyncOutlinedIcon fontSize="large" sx={{ color: "gray" }} />
              </IconButton>
              <Button
                variant="contained"
                sx={{ padding: "10px 40px" }}
                onClick={handleClickOpen}
              >
                New Application
              </Button>

              <Dialog open={open} onClose={handleClose} fullWidth m={4}>
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
                    <LoanAppDialogFormController />
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
          </Grid>
        </Grid>

        {/* 2nd-header-section */}
        <Grid container mt={2}>
          {/* header-search-section */}
          <Grid item xs={12} md={5}>
            <Grid container spacing={1} alignItems="flex-end">IconButton
              <Grid item xs={12}>
                <SearchBox style={{ color: "#858585" }} />
              </Grid>
            </Grid>
          </Grid>
          {/* active-user-display-section */}
          <Grid item xs={12} md={1}>
            <AvatarGroup total={teamMembersArr.length}>
            {teamMembersArr && teamMembersArr.map((user, key)=>{
                return(
                  <Avatar key={key} alt={user?.PK.split("#")[1]} src={`${s3URL}/${user?.imageId}`} />
                )
              })}
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              {/* <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
              <Avatar
                alt="Trevor Henderson"
                src="/static/images/avatar/5.jpg"
              /> */}
            </AvatarGroup>
          </Grid>
          {/* other-icon-set */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "right" }}>
              <Grid container className="css-gnya7v">
                <Stack direction=" row">
                  <Grid item className="hover_effect">
                    {" "}
                    {/*icon-1  */}
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
                      onClick={()=>{
                        router.push('/application/dashbord')
                      }}
                      aria-label="save"
                      style={{ transform: "rotate(360deg)" }}
                    >
                      <SyncAltOutlinedIcon sx={{ color: "gray" }} />
                    </IconButton>
                  </Grid>
                  <Grid item className="hover_effect">
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
                  </Grid>
                  <Grid item className="hover_effect">
                    {/* icon-3 */}
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
                      <DashboardOutlinedIcon sx={{ color: "gray" }} />
                    </IconButton>
                  </Grid>
                  <Grid item className="hover_effect">
                    {/* icon-4 */}
                    <IconButton
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: 1,
                        border: "1px solid",
                        borderColor: "gray",
                        padding: 2,
                      }}
                      aria-label="save"
                    >
                      <ViewCompactOutlinedIcon sx={{ color: "gray" }} />
                    </IconButton>
                  </Grid>
                </Stack>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        {/*body-content  */}
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <LoanApplicatioTable applications={tableData} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

ApplicationTableView.layout = "AdminLayout";

export default ApplicationTableView;
