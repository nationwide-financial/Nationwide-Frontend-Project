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
import {
  CollectionsBookmarkOutlined,
  MoreVert,
  Search,
  TuneOutlined,
} from "@mui/icons-material";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { padding } from "@mui/system";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import styles from "../../components/searchBox/searchBox.module.scss";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import { useRouter } from "next/router";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import Link from "@mui/material/Link";
import SearchBox from "../../components/searchBox/searchBox";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { s3URL } from '../../utils/config'

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
  _getAllPlatformUserByAdmin,
  _addUser,
  _verifyUser,
  _searchPlatformUserByAdmin,
  _deactivateUser,
  _editPermissionGroup
} from "../../services/authServices";

const PlatformUsers = () => {

  // dialog-box-related----
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

  // dialog-box-related----

  const [open, setOpen] = React.useState(false);
  // const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setUser({});
    setOpen(false);
  };

  // edit permission group
  const [openEdit, setOpenEdit] = useState(false);

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setPermissionGroupEdit('')
    setOpenEdit(false);
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

  const [rows, setRows] = useState([]);

  const [rowsId, setRowsId] = useState("");
  const [openModify, setOpenModify] = useState(false);
  const handleOpenModify = () => setOpenModify(true);
  const handleCloseModify = () => {
    setRowsId("");
    setOpenModify(false);
  };

  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const onChangeHandler = useCallback(({ target }) => {
    setUser((state) => ({ ...state, [target.name]: target.value }));
  }, []);
  const onSubmit = async () => {
    console.log("----");
    const body = user;
    if (!user || (user && Object.keys(user).length === 0)) {
      setError("Email and permissionGroup can not be empty");
    } else if (
      (user && user["permissionGroup"] === "") ||
      user["permissionGroup"] === undefined
    ) {
      setError("permissionGroup can not be empty");
    } else if ((user && user["email"] === "") || user["email"] === undefined) {
      setError("Email can not be empty");
    } else {
      setError("");
      console.log(body);
      const response = await _addUser(body);
      console.log(response);

      if (response?.status === 201) {
        handleClose()
        //alert("User added check your mail and set the password!");
        handleSuccessMessage()
        setMessage("User added check your mail and set the password!")
        getTableData();
      } else {
        setError(response?.response.data["message"]);
      }
    }
  };

  const [searchKey, setSearchKey] = useState("");

  async function getTableData() {
    const response = await _getAllPlatformUserByAdmin();
    let tableDt = await response?.data?.users?.sort((a,b) => (a.createTime < b.createTime) ? 1 : ((b.createTime < a.createTime) ? -1 : 0));
    setRows(
      tableDt?.map((row) => ({
        key: row.PK,
        id: row.PK,
        fname: row?.info?.firstName || "",
        lname: row?.info?.lastName || "",
        email: row?.PK.split("#")[1] || "",
        permission: row?.role || "",
        phone_auth: "Disabled",
        status: row?.status || "",
        imageId:row?.imageId
      }))
    );
  }

  const handleDeactivateUser = async (id) => {
    try{
      const idDataArray = id?.split("#");
      let body = {
        status: "DEACTIVE",
      };
      const response = await _deactivateUser(idDataArray[1], body);
     if(response?.status == 200){
      //alert("user deactivated successfuly")
      handleSuccessMessage()
      setMessage("user deactivated successfuly")
      handleCloseModify();
      getTableData();
     }
    }catch(err){
      console.log(err);
    }
   
  };

  const userRoles = [
    {
      value: "OWNER",
      label: "OWNER",
    },
    {
      value: "USER",
      label: "USER",
    },
  ];


  const [permissionGroupEdit,setPermissionGroupEdit] = useState('');
  const [permissionGroupEditError,setPermissionGroupEditError] = useState('');
  const editPermissionGroup = async (id) =>{
    try{
      const idDataArray = id?.split("#");
      if(!id) setPermissionGroupEditError("user id not found")
      if (!permissionGroupEdit || permissionGroupEdit == "" || permissionGroupEdit == null){
        setPermissionGroupEditError("permission group can not be empty !");
      }else{
        setPermissionGroupEditError('')
        let body={
          role:permissionGroupEdit,
        }
        const response = await _editPermissionGroup(idDataArray[1],body)
        console.log(response)
       if(response?.status == 200){
          //alert("permission group updated !")
          handleSuccessMessage()
          setMessage("permission group updated !")
          handleCloseEdit();
          handleCloseModify()
          getTableData();
        }
      }
    }catch(err){
      console.log(err)
    }
  }


  useEffect(() => {
    getTableData();
  }, []);

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
  const [message,setMessage] =useState('');
  const handleSuccessMessage = () => {
    setOpenSuccessMessage(true);
  };

  const handleCloseSuccessMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessage('')
    setOpenSuccessMessage(false);
  };

  return (
    <div style={{ padding:20 , marginTop:40 }}>
      	<Snackbar open={openSuccessMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage}>
        <Alert onClose={handleCloseSuccessMessage} severity="success" sx={{ width:"100%" }} style={{backgroundColor:'lightgreen'}}>
          {message}
        </Alert>
     </Snackbar>
      <Grid container>
        <Grid item xs={12} md={6}>
          <h1 className="page_header">Platform Users</h1>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              sx={{ padding: "10px 40px" }}
              onClick={handleClickOpen}
            >
              Add User
            </Button>

            {/* dialog -start--- */}

            <Dialog open={open} onClose={handleClose} fullWidth m={4}>
              {/* <DialogTitle >New Product</DialogTitle> */}

              <Box sx={{ width: 1000, maxWidth: "100%" }}>
                <BootstrapDialogTitle
                  id="customized-dialog-title"
                  onClose={handleClose}
                >
                  <Typography variant="h6" style={{ fontSize: 30 }}>
                    Add User
                  </Typography>
                </BootstrapDialogTitle>

                <DialogContent>
                  <FormControl
                    style={{ display: "flex", justifyContent: "center" }}
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
                        Email <span style={{ color: "#FF0000" }}>*</span>
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
                        name="email"
                        type="email"
                        onChange={onChangeHandler}
                        value={(user && user["email"]) || ""}
                      />
                    </Box>
                  </FormControl>

                  <FormControl
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Stack
                      direction="row"
                      style={{
                        display: "inline-flex",
                        justifyContent: "space-between",
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
                          Permission Group{" "}
                          <span style={{ color: "#FF0000" }}>*</span>
                        </Typography>
                      </label>
                      <Stack direction="row" spacing={1} pt={1}>
                        <NoteAltOutlinedIcon
                          mt={2}
                          style={{ color: "#1478F1" }}
                        />
                        <Link
                          variant="text"
                          align="right"
                          style={{
                            fontSize: 17,
                            fontWeight: 700,
                            fontStyle: "normal",
                            textDecoration: "none",
                          }}
                        >
                          Edit Permission Group
                        </Link>
                      </Stack>
                    </Stack>
                    <Box sx={{ maxWidth: "100%" }}>
                    <TextField
                      id="outlined-basic"
                      select
                      value={(user && user["permissionGroup"]) || ""}
                      name="permissionGroup"
                      fullWidth
                      size="small"
                      margin="normal"
                      onChange={onChangeHandler}
                    >
                      {userRoles.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          onClick={onChangeHandler}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    </Box>
                  </FormControl>
                  <p style={{ color: "red" }}>{error}</p>
                </DialogContent>
                <div style={{ marginBottom: 100 , marginLeft:'16px'}}>
                  <DialogActions
                    style={{ display: "flex", justifyContent: "left" }}
                  >
                    <Button variant="contained" onClick={onSubmit}>
                      Add User
                    </Button>
                  </DialogActions>
                </div>
              </Box>
            </Dialog>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: "right" }}>
            <Dialog open={openEdit} onClose={handleCloseEdit} fullWidth m={4}>
              {/* <DialogTitle >New Product</DialogTitle> */}

              <Box sx={{ width: 1000, maxWidth: "100%" }}>
                <BootstrapDialogTitle
                  id="customized-dialog-title"
                  onClose={handleCloseEdit}
                >
                  <Typography variant="h6" style={{ fontSize: 30 }}>
                    Edit Permission Group
                  </Typography>
                </BootstrapDialogTitle>
                <DialogContent>
                  <FormControl
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <label style={{ marginTop: 10 }}>
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: 17,
                          fontWeight: 700,
                          fontStyle: "normal",
                        }}
                      >
                        Permission Group
                        <span style={{ color: "#FF0000" }}>*</span>
                      </Typography>
                    </label>
                    <TextField
                      id="outlined-basic"
                      select
                      value={permissionGroupEdit}
                      name="permissionGroupEdit"
                      fullWidth
                      size="small"
                      margin="normal"
                      onChange={(e) => {
                        setPermissionGroupEdit(e.target.value);
                      }}
                    >
                      {userRoles.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          onClick={() => {
                            setPermissionGroupEdit(option.value);
                          }}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                  <p style={{ color: "red" }}>{permissionGroupEditError}</p>
                </DialogContent>
                <div style={{ marginBottom: 100 , marginLeft:'16px'}}>
                  <DialogActions
                    style={{ display: "flex", justifyContent: "left" }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => editPermissionGroup(rowsId)}
                    >
                      Update
                    </Button>
                  </DialogActions>
                </div>
              </Box>
            </Dialog>
          </Box>
        </Grid>
      </Grid>
      <Grid container mt={2}>
        <Grid item xs={12} md={4}>
          {/* <SearchBox /> */}
          <div className={styles.search}>
            <SearchOutlinedIcon className={styles.icon} fontSize="medium" />
            <TextField
              onChange={(e) => {
                setSearchKey(e.target.value.toLowerCase());
              }}
              className={styles.input}
              id="input-with-icon-textfield"
              label="Search"
              variant="standard"
            />
          </div>
        </Grid>
        <Grid xs={12} md={2}></Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: "right" }}>
            {/* <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} />}
              label="Show inactive"
            />
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
            </IconButton> */}
          </Box>
        </Grid>
      </Grid>
      <TableContainer
        component={Paper}
        sx={{ marginTop: 5, boxShadow: "none !important" }}
      >
        <Table
          sx={{ minWidth: 650, backgroundColor: "#F0F7FF" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <b>FIRST NAME</b>
              </TableCell>
              <TableCell>
                <b>LAST NAME</b>
              </TableCell>
              <TableCell>
                <b>EMAIL</b>
              </TableCell>
              <TableCell>
                <b>PERMISSION TYPE</b>
              </TableCell>
              <TableCell>
                <b>PHONE AUTHENTICATION</b>
              </TableCell>
              <TableCell>
                <b>ACCOUNT STATUS</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows?.filter((data)=>{
                if(searchKey == ''){
                  return data;
                }else{
                  return data?.email.toLowerCase().includes(searchKey.toLocaleLowerCase()) ;
                }
              })
                .slice(pages * rowsPerPage, pages * rowsPerPage + rowsPerPage)
                .map((row, key) => (
                  <TableRow
                    key={key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    hover
                    onClick={() => {
                      console.log(row.id);
                      setRowsId(row.id);
                      handleOpenModify();
                    }}
                    tabIndex={-1}
                  >
                    <TableCell component="th" scope="row">   
                        <Avatar alt={row?.PK?.split("#")[1]}  src={`${s3URL}/${row?.imageId}`} />
                        {row?.fname}
                    </TableCell>
                    <TableCell>{row?.lname}</TableCell>
                    <TableCell>{row?.email}</TableCell>
                    <TableCell>{row?.permission}</TableCell>
                    <TableCell>{row?.phone_auth}</TableCell>
                    <TableCell>
                      {row?.status == "DEACTIVE" ? (
                        <span style={{ backgroundColor: "red" , color:"white", borderRadius:'5px' }}>
                          <span style={{margin:'3px'}}>{row?.status}</span>
                          
                        </span>
                      ) : row?.status == "ACTIVE" ? (
                        <span style={{ backgroundColor: "green", color:"white", borderRadius:'5px'  }}>
                         <span style={{margin:'3px'}}>{row?.status}</span>
                        </span>
                      ) : (
                        row?.status == "PENDING" && (
                          <span style={{ backgroundColor: "orange" , color:"white", borderRadius:'5px' }}>
                            <span style={{margin:'3px'}}>{row?.status}</span>
                          </span>
                        )
                      )}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={pages}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
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
                handleClickOpenEdit();
              }}
            >
              Edit permission Group
            </Button>
            <br />
            <Button
              onClick={() => {
                handleDeactivateUser(rowsId);
              }}
            >
              Deactivate User
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

PlatformUsers.layout = "AdminLayout";
export default PlatformUsers;
