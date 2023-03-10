import React, { useEffect, useContext,useRef, useLayoutEffect  } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Slide,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Elderly, TuneOutlined } from "@mui/icons-material";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import moment from "moment";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import { Autocomplete } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import Image from "next/image";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import Select from '@mui/material/Select';

import { useState } from "react";
import { _fetchAllContacts, _deleteContact, _assignContact } from "../../services/contactServices";
import Link from "next/link";
import { _gatVariabels } from '../../services/variabelService.js';
import { _getAllPlatformUserByAdmin, _getUser ,_getUserByIdArray} from '../../services/authServices'
import { s3URL } from '../../utils/config'
import { Context } from "../../context";
import { _getContacts, _getContactBySearch } from "../../services/webService.js";

const label = { inputProps: { "aria-label": "Switch demo" } };

// table-with-pagination-------------------
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
    <Box sx={{ flexShrink: 0, ml: 2.5 }} >
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Contact() {
const { state, dispatch} = useContext(Context);
const profile = state?.user || {}
console.log("169",profile)
const [anchorElLabelDropDown, setAnchorElLabelDropDown] = useState(null);
const openLabelDropDown = Boolean(anchorElLabelDropDown);
const handleClickLabelDropDown = (event) => {
  setAnchorElLabelDropDown(event.currentTarget);
};
const handleCloseLabelDropDown = () => {
  setAnchorElLabelDropDown(null);
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
  const [contactData, setContactData] = useState([]);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [users, setUsers] = useState([]);
  const [platfromUsers, setPlatfromUsers] = useState([]);
  const [variableData, setVariableData] = useState([]);
  const [avatarFilterSelect, setAvatarFilterSelect] =useState("all");
  const [openAssignContact, setOpenAssignContact] = useState(false);
  const [assignedUser,setAssignedUser] = useState("")
  const [assignedContact,setAssignedContact] = useState("")
  const [assignContactMsg, setAssignContactMsg] = useState();
  const [assignContactFormError, setAssignContactFormError] = useState("");
  const [source, setSource] = useState("Application")
  const [searchKey, setSearchKey] = useState('');
  const [searchKeyWeb, setSearchKeyWeb] = useState('');
  const seen = new Set();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selected, setSelected] = React.useState();

  console.log("C DATA ", contactData)
  const fetchPlatformUsersAndLoginUser = async () =>{
    try{
      const loginUser = await _getUser();
      const platformUsers = await _getAllPlatformUserByAdmin();
      let users = [loginUser?.data,...platformUsers?.data?.users];
      setUsers(users)
    }catch(err){
      console.log(err)
    }
  }
  const handleClickOpenAssignContact = () => {
    setOpenAssignContact(true);
  };
   const handleCloseAssignContact = () => {
    setOpenAssignContact("")
    setAssignedUser("")
    setAssignedContact("")
    setAssignContactFormError("")
    setOpenAssignContact(false);
  };

  const fetchData = async () => {
    setLoading(true);
    const response = await _fetchAllContacts();
    const responseWeb = await fetchWebContacts()
    
    console.log("fetchWebContacts",responseWeb)
    console.log("_fetchAllContacts",response)
    const resPlatformUsers = await _getAllPlatformUserByAdmin();
    setPlatfromUsers(resPlatformUsers?.data?.users)
    
    // fetch users 
    let usersFilterFromContacts = [];
    await response?.data?.Items?.map((contact)=>{
      usersFilterFromContacts.push(contact?.createdBy?.split("#")[1] || "")
      usersFilterFromContacts.push(contact?.updatedBy?.split("#")[1]  || "")
    })
    let uniqueUsersFilterFromContacts = [...new Set(usersFilterFromContacts)]?.filter((user) => user !="" && user != null)

    let body = { users:uniqueUsersFilterFromContacts }
    const responseUsers = await _getUserByIdArray(body)
    setUsers(responseUsers?.data?.users)

    setLoading(false);
    if (response?.status === 200) {
      let tableDt = await response?.data?.Items.sort((a, b) => (a.createTime < b.createTime) ? 1 : ((b.createTime < a.createTime) ? -1 : 0));
      setContactData([...tableDt,...responseWeb]);
    }
  }

  const getVariables = async () => {
    try {
      const res = await _gatVariabels();
      let data = await res?.data?.data?.Items.filter((variable) => variable?.variableType == "contact")
      data = await data.sort((a, b) => (a.createTime > b.createTime) ? 1 : ((b.createTime > a.createTime) ? -1 : 0));
      console.log(res)
      setVariableData([...data])
    } catch (err) {
      console.log(err)
    }
  }
  const assignContact = async () => {
    try{
      if(assignedUser && assignedUser != "" && assignedContact && assignedContact !=""){
        setAssignContactFormError("")
        let contactId = `CONTACT_${assignedContact?.split("|")[1]}`
        let userId = `USER#${assignedUser?.split("|")[0]}`
        let connect = await contactData?.filter((contact) => contact?.PK == contactId) 
        if(!connect[0]?.assignTo?.includes(userId)){
          setAssignContactFormError("")
          let body ={
            assignTo:[...connect[0]?.assignTo,userId]
          }
          const response = await _assignContact(contactId,body);
          if(response?.status == 200){
            fetchData()
            handleCloseAssignContact()
            setAssignContactMsg({ severity: 'success', message: `Contact is assigned to ${assignedUser?.split("|")[0]}` })
          }else{
            fetchData()
            setAssignContactMsg({ severity: 'error', message: 'Contact is assignment failed' })
          }
        }else{
          setAssignContactFormError("You have already assigned this user!")
        }

      }else{
        setAssignContactFormError("Please select a user and contact!")
      }
     
    }catch(err){
      console.log(err)
    }
    
  }
  
  const fetchWebContacts = async()=>{
    try{
      const response = await _getContacts();
      if(response?.status == 200){
        let formatedData = await response?.data?.map((row) => ({
          basicInformation:{
          firstName: row?.first_name,
          lastName: row?.last_name,
          primaryNumber: row?.user_phone,
          emailAddress: row?.user_email,
          reservationCode:row?.contactid
        }}))
        return formatedData
      }
    }catch(err){
      console.log(err)
    }
  }

  const fetchWebContactsBySearch = async()=>{
    try{
      const response = await _getContactBySearch(searchKey);
      console.log("_getContacts",response)
      if(response?.status == 200){
        let formatedData = await response?.data?.map((row) => ({
          basicInformation:{
          firstName: row?.first_name,
          lastName: row?.last_name,
          primaryNumber: row?.user_phone,
          emailAddress: row?.user_email,
          reservationCode:row?.contactid
          
        }}))
        setContactData([...contactData,...formatedData])
      }
    }catch(err){
      console.log(err)
    }
  }

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    fetchWebContactsBySearch()
  },[searchKey]);

  useEffect(() => {
      fetchData()
      //getVariables()
  }, [trigger])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickDelete = async (id) => {
    setLoading(true);
    const response = await _deleteContact(id);
    setLoading(false);
    setSelected();
    if (response?.status === 200) {
      setTrigger(moment())
      console.log("Contact Deleted")
    } else {
      console.log("Contact Deletion failed")
    }
  };

  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleContinue = () => {
    router.push("/application/new-application");
  };

  const handleAddContacts = () => {
    router.push("/contact/add");
  };

  // table-related---

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - contactData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // table-related---

  // application-related-function--
  const [showContent, setShowContent] = useState(false);

  const handleEditDetails = () => {
    setShowContent(!showContent);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClickContact = (id) => {
    setSelected(id);
  }


  return (
    <div>
        <Box p={3} style={{ marginTop: 40 }}>
          <Dialog open={selected?.length > 0} onClose={() => setSelected()}>
            <DialogTitle>Actions</DialogTitle>
            <DialogContent>
              <Stack direction="column" spacing={2}>
                <Button
                  onClick={() => router.push(`/contact/view-edit-contact?contactId=${selected}`)}
                  variant="contained"
                >
                  Edit Contact
                </Button>
                <Button
                  onClick={() => handleClickDelete(selected)}
                  variant="outlined"
                  color="error"
                >
                  Delete Contact
                </Button>
              </Stack>
            </DialogContent>
          </Dialog>
          {/* 1st-header-section */}
          <Grid container mb={5}>
            <Grid item xs={12} md={4}>
              <h1 className="page_header">Contacts</h1>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box sx={{ textAlign: "right" }}>
                <Link href={"/contact/import"}>
                  <Button variant="contained" sx={{ padding: "10px 40px" }}>
                    Upload List
                  </Button>
                </Link>
               <Button
                  variant="contained"
                  sx={{ padding: "10px 40px" }}
                  style={{ marginLeft: 20 }}
                  onClick={handleAddContacts}
                >
                  Add Contacts
                </Button>
               
                
                {(profile?.role == "OWNER" || profile?.role ==  "ADMIN") &&  <Button
                  variant="contained"
                  sx={{ padding: "10px 40px" }}
                  style={{ marginLeft: 20 }}
                  onClick={handleClickOpenAssignContact}
                >
                  Assign Contact
                </Button>}
                <Dialog open={openAssignContact} onClose={handleCloseAssignContact} fullWidth m={4}>
                <DialogTitle>
                  <Typography
                    variant="h6"
                    style={{
                      fontSize: 21,
                      fontWeight: 700,
                      fontStyle: "normal",
                    }}
                  >
                    Assign Connect
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  <Stack direction="column" spacing={2}>
      
                    <FormControl>
                      <label style={{ marginBottom: 6 }}>Select User</label>
                      <Autocomplete
                        value={assignedUser}
                        renderInput={(params) => (
                          <TextField {...params} size="small" label="User" />
                        )}
                        onChange={(e, val) => { 
                          setAssignedUser(val)
                         }}
                        options={platfromUsers?.map((user) => {
                          let s = `${user?.PK?.split("#")[1]}|${(user?.info?.firstName|| user?.info?.lastName) ? user?.info?.firstName+" "+user?.info?.lastName:"No user name"} `;
                          return s;
                        })}
                      ></Autocomplete>
                    </FormControl>
                    <FormControl>
                      <label style={{ marginBottom: 6 }}>Select Contact</label>
                      <Autocomplete
                        value={assignedContact}
                        renderInput={(params) => (
                          <TextField {...params} size="small" label="Contact" />
                        )}
                        onChange={(e, val) => { 
                          setAssignedContact(val)
                         }}
                        options={contactData?.map((contact) => {
                          let s = `${contact?.basicInformation?.firstName} ${contact?.basicInformation?.lastName}|${contact?.PK?.split("_")[1]}`;
                          return s ;
                        })}
                      ></Autocomplete>
                    </FormControl>
                    <p style={{color:"red"}}>{assignContactFormError}</p>
                    <FormControl style={{display:"flex", justifyContent:"flex-end", alignItems:'flex-end'}}>
                      <Button
                        onClick={assignContact}
                        variant="contained"
                        sx={{ maxWidth: 220, marginTop: 2, marginBottom: 2 }}
                      >
                        Assign Contact
                      </Button>
                    </FormControl>
                  </Stack>
                </DialogContent>
              </Dialog>

              <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={assignContactMsg}
                autoHideDuration={3000}
                onClose={() => setAssignContactMsg()}
              >
                <Alert variant="filled" severity={assignContactMsg?.severity}>
                  {assignContactMsg?.message}
                </Alert>
              </Snackbar>
              
              </Box>
            </Grid>
          </Grid>

          {/* body-content-tab-set */}
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Contacts" {...a11yProps(0)} />
                <Tab label="Lists" {...a11yProps(1)} />
              </Tabs>
            </Box>

            {/* task-related-tab */}
            <TabPanel value={value} index={0}>
              {/* 2st-header-section */}

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
                              value={searchKey}
                              id="input-with-icon-textfield"
                              label="Search"
                              variant="standard"
                              onChange={(e) => {
                                setSearchKey(e.target.value);
                              }}
                            />
                          </Grid>

                      {/* active-user-display-section */}

                          <AvatarGroup total={users?.length} onClick={handleClickLabelDropDown}>
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
                              <MenuItem style={{borderRadius:0, width:"100%", backgroundColor: avatarFilterSelect == "all" ? "#e6e6e6":"white" }} onClick={()=>{setAvatarFilterSelect("all")}}>
                                <Chip label={"All"} avatar={<Avatar alt='' src="" /> } />
                              </MenuItem>
                              {users && users.map((user, key) => {
                                
                                return (
                                  <MenuItem key={key} style={{backgroundColor: avatarFilterSelect == user?.PK.split("#")[1] ? "#e6e6e6":"white"}}>
                                    <Chip
                                        onClick={()=>{
                                          setAvatarFilterSelect(user?.PK.split("#")[1])}}
                                        style={{ width:"100%"}}
                                        label={user?.PK.split("#")[1]}
                                        avatar={
                                        <Avatar
                                          alt={user?.PK.split("#")[1]}
                                          src={`${s3URL}/${user?.imageId}`}
                                        />
                                        }
                                      />
                                  </MenuItem>
                                );
                              })}
                            </Menu>
                          </div>
                    </Stack>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  {/* other-icon-set */}
                  {/* <Grid item xs={12} md={6}> */}
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
              {contactData && contactData.length > 0 && (
                <Grid container>
                  <TableContainer>
                    <Table
                      sx={{ minWidth: 500 }}
                      aria-label="custom pagination table"
                    >
                      <TableHead>
                        <TableRow>
                          {/* {variableData && variableData.map((variable, key) => {
                            return (<TableCell key={key}
                              align="left"
                              style={{ fontSize: 14, fontWeight: 700 }}
                            >
                              {variable?.displayName}
                            </TableCell>)
                          })} */}
                          <TableCell
                            align="left"
                            style={{ fontSize: 14, fontWeight: 700 }}
                          >
                            NAME
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ fontSize: 14, fontWeight: 700 }}
                          >
                            RESERVATION CODE
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ fontSize: 14, fontWeight: 700 }}
                          >
                            PHONE
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ fontSize: 14, fontWeight: 700 }}
                          >
                            EMAIL
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ fontSize: 14, fontWeight: 700 }}
                          >
                            CREATED
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ fontSize: 14, fontWeight: 700 }}
                          >
                            UPDATED
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {console.log("contactData",contactData)}
                        {contactData?.filter(el => {
                          if(el?.basicInformation?.reservationCode){
                            const duplicate = seen.has(el?.basicInformation?.reservationCode);
                            seen.add(el?.basicInformation?.reservationCode);
                            return !duplicate;
                          }else{
                            return el
                          }
                        })?.filter((data)=>{
                            if(avatarFilterSelect == "all") return data
                            if((data?.createdBy?.split("#")[1] == avatarFilterSelect || data?.updatedBy?.split("#")[1] == avatarFilterSelect) ) return data;
                          })
                        ?.filter((data) => {
                            if (searchKey == "") {
                              return data;
                            } else {
                              return data?.basicInformation?.reservationCode?.includes(searchKey)
                              || data?.basicInformation?.emailAddress?.toLowerCase()?.includes(searchKey.toLocaleLowerCase())
                              || data?.basicInformation?.firstName?.toLowerCase()?.includes(searchKey.toLocaleLowerCase())
                              || data?.basicInformation?.lastName?.toLowerCase()?.includes(searchKey.toLocaleLowerCase())
                              || data?.basicInformation?.primaryNumber?.toLowerCase()?.includes(searchKey.toLocaleLowerCase())
                          
                            }
                          })
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row,key) => {
                            const basicInfo = row?.basicInformation;
                            return (
                              <TableRow
                                className="contact-list-row"
                                key={key}
                                onClick={() => handleClickContact(row.PK)}
                              >
                                <TableCell component="th" scope="row">
                                  {basicInfo?.firstName +
                                    " " +
                                    basicInfo?.lastName}
                                </TableCell>
                                <TableCell align="left">
                                  {basicInfo?.reservationCode}
                                </TableCell>
                                <TableCell align="left">
                                  {basicInfo?.primaryNumber}
                                </TableCell>
                                <TableCell align="left">
                                  {basicInfo?.emailAddress}
                                </TableCell>
                                {/* {variableData && variableData.map((variable, key) => {
                                  return (<TableCell key={key} align="left">{basicInfo[variable?.systemName]}</TableCell>)
                                })} */}
                                <TableCell align="left">
                                  {source != "Web" &&   <div style={{ display: 'inline-flex' }}>
                                    <div>
                                      <Avatar alt={row?.createdBy?.split("#")[1]} src={`${s3URL}/${users?.filter((user) => { return user?.PK == row?.createdBy })[0]?.imageId}`} />
                                    </div>
                                    <div style={{ alignSelf: 'center', marginLeft:5 }}>
                                      {moment(row.createTime).format("YYYY-MM-DD")}
                                    </div>
                                  </div>}
                                
                                </TableCell>
                                <TableCell align="left">
                                {source != "Web" &&  <div style={{ display: 'inline-flex' }}>
                                    <div>
                                      <Avatar alt={row?.updatedBy?.split("#")[1]} src={`${s3URL}/${users?.filter((user) => { return user?.PK == row?.updatedBy })[0]?.imageId}`} />
                                    </div>
                                    <div style={{ alignSelf: 'center', marginLeft:5 }}>
                                      {moment(row.updateTime).format("YYYY-MM-DD")}
                                    </div>
                                  </div>}
                                </TableCell>
                              </TableRow>
                            );
                          })}
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
                            count={contactData.length}
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
                </Grid>
              )}
            </TabPanel>
            <TabPanel value={value} name="email-tab" index={2}>
              {/* 1st-header-section */}
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
                      onClick={handleClickOpen}
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
                  </Box>
                </Grid>
              </Grid>

              <Grid container>
                <Grid xs={8}>
                  <Typography>
                    To connect emails to the DigiFi Loan Origination System,
                    please CC or BCC the following email address on your
                    outbound emails:
                  </Typography>

                  <Typography mt={1}>
                    0-fw19519jeweweeruidfkjdfh@mail.digifyllc
                  </Typography>
                </Grid>

                <Grid xs={4}>
                  <Image
                    src="/Group 455.svg"
                    alt="Picture of the author"
                    width={500}
                    height={500}
                  />
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </Box>
    </div>
  );
}
Contact.layout = "AdminLayout";

export default Contact;
