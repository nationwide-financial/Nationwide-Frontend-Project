import React, { Component } from 'react'
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
} from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { Chart } from 'react-google-charts'
import BasicTable from '../components/dashboardtable'
import NestedGrid from '../components/dashboardTasks'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const HomePage = () => {
  //data set of the column cart
  const data1 = [
    ['', '', { role: 'style' }],
    ['YTD', 120, 'blue'],
    ['February 2019', 75, 'green'],
  ]
  //data set of the pie cart
  const data2 = [
    ['Task', 'Hours per Day'],
    ['aaa', 11],
    ['bbb', 2],
    ['ccc', 2],
    ['ddd', 2],
    ['eee', 7],
  ]
  //data set of the donut cart
  const percentage = 23

  return (
    <div>
      <Grid container mb={5}>
        <Grid item xs={12} md={6}>
          <h1 className='page_header'>Dashboard</h1>
        </Grid>

        <Grid item xs={12} md={4} ml={9}>
          {/* <Box sx={{ textAlign: 'right' }}> */}

          <Grid container spacing={1} alignItems='flex-end' mt={2} ml={8}>
            <TextField
              id='input-with-icon-textfield'
              variant='standard'
              fullWidth
              defaultValue={'Search'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchOutlinedIcon fontSize='medium' />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          {/* search-section */}
        </Grid>
      </Grid>

      {/* body-section */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid container item spacing={2}>
            <React.Fragment>
              <Grid item xs={3}>
                <div>
                  <Card
                    sx={{
                      height: 525,
                      alignContent: 'center',
                      padding: 3,
                    }}
                  >
                    <Typography
                      align='left'
                      fontSize='1.2rem'
                      fontWeight='bold'
                    >
                      Year to Date / February 2019
                    </Typography>
                    <Typography
                      align='left'
                      fontSize='1.2rem'
                      fontWeight='500px'
                      color='blue'
                    >
                      Loans Closed
                    </Typography>

                    <CardContent>
                      <div id='container'>
                        <Chart
                          chartType='ColumnChart'
                          width='90%'
                          height='300px'
                          data={data1}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            </React.Fragment>
            <React.Fragment>
              <Grid item xs={5}>
                <div>
                  <Card
                    sx={{
                      height: 525,
                      alignContent: 'center',
                      padding: 3,
                    }}
                  >
                    <Typography
                      align='left'
                      fontSize='1.2rem'
                      fontWeight='bold'
                    >
                      Year to Date
                    </Typography>
                    <Typography
                      align='left'
                      fontSize='1.2rem'
                      fontWeight='500px'
                      color='blue'
                    >
                      Loans Closed
                    </Typography>
                    <div
                      style={{
                        padding: '20px',
                      }}
                    >
                      <Typography
                        align='center'
                        fontSize='4.2rem'
                        fontWeight='500px'
                      >
                        $82,574,150
                      </Typography>
                    </div>

                    <div
                      style={{
                        paddingLeft: '70px',
                        paddingTop: '20px',
                        paddingBottom: '20px',
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <div
                            className='column'
                            style={{
                              height: '140px',
                              width: '150px',
                              backgroundColor: '#FFC000',
                              padding: '5px',
                              color: 'white',
                              alignContent: 'center',
                              borderRadius: '5px',
                            }}
                          >
                            <div
                              style={{
                                paddingTop: '20px',
                              }}
                            >
                              <Typography
                                align='center'
                                fontSize='1.2rem'
                                fontWeight='500px'
                              >
                                References
                              </Typography>
                              <Typography
                                align='center'
                                fontSize='2.2rem'
                                fontWeight='500px'
                              >
                                35
                              </Typography>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div
                            style={{
                              height: '140px',
                              width: '150px',
                              backgroundColor: '#4169E1',
                              padding: '5px',
                              color: 'white',
                              alignContent: 'center',
                              borderRadius: '5px',
                            }}
                          >
                            <div
                              style={{
                                paddingTop: '20px',
                              }}
                            >
                              <Typography
                                align='center'
                                fontSize='1.2rem'
                                fontWeight='500px'
                              >
                                Purchase
                              </Typography>
                              <Typography
                                align='center'
                                fontSize='2.2rem'
                                fontWeight='500px'
                              >
                                43
                              </Typography>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={3}>
                          <div
                            style={{
                              height: '140px',
                              width: '150px',
                              backgroundColor: '#009E60',
                              padding: '5px',
                              color: 'white',
                              alignContent: 'center',
                              borderRadius: '5px',
                            }}
                          >
                            <div
                              style={{
                                paddingTop: '20px',
                              }}
                            >
                              <Typography
                                align='center'
                                fontSize='1.2rem'
                                fontWeight='500px'
                              >
                                Total Loan
                              </Typography>
                              <Typography
                                align='center'
                                fontSize='2.2rem'
                                fontWeight='500px'
                              >
                                78
                              </Typography>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                    <div
                      style={{
                        paddingLeft: '55px',
                        paddingTop: '20px',
                        paddingBottom: '20px',
                      }}
                    >
                      <Button
                        variant='contained'
                        sx={{ width: '700px', height: 55, fontSize: 20 }}
                      >
                        Start New Loan
                      </Button>
                    </div>
                  </Card>
                </div>
              </Grid>
            </React.Fragment>
            <React.Fragment>
              <Grid item xs={3}>
                <div>
                  <Card
                    sx={{
                      height: 525,
                      alignContent: 'center',
                      padding: 3,
                    }}
                  >
                    <h2 className='page_header'>My Tasks</h2>
                    <div style={{ paddingBottom: '20px', paddingLeft: '40px' }}>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <Typography
                            align='center'
                            fontSize='2.2rem'
                            fontWeight='500px'
                          >
                            8
                          </Typography>
                          <Typography
                            align='center'
                            fontSize='1.2rem'
                            fontWeight='500px'
                          >
                            Overdue
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            align='center'
                            fontSize='2.2rem'
                            fontWeight='500px'
                          >
                            0
                          </Typography>
                          <Typography
                            align='center'
                            fontSize='1.2rem'
                            fontWeight='500px'
                          >
                            Due Today
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            align='center'
                            fontSize='2.2rem'
                            fontWeight='500px'
                          >
                            9
                          </Typography>
                          <Typography
                            align='center'
                            fontSize='1.2rem'
                            fontWeight='500px'
                          >
                            Total
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                    <NestedGrid />
                  </Card>
                </div>
              </Grid>
            </React.Fragment>
            <React.Fragment>
              <Grid item xs={3}>
                <div>
                  <Card
                    sx={{
                      height: 525,
                      alignContent: 'center',
                      padding: 3,
                    }}
                  >
                    <Typography
                      align='left'
                      fontSize='1.2rem'
                      fontWeight='bold'
                    >
                      Loans Status
                    </Typography>
                    <CardContent>
                      <div id='container'>
                        <Chart
                          chartType='PieChart'
                          data={data2}
                          width='100%'
                          height='400px'
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            </React.Fragment>
            <React.Fragment>
              <Grid item xs={5}>
                <div>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
                      <Grid container item spacing={2}>
                        <React.Fragment>
                          <Grid item xs={6}>
                            <Card
                              sx={{
                                padding: 3,
                              }}
                            >
                              <Typography
                                align='left'
                                fontSize='1.2rem'
                                fontWeight='bold'
                              >
                                Oppotunity-to-win-Ratio
                              </Typography>
                              <CardContent>
                                <div id='container'>
                                  <div
                                    style={{
                                      width: '58%',
                                      paddingLeft: '20%',
                                      fontWeight: 'bold',
                                      color: 'black',
                                    }}
                                  >
                                    <CircularProgressbar
                                      value={percentage}
                                      text={`${percentage}%`}
                                      styles={buildStyles({
                                        textColor: 'black',
                                      })}
                                    />
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Grid>
                        </React.Fragment>
                        <React.Fragment>
                          <Grid item xs={6}>
                            <Card
                              sx={{
                                maxWidth: 500,
                                height: 265,
                                alignContent: 'center',
                                padding: 3,
                              }}
                            >
                              <div style={{ padding: '5px' }}>
                                <Typography
                                  align='left'
                                  fontSize='1.2rem'
                                  fontWeight='bold'
                                >
                                  Current Pipeline
                                </Typography>
                              </div>

                              <div style={{ padding: '30px' }}></div>
                              <Typography
                                align='center'
                                fontSize='3.2rem'
                                fontWeight='bold'
                              >
                                $824,150
                              </Typography>
                              <Typography align='center'>loans</Typography>
                            </Card>
                          </Grid>
                        </React.Fragment>
                        <React.Fragment>
                          <Grid item xs={12}>
                            <Card
                              sx={{
                                padding: 3,
                              }}
                            >
                              <Typography
                                align='left'
                                fontSize='1.2rem'
                                fontWeight='bold'
                              >
                                Oppotunities
                              </Typography>
                              <div
                                style={{
                                  paddingLeft: '80px',
                                  paddingTop: '30px',
                                  paddingBottom: '30px',
                                }}
                              >
                                <Grid container spacing={2}>
                                  <Grid item xs={4}>
                                    <div
                                      className='column'
                                      style={{
                                        height: '140px',
                                        width: '150px',
                                        backgroundColor: '#009E60',
                                        padding: '5px',
                                        color: 'white',
                                        alignContent: 'center',
                                        borderRadius: '5px',
                                      }}
                                    >
                                      <div
                                        style={{
                                          paddingTop: '20px',
                                        }}
                                      >
                                        <Typography
                                          align='center'
                                          fontSize='1.2rem'
                                          fontWeight='500px'
                                        >
                                          Given
                                        </Typography>
                                        <Typography
                                          align='center'
                                          fontSize='2.2rem'
                                          fontWeight='500px'
                                        >
                                          35
                                        </Typography>
                                      </div>
                                    </div>
                                  </Grid>
                                  <Grid item xs={4}>
                                    <div
                                      style={{
                                        height: '140px',
                                        width: '150px',
                                        backgroundColor: '#4169E1',
                                        padding: '5px',
                                        color: 'white',
                                        alignContent: 'center',
                                        borderRadius: '5px',
                                      }}
                                    >
                                      <div
                                        style={{
                                          paddingTop: '20px',
                                        }}
                                      >
                                        <Typography
                                          align='center'
                                          fontSize='1.2rem'
                                          fontWeight='500px'
                                        >
                                          Closed
                                        </Typography>
                                        <Typography
                                          align='center'
                                          fontSize='2.2rem'
                                          fontWeight='500px'
                                        >
                                          43
                                        </Typography>
                                      </div>
                                    </div>
                                  </Grid>
                                  <Grid item xs={3}>
                                    <div
                                      style={{
                                        height: '140px',
                                        width: '150px',
                                        backgroundColor: 'red',
                                        padding: '5px',
                                        color: 'white',
                                        alignContent: 'center',
                                        borderRadius: '5px',
                                      }}
                                    >
                                      <div
                                        style={{
                                          paddingTop: '20px',
                                        }}
                                      >
                                        <Typography
                                          align='center'
                                          fontSize='1.2rem'
                                          fontWeight='500px'
                                        >
                                          Lost
                                        </Typography>
                                        <Typography
                                          align='center'
                                          fontSize='2.2rem'
                                          fontWeight='500px'
                                        >
                                          78
                                        </Typography>
                                      </div>
                                    </div>
                                  </Grid>
                                </Grid>
                              </div>
                            </Card>
                          </Grid>
                        </React.Fragment>
                      </Grid>
                    </Grid>
                  </Box>
                </div>
              </Grid>
            </React.Fragment>
            <React.Fragment>
              <Grid item xs={3}>
                <div>
                  <Card
                    sx={{
                      height: 525,
                      alignContent: 'center',
                      padding: 3,
                    }}
                  >
                    <h1 className='page_header'>Leads</h1>
                    <BasicTable />
                  </Card>
                </div>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

HomePage.layout = 'AdminLayout'
export default HomePage
