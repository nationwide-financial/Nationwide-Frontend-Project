import React from "react";
import { Component } from "react";
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
import styles from "./dashBoardTableOne.module.scss";
import { Scale } from "@mui/icons-material";
import { render } from "react-dom";

function DashBoardTableOne({taskOverdue,taskDueToday,taskTotal}) {
  const topvaluesets = [
    { id: 1, number: taskOverdue, textVal: " Overdue" },
    { id: 2, number: taskDueToday, textVal: " Due Today" },
    { id: 3, number: taskTotal, textVal: " Total" },
  ];
  return (
      <Box>
        <Grid container spacing={2}>
          {topvaluesets.map((topvalueset, index) => {
            return (
                <Grid key={index} item sx={12}>
                    <Typography
                      align="center"
                      fontSize="31px"
                      fontWeight={600}
                    >
                      {topvalueset.number}
                    </Typography>
                    <Typography
                      align="center"
                      fontSize="12px"
                      fontWeight={600}
                      color="#858585"
                    >
                      {topvalueset.textVal}
                    </Typography>
                </Grid>
            );
          })}
        </Grid>
      </Box>
  );
}

export default DashBoardTableOne;
