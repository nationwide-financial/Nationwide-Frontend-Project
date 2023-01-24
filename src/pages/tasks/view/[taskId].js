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
import moment from "moment";
import Stack from "@mui/material/Stack";

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

  const [taskAssignTo, setTaskAssignTo] = useState("");
  const [tasDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");

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
    fetchData();
  }, [taskId]);

  function getTime(ts) {
    let date = new Date(ts);
    return date.toDateString();
  }
  const fetchData = async () => {
    setLoading(true);
    const response = await _fetchTaskById(taskId);
    console.log(response);
    setLoading(false);
    if (response?.status === 200) {
      if (response?.data?.task.Count > 0) {
        setTaskAssignTo(response?.data?.task?.Items[0]?.assignTo);
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
  const updateOverVeiw = async (applicationId, taskId) => {
    console.log("id", applicationId, taskId);
    try {
      let body = {
        description: tasDescription,
        assignTo: taskAssignTo,
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
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const changeState = async (applicationId, taskId) => {
    console.log("id", applicationId, taskId);
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
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const addComment = async (applicationId, taskId) => {
    console.log("id", applicationId, taskId);

    try {
      if (!comment || comment == "" || comment == null) {
        setErrorMsg("comment can not be empty! ");
      } else {
        setErrorMsg("");
        let commentBody = {
          commentId: `COMMENT_${Date.now()}`,
          comment: comment,
          createTime: Date.now(),
          commentBy: "kuhan",
        };
        console.log(commentBody);
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
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const adddata = async (applicationId, taskId) => {
    console.log("id", applicationId, taskId);

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
        console.log(response);
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
                      <Avatar
                        alt="avatar1"
                        src="/images/avatar1.png"
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
                          {/* <Button size='small' variant='outlined' color={task?.status === 'NEW' ? 'success' : task?.status === 'INPROGRESS' ? 'warning' : 'error'}>
                  {task?.status}
                </Button> */}
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
                    <Button
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
                    <TextField
                      fullWidth
                      size="small"
                      margin="normal"
                      id="outlined-basic"
                      variant="outlined"
                      value={taskAssignTo}
                      onChange={(event) => {
                        setTaskAssignTo(event.target.value);
                      }}
                    />
                  ) : (
                    <Typography sx={{ color: "#858585" }} ml={10}>
                      {task?.assignTo}
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
                    <Button
                      onClick={() => {
                        setDataEditMode((dataEditMode) => !dataEditMode);
                        adddata(task?.PK, task?.id);
                      }}
                      variant="contained"
                    >
                      Save
                    </Button>
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
                <Grid item xs={8}>
                  {commentEditMode ? (
                    <Button
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
                  ) : (
                    <Typography
                      ml={3}
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
                      <AddIcon
                        sx={{
                          color: "#1478F1",
                          margin: "1px",
                          padding: "1px",
                        }}
                      />
                      Add Comments
                    </Typography>
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
              {task?.comments && task?.comments.sort((a, b) =>
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
                          <AvatarGroup
                            max={1}
                            sx={{ width: 30, height: 5, paddingLeft: 5 }}
                          >
                            <Avatar alt="avatar1" src="./images/avatar1.png" />
                          </AvatarGroup>
                          <Typography
                            sx={{
                              color: "black",
                              fontWeight: "bold",
                              fontSize: "1.2rem",
                            }}
                            ml={10}
                          >
                            {comment?.commentBy || ""}
                            <div style={{ color: "#858585" }}>
                              {`${comment?.commentId || ""}|${
                                getTime(comment?.createTime) || ""
                              }`}
                            </div>
                          </Typography>
                        </Grid>
                        <Grid container columns={16}>
                          <Grid item xs={8}>
                            <Typography
                              sx={{
                                color: "black",
                                fontWeight: "bold",
                                fontSize: "1.2rem",
                              }}
                              ml={10}
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
