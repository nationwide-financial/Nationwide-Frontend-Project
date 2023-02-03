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
import styles from "./dashBoardCards.module.scss";
import { Scale } from "@mui/icons-material";

function DashBoardCards({ totalLoans, perchase, references }) {
  //   let cdNo = this.cdNo;
  //   let cdnm = this.cdnm;
  //   let bgclr = this.bgclr;
  const setOnecrdVals = [
    { id: 1, cdNo: references, cdnm: " References", bgclr: "#FFC000" },
    { id: 1, cdNo: perchase, cdnm: "Purchase", bgclr: "#4169E1" },
    { id: 1, cdNo: totalLoans, cdnm: "Total Loan", bgclr: "#009E60" },
  ];

  return (
    <div>
      <Box>
        <Grid container>
          {setOnecrdVals.map((setOnecrdVal, index) => {
            return (
              <Stack key={index} direction="row" spacing={3}>
                <Grid p={1}>
                  <div key={index}>
                    <Grid
                      xs={12}
                      style={{
                        height: 90,
                        width: 105,
                        // backgroundColor: { setOnecrdVal.bgclr },
                        padding: 5,
                        color: "white",
                        alignContent: "center",
                        borderRadius: 5,
                        backgroundColor: setOnecrdVal.bgclr,
                      }}
                    >
                      <Stack direction="column" spacing={1}>
                        <Typography
                          align="center"
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                          }}
                        >
                          {setOnecrdVal.cdnm}
                        </Typography>
                        <Typography
                          align="center"
                          style={{
                            fontSize: 34,
                            fontWeight: 600,
                          }}
                        >
                          {" "}
                          {setOnecrdVal.cdNo}
                        </Typography>
                      </Stack>
                    </Grid>
                  </div>{" "}
                </Grid>
              </Stack>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default DashBoardCards;
