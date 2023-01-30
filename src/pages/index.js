import React, { useEffect, useState } from "react";
import Table from "../components/table/table";
import Bars from "../components/Bars/bars";
// import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {
  FormControl,
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
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";

import Container from "@mui/material/Container";
import DashBoardCards from "../components/dashBoardCards/dashBoardCards";
import DashBoardTableOne from "../components/dashBoardTable/dashBoardTableOne";
import BasicTable from "../components/dashboardtable";
//import NestedGrid from '../components/dashboardTasks'
import LoanStatusPieChart from "../components/loanStatusPieChart/loanStatusPieChart";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DashBoardCardsSectionTwo from "../components/dashBoardCards/dashBoardCardsSectionTwo";
import SearchBox from "../components/searchBox/searchBox";
import { Divider } from "@mui/material";
import Chip from "@mui/material/Chip";
import { useRouter } from "next/router";
import { _fetchAllContacts } from "../services/contactServices.js";
import {
  _getApplications,
  _getAllApplications,
} from "../services/applicationService.js";
import { _fetchWorkflowStatuses } from "../services/loanWorkflowStatusServices.js";
import { _fetchAllTasks } from "../services/loanTaskServices.js";

function NestedGrid({ task }) {
  const router = useRouter();

  console.log(task);
  function getTime(ts) {
    let date = new Date(ts);
    return date.toDateString();
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} mt={2}>
        {task &&
          task.map((task, key) => {
            return (
              <React.Fragment key={key}>
                <Grid item xs={3}>
                  {/* <img src='./images/Frame 63.png' width="70px"></img> */}
                  <Button
                    variant="contained"
                    size="small"
                    style={{ fontSize: 6, minWidth: "100%"}}
                    onClick={() => {
                      router.push(`/tasks/view/${task?.id}`);
                    }}
                  >
                    Edit
                  </Button>
                </Grid>
                <Grid item xs={6} mt={1} pl={1}>
                  <Typography
                    align="left"
                    color="#858585"
                    style={{ fontSize: 9, padding: 0, margin: 0,  }}
                    className="limitChar"
                  >
                    {task?.assignTo || ""}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Chip
                    label="Pre-Approved"
                    size="small"
                    style={{ fontSize: 8, padding: 0, margin: 0 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    align="left"
                    // fontSize='1.0rem'
                    // fontWeight='bold'
                    style={{ fontSize: 10, fontWeight: 500 }}
                    color="#858585"
                  >
                    {task?.description || ""}
                  </Typography>
                  <Typography
                    align="left"
                    // fontSize='1.0rem'
                    // fontWeight='bold'
                    style={{ fontSize: 10, fontWeight: 500 }}
                    color="#858585"
                  >
                    Modified Date: {getTime(task?.updateTime)}
                  </Typography>
                  <Grid item xs={12} sx={{ paddingTop: 1, paddingBottom: 0 }}>
                    <Divider />
                  </Grid>
                </Grid>
              </React.Fragment>
            );
          })}
      </Grid>
    </Box>
  );
}
const HomePage = () => {
  //data set of the column cart
  const data1 = [
    ["", "", { role: "style" }],
    ["YTD", 120, "blue"],
    ["February 2019", 75, "green"],
  ];
  //data set of the pie cart
  const data2 = [
    ["Task", "Hours per Day"],
    ["aaa", 11],
    ["bbb", 2],
    ["ccc", 2],
    ["ddd", 2],
    ["eee", 7],
  ];
  //data set of the donut cart
  const percentage = 23;

  const router = useRouter();

  const [leadsData, setLeadsData] = useState();
  const [applications, setApplications] = useState([]);
  const [workFlowStatus, setworkFlowStatus] = useState([]);
  const [loanStatusesChart, setLoanStatusesChart] = useState([]);

  const [ytdLoanClose, setYtdLoanClose] = useState(0);
  const [mtdLoanClose, setMtdLoanClose] = useState(0);
  const [ytdTotalCloseAmount, setYtdTotalCloseAmount] = useState(0);
  const [ytdTotalCloseAmountForUser, setYtdTotalCloseAmountForUser] =
    useState(0);
  const [totalLoans, setTotalLoans] = useState(0);
  const [wonRatio, setWonRatio] = useState(0);
  const [closedApplicationsCount, setClosedApplicationsCount] = useState(0);
  const [lostApplicationsCount, setLostApplicationsCount] = useState(0);
  const [givenApplicationsCount, setGivenApplicationsCount] = useState(0);

  const [taskData, setTaskData] = useState([]);
  const [taskOverdue, setTaskOverdue] = useState(0);
  const [taskDueToday, setTaskDueToday] = useState(0);
  const [taskTotal, setTotal] = useState(0);

  const currentDate = new Date();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const getContact = async () => {
    try {
      const response = await _fetchAllContacts();
      return response?.data?.Items;
    } catch (err) {
      console.log(err);
    }
  };
  const getApplicationByuser = async () => {
    try {
      const response = await _getApplications();
      return response?.data?.data?.Items;
    } catch (err) {
      console.log(err);
    }
  };

  const getApplication = async () => {
    try {
      const response = await _getAllApplications();
      return response?.data?.data?.Items;
    } catch (err) {
      console.log(err);
    }
  };
  const getWorkFlowStatus = async () => {
    try {
      const response = await _fetchWorkflowStatuses();
      return response?.data?.loanStatuses?.Items;
    } catch (err) {
      console.log(err);
    }
  };

  const getTasks = async () => {
    try {
      const response = await _fetchAllTasks();
      return response?.data?.loanTasks?.Items;
    } catch (err) {
      console.log(err);
    }
  };

  function subtractMonths(months) {
    let date = new Date();
    date.setMonth(date.getMonth() - months);
    return date.getTime();
  }

  function subtractYears(numOfYears, date = new Date()) {
    date.setFullYear(date.getFullYear() - numOfYears);
    var newDate = new Date(date);
    return newDate.getTime();
  }

  const getLeadData = async (applicationByuserArr, contactArr) => {
    let contacts = [];
    await applicationByuserArr.map((application) => {
      let contactTemp = contactArr.filter(
        (contact) => contact?.PK == application?.contactId[0]
      );
      if (contactTemp.length > 0) {
        contactTemp[0].application = application;
        contacts.push(...contactTemp);
      }
    });
    console.log("LeadsData", contacts);
    setLeadsData([...contacts]);
  };

  const closedLoans = async (applicationArr, applicationByuserArr) => {
    let closeedStatus = "closed"; // closed
    let wonStatus = "won";
    let lostStatus = "lost";
    let givenStatus = "given";
    let ytdClosedLoanTotalAmount = 0;
    let ytdClosedLoanTotalAmountForUSer = 0;
    setTotalLoans(applicationArr?.length);

    let closedApplications = await applicationArr.filter(
      (application) => application?.status_.toLowerCase() == closeedStatus
    );
    let lostApplications = await applicationArr.filter(
      (application) => application?.status_.toLowerCase() == lostStatus
    );
    let givenApplications = await applicationArr.filter(
      (application) => application?.status_.toLowerCase() == givenStatus
    );
    setClosedApplicationsCount(closedApplications.length);
    setLostApplicationsCount(lostApplications.length);
    setGivenApplicationsCount(givenApplications.length);

    let closedApplicationsForUser = await applicationByuserArr.filter(
      (application) => application?.status_.toLowerCase() == closeedStatus
    );
    let ytdClosed = await closedApplications.filter(
      (application) => application?.createTime >= subtractYears(1)
    );
    let monthClosed = await closedApplications.filter(
      (application) => application?.createTime >= subtractMonths(1)
    );
    setYtdLoanClose(ytdClosed.length);
    setMtdLoanClose(monthClosed.length);

    let winApplications = await applicationArr.filter(
      (application) => application?.status_.toLowerCase() == wonStatus
    );
    let winRatio = (winApplications.length / applicationArr.length) * 100;
    setWonRatio(winRatio);

    await closedApplications.map((application) => {
      ytdClosedLoanTotalAmount =
        ytdClosedLoanTotalAmount + parseInt(application?.loanAmount);
    });
    setYtdTotalCloseAmount(ytdClosedLoanTotalAmount);

    await closedApplicationsForUser.map((application) => {
      ytdClosedLoanTotalAmountForUSer =
        ytdClosedLoanTotalAmountForUSer + parseInt(application?.loanAmount);
    });
    setYtdTotalCloseAmountForUser(ytdClosedLoanTotalAmountForUSer);
  };

  const loansStatusPresentage = async (workFlowStatusArr, applicationArr) => {
    let workFlow = [];
    let count = [];
    let resut = [];
    workFlowStatusArr.map((data) => {
      workFlow.push(data?.name);
    });
    let c = 0;
    //console.log(workFlow)
    for (let i = 0; i < workFlow.length; i++) {
      for (let j = 0; j < applicationArr.length; j++) {
        if (workFlow[i] === applicationArr[j]?.status_) {
          c = c + 1;
        }
      }
      count[i] = c;
      c = 0;
    }
    for (let i = 0; i < workFlow.length; i++) {
      resut.push([workFlow[i], count[i]]);
    }
    setLoanStatusesChart([...resut]);
  };

  const taskCalculations = async (workTaskArr) => {
    let total = workTaskArr.length;
    let dueToday = await workTaskArr.filter((task) => {
      let d = new Date(task?.createTime);
      let date = `${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()}`;
      let cDate = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
      return date == cDate;
    });
    let overdue = total - dueToday.length;
    setTaskOverdue(overdue);
    setTaskDueToday(dueToday.length);
    setTotal(total);
    //console.log("dueToday",dueToday)
  };

  async function fetchAllData() {
    const contactArr = await getContact();
    console.log("_fetchAllContacts", contactArr);

    const applicationArr = await getApplication();
    console.log("_getApplications", applicationArr);

    const applicationByuserArr = await getApplicationByuser();
    console.log("applicationByuserArr", applicationByuserArr);

    const workFlowStatusArr = await getWorkFlowStatus();
    console.log("_fetchWorkflowStatuses", workFlowStatusArr);

    const workTaskArr = await getTasks();
    let myTask = await workTaskArr.sort((a, b) =>
      a.createTime < b.createTime ? 1 : b.createTime < a.createTime ? -1 : 0
    );
    console.log("_fetchAllTasks", myTask);
    setTaskData([...myTask]);

    taskCalculations(workTaskArr);
    loansStatusPresentage(workFlowStatusArr, applicationArr);
    closedLoans(applicationArr, applicationByuserArr);
    getLeadData(applicationByuserArr, contactArr);
  }
  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div style={{ padding: "10px 20px"}}>
          <Box mt={4}>
            {/* header section-dashboard */}
            <Typography style={{ fontSize: 45, fontWeight: 700 }}>
              Dashboard
            </Typography>
          </Box>
          <Box>
            {/* body section-dashboard */}
            <Grid container spacing={2}>
                  {/* 1st row */}
                <Grid item xs={4} md={4}>
                  <Card>
                    <CardContent>
                        <Typography
                          style={{ fontSize: 18, fontWeight: 700 }}
                          align="left"
                        >
                          {`Year to Date / ${
                            month[currentDate.getMonth()]
                          } ${new Date().getFullYear()} `}
                        </Typography>
                        <Typography
                          style={{ fontSize: 14, fontWeight: 600 }}
                          align="left"
                          color="blue"
                        >
                          Loans Closed
                        </Typography>
                    </CardContent>

                    <CardContent>
                      <Bars
                        ytdCount={ytdLoanClose}
                        monthCount={mtdLoanClose}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={5} md={5}>
                  <Card>
                    <CardContent>
                      <Stack direction="column" spacing={1}>
                        <Typography
                          style={{ fontSize: 18, fontWeight: 700 }}
                          align="left"
                        >
                          Year to Date
                        </Typography>
                        <Typography
                          style={{ fontSize: 14, fontWeight: 600 }}
                          align="left"
                          color="blue"
                        >
                          Loans Closed
                        </Typography>
                      </Stack>
                      <Typography
                        align="center"
                        fontSize={60}
                        fontWeight={600}
                      >
                        ${ytdTotalCloseAmount}
                      </Typography>
                      <Grid
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <DashBoardCards
                          totalLoans={totalLoans}
                          perchase={10}
                          references={10}
                        />
                      </Grid>
                    </CardContent>

                    {/* <CardContent>
                <DashBoardCards />
              </CardContent> */}
                  </Card>
                  <Grid
                    style={{ display: "flex", justifyContent: "center" }}
                    mt={2}
                  >
                    <Button
                      variant="contained"
                      style={{ width: "100%", height: 38, margin: 1 ,fontWeight:700, textTransform:"capitalize"}}
                      size="small"
                      onClick={() => {
                        router.push(`/application/dashbord`);
                      }}
                    >
                      Start New Loan
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={3} md={3}>
                  <Card
                    style={{
                      height: 355,
                      overflow: "scroll",
                      overflowX: "hidden",
                    }}
                    className="newScroll"
                  >
                    <CardContent>
                        <Typography
                          style={{ fontSize: 18, fontWeight: 700 }}
                        >
                          My Tasks
                        </Typography>
                        <DashBoardTableOne
                          taskOverdue={taskOverdue}
                          taskDueToday={taskDueToday}
                          taskTotal={taskTotal}
                        />
                        <NestedGrid task={taskData} />
                    </CardContent>

                  </Card>
                </Grid>
                 
                {/* 2nd row */}
                 
                <Grid item xs={4}>
                  <Card style={{ height: 435 }}>
                    <CardContent>
                      <Stack direction="column" spacing={1}>
                        <Typography
                          style={{ fontSize: 18, fontWeight: 700 }}
                          align="left"
                        >
                          Loans Status
                        </Typography>
                      </Stack>
                    </CardContent>

                    <CardContent>
                      <LoanStatusPieChart chartData={loanStatusesChart} />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={5}>
                  {/* <Stack direction="row" spacing={1}> */}
                    <Grid container>
                      <Grid item xs={6}>
                        <Card style={{ height: 220 }}>
                          <CardContent>
                            <Typography
                              pb={1}
                              mb={1}
                              align="center"
                              style={{
                                fontSize: 18,
                                fontWeight: 700,
                              }}
                            >
                              Oppotunity-to-win-Ratio
                            </Typography>
                            <div id="container">
                              <div
                                style={{
                                  width: "58%",
                                  paddingLeft: "16%",
                                  fontWeight: "bold",
                                  color: "black",
                                }}
                              >
                                <CircularProgressbar
                                  value={wonRatio.toFixed(2)}
                                  text={`${wonRatio.toFixed(2)}%`}
                                  styles={buildStyles({
                                    textColor: "black",
                                  })}
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={6}>
                        <Card style={{ height: 220 }}>
                          <CardContent>
                            <Typography
                              align="left"
                              style={{ fontSize: 18, fontWeight: 700 }}
                            >
                              Current Pipeline
                            </Typography>

                            {/* <Typography
                            align="center"
                            style={{ fontSize: 36, fontWeight: 700 }}
                          >
                            $824,150
                          </Typography> */}
                            <Stack direction="column" mt={3} mb={4}>
                              <Typography
                                style={{ fontSize: 36, fontWeight: 700 }}
                                align="center"
                              >
                                ${ytdTotalCloseAmountForUser}
                              </Typography>
                              <Typography
                                style={{
                                  fontSize: 16,
                                  fontWeight: 500,
                                  color: "#858585",
                                }}
                                align="center"
                              >
                                Loans Closed
                              </Typography>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  {/* </Stack> */}
                  <Card style={{ marginTop: 28 }}>
                    <CardContent>
                      <Stack direction="column" spacing={1}>
                        <Typography
                          style={{ fontSize: 18, fontWeight: 700 }}
                          align="left"
                        >
                          Oppotunities
                        </Typography>
                      </Stack>
                      <Grid
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <DashBoardCardsSectionTwo
                          closedApplications={closedApplicationsCount}
                          lostApplications={lostApplicationsCount}
                          givenApplications={givenApplicationsCount}
                        />
                      </Grid>
                    </CardContent>

                    {/* <CardContent>
                <DashBoardCards />
              </CardContent> */}
                  </Card>
                  {/* <Grid
                    style={{ display: "flex", justifyContent: "center" }}
                    mt={1}
                  ></Grid> */}
                </Grid>
                <Grid item xs={3}>
                  <Card
                    style={{
                      height: 435,
                      overflow: "scroll",
                      overflowX: "hidden",
                    }}
                    className="newScroll"
                  >
                    <CardContent>
                      <Stack direction="column">
                        <Typography
                          style={{
                            fontSize: 18,
                            fontWeight: 700,
                            padding: 0,
                            margin: 0,
                          }}
                        >
                          Leads
                        </Typography>
                        <BasicTable rows={leadsData} />

                        {/* <Grid style={{ height: 500 }}>
                        <BasicTable />
                      </Grid> */}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
            </Grid>
        </Box>

        {/* </div> */}
    </div>
  );
};

HomePage.layout = "AdminLayout";
export default HomePage;
