import React, { useState, useEffect } from "react";
import { Grid, TextField, Typography } from "@mui/material";

function ApplicationMainFields({setData}) {
    const [applicationMain,setApplicationMain] = useState({})
    const [error,setError] = useState("")
  
    useEffect(() => {
      setData(applicationMain)
    }, [applicationMain]);
  
    const handleChange = (param, event) => {
      setError("");
      switch (param) {
        case "loanAmount": {
        setApplicationMain({ ...applicationMain, loanAmount: event.target.value });
          break;
        }
        case "ref": {
        setApplicationMain({ ...applicationMain, ref: event.target.value});
          break;
        }
        default: {
        setApplicationMain({ ...applicationMain });
          break;
        }
      }
    };
  
  return (
    <div>
      <Grid container>
        <Grid item xs={12} p={2}>
          <Typography style={{ fontSize: 20, fontWeight: 700 }}>
            APPLICATION DETAILS
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} mx={1}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={3} style={{ margin: "auto 10px" }}>
              <label>
                {" "}
                <Typography
                  align="left"
                  variant="h6"
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    fontStyle: "normal",
                  }}
                >
                  Loan Amount <span style={{ color: "red" }}>*</span>
                </Typography>
              </label>
            </Grid>
            <Grid item xs={8} style={{ margin: "auto 10px" }}>
              <TextField
                fullWidth
                onChange = {(event) => handleChange("loanAmount", event)}
                value = {applicationMain?.loanAmount}
                size="small"
                margin="normal"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={3} style={{ margin: "auto 10px" }}>
              <label>
                {" "}
                <Typography
                  align="left"
                  variant="h6"
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    fontStyle: "normal",
                  }}
                >
                  Referral Source <span style={{ color: "red" }}>*</span>
                </Typography>
              </label>
            </Grid>
            <Grid item xs={8} style={{ margin: "auto 10px" }}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("ref", event)}
                value={applicationMain?.ref}
                size="small"
                margin="normal"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default ApplicationMainFields;
