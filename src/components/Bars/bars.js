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
import styles from "./bars.module.scss";
import { Scale } from "@mui/icons-material";

function Bars({ytdCount,monthCount}) {
  console.log("ytdCount,monthCount",ytdCount,monthCount)
  //data set of the column cart
  const data1 = [
    ["", "", { role: "style" }],
    ["YTD", ytdCount, "blue"],
    ["February 2019", monthCount, "green"],
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
  return (
    <>
      {/* <Chart
                          chartType="ColumnChart"
                          width="90%"
                          height="300px"
                          width={380}
                          height={200}
                          data={data1}
                        /> */}
      <Grid container>
        <Grid item xs={2}>
          <Chart
            chartType="ColumnChart"
            width={300}
            height={220}
            data={data1}
            style={{ transform: "Scale(110%,115%) ", padding: 0, margin: 0 }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Bars;
