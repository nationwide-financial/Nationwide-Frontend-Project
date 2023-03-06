import React, { useState, useEffect } from "react";
import { Button, Autocomplete, Grid, TextField, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";


function ApplicantFields({addApplicationFlag, setContactData, contactList, setSelect }) {
    const [contact, setContact] =useState({})
    const [error, setError] =useState("")
    const languages = ["English","Spanish","Russian","French"]
    const preferredMethods =["method 1","method 2"]
    const bestTimes = [
      "6.00 AM - 7.00 AM",
      "7.00 AM - 8.00 AM",
      "8.00 AM - 9.00 AM",
      "9.00 AM - 10.00 AM",
      "11.00 AM - 12.00 AM",
      "12.00 AM - 1.00 PM",
      "2.00 PM - 3.00 PM",
      "3.00 PM - 4.00 PM",
      "6.00 PM - 5.00 PM",
      "5.00 PM - 6.00 PM",
    ]
    const timeZones = ["timeZones","timeZones","timeZones"]
    const creditReportTypes = ["type 01","type 02"]

    useEffect(() => {
      setContactData(contact)
    }, [contact]);

    console.log("contact",contact)

    const handleChange = (param, event) => {
      setError("");
      switch (param) {
        case "firstName": {
          setContact({ ...contact, firstName: event.target.value });
          break;
        }
        case "lastName": {
          setContact({ ...contact, lastName: event.target.value });
          break;
        }
        case "middleInitial": {
          setContact({ ...contact, middleInitial: event.target.value });
          break;
        }
        case "otherName": {
          setContact({ ...contact, otherName: event.target.value });
          break;
        }
        case "emailAddress": {
          setContact({ ...contact, emailAddress: event.target.value });
          break;
        }
        case "homePhoneNumber": {
          setContact({ ...contact, homePhoneNumber: event.target.value });
          break;
        }
        case "mobilePhoneNumber": {
          setContact({ ...contact, mobilePhoneNumber: event.target.value });
          break;
        }
        case "work": {
          setContact({ ...contact, work: event.target.value });
          break;
        }
        case "fax": {
          setContact({ ...contact, fax: event.target.value });
          break;
        }
        case "address1": {
          setContact({ ...contact, address1: event.target.value });
          break;
        }
        case 'address2': {
          setContact({ ...contact, address2: event.target.value });
          break;
        }
        case "cityOrState": {
          setContact({ ...contact, cityOrState: event.target.value });
          break;
        }
        case "Zip": {
          setContact({ ...contact, Zip: event.target.value });
          break;
        }
		    case "country": {
          setContact({ ...contact, country: event.target.value });
          break;
        }
        case "eligibilityStatus": {
          setContact({ ...contact, eligibilityStatus: event.target.value });
          break;
        }
        case "primaryLanguage": {
          setContact({ ...contact, primaryLanguage: event });
          break;
        }
        case "preferredMethod": {
          setContact({ ...contact, preferredMethod: event });
          break;
        }
        case "primaryNumber": {
          setContact({ ...contact, primaryNumber: event });
          break;
        }
        case "bestTimeToCall": {
          setContact({ ...contact, bestTimeToCall: event });
          break;
        }
        case "timeZone": {
          setContact({ ...contact, timeZone: event});
          break;
        }
        case "creditScore": {
          setContact({ ...contact, creditScore: event.target.value });
          break;
        }
        case "date": {
          setContact({ ...contact, date: event.target.value });
          break;
        }
        case "creditReportType": {
          setContact({ ...contact, creditReportType: event });
          break;
        }
        case "dob": {
          setContact({ ...contact, dob: event.target.value });
          break;
        }
        case "ssn": {
          setContact({ ...contact, ssn: event.target.value });
          break;
        }
        case "dl": {
          setContact({ ...contact, dl: event.target.value });
          break;
        }
        case "state": {
          setContact({ ...contact, state: event.target.value });
          break;
        }
        case "employer": {
          setContact({ ...contact, employer: event.target.value });
          break;
        }
		    case "occ": {
          setContact({ ...contact, occ: event.target.value });
          break;
        }
        case "empLengthY": {
          setContact({ ...contact, empLengthY: event.target.value });
          break;
        }
		    case "empLengthM": {
          setContact({ ...contact, empLengthM: event.target.value });
          break;
        }
        case "mortgageBalance": {
          setContact({ ...contact, mortgageBalance: event.target.value });
          break;
        }
        case "homeValue": {
          setContact({ ...contact, homeValue: event.target.value });
          break;
        }
        default: {
          setContact({ ...contact });
          break;
        }
      }
    };


  return (
    <div>
      <Grid container>
        <Grid item xs={12} p={2}>
          <Typography style={{ fontSize: 20, fontWeight: 700 }}>
            CO-APPLICANT
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} mx={1}>
        {/* first name */}
        <Grid item xs={12}>
          <Grid container>
            {/* <Stack direction="row"> */}
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
                  First / Last
                </Typography>
              </label>
            </Grid>
            {console.log(contactList)}
            <Grid item xs={3} style={{ margin: "auto 10px" }}>
              {addApplicationFlag == "addApplication" ? (
                <div>
                  <Autocomplete
                    freeSolo
                    onChange={(event, val) => {
                      setSelect(val?.PK)
                      setContact(val?.basicInformation || {})
                    }}
                    clearOnEscape
                    options={contactList || []}
                    getOptionLabel={(option) =>
                      option?.basicInformation?.firstName
                    }
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Stack>
                          <h4>
                            {option?.basicInformation?.firstName +
                              " " +
                              option?.basicInformation?.lastName}
                          </h4>
                          <p style={{ color: "#9B9B9B" }}>
                            {option?.basicInformation?.emailAddress}
                          </p>
                          <p style={{ color: "#9B9B9B" }}>
                            {option?.basicInformation?.primaryNumber}
                          </p>
                        </Stack>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        onChange={(event) =>
                          handleChange("firstName", event)
                        }
                        size="small"
                        margin="normal"
                        id="outlined-basic"
                        variant="outlined"
                        value={contact?.firstName}
                      />
                    )}
                  />
                </div>
           
              ) : (
                <TextField
                  fullWidth
                  onChange={(event) => handleChange("firstName", event)}
                  size="small"
                  margin="normal"
                  id="outlined-basic"
                  variant="outlined"
                  value={contact?.firstName}
                />
              )}
            </Grid>
            <Grid item xs={5} pr={1}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("lastName", event)}
                value={contact?.lastName}
                size="small"
                margin="normal"
                id="outlined-basic"
                variant="outlined" 
              />
            </Grid>
            {/* </Stack> */}
          </Grid>
        </Grid>
        {/* email */}
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
                  Middle Initial
                </Typography>
              </label>
            </Grid>
            <Grid item xs={8} style={{ margin: "auto 10px" }}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("middleInitial", event)}
                value={contact?.middleInitial}
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
                  Other Names
                </Typography>
              </label>
            </Grid>
            <Grid item xs={8} style={{ margin: "auto 10px" }}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("otherName", event)}
                value={contact?.otherName}
                size="small"
                margin="normal"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} style={{ marginTop: 30 }}>
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
                  Email Address
                </Typography>
              </label>
            </Grid>
            <Grid item xs={8} style={{ margin: "auto 10px" }}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("emailAddress", event)}
                value={contact?.emailAddress}
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
            {/* <Stack direction="row"> */}
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
                  Home / Mobile
                </Typography>
              </label>
            </Grid>
            <Grid item xs={3} style={{ margin: "auto 10px" }}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("homePhoneNumber", event)}
                value={contact?.homePhoneNumber}
                size="small"
                margin="normal"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={5} pr={1}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("mobilePhoneNumber", event)}
                value={contact?.mobilePhoneNumber}
                size="small"
                margin="normal"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            {/* </Stack> */}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            {/* <Stack direction="row"> */}
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
                  Work / Fax
                </Typography>
              </label>
            </Grid>
            <Grid item xs={3} style={{ margin: "auto 10px" }}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("work", event)}
                value={contact?.work}
                size="small"
                margin="normal"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={5} pr={1}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("fax", event)}
                value={contact?.fax}
                size="small"
                margin="normal"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            {/* </Stack> */}
          </Grid>
        </Grid>
        {/* phone */}
        <Grid item xs={12} style={{ marginTop: 30 }}>
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
                  Address 1
                </Typography>
              </label>
            </Grid>
            {/* <TextField fullWidth error={basicInfo.phone !== "" && !validatePhoneNumber(basicInfo.phone)} onChange={(event) => handleChange('phone', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.phone} /> */}
            <Grid item xs={8} style={{ margin: "auto 10px" }}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("address1", event)}
                value={contact?.address1}
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
                  Address 2
                </Typography>
              </label>
            </Grid>
            {/* <TextField fullWidth error={basicInfo.phone !== "" && !validatePhoneNumber(basicInfo.phone)} onChange={(event) => handleChange('phone', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.phone} /> */}
            <Grid item xs={8} style={{ margin: "auto 10px" }}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("address2", event)}
                value={contact?.address2}
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
            {/* <Stack direction="row"> */}
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
                  City, State, Zip
                </Typography>
              </label>
            </Grid>

            <Grid item xs={5} pl={1}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("cityOrState", event)}
                value={contact?.cityOrState}
                size="small"
                margin="normal"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3} style={{ margin: "auto 10px" }}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("Zip", event)}
                value={contact?.Zip}
                size="small"
                margin="normal"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            {/* </Stack> */}
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
                  Country
                </Typography>
              </label>
            </Grid>
            {/* <TextField fullWidth error={basicInfo.phone !== "" && !validatePhoneNumber(basicInfo.phone)} onChange={(event) => handleChange('phone', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.phone} /> */}
            <Grid item xs={8} style={{ margin: "auto 10px" }}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("country", event)}
                value={contact?.country}
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
                  Eligibility Status
                </Typography>
              </label>
            </Grid>
            {/* <TextField fullWidth error={basicInfo.phone !== "" && !validatePhoneNumber(basicInfo.phone)} onChange={(event) => handleChange('phone', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.phone} /> */}
            <Grid item xs={8} style={{ margin: "auto 10px" }}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("eligibilityStatus", event)}
                value={contact?.eligibilityStatus}
                size="small"
                margin="normal"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} style={{ marginTop: 40 }}>
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
                  Primary Language
                </Typography>
              </label>
            </Grid>
            {/* <TextField fullWidth error={basicInfo.phone !== "" && !validatePhoneNumber(basicInfo.phone)} onChange={(event) => handleChange('phone', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.phone} /> */}
            <Grid item xs={8} style={{ margin: "auto 10px" }}>
              <div>
                <Autocomplete
                  
                  renderInput={(params) => (
                    <TextField
                      value={contact?.primaryLanguage}
                      {...params}
                      size="small"
                      label="Select Primary Language"
                    />
                  )}
                  onChange={(e, val) => {
                    handleChange("primaryLanguage", val)
                    return val;
                  }}
                  options={languages?.map((language) => language )}
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
                  Preferred Method
                </Typography>
              </label>
            </Grid>
            {/* <TextField fullWidth error={basicInfo.phone !== "" && !validatePhoneNumber(basicInfo.phone)} onChange={(event) => handleChange('phone', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.phone} /> */}
            <Grid item xs={8} style={{ margin: "auto 10px" }}>
              <div>
                <Autocomplete
                 
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      label=" Preferred Method"
                    />
                  )}
                  value={contact?.preferredMethod}
                  onChange={(e, val) => {
                    handleChange("preferredMethod", val)
                    return val;
                  }}
                  options={preferredMethods?.map((method) => method )}
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
                  Primary Number
                </Typography>
              </label>
            </Grid>
            {/* <TextField fullWidth error={basicInfo.phone !== "" && !validatePhoneNumber(basicInfo.phone)} onChange={(event) => handleChange('phone', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.phone} /> */}
            <Grid item xs={8} style={{ margin: "auto 10px" }}>
              <div>
                <Autocomplete
                  value={contact?.primaryNumber}
                  renderInput={(params) => (
                    <TextField {...params} size="small" label="Select" />
                  )}
                  onChange={(e, val) => {
                    handleChange("primaryNumber", val)
                    return val;
                  }}
                  options={[contact?.homePhoneNumber || "",contact?.mobilePhoneNumber || ""]?.map((phone) => phone)}
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
                  Best Time To Call
                </Typography>
              </label>
            </Grid>
            {/* <TextField fullWidth error={basicInfo.phone !== "" && !validatePhoneNumber(basicInfo.phone)} onChange={(event) => handleChange('phone', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.phone} /> */}
            <Grid item xs={8} style={{ margin: "auto 10px" }}>
              <div>
                <Autocomplete
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      label="Select Best Time To Call"
                    />
                  )}
                  value={contact?.bestTimeToCall}
                  onChange={(e, val) => {
                    handleChange("bestTimeToCall", val)
                    return val;
                  }}
                  options={bestTimes?.map((time) => time )}
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
                  Time Zone
                </Typography>
              </label>
            </Grid>
            {/* <TextField fullWidth error={basicInfo.phone !== "" && !validatePhoneNumber(basicInfo.phone)} onChange={(event) => handleChange('phone', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.phone} /> */}
            <Grid item xs={8} style={{ margin: "auto 10px" }}>
              <div>
                <Autocomplete
                  value={contact?.timeZone}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      label="Select Time Zone"
                    />
                  )}
                  onChange={(e, val) => {
                    handleChange("timeZone", val)
                    return val;
                  }}
                  options={timeZones?.map((timeZone) => timeZone )}
                ></Autocomplete>
              </div>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container>
            {/* <Stack direction="row"> */}
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
                  Credit Score/ Date
                </Typography>
              </label>
            </Grid>
            <Grid item xs={3} style={{ margin: "auto 10px" }}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("creditScore", event)}
                value={contact?.creditScore}
                size="small"
                margin="normal"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={5} pr={1}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("date", event)}
                value={contact?.date}
                size="small"
                margin="normal"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            {/* </Stack> */}
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
                  Credit Report Type
                </Typography>
              </label>
            </Grid>
            {/* <TextField fullWidth error={basicInfo.phone !== "" && !validatePhoneNumber(basicInfo.phone)} onChange={(event) => handleChange('phone', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.phone} /> */}
            <Grid item xs={8} style={{ margin: "auto 10px" }}>
              <div>
                <Autocomplete
                  value={contact?.creditReportType}
                  renderInput={(params) => (
                    <TextField {...params} size="small" label="Select" />
                  )}
                  onChange={(e, val) => {
                    handleChange("creditReportType", val)
                    return val;
                  }}
                  options={creditReportTypes?.map((type) => type )}
                ></Autocomplete>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            {/* <Stack direction="row"> */}
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
                  DOB/ SSN
                </Typography>
              </label>
            </Grid>
            <Grid item xs={3} style={{ margin: "auto 10px" }}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("dob", event)}
                value={contact?.dob}
                size="small"
                margin="normal"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={5} pr={1}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("ssn", event)}
                value={contact?.ssn}
                size="small"
                margin="normal"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            {/* </Stack> */}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            {/* <Stack direction="row"> */}
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
                  DL#/ State
                </Typography>
              </label>
            </Grid>
            <Grid item xs={3} style={{ margin: "auto 10px" }}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("dl", event)}
                value={contact?.dl}
                size="small"
                margin="normal"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={5} pr={1}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("state", event)}
                value={contact?.state}
                size="small"
                margin="normal"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            {/* </Stack> */}
          </Grid>
        </Grid>

        <Grid item xs={12} style={{ marginTop: 30 }}>
          <Grid container>
            {/* <Stack direction="row"> */}
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
                  Employer/ Occ
                </Typography>
              </label>
            </Grid>
            <Grid item xs={3} style={{ margin: "auto 10px" }}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("employer", event)}
                value={contact?.employer}
                size="small"
                margin="normal"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={5} pr={1}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("occ", event)}
                value={contact?.occ}
                size="small"
                margin="normal"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            {/* </Stack> */}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container>
            {/* <Stack direction="row"> */}
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
                  Emp Length Y/M
                </Typography>
              </label>
            </Grid>
            <Grid item xs={3} style={{ margin: "auto 10px" }}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("empLengthY", event)}
                value={contact?.empLengthY}
                size="small"
                margin="normal"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={5} pr={1}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("empLengthM", event)}
                value={contact?.empLengthM}
                size="small"
                margin="normal"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            {/* </Stack> */}
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
                  Martgage Balance
                </Typography>
              </label>
            </Grid>
            <Grid item xs={8} style={{ margin: "auto 10px" }}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("mortgageBalance", event)}
                value={contact?.mortgageBalance}                
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
                  Home Value
                </Typography>
              </label>
            </Grid>
            <Grid item xs={8} style={{ margin: "auto 10px" }}>
              <TextField
                fullWidth
                onChange={(event) => handleChange("homeValue", event)}
                value={contact?.homeValue}                
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

export default ApplicantFields