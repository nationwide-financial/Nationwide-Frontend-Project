import React, { Component, use, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  AvatarGroup,
  Divider,
  Typography,
  CircularProgress,
} from "@mui/material";
import { TextField } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import {
  _fetchTaskById,
  _updateTaskByid,
} from "../../../services/loanTaskServices";
import{_getAllPlatformUserByAdmin,_getUser}from '../../../services/authServices'
import moment from "moment";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import {FormControl } from "@mui/material";
import { s3URL } from '../../../utils/config'

const ViewTask = () => {
  const router = useRouter();
  const { taskId } = router.query;

  const [overViewEditMode, setOverViewEditMode] = useState(false);
  const [dataEditMode, setDataEditMode] = useState(false);
  const [commentEditMode, setCommentEditMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [error, setError] = useState();
  const [task, setTask] = useState();
  const [loading, setLoading] = useState(false);
  const [users,setUsers]=useState([]);
  const [taskAssignTo, setTaskAssignTo] = useState("");
  const [personName, setPersonName] = useState([]);
  const [tasDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [loginUserData,setLoginUserData]=useState({});
  const [usersData, setUsersData] = useState([]);
  
  const [taskStartedIncome, setStartedIncome] = useState("");
  const [taskBureauIncome, setBureauIncome] = useState("");
  const [taskVerifiedStatus, setVerifiedStatus] = useState("");

  const [comment, setComment] = useState("");

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
    getUsers();
    fetchData();
  }, [taskId]);

  const getUsers = async () =>{
    try{
      const res = await _getAllPlatformUserByAdmin();
      setUsers([...res?.data?.users])
      //console.log("getUsers*****",res?.data?.users)
      return res?.data?.users;
    }catch(err){
      console.log(err)
    }
  }

  function getTime(ts) {
    let date = new Date(ts);
    return date.toDateString();
  }

  const [teamArr,setTeamArr]=useState([])
 // console.log("teamArr",teamArr)
  const fetchData = async () => {
    setLoading(true);
    const loginUser = await _getUser()
    console.log(loginUser?.data)
    setLoginUserData(loginUser?.data)
    const platformUsers = await _getAllPlatformUserByAdmin();
    let usersData = [...platformUsers?.data?.users,loginUser?.data]
    console.log("usersData",usersData)
    setUsersData([...usersData])
    const response = await _fetchTaskById(taskId);
    console.log("_fetchTaskById",response);
    setLoading(false);
    if (response?.status === 200) {
      if (response?.data?.task.Count > 0) {
        let team=[]
        await response?.data?.task?.Items[0]?.assignTo.map((member)=>{
          team.push(...usersData.filter((user)=>{ return user?.PK == `USER#${member}`}))
        })
        setTeamArr([...team])
        setPersonName(response?.data?.task?.Items[0]?.assignTo);
        setTaskDescription(response?.data?.task?.Items[0]?.description);
        setTaskStatus(response?.data?.task?.Items[0]?.status);
        setTaskDueDate(response?.data?.task?.Items[0]?.dueDate);
        setTask(response?.data?.task?.Items[0]);
      } else {
        setError("No tasks available");
      }
    } else {
      setError(response?.response?.data["message"]);
    }
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
  

  const updateOverVeiw = async (applicationId, taskId) => {
    //console.log("id", applicationId, taskId);
    try {
      let body = {
        description: tasDescription,
        assignTo: personName,
        status: taskStatus,
        dueDate: taskDueDate,
        prevert: task?.prevert,
        editable: task?.editable,
        documents: task?.documents,
        comments: task?.comments,
        taskData: { ...task?.taskData },
      };
      const response = await _updateTaskByid(applicationId, taskId, body);
      fetchData();
     // console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const changeState = async (applicationId, taskId) => {
    //console.log("id", applicationId, taskId);
    try {
      let body = {
        description: task?.description,
        assignTo: task?.assignTo,
        status: "Done",
        dueDate: task?.dueDate,
        prevert: task?.prevert,
        editable: task?.editable,
        documents: task?.documents,
        comments: task?.comments,
        taskData: { ...task?.taskData },
      };
      const response = await _updateTaskByid(applicationId, taskId, body);
      fetchData();
    //  console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const addComment = async (applicationId, taskId) => {
   // console.log("id", applicationId, taskId);

    try {
      if (!comment || comment == "" || comment == null) {
        setErrorMsg("comment can not be empty! ");
      } else {
        setErrorMsg("");
        let commentBody = {
          commentId: `COMMENT_${Date.now()}`,
          comment: comment,
          createTime: Date.now(),
          commentBy: `${loginUserData?.info?.firstName || ""} ${loginUserData?.info?.lastName || ""}`,
        };
        //console.log(commentBody);
        let body = {
          description: task?.description,
          assignTo: task?.assignTo,
          status: task?.status,
          dueDate: task?.dueDate,
          prevert: task?.prevert,
          editable: task?.editable,
          documents: task?.documents,
          comments: [...task?.comments, commentBody],
          taskData: { ...task?.taskData },
        };
        const response = await _updateTaskByid(applicationId, taskId, body);
        fetchData();
       // console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const adddata = async (applicationId, taskId) => {
  //  console.log("id", applicationId, taskId);

    try {
      if (
        !taskStartedIncome ||
        taskStartedIncome == "" ||
        taskStartedIncome == null
      ) {
        setErrorMsg("comment can not be empty! ");
      } else if (
        !taskBureauIncome ||
        taskBureauIncome == "" ||
        taskBureauIncome == null
      ) {
        setErrorMsg("Bureau Income can not be empty! ");
      } else if (
        !taskVerifiedStatus ||
        taskVerifiedStatus == "" ||
        taskVerifiedStatus == null
      ) {
        setErrorMsg("Verified Status can not be empty! ");
      } else {
        setErrorMsg("");
        let body = {
          description: task?.description,
          assignTo: task?.assignTo,
          status: task?.status,
          dueDate: task?.dueDate,
          prevert: task?.prevert,
          editable: task?.editable,
          documents: task?.documents,
          comments: [...task?.comments],
          taskData: {
            startedIncome: taskStartedIncome,
            bureauIncome: taskBureauIncome,
            verifiedStatus: taskVerifiedStatus,
          },
        };
        const response = await _updateTaskByid(applicationId, taskId, body);
        fetchData();
      //  console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div
      style={{
        paddingLeft: 15,
        paddingTop: 15,
        paddingBottom: 100,
        margin: 15,
      }}
    >
      {loading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <Grid xs={12} container>
          {/* head-section */}
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <Grid
                container
                mb={5}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Grid item xs={8}>
                  <Stack direction="column" spacing={2}>
                    <Typography style={{ fontSize: 45, fontWeight: 700 }}>
                      Task Details
                    </Typography>
                    {/* <Grid item xs={12} ml={5}> */}
                    <Stack direction="row">
                      { }
                      <Avatar
                        alt="avatar1"
                        src={`${s3URL}/${usersData?.filter((user)=>{ return user?.PK == task?.createdBy})[0]?.imageId}`}
                        style={{ paddingLeft: 0 }}
                      />

                      <Stack direction="row" pt={1}>
                        <Typography
                          sx={{ color: "#858585", fontWeight: "bold" }}
                          ml={1}
                        >
                          {moment(task?.createTime).format(
                            "YYYY-MM-DD HH:MM A"
                          )}
                        </Typography>
                        <Typography
                          sx={{ color: "#858585", fontWeight: "bold" }}
                          ml={1}
                        >
                          <span
                            className="verified_label"
                            style={{
                              color:
                                task?.status.toLowerCase() == "not done"
                                  ? "#FF0000"
                                  : task?.status.toLowerCase() == "done"
                                  ? "#00FF00"
                                  : "#0000FF",
                              backgroundColor:
                                task?.status.toLowerCase() == "not done"
                                  ? `${newShade("#FF0000", 180)}`
                                  : task?.status.toLowerCase() == "done"
                                  ? `${newShade("#00FF00", 180)}`
                                  : `${newShade("#0000FF", 180)}`,
                            }}
                          >
                            {task?.status || ""}
                          </span>
                        </Typography>
                      </Stack>
                    </Stack>
                    {/* </Grid> */}
                  </Stack>
                </Grid>

                <Grid item xs={4}>
                  <Grid
                    style={{ display: "flex", justifyContent: "right" }}
                    mt={2}
                  >
                    <Button
                      variant="contained"
                      onClick={() => {
                        changeState(task?.PK, task?.id);
                      }}
                      style={{ textTransform: "capitalize", fontWeight: 700 }}
                    >
                      Mark As Done
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          {/* body-section */}

          <Grid item xs={12} mb={5}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container columns={16}>
                <Grid item xs={3}>
                  <Typography
                    align="left"
                    fontSize={25}
                    fontWeight={700}
                    color="black"
                  >
                    Overveiw
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  {overViewEditMode ? (
                    <div>
                      <Button
                        style={{ marginRight: 10 }}
                        onClick={() => {
                          setOverViewEditMode(
                            (overViewEditMode) => !overViewEditMode
                          );
                          updateOverVeiw(task?.PK, task?.id);
                        }}
                        variant="contained"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => {
                          setOverViewEditMode(
                            (overViewEditMode) => !overViewEditMode
                          );
                        }}
                        variant="contained"
                      >
                        Close
                      </Button>
                    </div>
                  ) : (
                    <Typography
                      ml={3}
                      align="left"
                      fontSize={16}
                      fontWeight={700}
                      color="#1478F1"
                      onClick={() => {
                        setOverViewEditMode(
                          (overViewEditMode) => !overViewEditMode
                        );
                      }}
                    >
                      <BorderColorIcon sx={{ color: "#1478F1" }} />
                      Edit Task
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ paddingTop: 2, paddingBottom: 2 }}>
                <Divider />
              </Grid>
              <Grid container columns={16}>
                <Grid item xs={3}>
                  <Typography
                    align="left"
                    fontWeight={600}
                    fontSize={16}
                    color="#858585"
                    pt={3}
                    pb={3}
                  >
                    Description
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  {overViewEditMode ? (
                    <TextField
                      fullWidth
                      size="small"
                      margin="normal"
                      id="outlined-basic"
                      variant="outlined"
                      value={tasDescription}
                      onChange={(event) => {
                        setTaskDescription(event.target.value);
                      }}
                    />
                  ) : (
                    <Typography
                      // ml={3}
                      align="left"
                      fontWeight={600}
                      fontSize={16}
                      color="#858585"
                      pt={3}
                      pb={3}
                    >
                      {task?.description}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ paddingTop: 2, paddingBottom: 2 }}>
                <Divider />
              </Grid>
              <Grid container columns={16}>
                <Grid item xs={3}>
                  <Typography
                    // ml={3}
                    align="left"
                    fontWeight={600}
                    fontSize={16}
                    color="#858585"
                    pt={3}
                    pb={3}
                  >
                    Assigned to
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  {/* <AvatarGroup
                    max={1}
                    sx={{ width: 30, height: 5, paddingLeft: 5 }}
                  >
                    <Avatar alt="avatar1" src="/images/avatar1.png" />
                  </AvatarGroup> */}
                  {overViewEditMode ? (
                    // <TextField
                    //   fullWidth
                    //   size="small"
                    //   margin="normal"
                    //   id="outlined-basic"
                    //   variant="outlined"
                    //   value={taskAssignTo}
                    //   onChange={(event) => {
                    //     setTaskAssignTo(event.target.value);
                    //   }}
                    // />
                    <div>
                      <FormControl sx={{ width: 530 }}>
                        {/* <InputLabel id="demo-multiple-chip-label">Chip</InputLabel> */}
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
                          {users.map((object, key) => (
                            <MenuItem
                              key={key}
                              value={object?.PK?.split("#")[1] || ""}
                            >
                              {object?.PK?.split("#")[1] || ""}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  ) : (
                    <div>
                      {teamArr?.length > 1 ? (
                        <AvatarGroup total={teamArr?.length}>
                          {teamArr?.map((member, key) => {
                            return (
                              <Avatar
                                key={key}
                                alt={member?.PK.split("#")[1]}
                                src={`${s3URL}/${member?.imageId}`}
                              />
                            );
                          })}
                        </AvatarGroup>
                      ) : (
                        task?.assignTo || ""
                      )}
                    </div>
                    // <Typography
                    //   sx={{ color: "#858585" }}
                    //   //  ml={10}
                    //   pt={3}
                    //   pb={3}
                    // >
                    //   {task?.assignTo}
                    // </Typography>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ paddingTop: 2, paddingBottom: 2 }}>
                <Divider />
              </Grid>
              <Grid container columns={16}>
                <Grid item xs={3}>
                  <Typography
                    // ml={3}
                    align="left"
                    fontWeight={600}
                    fontSize={16}
                    color="#858585"
                    pt={3}
                    pb={3}
                  >
                    Checked statuses
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  {overViewEditMode ? (
                    <TextField
                      fullWidth
                      size="small"
                      margin="normal"
                      id="outlined-basic"
                      variant="outlined"
                      value={taskStatus}
                      onChange={(event) => {
                        setTaskStatus(event.target.value);
                      }}
                    />
                  ) : (
                    <Typography
                      // ml={3}
                      align="left"
                      // fontWeight="bold"
                      fontWeight={600}
                      fontSize={16}
                      color="#858585"
                      pt={3}
                      pb={3}
                    >
                      {task?.status}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ paddingTop: 2, paddingBottom: 2 }}>
                <Divider />
              </Grid>
              <Grid container columns={16}>
                <Grid item xs={3}>
                  <Typography
                    // ml={3}
                    align="left"
                    // fontWeight="bold"
                    fontWeight={600}
                    fontSize={16}
                    color="#858585"
                    pt={3}
                    pb={3}
                  >
                    Due Date
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  {overViewEditMode ? (
                    <TextField
                      fullWidth
                      size="small"
                      margin="normal"
                      id="outlined-basic"
                      variant="outlined"
                      value={taskDueDate}
                      onChange={(event) => {
                        setTaskDueDate(event.target.value);
                      }}
                    />
                  ) : (
                    <Typography
                      // ml={3}
                      align="left"
                      // fontWeight="bold"
                      fontWeight={600}
                      fontSize={16}
                      color="#858585"
                      pt={3}
                      pb={3}
                    >
                      {task?.dueDate &&
                        moment(task.dueDate).format("YYYY-MM-DD")}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ paddingTop: 2, paddingBottom: 2 }}>
                <Divider />
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} mb={5}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container columns={16}>
                <Grid item xs={3}>
                  <Typography
                    //ml={3}
                    align="left"
                    // fontSize="1.5rem"
                    color="black"
                    fontWeight={600}
                    fontSize={25}
                  >
                    Data
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  {dataEditMode ? (
                    <div>
                      <Button
                        style={{ marginRight: 10 }}
                        onClick={() => {
                          setDataEditMode((dataEditMode) => !dataEditMode);
                          adddata(task?.PK, task?.id);
                        }}
                        variant="contained"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => {
                          setDataEditMode((dataEditMode) => !dataEditMode);
                        }}
                        variant="contained"
                      >
                        Close
                      </Button>
                    </div>
                  ) : (
                    <Typography
                      ml={3}
                      align="left"
                      // fontSize="1.0rem"
                      // fontWeight="bold"
                      color="#1478F1"
                      fontWeight={600}
                      fontSize={16}
                      onClick={() => {
                        setDataEditMode((dataEditMode) => !dataEditMode);
                      }}
                    >
                      <BorderColorIcon sx={{ color: "#1478F1" }} />
                      Edit Task
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ paddingTop: 2, paddingBottom: 2 }}>
                <Divider />
              </Grid>
              <Grid container columns={16}>
                <Grid item xs={3}>
                  <Typography
                    // ml={3}
                    align="left"
                    // fontWeight="bold"
                    color="#858585"
                    fontWeight={600}
                    fontSize={16}
                    pt={3}
                    pb={3}
                  >
                    Started Income
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  {dataEditMode ? (
                    <TextField
                      fullWidth
                      type="number"
                      size="small"
                      margin="normal"
                      id="outlined-basic"
                      variant="outlined"
                      value={taskStartedIncome}
                      onChange={(event) => {
                        setStartedIncome(event.target.value);
                      }}
                    />
                  ) : (
                    <Typography
                      // ml={3}
                      align="left"
                      // fontWeight="bold"
                      fontWeight={600}
                      fontSize={16}
                      color="#858585"
                      pt={3}
                      pb={3}
                    >
                      ${task?.taskData?.startedIncome || ""}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ paddingTop: 2, paddingBottom: 2 }}>
                <Divider />
              </Grid>
              <Grid container columns={16}>
                <Grid item xs={3}>
                  <Typography
                    // ml={3}
                    align="left"
                    // fontWeight="bold"
                    color="#858585"
                    fontWeight={600}
                    fontSize={16}
                    pt={3}
                    pb={3}
                  >
                    Bureau Income
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  {dataEditMode ? (
                    <TextField
                      type="number"
                      fullWidth
                      size="small"
                      margin="normal"
                      id="outlined-basic"
                      variant="outlined"
                      value={taskBureauIncome}
                      onChange={(event) => {
                        setBureauIncome(event.target.value);
                      }}
                    />
                  ) : (
                    <Typography
                      // ml={3}
                      align="left"
                      // fontWeight="bold"
                      color="#858585"
                      fontWeight={600}
                      fontSize={16}
                      pt={3}
                      pb={3}
                    >
                      ${task?.taskData?.bureauIncome || ""}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ paddingTop: 2, paddingBottom: 2 }}>
                <Divider />
              </Grid>
              <Grid container columns={16}>
                <Grid item xs={3}>
                  <Typography
                    // ml={3}
                    align="left"
                    // fontWeight="bold"
                    color="#858585"
                    fontWeight={600}
                    fontSize={16}
                    pt={3}
                    pb={3}
                  >
                    Verified Status
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  {dataEditMode ? (
                    <TextField
                      type="number"
                      fullWidth
                      size="small"
                      margin="normal"
                      id="outlined-basic"
                      variant="outlined"
                      value={taskVerifiedStatus}
                      onChange={(event) => {
                        setVerifiedStatus(event.target.value);
                      }}
                    />
                  ) : (
                    <Typography
                      // ml={3}
                      align="left"
                      // fontWeight="bold"
                      color="#858585"
                      fontWeight={600}
                      fontSize={16}
                      pt={3}
                      pb={3}
                    >
                      ${task?.taskData?.verifiedStatus || ""}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ paddingTop: 2, paddingBottom: 2 }}>
                <Divider />
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} mb={4}>
            <Box>
              <Grid container columns={16}>
                <Grid item xs={3}>
                  <Typography
                    // ml={3}
                    align="left"
                    // fontSize="1.5rem"
                    // fontWeight="bold"
                    fontWeight={600}
                    fontSize={25}
                    color="black"
                  >
                    Comments
                  </Typography>
                </Grid>
                <Grid item xs={8} p={1}>
                  {commentEditMode ? (
                    <div>
                      <Button
                        style={{marginRight:10}}
                        variant="contained"
                        onClick={() => {
                          addComment(task?.PK, task?.id);
                          setCommentEditMode(
                            (commentEditMode) => !commentEditMode
                          );
                        }}
                      >
                        Add comment
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setCommentEditMode(
                            (commentEditMode) => !commentEditMode
                          );
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  ) : (
                    <Stack direction="row" spacing={1}>
                      <AddIcon style={{ color: "#1478F1" }} />
                      <Typography
                        // ml={3}
                        align="left"
                        // fontSize="1.0rem"
                        // fontWeight="bold"
                        fontWeight={600}
                        fontSize={16}
                        color="#1478F1"
                        onClick={() => {
                          setCommentEditMode(
                            (commentEditMode) => !commentEditMode
                          );
                        }}
                      >
                        {/* <AddIcon
                      sx={{
                        color: "#1478F1",
                        margin: "1px",
                        padding: "1px",
                      }}
                      /> */}
                        Add Comments
                      </Typography>
                    </Stack>
                  )}
                </Grid>
                {commentEditMode && (
                  <TextField
                    fullWidth
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    variant="outlined"
                    onChange={(event) => {
                      setComment(event.target.value);
                    }}
                  />
                )}
              </Grid>
              {task?.comments &&
                task?.comments
                  .sort((a, b) =>
                    a.createTime < b.createTime
                      ? 1
                      : b.createTime < a.createTime
                      ? -1
                      : 0
                  )
                  .map((comment, key) => {
                    return (
                      <Grid container columns={16} key={key}>
                        <Grid item xs={8}>
                          {/* <AvatarGroup max={1} sx={{ width: 30, height: 5 }}>
                            <Avatar alt="avatar1" src="/images/avatar1.png" max={1} sx={{ width: 30, height: 5 }} />
                          </AvatarGroup> */}
                          <Stack direction="row" spacing={1} mb={2} mt={2}>
                            <Avatar
                              alt="avatar1"
                              src="/images/avatar1.png"
                              style={{ paddingLeft: 0 }}
                            />
                            <Typography
                              sx={{
                                color: "black",
                                // fontWeight: "bold",
                                // fontSize: "1.2rem",
                              }}
                              style={{ fontSize: 14, fontWeight: 700 }}
                              // ml={10}
                            >
                              {comment?.commentBy || ""}
                              <div
                                style={{
                                  color: "#858585",
                                  fontWeight: 500,
                                  fontSize: 14,
                                }}
                              >
                                {`#${
                                  comment?.commentId.split("_")[1] || ""
                                }\t|\t${getTime(comment?.createTime) || ""}`}
                              </div>
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid container columns={16}>
                          <Grid item xs={8}>
                            <Typography
                              sx={{
                                color: "black",
                                // fontWeight: "bold",
                                // fontSize: "1.2rem",
                              }}
                              style={{ fontSize: 14, fontWeight: 500 }}
                              // ml={10}
                            >
                              {comment?.comment || ""}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })}
            </Box>
          </Grid>
          {/* <Grid item xs={12} mb={2}>
            <Stack direction="row" spacing={2}>
              <Avatar alt="Remy Sharp" src="/images/avatar1.png" />

              <Stack direction="column">
                <span style={{ fontWeight: 600 }}>Jane Cooper</span>
                <Stack direction="row">
                  <Typography>#6623960</Typography>
                  <Typography>|</Typography>
                  <Typography>Oct, 24, 2021</Typography>
                </Stack>
              </Stack>
            </Stack>
            <Typography mt={2}>
              Sounds good.Let's follow up if they did not sent today.
            </Typography>
            ,
          </Grid> */}
        </Grid>
      )}
    </div>
  );
};

ViewTask.layout = "AdminLayout";
export default ViewTask;
