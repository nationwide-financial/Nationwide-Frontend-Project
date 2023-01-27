import React, { useState, useEffect, useCallback } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeItem, { TreeItemProps, treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import { TuneOutlined } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import {
  Grid,
  Button,
  FormControlLabel,
  IconButton,
  Card,
  CardContent,
  Popover,
} from "@mui/material";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SearchBox from "../../components/searchBox/searchBox";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { s3URL } from "../../utils/config";
import Image from 'next/image';
//import styles from './searchBox.module.scss'
import styles from '../../../src/components/searchBox/searchBox.module.scss'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


import { _gatLoanType, _addLoanType } from "../../services/loanTypeService";

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

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.MuiTreeItem-content": {
      flexDirection: "row-reverse",
      color: "#1478F1",
    },
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: "#1478F1",
      color: "white !important",
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: "#1478F1",
      color: "white !important",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 0.5,
            pr: 0,
            pt: 1.5,
            pb: 1.5,
          }}
        >
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      {...other}
    />
  );
}

const LoanType = () => {
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

  const rows = [
    {
      status: "ACTIVE",
    },
  ];

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const currencies = [
    {
      value: "status 01",
      label: "status 01",
    },
    {
      value: "status 02",
      label: "status 02",
    },
    {
      value: "status 03",
      label: "status 03",
    },
  ];

  const [currency, setCurrency] = React.useState("text");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const [loanName, setLoanName] = useState("");
  const [loanIcon, setLoanIcon] = useState("");
  const [loanStatus, setLoanStatus] = useState("");
  const [inputError, setInputError] = useState("");

  const [searchKey, setSearchKey] = useState("");

  function getTime(ts){
    let date = new Date(ts);
    return date.toDateString();
  }

  const [row, setRow] = useState([]);

  async function getData() {
    try {
      const response = await _gatLoanType();
      setRow(response?.data?.data?.Items);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

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

  const handleAddFormSubmit = async () => {
    try {
      let body = {
        loanName: loanName,
        loanIcon: loanIcon,
        loanStatus: loanStatus,
      };
      const response = await _addLoanType(body);
      console.log("response", response);
      if (response?.status == 200) {
        //alert("you have successfully added");
        handleSuccessMessage();
        setMessage("you have successfully added");
        handleClose();
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
      <Box p={5} mb={12}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <h1 className="page_header">Loan Types</h1>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "right" }}>
              <Button
                variant="contained"
                sx={{ padding: "10px 40px" }}
                onClick={handleClickOpen}
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  textTransform: "capitalize",
                }}
              >
                Add Product
              </Button>
            </Box>

            <Dialog open={open} onClose={handleClose} fullWidth>
              <Box sx={{ width: 1000, maxWidth: "100%" }}>
                <BootstrapDialogTitle
                  id="customized-dialog-title"
                  onClose={handleClose}
                >
                  <Typography
                    variant="h6"
                    style={{ fontSize: 30 }}
                    className="page_header"
                  >
                    New Product
                  </Typography>
                </BootstrapDialogTitle>

                <DialogContent>
                  <form>
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
                          }}
                        >
                          Loan Product Name
                          <span style={{ color: "#FF0000" }}>*</span>
                        </Typography>
                      </label>
                      <Box sx={{ maxWidth: "100%" }}>
                        <TextField
                          fullWidth
                          autoFocus
                          size="small"
                          margin="normal"
                          id="outlined-basic"
                          placeholder="Text"
                          variant="outlined"
                          name="loanName"
                          onChange={(e) => {
                            setLoanName(e.target.value);
                          }}
                        />
                      </Box>

                      <label>
                        <Typography
                          variant="h6"
                          style={{
                            fontSize: 17,
                            fontWeight: 700,
                            fontStyle: "normal",
                          }}
                          my={1}
                        >
                          Loan Product Icon
                          <span style={{ color: "#FF0000" }}>*</span>
                        </Typography>
                      </label>
                      <a
                        href="#"
                        style={{
                          fontSize: 17,
                          fontWeight: 500,
                          fontStyle: "normal",
                          color: "#1478F1",
                          marginBottom: 10,
                        }}
                      >
                        Upload from computer <FileUploadOutlinedIcon />
                      </a>

                      <div
                        style={{
                          borderStyle: "dashed",
                          border: "5 solid #fff ",
                          borderColor: "grey",
                          padding: 5,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={2}
                          margin="normal"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                          >
                            <input
                              hidden
                              accept="image/*"
                              type="file"
                              name="loanIcon"
                              onChange={(event) => {
                                setLoanIcon(event.target.files[0]);
                              }}
                            />

                            <Grid container>
                              <Grid item xs={12}>
                                <PhotoCamera color="disabled" />
                              </Grid>
                              <Grid item xs={12}>
                                <Typography style={{ color: "#E0DCDC" }}>
                                  Drag & Drop here
                                </Typography>
                              </Grid>
                            </Grid>
                          </IconButton>
                        </Stack>
                      </div>

                      <label style={{ marginTop: 10 }}>
                        <Typography
                          variant="h6"
                          style={{
                            fontSize: 17,
                            fontWeight: 700,
                            fontStyle: "normal",
                          }}
                        >
                          Loan Product Status
                          <span style={{ color: "#FF0000" }}>*</span>
                        </Typography>
                      </label>

                      <TextField
                        id="outlined-basic"
                        select
                        value={loanStatus}
                        name="loanStatus"
                        fullWidth
                        size="small"
                        margin="normal"
                      >
                        {currencies.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={option.value}
                            onClick={() => {
                              setLoanStatus(option.value);
                            }}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </form>
                </DialogContent>

                <DialogActions mb={5}>
                  <Button
                    variant="contained"
                    onClick={handleAddFormSubmit}
                    Style={{
                      fontSize: 16,
                      fontWeight: 700,
                      textTransform: "capitalize",
                    }}
                  >
                    Create Product
                  </Button>
                </DialogActions>
              </Box>
            </Dialog>
          </Grid>
        </Grid>

        <Grid container mt={2}>
          <Grid item xs={12} md={6}>
            <Grid container>
              <Grid item xs={7}>
                {/* <SearchBox /> */}
                <div className={styles.search}>
                  <SearchOutlinedIcon className={styles.icon} fontSize='medium' />
                  <TextField className={styles.input} id="input-with-icon-textfield" label="Search" variant="standard" onChange={(e)=>{
                    setSearchKey(e.target.value)
                  }}/>

                </div>
              </Grid>
              <Grid item xs={5}>
                {/* <AvatarGroup total={9}>
                  <Avatar alt="Remy Sharp" src="/images/avatar1.png" />
                  <Avatar alt="Travis Howard" src="/images/avatar2.png" />
                  <Avatar alt="Agnes Walker" src="/images/avatar3.png" />
                  <Avatar alt="Trevor Henderson" src="/images/avatar4.png" />
                </AvatarGroup> */}
              </Grid>
            </Grid>
          </Grid>
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

        {/* body-section */}
        <Grid
          container
          mt={6}
          rowSpacing={2}
          columnSpacing={{ xs: 2, sm: 3, md: 4 }}
        >
          {row?.filter((data) => {
            if (searchKey == "") {
              return data;
            } else {
              return data?.loanName
                .toLowerCase()
                .includes(searchKey.toLocaleLowerCase());
            }
          }).map((row, key) => {
            return (
              <Grid item xs={12} md={6} spacing={2} key={key}>
                <Card
                  variant="outlined"
                  style={{ backgroundColor: "transparent" }}
                >
                  <Grid container p={1}>
                    <Grid item xs={9} ml={2}>
                      <CardContent style={{}}>
                        <Typography
                          variant="h6"
                          component="div"
                          style={{
                            fontSize: 20,
                            fontWeight: 700,
                          }}
                        >
                          {" "}
                          {row.loanName}{" "}
                          <span className="verified_label" color="success">
                            {" "}
                            {row.loanStatus}{" "}
                          </span>
                        </Typography>
                        <Typography
                          variant="body2"
                          style={{ fontSize: 16, fontWeight: 500 }}
                        >
                          {getTime(row.updateTime)}
                        </Typography>
                      </CardContent>
                    </Grid>
                    <Grid item xs={1} mt={3} ml={0}>
                      {" "}
                      <Box sx={{ textAlign: "right" }}>
                        <Image
                          src={`${s3URL}/${row.img}`}
                          alt="product icon"
                          width={100}
                          height={100}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            );
          })}

          {/* <Grid item xs={12} md={6} spacing={2}>
            <Card variant="outlined" style={{ backgroundColor: "transparent" }}>
              <Grid container columnSpacing={{ xs: 6 }} p={1}>
                <Grid item xs={9} ml={2}>
                  <CardContent style={{}}>
                    <Typography
                      variant="h6"
                      component="div"
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                      }}
                    >
                      {" "}
                      Home Improvment{" "}
                      <span className="verified_label" color="success">
                        {" "}
                        ACTIVE{" "}
                      </span>
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ fontSize: 16, fontWeight: 500 }}
                    >
                      Updated Jul 23, 2021, 11:37PM
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item xs={1} mt={3} ml={0}>
                  {" "}
                  <Box sx={{ textAlign: "right" }}>
                    <HomeOutlinedIcon fontSize="large" />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid> */}

          {/* <Grid item xs={12} md={6} spacing={2}>
            <Card variant="outlined" style={{ backgroundColor: "transparent" }}>
              <Grid container columnSpacing={{ xs: 6 }} p={1}>
                <Grid item xs={9} ml={2}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      style={{ fontSize: 20, fontWeight: 700 }}
                    >
                      Consolidate Debt{" "}
                      <span className="verified_label" color="success">
                        {" "}
                        ACTIVE{" "}
                      </span>
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ fontSize: 16, fontWeight: 500 }}
                    >
                      Updated Jul 23, 2021, 11:37PM
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item xs={1} mt={3} ml={0}>
                  {" "}
                  <Box sx={{ textAlign: "right" }}>
                    <FeedOutlinedIcon fontSize="large" />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>

         

          <Grid item xs={12} md={6}>
            <Card variant="outlined" style={{ backgroundColor: "transparent" }}>
              <Grid container columnSpacing={{ xs: 6 }} p={1}>
                <Grid item xs={9} ml={2}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      style={{ fontSize: 20, fontWeight: 700 }}
                    >
                      {" "}
                      Pay off Credit Cards{" "}
                      <span className="verified_label" color="success">
                        {" "}
                        ACTIVE{" "}
                      </span>
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ fontSize: 16, fontWeight: 500 }}
                    >
                      Updated Jul 23, 2021, 11:37PM
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item xs={1} mt={3} ml={0}>
                  {" "}
                  <Box sx={{ textAlign: "right" }}>
                    <CreditCardOutlinedIcon fontSize="large" />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" style={{ backgroundColor: "transparent" }}>
              <Grid container columnSpacing={{ xs: 6 }} p={1}>
                <Grid item xs={9} ml={2}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      style={{ fontSize: 20, fontWeight: 700 }}
                    >
                      {" "}
                      Refinance my Car{" "}
                      <span className="verified_label" color="success">
                        {" "}
                        ACTIVE{" "}
                      </span>
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ fontSize: 16, fontWeight: 500 }}
                    >
                      Updated Jul 23, 2021, 11:37PM
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item xs={1} mt={3} ml={0}>
                  {" "}
                  <Box sx={{ textAlign: "right" }}>
                    <DirectionsCarOutlinedIcon fontSize="large" />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>

         

          <Grid item xs={12} md={6}>
            <Card variant="outlined" style={{ backgroundColor: "transparent" }}>
              <Grid container columnSpacing={{ xs: 6 }} p={1}>
                <Grid item xs={9} ml={2}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      style={{ fontSize: 20, fontWeight: 700 }}
                    >
                      {" "}
                      Something Else{" "}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ fontSize: 16, fontWeight: 500 }}
                    >
                      Updated Jul 23, 2021, 11:37PM
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item xs={1} mt={3} ml={0}>
                  {" "}
                  <Box sx={{ textAlign: "right" }}>
                    <BusinessCenterOutlinedIcon fontSize="large" />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>  */}
        </Grid>
      </Box>
    </div>
    //  <gri></gri>
  );
};
LoanType.layout = "AdminLayout";

export default LoanType;
