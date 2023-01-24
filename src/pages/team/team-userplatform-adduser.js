import React, { useState, useCallback } from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import Link from '@mui/material/Link';
import { _addUser, _verifyUser } from '../../services/authServices';
import Button from '@mui/material/Button';
import Router from 'next/router'
function TeamUserplatformAdduser() {

  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const onChangeHandler = useCallback(
    ({ target }) => {
      setUser((state) => ({ ...state, [target.name]: target.value }));
    }, []
  );


  const onSubmit = async () => {
    const body = user
    if (!user || user && Object.keys(user).length === 0) {
      setError("Email and permissionGroup can not be empty")
    } else if (user && user['permissionGroup'] === '' || user['permissionGroup'] === undefined) {
      setError("permissionGroup can not be empty")
    } else if (user && user['email'] === '' || user['email'] === undefined) {
      setError("Email can not be empty")
    } else {
      setError('');
      console.log(body)
      const response = await _addUser(body);
      console.log(response)

      if (response?.status === 200 || 201) {
        const verify = await _verifyUser()
        if (verify?.status === 200 || 201) {
          Router.push('/login')
        } else {
          setError(response?.response.data['message'])
        }
      } else {
        setError(response?.response.data['message'])
      }
    }
  };

  return (
    <>
      <box>
        <Grid container>
          <h1 className='page_header'>Add User</h1>
        </Grid>
        <Grid container>
          <Stack direction="column" spaceing={1}>
            <FormControl style={{ display: 'flex', justifyContent: 'center' }}>
              <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>Email <span style={{ color: '#FF0000' }}>*</span></Typography></label>
              <Box sx={{ maxWidth: '100%', }} >
                <TextField label="Email"
                  name='email'
                  type="email" onChange={onChangeHandler}
                  value={user && user['email'] || ''}
                  fullWidth
                  autoFocus
                  size="small"
                  margin="normal"
                  id="outlined-basic"
                  variant="outlined" />
              </Box>
            </FormControl>
          </Stack>

          <Stack>
            <FormControl style={{ display: 'flex', justifyContent: 'center' }}>
              <Stack direction="row" style={{ display: 'inline-flex', justifyContent: 'space-between' }}>
                <label>  <Typography align='left' variant='h6' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal' }}>Permission Group <span style={{ color: '#FF0000' }}>*</span></Typography></label>
                <Stack direction="row" spacing={1} pt={1}>
                  <NoteAltOutlinedIcon mt={2} style={{ color: '#1478F1' }} />
                  <Link variant="text" align='right' style={{ fontSize: 17, fontWeight: 700, fontStyle: 'normal', textDecoration: 'none' }}>Edit Permission Group</Link>
                </Stack>

              </Stack>
              <Box sx={{ maxWidth: '100%', }} >
                <TextField label="Permission Group"
                  name='permissionGroup'
                  type="text"
                  value={user && user['permissionGroup'] || ''}
                  onChange={onChangeHandler}
                  fullWidth
                  autoFocus
                  size="small"
                  margin="normal"
                  id="outlined-basic"
                  variant="outlined" />
                <p style={{ color: "red" }}>{error}</p>
              </Box>
              <div>
                <Button size='small' variant="contained" sx={{ mt: 2 }} onClick={onSubmit}>Add User</Button>
              </div>

            </FormControl>
          </Stack>
        </Grid>
      </box>
    </>
  )
}

TeamUserplatformAdduser.layout = "AdminLayout";

export default TeamUserplatformAdduser