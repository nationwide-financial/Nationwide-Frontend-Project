import React, {useEffect,useState} from "react";
import TextField from "@mui/material/TextField";
import { Autocomplete, Grid, Typography } from "@mui/material";
function ApplicationFields({setData, compaigns, Selected}) {

  const [applicationData,setApplicationData] = useState({})
  const [error, setError] = useState("")

  useEffect(() => {
    let selected = compaigns?.filter((compaign)=>compaign?.PK == Selected)[0]?.loanName;
    setApplicationData({...applicationData,compaign:selected})
  }, [compaigns, Selected]);

  useEffect(() => {
    setData(applicationData)
  }, [applicationData]);

  const handleChange = (param, event) => {
    setError("");
    switch (param) {
      case "fileName": {
        setApplicationData({ ...applicationData, fileName: event.target.value });
        break;
      }
      case "compaign": {
        setApplicationData({ ...applicationData, compaign: event });
        break;
      }
      case "compaignID": {
        setApplicationData({ ...applicationData, compaignID: event });
        break;
      }
      case "leadId": {
        setApplicationData({ ...applicationData, leadId: event.target.value });
        break;
      }
      case "note": {
        setApplicationData({ ...applicationData, note: event.target.value });
        break;
      }
      default: {
        setApplicationData({ ...applicationData });
        break;
      }
    }
  };


  return (
    <div>
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
                  File Number
                </Typography>
              </label>
            </Grid>
            <Grid item xs={8} style={{ margin: "auto 10px" }}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("fileName", event)}
                value={applicationData?.fileName || ""}
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
                  Compaign
                </Typography>
              </label>
            </Grid>
            <Grid item xs={8} style={{ margin: "auto 10px" }}>
            <div>
                <Autocomplete
                  value={applicationData?.compaign || ""}
                  renderInput={(params) => (
                    <TextField {...params} size="small" label="Select" />
                  )}
                  onChange={(e, val) => {
                    handleChange("compaign", val?.split("|")[0] || "")
                    handleChange("compaignID", val?.split("|")[1] || "")
                    return val;
                  }}
                  options={compaigns?.map((compaign) => {
                    let s = `${compaign?.loanName}|${compaign?.PK}`
                    return s;
                  })}
                ></Autocomplete>
              </div>
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
                  Lead ID
                </Typography>
              </label>
            </Grid>
            <Grid item xs={8} style={{ margin: "auto 10px" }}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("leadId", event)}
                value={applicationData?.leadId || ""}
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
                  Notes
                </Typography>
              </label>
            </Grid>
            <Grid item xs={8} style={{ margin: "auto 10px" }}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("note", event)}
                value={applicationData?.note || ""}
                size="small"
                multiline
                rows={4}
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

export default ApplicationFields;
