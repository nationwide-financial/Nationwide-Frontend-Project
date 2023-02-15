import React, { use, useEffect } from "react";
import {Avatar,Box, Button, FormControlLabel, Grid,IconButton, InputAdornment,TablePagination, TextField, Typography} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import AvatarGroup from "@mui/material/AvatarGroup";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import { useState } from "react";
import Chip from "@mui/material/Chip";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useRouter } from "next/router";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Switch, { SwitchProps } from "@mui/material/Switch";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { TuneOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import TableFooter from "@mui/material/TableFooter";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import DatasetRoundedIcon from "@mui/icons-material/DatasetRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const label = { inputProps: { "aria-label": "Switch demo" } };
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Autocomplete from "@mui/material/Autocomplete";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { assign } from "lodash";
import { s3URL } from '../../utils/config'



import {_authMS,_getUser} from '../../services/authServices'
import {_addApplicationNote, _getApplicationNotesByApplicationId} from "../../services/applictionNotes.js";
import { _getAppHistoryByApplicationId } from "../../services/applicationHistory.js";
import { _addHistory } from "../../services/applicationHistory.js";
import {_getApplicationById, _applicationAddLabel, _changeApplicationStatus,_manageApplicationData } from "../../services/applicationService.js";
import { _fetchSingleContacts } from "../../services/contactServices.js";
import { _listLabel, _getSingleLabel } from "../../services/labelService.js";
import { _addTask, _fetchTaskByapplicationId} from "../../services/loanTaskServices.js";
import { _fetchWorkflowStatuses } from "../../services/loanWorkflowStatusServices.js";
import ApplicationTaskPopup from "../../components/ApplicationTaskPopup/index.js";
import { getCookie, removeCookie } from 'cookies-next';
import { _getAllPlatformUserByAdmin } from '../../services/authServices'

function TablePaginationActions(props) {
  const theme = useTheme();

  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


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

function ApplicationDate() {
  const [users, setUsers]=useState([]);
  const [applicationData, setApplicationData] = useState([]);
  const [contactData, setContactData] = useState({});
  const [cocontactData, setCocontactData] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [workFlowStatus, setWorkFlowStatus] = useState([]);
  const [applicationDataEditMode, setApplicationDataEditMode] = useState(false);

  const [teamMembers, setTeamMembers] = useState([]);
  const [assignUsers, setAssignUsers] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskPriventApplication, setTaskPriventApplication] = useState(false);
  const [taskEditable, setTaskEditable] = useState(false);

  const [appDtStandardIncome, setAppDtStandardIncome] = useState("");
  const [appDtJobTitle, setAppDtJobTitle] = useState("");
  const [appDtCompany, setAppDtCompany] = useState("");
  const [appDtEmployedSince, setAppDtEmployedSince] = useState("");
  const [appDtActiveMilitary, setAppDtActiveMilitary] = useState("");

  const [appDtCreditScore, setAppDtCreditScore] = useState("");
  const [appDtRecentCreditInquiries, setAppDtRecentCreditInquiries] =
    useState("");
  const [appDtNumberOfOpenAccount, setAppDtNumberOfOpenAccount] = useState("");
  const [appDtTotalDebitOutstanding, setappDtTotalDebitOutstanding] =
    useState("");
  const [appDtNoneMortgageDebitOutsta, setAppDtNoneMortgageDebitOutsta] =
    useState("");

  const [appDtPropertyType, setAppDtPropertyType] = useState("");
  const [appDtEstimatedPropertyValue, setAppDtEstimatedPropertyValue] =
    useState("");

  const [pages, setPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [taskError, setTaskError] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPages(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPages(0);
  };

  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const [message, setMessage] = useState("");
  const handleSuccessMessage = () => {
    setOpenSuccessMessage(true);
  };

  const handleCloseSuccessMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage("");
    setOpenSuccessMessage(false);
  };

  const ITEM_HEIGHT = 48;
  const [anchorElLabelDropDown, setAnchorElLabelDropDown] =
    React.useState(null);
  const openLabelDropDown = Boolean(anchorElLabelDropDown);
  const handleClickLabelDropDown = (event) => {
    setAnchorElLabelDropDown(event.currentTarget);
  };
  const handleCloseLabelDropDown = () => {
    setAnchorElLabelDropDown(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openbtn = Boolean(anchorEl);
  const handlebtnClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlebtnClose = () => {
    setAnchorEl(null);
  };

  const [value, setValue] = React.useState(0);
  const [showAll, setShowAll] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEditDetails = async () => {
    // setShowContent(true)
    // setShowContent(!showContent);
    const res = await _authMS();
    // const res: { url: string } = await ky.get('/api/auth/twitter/generate-auth-link').json()
    window.location.href = res?.data?.url
  };

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setNote("");
    setOpen(false);
  };

  const [openTask, setOpenTask] = useState(false);
  const handleClickOpenTask = () => {
    setOpenTask(true);
  };
  const handleCloseTask = () => {
    setAssignUsers("");
    setTaskDescription("");
    setTaskDueDate("");
    setTaskPriventApplication(false);
    setTaskEditable(false);
    setOpenTask(false);
  };

  const handelApplicationEditRoute = () => {
    router.push(
      `/application/edit-application-form?applicationId=${applicationId}`
    );
  };
  const handleContinue = () => {
    // setOpen(false);
    router.push("/application/new-application");
  };


  function getTime(ts) {
    let date = new Date(ts);
    return date.toDateString();
  }

  const [applicationId, setApplicationId] = useState("");

  const [note, setNote] = useState("");
  const [formError, setformError] = useState("");
  const [emaildatarows, setEmaildatarows] = useState([]);

  const addApplicationNotes = async (id) => {
    try {
      if (!note || note == "" || note == null) {
        setformError("content can not be empty !");
      } else if (!id || id == "" || id == null) {
        alert("application id can not be empty !");
        setformError("application id can not be empty !");
      } else {
        setformError("");
        let body = {
          content: note,
          applicationId: id,
        };
        //console.log("resHistory Note Created",resHistory)
        const res = await _addApplicationNote(body);
        if (res?.status == 200) {
          let history = {
            action: "Note Created",
            description: `The Note for was created`,
            applicationId: id,
          };
          const resHistory = await _addHistory(history);
          //alert('successfuly added !');
          handleSuccessMessage();
          setMessage("successfuly added !");
          handleClose();
          getNotesByapplicationId(applicationId);
          getHistoryByapplicationId(applicationId);
        }
        //console.log(res)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [noteList, setNoteList] = useState([]);
  const [noteListRemoveCreatorDuplicates, setNoteListRemoveCreatorDuplicates] = useState([]);

  const getNotesByapplicationId = async (id) => {
    try {
      const seen = new Set();
      const res = await _getApplicationNotesByApplicationId(id);
      if (res?.status == 200) {
        setNoteList([...res?.data?.data?.Items]);
        const filteredArr = res?.data?.data?.Items?.filter(el => {
          const duplicate = seen.has(el.creator);
          seen.add(el.creator);
          return !duplicate;
        });
        setNoteListRemoveCreatorDuplicates([...filteredArr])
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [historyList, setHistoryList] = useState([]);
  const [historyListRemoveCreatorDuplicates, setHistoryListRemoveCreatorDuplicates] = useState([]);
  const getHistoryByapplicationId = async (id) => {
    try {
      const seen = new Set();
      const res = await _getAppHistoryByApplicationId(id);
      console.log("_getAppHistoryByApplicationId",res)
      if (res?.status == 200) {
        setHistoryList([...res?.data?.data?.Items]);

        const filteredArr = res?.data?.data?.Items?.filter(el => {
          const duplicate = seen.has(el?.changedby);
          seen.add(el?.changedby);
          return !duplicate;
        });
        console.log("filteredArr408",filteredArr)
        setHistoryListRemoveCreatorDuplicates([...filteredArr])
      }
    } catch (err) {
      console.log(err);
    }
  };
  async function getApplicationData() {
    try {
      const res = await _getApplicationById(applicationId);
      console.log("getApplicationData", res);
      setApplicationData(res?.data?.data?.Items[0]);
      let appDt = res?.data?.data?.Items[0]?.applicationData;
      setAppDtStandardIncome(appDt?.financialDetails?.standardIncome);
      setAppDtJobTitle(appDt?.financialDetails?.jobTitle);
      setAppDtCompany(appDt?.financialDetails?.company);
      setAppDtEmployedSince(appDt?.financialDetails?.employedSince);
      setAppDtActiveMilitary(appDt?.financialDetails?.activeMilitary);
      setAppDtCreditScore(appDt?.creditReportSummary?.creditScore || "");
      setAppDtRecentCreditInquiries(
        appDt?.creditReportSummary?.recentCreditInquiries
      );
      setAppDtNumberOfOpenAccount(
        appDt?.creditReportSummary?.numberOfOpenAccount
      );
      setappDtTotalDebitOutstanding(
        appDt?.creditReportSummary?.totalDebitOutstanding
      );
      setAppDtNoneMortgageDebitOutsta(
        appDt?.creditReportSummary?.noneMortgageDebitOutsta
      );
      setAppDtPropertyType(appDt?.propertyInformation?.propertyType);
      setAppDtEstimatedPropertyValue(
        appDt?.propertyInformation?.estimatedPropertyValue
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function getAllData(id) {
    try {
      const res = await _getApplicationById(id);
      setApplicationData(res?.data?.data?.Items[0]);
      setTeamMembers(res?.data?.data?.Items[0]?.members);

      let appDt = res?.data?.data?.Items[0]?.applicationData;
      setAppDtStandardIncome(appDt?.financialDetails?.standardIncome);
      setAppDtJobTitle(appDt?.financialDetails?.jobTitle);
      setAppDtCompany(appDt?.financialDetails?.company);
      setAppDtEmployedSince(appDt?.financialDetails?.employedSince);
      setAppDtActiveMilitary(appDt?.financialDetails?.activeMilitary);
      setAppDtCreditScore(appDt?.creditReportSummary?.creditScore);
      setAppDtRecentCreditInquiries(
        appDt?.creditReportSummary?.recentCreditInquiries
      );
      setAppDtNumberOfOpenAccount(
        appDt?.creditReportSummary?.numberOfOpenAccount
      );
      setappDtTotalDebitOutstanding(
        appDt?.creditReportSummary?.totalDebitOutstanding
      );
      setAppDtNoneMortgageDebitOutsta(
        appDt?.creditReportSummary?.noneMortgageDebitOutsta
      );
      setAppDtPropertyType(appDt?.propertyInformation?.propertyType);
      setAppDtEstimatedPropertyValue(
        appDt?.propertyInformation?.estimatedPropertyValue
      );

      const resContact = await _fetchSingleContacts(
        res?.data?.data?.Items[0].contactId[0]
      );
      setContactData(resContact?.data?.Item);
      let coContactTemp = [];
      for (let i = 0; i < res?.data?.data?.Items[0].coContact.length; i++) {
        const resCoContact = await _fetchSingleContacts(
          res?.data?.data?.Items[0].coContact[i]
        );
        await coContactTemp.push(resCoContact?.data?.Item);
      }
      console.log("coContactTemp*****", coContactTemp);
      setCocontactData([...coContactTemp]);
      let labelIds = res?.data?.data?.Items[0].appLabel;
      let labels = [];
      for (let i = 0; i < labelIds.length; i++) {
        const res = await _getSingleLabel(labelIds[i]);
        await labels.push(res.data.data.Items[0]);
      }
      setExistLabels([...labels]);
    } catch (err) {
      console.log(err);
    }
  }

  const newShade = (hexColor, magnitude) => {
    hexColor = hexColor?.replace(`#`, ``);
    if (hexColor?.length === 6) {
      const decimalColor = parseInt(hexColor, 16);
      let r = (decimalColor >> 16) + magnitude;
      r > 255 && (r = 255);
      r < 0 && (r = 0);
      let g = (decimalColor & 0x0000ff) + magnitude;
      g > 255 && (g = 255);
      g < 0 && (g = 0);
      let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
      b > 255 && (b = 255);
      b < 0 && (b = 0);
      return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
    } else {
      return hexColor;
    }
  };

  const [labelList, setLabelList] = useState([]);
  const [existLabels, setExistLabels] = useState([]);

  async function getLabels() {
    try {
      const res = await _listLabel();
      setLabelList([...res?.data?.data?.Items]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handelAddLabel(id) {
    try {
      console.log(applicationData.appLabel);
      let labels = [...applicationData.appLabel, id];
      let body = {
        appLabel: labels,
      };
      const res = await _applicationAddLabel(applicationId, body);
      getAllData(applicationId);
      handleCloseLabelDropDown();
      getLabels();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function handelDeleteLabel(id) {
    try {
      console.log(id);
      console.log(existLabels);
      let updatedLablesIdArray = [];
      let toUpdateAppLable = existLabels.filter((label) => label.PK != id);
      for (let i = 0; i < toUpdateAppLable.length; i++) {
        updatedLablesIdArray.push(toUpdateAppLable[i]?.PK);
      }
      let body = {
        appLabel: updatedLablesIdArray,
      };
      console.log(toUpdateAppLable);
      const res = await _applicationAddLabel(applicationId, body);
      console.log("handelDeleteLabel", res);
      if (res?.status == 200) {
        setExistLabels([...toUpdateAppLable]);
        getAllData(applicationId);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const handelSetAssignUser = (value) => {
    setAssignUsers(value);
  };
  const [addTaskError, setAddTaskError] = useState("");
  async function handelAddTask() {
    try {
      let body = {
        description: taskDescription,
        assignTo: assignUsers,
        dueDate: taskDueDate,
        prevert: taskPriventApplication,
        editable: taskEditable,
        status: "Not Done",
        documents: [],
        comments: [],
        applicationId: applicationId,
      };
      if (
        !taskDescription ||
        taskDescription == "" ||
        taskDescription == null
      ) {
        setAddTaskError("description can not be empty!");
      } else if (!assignUsers || assignUsers == "" || assignUsers == null) {
        setAddTaskError("Select a team member!");
      } else if (!taskDueDate || taskDueDate == "" || taskDueDate == null) {
        setAddTaskError("Due date can not be empty!!");
      } else {
        setAddTaskError("");
        const res = await _addTask(body);
        if (res?.status == 200) {
          let history = {
            action: "Task Created",
            description: `The Task created`,
            applicationId: applicationId,
          };
          const resHistory = await _addHistory(history);
          //alert("Task Created Successfuly")
          handleSuccessMessage();
          setMessage("Task Created Successfuly");
          handleCloseTask();
          getTaskByApplicationId(applicationId);
          getHistoryByapplicationId(applicationId);
        }
        console.log("_addTask****", res);rows
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getLoginUser = async () => {
    try{
      const res = await _getUser()
      return res?.data
    }catch(err){
      console.log(err)
    }
  }

  async function getTaskByApplicationId(id) {
    try {
      let loginUser = await getLoginUser();
      let users = await getUsers();
      const res = await _fetchTaskByapplicationId(id)
      let taskDataArray = [];
      await res?.data?.loanTasks?.Items?.map( async (task)=>{
        let object ={}
        let temp=[]
        object.task = task;
        await task?.assignTo?.map((member)=>{
          if (loginUser?.PK == `USER#${member}`){
            temp.push(loginUser)
            temp.push(...users.filter((user)=>{ return user?.PK == `USER#${member}`}))
          }else{
            temp.push(...users.filter((user)=>{ return user?.PK == `USER#${member}`}))
          }
          
        })
        object.teamArr = temp;
        taskDataArray.push(object)
      })
      
      setTaskList([...taskDataArray]);
    } catch (err) {
      console.log(err)
    }
  }

  async function getWorkflowStatuses() {
    try {
      const res = await _fetchWorkflowStatuses();
      setWorkFlowStatus([...res?.data?.loanStatuses?.Items]);
      console.log("_fetchWorkflowStatuses****", res?.data?.loanStatuses?.Items);
    } catch (err) {
      console.log(err);
    }
  }
  async function handelUpdateApplicationState(id, applicationState) {
    try {
      let body = {
        status_: applicationState,
      };
      const res = await _changeApplicationStatus(id, body);

      //alert("Application Status Updated successfuly")
      handleSuccessMessage();
      setMessage("Application Status Updated successfuly");
      console.log("_changeApplicationStatus", res);
      getApplicationData();
    } catch (err) {
      console.log(err);
    }
  }

  async function handelApplicationDataSubmit(id) {
    try {
      let body = {
        applicationData: {
          financialDetails: {
            standardIncome: appDtStandardIncome,
            jobTitle: appDtJobTitle,
            company: appDtCompany,
            employedSince: appDtEmployedSince,
            activeMilitary: appDtActiveMilitary,
          },
          creditReportSummary: {
            creditScore: appDtCreditScore,
            recentCreditInquiries: appDtRecentCreditInquiries,
            numberOfOpenAccount: appDtNumberOfOpenAccount,
            totalDebitOutstanding: appDtTotalDebitOutstanding,
            noneMortgageDebitOutsta: appDtNoneMortgageDebitOutsta,
          },
          propertyInformation: {
            propertyType: appDtPropertyType,
            estimatedPropertyValue: appDtEstimatedPropertyValue,
          },
        },
      };
      console.log(body);
      const res = await _manageApplicationData(id, body);
      console.log("_manageApplicationData", res);
      if (res?.status == 200) {
        //alert("Application data Updated successfuly")
        handleSuccessMessage();
        setMessage("Application data Updated successfuly");
        getApplicationData();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleTaskCreate = async (taskData) => {
    const { description, assignedTo, dueDate, prevert, editable } = taskData;

    if (isNull(description) || isNull(dueDate) || isNull(applicationId)) {
      setTaskError("Mandatory fields are empty")
    } else {
      const body = {
        description: description,
        assignTo: assignedTo,
        dueDate: dueDate,
        prevert: prevert,
        editable: editable,
        applicationId: applicationId,
        status: 'Not Done'
      }

      const response = await _addTask(body);

      if (response?.status === 200) {
        // const newTask = response?.data?.loanTask
        // newTask && setTaskList([...taskList, newTask])
        getTaskByApplicationId(applicationId);
        let history = {
          action: "Task Created",
          description: `The Task created`,
          applicationId: applicationId,
        };
        const resHistory = await _addHistory(history);
        getHistoryByapplicationId(applicationId);
        handleCloseTask();
      } else {
        setTaskError(response?.response?.data?.message)
      }
    }
  }

  const isNull = (val) => {
    return (!val || val.length === 0) ? true : false;
  }

  const getUsers = async () =>{
    try{
      const res = await _getAllPlatformUserByAdmin();
      const loginUser = await _getUser();
      console.log("loginUser754",loginUser)
      setUsers([...res?.data?.users,loginUser?.data])
      console.log("getUsers*****",res?.data?.users)
      return res?.data?.users;
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    async function getData() {

      const accessToken =  getCookie('accessToken');
      console.log(accessToken, "accessToken")
    if (accessToken) {
      fetch('https://graph.microsoft.com/v1.0/me/messages', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      })
        .then(response => response.json())
        .then((res) => {
          console.log(res,  "sssss");
          console.log(res?.value, "dddd", res?.error?.code);
          setEmaildatarows(res?.value || []);
          setShowContent(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }

      if (!router.isReady) return;
      const query = router.query;
      let id = query.applicationId;
      setApplicationId(id);
      getAllData(id);
      getHistoryByapplicationId(id);
      getNotesByapplicationId(id);
      getTaskByApplicationId(id);
      getWorkflowStatuses();
      getLabels();
    }
    getData();
  }, [router.isReady, router.query]);

  return (
    <>
      <Snackbar
        open={openSuccessMessage}
        autoHideDuration={6000}
        onClose={handleCloseSuccessMessage}
      >
        <Alert
          onClose={handleCloseSuccessMessage}
          severity="success"
          sx={{ width: "100%" }}
          style={{ backgroundColor: "lightgreen" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Grid container>
        <Stack p={4}>
          <Grid container>
            <Grid item xs={12} md={8}>
              <Typography
                variant="h6"
                style={{ fontSize: 45, fontWeight: 700 }}
              >
                {contactData?.basicInformation?.firstName}{" "}
                {contactData?.basicInformation?.lastName}{" "}
                <span style={{ color: "#0B72F1" }}>
                  {" "}
                  {applicationData?.applicationBasicInfo?.loan_amount } {"$"}
                </span>
              </Typography>

              <Stack direction="row" spacing={1}>
                {existLabels &&
                  existLabels?.map((row, key) => {
                    return (
                      <Chip
                        key={key}
                        label={row?.label}
                        onClick={() => { }}
                        onDelete={() => {
                          handelDeleteLabel(row?.PK);
                        }}
                        style={{
                          color: `${row?.color}`,
                          backgroundColor: `${newShade(row?.color, 180)}`,
                          fontWeight: 700,
                          fontSize: 12,
                        }}
                        CloseOutlinedIcon={<CloseOutlinedIcon />}
                      />
                    );
                  })}
                <ControlPointIcon onClick={handleClickLabelDropDown} />
                <div>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorElLabelDropDown}
                    open={openLabelDropDown}
                    onClose={handleCloseLabelDropDown}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                      },
                    }}
                  >
                    {labelList.map((option, key) => {
                      let lightColor = newShade(option.color, 180);
                      return (
                        <MenuItem key={key}>
                          <Chip
                            label={`${option.label}`}
                            onClick={() => {
                              handelAddLabel(option.PK);
                            }}
                            style={{
                              color: `${option.color}`,
                              backgroundColor: `${lightColor}`,
                              fontWeight: 700,
                              fontSize: 12,
                            }}
                          />
                        </MenuItem>
                      );
                    })}
                  </Menu>
                </div>

                <Stack direction="row" spacing={1}>
                  <Avatar
                    alt="Remy Sharp"
                    src={`${s3URL}/${users?.filter((user)=>{ return user?.PK == applicationData?.updateBy})[0]?.imageId}`}
                    sx={{ width: 24, height: 24 }}
                  />{" "}
                  <span style={{ fontSize: 16, fontWeight: 500, marginTop: 2 }}>
                    {getTime(applicationData?.updateTime)}
                  </span>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  sx={{ padding: "10px 40px", fontSize: 16, fontWeight: 700 }}
                  size="small"
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handlebtnClick}
                  mr={2}
                  style={{ textTransform: "capitalize" }}
                >
                  Change Status
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openbtn}
                  onClose={handlebtnClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {workFlowStatus.map((row, key) => {
                    console.log("929",row?.name === applicationData?.status_)
                    // console.log("applicationData?.status_",applicationData?.status_)
                    // console.log("row?.name",row?.name)
                    return (
                      <MenuItem
                        hover
                        key={key}
                        style={{ backgroundColor: row?.name == applicationData?.status_ && 'lightblue'}}
                        onClick={() => {
                          handelUpdateApplicationState(applicationId, row.name);
                          handlebtnClose();
                        }}
                      >
                        {row.name}
                      </MenuItem>
                    );
                  })}
                </Menu>

                {/* <IconButton
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "gray",
                    padding: 2,
                    paddingLeft:2,
                    marginRight: 2,
                  }}
                  style={{ marginLeft:5 }}
                  aria-label="save"
                >
                  <MoreVertIcon fontSize="large" sx={{ color: "gray" }} />

                </IconButton> */}
              </Box>
            </Grid>
          </Grid>
          {/* body */}

          <Box mt={4}>
            <Grid container backgroundColor={"white"}>
              <Grid item m={2}>
                <Grid xs={12} md={12} mt={4}>
                  <Stack direction="row" spacing={1} pl={2}>
                    <Typography variant="h5" className=" page_sub_header">
                      <span style={{ paddingRight: 5 }}>Final Review</span>
                      <span style={{ color: "#1478F1" }}>{ workFlowStatus?.map((status)=>{return status?.name == applicationData?.status_ }).indexOf(true)+1}/{workFlowStatus && workFlowStatus?.length}</span>
                    
                    </Typography>
                    <Link className="page_sub_outlineless_text_btn">
                      <Stack direction="row" spacing={1} mt={1}>
                        <NoteAltOutlinedIcon mt={4} />
                        <Typography
                          onClick={() => {
                            handelApplicationEditRoute();
                          }}
                        >
                          Edit Application Form
                        </Typography>
                      </Stack>
                    </Link>
                  </Stack>
                </Grid>

                <Grid container mt={3}>
                  {/* col-1 */}
                  <Grid item xs={4}>
                    <TableContainer style={{ backgroundColor: "transparent" }}>
                      <Typography fontWeight={700} pl={2}>
                        Application ID: #{applicationData?.PK?.split("_")[1]}
                      </Typography>

                      <Table aria-label="simple table">
                        <TableBody>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {"Application Date"}
                            </TableCell>
                            <TableCell align="left" p={1}>
                              {getTime(contactData?.createTime)}
                            </TableCell>
                          </TableRow>

                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {"Team Members"}
                            </TableCell>
                            {console.log("1032",applicationData)}
                            <TableCell align="left" p={1}>
                            <AvatarGroup max={4} total={applicationData?.members?.length}>
                              {applicationData?.members && applicationData?.members?.map((emailId,key)=>{
                              let user = users.filter((user)=>{return user?.PK == `USER#${emailId}`})[0]
                              return(
                                <Avatar key={key} alt={user?.PK.split("#")[1]} src={`${s3URL}/${user?.imageId}`} />
                              )
                              })}
                            </AvatarGroup>
                            </TableCell>
                          </TableRow>

                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            {/* <TableCell component="th" scope="row">
                              {"Intermediary"}
                            </TableCell>
                            <TableCell align="left" p={1}>
                              {""}
                            </TableCell> */}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  {/* col-2 */}

                  <Grid item xs={4} px={2}>
                    <TableContainer style={{ backgroundColor: "transparent" }}>
                      <Typography fontWeight={700} pl={2}>
                        Borrower:{" "}
                        {contactData?.basicInformation?.firstName || ""}{" "}
                        {contactData?.basicInformation?.lastName || ""}
                      </Typography>

                      <Table aria-label="simple table">
                        <TableBody>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {"Email"}
                            </TableCell>
                            <TableCell align="left" p={1}>
                              {contactData?.basicInformation?.email || ""}
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {"Phone"}
                            </TableCell>
                            <TableCell align="left" p={1}>
                              {contactData?.basicInformation?.phone || ""}
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {"ID Number"}
                            </TableCell>
                            <TableCell align="left" p={1}>
                              {contactData?.basicInformation?.idNumber || ""}
                            </TableCell>
                          </TableRow>

                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {"Date OF birth"}
                            </TableCell>
                            <TableCell align="left" p={1}>
                              {contactData?.basicInformation?.dob || ""}
                            </TableCell>
                          </TableRow>

                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {"Address"}
                            </TableCell>
                            <TableCell align="left" p={1}>
                              {contactData?.basicInformation?.streetAddress ||
                                ""}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  {/* col=3 */}

                  {/* tbl2 */}
                  {cocontactData &&
                    cocontactData.map((row, key) => {
                      return (
                        <Grid key={key} item xs={4} px={2}>
                          <TableContainer
                            style={{ backgroundColor: "transparent" }}
                            key={key}
                          >
                            <Typography fontWeight={700} pl={2}>
                              Co-Borrower{key + 1} :{" "}
                              {row?.basicInformation?.firstName || ""}{" "}
                              {row?.basicInformation?.lastName || ""}
                            </Typography>
                            <Table aria-label="simple table">
                              <TableBody>
                                <TableRow
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    {"Email"}
                                  </TableCell>
                                  <TableCell align="left" p={1}>
                                    {row?.basicInformation?.email || ""}
                                  </TableCell>
                                </TableRow>
                                <TableRow
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    {"Phone"}
                                  </TableCell>
                                  <TableCell align="left" p={1}>
                                    {row?.basicInformation?.phone || ""}
                                  </TableCell>
                                </TableRow>
                                <TableRow
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    {"ID Number"}
                                  </TableCell>
                                  <TableCell align="left" p={1}>
                                    {row?.basicInformation?.idNumber || ""}
                                  </TableCell>
                                </TableRow>
                                <TableRow
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    {"Date Of Birth"}
                                  </TableCell>
                                  <TableCell align="left" p={1}>
                                    {row?.basicInformation?.dob || ""}
                                  </TableCell>
                                </TableRow>
                                <TableRow
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    {"Address"}
                                  </TableCell>
                                  <TableCell align="left" p={1}>
                                    {row?.basicInformation?.streetAddress || ""}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      );
                    })}
                </Grid>
              </Grid>
            </Grid>

            <Grid>
              {/* <Box sx={{ width: '100%' }}> */}
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Application Data" {...a11yProps(0)} />
                  <Tab label="Tasks " {...a11yProps(1)} />
                  {/* <Tab label="Emails" {...a11yProps(2)} /> */}
                  <Tab label="Notes" {...a11yProps(2)} />
                  <Tab label="Application History" {...a11yProps(3)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Box id="edite-related-form">
                  <Grid
                    item
                    xs={12}
                    md={6}
                    my={2}
                    pl={2}
                    mt={4}
                    mb={4}
                    display="inline-flex"
                  >
                    <Stack direction="row" spacing={1}>
                      <Typography variant="h5" className=" page_sub_header">
                        <span style={{ paddingRight: 5 }}>
                          {" "}
                          Application Data
                        </span>
                      </Typography>
                      <Link
                        className="page_sub_outlineless_text_btn"
                        onClick={() => {
                          setApplicationDataEditMode(
                            (applicationDataEditMode) =>
                              !applicationDataEditMode
                          );
                        }}
                      >
                        <Stack direction="row" spacing={1} mt={1}>
                          <NoteAltOutlinedIcon mt={4} />
                          <Typography>
                            {!applicationDataEditMode ? (
                              "Edit Application Form"
                            ) : (
                              <Button
                                variant="contained"
                                sx={{ padding: "10px 40px" }}
                                onClick={() => {
                                  handelApplicationDataSubmit(applicationId);
                                }}
                              >
                                Save Data
                              </Button>
                            )}{" "}
                          </Typography>
                        </Stack>
                      </Link>
                    </Stack>
                  </Grid>
                  <Grid container>
                    {/* col-1 */}
                    <Grid item xs={4}>
                      <TableContainer
                        style={{ backgroundColor: "transparent" }}
                      >
                        <Typography fontWeight={700} pl={2}>
                          Financial Details
                        </Typography>

                        <Table aria-label="simple table">
                          <TableBody>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {"Stated Income"}
                              </TableCell>
                              <TableCell align="left">
                                {!applicationDataEditMode ? (
                                  `${appDtStandardIncome
                                    ? appDtStandardIncome
                                    : ""
                                  }`
                                ) : (
                                  <TextField
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    id="outlined-basic"
                                    variant="outlined"
                                    placeholder="Text"
                                    style={{ margin: 0 }}
                                    value={appDtStandardIncome}
                                    onChange={(e) => {
                                      setAppDtStandardIncome(e.target.value);
                                    }}
                                  />
                                )}
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {"Job Title	"}
                              </TableCell>
                              <TableCell align="left">
                                {!applicationDataEditMode ? (
                                  `${appDtJobTitle ? appDtJobTitle : ""}`
                                ) : (
                                  <TextField
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    id="outlined-basic"
                                    variant="outlined"
                                    placeholder="Text"
                                    style={{ margin: 0 }}
                                    value={appDtJobTitle}
                                    onChange={(e) => {
                                      setAppDtJobTitle(e.target.value);
                                    }}
                                  />
                                )}
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {"Company"}
                              </TableCell>
                              <TableCell align="left">
                                {!applicationDataEditMode ? (
                                  `${appDtCompany ? appDtCompany : ""}`
                                ) : (
                                  <TextField
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    id="outlined-basic"
                                    variant="outlined"
                                    placeholder="Text"
                                    style={{ margin: 0 }}
                                    value={appDtCompany}
                                    onChange={(e) => {
                                      setAppDtCompany(e.target.value);
                                    }}
                                  />
                                )}
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {"Employed since"}
                              </TableCell>
                              <TableCell align="left">
                                {!applicationDataEditMode ? (
                                  `${appDtEmployedSince ? appDtEmployedSince : ""
                                  }`
                                ) : (
                                  <TextField
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    id="outlined-basic"
                                    variant="outlined"
                                    placeholder="Text"
                                    style={{ margin: 0 }}
                                    value={appDtEmployedSince}
                                    onChange={(e) => {
                                      setAppDtEmployedSince(e.target.value);
                                    }}
                                  />
                                )}
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {"Active Military?"}
                              </TableCell>
                              <TableCell align="left">
                                {!applicationDataEditMode ? (
                                  `${appDtActiveMilitary
                                    ? appDtActiveMilitary
                                    : ""
                                  }`
                                ) : (
                                  <TextField
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    id="outlined-basic"
                                    variant="outlined"
                                    placeholder="Text"
                                    style={{ margin: 0 }}
                                    value={appDtActiveMilitary}
                                    onChange={(e) => {
                                      setAppDtActiveMilitary(e.target.value);
                                    }}
                                  />
                                )}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>

                    {/* col-2 */}

                    <Grid item xs={4} px={1}>
                      <TableContainer
                        style={{ backgroundColor: "transparent" }}
                      >
                        <Typography fontWeight={700} pl={2}>
                          Credit Report Summary
                        </Typography>

                        <Table aria-label="simple table">
                          <TableBody>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {"Credit Score"}
                              </TableCell>

                              <TableCell align="left">
                                {!applicationDataEditMode ? (
                                  `${appDtCreditScore ? appDtCreditScore : ""}`
                                ) : (
                                  <TextField
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    id="outlined-basic"
                                    variant="outlined"
                                    placeholder="Text"
                                    style={{ margin: 0 }}
                                    value={appDtCreditScore}
                                    onChange={(e) => {
                                      setAppDtCreditScore(e.target.value);
                                    }}
                                  />
                                )}
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {"Recent Credit Inquiries"}
                              </TableCell>

                              <TableCell align="left">
                                {!applicationDataEditMode ? (
                                  `${appDtRecentCreditInquiries
                                    ? appDtRecentCreditInquiries
                                    : ""
                                  }`
                                ) : (
                                  <TextField
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    id="outlined-basic"
                                    variant="outlined"
                                    placeholder="Text"
                                    style={{ margin: 0 }}
                                    value={appDtRecentCreditInquiries}
                                    onChange={(e) => {
                                      setAppDtRecentCreditInquiries(
                                        e.target.value
                                      );
                                    }}
                                  />
                                )}
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {"Number of Open Accountsr"}
                              </TableCell>

                              <TableCell align="left">
                                {!applicationDataEditMode ? (
                                  `${appDtNumberOfOpenAccount
                                    ? appDtNumberOfOpenAccount
                                    : ""
                                  }`
                                ) : (
                                  <TextField
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    id="outlined-basic"
                                    variant="outlined"
                                    placeholder="Text"
                                    style={{ margin: 0 }}
                                    value={appDtNumberOfOpenAccount}
                                    onChange={(e) => {
                                      setAppDtNumberOfOpenAccount(
                                        e.target.value
                                      );
                                    }}
                                  />
                                )}
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {"Total Debt Outstanding"}
                              </TableCell>

                              <TableCell align="left">
                                {!applicationDataEditMode ? (
                                  `${appDtTotalDebitOutstanding
                                    ? appDtTotalDebitOutstanding
                                    : ""
                                  }`
                                ) : (
                                  <TextField
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    id="outlined-basic"
                                    variant="outlined"
                                    placeholder="Text"
                                    value={appDtTotalDebitOutstanding}
                                    onChange={(e) => {
                                      setappDtTotalDebitOutstanding(
                                        e.target.value
                                      );
                                    }}
                                  />
                                )}
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {"None Mortgage Debt Outsta"}
                              </TableCell>

                              <TableCell align="left">
                                {!applicationDataEditMode ? (
                                  `${appDtNoneMortgageDebitOutsta
                                    ? appDtNoneMortgageDebitOutsta
                                    : ""
                                  }`
                                ) : (
                                  <TextField
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    id="outlined-basic"
                                    variant="outlined"
                                    placeholder="Text"
                                    style={{ margin: 0 }}
                                    value={appDtNoneMortgageDebitOutsta}
                                    onChange={(e) => {
                                      setAppDtNoneMortgageDebitOutsta(
                                        e.target.value
                                      );
                                    }}
                                  />
                                )}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>

                    {/* col=3 */}
                    <Grid item xs={4} px={1}>
                      {/* tbl2 */}
                      <TableContainer
                        style={{ backgroundColor: "transparent" }}
                      >
                        <Typography fontWeight={700} pl={2}>
                          Property Information
                        </Typography>

                        <Table aria-label="simple table">
                          <TableBody>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                sx={{ width: 20 }}
                              >
                                {"Property Type"}
                              </TableCell>
                              <TableCell align="left">
                                {!applicationDataEditMode ? (
                                  `${appDtPropertyType ? appDtPropertyType : ""
                                  }`
                                ) : (
                                  <TextField
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    id="outlined-basic"
                                    variant="outlined"
                                    placeholder="Text"
                                    style={{ margin: 0 }}
                                    value={appDtPropertyType}
                                    onChange={(e) => {
                                      setAppDtPropertyType(e.target.value);
                                    }}
                                  />
                                )}
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                sx={{ width: 20 }}
                              >
                                {"Estimated Property Value"}
                              </TableCell>
                              <TableCell align="left">
                                {!applicationDataEditMode ? (
                                  `${appDtEstimatedPropertyValue
                                    ? appDtEstimatedPropertyValue
                                    : ""
                                  }`
                                ) : (
                                  <TextField
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    id="outlined-basic"
                                    variant="outlined"
                                    placeholder="Text"
                                    style={{ margin: 0 }}
                                    value={appDtEstimatedPropertyValue}
                                    onChange={(e) => {
                                      setAppDtEstimatedPropertyValue(
                                        e.target.value
                                      );
                                    }}
                                  />
                                )}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1}>
                {/* 1st-header-section */}
                <ApplicationTaskPopup users={users} open={openTask} error={taskError} onClose={handleCloseTask} onClickCreate={(taskData) => handleTaskCreate(taskData)} applicationData={applicationData} team={teamMembers} applicationId={applicationData?.PK} />
                <Grid container p={0} mb={2}>
                  <Grid item xs={12} md={6}>
                    <Typography style={{ fontSize: 21, fontWeight: 700 }}>
                      Tasks
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: "right" }}>
                      <Button
                        variant="contained"
                        sx={{ padding: "10px 40px" }}
                        onClick={handleClickOpenTask}
                      >
                        Create Task
                      </Button>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container p={0} mt={2}>
                  <Grid item xs={6}>
                    <Grid container>
                      <Stack direction="row">
                        {/* header-search-section */}

                        <Grid container spacing={1} alignItems="flex-end">
                          <Grid item>
                            <SearchOutlinedIcon fontSize="medium" />
                          </Grid>
                          <TextField
                            id="input-with-icon-textfield"
                            label="Search"
                            variant="standard"
                          />
                        </Grid>

                        {/* active-user-display-section */}
                        <AvatarGroup max={4} total={applicationData?.members?.length}>
                          {applicationData?.members && applicationData?.members?.map((emailId,key)=>{
                            let user = users.filter((user)=>{return user?.PK == `USER#${emailId}`})[0]
                            return(
                             <Avatar key={key} alt={user?.PK.split("#")[1]} src={`${s3URL}/${user?.imageId}`} />
                            )
                          })}
                      </AvatarGroup>                 
                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    {/* other-icon-set */}
                    <Box sx={{ textAlign: "right" }}>
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
                    </Box>
                    {/* </Grid> */}
                  </Grid>
                </Grid>

                {/* table-related-section----- */}
                <Grid container>
                  <TableContainer>
                    <Table
                      sx={{ minWidth: 500 }}
                      aria-label="custom pagination table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">STATUS</TableCell>
                          <TableCell align="left">ASSIGNED TO</TableCell>
                          <TableCell align="left">DESCRIPTION</TableCell>
                          <TableCell align="left">BLOCKED STATUSES</TableCell>
                          <TableCell align="left">DUE DATE</TableCell>
                          <TableCell align="left">UPDATED</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {console.log("row?.task?.updatedBy",taskList)}
                        {taskList
                          .slice(
                            pages * rowsPerPage,
                            pages * rowsPerPage + rowsPerPage
                          )
                          .map((row, key) => (
                            <TableRow key={key}>
                              <TableCell component="th" scope="row">
                                <span
                                  className="verified_label"
                                  style={{
                                    color:
                                      row?.task?.status.toLowerCase() == "not done"
                                        ? "#FF0000"
                                        : row?.task?.status.toLowerCase() == "done"
                                          ? "#00FF00"
                                          : "#0000FF",
                                    backgroundColor:
                                      row?.task?.status.toLowerCase() == "not done"
                                        ? `${newShade("#FF0000", 180)}`
                                        : row?.task?.status.toLowerCase() == "done"
                                          ? `${newShade("#00FF00", 180)}`
                                          : `${newShade("#0000FF", 180)}`,
                                  }}
                                >
                                  {row?.task?.status || ""}
                                </span>
                              </TableCell>
                              <TableCell align="left">
                                {/* {row?.assignTo || ""} */}
                                {row?.task?.assignTo?.length > 1 ? <AvatarGroup total={row?.task?.assignTo?.length}>
                                {row?.teamArr?.map((member, key)=>{
                                  return <Avatar key={key} alt={member?.PK.split("#")[1]} src={`${s3URL}/${member?.imageId}`} 
                                />
                                })}
                               
                              </AvatarGroup> :row?.task?.assignTo || "" }
                              </TableCell>
                              <TableCell align="left">
                                {row?.task?.description || ""}
                              </TableCell>
                              <TableCell align="left">
                                {"BLOCKED STATUSES"}
                              </TableCell>
                              <TableCell align="left">{row?.task?.dueDate}</TableCell>
                              <TableCell align="left">
                                <Stack direction="row" spacing={2}>
                                <Avatar alt={row?.task?.updatedBy?.split("#")[1]} src={`${s3URL}/${users?.filter((user)=>{ return user?.PK == row?.task?.updatedBy})[0]?.imageId}`} />
                                  <span> {getTime(row?.task?.createTime)}</span>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[
                              5,
                              10,
                              25,
                              100,
                              { label: "All", value: -1 },
                            ]}
                            style={{ align: "left" }}
                            component="div"
                            count={taskList.length}
                            rowsPerPage={rowsPerPage}
                            page={pages}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                </Grid>
              </TabPanel>
              {/* <TabPanel value={value} index={2}>
                
                {showContent ? (
                  <Box>
                    <Grid container>
                     
                        <Grid container p={0} mb={2}>
                          <Grid item xs={12} md={6}>
                            <Typography
                              style={{ fontSize: 21, fontWeight: 700 }}
                            >
                              Email
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Button
                              variant="contained"
                              sx={{ padding: "10px 40px", marginLeft: "5px" }}
                              onClick={()=> window.location = 'mailto:'}
                              >
                              Send Email
                            </Button>
                          </Grid>
                        
                        <Grid
                          container
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Stack direction="row">
                            

                            <Grid container spacing={1} alignItems="flex-end">
                              <Grid item>
                                <SearchOutlinedIcon fontSize="medium" />
                              </Grid>
                              <TextField
                                id="input-with-icon-textfield"
                                label="Search"
                                variant="standard"
                              />
                            </Grid>
                          </Stack>
                          
                        </Grid>
                      </Grid>
                      <Grid container>
                       
                        <Grid item xs={12}>
                          <TableContainer
                            style={{ backgroundColor: "transparent" }}
                          >
                            <Table aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  <TableCell align="left">Date</TableCell>
                                  <TableCell align="left">From</TableCell>
                                  <TableCell align="left">To</TableCell>
                                  <TableCell align="left">Subject</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {emaildatarows?.map((row, i) => (
                                  <TableRow
                                    key={i}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell component="th" scope="row">
                                      {row.createdDateTime}
                                    </TableCell>
                                    <TableCell align="left">
                                    {row.sender.emailAddress.address}
                                    </TableCell>
                                    <TableCell align="left">
                                      {row.toRecipients[0].emailAddress.address}
                                    </TableCell>

                                    <TableCell align="left">
                                      {row.subject}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>

          
                      </Grid>
                    </Grid>
                  </Box>
                ) : (
                  <Box>
                    <Grid container p={0} mb={2}>
                      <Grid item xs={12} md={6}>
                        <Typography style={{ fontSize: 21, fontWeight: 700 }}>
                          Emails
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Box sx={{ textAlign: "right" }}>
                          <Button
                            variant="outlined"
                            sx={{ padding: "10px 40px" }}
                            onClick={handleEditDetails}
                          >
                            Connect Email
                          </Button>
                          <Button
                            variant="contained"
                            sx={{ padding: "10px 40px", marginLeft: "5px" }}
                            onClick={handleClickOpen}
                          >
                            Send Email
                          </Button>

                          

                          <Dialog
                            open={open}
                            onClose={handleClose}
                            fullWidth
                            m={4}
                          >
                            <Box sx={{ width: 1000, maxWidth: "100%" }}>
                              <BootstrapDialogTitle
                                id="customized-dialog-title"
                                onClose={handleClose}
                              >
                                <Typography
                                  variant="h6"
                                  style={{
                                    fontSize: 21,
                                    fontWeight: 700,
                                    fontStyle: "normal",
                                  }}
                                >
                                  Create Task
                                </Typography>
                              </BootstrapDialogTitle>

                              <DialogContent>
                                <FormControl
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  
                                  <FormControl
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <label>
                                      {" "}
                                      <Typography
                                        align="left"
                                        variant="h6"
                                        style={{
                                          fontSize: 17,
                                          fontWeight: 700,
                                          fontStyle: "normal",
                                        }}
                                      >
                                        Description{" "}
                                        <span style={{ color: "#FF0000" }}>
                                          *
                                        </span>
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

                                  
                                  <FormControl
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <label>
                                      {" "}
                                      <Typography
                                        align="left"
                                        variant="h6"
                                        style={{
                                          fontSize: 17,
                                          fontWeight: 700,
                                          fontStyle: "normal",
                                        }}
                                      >
                                        Assign To{" "}
                                        <span style={{ color: "#FF0000" }}>
                                          *
                                        </span>
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
                                 
                                  <FormControl
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <label>
                                      {" "}
                                      <Typography
                                        align="left"
                                        variant="h6"
                                        style={{
                                          fontSize: 17,
                                          fontWeight: 700,
                                          fontStyle: "normal",
                                        }}
                                      >
                                        Due Date{" "}
                                        <span style={{ color: "#FF0000" }}>
                                          *
                                        </span>
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

                                  <Stack direction="row" spacing={1}>
                                    <Box sx={{ maxWidth: "100%" }}>
                                      <FormGroup>
                                        <Switch {...label} disabled />
                                      </FormGroup>
                                    </Box>
                                    <label>
                                      {" "}
                                      <Typography
                                        pt={1}
                                        variant="h6"
                                        style={{
                                          fontSize: 15,
                                          fontWeight: 500,
                                          color: "gray",
                                        }}
                                      >
                                        Prevent applications from entering
                                        status(es) if task is not done
                                      </Typography>
                                    </label>
                                  </Stack>
                                  <Stack direction="row" spacing={1}>
                                    <FormGroup>
                                      <Switch {...label} disabled />
                                    </FormGroup>
                                    <label>
                                      {" "}
                                      <Typography
                                        pt={1}
                                        variant="h6"
                                        style={{
                                          fontSize: 15,
                                          fontWeight: 500,
                                          color: "gray",
                                        }}
                                      >
                                        Include editable application data within
                                        the task
                                      </Typography>
                                    </label>
                                  </Stack>
                                </FormControl>
                              </DialogContent>
                              <div style={{ marginBottom: 100 }}>
                                <DialogActions
                                  style={{
                                    display: "flex",
                                    justifyContent: "left",
                                  }}
                                >
                                  <Button
                                    variant="contained"
                                    onClick={handleContinue}
                                  >
                                    Create Task
                                  </Button>
                                </DialogActions>
                              </div>
                            </Box>
                          </Dialog>
                          
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid xs={8}>
                        <Typography>
                          To connect emails to the DigiFi Loan Origination
                          System, please CC or BCC the following email address
                          on your outbound emails:
                        </Typography>

                        <Typography mt={1}>
                          0-fw19519jeweweeruidfkjdfh@mail.digifyllc
                        </Typography>
                      </Grid>

                      <Grid xs={4}></Grid>
                    </Grid>{" "}
                  </Box>
                )}
              </TabPanel> */}
              {/* Note-related-tab */}
              <TabPanel value={value} index={2}>
                {/* 1st-header-section */}
                <Grid container p={0} mb={2}>
                  <Grid item xs={12} md={6}>
                    <Typography style={{ fontSize: 21, fontWeight: 700 }}>
                      Notes
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: "right" }}>
                      <Button
                        variant="contained"
                        sx={{ padding: "10px 40px" }}
                        onClick={handleClickOpen}
                      >
                        Add Note
                      </Button>

                      {/* dialog -start--- */}

                      <Dialog open={open} onClose={handleClose} fullWidth m={4}>
                        <Box sx={{ width: 1000, maxWidth: "100%" }}>
                          <BootstrapDialogTitle
                            id="customized-dialog-title"
                            onClose={handleClose}
                          >
                            <Typography
                              variant="h6"
                              style={{
                                fontSize: 21,
                                fontWeight: 700,
                                fontStyle: "normal",
                              }}
                            >
                              Add Note
                            </Typography>
                          </BootstrapDialogTitle>

                          <DialogContent>
                            <FormControl
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {/* -------- */}

                              {/* Description related field */}
                              <FormControl
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <label>
                                  {" "}
                                  <Typography
                                    align="left"
                                    variant="h6"
                                    style={{
                                      fontSize: 17,
                                      fontWeight: 700,
                                      fontStyle: "normal",
                                    }}
                                  >
                                    Content{" "}
                                    <span style={{ color: "#FF0000" }}>*</span>
                                  </Typography>
                                </label>
                                <Box sx={{ maxWidth: "100%" }}>
                                  <TextareaAutosize
                                    aria-label="empty textarea"
                                    style={{ width: 555, height: 200 }}
                                    id="outlined-basic"
                                    variant="outlined"
                                    value={note}
                                    onChange={(e) => {
                                      setNote(e.target.value);
                                    }}
                                  />
                                </Box>
                              </FormControl>
                              <p style={{ color: "red" }}>{formError}</p>
                            </FormControl>
                          </DialogContent>
                          <div
                            style={{ marginBottom: 100, marginLeft: "16px" }}
                          >
                            <DialogActions
                              style={{
                                display: "flex",
                                justifyContent: "left",
                              }}
                            >
                              <Button
                                variant="contained"
                                onClick={() =>
                                  addApplicationNotes(applicationId)
                                }
                              >
                                Add Note
                              </Button>
                            </DialogActions>
                          </div>
                        </Box>
                      </Dialog>
                      {/* dialog- end----- */}
                    </Box>
                  </Grid>
                </Grid>

                <Grid container p={0} mt={2}>
                  <Grid item xs={6}>
                    <Grid container>
                      <Stack direction="row">
                        {/* header-search-section */}

                        <Grid container spacing={1} alignItems="flex-end">
                          <Grid item>
                            <SearchOutlinedIcon fontSize="medium" />
                          </Grid>
                          <TextField
                            id="input-with-icon-textfield"
                            label="Search"
                            variant="standard"
                          />
                        </Grid>

                        {/* active-user-display-section */}

                        {/* <AvatarGroup total={9}>
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
                          <Avatar
                            alt="Trevor Henderson"
                            src="/static/images/avatar/5.jpg"
                          />
                        </AvatarGroup> */}
                          <AvatarGroup max={4} total={noteListRemoveCreatorDuplicates?.length}>
                            {noteListRemoveCreatorDuplicates && noteListRemoveCreatorDuplicates?.map((note,key)=>{
                              let user = users.filter((user)=>{return user?.PK == note?.creator})[0];
                                return(
                                <Avatar key={key} alt={user?.PK.split("#")[1]} src={`${s3URL}/${user?.imageId}`} />
                                )
                            })}
                          </AvatarGroup>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>

                {/* body-section-table-note related-- */}
                <Grid container>
                  <TableContainer>
                    <Table
                      sx={{ minWidth: 500 }}
                      aria-label="custom pagination table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">DATE</TableCell>
                          <TableCell align="left">CONTENT</TableCell>
                          <TableCell align="left">AUTHOR</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(rowsPerPage > 0
                          ? noteList.slice(
                            pages * rowsPerPage,
                            pages * rowsPerPage + rowsPerPage
                          )
                          : noteList
                        ).map((row, key) => (
                          <TableRow key={key}>
                            <TableCell component="th" scope="row">
                              <Typography>{getTime(row.createTime)}</Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography>{row.content} </Typography>
                            </TableCell>

                            <TableCell align="left">
                              <Stack direction="row" spacing={2}>
                              <Avatar alt={row?.creator?.split("#")[1]} src={`${s3URL}/${users?.filter((user)=>{ return user?.PK == row?.creator})[0]?.imageId}`} />
                                <span style={{ marginTop: 5 }}>
                                  {row.creator.split("#")[1]}
                                </span>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[
                              5,
                              10,
                              25,
                              { label: "All", value: -1 },
                            ]}
                            colSpan={3}
                            count={noteList.length}
                            rowsPerPage={rowsPerPage}
                            page={pages}
                            SelectProps={{
                              inputProps: {
                                "aria-label": "rows per page",
                              },
                              native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                </Grid>
              </TabPanel>
              {/* Application History -related-tab */}
              <TabPanel value={value} index={3}>
                {/* 1st-header-section */}
                <Grid container p={0} mb={2}>
                  <Grid item xs={12} md={6}>
                    <Typography style={{ fontSize: 21, fontWeight: 700 }}>
                      Application History
                    </Typography>
                  </Grid>
                </Grid>
                {/* 2nd-head-section */}
                <Grid container p={0} mt={2}>
                  <Grid item xs={6}>
                    <Grid container>
                      <Stack direction="row">
                        {/* header-search-section */}

                        <Grid container spacing={1} alignItems="flex-end">
                          <Grid item>
                            <SearchOutlinedIcon fontSize="medium" />
                          </Grid>
                          <TextField
                            id="input-with-icon-textfield"
                            label="Search"
                            variant="standard"
                          />
                        </Grid>

                        {/* active-user-display-section */}

                        {/* <AvatarGroup total={9}>
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
                          <Avatar
                            alt="Trevor Henderson"
                            src="/static/images/avatar/5.jpg"
                          />
                        </AvatarGroup> */}
                          <AvatarGroup max={4} total={historyListRemoveCreatorDuplicates?.length}>
                            {historyListRemoveCreatorDuplicates && historyListRemoveCreatorDuplicates?.map((history,key)=>{
                              let user = users.filter((user)=>{return user?.PK == history?.changedby})[0]
                              return(
                              <Avatar key={key} alt={user?.PK.split("#")[1]} src={`${s3URL}/${user?.imageId}`} />
                              )
                            })}
                        </AvatarGroup>
                        
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>

                {/* body-section */}
                {/* table-related-section----- */}
                <Grid container>
                  <TableContainer>
                    <Table
                      sx={{ minWidth: 500 }}
                      aria-label="custom pagination table"
                    >
                      <TableBody>
                        {(rowsPerPage > 0
                          ? historyList.slice(
                            pages * rowsPerPage,
                            pages * rowsPerPage + rowsPerPage
                          )
                          : historyList
                        ).map((row, key) => (
                          <TableRow key={key}>
                            <TableCell component="th" scope="row">
                              <Stack direction="row" spacing={1}>
                                <DatasetRoundedIcon
                                  fontSize="large"
                                  style={{
                                    borderRadius: 50,
                                    backgroundColor: "#1478F1",
                                    color: "#fff",
                                    marginTop: 5,
                                  }}
                                />{" "}
                                <Grid>
                                  <Typography
                                    align="left"
                                    style={{ fontSize: 16, fontWeight: 600 }}
                                  >
                                    {row.action}
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{ fontSize: 16, fontWeight: 400 }}
                                  >
                                    {row.description}
                                  </Typography>
                                </Grid>
                              </Stack>
                              ,{/* {row.action} */}
                            </TableCell>

                            <TableCell align="left">
                              <Stack direction="row" spacing={2}>
                              <Avatar alt={row?.changedby?.split("#")[1]} src={`${s3URL}/${users?.filter((user)=>{ return user?.PK == row?.changedby})[0]?.imageId}`} />
                                <span style={{ marginTop: 5 }}>
                                  {" "}
                                  {getTime(row.createTime)}
                                </span>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[
                              5,
                              10,
                              25,
                              { label: "All", value: -1 },
                            ]}
                            colSpan={3}
                            count={historyList.length}
                            rowsPerPage={rowsPerPage}
                            page={pages}
                            SelectProps={{
                              inputProps: {
                                "aria-label": "rows per page",
                              },
                              native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                </Grid>
              </TabPanel>
            </Grid>
          </Box>
        </Stack>
      </Grid>
    </>
  );
}

ApplicationDate.layout = "AdminLayout";

export default ApplicationDate;
