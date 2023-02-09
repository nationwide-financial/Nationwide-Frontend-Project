import React, { useEffect, useState } from "react";
import {
  Avatar,
  Grid,
  InputAdornment,
  TextField,
  AvatarGroup,
  CircularProgress,
  Box,
  Alert,
  Snackbar,
  TableHead,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TasksTable from "../../components/tasksTable";
import {
  _fetchAllTasks,
  _deleteTaskById,
} from "../../services/loanTaskServices";
import SearchBox from "../../components/searchBox/searchBox.js";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Typography, Button, Divider, Pagination, Stack } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/router";
import { _getAllPlatformUserByAdmin } from "../../services/authServices";
import { s3URL } from "../../utils/config";

import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { red } from "@mui/material/colors";
import { teal } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import CardContent from "@mui/material/CardContent";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";

import { Autocomplete, FormControl, Switch } from "@mui/material";
import { _addTask } from "../../services/loanTaskServices";
import { _getApplications } from "../../services/applicationService";
import { _addHistory } from "../../services/applicationHistory";
import { _getUser } from '../../services/authServices' 

// cutom-btn--

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

const ColorButtonEdit = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(teal[500]),
  backgroundColor: teal[500],
  "&:hover": {
    backgroundColor: teal[700],
  },
}));

const ColorButtonDelete = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[500],
  "&:hover": {
    backgroundColor: red[700],
  },
}));

//custom-btn---

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
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

function createData(
  status,
  assignTo,
  description,
  application,
  dueDate,
  updateTime
) {
  return { status, assignTo, description, application, dueDate, updateTime };
}

const rows = [createData("Cupcake", 305, 3.7)].sort((a, b) =>
  a.calories < b.calories ? -1 : 1
);

const Tasks = () => {
  const [pages, setPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const [assignUsers, setAssignUsers] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskPriventApplication, setTaskPriventApplication] = useState(false);
  const [taskEditable, setTaskEditable] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamMember, setTeamMember] = useState("");

  const [applicationData, setApplicationData] = useState([]);
  const [taskError, setTaskError] = useState(false);
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
  const router = useRouter();

  const [taskData, setTaskData] = useState([]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [applicationId, setApplicationId] = useState("");

  const [selectTask, setSelectTask] = useState({});
  const [openModify, setOpenModify] = useState(false);
  const handleOpenModify = () => setOpenModify(true);
  const handleCloseModify = () => {
    setOpenModify(false);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
   
  const [personName, setPersonName] = useState([]);
  const setInitialStateOfTeam = (ids) => {
    setPersonName([...ids]);
  };
  const handleChangeEditTeamMember = async (event) => {
    const {
      target: { value },
    } = event;
    let users = typeof value === "string" ? value.split(",") : value;
    setPersonName(users);
  };



  const isNull = (val) => {
    return !val || val.length === 0 ? true : false;
  };

  const handleTaskCreate = async (taskDt) => {
    const { description, assignedTo, dueDate, prevert, editable } = taskDt;

    if (isNull(description) || isNull(dueDate) || isNull(applicationId)) {
      setTaskError("Mandatory fields are empty");
    } else {
      const body = {
        description: description,
        assignTo: assignedTo,
        dueDate: dueDate,
        prevert: prevert,
        editable: editable,
        applicationId: applicationId,
        status: "Not Done",
      };

      const response = await _addTask(body);
      console.log("response", response);

      if (response?.status === 200) {
        // const newTask = response?.data?.loanTask;
        // if (newTask) {
        //   let tempTasks = [...taskData, newTask];
        //   let tableDt = await tempTasks.sort((a, b) =>
        //     a.createTime < b.createTime
        //       ? 1
        //       : b.createTime < a.createTime
        //       ? -1
        //       : 0
        //   );
        //   setTaskData([...tableDt]);
        // }
        fetchTasks();
        let history = {
          action: "Task Created",
          description: `The Task created`,
          applicationId: applicationId,
        };
        const resHistory = await _addHistory(history);
        if (resHistory?.status == 200 && response?.status == 200) {
          handleSuccessMessage();
          setMessage("you have successfuly edited!");
        }
        setTaskDescription("");
        setApplicationId("");
        setTeamMember("");
        setTaskDueDate("");
        setTaskPriventApplication(false);
        setTaskEditable(false);
        handleCloseTask();
      } else {
        setTaskError(response?.response?.data?.message);
      }
    }
  };

  const getApplications = async () => {
    try {
      const res = await _getApplications();
      setApplications(res?.data?.data?.Items);
      console.log("_getApplications", res);
    } catch (err) {
      console.log(err);
    }
  };

  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const handleClickOpenDeleteConfirm = () => {
    setOpenDeleteConfirm(true);
  };
  const handleCloseDeleteConfirm = () => {
    setOpenDeleteConfirm(false);
  };

  const newShade = (hexColor, magnitude) => {
    hexColor = hexColor.replace(`#`, ``);
    if (hexColor.length === 6) {
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

  useEffect(() => {
    getApplications();
    fetchTasks();
  }, []);


    const getLoginUser = async () => {
    try{
      const res = await _getUser()
      return res?.data
    }catch(err){
      console.log(err)
    }
  }

  const fetchTasks = async () => {
    setLoading(true);
    let loginUser = await getLoginUser();
    let users = await getUsers();
    const response = await _fetchAllTasks();
    let tableDt = await response?.data?.loanTasks?.Items.sort((a, b) =>
      a.createTime < b.createTime ? 1 : b.createTime < a.createTime ? -1 : 0
    );
    let taskDataArray = [];
      await tableDt?.map( async (task)=>{
        console.log(task,"task613")
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
        console.log(object,"object620")
        taskDataArray.push(object)
      })
    console.log("fetchTasks", response);

    setLoading(false);
    if (response?.status === 200) {
      setTaskData([...taskDataArray]);
    } else {
      setError({ type: "error", message: "Error fetching data" });
    }
  };

  const deleteTask = async (task) => {
    setLoading(true);
    const response = await _deleteTaskById(task?.task?.PK, task?.task?.id);
    fetchTasks();
    console.log(response);

    setLoading(false);
    if (response?.status === 200) {
      handleCloseModify();
      handleCloseDeleteConfirm();
      setError({ type: "success", message: "Task deleted" });
    } else {
      handleCloseModify();
      handleCloseDeleteConfirm();
      setError({ type: "error", message: "Error fetching data" });
    }
  };

  const getUsers = async () => {
    try {
      const res = await _getAllPlatformUserByAdmin();
      setUsers([...res?.data?.users]);
      return res?.data?.users;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box
        sx={{
          // width: {
          //   sm: 300,
          //   md: 600,
          //   lg: 900,
          //   xl: 1236,
          // },
          padding: "10px  20px ",
        }}
      >
        {loading ? (
          <div style={{ marginTop: 20 }}>
            <CircularProgress />
          </div>
        ) : (
          <div style={{ marginTop: 20 }}>
            <Box
            // style={{margin:20,padding:20}}
            >
              {error && (
                <Snackbar
                  open={error.type}
                  autoHideDuration={6000}
                  onClose={() => setError({})}
                >
                  <Alert severity={error.type}>{error.message}</Alert>
                </Snackbar>
              )}
              <Grid container ml={2}>
                <Grid item xs={4} mt={6} mb={2}>
                  {/* <div style={{ paddingLeft: '10px' }}> */}
                  <h1 className="page_header">Tasks</h1>
                  {/* </div> */}
                </Grid>
              </Grid>
              <Grid container mt={2} mb={4} ml={2}>
                <Grid item xs={4}>
                  <TextField
                    id="input-with-icon-textfield"
                    variant="standard"
                    fullWidth
                    onChange={(e) => {
                      setSearchKey(e.target.value);
                    }}
                    sx={{ width: 300 }}
                    placeholder={"Search"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchOutlinedIcon fontSize="medium" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <div>
                    <AvatarGroup total={users.length}>
                      {users &&
                        users.map((user, key) => {
                          return (
                            <Avatar
                              key={key}
                              alt={user?.PK.split("#")[1]}
                              src={`${s3URL}/${user?.imageId}`}
                            />
                          );
                        })}
                    </AvatarGroup>
                  </div>
                </Grid>
                <Grid item xs={4} alignItems="flex-end">
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
                      style={{
                        marginLeft: 20,
                        textTransform: "capitalize",
                        fontWeight: 700,
                      }}
                      onClick={() => {
                        handleClickOpenTask();
                      }}
                    >
                      Add Task
                    </Button>
                  </div>
                </Grid>
              </Grid>

              <Grid container ml={2}>
                <Box>
                  <TableContainer>
                    <Table aria-label="custom pagination table">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            className="task_tbl_cell"
                            align="left"
                            style={{
                              color: "#858585",
                              fontFamily: "Montserrat",
                              fontSize: 14,
                              fontWeight: 700,
                              width: 160,
                            }}
                          >
                            Status
                          </TableCell>

                          <TableCell
                            className="task_tbl_cell"
                            align="left"
                            style={{
                              color: "#858585",
                              fontFamily: "Montserrat",
                              fontSize: 14,
                              fontWeight: 700,
                              width: 200,
                            }}
                          >
                            Assigned to
                          </TableCell>

                          <TableCell
                            className="task_tbl_cell"
                            align="left"
                            style={{
                              color: "#858585",
                              fontFamily: "Montserrat",
                              fontSize: 14,
                              fontWeight: 700,
                              width: 200,
                            }}
                          >
                            DESCRIPTION
                          </TableCell>

                          <TableCell
                            className="task_tbl_cell"
                            align="left"
                            style={{
                              color: "#858585",
                              fontFamily: "Montserrat",
                              fontSize: 14,
                              fontWeight: 700,
                              width: 160,
                            }}
                          >
                            APPLICATION
                          </TableCell>

                          <TableCell
                            className="task_tbl_cell"
                            align="left"
                            style={{
                              color: "#858585",
                              fontFamily: "Montserrat",
                              fontSize: 14,
                              fontWeight: 700,
                              width: 160,
                            }}
                          >
                            DUE DATE
                          </TableCell>

                          <TableCell
                            className="task_tbl_cell"
                            align="left"
                            style={{
                              color: "#858585",
                              fontFamily: "Montserrat",
                              fontSize: 14,
                              fontWeight: 700,
                              width: 160,
                            }}
                          >
                            UPDATED
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {taskData &&
                          taskData
                            ?.filter((data) => {
                              if (searchKey == "") {
                                return data;
                              } else {
                                return data?.task?.description.toLowerCase().includes(searchKey.toLocaleLowerCase());
                              }
                            })
                            .slice(
                              pages * rowsPerPage,
                              pages * rowsPerPage + rowsPerPage
                            )
                            .map((task, key) => {
                              return (
                                <TableRow
                                  key={key}
                                  container
                                  mt={1}
                                  onClick={() => {
                                    console.log(task);
                                    setSelectTask(task);
                                    handleOpenModify();
                                  }}
                                >
                                  <TableCell
                                    key={key}
                                    p={0}
                                    m={0}
                                    style={{ wordBreak: "break-all" }}
                                  >
                                    <span
                                      className="verified_label task_tbl_cell"
                                      style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        color:
                                          task?.task?.status.toLowerCase() ==
                                          "not done"
                                            ? "#FF0000"
                                            : task?.task?.status.toLowerCase() ==
                                              "done"
                                            ? "#00FF00"
                                            : "#0000FF",
                                        backgroundColor:
                                          task?.task?.status.toLowerCase() ==
                                          "not done"
                                            ? `${newShade("#FF0000", 180)}`
                                            : task?.task?.status.toLowerCase() ==
                                              "done"
                                            ? `${newShade("#00FF00", 180)}`
                                            : `${newShade("#0000FF", 180)}`,
                                      }}
                                    >
                                      {task?.task?.status || ""}
                                    </span>
                                  </TableCell>
                                  <TableCell
                                    className="task_tbl_cell"
                                    style={{ wordBreak: "break-all" }}
                                  >
                                    {/* <AvatarGroup max={3} sx={{ width: 30, height: 5 }}>
                                <Avatar alt='avatar2' src='./images/avatar2.png ' />
                                <Avatar alt='avatar1' src='./images/avatar1.png' />
                                <Avatar alt='avatar3' src='./images/avatar3.png' />
                                <Avatar alt='avatar4' src='./images/avatar4.png' />
                                </AvatarGroup> */}
                                    {task?.task?.assignTo?.length > 1 ? (
                                      <AvatarGroup
                                        total={task?.task?.assignTo?.length}
                                      >
                                        {task?.teamArr?.map((member) => {
                                          return (
                                            <Avatar
                                              alt={member?.PK.split("#")[1]}
                                              src={`${s3URL}/${member?.imageId}`}
                                            />
                                          );
                                        })}
                                      </AvatarGroup>
                                    ) : (
                                      task?.task?.assignTo || ""
                                    )}
                                  </TableCell>
                                  <TableCell
                                    className="task_tbl_cell"
                                    style={{ wordBreak: "break-all" }}
                                  >
                                    <Typography
                                      sx={{ color: "#858585" }}
                                      style={{ fontSize: 14, fontWeight: 500 }}
                                    >
                                      {task?.task?.description}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    className="task_tbl_cell"
                                    style={{ wordBreak: "break-all" }}
                                  >
                                    <Typography
                                      sx={{ color: "#858585" }}
                                      style={{ fontSize: 14, fontWeight: 500 }}
                                      pr={1}
                                    >
                                      {task?.task?.PK}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    className="task_tbl_cell"
                                    style={{ wordBreak: "break-all" }}
                                  >
                                    <Typography
                                      sx={{
                                        color: "#858585",
                                        textAlign: "left",
                                      }}
                                      style={{ fontSize: 14, fontWeight: 500 }}
                                    >
                                      {task.task?.dueDate &&
                                        moment(task.task?.dueDate).format(
                                          "YYYY-MM-DD"
                                        )}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    className="task_tbl_cell"
                                    style={{ wordBreak: "break-all" }}
                                  >
                                    <Typography
                                      sx={{
                                        color: "#858585",
                                        textAlign: "left",
                                      }}
                                      style={{ fontSize: 14, fontWeight: 500 }}
                                    >
                                      {task.task?.updateTime &&
                                        moment(task.task?.updateTime).format(
                                          "YYYY-MM-DD hh:MM A"
                                        )}
                                    </Typography>
                                  </TableCell>

                                  {/* <TableCell  xs={12} mt={1}>
                         <Divider />
                       </TableCell> */}
                                </TableRow>
                              );
                            })}
                      </TableBody>
                    </Table>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, 100]}
                      component="div"
                      count={taskData.length}
                      rowsPerPage={rowsPerPage}
                      page={pages}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableContainer>
                </Box>
              </Grid>
            </Box>
          </div>
        )}

        <div>
          {/* <Button onClick={handleOpen}>Open modal</Button> */}
          <Modal
            open={openModify}
            onClose={handleCloseModify}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {/* <Button
              onClick={() => {
                router.push(`/tasks/view/${selectTask?.id}`)
              }}
            >
              Edit Task
            </Button>
            <br />
            <Button
              onClick={() => {
                deleteTask(selectTask)
              }}
            >
              Delete Task
            </Button> */}

              {/* custom-btn */}

              <Stack direction="column" spacing={2}>
                <ColorButtonEdit
                  variant="contained"
                  className="myButtonClzStyle"
                  onClick={() => {
                    router.push(`/tasks/view/${selectTask?.task?.id}`);
                  }}
                >
                  {" "}
                  Edit Task
                </ColorButtonEdit>

                <br />
                <ColorButtonDelete
                  variant="contained"
                  className="myButtonClzStyle"
                  onClick={() => {
                    handleCloseModify();
                    handleClickOpenDeleteConfirm();
                  }}
                >
                  {" "}
                  Delete Task
                </ColorButtonDelete>
              </Stack>

              {/* custom-btn */}
            </Box>
          </Modal>
        </div>
        <div>
          {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
          <Dialog
            open={openDeleteConfirm}
            onClose={handleCloseDeleteConfirm}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"task delete"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this task?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={handleCloseDeleteConfirm}>
                Close
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  deleteTask(selectTask);
                }}
                autoFocus
              >
                delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Dialog open={openTask} onClose={handleCloseTask} fullWidth m={4}>
          <DialogTitle>
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
          </DialogTitle>
          <DialogContent>
            <Stack direction="column" spacing={2}>
              <FormControl>
                <label style={{ marginBottom: 6 }}>Description</label>
                <TextField
                  onChange={(e) => {
                    setTaskDescription(e.target.value);
                  }}
                  size="small"
                  value={taskDescription}
                />
              </FormControl>
              <FormControl>
                <label style={{ marginBottom: 6 }}>Select Application</label>
                <Autocomplete
                  value={applicationId || ""}
                  renderInput={(params) => (
                    <TextField {...params} size="small" label="Application" />
                  )}
                  onChange={(e, val) => {
                    setApplicationId(val?.split(" - ")[1]?.split("|")[0] || "");
                    setTeamMembers(
                      (applications &&
                        applications.filter((application) => {
                          return (
                            application?.PK ==
                            val?.split(" - ")[1]?.split("|")[0]
                          );
                        })[0]?.members) ||
                        []
                    );
                    setTeamMember("");
                  }}
                  options={applications?.map((application) => {
                    let s = `ID - ${application?.PK}|Status - ${application?.status_}`;
                    return s;
                  })}
                ></Autocomplete>
              </FormControl>
              <FormControl>
                {/* <label style={{ marginBottom: 6 }}>Assign to</label>
                <Autocomplete
                  value={teamMember}
                  renderInput={(params) => (
                    <TextField {...params} size="small" label="User" />
                  )}
                  onChange={(e, val) => {
                    setTeamMember(val);
                  }}
                  options={teamMembers && teamMembers.map((member) => member)}
                ></Autocomplete> */}
                  <div >
                        <FormControl sx={{ width:550}}>
                         <label style={{ marginBottom: 6 }}>Assign to</label>
                        <Select
                            // labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={personName}
                            onChange={handleChangeEditTeamMember}
                            // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                            <Box
                                sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                                }}
                            >
                                {selected.map((value) => (
                                <Chip
                                    key={value}
                                    label={value}
                                    avatar={
                                    <Avatar
                                        alt="Natacha"
                                        src="../images/img1.png"
                                    />
                                    }
                                />
                                ))}
                            </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {teamMembers.map((member, key) => (
                            <MenuItem
                                key={key}
                                value={member}
                            >
                                {member}
                            </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                    </div>
              </FormControl>
              <FormControl>
                <label style={{ marginBottom: 6 }}>Due Date</label>
                <TextField
                  value={taskDueDate}
                  onChange={(e) => {
                    setTaskDueDate(e.target.value);
                  }}
                  size="small"
                />
              </FormControl>
              <FormControl>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Switch
                    value={taskPriventApplication}
                    onChange={(e) => {
                      setTaskPriventApplication(e.target.checked);
                    }}
                  />
                  <Typography fontSize={14}>
                    Prevent applications from entering status(es) if task is not
                    done
                  </Typography>
                </Stack>
              </FormControl>
              <FormControl>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Switch
                    value={taskEditable}
                    onChange={(e) => {
                      setTaskEditable(e.target.checked);
                    }}
                  />
                  <Typography fontSize={14}>
                    Include editable application data within the task
                  </Typography>
                </Stack>
              </FormControl>
              {taskError && <Typography color="error">{taskError}</Typography>}
              <FormControl>
                <Button
                  onClick={() => {
                    let taskData = {
                      description: taskDescription,
                      assignedTo: personName,
                      dueDate: taskDueDate,
                      prevert: taskPriventApplication,
                      editable: taskEditable,
                    };
                    handleTaskCreate(taskData);
                  }}
                  variant="contained"
                  sx={{ maxWidth: 200, marginTop: 2, marginBottom: 2 }}
                >
                  Create Task
                </Button>
              </FormControl>
            </Stack>
          </DialogContent>
        </Dialog>
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
      </Box>
    </>
  );
};

Tasks.layout = "AdminLayout";

export default Tasks;
