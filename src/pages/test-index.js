import React from "react";
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
import NestedGrid from "../components/dashboardTasks";
import LoanStatusPieChart from "../components/loanStatusPieChart/loanStatusPieChart";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DashBoardCardsSectionTwo from "../components/dashBoardCards/dashBoardCardsSectionTwo";
import SearchBox from "../components/searchBox/searchBox";
function HomePage() {
  //data set of the donut cart
  const percentage = 23;
  return (
    <div>
      <Container>
        <Box p={2} ml={1} mr={1} mb={1} mt={2}>
          {/* header section-dashboard */}
          <Grid container>
            <Grid item xs={7}>
              <Typography style={{ fontSize: 45, fontWeight: 700 }}>
                Dashboard
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <SearchBox />
            </Grid>
          </Grid>
          {/* body section-dashboard */}
          <Grid container>
            <Stack direction="column" spacing={1}>
              {/* 1st row */}
              <Grid>
                <Stack direction="row" spacing={2}>
                  <Grid xs={4}>
                    <Card>
                      <CardContent>
                        <Stack direction="column" spacing={1}>
                          <Typography
                            style={{ fontSize: 18, fontWeight: 700 }}
                            align="left"
                          >
                            Year to Date / February 2019
                          </Typography>
                          <Typography
                            style={{ fontSize: 14, fontWeight: 600 }}
                            align="left"
                            color="blue"
                          >
                            Loans Closed
                          </Typography>
                        </Stack>
                      </CardContent>

                      <CardContent>
                        <Bars />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid xs={5}>
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
                          $82,574,150
                        </Typography>
                        <DashBoardCards />
                      </CardContent>

                      {/* <CardContent>
                    <DashBoardCards />
                  </CardContent> */}
                    </Card>
                    <Grid
                      style={{ display: "flex", justifyContent: "center" }}
                      mt={1}
                    >
                      <Button
                        variant="contained"
                        style={{ width: 400, height: 40, margin: 2 }}
                        size="small"
                      >
                        Start New Loan
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid xs={3}>
                    <Card style={{ height: 355 }}>
                      <CardContent>
                        <Stack direction="column" spacing={1}>
                          <Typography style={{ fontSize: 18, fontWeight: 700 }}>
                            My Tasks
                          </Typography>
                          <DashBoardTableOne />

                          <NestedGrid />
                        </Stack>
                      </CardContent>

                      <CardContent>{/* <Bars /> */}</CardContent>
                    </Card>
                  </Grid>
                </Stack>
              </Grid>
              {/* 2nd row */}
              <Grid>
                <Stack direction="row" spacing={2}>
                  <Grid xs={4}>
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
                        <LoanStatusPieChart />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid xs={5}>
                    <Stack direction="row" spacing={2}>
                      <Grid container>
                        <Grid item xs={6}>
                          <Card>
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
                                    value={percentage}
                                    text={`${percentage}%`}
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
                          <Card>
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
                                  $824,150
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
                    </Stack>
                    <Card style={{ marginTop: 35 }}>
                      <CardContent>
                        <Stack direction="column" spacing={1}>
                          <Typography
                            style={{ fontSize: 18, fontWeight: 700 }}
                            align="left"
                          >
                            Oppotunities
                          </Typography>
                        </Stack>

                        <DashBoardCardsSectionTwo />
                      </CardContent>

                      {/* <CardContent>
                    <DashBoardCards />
                  </CardContent> */}
                    </Card>
                    <Grid
                      style={{ display: "flex", justifyContent: "center" }}
                      mt={1}
                    ></Grid>
                  </Grid>
                  <Grid xs={3}>
                    <Card style={{ height: 435 }}>
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
                          <BasicTable />

                          {/* <Grid style={{ height: 500 }}>
                            <BasicTable />
                          </Grid> */}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                </Stack>
              </Grid>
            </Stack>
          </Grid>
        </Box>

        {/* </div> */}
      </Container>
    </div>
  );
}
HomePage.layout = "AdminLayout";

export default HomePage;
