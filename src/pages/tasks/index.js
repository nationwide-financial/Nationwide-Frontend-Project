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
  const router = useRouter();

  const [taskData, setTaskData] = useState([]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [users, setUsers] = useState([]);

  const [selectTask, setSelectTask] = useState();
  const [openModify, setOpenModify] = useState(false);
  const handleOpenModify = () => setOpenModify(true);
  const handleCloseModify = () => {
    setOpenModify(false);
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
    fetchTasks();
    getUsers();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    const response = await _fetchAllTasks();
    let tableDt = await response?.data?.loanTasks?.Items.sort((a, b) =>
      a.createTime < b.createTime ? 1 : b.createTime < a.createTime ? -1 : 0
    );
    console.log("fetchTasks", response);
    setLoading(false);
    if (response?.status === 200) {
      setTaskData([...tableDt]);
    } else {
      setError({ type: "error", message: "Error fetching data" });
    }
  };

  const deleteTask = async (task) => {
    setLoading(true);
    const response = await _deleteTaskById(task?.PK, task?.id);
    fetchTasks();
    console.log(response);

    setLoading(false);
    if (response?.status === 200) {
      setError({ type: "success", message: "Task deleted" });
    } else {
      setError({ type: "error", message: "Error fetching data" });
    }
  };

  const getUsers = async () => {
    try {
      const res = await _getAllPlatformUserByAdmin();
      setUsers([...res?.data?.users]);
    } catch (err) {
      console.log(err);
    }
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <Box
        sx={{
          width: {
            sm: 300,
            md: 600,
            lg: 900,
            xl: 1236,
          },
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
                <Grid item xs={4} mt={8}>
                  {/* <div style={{ paddingLeft: '10px' }}> */}
                  <h1 className="page_header">Tasks</h1>
                  {/* </div> */}
                </Grid>
              </Grid>
              <Grid container mt={2} mb={4} ml={2}>
                <Grid item xs={4}>
                  <SearchBox />
                  {/* <TextField
                  id='input-with-icon-textfield'
                  variant='standard'
                  fullWidth
                  onChange={(e)=>{
                    setSearchKey(e.target.value)
                  }}
                  sx={{ width: 300 }}
                  placeholder={'Search'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchOutlinedIcon fontSize='medium' />
                      </InputAdornment>
                    ),
                  }}
                /> */}
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
                  {/* <div style={{ paddingLeft: 20, marginLeft: 300 }}>
                  <TuneIcon />
                </div> */}
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
                        {taskData
                          ?.filter((data) => {
                            if (searchKey == "") {
                              return data;
                            } else {
                              return data?.description
                                .toLowerCase()
                                .includes(searchKey.toLocaleLowerCase());
                            }
                          })
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
                                <TableCell key={key} p={0} m={0} style={{wordBreak: "break-all"}}>
                                  <span
                                    className="verified_label task_tbl_cell"
                                    style={{
                                      fontSize: 14,
                                      fontWeight: 500,
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
                                </TableCell>
                                <TableCell className="task_tbl_cell" style={{wordBreak: "break-all"}}>
                                  {/* <AvatarGroup max={3} sx={{ width: 30, height: 5 }}>
                                <Avatar alt='avatar2' src='./images/avatar2.png ' />
                                <Avatar alt='avatar1' src='./images/avatar1.png' />
                                <Avatar alt='avatar3' src='./images/avatar3.png' />
                                <Avatar alt='avatar4' src='./images/avatar4.png' />
                                </AvatarGroup> */}
                                  <Typography
                                    sx={{ color: "#858585" }}
                                    style={{ fontSize: 14, fontWeight: 500 }}
                                    pr={1}
                                  >
                                    {task?.assignTo}
                                  </Typography>
                                </TableCell>
                                <TableCell className="task_tbl_cell" style={{wordBreak: "break-all"}}>
                                  <Typography
                                    sx={{ color: "#858585" }}
                                    style={{ fontSize: 14, fontWeight: 500 }}
                                  >
                                    {task?.description}
                                  </Typography>
                                </TableCell>
                                <TableCell className="task_tbl_cell" style={{wordBreak: "break-all"}}>
                                  <Typography sx={{ color: "#858585" }}>
                                    {task?.application}
                                  </Typography>
                                </TableCell>
                                <TableCell className="task_tbl_cell" style={{wordBreak: "break-all"}}>
                                  <Typography
                                    sx={{ color: "#858585", textAlign: "left" }}
                                    style={{ fontSize: 14, fontWeight: 500 }}
                                  >
                                    {task.dueDate &&
                                      moment(task.dueDate).format("YYYY-MM-DD")}
                                  </Typography>
                                </TableCell>
                                <TableCell className="task_tbl_cell" style={{wordBreak: "break-all"}}>
                                  <Typography
                                    sx={{ color: "#858585", textAlign: "left" }}
                                    style={{ fontSize: 14, fontWeight: 500 }}
                                  >
                                    {task.updateTime &&
                                      moment(task.updateTime).format(
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
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
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
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
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
                    router.push(`/tasks/view/${selectTask?.id}`);
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
                    deleteTask(selectTask);
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
      </Box>
    </>
  );
};

Tasks.layout = "AdminLayout";

export default Tasks;
