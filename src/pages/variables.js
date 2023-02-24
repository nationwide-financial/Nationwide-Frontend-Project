import React, { useState, useEffect, useCallback } from "react";
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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AvatarGroup from "@mui/material/AvatarGroup";
import { MoreVert, Search, TuneOutlined } from "@mui/icons-material";
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
import FormHelperText from "@mui/material/FormHelperText";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";

import { s3URL } from "../utils/config";
import { _getAllPlatformUserByAdmin ,_getUserByIdArray} from "../services/authServices";
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

import {
  _gatVariabels,
  _searchVariabels,
  _addVariabel,
  _deleteVariabels,
  _updateVariabels,
} from "../services/variabelService";
import { _verifyUser } from "../services/authServices";
import { padding } from "@mui/system";
import { filter } from "lodash";

function Variable() {
  const [searchKey, setSearchKey] = useState("");
  const [users, setUsers] = useState([]);
  // rowId
  const [rowsId, setRowsId] = useState("");

  // common model
  const [openModify, setOpenModify] = useState(false);
  const handleOpenModify = () => setOpenModify(true);
  const handleCloseModify = () => {
    setRowsId("");
    setOpenModify(false);
  };

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

  // edit model handel
  const [openEdit, setOpenEdit] = useState(false);
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);

    setDataTypeUpdate("");
    setDescriptionUpdate("");
    setDisplayNameUpdate("");
    setSystemNameUpdate("");
    setErrorEdit("");
  };

  // paginations
  const [pages, setPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPages(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPages(0);
  };

  const [data, setData] = useState([]);

  // dialog box
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setDisplayName("");
    setSystemName("");
    setDataType("string");
    setDescription("");
    setVariableType("application");
    setOpen(false);
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

  // timestamp to date
  function getTime(ts) {
    let date = new Date(ts);
    return date.toDateString();
  }

  // fetch table data
  async function getTableData() {
    const response = await _gatVariabels();
    console.log("_gatVariabels",response?.data?.data?.Items);

    let usersFilterFromVariable = [];
    await response?.data?.data?.Items?.map((variable)=>{
      usersFilterFromVariable.push(variable?.createdBy?.split("#")[1] || "")
      usersFilterFromVariable.push(variable?.updatedBy?.split("#")[1]  || "")
    })
    let uniqueUsersFilterFromVariable= [...new Set(usersFilterFromVariable)]?.filter((user)=>user !="")
    let body = { users:uniqueUsersFilterFromVariable }
    const responseUsers = await _getUserByIdArray(body)
    setUsers(responseUsers?.data?.users)

    let tableDt = await response?.data?.data?.Items.sort((a, b) =>
      a.createTime < b.createTime ? 1 : b.createTime < a.createTime ? -1 : 0
    );
    setData(
      tableDt?.map((row) => {
        let uT = getTime(row?.updateTime);
        return {
          rowId: row.PK,
          systemName: row?.systemName,
          displayName: row?.displayName,
          dataType: row?.dataType,
          uT: uT,
          description: row?.description,
          variableType: row?.variableType,
          updatedBy:row?.updatedBy
        };
      })
    );
  }

  useEffect(() => {
    getTableData();
   // getUsers();
  }, []);

  const [onClickObj, setOnClickObj] = useState({});
  // add variable
  const [formDt, setFormDt] = useState({});
  const [error, setError] = useState("");
  const onChangeHandler = useCallback(({ target }) => {
    setFormDt((state) => ({ ...state, [target.name]: target.value }));
  }, []);

  const [displayName, setDisplayName] = useState("");
  const [systemName, setSystemName] = useState("");
  const [dataType, setDataType] = useState("string");
  const [description, setDescription] = useState("");
  const [variableType, setVariableType] = useState("application");

  const onSubmit = async () => {
    let body = {
      displayName: displayName,
      systemName: systemName,
      dataType: dataType,
      description: description,
      variableType: variableType,
      permission_: true,
    };
    if (!displayName || displayName === "" || displayName == null) {
      setError("Display Name can not be empty !");
    } else if (!systemName || systemName === "" || systemName == null) {
      setError("system Name can not be empty !");
    } else if (!description || description === "" || description == null) {
      setError("description can not be empty !");
    } else if (!dataType || dataType === "" || dataType == null) {
      setError("data Type can not be empty !");
    } else if (!variableType || variableType === "" || variableType == null) {
      setError("variable Type can not be empty !");
    } else {
      setError("");
      console.log(body);
      const response = await _addVariabel(body);
      console.log(response);

      if (response?.status === 200) {
        const verify = await _verifyUser();
        if (verify?.status === 200) {
          setFormDt({});
          handleClose();
          //alert("added success ");
          handleSuccessMessage();
          setMessage("Added success");
          getTableData();
        } else {
          setError(response?.data["message"]);
        }
      } else {
        setError(response?.data["message"]);
      }
    }
  };

  // detele variable
  const deleteVariabel = async (id) => {
    try {
      console.log("id inside delete variable*******", id);
      const response = await _deleteVariabels(id);
      if (response?.status == 200) {
        getTableData();
        handleCloseModify();
        //alert("you have successfully deleted ");
        handleSuccessMessage();
        setMessage("you have successfully deleted ");
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  // const getUsers = async () => {
  //   try {
  //     const res = await _getAllPlatformUserByAdmin();
  //     setUsers([...res?.data?.users]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // update variable states
  const [displayNameUpdate, setDisplayNameUpdate] = useState("");
  const [systemNameUpdate, setSystemNameUpdate] = useState("");
  const [dataTypeUpdate, setDataTypeUpdate] = useState("");
  const [descriptionUpdate, setDescriptionUpdate] = useState("");
  const [variableTypeUpdate, setVariableTypeUpdate] = useState("");
  const [errorEdit, setErrorEdit] = useState("");
  // update variable
  const editVariable = async (id) => {
    try {
      let body = {
        displayName: displayNameUpdate,
        systemName: systemNameUpdate,
        dataType: dataTypeUpdate,
        description: descriptionUpdate,
        variableType: variableTypeUpdate,
        permission_: true,
      };
      if (
        !displayNameUpdate ||
        displayNameUpdate === "" ||
        displayNameUpdate == null
      ) {
        setErrorEdit("Display Name can not be empty !");
      } else if (
        !systemNameUpdate ||
        systemNameUpdate === "" ||
        systemNameUpdate == null
      ) {
        setErrorEdit("system Name can not be empty !");
      } else if (
        !dataTypeUpdate ||
        dataTypeUpdate === "" ||
        dataTypeUpdate == null
      ) {
        setErrorEdit("data Type can not be empty !");
      } else if (!variableType || variableType === "" || variableType == null) {
        setErrorEdit("variable Type can not be empty !");
      } else {
        setErrorEdit("");
        console.log(body);
        console.log(id);
        const response = await _updateVariabels(id, body);
        if (response?.status == 200) {
          //alert("you have successfuly edited!");
          handleSuccessMessage();
          setMessage("you have successfuly edited!");
          handleCloseModify();
          handleCloseEdit();
          getTableData();
        }
      }
    } catch (err) {
      console.log(err);
    }
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

  return (
    <Box m={0} style={{ padding: 20, marginTop: 40, paddingLeft: 40 }}>
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
      {/* 1st-header-section */}
      <Grid container mb={5}>
        <Grid item xs={12} md={6}>
          <h1 className="page_header">Variable</h1>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              sx={{ padding: "10px 40px" }}
              onClick={handleClickOpen}
            >
              Add Variables
            </Button>

            <Dialog
              open={open}
              onClose={() => {
                setFormDt({});
                handleClose();
              }}
              fullWidth
              m={4}
            >
              <Box sx={{ width: 1000, maxWidth: "100%" }}>
                <BootstrapDialogTitle
                  id="customized-dialog-title"
                  onClose={() => {
                    setFormDt({});
                    handleClose();
                  }}
                >
                  <Typography
                    variant="h6"
                    style={{ fontSize: 30, fontFamily: "Gilroy-Bold" }}
                  >
                    Add Custom Variable
                  </Typography>
                </BootstrapDialogTitle>

                <DialogContent>
                  <FormControl
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
                    <label>
                      {" "}
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: 17,
                          fontWeight: 700,
                          fontFamily: "Montserrat",
                          fontStyle: "normal",
                        }}
                      >
                        Display Name
                        <span style={{ color: "#FF0000" }}>*</span>
                      </Typography>
                    </label>
                    <Box sx={{ maxWidth: "100%" }}>
                      <TextField
                        name="displayName"
                        type="text"
                        onChange={(e) => {
                          setDisplayName(e.target.value);
                        }}
                        value={displayName || ""}
                        fullWidth
                        autoFocus
                        size="small"
                        margin="normal"
                        id="outlined-basic"
                        placeholder=" Display Name"
                        variant="outlined"
                      />
                    </Box>
                    {/* -------- */}
                    <label>
                      {" "}
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: 17,
                          fontWeight: 700,
                          fontFamily: "Montserrat",
                          fontStyle: "normal",
                        }}
                      >
                        System Name<span style={{ color: "#FF0000" }}>*</span>
                      </Typography>
                    </label>
                    <Box sx={{ maxWidth: "100%" }}>
                      <TextField
                        name="systemName"
                        type="text"
                        onChange={(e) => {
                          setSystemName(e.target.value);
                        }}
                        value={systemName || ""}
                        fullWidth
                        autoFocus
                        size="small"
                        margin="normal"
                        id="outlined-basic"
                        placeholder="System Name"
                        variant="outlined"
                      />
                    </Box>

                    <label>
                      {" "}
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: 17,
                          fontWeight: 700,
                          fontFamily: "Montserrat",
                          fontStyle: "normal",
                        }}
                      >
                        Data Type<span style={{ color: "#FF0000" }}>*</span>
                      </Typography>
                    </label>
                    <Box sx={{ maxWidth: "100%" }}>
                      <FormControl fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="dataType"
                          onChange={(e) => {
                            setDataType(e.target.value);
                          }}
                          value={dataType}
                        >
                          <MenuItem value={"string"}>String</MenuItem>
                          <MenuItem value={"number"}>Number</MenuItem>
                        </Select>
                      </FormControl>
                      {/* <TextField
                        name="dataType"
                        type="text"
                        onChange={onChangeHandler}
                        value={(formDt && formDt["dataType"]) || ""}
                        fullWidth
                        autoFocus
                        size="small"
                        margin="normal"
                        id="outlined-basic"
                        placeholder=" Data Type"
                        variant="outlined"
                      /> */}
                    </Box>
                    <label>
                      {" "}
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: 17,
                          fontWeight: 700,
                          fontFamily: "Montserrat",
                          fontStyle: "normal",
                        }}
                      >
                        Variable Type<span style={{ color: "#FF0000" }}>*</span>
                      </Typography>
                    </label>
                    <Box sx={{ maxWidth: "100%" }}>
                      <FormControl fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="variableType"
                          onChange={(e) => {
                            setVariableType(e.target.value);
                          }}
                          value={variableType}
                        >
                          <MenuItem value={"application"}>Application</MenuItem>
                          <MenuItem value={"contact"}>Contact</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <label>
                      {" "}
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: 17,
                          fontWeight: 700,
                          fontFamily: "Montserrat",
                          fontStyle: "normal",
                        }}
                      >
                        Description
                      </Typography>
                    </label>
                    <Box sx={{ maxWidth: "100%" }}>
                      <TextField
                        name="description"
                        type="text"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        value={description}
                        fullWidth
                        autoFocus
                        size="small"
                        margin="normal"
                        id="outlined-basic"
                        placeholder="Description"
                        variant="outlined"
                      />
                    </Box>
                  </FormControl>
                  <p style={{ color: "red" }}>{error}</p>
                </DialogContent>
                <div style={{ marginBottom: 100 }}>
                  <DialogActions
                    style={{ display: "flex", justifyContent: "left" }}
                  >
                    <Button
                      variant="contained"
                      onClick={onSubmit}
                      style={{ marginLeft: 16 }}
                    >
                      Create Variable
                    </Button>
                  </DialogActions>
                </div>
              </Box>
            </Dialog>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: "right" }}>
            <Dialog
              open={openEdit}
              onClose={() => {
                handleCloseEdit();
              }}
              fullWidth
              m={4}
            >
              <Box sx={{ width: 1000, maxWidth: "100%" }}>
                <BootstrapDialogTitle
                  id="customized-dialog-title"
                  onClose={() => {
                    handleCloseEdit();
                  }}
                >
                  <Typography
                    variant="h6"
                    style={{ fontSize: 30, fontFamily: "Gilroy-Bold" }}
                  >
                    Edit Custom Variable
                  </Typography>
                </BootstrapDialogTitle>

                <DialogContent>
                  <FormControl
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
                    <label>
                      {" "}
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: 17,
                          fontWeight: 700,
                          fontFamily: "Montserrat",
                          fontStyle: "normal",
                        }}
                      >
                        Display Name
                        <span style={{ color: "#FF0000" }}>*</span>
                      </Typography>
                    </label>
                    <Box sx={{ maxWidth: "100%" }}>
                      <TextField
                        name="displayName"
                        type="text"
                        onChange={(e) => {
                          setDisplayNameUpdate(e.target.value);
                        }}
                        value={displayNameUpdate}
                        fullWidth
                        autoFocus
                        size="small"
                        margin="normal"
                        id="outlined-basic"
                        placeholder="Text"
                        variant="outlined"
                      />
                    </Box>
                    {/* -------- */}
                    <label>
                      {" "}
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: 17,
                          fontWeight: 700,
                          fontFamily: "Montserrat",
                          fontStyle: "normal",
                        }}
                      >
                        System Name<span style={{ color: "#FF0000" }}>*</span>
                      </Typography>
                    </label>
                    <Box sx={{ maxWidth: "100%" }}>
                      <TextField
                        name="systemName"
                        disabled
                        type="text"
                        onChange={(e) => {
                          setSystemNameUpdate(e.target.value);
                        }}
                        value={systemNameUpdate}
                        fullWidth
                        autoFocus
                        size="small"
                        margin="normal"
                        id="outlined-basic"
                        placeholder="Text"
                        variant="outlined"
                      />
                    </Box>

                    <label>
                      {" "}
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: 17,
                          fontWeight: 700,
                          fontFamily: "Montserrat",
                          fontStyle: "normal",
                        }}
                      >
                        Data Type<span style={{ color: "#FF0000" }}>*</span>
                      </Typography>
                    </label>
                    <Box sx={{ maxWidth: "100%" }}>
                      <FormControl fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="dataType"
                          disabled
                          value={dataTypeUpdate}
                          onChange={(e) => {
                            setDataTypeUpdate(e.target.value);
                          }}
                        >
                          <MenuItem value={"string"}>String</MenuItem>
                          <MenuItem value={"number"}>Number</MenuItem>
                        </Select>
                      </FormControl>
                      {/* <TextField
                        name="dataType"
                        type="text"
                        onChange={(e) => {
                          setDataTypeUpdate(e.target.value);
                        }}
                        value={dataTypeUpdate}
                        fullWidth
                        autoFocus
                        size="small"
                        margin="normal"
                        id="outlined-basic"
                        placeholder="Text"
                        variant="outlined"
                      /> */}
                    </Box>
                    <label>
                      {" "}
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: 17,
                          fontWeight: 700,
                          fontFamily: "Montserrat",
                          fontStyle: "normal",
                        }}
                      >
                        Variable Type<span style={{ color: "#FF0000" }}>*</span>
                      </Typography>
                    </label>
                    <Box sx={{ maxWidth: "100%" }}>
                      <FormControl fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="variableType"
                          disabled
                          value={variableTypeUpdate}
                          onChange={(e) => {
                            setVariableTypeUpdate(e.target.value);
                          }}
                        >
                          <MenuItem value={"application"}>Application</MenuItem>
                          <MenuItem value={"contact"}>Contact</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <label>
                      {" "}
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: 17,
                          fontWeight: 700,
                          fontFamily: "Montserrat",
                          fontStyle: "normal",
                        }}
                      >
                        Description
                      </Typography>
                    </label>
                    <Box sx={{ maxWidth: "100%" }}>
                      <TextField
                        name="description"
                        type="text"
                        onChange={(e) => {
                          setDescriptionUpdate(e.target.value);
                        }}
                        value={descriptionUpdate}
                        fullWidth
                        autoFocus
                        size="small"
                        margin="normal"
                        id="outlined-basic"
                        placeholder="Text"
                        variant="outlined"
                      />
                    </Box>
                  </FormControl>
                </DialogContent>
                <p style={{ color: "red", marginLeft: 26 }}>{errorEdit}</p>
                <div style={{ marginBottom: 100, marginLeft: 16 }}>
                  <DialogActions
                    style={{ display: "flex", justifyContent: "left" }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => editVariable(rowsId)}
                    >
                      Edit Variable
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
          {/* <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <SearchOutlinedIcon fontSize="medium" />
            </Grid>
            <TextField
              id="input-with-icon-textfield"
              label="Search"
              variant="standard"
              onChange={(e) => {
                setSearchKey(e.target.value);
              }}
            />
          </Grid> */}
          <TextField
            fullWidth
            id="input-with-icon-textfield"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon fontSize="medium" />
                </InputAdornment>
              ),
            }}
            variant="standard"
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
          />
          `
        </Grid>
        {/* active-user-display-section */}
        <Grid item xs={12} md={2} style={{ marginLeft: 20 }}>
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
        </Grid>
        {/* other-icon-set */}
        {/* <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: "right" }}>
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
              <TuneOutlined sx={{ color: "gray" }} />
            </IconButton>
          </Box>
        </Grid> */}
      </Grid>

      <Grid container mb={5}>
        <Grid item xs={12} mt={4}>
          <TableContainer style={{ backgroundColor: "transparent" }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    style={{
                      color: "#858585",
                      fontFamily: "Montserrat",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    FIELD
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "#858585",
                      fontFamily: "Montserrat",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    DISPLAY NAME
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "#858585",
                      fontFamily: "Montserrat",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    TYPE
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "#858585",
                      fontFamily: "Montserrat",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    VARIABLE TYPE
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "#858585",
                      fontFamily: "Montserrat",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    UPDATED
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "#858585",
                      fontFamily: "Montserrat",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    DESCRIPTION
                  </TableCell>
                  {/* <TableCell align="left">Updated</TableCell> */}
                  {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                </TableRow>
              </TableHead>
              {/* field,displayName,type,variableType,update,description */}
              <TableBody>
                {data
                  ?.filter((data) => {
                    if (searchKey == "") {
                      return data;
                    } else {
                      return data?.displayName?.toLowerCase()?.includes(searchKey?.toLocaleLowerCase())
                      || data?.dataType?.toLowerCase()?.includes(searchKey?.toLocaleLowerCase())
                      || data?.description?.toLowerCase()?.includes(searchKey?.toLocaleLowerCase())
                      || data?.systemName?.toLowerCase()?.includes(searchKey?.toLocaleLowerCase())
                      || data?.variableType?.toLowerCase()?.includes(searchKey?.toLocaleLowerCase())
                    }
                  })
                  .slice(pages * rowsPerPage, pages * rowsPerPage + rowsPerPage)
                  .map((row, key) => (
                    <TableRow
                      key={key}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      onClick={() => {
                        console.log(row.rowId);
                        setOnClickObj(row);
                        setRowsId(row.rowId);
                        handleOpenModify();
                      }}
                      tabIndex={-1}
                      hover
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          color: "#393939",
                          fontFamily: "Montserrat",
                          fontSize: 16,
                          fontWeight: 700,
                        }}
                      >
                        {row?.systemName}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          color: "#858585",
                          fontFamily: "Montserrat",
                          fontSize: 16,
                          fontWeight: 500,
                        }}
                      >
                        {row?.displayName}
                      </TableCell>

                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          color: "#858585",
                          fontFamily: "Montserrat",
                          fontSize: 16,
                          fontWeight: 500,
                        }}
                      >
                        {row?.dataType}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          color: "#858585",
                          fontFamily: "Montserrat",
                          fontSize: 16,
                          fontWeight: 500,
                        }}
                      >
                        <span
                          className="verified_label"
                          style={{
                            color: "green",
                            backgroundColor: " #C1C1C1 ",
                          }}
                        >
                          {" "}
                          {row?.variableType}
                        </span>
                      </TableCell>

                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          color: "#858585",
                          fontFamily: "Montserrat",
                          fontSize: 16,
                          fontWeight: 500,
                        }}
                      >
                        <Stack direction="row" spacing={2}>
                        <Avatar alt={row?.updatedBy?.split("#")[1]}  src={`${s3URL}/${users?.filter((user)=>{ return user?.PK == row?.updatedBy})[0]?.imageId}`} />
                          <span>{row?.uT}</span>
                        </Stack>
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          color: "#858585",
                          fontFamily: "Montserrat",
                          fontSize: 16,
                          fontWeight: 500,
                        }}
                      >
                        {row?.description}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={data?.length || 0}
            rowsPerPage={rowsPerPage}
            page={pages}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>

      {/* common model */}
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={openModify}
          onClose={handleCloseModify}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Button
              onClick={() => {
                setDisplayNameUpdate(onClickObj?.displayName);
                setSystemNameUpdate(onClickObj?.systemName);
                setDataTypeUpdate(onClickObj?.dataType);
                setDescriptionUpdate(onClickObj?.description);
                setVariableTypeUpdate(onClickObj?.variableType);
                handleClickOpenEdit();
              }}
            >
              Edit variable
            </Button>
            <br />
            <Button
              onClick={() => {
                deleteVariabel(rowsId);
              }}
            >
              Delete variable
            </Button>
          </Box>
        </Modal>
      </div>
    </Box>
  );
}

Variable.layout = "AdminLayout";

export default Variable;
