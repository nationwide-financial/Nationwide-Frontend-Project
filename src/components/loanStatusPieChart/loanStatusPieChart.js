import React, { Component } from "react";
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
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Chart } from "react-google-charts";
// import BasicTable from "../components/dashboardtable";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Stack from "@mui/material/Stack";
// import styles from "./bars.module.scss";
import { Scale } from "@mui/icons-material";

function LoanStatusPieChart({chartData}) {
  //data set of the column cart
  console.log("chartData",chartData)
  const data1 = [
    ["", "", { role: "style" }],
    ["YTD", 120, "blue"],
    ["February 2019", 75, "green"],
  ];
  //data set of the pie cart
  const data2 = [
    ["Task", "Hours per Day"], ...chartData];
  //data set of the donut cart
  const percentage = 23;

  return (
    <div>
      <Box>
        <Grid container>
          <Grid item xs={2}>
            <Chart
              chartType="PieChart"
              data={data2}
              //   width="100%"
              //   height="400px"
              width={300}
              height={220}
              style={{ transform: "Scale(1) ", padding: 0, margin: 0 }}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default LoanStatusPieChart;
