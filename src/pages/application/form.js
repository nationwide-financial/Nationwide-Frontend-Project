import React, { useState } from "react";
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
  AvatarGroup,
  Avatar,
} from "@mui/material";
import Switch, { SwitchProps } from "@mui/material/Switch";

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
      value: "name",
      label: "ergjjjjjjjjj",
    },
  ];

  const [currency, setCurrency] = React.useState("text");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <div>
      {/* 
      <Typography variant="h4">Loan Types</Typography>

<TextField id="standard-basic" label="Search" variant="standard" /> */}

      <Grid container>
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              sx={{ padding: "10px 40px" }}
              onClick={handleClickOpen}
            >
              Application Form
            </Button>
          </Box>

          <Dialog open={open} onClose={handleClose} fullWidth>
            {/* <DialogTitle >New Product</DialogTitle> */}
              <Box sx={{ width: 1000, maxWidth: "100%" }}>
                <BootstrapDialogTitle
                  id="customized-dialog-title"
                  onClose={handleClose}
                >
                  <Typography
                    variant="h6"
                    style={{
                      fontSize: 30,
                      fontFamily: "Gilroy-Bold",
                      fontWeight: "bold",
                    }}
                  >
                    Team Members
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      fontFamily: "Montserrat",
                      fontStyle: "normal",
                    }}
                  >
                    Assign team Members
                  </Typography>
                </BootstrapDialogTitle>

                <DialogContent>
                  <FormControl
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <label></label>
                    <Box sx={{ maxWidth: "100%" }}>
                      <Box
                        sx={{
                          width: "100%",
                          height: 300,
                        }}
                      >
                        <div>
                          <Grid container spacing={{ xs: 2, md: 3 }}>
                            {Array.from(Array(6)).map((_, index) => (
                              <Grid item xs={6} sm={6} md={6} key={index}>
                                {currencies.map((option) => (
                                  <div
                                    key={option.value}
                                    value={option.value}
                                    style={{
                                      backgroundColor: "#e0e0e0",
                                      width: 200,
                                      height: 50,
                                      padding: 5,
                                    }}
                                  >
                                    <Grid container spacing={1}>
                                      <Grid item xs>
                                        <Avatar
                                          alt="avatar1"
                                          src="../images/img1.png"
                                        />
                                      </Grid>

                                      <Grid item xs>
                                        <div>{option.label}</div>
                                      </Grid>
                                    </Grid>
                                  </div>
                                ))}
                              </Grid>
                            ))}
                          </Grid>
                        </div>
                      </Box>
                    </Box>
                  </FormControl>
                </DialogContent>

                <DialogActions>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#ececec", color: "gray" }}
                    alignItems="left"
                    onClick={handleClose}
                  >
                    Save Changes
                  </Button>
                </DialogActions>
              </Box>
          </Dialog>
        </Grid>
      </Grid>
    </div>
    //  <gri></gri>
  );
};
LoanType.layout = "AdminLayout";

export default LoanType;
