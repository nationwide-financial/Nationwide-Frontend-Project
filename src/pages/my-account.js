import React, { useEffect, useState, useContext } from 'react'
import { Alert, Avatar, Box, Button, Grid, InputAdornment, Snackbar, TextField, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { borderRadius } from '@mui/system';
import { HelpOutline, KeyboardReturnOutlined } from '@mui/icons-material';
import Image from 'next/image';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { _getUser, _resetPassword, _updateNoficationPreference, _updateUserField } from '../services/authServices';
import { Context } from "../context";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { _upoadProfilePic } from '../services/authServices';
import { s3URL } from "../utils/config";

const MyAccount = () => {
    const { state, dispatch} = useContext(Context);

    useEffect(() => {
        setProfileInfo({
            id: state?.user?.PK?.split('#')[1],
            email: state?.user?.info?.email,
            phone: state?.user?.info?.phone,
            notification: state?.user?.info?.notification
        })
    }, [state])

    const defaultProfileState = {
        id: '',
        email: '',
        phone: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        notification: {
            applicationCreated: false,
            applicationTaskCreated: false,
            applicationStatus: false,
            applicationTaskStatus: false,
            applicationRole: false,
            applicationTaskDocument: false,
            applicationDocumant: false,
            webhookEndpoint: false
        }
    }
    const profile = state?.user || {}

    const [editable, setEditable] = useState({ email: false, phone: false, password: false });
    const [profileInfo, setProfileInfo] = useState(defaultProfileState)
    const [loading, setLoading] = useState(false);
    const [apiStatus, setApiStatus] = useState();
    const [open, setOpen] = useState(false);
    const [profileImg, setProfileImg] = useState("");
    // console.log("Profile info ", profileInfo)

    const handleChange = (field, value) => {
        switch (field) {
            case 'email':
                setProfileInfo({ ...profileInfo, email: value });
                break;
            case 'phone':
                setProfileInfo({ ...profileInfo, phone: value });
                break;
            case 'oldPassword':
                setProfileInfo({ ...profileInfo, oldPassword: value });
                break;
            case 'newPassword':
                setProfileInfo({ ...profileInfo, newPassword: value });
                break;
            case 'confirmPassword':
                setProfileInfo({ ...profileInfo, confirmPassword: value });
                break;
            default:
                console.log("No field defined")
        }
    }

    const handleClickSave = async (field) => {
        switch (field) {
            case 'email':
                const emailBody = {
                    data: profileInfo.email
                }
                setLoading(true)
                const emailResponse = await _updateUserField(profileInfo.id, 'email', emailBody);
                if (emailResponse?.status === 200) {
                    setProfileInfo({ ...profileInfo, email: emailResponse?.data?.user?.info?.email })
                    setEditable({ ...editable, email: false })
                    setApiStatus({ severity: 'success', message: 'Email updated' })
                }
                setLoading(false);
                break;
            case 'phone':
                const phoneBody = {
                    data: profileInfo.phone
                }
                setLoading(true)
                const phoneResponse = await _updateUserField(profileInfo.id, 'phone', phoneBody);

                if (phoneResponse?.status === 200) {
                    setProfileInfo({ ...profileInfo, phone: phoneResponse?.data?.user?.info?.phone })
                    setEditable({ ...editable, phone: false })
                    setApiStatus({ severity: 'success', message: 'Phone updated' })
                }
                setLoading(false);
                break;
            case 'password':
                const passwordBody = {
                    oldPassword: profileInfo.oldPassword,
                    newPassword: profileInfo.newPassword,
                    confirmPassword: profileInfo.confirmPassword
                }
                setLoading(true);
                const passwordResponse = await _resetPassword(profileInfo.id, passwordBody);
                setProfileInfo({ ...profileInfo, oldPassword: '', newPassword: '', confirmPassword: '' })
                setEditable({ ...editable, password: false })
                if (passwordResponse?.status === 200) {
                    setApiStatus({ severity: 'success', message: 'Password updated' })
                } else {
                    setApiStatus({ severity: 'error', message: 'Error updating password' })
                }
                setLoading(false);
                break;
        }
    }

    const handleUpdateNotificationPreference = async (type, value) => {
        const requestBody = {
            notificationType: type,
            value: value
        }
        
        const response = await _updateNoficationPreference(requestBody);
        const { notification } = response.data
        switch (type) {
            case 'applicationCreated':
                if (response?.status === 200) {
                    setProfileInfo({
                        ...profileInfo, notification: { ...notification, applicationCreated: notification.applicationCreated }
                    })
                    setApiStatus({ severity: 'success', message: 'Notification preference changed' })
                } else {
                    setApiStatus({ severity: 'error', message: 'Notification preference update failed failed' })
                }
                break;
            case 'applicationTaskCreated':
                if (response?.status === 200) {
                    setProfileInfo({
                        ...profileInfo, notification: { ...notification, applicationTaskCreated: notification.applicationTaskCreated }
                    })
                    setApiStatus({ severity: 'success', message: 'Notification preference changed' })
                } else {
                    setApiStatus({ severity: 'error', message: 'Notification preference update failed failed' })
                }
                break;
            case 'applicationStatus':
                if (response?.status === 200) {
                    setProfileInfo({
                        ...profileInfo, notification: { ...notification, applicationStatus: notification.applicationStatus }
                    })
                    setApiStatus({ severity: 'success', message: 'Notification preference changed' })
                } else {
                    setApiStatus({ severity: 'error', message: 'Notification preference update failed failed' })
                }
                break;
            case 'applicationTaskStatus':
                if (response?.status === 200) {
                    setProfileInfo({
                        ...profileInfo, notification: { ...notification, applicationTaskStatus: notification.applicationTaskStatus }
                    })
                    setApiStatus({ severity: 'success', message: 'Notification preference changed' })
                } else {
                    setApiStatus({ severity: 'error', message: 'Notification preference update failed failed' })
                }
                break;
            case 'applicationRole':
                if (response?.status === 200) {
                    setProfileInfo({
                        ...profileInfo, notification: { ...notification, applicationRole: notification.applicationRole }
                    })
                    setApiStatus({ severity: 'success', message: 'Notification preference changed' })
                } else {
                    setApiStatus({ severity: 'error', message: 'Notification preference update failed failed' })
                }
                break;
            case 'applicationTaskDocument':
                if (response?.status === 200) {
                    setProfileInfo({
                        ...profileInfo, notification: { ...notification, applicationTaskDocument: notification.applicationTaskDocument }
                    })
                    setApiStatus({ severity: 'success', message: 'Notification preference changed' })
                } else {
                    setApiStatus({ severity: 'error', message: 'Notification preference update failed failed' })
                }
                break;
            case 'applicationDocumant':
                if (response?.status === 200) {
                    setProfileInfo({
                        ...profileInfo, notification: { ...notification, applicationDocumant: notification.applicationDocumant }
                    })
                    setApiStatus({ severity: 'success', message: 'Notification preference changed' })
                } else {
                    setApiStatus({ severity: 'error', message: 'Notification preference update failed failed' })
                }
                break;
            case 'webhookEndpoint':
                if (response?.status === 200) {
                    setProfileInfo({
                        ...profileInfo, notification: { ...notification, webhookEndpoint: notification.webhookEndpoint }
                    })
                    setApiStatus({ severity: 'success', message: 'Notification preference changed' })
                } else {
                    setApiStatus({ severity: 'error', message: 'Notification preference update failed failed' })
                }
                break;
            default:
                console.log("No type defined")
        }
    }
//   `;
//     const Item = styled(Paper)(({ theme }) => ({
//         padding: theme.spacing(2),
//         borderBottom: '1px solid #D9D9D9',
//         borderRadius: 0,
//         boxShadow: 'none'
//     }));
//     const IOSSwitch = styled((props) => (
//         <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
//     ))(({ theme }) => ({
//         width: 42,
//         height: 26,
//         padding: 0,
//         '& .MuiSwitch-switchBase': {
//             padding: 0,
//             margin: 2,
//             transitionDuration: '300ms',
//             '&.Mui-checked': {
//                 transform: 'translateX(16px)',
//                 color: '#fff',
//                 '& + .MuiSwitch-track': {
//                     backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#1976d2',
//                     opacity: 1,
//                     border: 0,
//                 },
//                 '&.Mui-disabled + .MuiSwitch-track': {
//                     opacity: 0.5,
//                 },
//             },
//             '&.Mui-focusVisible .MuiSwitch-thumb': {
//                 color: '#33cf4d',
//                 border: '6px solid #fff',
//             },
//             '&.Mui-disabled .MuiSwitch-thumb': {
//                 color:
//                     theme.palette.mode === 'light'
//                         ? theme.palette.grey[100]
//                         : theme.palette.grey[600],
//             },
//             '&.Mui-disabled + .MuiSwitch-track': {
//                 opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
//             },
//         },
//         '& .MuiSwitch-thumb': {
//             boxSizing: 'border-box',
//             width: 22,
//             height: 22,
//         },
//         '& .MuiSwitch-track': {
//             borderRadius: 26 / 2,
//             backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
//             opacity: 1,
//             transition: theme.transitions.create(['background-color'], {
//                 duration: 500,
//             }),
//         },
//     }));

    function BootstrapDialogTitle(props) {
        const { children, onClose, ...other } = props;
      
        return (
          <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            ) : null}
          </DialogTitle>
        );
    }

    // const {state, dispatch} = useContext(Context);
    // const profile = state?.user || {} 
    

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
    setOpen(false);
    };
    const handleSubmit = async () => {
    try {
        const response = await _upoadProfilePic(profileImg);
        console.log("response", response);
        if (response?.status == 200) {
        //alert("you have successfully added");
        // handleSuccessMessage()
        // setMessage("you have successfully added")
        dispatch({
            type: "LOGGED_IN_USER",
            payload: {...profile, imageId: response?.data?.uploded}
        })
        handleClose();
        }
        
    } catch (error) {
        console.log(error);
    }
    };

    return (
        <div style={{ padding: "10px 20px", backgroundColor: "#fff" }}>
            {/* <style>{styles}</style> */}
            {apiStatus &&
                <Snackbar open={apiStatus} autoHideDuration={6000} onClose={() => setApiStatus()}>
                    <Alert variant='filled' severity={apiStatus.severity}>
                        {apiStatus.message}
                    </Alert>
                </Snackbar>}
            <h1 className='page_header'>My Account</h1>
            <Box mt={5}>
                <div style={{ display: 'flex' }}>
                    <div className='profileImg' onClick={handleClickOpen}>
                      <Avatar title="upload your image" alt="profile" style={{width:"60px", height:"60px"}} src={profile?.imageId ? `${s3URL}/${profile.imageId}` : '/images/profile.png'} />
                      <PhotoCamera />
                    </div>
                    <Box ml={1}>
                        <p className='name_font'><b>{`${profile?.info?.firstName || "no-name"} ${profile?.info?.lastName || ""}`}</b></p>
                        <p className='capitalize'>{profile?.info?.designation || "no designation"}</p>
                    </Box>
                    <Box ml={4} style={{ display: 'flex' }}>
                        <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25.1903 3.15314C25.3421 3.30544 25.4274 3.51172 25.4274 3.72676C25.4274 3.94181 25.3421 4.14809 25.1903 4.30039L23.4954 5.99689L20.2454 2.74689L21.9403 1.05039C22.0927 0.898069 22.2993 0.8125 22.5147 0.8125C22.7302 0.8125 22.9368 0.898069 23.0892 1.05039L25.1903 3.15151V3.15314ZM22.3465 7.14414L19.0965 3.89414L8.02541 14.9669C7.93598 15.0563 7.86865 15.1654 7.82879 15.2854L6.52066 19.2081C6.49694 19.2797 6.49357 19.3564 6.51093 19.4297C6.5283 19.503 6.56571 19.57 6.61899 19.6233C6.67227 19.6766 6.73931 19.714 6.81263 19.7314C6.88595 19.7487 6.96265 19.7454 7.03416 19.7216L10.9569 18.4135C11.0768 18.3741 11.1858 18.3074 11.2754 18.2185L22.3465 7.14576V7.14414Z" fill="#1478F1" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.625 21.9375C1.625 22.584 1.88181 23.204 2.33893 23.6611C2.79605 24.1182 3.41603 24.375 4.0625 24.375H21.9375C22.584 24.375 23.204 24.1182 23.6611 23.6611C24.1182 23.204 24.375 22.584 24.375 21.9375V12.1875C24.375 11.972 24.2894 11.7653 24.137 11.613C23.9847 11.4606 23.778 11.375 23.5625 11.375C23.347 11.375 23.1403 11.4606 22.988 11.613C22.8356 11.7653 22.75 11.972 22.75 12.1875V21.9375C22.75 22.153 22.6644 22.3597 22.512 22.512C22.3597 22.6644 22.153 22.75 21.9375 22.75H4.0625C3.84701 22.75 3.64035 22.6644 3.48798 22.512C3.3356 22.3597 3.25 22.153 3.25 21.9375V4.0625C3.25 3.84701 3.3356 3.64035 3.48798 3.48798C3.64035 3.3356 3.84701 3.25 4.0625 3.25H14.625C14.8405 3.25 15.0472 3.1644 15.1995 3.01202C15.3519 2.85965 15.4375 2.65299 15.4375 2.4375C15.4375 2.22201 15.3519 2.01535 15.1995 1.86298C15.0472 1.7106 14.8405 1.625 14.625 1.625H4.0625C3.41603 1.625 2.79605 1.88181 2.33893 2.33893C1.88181 2.79605 1.625 3.41603 1.625 4.0625V21.9375Z" fill="#1478F1" />
                        </svg>
                        <Typography ml={1} className='edit_profile'>Edit Personal Profile</Typography>
                    </Box>
                </div>
            </Box>
            <Box mt={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <p><b>Login details</b></p>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <div className='topmargin'></div>
                        <Grid container>
                            <Grid item xs={12} md={3}>
                                <p>Email Address</p>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {editable.email ? <Stack direction='row' gap={2}>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        onChange={e => handleChange('email', e.target.value)}
                                        value={profileInfo.email}
                                        disabled={loading}
                                    />
                                    <Button disabled={loading} size='small' variant='contained' onClick={() => handleClickSave('email')}>Save</Button>
                                    <Button disabled={loading} onClick={() => setEditable({ ...editable, email: false })} size='small' variant='outlined'>Cancel</Button>
                                </Stack>
                                    : <span><b>{profileInfo?.email || "no email"}</b></span>}
                                {/* <span className='verified_label'>verified</span> */}
                                <p onClick={() => setEditable({ ...editable, email: true })} className='edit_profile'>Change Email Address</p>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} md={3}>
                                <p>Phone Number</p>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {editable.phone ?
                                    <Stack direction='row' gap={2}>
                                        <TextField
                                            fullWidth
                                            disabled={loading}
                                            size='small'
                                            onChange={(e) => handleChange('phone', e.target.value)}
                                            value={profileInfo.phone}
                                        />
                                        <Button disabled={loading} size='small' variant='contained' onClick={() => handleClickSave('phone')}>Save</Button>
                                        <Button disabled={loading} onClick={() => setEditable({ ...editable, phone: false })} size='small' variant='outlined'>Cancel</Button>
                                    </Stack>
                                    : <span><b>{profileInfo.phone ? profileInfo.phone : "No number assigned"}</b></span>
                                }
                                {/* <span className='verified_label'>verified</span> */}
                                <p onClick={() => setEditable({ ...editable, phone: true })} className='edit_profile'>Change Phone Number</p>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} md={3}>
                                <p>Password</p>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {editable.password ?
                                    <Stack direction='column' gap={2}>
                                        <TextField
                                            fullWidth
                                            disabled={loading}
                                            size='small'
                                            type='password'
                                            onChange={(e) => handleChange('oldPassword', e.target.value)}
                                            value={profileInfo.oldPassword}
                                            placeholder='Current Password'
                                        />
                                        <TextField
                                            fullWidth
                                            disabled={loading}
                                            size='small'
                                            type='password'
                                            onChange={(e) => handleChange('newPassword', e.target.value)}
                                            value={profileInfo.newPassword}
                                            placeholder='New Password'
                                        />
                                        <TextField
                                            fullWidth
                                            disabled={loading}
                                            size='small'
                                            type='password'
                                            onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                            value={profileInfo.confirmPassword}
                                            placeholder='Re-enter new password'
                                        />
                                        <Stack direction='row' gap={2}>
                                            <Button disabled={loading} fullWidth size='small' variant='contained' onClick={() => handleClickSave('password')}>Save</Button>
                                            <Button disabled={loading} fullWidth onClick={() => setEditable({ ...editable, password: false })} size='small' variant='outlined'>Cancel</Button>
                                        </Stack>
                                    </Stack>
                                    : <span><b>***************</b></span>}
                                <p onClick={() => setEditable({ ...editable, password: true })} className='edit_profile'>Change Password</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box mt={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <p><b>Notification Emails</b></p>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <p><b>Workflow</b><HelpOutline className='helpIcon' /></p>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <FormControlLabel
                                    control={<Switch sx={{ m: 1 }}
                                        checked={profileInfo.notification?.applicationCreated}
                                        onChange={(e) => handleUpdateNotificationPreference('applicationCreated', e.target.checked)}
                                    />}
                                    label="Application created"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControlLabel
                                    control={<Switch sx={{ m: 1 }}
                                        checked={profileInfo.notification?.applicationTaskCreated}
                                        onChange={(e) => handleUpdateNotificationPreference('applicationTaskCreated', e.target.checked)}
                                    />}
                                    label="Application task created"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControlLabel
                                    control={<Switch sx={{ m: 1 }}
                                        checked={profileInfo.notification?.applicationStatus}
                                        onChange={(e) => handleUpdateNotificationPreference('applicationStatus', e.target.checked)}
                                    />}
                                    label="Application status change"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControlLabel
                                    control={<Switch sx={{ m: 1 }}
                                        checked={profileInfo.notification?.applicationTaskStatus}
                                        onChange={(e) => handleUpdateNotificationPreference('applicationTaskStatus', e.target.checked)}
                                    />}
                                    label="Application task status change"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControlLabel
                                    control={<Switch sx={{ m: 1 }}
                                        checked={profileInfo.notification?.applicationRole}
                                        onChange={(e) => handleUpdateNotificationPreference('applicationRole', e.target.checked)}
                                    />}
                                    label="Application role change"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControlLabel
                                    control={<Switch sx={{ m: 1 }}
                                        checked={profileInfo.notification?.applicationTaskDocument}
                                        onChange={(e) => handleUpdateNotificationPreference('applicationTaskDocument', e.target.checked)}
                                    />}
                                    label="Application task document added"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControlLabel
                                    control={<Switch sx={{ m: 1 }}
                                        checked={profileInfo.notification?.applicationDocumant}
                                        onChange={(e) => handleUpdateNotificationPreference('applicationDocumant', e.target.checked)}
                                    />}
                                    label="Application document uploaded"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <p><b>Technical</b><HelpOutline className='helpIcon' /></p>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <FormControlLabel
                                    control={<Switch sx={{ m: 1 }}
                                        checked={profileInfo.notification?.webhookEndpoint}
                                        onChange={(e) => handleUpdateNotificationPreference('webhookEndpoint', e.target.checked)}

                                    />}
                                    label="Webhook endpoint not responding"
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Box>

            {/* upload profile image */}
            <Dialog open={open} onClose={handleClose} fullWidth>
                <Box sx={{ width: 1000, maxWidth: "100%" }}>
                  <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                  >
                    <Typography
                      variant="h6"
                      style={{ fontSize: 30 }}
                      className="page_header"
                    >
                      Upload profile image
                    </Typography>
                  </BootstrapDialogTitle>

                  <DialogContent>
                    <form>
                      <div
                        style={{
                          borderStyle: "dashed",
                          border: "5 solid #fff ",
                          borderColor: "grey",
                          padding: 5,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={2}
                          margin="normal"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                          >
                            <input
                              hidden
                              accept="image/*"
                              type="file"
                              name="loanIcon"
                              onChange={(event) => {
                                setProfileImg(event.target.files[0]);
                              }}
                            />

                            <Grid container>
                              { profileImg ? <Avatar style={{width:"100px", height:"100px"}} className="uploadImg" alt='profile image' src={URL.createObjectURL(profileImg)} /> :
                                <>
                                  <Grid item xs={12}>
                                    <PhotoCamera color="disabled" />
                                  </Grid>
                                  <Grid item xs={12}>
                                      <Typography style={{ color: "#E0DCDC" }}>
                                        Drag & Drop here
                                      </Typography>
                                  </Grid>
                                </>
                              }
                            </Grid>
                          </IconButton>
                        </Stack>
                      </div>
                    </form>
                  </DialogContent>

                  <DialogActions mb={5}>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      Style={{
                        fontSize: 16,
                        fontWeight: 700,
                        textTransform: "capitalize",
                      }}
                    >
                      Upload
                    </Button>
                  </DialogActions>
                </Box>
            </Dialog>
        </div>
    )
}

MyAccount.layout = "AdminLayout";
export default MyAccount