import React, { useEffect, useState, useCallback } from 'react'
import { Autocomplete, Avatar, Box, Button, CircularProgress, FormControlLabel, Grid, IconButton, InputAdornment, Paper, TablePagination, TextField, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { _addContact, _fetchAllContacts, _fetchContactById, _updateContactById } from '../../services/contactServices';
import { _gatVariabels } from '../../services/variabelService.js';
import { useRouter } from 'next/router'
import countries from '../../data'
import { MobileDatePicker } from '@mui/x-date-pickers';
import LoanApplicationTypePopup from '../../components/LoanApplicationTypePopup';

const defaultBasic = {
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
  country: ""
}

const defaultJob = {
  companyName: "",
  jobTitle: ""
}

function AddNewContact() {
  const router = useRouter();
  const id = router.query.params[0];
  const applicationProductId = router.query.params[1];
  const coEnabled = router.query.params[2];
  const applicationUser = router.query.params[3];

  const [loading, setLoading] = useState(false);
  const [variableData, setVariableData] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [formDisabled, setFormDisabled] = useState(false);

  const [basicInfo, setBasicInfo] = useState(defaultBasic)
  const [jobInfo, setJobInfo] = useState(defaultJob);
  const [additionalInfo, setAdditionalInfo] = useState({});
  const [selectedId, setSelectedId] = useState();
  const [createLoan, setCreatLoan] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [addedUserId, setAddedUserId] = useState();

  const [error, setError] = useState('');
  useEffect(() => {
    fetchAllContacts();
    if (id && id !== 'add') {
      fetchContactById(id);
    }
    if (applicationUser) {
      setBasicInfo(defaultBasic);
      setJobInfo(defaultJob);
      setAdditionalInfo({});
    }
    getVariables();
  }, [id, router.pathname, applicationUser])

  const getVariables = async () => {
    try {
      const res = await _gatVariabels();
      let data = await res?.data?.data?.Items?.filter((variable) => variable?.variableType == "contact")
      data = await data.sort((a, b) => (a.createTime > b.createTime) ? 1 : ((b.createTime > a.createTime) ? -1 : 0));
      console.log(res)
      setVariableData([...data])
    } catch (err) {
      console.log(err)
    }
  }
  const fetchContactById = async (id) => {
    setLoading(true);
    const response = await _fetchContactById(id);
    console.log("_fetchContactById", response)
    setLoading(false);
    if (response?.status === 200) {
      const contactData = response?.data?.Item;
      setBasicInfo(contactData?.basicInformation);
      setJobInfo(contactData?.jobInformation);
      setAdditionalInfo(contactData?.additionalInformation);
    } else {
      setError('Contact Not Found');
    }
  }

  const fetchAllContacts = async () => {
    try {
      const res = await _fetchAllContacts();
      setContactList(res?.data?.Items ? res?.data?.Items : []);
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (param, event) => {
    setError();
    switch (param) {
      case 'firstName': {
        setBasicInfo({ ...basicInfo, firstName: event.target.value });
        break;
      }
      case 'lastName': {
        setBasicInfo({ ...basicInfo, lastName: event.target.value });
        break;
      }
      case 'email': {
        setBasicInfo({ ...basicInfo, email: event.target.value });
        break;
      }
      case 'phone': {
        validatePhoneNumber(event.target.value);
        setBasicInfo({ ...basicInfo, phone: event.target.value });
        break;
      }
      case 'idNumber': {
        setBasicInfo({ ...basicInfo, idNumber: event.target.value });
        break;
      }
      case 'dob': {
        setBasicInfo({ ...basicInfo, dob: event });
        break;
      }
      case 'streetAddress': {
        setBasicInfo({ ...basicInfo, streetAddress: event.target.value });
        break;
      }
      case 'city': {
        setBasicInfo({ ...basicInfo, city: event.target.value });
        break;
      }
      case 'state': {
        setBasicInfo({ ...basicInfo, state: event.target.value });
        break;
      }
      case 'postalCode': {
        setBasicInfo({ ...basicInfo, postalCode: event.target.value });
        break;
      }
      // case 'country': {
      //   setBasicInfo({ ...basicInfo, country: event.target.value });
      //   break;
      // }
      case 'companyName': {
        setJobInfo({ ...jobInfo, companyName: event.target.value });
        break;
      }
      case 'jobTitle': {
        setJobInfo({ ...jobInfo, jobTitle: event.target.value });
        break;
      }
      default: {
        const additionalInfoCopy = { ...additionalInfo };
        additionalInfoCopy[param] = event.target.value;
        setAdditionalInfo(additionalInfoCopy);
      }
    }
  };

  const validatePhoneNumber = (input) => {
    var re = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{5})$/;

    return (re.test(input));
  }

  // const inputValidations = (contact) => {
  //   let error = "";
  //   for (const [key, val] of Object.entries({ ...contact })) {
  //     if (val.length === 0 || val === '') {
  //       setError("Required field cannot be empty!");
  //       error = "Required field cannot be empty!";
  //     } else {
  //       setError();
  //     }
  //   }
  //   if (Object.keys(contact).length < variableData.length) {
  //     setError("Missing required fields");
  //     error = "Missing required fields";
  //   }
  //   return error;
  // }

  const handleContinue = async () => {
    //  let inputErrors = await inputValidations(contact);
    //  if(inputErrors){
    //   setError(inputErrors)
    //  }
    if (validateForm() && validatePhoneNumber(basicInfo.phone)) {
      if (id === 'add' && !applicationProductId) {
        const contactData = {
          basicInformation: basicInfo,
          jobInformation: jobInfo,
          additionalInformation: additionalInfo
        }
        const response = await _addContact(contactData);
        if (response?.status === 201) {
          if (createLoan) {
            setAddedUserId(response.data.ID)
            setPopupOpen(true);
          } else {
            router.push('/contact')
          }
        } else {
          setError(response?.response.data['message']);
        }
      } else if (id === 'add' && applicationProductId && !applicationUser) {
        const selectedContact = contactList?.find(con => con?.basicInformation?.firstName === basicInfo?.firstName);
        if (selectedId && selectedContact && selectedContact?.PK === selectedId) {
          if (coEnabled && coEnabled === 'coEnabled') {
            router.push(`/contact/add/${applicationProductId}/coEnabled/${selectedId}`);
          } else if (coEnabled && coEnabled === 'coDisabled') {
            router.push(`/application/application-form-data?product=${applicationProductId}&contact=${selectedId}`);
          }
        } else {
          const contactData = {
            basicInformation: basicInfo,
            jobInformation: jobInfo,
            additionalInformation: additionalInfo
          }
          const response = await _addContact(contactData);
          if (response?.status === 201) {
            if (coEnabled && coEnabled === 'coEnabled') {
              router.push(`/contact/add/${applicationProductId}/coEnabled/${response.data.ID}`);
            } else if (coEnabled && coEnabled === 'coDisabled') {
              router.push(`/application/application-form-data?product=${applicationProductId}&contact=${response.data.ID}`);
            }
          } else {
            setError(response?.response.data['message']);
          }
        }
      } else if (id === 'add' && applicationProductId && applicationUser) {
        const selectedContact = contactList?.find(con => con?.basicInformation?.firstName === basicInfo?.firstName);
        if (selectedId && selectedContact && selectedContact?.PK === selectedId) {
          router.push(`/application/application-form-data?product=${applicationProductId}&cocontact=${selectedId}&contact=${applicationUser}`);
        } else {
          const contactData = {
            basicInformation: basicInfo,
            jobInformation: jobInfo,
            additionalInformation: additionalInfo
          }
          const response = await _addContact(contactData);
          if (response?.status === 201) {
            router.push(`/application/application-form-data?product=${applicationProductId}&cocontact=${response.data.ID}&contact=${applicationUser}`);
          } else {
            setError(response?.response.data['message']);
          }
        }
      } else {
        const contactData = {
          basicInformation: basicInfo,
          jobInformation: jobInfo,
          additionalInformation: additionalInfo
        }
        const response = await _updateContactById(id, contactData);
        if (response?.status === 200) {
          router.push('/contact')
        } else {
          setError(response?.response?.data['message']);
        }
      }
    } else {
      setError("Required fields are empty or invalid")
    }
  };

  const validateForm = () => {
    if (basicInfo.firstName === "" || basicInfo.lastName === "" || basicInfo.email === "" || basicInfo.idNumber === "" ||
      basicInfo.dob === "" || basicInfo.streetAddress === "" || basicInfo.city === "" || basicInfo.province === "" || basicInfo.postalCode === "" ||
      basicInfo.country === "") {
      return false;
    } else {
      return true;
    }
  }

  // const renderCountries = () => {
  //   const countryList = [];
  //   countries.forEach(country => {
  //     countryList.push(
  //       <MenuItem value={country.name} >
  //         <Typography align='left'>{country.name}</Typography>
  //       </MenuItem>
  //     )
  //   })

  //   return countryList;
  // }

  const handleSelectContact = (value) => {
    if (applicationProductId) {
      setSelectedId(value?.PK);
      setFormDisabled(true);
      setBasicInfo(value?.basicInformation);
      setJobInfo(value?.jobInformation);
      setAdditionalInfo(value?.additionalInformation);
    }
  }

  const handleClearSearch = () => {
    setBasicInfo(defaultBasic);
    setJobInfo(defaultJob);
    setAdditionalInfo({});
    setFormDisabled(false);
  }

  const handlePopupClose = () => {
    setPopupOpen(false)
  }
  console.log("Create Load ", createLoan)
  return (
    <>
      <LoanApplicationTypePopup popupOpen={!applicationProductId && popupOpen} userId={addedUserId} handleClose={handlePopupClose} />
      {loading ? <CircularProgress /> : <div style={{ backgroundColor: '#fff' }}>
        <Box >
          <Grid container >
            {applicationProductId ? <Grid item xs={12} md={6} p={2} mb={0} style={{ marginTop: 50 }}>
              <h1 className='page_header'>Application Form</h1>
              <h2 style={{ marginTop: 30 }}>{applicationUser ? "Co-Borrower" : "Contact"} Profile</h2>
            </Grid> :
              <Grid item xs={12} md={6} p={2} mb={5} style={{ marginTop: 50 }}>
                <h1 className='page_header'>{id === 'add' ? 'Add' : 'Update'} Contact</h1>
              </Grid>}
          </Grid>

          <Grid container>
            <Grid item xs={12} p={2}><Typography style={{ fontSize: 20, fontWeight: 700 }}>Basic Information</Typography></Grid>
          </Grid>

          <Grid container spacing={1} mx={1}>
            <Grid item xs={6}>
              <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>First Name <span style={{ color: '#FF0000' }}>*</span></Typography></label>
              {applicationProductId ? <Autocomplete
                freeSolo
                onChange={(event, val) => handleSelectContact(val)}
                clearOnEscape
                options={contactList || []}
                getOptionLabel={(option) => option?.basicInformation?.firstName}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Stack>
                      <h4>{option?.basicInformation?.firstName + ' ' + option?.basicInformation?.lastName}</h4>
                      <p style={{ color: '#9B9B9B' }}>{option?.basicInformation?.email}</p>
                      <p style={{ color: '#9B9B9B' }}>{option?.basicInformation?.phone}</p>
                    </Stack>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} fullWidth onChange={(event) => handleChange('firstName', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.firstName} />
                )}
              /> :
                <TextField fullWidth onChange={(event) => handleChange('firstName', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.firstName} />}
            </Grid>
            <Grid item xs={6}>
              <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>Last Name <span style={{ color: '#FF0000' }}>*</span></Typography></label>
              <TextField fullWidth onChange={(event) => handleChange('lastName', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.lastName} />
            </Grid>
            <Grid item xs={6}>
              <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>Email <span style={{ color: '#FF0000' }}>*</span></Typography></label>
              <TextField fullWidth onChange={(event) => handleChange('email', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.email} />
            </Grid>
            <Grid item xs={6}>
              <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>Phone <span style={{ color: '#FF0000' }}>*</span></Typography></label>
              <TextField fullWidth error={basicInfo.phone !== "" && !validatePhoneNumber(basicInfo.phone)} onChange={(event) => handleChange('phone', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.phone} />
            </Grid>
            <Grid item xs={6}>
              <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>ID Number <span style={{ color: '#FF0000' }}>*</span></Typography></label>
              <TextField type='number' fullWidth onChange={(event) => handleChange('idNumber', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.idNumber} />
            </Grid>
            <Grid item xs={6}>
              <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>Date of Birth <span style={{ color: '#FF0000' }}>*</span></Typography></label>
              <MobileDatePicker
                inputFormat="MM/DD/YYYY"
                value={basicInfo?.dob}
                disabled={applicationProductId && formDisabled}
                onChange={(event) => handleChange('dob', event)}
                renderInput={(params) => <TextField size="small" fullWidth margin="normal" {...params} error={false} />}
              />
            </Grid>
            <Grid item xs={6}>
              <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>Street Address <span style={{ color: '#FF0000' }}>*</span></Typography></label>
              <TextField fullWidth onChange={(event) => handleChange('streetAddress', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.streetAddress} />
            </Grid>
            <Grid item xs={6}>
              <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>City <span style={{ color: '#FF0000' }}>*</span></Typography></label>
              <TextField fullWidth onChange={(event) => handleChange('city', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.city} />
            </Grid>
            <Grid item xs={6}>
              <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>Province <span style={{ color: '#FF0000' }}>*</span></Typography></label>
              <TextField fullWidth onChange={(event) => handleChange('state', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.state} />
            </Grid>
            <Grid item xs={6}>
              <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>Zip or Postal Code <span style={{ color: '#FF0000' }}>*</span></Typography></label>
              <TextField fullWidth onChange={(event) => handleChange('postalCode', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.postalCode} />
            </Grid>
            {/* <Grid item xs={6}>
              <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>Country<span style={{ color: '#FF0000' }}>*</span></Typography></label>
              <FormControl fullWidth size='small' margin="normal">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  disabled={applicationProductId && formDisabled}
                  value={basicInfo?.country}
                  onChange={(event) => handleChange('country', event)}
                  placeholder='Cooper'
                >
                  {renderCountries()}
                </Select>
              </FormControl>
            </Grid> */}
          </Grid>

          <Grid container spacing={1} mx={1}>
            <Grid item xs={12} p={2} mt={4}><Typography style={{ fontSize: 20, fontWeight: 700 }}>Job Information</Typography></Grid>
            <Grid item xs={6}>
              <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>Company Name <span style={{ color: '#FF0000' }}>*</span></Typography></label>
              <TextField fullWidth onChange={(event) => handleChange('companyName', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={jobInfo?.companyName} />
            </Grid>
            <Grid item xs={6}>
              <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>Job Title <span style={{ color: '#FF0000' }}>*</span></Typography></label>
              <TextField fullWidth onChange={(event) => handleChange('jobTitle', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={jobInfo?.jobTitle} />
            </Grid>
          </Grid>

          <Grid container spacing={1} mx={1}>
            <Grid item xs={12} p={2} mt={4}><Typography style={{ fontSize: 20, fontWeight: 700 }}>Additional Information</Typography></Grid>
            {variableData && variableData.map((variable, key) => {
              return (<Grid item xs={6} key={key}>
                <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>{variable?.displayName}</Typography></label>
                <TextField type={variable.dataType} fullWidth onChange={(event) => handleChange(variable.systemName, event)} name={variable?.systemName} size="small" margin="normal" id="outlined-basic" variant="outlined" value={additionalInfo && additionalInfo[`${variable?.systemName}`]} />
              </Grid>)
            })}
          </Grid>

          <Grid container style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* body-section */}

            <Grid item xs={6} >
              <Stack direction="column" spacing={2} m={2}>


                {!applicationProductId && <Grid item >
                  <FormGroup>
                    <FormControlLabel control={<Checkbox checked={createLoan} onChange={(e, checked) => setCreatLoan(checked)} />} label="Create Loan Application" />
                  </FormGroup>
                </Grid>}


              </Stack>
            </Grid>

            <Grid item xs={6}>
              <Stack direction="column" spacing={2} m={2}>

              </Stack>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Stack direction="column" spacing={2} mx={2.5}>
              <p style={{ color: "red" }}>{error}</p>
            </Stack>
          </Grid>
          <div style={{ marginBottom: 100, display: 'flex', justifyContent: 'left', padding: 20 }}>
            <Button variant="contained" onClick={() => handleContinue()}>{applicationProductId ? 'Select' : id === 'add' ? 'Add' : 'Update'} Contact</Button>
          </div>
        </Box>

      </div>}
    </>
  )
}

AddNewContact.layout = "AdminLayout";


export default AddNewContact