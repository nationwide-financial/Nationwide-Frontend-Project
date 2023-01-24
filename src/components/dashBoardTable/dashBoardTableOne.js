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
    <div>
      <Box>
        <Grid container>
          {topvaluesets.map((topvalueset, index) => {
            return (
              <Stack key={index} direction="row">
                <Grid>
                  <div key={index}>
                    <Grid sx={12}>
                      <Stack direction="column" spacing={1}>
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
                      </Stack>
                    </Grid>
                  </div>
                </Grid>
              </Stack>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default DashBoardTableOne;
