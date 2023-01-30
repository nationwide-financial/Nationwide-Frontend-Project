import React, { useEffect, useState ,useCallback} from 'react'
import { Avatar, Box, Button, CircularProgress, FormControlLabel, Grid, IconButton, InputAdornment, TablePagination, TextField, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { _addContact, _fetchContactById, _updateContactById } from '../../services/contactServices';
import {_gatVariabels} from '../../services/variabelService.js';
import { useRouter } from 'next/router'
import countries from '../../data'

function AddNewContact() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [variableData, setVariableData] = useState([]);
  const [contact, setContact] = useState({});
  const [basicInfo, setBasicInfo] = useState({})
  
  // const [basicInfo, setBasicInfo] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   phone: "",
  //   idNumber: "",
  //   dob: "",
  //   streetAddress: "",
  //   city: "",
  //   state: "",
  //   postalCode: "",
  //   country: ""
  // })
  // const [jobInfo, setJobInfo] = useState(
  //   {
  //     companyName: "",
  //     jobTitle: ""
  //   }
  // )

  const [error, setError] = useState('');

  useEffect(() => {
    if (id && id !== 'add') {
      fetchContactById(id);
    }
    getVariables();
  }, [id])

  const onChangeHandler = useCallback(
      ({target}) => {
        setContact((state)=> ({ ...state, [target.name]:target.value }));
        console.log("contact",contact) 
      }, []
  );

  console.log(contact)
  const getVariables = async () =>{
    try{
      const res = await _gatVariabels();
      let data = await res?.data?.data?.Items.filter((variable)=>variable?.variableType == "contact")
      data = await data.sort((a,b) => (a.createTime > b.createTime) ? 1 : ((b.createTime > a.createTime) ? -1 : 0));
      console.log(res)
      setVariableData([...data])
    }catch(err){
      console.log(err)
    }
  }
  const fetchContactById = async (id) => {
    setLoading(true);
    const response = await _fetchContactById(id);
    console.log("_fetchContactById",response)
    setLoading(false);
    if (response?.status === 200) {
      const contactData = response?.data?.Item;
      setContact(contactData?.basicInformation)
          } else {
      setError('Contact Not Found');
    }
  }

  // const handleChange = (param, event) => {
  //   setError();
  //   switch (param) {
  //     case 'firstName': {
  //       setBasicInfo({ ...basicInfo, firstName: event.target.value });
  //       break;
  //     }
  //     case 'lastName': {
  //       setBasicInfo({ ...basicInfo, lastName: event.target.value });
  //       break;
  //     }
  //     case 'email': {
  //       setBasicInfo({ ...basicInfo, email: event.target.value });
  //       break;
  //     }
  //     case 'phone': {
  //       setBasicInfo({ ...basicInfo, phone: event.target.value });
  //       break;
  //     }
  //     case 'idNumber': {
  //       setBasicInfo({ ...basicInfo, idNumber: event.target.value });
  //       break;
  //     }
  //     case 'dob': {
  //       setBasicInfo({ ...basicInfo, dob: event.target.value });
  //       break;
  //     }
  //     case 'streetAddress': {
  //       setBasicInfo({ ...basicInfo, streetAddress: event.target.value });
  //       break;
  //     }
  //     case 'city': {
  //       setBasicInfo({ ...basicInfo, city: event.target.value });
  //       break;
  //     }
  //     case 'state': {
  //       setBasicInfo({ ...basicInfo, state: event.target.value });
  //       break;
  //     }
  //     case 'postalCode': {
  //       setBasicInfo({ ...basicInfo, postalCode: event.target.value });
  //       break;
  //     }
  //     case 'country': {
  //       setBasicInfo({ ...basicInfo, country: event.target.value });
  //       break;
  //     }
  //     case 'companyName': {
  //       setJobInfo({ ...jobInfo, companyName: event.target.value });
  //       break;
  //     }
  //     case 'jobTitle': {
  //       setJobInfo({ ...jobInfo, jobTitle: event.target.value });
  //       break;
  //     }
  //   }
  // };

  const inputValidations =  (contact) =>{
    let error = "";
    for (const [key, val] of Object.entries({ ...contact})) {
      if (val.length === 0 || val === '') {
        setError("Required field cannot be empty!");
        error = "Required field cannot be empty!";
      } else{
        setError();
      }
    }
    if(Object.keys(contact).length < variableData.length) {
      setError("Missing required fields");
      error = "Missing required fields";
    }
    return error;
  }

  const handleContinue = async () => {
   let inputErrors = await inputValidations(contact);
   if(inputErrors){
    setError(inputErrors)
   }
   console.log(inputErrors)
    if (id === 'add') {
      if (!inputErrors) {
        const contactData = {
          basicInformation: contact,
          // jobInformation: jobInfo,
        }
        const response = await _addContact(contactData);
        if (response?.status === 201) {
          router.push('/contact')
        } else {
          setError(response?.response.data['message']);
        }
      }
    } else {
      if (!inputErrors) {
        const contactData = {
          basicInformation: contact,
          // jobInformation: jobInfo,
        }
        const response = await _updateContactById(id, contactData);
        if (response?.status === 200) {
          router.push('/contact')
        } else {
          setError(response?.response?.data['message']);
        }
      }
    }
  };

  // const renderCountries = () => {
  //   const countryList = [];
  //   countries.forEach(country => {
  //     console.log("AA ", country.name)
  //     countryList.push(
  //       <MenuItem value={country.name} >
  //         <Typography align='left'>{country.name}</Typography>
  //       </MenuItem>
  //     )
  //   })

  //   return countryList;
  // }

  return (
    <>
      {loading ? <CircularProgress /> : <div style={{ backgroundColor: '#fff' }}>
        <Box >
          <Grid container >
            {/* header-section */}
            <Grid item xs={12} md={6} p={2} mb={5} style={{ marginTop:50}}>
              <h1 className='page_header'>{id === 'add' ? 'Add' : 'Update'} Contact</h1>
            </Grid>
          </Grid>


          {/* body-section-1---- */}
          <Grid container>
            <Grid item xs={12} p={2}><Typography style={{ fontSize: 20, fontWeight: 700 }}>Basic Information</Typography></Grid>
          </Grid>

          <Grid container spacing={1} mx={1}>
            {/* body-section */}

            {variableData && variableData.map((variable, key)=>{
              return(<Grid item xs={6} key={key}>
                <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>{variable?.displayName} <span style={{ color: '#FF0000' }}>*</span></Typography></label>
                <TextField fullWidth onChange={onChangeHandler} name={variable?.systemName} size="small" margin="normal" id="outlined-basic" variant="outlined" value={contact && contact[`${variable?.systemName}`] } />
              </Grid>)
            })}
            
            {/* <Grid item xs={6}>
              <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>Last Name <span style={{ color: '#FF0000' }}>*</span></Typography></label>
              <TextField fullWidth onChange={(event) => handleChange('lastName', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.lastName} />
            </Grid>
            <Grid item xs={6}>
              <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>Email <span style={{ color: '#FF0000' }}>*</span></Typography></label>
              <TextField fullWidth onChange={(event) => handleChange('email', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.email} />
            </Grid>
            <Grid item xs={6}>
              <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>Phone <span style={{ color: '#FF0000' }}>*</span></Typography></label>
              <TextField fullWidth onChange={(event) => handleChange('phone', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.phone} />
            </Grid>
            <Grid item xs={6}>
              <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>ID Number <span style={{ color: '#FF0000' }}>*</span></Typography></label>
              <TextField fullWidth onChange={(event) => handleChange('idNumber', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.idNumber} />
            </Grid>
            <Grid item xs={6}>
              <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>Date of Birth <span style={{ color: '#FF0000' }}>*</span></Typography></label>
              <TextField fullWidth onChange={(event) => handleChange('dob', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={basicInfo?.dob} />
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
            </Grid> */}
            {/* <Grid item xs={6}>
              <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>Country<span style={{ color: '#FF0000' }}>*</span></Typography></label>
              <FormControl fullWidth size='small' margin="normal">
                <InputLabel id="demo-simple-select-label">Cooper</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={basicInfo?.country}
                  onChange={(event) => handleChange('country', event)}
                  placeholder='Cooper'
                >
                  {renderCountries()}
                </Select>
              </FormControl>
            </Grid> */}
          </Grid>


          {/* body-section-2------- */}

          {/* <Grid container spacing={1} mx={1}>
            <Grid item xs={12} p={2}><Typography style={{ fontSize: 20, fontWeight: 700 }}>Job Information</Typography></Grid>
            <Grid item xs={6}>
              <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>Company Name <span style={{ color: '#FF0000' }}>*</span></Typography></label>
              <TextField fullWidth onChange={(event) => handleChange('companyName', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={jobInfo?.companyName} />
            </Grid>
            <Grid item xs={6}>
              <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>Job Title <span style={{ color: '#FF0000' }}>*</span></Typography></label>
              <TextField fullWidth onChange={(event) => handleChange('jobTitle', event)} size="small" margin="normal" id="outlined-basic" variant="outlined" value={jobInfo?.jobTitle} />
            </Grid>
          </Grid> */}

          <Grid container style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* body-section */}

            <Grid item xs={6} >
              <Stack direction="column" spacing={2} m={2}>


                <Grid item >
                  <FormGroup>
                    <FormControlLabel control={<Checkbox  />} label="Create Loan Application" />
                  </FormGroup>
                </Grid>


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
            <Button variant="contained" onClick={() => handleContinue()}>{id === 'add' ? 'Add' : 'Update'} Contact</Button>
          </div>
        </Box>

      </div>}
    </>
  )
}

AddNewContact.layout = "AdminLayout";


export default AddNewContact