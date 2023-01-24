import React, { useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Backdrop,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AvatarGroup from "@mui/material/AvatarGroup";
import { TuneOutlined } from "@mui/icons-material";
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
import { _getApplications, _updateApplicationStatus } from "../../services/applicationService";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import moment from "moment";
import { Snackbar } from "@material-ui/core";

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

  useEffect(() => {
    getWorkflowStatus();
    getLoanType();
    getApplications();
  }, [trigger]);

  const getLoanType = async () => {
    try {
      const res = await _gatLoanType();

      setLoanTypeData(res?.data?.data?.Items)
      console.log(loanTypeData)
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
      setError(err);
    }
  }

  const getApplications = async () => {
    try {
      const response = await _getApplications();

      if (response?.status === 200) {
        setApplications(response.data.data.Items.length > 0 && response.data.data.Items);
      }
    } catch (err) {
      console.log("Error ", err);
      setError(err);
    }
  }

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    } else {
      if (source.droppableId !== destination.droppableId) {
        const newStatus = destination.droppableId;
        const applicationId = result.draggableId;
        const body = { status_: newStatus }
        const applicationCopy = [...applications];
        const updatedIndex = applicationCopy.findIndex(application => application.PK === applicationId);
        const updated = [...applications, applications[updatedIndex].status_ = newStatus];
        setLoading(true);
        const response = await _updateApplicationStatus(applicationId, body);
        setLoading(false);



        if (response?.status === 200) {
          setApiStatus({ severity: 'success', message: 'Status updated' })
        } else {
          setApiStatus({ severity: 'error', message: 'Status update failed' })
          setTrigger(moment())
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
              <div {...provided.droppableProps} ref={provided.innerRef} style={{ height: 400, overflow: 'scroll', ...getListStyle(snapshot.isDraggingOver) }}>
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
        total = total + parseInt(application.loanAmount)
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
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>${application.loanAmount}</Typography>
                      <AvatarGroup max={2}>
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
    console.log(id)
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


  // const handelSelectProduct = (id) => {
  //   setProduct(id)
  //   console.log(id)
  // }

  // const [loanTypeData, setLoanTypeData] = useState([]);
  // const getLoanType = async () => {
  //   try {
  //     const res = await _gatLoanType();
  //     setLoanTypeData(res?.data?.data?.Items)
  //    console.log(loanTypeData) 
  //   } catch (err) {
  //     console.log(err)
  //   }
  // };



  const applicationsWon = renderApplications('won', 'mini');
  const applicationsLost = renderApplications('lost', 'mini');
  const applicationsAbandoned = renderApplications('abandoned', 'mini');

  return (
    <div>
      {apiStatus && <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={apiStatus} autoHideDuration={3000} onClose={() => setApiStatus()}>
        <Alert variant='filled' severity={apiStatus.severity}>
          {apiStatus.message}
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
                <Box sx={{ width: 1000, maxWidth: "100%" }} p={2}>
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
                          <Box sx={{ maxWidth: "100%" }} className="hover_effect">
                            <Stack spacing={2} direction="row">
                              <Button
                                fullWidth
                                variant="outlined"
                                borderColor="#393939"
                                style={{
                                  backgroundColor: row.PK == product ? '#1478F1' : '',
                                  color: row.PK == product ? '#FFFFFF' : '',
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
                                    color={"#393939"}
                                    textTransform="capitalize"
                                  >
                                    <Typography
                                      className="page_sub_content_header"
                                      p={1}
                                    >
                                      {row.loanName}
                                    </Typography>
                                  </Grid>{" "}
                                  <Grid xs={6} align="right" color={"#393939"}>
                                    {row.img != null && <img src={`data:image;base64,${row.img}`} height='20' width='20' />}
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
                  <div style={{ marginBottom: 100 }}>
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
            <AvatarGroup total={9}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
              <Avatar
                alt="Trevor Henderson"
                src="/static/images/avatar/5.jpg"
              />
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
          <DragDropContext onDragEnd={onDragEnd}>
            <Grid item xs={12}>
              <Stack direction={'row'} spacing={2} overflow='scroll'>
                {renderWorkFlows()}
              </Stack>
            </Grid>
            <Grid container>
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
                  <Typography variant="h6" sx={{ fontWeight: 400 }}>$ {applicationsWon.total}</Typography>
                  <Droppable droppableId='won' key='won' type="status">
                    {(provided, snapshot) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} style={{ height: 170, overflow: 'scroll', ...getListStyle(snapshot.isDraggingOver), background: snapshot.isDraggingOver && "#9bd79e" }}>
                        <Stack direction='column' spacing={1}>
                          {applicationsWon.componentList}
                        </Stack>
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
                  <Typography variant="h6" sx={{ fontWeight: 400 }}>$ {applicationsAbandoned.total}</Typography>
                  <Droppable droppableId='abandoned' key='abandoned' type="status">
                    {(provided, snapshot) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} style={{ height: 170, overflow: 'scroll', ...getListStyle(snapshot.isDraggingOver), background: snapshot.isDraggingOver && '#ffcdcd' }}>
                        <Stack direction='column' spacing={1}>
                          {applicationsAbandoned.componentList}
                        </Stack>
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
                    <Typography variant="h6" sx={{ fontWeight: 600 }} color='#d72700'>Lost</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 400, color: '#a1a1a1' }}>{applicationsLost.componentList.length}</Typography>
                  </Stack>
                  <Typography variant="h6" sx={{ fontWeight: 400 }}>$ {applicationsLost.total}</Typography>
                  <Droppable droppableId='lost' key='lost' type="status">
                    {(provided, snapshot) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} style={{ height: 170, overflow: 'scroll', ...getListStyle(snapshot.isDraggingOver), background: snapshot.isDraggingOver && '#ffcdcd' }}>
                        <Stack direction='column' spacing={1}>
                          {applicationsLost.componentList}
                        </Stack>
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
    </div>
  );
}

LoanApplication.layout = "AdminLayout";

export default LoanApplication;
