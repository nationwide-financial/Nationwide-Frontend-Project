import React, { useState, useEffect } from "react";
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

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AvatarGroup from "@mui/material/AvatarGroup";
import { TuneOutlined } from "@mui/icons-material";
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
import SyncAltOutlinedIcon from "@mui/icons-material/SyncAltOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ViewCompactOutlinedIcon from "@mui/icons-material/ViewCompactOutlined";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { height } from "@mui/system";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import Checkbox from "@mui/material/Checkbox";
import SearchBox from "../../components/searchBox/searchBox";
import styles from '../../components/searchBox/searchBox.module.scss'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LoanApplicatioTable from "../../components/table/table";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
import { useRouter } from "next/router";
import LoanAppDialogFormController from "../../components/applicationTableDialogboxFormController/loanApplicationDialogFormController";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";

import { s3URL } from '../../utils/config'
import { _getAllPlatformUserByAdmin, _getUser } from '../../services/authServices'
import { _getApplications } from '../../services/applicationService';
import { _listLabel } from '../../services/labelService'
import { _fetchAllContacts } from '../../services/contactServices'
import { _gatLoanType } from "../../services/loanTypeService.js";



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// ----------------

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

// card-related---

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>

      <Typography sx={{ mb: 1.5 }} color="text.secondary style_">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

// card-related---

function ApplicationTableView() {

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

  // const [value, setValue] = useState("t");
  const [tableData, setTableData] = useState([])
  const [teamMembersArr, setTeamMembersArr] = useState([]);
  const router = useRouter();
  const [searchKey, setSearchKey] = useState("");
  const [avatarFilterSelect, setAvatarFilterSelect] =useState("all");

  console.log(searchKey)
  // const changeStatOfElement = () =>{

  // }
  const [coContact, setCoContact] = useState(false)
  const [loanTypeData, setLoanTypeData] = useState([]);

  const getLoanType = async () => {
    try {
      const res = await _gatLoanType();
      setLoanTypeData(res?.data?.data?.Items)
    } catch (err) {
      console.log(err)
    }
  };

  const handleContinue = () => {
    if (coContact) {
      router.push(`/contact/addApplication/${product}/coEnabled`);
      // router.push(`/application/application-form?product=${product}&coEnable=${1}`);
    } else {
      router.push(`/contact/addApplication/${product}/coDisabled`);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setProduct('')
    setOpen(false);
  };

  const handelSelectProduct = (id) => {
    setProduct(id)
  }

  const [product, setProduct] = useState('');

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
  async function getLabels() {
    try {
      const response = await _listLabel();
      // console.log("_listLabel",response);
      return response.data.data.Items

    } catch (err) {
      console.log(err)
    }
  }

  async function getTableData() {
    try {
      const res = await _getApplications();
      // console.log("resresresresresres",res)
      //  console.log(res?.data?.data?.Items)
      let tableDt = await res?.data?.data?.Items.sort((a, b) => (a.createTime < b.createTime) ? 1 : ((b.createTime < a.createTime) ? -1 : 0));

      console.log("_getApplications", tableDt)
      mergeDocuments(tableDt)
    } catch (err) {
      console.log(err)
    }
  }

  const mergeDocuments = async (tempApplications) => {
    try {
      const res = await _getAllPlatformUserByAdmin();
      const loginUser = await _getUser();
      console.log("loginUser",loginUser?.data)
      const resContact = await _fetchAllContacts();
      let tempUsers = [...res?.data?.users,loginUser?.data];
      let userIds = [];
      let teamMembers = [];
      await tempApplications.map(async (tempApplications) => {
        if (tempApplications?.members) {
          await userIds.push(...tempApplications?.members)
        }
      })
      let removedduplicatesUsers = [...new Set(userIds)];
      await removedduplicatesUsers.map(async (id) => {
        let tempU = await tempUsers.filter((user) => user?.PK == 'USER#' + id)
        teamMembers.push(...tempU)
      })
      setTeamMembersArr([...teamMembers])

      let labelsArr = await getLabels();
      console.log("labels", labelsArr)

      let tableDataArry = [];
      await tempApplications.map((application) => {
        let object = {}
        let team = [];
        let labels = [];
        let contact = {};
        object.application = application
        if (application?.members) {
          application?.members.map((user) => {
            team.push(...teamMembers.filter((member) => { return member?.PK == 'USER#' + user }));
          })
          object.teamArr = team;
        }

        if (application?.appLabel) {
          application?.appLabel.map((applabel) => {
            labels.push(...labelsArr.filter((label) => { return label?.PK == applabel }));
          })
          object.labelArr = labels;
        }

        if (application?.contactId) {
          object.contact = resContact?.data?.Items.filter((con) => { return con?.PK == application?.contactId[0] })[0];
        }
        tableDataArry.push(object)
      })
      setTableData([...tableDataArry])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getLoanType()
    getTableData();
  }, []);


  return (
    <div>
      <Box p={4}>
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
              >
                <SyncOutlinedIcon fontSize="large" sx={{ color: "gray" }} />
              </IconButton>
              <Button
                variant="contained"
                sx={{ padding: "10px 40px" }}
                onClick={handleClickOpen}
              >
                New Application
              </Button>

              {/* <Dialog open={open} onClose={handleClose} fullWidth m={4}>
                <Box sx={{ width: 1000, maxWidth: "100%" }}>
                  <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                  >
                    <Typography variant="h6" style={{ fontSize: 30 }}>
                      New Application
                    </Typography>
                  </BootstrapDialogTitle>

                  <DialogContent>
                    <LoanAppDialogFormController />
                  </DialogContent>
                  <div style={{ marginBottom: 100 }}>
                    <DialogActions
                      style={{ display: "flex", justifyContent: "left" }}
                    >
                      <Button variant="contained" onClick={handleContinue}>
                        Continue
                      </Button>
                    </DialogActions>
                  </div>
                </Box>
              </Dialog> */}
            </Box>
          </Grid>
        </Grid>
        {/* 2nd-header-section */}
        <Grid container mt={2}>
          {/* header-search-section */}
          <Grid item xs={12} md={5}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item xs={12}>
                <div className={styles.search}>
                  <SearchOutlinedIcon className={styles.icon} fontSize='medium' />
                  <TextField onChange={(e) => { setSearchKey(e.target.value) }} className={styles.input} id="input-with-icon-textfield" label="Search" variant="standard" />
                </div>
              </Grid>
            </Grid>
          </Grid>
          {/* active-user-display-section */}
          <Grid item xs={12} md={1}>
            <AvatarGroup total={teamMembersArr?.length} onClick={handleClickLabelDropDown}>
              {teamMembersArr && teamMembersArr?.map((user, key) => {
                return (
                  <Avatar key={key} alt={user?.PK.split("#")[1]} src={`${s3URL}/${user?.imageId}`} />
                )
              })}
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </AvatarGroup>
          </Grid>
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
              {teamMembersArr && teamMembersArr?.map((user, key) => {
                
                return (
                  <MenuItem key={key} style={{backgroundColor: avatarFilterSelect == user?.PK.split("#")[1] ? "#e6e6e6":"white"}}>
                    <Chip
                        onClick={()=>{setAvatarFilterSelect(user?.PK.split("#")[1])}}
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
          {/* other-icon-set */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "right" }}>
              <Grid container className="css-gnya7v">
                <Stack direction=" row">
                  <Grid item className="hover_effect">
                    {" "}
                    {/*icon-1  */}
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
                    >
                      <SyncAltOutlinedIcon sx={{ color: "gray" }} />
                    </IconButton>
                  </Grid>
                  <Grid item className="hover_effect">
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
                  </Grid>
                  <Grid item className="hover_effect">
                    {/* icon-3 */}
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
                        router.push('/application/dashbord')
                      }}
                    >
                      <DashboardOutlinedIcon sx={{ color: "gray" }} />
                    </IconButton>
                  </Grid>
                  <Grid item className="hover_effect">
                    {/* icon-4 */}
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
                      <ViewCompactOutlinedIcon sx={{ color: "gray" }} />
                    </IconButton>
                  </Grid>
                </Stack>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        {/*body-content  */}
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <LoanApplicatioTable applications={tableData} searchKey={searchKey} filterBy={avatarFilterSelect}/>
          </Grid>
        </Grid>
      </Box>
      <div>
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
                    Selecte Campaign
                  </Typography>
                </label>

                {loanTypeData.map((row, key) => (
                  <div key={key}>
                    <Box
                      sx={{ maxWidth: "100%" }}
                      className="hover_effect"
                    >
                      <Stack spacing={2} direction="row">
                        <Button
                          fullWidth
                          variant="outlined"
                          borderColor="#393939"
                          style={{
                            backgroundColor:
                              row.PK == product ? "#1478F1" : "",
                            color:
                              row.PK == product ? "#FFFFFF" : "#393939",
                          }}
                          onMouseOver={() => {
                            backgroundColor: "#1478F1";
                            color: "#FFFFFF";
                          }}
                          onClick={() => {
                            handelSelectProduct(row.PK);
                          }}
                        >
                          <Grid
                            container
                            display={"flex"}
                            fontWeight={700}
                          >
                            <Grid
                              xs={6}
                              align="left"
                              // color={"#393939"}
                              textTransform="capitalize"
                            >
                              <Typography
                                //  className="page_sub_content_header"
                                style={{
                                  fontSize: 20,
                                  fontWeight: 700,
                                  textTransform: "capitalize",
                                }}
                                p={1}
                              >
                                {row.loanName}
                              </Typography>
                            </Grid>{" "}
                            <Grid xs={6} align="right" color={"#393939"}>
                              {row.img != null && (
                                <img
                                  src={`${s3URL}/${row.img}`}
                                  height="40"
                                  width="40"
                                />
                              )}
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
                      control={
                        <Checkbox
                          onChange={(e) => {
                            setCoContact(e.target.checked);
                          }}
                        />
                      }
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
      </div>
    </div>
  );
}

ApplicationTableView.layout = "AdminLayout";

export default ApplicationTableView;
