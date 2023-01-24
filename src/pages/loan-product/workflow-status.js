import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  CircularProgress,
  FormControlLabel,
  Grid,
  Switch,
} from "@mui/material";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import PauseCircleOutlineRoundedIcon from "@mui/icons-material/PauseCircleOutlineRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import WorkflowStatusCard from "../../components/WorkflowStatusCard";
import { _fetchWorkflowStatuses } from "../../services/loanWorkflowStatusServices";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function WorkflowStatus() {
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

  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const defaultStatus = {
    name: "",
    probability: undefined,
    rottingInDays: false,
    days: undefined,
  };
  const [statusList, setStatusList] = useState([defaultStatus]);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    fetchData();
  }, [trigger]);

  const fetchData = async () => {
    setLoading(true);
    const response = await _fetchWorkflowStatuses();
    setLoading(false);
    if (response?.status === 200) {
      console.log("res ", response);
      setStatusList(
        response.data.loanStatuses.Items.length > 0
          ? response.data.loanStatuses.Items
          : [defaultStatus]
      );
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const setStatusData = (index, field, value) => {
    const listCopy = [...statusList];
    switch (field) {
      case "name": {
        listCopy[index].name = value;
        setStatusList(listCopy);
        break;
      }
      case "probability": {
        listCopy[index].probability = value;
        setStatusList(listCopy);
        break;
      }
      case "rottingInDays": {
        listCopy[index].rottingInDays = value;
        setStatusList(listCopy);
        break;
      }
      case "days": {
        listCopy[index].days = value;
        setStatusList(listCopy);
        break;
      }
    }
  };

  const onClickAddStatus = () => {
    const copy = [...statusList];
    copy.push(defaultStatus);
    setStatusList(copy);
  };

  const renderStatus = () => {
    const components = [];
    const sorted = statusList.sort((a, b) =>
      a.index > b.index ? 1 : b.index > a.index ? -1 : 0
    );
    sorted.map((status, index) => {
      components.push(
        <WorkflowStatusCard
          statusData={status}
          index={index}
          updateStatus={setStatusData}
          addStatus={onClickAddStatus}
          setLoading={setLoading}
          setTrigger={setTrigger}
        />
      );
    });
    return components;
  };

  return (
    <Box
      sx={{ width: "100%" }}
      style={{
        paddingLeft: 15,
        paddingTop: 15,
        paddingBottom: 100,
        margin: 15,
      }}
    >
      <h1 className="page_header" style={{ marginTop: 10, marginBottom: 20 }}>
        Workflow Statuses
      </h1>
      {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          style={{ fontSize: 18, fontWeight: 700, textTransform: "capitalize" }}
        >
          <Tab
            label="Processing Statuses"
            {...a11yProps(0)}
            style={{
              fontSize: 18,
              fontWeight: 700,
              textTransform: "capitalize",
            }}
          />
          <Tab
            label="Final Statuses"
            {...a11yProps(1)}
            style={{
              fontSize: 18,
              fontWeight: 700,
              textTransform: "capitalize",
            }}
          />
        </Tabs>
      </Box> */}
      {/* <TabPanel value={value} index={0}> */}
      {loading ? (
        <CircularProgress />
      ) : (
        <Stack direction={"row"} overflow={"scroll"} sx={{ minHeight: "80vh" }}>
          {renderStatus()}
        </Stack>
      )}
      <Box style={{ display: "none" }}>
        <Box style={{ backgroundColor: "white", padding: 15 }}>
          <Grid container columnSpacing={2}>
            <Grid
              item
              xs={3}
              style={{
                borderTopRightRadius: 55,
                borderBottomRightRadius: 55,
                width: 240,
                height: 65,
                backgroundColor: "transparent",
              }}
            >
              <Grid container>
                <Grid xs={8}>
                  <Typography
                    gutterBottom
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      fontFamily: "Montserrat",
                      color: "#393939",
                      alignItems: "left",
                      display: "flex",
                      justifyContent: "left",
                    }}
                  >
                    <span> Qualified</span>
                  </Typography>
                  <Typography
                    gutterBottom
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      fontFamily: "Montserrat",
                      display: "flex",
                      justifyContent: "left",
                    }}
                  >
                    <span style={{ padding: 3 }}>
                      <NotificationsNoneRoundedIcon fontSize="small" />
                    </span>
                    <span>0 days</span>
                  </Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography
                    style={{ display: "flex", justifyContent: "right" }}
                  >
                    <span style={{ padding: 15 }}>
                      {" "}
                      <PauseCircleOutlineRoundedIcon />
                    </span>
                    <span style={{ padding: 15 }}>
                      {" "}
                      <AddCircleOutlineRoundedIcon />
                    </span>
                  </Typography>
                </Grid>
              </Grid>
              {/* </Item> */}
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                borderTopRightRadius: 55,
                borderBottomRightRadius: 55,
                width: 250,
                height: 65,
                backgroundColor: "transparent",
                color: "#393939",
              }}
            >
              <Grid container>
                <Grid xs={8}>
                  <Typography
                    gutterBottom
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      fontFamily: "Montserrat",
                      color: "#393939",
                      alignItems: "left",
                      display: "flex",
                      justifyContent: "left",
                    }}
                  >
                    <span>Contact Mode</span>
                  </Typography>
                  <Typography
                    gutterBottom
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      fontFamily: "Montserrat",
                      display: "flex",
                      justifyContent: "left",
                    }}
                  >
                    <span style={{ padding: 3 }}>
                      <NotificationsNoneRoundedIcon fontSize="small" />
                    </span>
                    <span>0 days</span>
                  </Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography
                    style={{ display: "flex", justifyContent: "right" }}
                  >
                    <span style={{ padding: 15 }}>
                      {" "}
                      <PauseCircleOutlineRoundedIcon />
                    </span>
                    <span style={{ padding: 15 }}>
                      {" "}
                      <AddCircleOutlineRoundedIcon />
                    </span>
                  </Typography>
                </Grid>
              </Grid>
              {/* </Item> */}
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                borderTopRightRadius: 55,
                borderBottomRightRadius: 55,
                width: 250,
                height: 65,
                backgroundColor: "transparent",
                color: "#393939",
              }}
            >
              <Grid container>
                <Grid xs={8}>
                  <Typography
                    gutterBottom
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      fontFamily: "Montserrat",
                      color: "#393939",
                      alignItems: "left",
                      display: "flex",
                      justifyContent: "left",
                    }}
                  >
                    <span> Demo Scheduled</span>
                  </Typography>
                  <Typography
                    gutterBottom
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      fontFamily: "Montserrat",
                      display: "flex",
                      justifyContent: "left",
                    }}
                  >
                    <span style={{ padding: 3 }}>
                      <NotificationsNoneRoundedIcon fontSize="small" />
                    </span>
                    <span>0 days</span>
                  </Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography
                    style={{ display: "flex", justifyContent: "right" }}
                  >
                    <span style={{ padding: 15 }}>
                      {" "}
                      <PauseCircleOutlineRoundedIcon />
                    </span>
                    <span style={{ padding: 15 }}>
                      {" "}
                      <AddCircleOutlineRoundedIcon />
                    </span>
                  </Typography>
                </Grid>
              </Grid>
              {/* </Item> */}
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                borderTopRightRadius: 55,
                borderBottomRightRadius: 55,
                width: 250,
                height: 65,
                backgroundColor: "transparent",
                color: "#393939",
              }}
            >
              <Grid
                container
                style={{
                  borderTopRightRadius: 55,
                  borderBottomRightRadius: 55,
                  borderRightWidth: 10,
                  borderRightColor: "#fff",
                }}
              >
                <Grid xs={8}>
                  <Typography
                    gutterBottom
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      fontFamily: "Montserrat",
                      color: "#393939",
                      alignItems: "left",
                      display: "flex",
                      justifyContent: "left",
                    }}
                  >
                    <span> Proposal Mode</span>
                  </Typography>
                  <Typography
                    gutterBottom
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      fontFamily: "Montserrat",
                      display: "flex",
                      justifyContent: "left",
                    }}
                  >
                    <span style={{ padding: 3 }}>
                      <NotificationsNoneRoundedIcon fontSize="small" />
                    </span>
                    <span>0 days</span>
                  </Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography
                    style={{ display: "flex", justifyContent: "right" }}
                  >
                    <span style={{ padding: 15 }}>
                      {" "}
                      <PauseCircleOutlineRoundedIcon />
                    </span>
                    <span style={{ padding: 15 }}>
                      {" "}
                      <AddCircleOutlineRoundedIcon />
                    </span>
                  </Typography>
                </Grid>
              </Grid>
              {/* </Item> */}
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={1} mt={4}>
          <Grid item xs={3}>
            <Item style={{ padding: 10, paddingTop: 25 }}>
              <Grid style={{ display: "flex", alignItems: "start" }}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    fontFamily: "Montserrat",
                    color: "#393939",
                    alignItems: "left",
                  }}
                >
                  Name
                </Typography>
              </Grid>
              <FormControl fullWidth>
                <OutlinedInput
                  size="small"
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>

              <Grid container style={{ marginTop: 100 }}>
                <Grid item xs={7}>
                  <Typography
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      fontFamily: "Montserrat",
                    }}
                  >
                    Rotting in (days)
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "right",
                      paddingLeft: 14,
                    }}
                  >
                    <FormControlLabel control={<IOSSwitch sx={{ m: 0 }} />} />
                  </Box>
                </Grid>
              </Grid>

              <Grid style={{ marginTop: 180 }}>
                <Divider />
                <Stack direction="row" spacing={2} mt={1}>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    disabled
                  >
                    Delete
                  </Button>
                </Stack>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item style={{ padding: 10, paddingTop: 25 }}>
              <Grid style={{ display: "flex", alignItems: "start" }}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    fontFamily: "Montserrat",
                    color: "#393939",
                    alignItems: "left",
                  }}
                >
                  Name
                </Typography>
              </Grid>
              <FormControl fullWidth>
                <OutlinedInput
                  size="small"
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>

              <Grid container style={{ marginTop: 100 }}>
                <Grid item xs={7}>
                  <Typography
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      fontFamily: "Montserrat",
                    }}
                  >
                    Rotting in (days)
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "right",
                      paddingLeft: 14,
                    }}
                  >
                    <FormControlLabel control={<IOSSwitch sx={{ m: 0 }} />} />
                  </Box>
                </Grid>
              </Grid>

              <Grid style={{ marginTop: 180 }}>
                <Divider />
                <Stack direction="row" spacing={2} mt={1}>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    disabled
                  >
                    Delete
                  </Button>
                </Stack>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item
              style={{
                padding: 10,
                paddingTop: 25,
                backgroundColor: "transparent",
              }}
            >
              <Grid style={{ display: "flex", alignItems: "start" }}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    fontFamily: "Montserrat",
                    color: "#393939",
                    alignItems: "left",
                  }}
                >
                  Name
                </Typography>
              </Grid>
              <FormControl fullWidth>
                <OutlinedInput
                  size="small"
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>

              <Grid container style={{ marginTop: 100 }}>
                <Grid item xs={7}>
                  <Typography
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      fontFamily: "Montserrat",
                    }}
                  >
                    Rotting in (days)
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "right",
                      paddingLeft: 14,
                    }}
                  >
                    <FormControlLabel control={<IOSSwitch sx={{ m: 0 }} />} />
                  </Box>
                </Grid>
              </Grid>

              <Grid style={{ marginTop: 180 }}>
                <Divider />
                <Stack direction="row" spacing={2} mt={1}>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    disabled
                  >
                    Delete
                  </Button>
                </Stack>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item
              style={{
                padding: 10,
                paddingTop: 25,
                backgroundColor: "transparent",
              }}
            >
              <Grid style={{ display: "flex", alignItems: "start" }}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    fontFamily: "Montserrat",
                    color: "#393939",
                    alignItems: "left",
                  }}
                >
                  Name
                </Typography>
              </Grid>
              <FormControl fullWidth>
                <OutlinedInput
                  size="small"
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>

              <Grid container style={{ marginTop: 100 }}>
                <Grid item xs={7}>
                  <Typography
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      fontFamily: "Montserrat",
                    }}
                  >
                    Rotting in (days)
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "right",
                      paddingLeft: 14,
                    }}
                  >
                    <FormControlLabel control={<IOSSwitch sx={{ m: 0 }} />} />
                  </Box>
                </Grid>
              </Grid>

              <Grid style={{ marginTop: 180 }}>
                <Divider />
                <Stack direction="row" spacing={2} mt={1}>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    disabled
                  >
                    Delete
                  </Button>
                </Stack>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Box>
      {/* </TabPanel> */}

      {/* <TabPanel value={value} index={1}>
        Item Two
      </TabPanel> */}
    </Box>
  );
}

WorkflowStatus.layout = "AdminLayout";

export default WorkflowStatus;
