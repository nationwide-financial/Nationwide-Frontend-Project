import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import {
  _addContact,
  _fetchContactById,
  _updateContactById,
} from "../../services/contactServices";
import { useRouter } from "next/router";
import countries from "../../data";

function AddNewContact() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [basicInfo, setBasicInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    idNumber: "",
    dob: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [jobInfo, setJobInfo] = useState({
    companyName: "",
    jobTitle: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (id && id !== "add") {
      fetchContactById(id);
    }
  }, [id]);

  const fetchContactById = async (id) => {
    setLoading(true);
    const response = await _fetchContactById(id);
    setLoading(false);
    if (response?.status === 200) {
      const contactData = response?.data?.Item;
      setBasicInfo(contactData?.basicInformation);
      setJobInfo(contactData?.jobInformation);
    } else {
      setError("Contact Not Found");
    }
  };

  const handleChange = (param, event) => {
    setError();
    switch (param) {
      case "firstName": {
        setBasicInfo({ ...basicInfo, firstName: event.target.value });
        break;
      }
      case "lastName": {
        setBasicInfo({ ...basicInfo, lastName: event.target.value });
        break;
      }
      case "email": {
        setBasicInfo({ ...basicInfo, email: event.target.value });
        break;
      }
      case "phone": {
        setBasicInfo({ ...basicInfo, phone: event.target.value });
        break;
      }
      case "idNumber": {
        setBasicInfo({ ...basicInfo, idNumber: event.target.value });
        break;
      }
      case "dob": {
        setBasicInfo({ ...basicInfo, dob: event.target.value });
        break;
      }
      case "streetAddress": {
        setBasicInfo({ ...basicInfo, streetAddress: event.target.value });
        break;
      }
      case "city": {
        setBasicInfo({ ...basicInfo, city: event.target.value });
        break;
      }
      case "state": {
        setBasicInfo({ ...basicInfo, state: event.target.value });
        break;
      }
      case "postalCode": {
        setBasicInfo({ ...basicInfo, postalCode: event.target.value });
        break;
      }
      case "country": {
        setBasicInfo({ ...basicInfo, country: event.target.value });
        break;
      }
      case "companyName": {
        setJobInfo({ ...jobInfo, companyName: event.target.value });
        break;
      }
      case "jobTitle": {
        setJobInfo({ ...jobInfo, jobTitle: event.target.value });
        break;
      }
    }
  };

  const handleContinue = async () => {
    for (const [key, val] of Object.entries({ ...basicInfo, ...jobInfo })) {
      if (val.length === 0 || val === "") {
        setError("Missing required fields");
        return;
      } else {
        setError();
      }
    }

    console.log("Error ", error?.length);

    if (id === "add") {
      if (!error) {
        const contactData = {
          basicInformation: basicInfo,
          jobInformation: jobInfo,
        };

        const response = await _addContact(contactData);

        if (response?.status === 201) {
          router.push("/contact");
        } else {
          setError(response?.response.data["message"]);
        }
      }
    } else {
      if (!error) {
        const contactData = {
          basicInformation: basicInfo,
          jobInformation: jobInfo,
        };

        const response = await _updateContactById(id, contactData);

        if (response?.status === 200) {
          router.push("/contact");
        } else {
          setError(response?.response?.data["message"]);
        }
      }
    }
  };

  const renderCountries = () => {
    const countryList = [];
    countries.forEach((country) => {
      console.log("AA ", country.name);
      countryList.push(
        <MenuItem value={country.name}>
          <Typography align="left">{country.name}</Typography>
        </MenuItem>
      );
    });

    return countryList;
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div style={{ backgroundColor: "#fff" }}>
          <Box
            style={{
              padding: 40,
              // margin: 20,
            }}
          >
            <Grid container>
              {/* header-section */}
              <Grid item xs={12} md={6} p={2} mb={5}>
                <h1 className="page_header">
                  {id === "add" ? "Add" : "Update"} Contact
                </h1>
              </Grid>
            </Grid>

            {/* body-section-1---- */}
            <Grid container mb={4}>
              <Grid item xs={12} p={2}>
                <Typography style={{ fontSize: 20, fontWeight: 700 }}>
                  Basic Information
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} mx={1}>
              {/* body-section */}
              <Grid item xs={6}>
                <Grid mr={1}>
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
                      First Name <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>

                  <TextField
                    fullWidth
                    onChange={(event) => handleChange("firstName", event)}
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    variant="outlined"
                    value={basicInfo?.firstName}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid ml={1}>
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
                      Last Name <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>

                  <TextField
                    fullWidth
                    onChange={(event) => handleChange("lastName", event)}
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    variant="outlined"
                    value={basicInfo?.lastName}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid mr={1}>
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
                      Email <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>
                  <TextField
                    fullWidth
                    onChange={(event) => handleChange("email", event)}
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    variant="outlined"
                    value={basicInfo?.email}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid ml={1}>
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
                      Phone <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>
                  <TextField
                    fullWidth
                    onChange={(event) => handleChange("phone", event)}
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    variant="outlined"
                    value={basicInfo?.phone}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid mr={1}>
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
                      ID Number <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>
                  <TextField
                    fullWidth
                    onChange={(event) => handleChange("idNumber", event)}
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    variant="outlined"
                    value={basicInfo?.idNumber}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid ml={1}>
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
                      Date of Birth <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>
                  <TextField
                    fullWidth
                    onChange={(event) => handleChange("dob", event)}
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    variant="outlined"
                    value={basicInfo?.dob}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid mr={1}>
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
                      Street Address <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>
                  <TextField
                    fullWidth
                    onChange={(event) => handleChange("streetAddress", event)}
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    variant="outlined"
                    value={basicInfo?.streetAddress}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid ml={1}>
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
                      City <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>
                  <TextField
                    fullWidth
                    onChange={(event) => handleChange("city", event)}
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    variant="outlined"
                    value={basicInfo?.city}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid mr={1}>
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
                      Province <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>
                  <TextField
                    fullWidth
                    onChange={(event) => handleChange("state", event)}
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    variant="outlined"
                    value={basicInfo?.state}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid ml={1}>
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
                      Zip or Postal Code{" "}
                      <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>
                  <TextField
                    fullWidth
                    onChange={(event) => handleChange("postalCode", event)}
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    variant="outlined"
                    value={basicInfo?.postalCode}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid mr={1}>
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
                      Country<span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>
                  <FormControl fullWidth size="small" margin="normal">
                    {/* <InputLabel id="demo-simple-select-label">Cooper</InputLabel> */}
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={basicInfo?.country}
                      onChange={(event) => handleChange("country", event)}
                      placeholder="Cooper"
                    >
                      {renderCountries()}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* body-section-2------- */}

            <Grid container spacing={1} mx={1} mt={4}>
              <Grid item xs={12} p={2} mb={4}>
                <Typography style={{ fontSize: 20, fontWeight: 700 }}>
                  Job Information
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Grid mr={1}>
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
                      Company Name <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>
                  <TextField
                    fullWidth
                    onChange={(event) => handleChange("companyName", event)}
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    variant="outlined"
                    value={jobInfo?.companyName}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid ml={1}>
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
                      Job Title <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>
                  <TextField
                    fullWidth
                    onChange={(event) => handleChange("jobTitle", event)}
                    size="small"
                    margin="normal"
                    id="outlined-basic"
                    variant="outlined"
                    value={jobInfo?.jobTitle}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {/* body-section */}

              <Grid item xs={6}>
                <Stack direction="column" spacing={2} m={2}>
                  <Grid item>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Create Loan Application"
                      />
                    </FormGroup>
                  </Grid>
                </Stack>
              </Grid>

              <Grid item xs={6}>
                <Stack direction="column" spacing={2} m={2}></Stack>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Stack direction="column" spacing={2} mx={2.5}>
                <p style={{ color: "red" }}>{error}</p>
              </Stack>
            </Grid>
            <div
              style={{
                marginBottom: 100,
                display: "flex",
                justifyContent: "left",
                padding: 20,
              }}
            >
              <Button
                variant="contained"
                onClick={() => handleContinue()}
                style={{ textTransform: "capitalize", fontWeight: 700 }}
              >
                {id === "add" ? "Add" : "Update"} Contact
              </Button>
            </div>
          </Box>
        </div>
      )}
    </>
  );
}

AddNewContact.layout = "AdminLayout";

export default AddNewContact;
