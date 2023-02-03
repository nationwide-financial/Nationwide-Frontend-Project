import React, { useEffect, useState } from "react";
import { Alert, Avatar, Backdrop, Box, Button, Chip, CircularProgress, FormControlLabel, Grid, IconButton, Typography, } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AvatarGroup from "@mui/material/AvatarGroup";
import { SettingsPhoneTwoTone, TuneOutlined } from "@mui/icons-material";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
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
import Checkbox from "@mui/material/Checkbox";
import SearchBox from "../../components/searchBox/searchBox";
// import Draggable from "@material-ui/core/SwipeableDrawer";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useRouter } from "next/router";
import { _gatLoanType, _getImage } from "../../services/loanTypeService.js";
import { _fetchWorkflowStatuses } from "../../services/loanWorkflowStatusServices";
import { _getApplications, _updateApplicationStatus, _updateRejections } from "../../services/applicationService";
import { s3URL } from '../../utils/config'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import moment from "moment";
import { Snackbar } from "@material-ui/core";
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import { Autocomplete } from "@mui/material";
import { _getAllPlatformUserByAdmin } from '../../services/authServices'
import { _listLabel } from '../../services/labelService'
import { _gatReason } from '../../services/rejectionOptionService'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
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

function LoanApplication() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [loanTypeData, setLoanTypeData] = useState([]);
  const [product, setProduct] = useState('');
  const [workflowStatus, setWorkflowStatus] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [trigger, setTrigger] = useState();
  const [apiStatus, setApiStatus] = useState();
  const [rejectionUpdateMsg, setRejectionUpdateMsg] = useState();
  const [teamMembersArr, setTeamMembersArr] = useState([]);
  const [platfromUsers, setPlatfromUsers] = useState([]);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedRejectionObj, setSelectedRejectionObj] = useState({})
  const [reasonsLoading, setReasonsLoading] = useState(false);

  const [appId, setAppId] = useState('');
  const [days, setDays] = useState(0);
  const [reasons, setReasons] = useState([]);
  const [checkedReasonAuto, setCheckedReasonAuto] = useState(false);
  const [show, setShow] = useState('hidden')

  const [applicationIdForRejection, setApplicationIdForRejection] = useState();
  const [bodyDataIdForRejection, setBodyDataIdForRejection] = useState();

  const handleChangeReasonAuto = (event) => {
    setCheckedReasonAuto(event.target.checked);
  };

  useEffect(() => {
    getUsers();
  }, [])

  useEffect(() => {
    getWorkflowStatus();
    getLoanType();
    getApplications();
    getRejections();
  }, [trigger]);

  const getLoanType = async () => {
    try {
      const res = await _gatLoanType();
      setLoanTypeData(res?.data?.data?.Items)
    } catch (err) {
      console.log(err)
    }
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    // styles we need to apply on draggables
    ...draggableStyle
  });

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "#ffffff",
    borderRadius: 5,
    padding: 8
  });

  const getWorkflowStatus = async () => {
    try {
      const response = await _fetchWorkflowStatuses();
      if (response?.status === 200) {
        setWorkflowStatus(response.data.loanStatuses.Items.length > 0 && response.data.loanStatuses.Items);
      }
    } catch (err) {
      console.log("Error ", err);
      //setError(err);
    }
  }

  const getApplications = async () => {
    try {
      const res = await _getAllPlatformUserByAdmin()
      const response = await _getApplications();
      if (response?.status === 200) {
        setApplications(response.data.data.Items.length > 0 && response.data.data.Items);
        getTeamMembers(response.data.data.Items);
      }
    } catch (err) {
      console.log("Error ", err);
      // setError(err);
    }
  }
  const addRejection = async (id, data) => {
    try {
      let { PK, auto, description, days } = data;
      let body = {
        applicationRejection: {
          auto: auto == "auto" ? true : false,
          days: days,
          reason: description
        }
      }
      setReasonsLoading(true)
      const res = await _updateRejections(id, body)
      if (res?.status == 200) {
        handleCloseRejectionPopup();
        setRejectionUpdateMsg({ severity: 'success', message: 'Rejection Reasion updated' })
        const response = await _updateApplicationStatus(id, bodyDataIdForRejection);
        //  setLoading(false);
        if (response?.status === 200) {
          setReasonsLoading(false)
          setBodyDataIdForRejection({})
          setApiStatus({ severity: 'success', message: 'Status updated' })
        } else {
          setReasonsLoading(false)
          setBodyDataIdForRejection({})
          setApiStatus({ severity: 'error', message: 'Status update failed' })
          setTrigger(moment())
        }
      } else {
        setRejectionUpdateMsg({ severity: 'error', message: 'Rejection Reasion update failed' })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getUsers = async () => {
    try {
      const res = await _getAllPlatformUserByAdmin()
      setPlatfromUsers(res?.data?.users)
    } catch (err) {
      console.log(err)
    }
  }

  const getRejections = async () => {
    try {
      const res = await _gatReason()
      setReasons(res?.data?.data?.Items)
    } catch (err) {
      console.log(err)
    }
  }

  const getTeamMembers = async (tempApplications) => {
    try {
      const res = await _getAllPlatformUserByAdmin()
      let tempUsers = res?.data?.users;
      let userIds = [];
      let teamMembers = [];

      await tempApplications.map((tempApplications) => {
        if (tempApplications?.members) {
          userIds.push(...tempApplications?.members)
        }
      })
      let removedduplicatesUsers = [...new Set(userIds)];
      await removedduplicatesUsers.map(async (id) => {
        let tempU = await tempUsers.filter((user) => user?.PK == 'USER#' + id)
        teamMembers.push(...tempU)
      })
      setTeamMembersArr([...teamMembers])
    } catch (err) {
      console.log(err)
    }
  }


  const onDragEnd = async (result) => {
    const { source, destination } = result;
    setShow('hidden')
    if (!destination) {
      return;
    } else {
      if (source.droppableId !== destination.droppableId) {
        const newStatus = destination.droppableId;
        const applicationId = result.draggableId;
        setAppId(applicationId);
        const body = { status_: newStatus }
        const applicationCopy = [...applications];
        const updatedIndex = applicationCopy.findIndex(application => application.PK === applicationId);
        const updated = [...applications, applications[updatedIndex].status_ = newStatus];
        // setLoading(true);
        if (newStatus.toLowerCase() == "closed") {
          handleClickOpenRejectionPopup()
          setApplicationIdForRejection(applicationId)
          setBodyDataIdForRejection(body)
        } else {
          const response = await _updateApplicationStatus(applicationId, body);
          // setLoading(false);
          if (response?.status === 200) {
            setApiStatus({ severity: 'success', message: 'Status updated' })
          } else {
            setApiStatus({ severity: 'error', message: 'Status update failed' })
            setTrigger(moment())
          }
        }
      }
    }
  }

  const renderWorkFlows = () => {
    const statusList = [];
    const sorted = workflowStatus.length > 0 && workflowStatus.sort((a, b) => (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0))
    sorted.length > 0 && sorted.map((status, index) => {
      const { componentList, total } = renderApplications(status.name);
      statusList.push(
        <Box
          sx={{
            width: 300,
            backgroundColor: '#ffffff',
            padding: 2,
            borderRadius: 2
          }}
        >
          <Stack direction='row' justifyContent='space-between'>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>{status.name}</Typography>
            <Typography variant="h6" sx={{ fontWeight: 400, color: '#a1a1a1' }}>{componentList.length}</Typography>
          </Stack>

          <Typography variant="h6" sx={{ fontWeight: 400 }}>$ {total}</Typography>
          <Droppable droppableId={status.name} key={status.name} type="status">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef} style={{ ...getListStyle(snapshot.isDraggingOver) }}>
                <Stack direction='column' spacing={1}>
                  {componentList}
                </Stack>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Box>
      )
    });

    return statusList;
  }

  const renderApplications = (status, varaint) => {
    const applicationList = [];
    let total = 0;
    applications && applications.map((application, index) => {
      if (application.status_ === status) {
        total = total + parseInt(application?.applicationBasicInfo?.loan_amount)
        applicationList.push(
          <Draggable draggableId={application.PK} index={index} type="application">
            {(provided, snapshot) => (
              <div ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}>
                <Paper
                  sx={{ backgroundColor: '#f8f8f8', minHeight: 100, padding: 2 }}
                >
                  <Stack direction='column' spacing={1}>
                    <Stack direction='row' spacing={0.5}>
                      <Chip color="success" sx={{ height: 4 }} />
                      <Chip color="warning" sx={{ height: 4 }} />
                      <Chip color="error" sx={{ height: 4 }} />
                    </Stack>
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 18 }}>{application.referralSource}</Typography>
                    <Stack direction='row' spacing={1} justifyContent='space-between' sx={{ color: '#a1a1a1' }}>
                      <Typography variant="p">#{application.productId.split('_')[1]}</Typography>
                      <Typography variant="p">|</Typography>
                      <Typography variant="p">{moment(application.createTime).format('YYYY-MM-DD')}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={1} justifyContent='space-between'>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>${application?.applicationBasicInfo?.loan_amount}</Typography>
                      <AvatarGroup max={2}>
                        {/* {users && users.map((user)=>{
                          return( <Avatar alt={user.PK.split("#")[1]} src={`${s3URL}/${user?.imageId}`}/>)
                        })} */}
                        <Avatar src={'/images/avatar' + (index + 1) + '.png'} />
                        <Avatar src='' />
                        <Avatar src='' />
                      </AvatarGroup>
                    </Stack>
                  </Stack>
                </Paper>
              </div>
            )}
          </Draggable>
        )
      }
    })
    return { componentList: applicationList, total: total };
  }



  const [openRejectionPopup, setOpenRejectionPopup] = useState(false);

  const handleClickOpenRejectionPopup = () => {
    setOpenRejectionPopup(true);
  };

  const handleCloseRejectionPopup = () => {
    // setDays(0);
    setCheckedReasonAuto(false);
    setAppId('');
    setOpenRejectionPopup(false);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setProduct('')
    setOpen(false);
  };

  //const [product,setProduct] = useState('');
  const [coContact, setCoContact] = useState(false)

  const handelSelectProduct = (id) => {
    setProduct(id)
  }

  const handleContinue = () => {
    if (coContact) {
      router.push(`/application/application-form?product=${product}&coEnable=${1}`);
    } else {
      router.push(`/application/application-form?product=${product}&coEnable=${0}`);
    }
  };

  const showView = () => {
    router.push("/application/application-table-view");
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

  const applicationsWon = renderApplications('won', 'mini');
  const applicationsLost = renderApplications('closed', 'mini');
  const applicationsAbandoned = renderApplications('abandoned', 'mini');
  return (
    <div>
      {apiStatus && <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={apiStatus} autoHideDuration={3000} onClose={() => setApiStatus()}>
        <Alert variant='filled' severity={apiStatus.severity}>
          {apiStatus.message}
        </Alert>
      </Snackbar>}
      {rejectionUpdateMsg && <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={rejectionUpdateMsg} autoHideDuration={3000} onClose={() => setRejectionUpdateMsg()}>
        <Alert variant='filled' severity={rejectionUpdateMsg.severity}>
          {rejectionUpdateMsg.message}
        </Alert>
      </Snackbar>}

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={false}>
        <CircularProgress color="inherit" />
        <h3>Updating Status...</h3>
      </Backdrop>
      <Box p={3} style={{ marginTop: 40 }}>
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
                onClick={() => {
                  setTrigger(moment())
                }}
              >
                <SyncOutlinedIcon fontSize="large" sx={{ color: "gray" }} />
              </IconButton>
              <Button
                variant="contained"
                sx={{ padding: "10px 40px" }}
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  textTransform: "capitalize",
                }}
                onClick={handleClickOpen}
              >
                New Application
              </Button>

              <Dialog open={open} onClose={handleClose} fullWidth m={4}>
                <Box sx={{ maxWidth: "100%" }} p={2}>
                  <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                  >
                    <Typography
                      variant="h6"
                      style={{ fontWeight: 700, fontSize: 30 }}
                    >
                      New Application
                    </Typography>
                  </BootstrapDialogTitle>

                  <DialogContent>
                    <FormControl
                      style={{ display: "flex", justifyContent: "center" }}
                    >
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
                          Selected Product
                        </Typography>
                      </label>

                      {loanTypeData.map((row, key) => (
                        <div key={key}>
                          <Box sx={{ maxWidth: "100%" }} className="hover_effect" >
                            <Stack spacing={2} direction="row">
                              <Button
                                fullWidth
                                variant="outlined"
                                borderColor="#393939"
                                style={{
                                  backgroundColor: row.PK == product ? '#1478F1' : '',
                                  color: row.PK == product ? '#FFFFFF' : '#393939',
                                }}
                                onMouseOver={() => {
                                  backgroundColor: "#1478F1";
                                  color: "#FFFFFF";
                                }}
                                onClick={() => {
                                  handelSelectProduct(row.PK)
                                }}
                              >
                                <Grid container display={"flex"} fontWeight={700}>
                                  <Grid
                                    xs={6}
                                    align="left"
                                    // color={"#393939"}
                                    textTransform="capitalize"
                                  >
                                    <Typography
                                      //  className="page_sub_content_header"
                                      style={{ fontSize: 20, fontWeight: 700, textTransform: "capitalize" }}
                                      p={1}
                                    >
                                      {row.loanName}
                                    </Typography>
                                  </Grid>{" "}
                                  <Grid xs={6} align="right" color={"#393939"}>
                                    {row.img != null && <img src={`${s3URL}/${row.img}`} height='40' width='40' />}
                                  </Grid>
                                </Grid>
                              </Button>
                            </Stack>
                          </Box>
                          <br />
                        </div>
                      ))}
                      <label>
                        {" "}
                        <Typography variant="h6" className="check_box_label">
                          Application Form Options
                        </Typography>
                      </label>
                      <Box sx={{ maxWidth: "100%" }}>
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox onChange={(e) => {
                              setCoContact(e.target.checked)
                            }} />}
                            className="check_box_label_subtext"
                            label="Include Co-Borrower Page"
                          />
                        </FormGroup>
                      </Box>
                    </FormControl>
                  </DialogContent>
                  <div style={{ marginBottom: 100, marginLeft: 16 }}>
                    <DialogActions
                      style={{ display: "flex", justifyContent: "left" }}
                      mt={2}
                    >
                      <Button
                        variant="contained"
                        onClick={handleContinue}
                        textTransform="capitalize"
                      >
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
          <Grid item xs={12} md={4} pr={2}>
            <SearchBox />
          </Grid>
          {/* active-user-display-section */}
          <Grid item xs={12} md={2} pl={2}>
            <AvatarGroup total={teamMembersArr.length}>
              {teamMembersArr && teamMembersArr.map((user, key) => {
                return (
                  <Avatar key={key} alt={user?.PK.split("#")[1]} src={`${s3URL}/${user?.imageId}`} />
                )
              })}
            </AvatarGroup>
          </Grid>
          {/* other-icon-set */}
          <Grid item xs={12} md={6} align="right">
            <Box sx={{ align: "right" }}>
              <Stack direction=" row">
                {/*icon-1  */}
                <Grid className="hover_effect">
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
                    style={{ transform: "rotate(360deg)" }}
                    className="hover_effect"
                  >
                    <SyncAltOutlinedIcon sx={{ color: "gray" }} />
                  </IconButton>
                </Grid>
                {/* icon-2 */}
                <Grid className="hover_effect">
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
                {/* icon-3 */}
                <Grid className="hover_effect">
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
                {/* icon-4 */}
                <Grid className="hover_effect">
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
                    onClick={showView}
                  >
                    <ViewCompactOutlinedIcon sx={{ color: "gray" }} />
                  </IconButton>
                </Grid>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        {/*body-content  */}
        <Grid container overflow='scroll' sx={{ marginTop: 2 }}>
          <DragDropContext onDragEnd={onDragEnd} onDragStart={() => setShow('inline')}>
            <Grid item xs={12}>
              <Stack direction={'row'} spacing={2} overflow='scroll'>
                {renderWorkFlows()}
              </Stack>
            </Grid>
            <Grid container sx={{
              marginTop: 2,
              visibility: show,
              position: 'absolute',
              bottom: 0,
              maxWidth: window.innerWidth - 300,
              boxShadow: '1px 1px 10px #d6d6d6',
              borderRadius: '15px 15px 0px 0px'
            }}>
              <Grid item xs={4}>
                <Box
                  sx={{
                    backgroundColor: '#ffffff',
                    padding: 2,
                    borderRadius: 2
                  }}
                >
                  <Stack direction='row' justifyContent='space-between'>
                    <Typography variant="h6" sx={{ fontWeight: 600 }} color='#4a794c'>Won</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 400, color: '#a1a1a1' }}>{applicationsWon.componentList.length}</Typography>
                  </Stack>
                  {/* <Typography variant="h6" sx={{ fontWeight: 400 }}>$ {applicationsWon.total}</Typography> */}
                  <Droppable droppableId='won' key='won' type="status">
                    {(provided, snapshot) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} style={{ height: 100, overflow: 'scroll', ...getListStyle(snapshot.isDraggingOver), background: snapshot.isDraggingOver && "#9bd79e" }}>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    backgroundColor: '#ffffff',
                    padding: 2,
                    borderRadius: 2
                  }}
                >
                  <Stack direction='row' justifyContent='space-between'>
                    <Typography variant="h6" sx={{ fontWeight: 600 }} color='#c8a524'>ABANDONED</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 400, color: '#a1a1a1' }}>{applicationsAbandoned.componentList.length}</Typography>
                  </Stack>
                  {/* <Typography variant="h6" sx={{ fontWeight: 400 }}>$ {applicationsAbandoned.total}</Typography> */}
                  <Droppable droppableId='abandoned' key='abandoned' type="status">
                    {(provided, snapshot) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} style={{ height: 100, overflow: 'scroll', ...getListStyle(snapshot.isDraggingOver), background: snapshot.isDraggingOver && '#ffcdcd' }}>
                        {/* <Stack direction='column' spacing={1}>
                          {applicationsAbandoned.componentList}
                        </Stack> */}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    backgroundColor: '#ffffff',
                    padding: 2,
                    borderRadius: 2
                  }}
                >
                  <Stack direction='row' justifyContent='space-between'>
                    <Typography variant="h6" sx={{ fontWeight: 600 }} color='#d72700'>Closed</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 400, color: '#a1a1a1' }}>{applicationsLost.componentList.length}</Typography>
                  </Stack>
                  {/* <Typography variant="h6" sx={{ fontWeight: 400 }}>$ {applicationsLost.total}</Typography> */}
                  <Droppable droppableId='closed' key='closed' type="status">
                    {(provided, snapshot) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} style={{ height: 100, overflow: 'scroll', ...getListStyle(snapshot.isDraggingOver), background: snapshot.isDraggingOver && '#ffcdcd' }}>
                        {/* <Stack direction='column' spacing={1}>
                          {applicationsLost.componentList}
                        </Stack> */}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Box>
              </Grid>
            </Grid>
          </DragDropContext>
        </Grid>
      </Box>
      <div>
        <Grid container><Grid item xs={12}>
          <Dialog open={openRejectionPopup} >
            <DialogTitle>Rejection</DialogTitle>
            <DialogContent>
              <div>
                <FormControl>
                  <label style={{ marginBottom: 6 }}>Select the Reasion</label>
                  <Autocomplete
                    style={{ width: "500px" }}
                    value={rejectionReason}
                    renderInput={(params) => (
                      <TextField {...params} size='small' label="reason" />
                    )}
                    onChange={(e, val) => {
                      setSelectedRejectionObj({
                        PK: val?.split(" | ")[0],
                        auto: val?.split(" | ")[1],
                        description: val?.split(" | ")[2],
                        days: val?.split(" | ")[3]
                      })
                      setRejectionReason(val?.split(" | ")[2])
                    }}
                    options={reasons?.map((reasion) => {
                      let s = `${reasion?.PK} | ${reasion?.auto_ ? "auto" : "manual"} | ${reasion?.description} | ${reasion?.days}`
                      return s;
                    })}
                  >
                  </Autocomplete>
                </FormControl>
              </div>
              {/* {Object.keys(selectedRejectionObj).length > 1  && <div style={{marginTop:20}}>
            <p>ID - {selectedRejectionObj?.PK}</p><br/>
            <p>Rejection type - {selectedRejectionObj?.auto}</p><br/>
            <p>Reason - {selectedRejectionObj?.description}</p><br/>
            <p>Days - {selectedRejectionObj?.days}</p>
          </div>}  */}
              {/* <TextField
            name="reason"
            type="text"
            onChange={(e)=>{
              setReason(e.target.value)
            }}
            //value={""}
            fullWidth
            size="small"
            margin="normal"
            id="outlined-basic"
            placeholder="Reason"
            variant="outlined"
            style={{width:500}}
            multiline
            rows={4}
            /> */}
              {/* <FormControlLabel
            style={{marginLeft:0}}
            value="start"
            control={<Switch color="primary" />}
            label="Auto"
            labelPlacement="start"
            onChange={handleChangeReasonAuto}
          /> */}
              {/* {checkedReasonAuto && <TextField
            name="days"
            type="number"
            onChange={(e)=>{
              setDays(e.target.value)
            }}
           // value={}
            fullWidth
            size="small"
            margin="normal"
            id="outlined-basic"
            placeholder="Days"
            variant="outlined"
            // style={{width:500}}
          /> } */}

            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={() => {
                addRejection(appId, selectedRejectionObj)
              }}>Add Reason
                {reasonsLoading && (
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
        </Grid></Grid>
      </div>
    </div>
  );
}

LoanApplication.layout = "AdminLayout";

export default LoanApplication;
