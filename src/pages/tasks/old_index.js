import React, { useEffect, useState } from 'react'
import { Avatar, Grid, InputAdornment, TextField, AvatarGroup, CircularProgress, Box, Alert, Snackbar } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import TasksTable from '../../components/tasksTable'
import { _fetchAllTasks, _deleteTaskById } from '../../services/loanTaskServices'
import SearchBox from '../../components/searchBox/searchBox.js'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { Typography, Button, Divider, Pagination, Stack } from '@mui/material'
import moment from 'moment'
import Link from 'next/link'
import Modal from "@mui/material/Modal";
import { useRouter } from 'next/router'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const OldTasks = () => {
  const router = useRouter();

  const [taskData, setTaskData] = useState([]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  
  const [selectTask,setSelectTask] = useState()
  const [openModify, setOpenModify] = useState(false);
  const handleOpenModify = () => setOpenModify(true);
  const handleCloseModify = () => {
    setOpenModify(false);
  };

  const newShade = (hexColor, magnitude) => {
    hexColor = hexColor.replace(`#`, ``);
    if (hexColor.length === 6) {
      const decimalColor = parseInt(hexColor, 16);
      let r = (decimalColor >> 16) + magnitude;
      r > 255 && (r = 255);
      r < 0 && (r = 0);
      let g = (decimalColor & 0x0000ff) + magnitude;
      g > 255 && (g = 255);
      g < 0 && (g = 0);
      let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
      b > 255 && (b = 255);
      b < 0 && (b = 0);
      return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
    } else {
      return hexColor;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [])

  const fetchTasks = async () => {
    setLoading(true);
    const response = await _fetchAllTasks();
    let tableDt = await response?.data?.loanTasks?.Items.sort((a,b) => (a.createTime < b.createTime) ? 1 : ((b.createTime < a.createTime) ? -1 : 0));
    console.log("fetchTasks",response)
    setLoading(false);
    if (response?.status === 200) {
      setTaskData([...tableDt])
    } else {
      setError({ type: 'error', message: 'Error fetching data' });
    }
  }

  const deleteTask = async (task) => {
    setLoading(true);
    const response = await _deleteTaskById(task?.PK,task?.id);
    fetchTasks()
    console.log(response)

    setLoading(false);
    if (response?.status === 200) {
      setError({ type: 'success', message: 'Task deleted' })
    } else {
      setError({ type: 'error', message: 'Error fetching data' });
    }
  }
  
  return (
    <div style={{ padding: 20 }}>
      <Box>
      {loading ? <div style={{marginTop:40}}><CircularProgress /></div> : <div style={{marginTop:40}}>
        <Box style={{margin:20,padding:20}}>
          {error && <Snackbar open={error.type} autoHideDuration={6000} onClose={() => setError({})}>
            <Alert severity={error.type}>{error.message}</Alert>
          </Snackbar>}
          <Grid container spacing={1}>
            <Grid container item spacing={3}>
              <Grid item xs={4}>
                <div style={{ paddingLeft: '10px' }}>
                  <h1 className='page_header'>Tasks</h1>
                </div>
              </Grid>
            </Grid>
            <Grid container item spacing={3} mt={4}>
              <Grid item xs={4}>
                {/* <SearchBox /> */}
                <TextField
                  id='input-with-icon-textfield'
                  variant='standard'
                  fullWidth
                  onChange={(e)=>{
                    setSearchKey(e.target.value)
                  }}
                  sx={{ width: 300 }}
                  placeholder={'Search'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchOutlinedIcon fontSize='medium' />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                {/* <div>
                  <AvatarGroup max={4} sx={{ alignItems: 'flex-start' }}>
                    <Avatar alt='avatar2' src='./images/avatar2.png ' />
                    <Avatar alt='avatar1' src='./images/avatar1.png' />
                    <Avatar alt='avatar3' src='./images/avatar3.png' />
                    <Avatar alt='avatar4' src='./images/avatar4.png' />
                  </AvatarGroup>
                </div> */}
              </Grid>
              <Grid item xs={4} alignItems='flex-end'>
                {/* <div style={{ paddingLeft: 20, marginLeft: 300 }}>
                  <TuneIcon />
                </div> */}
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={10}>
            <Grid container sx={{ height: 40 }}>
              <Grid item xs={1}>
                <Typography sx={{ color: '#858585', fontWeight: 'bold' }}>
                  Status
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography sx={{ color: '#858585', fontWeight: 'bold' }}>
                  Assigned to
                </Typography>
              </Grid>
              <Grid item xs={2} >
                <Typography sx={{ color: '#858585', fontWeight: 'bold' }}>
                  DESCRIPTION
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ color: '#858585', fontWeight: 'bold' }}>
                  APPLICATION
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ color: '#858585', fontWeight: 'bold', textAlign: 'left' }}>
                  DUE DATE
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ color: '#858585', fontWeight: 'bold', textAlign: 'left' }}>
                  UPDATED
                </Typography>
              </Grid>
             
            </Grid>
            {taskData?.filter((data) => {
            if (searchKey == "") {
              return data;
            } else {
              return data?.description.toLowerCase().includes(searchKey.toLocaleLowerCase());
            }
          }).map((task, key) => {
              return (<Grid key={key} container mt={1} onClick={()=>{
                console.log(task)
                setSelectTask(task)
                handleOpenModify()
              }} >

                <Grid item xs={1} key={key}>
                
                <span
                    className="verified_label"
                    style={{
                      color:
                        task?.status.toLowerCase() == "not done"
                          ? "#FF0000"
                          : task?.status.toLowerCase() == "done"
                            ? "#00FF00"
                            : "#0000FF",
                      backgroundColor:
                        task?.status.toLowerCase() == "not done"
                          ? `${newShade("#FF0000", 180)}`
                          : task?.status.toLowerCase() == "done"
                            ? `${newShade("#00FF00", 180)}`
                            : `${newShade("#0000FF", 180)}`,
                    }}
                  >
                    {task?.status || ""}
                  </span>

                </Grid>
                <Grid item xs={3}>
                  {/* <AvatarGroup max={3} sx={{ width: 30, height: 5 }}>
              <Avatar alt='avatar2' src='./images/avatar2.png ' />
              <Avatar alt='avatar1' src='./images/avatar1.png' />
              <Avatar alt='avatar3' src='./images/avatar3.png' />
              <Avatar alt='avatar4' src='./images/avatar4.png' />
            </AvatarGroup> */}
                  <Typography sx={{ color: '#858585' }} style={{ fontSize: 14, fontWeight: 500 }} pr={1}>
                    {task?.assignTo}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography sx={{ color: '#858585' }} style={{ fontSize: 14, fontWeight: 500 }} >
                    {task?.description}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography sx={{ color: '#858585' }}>
                    {task?.application}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography sx={{ color: '#858585', textAlign: 'left' }} style={{ fontSize: 14, fontWeight: 500 }}>
                    {task.dueDate && moment(task.dueDate).format('YYYY-MM-DD')}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography sx={{ color: '#858585', textAlign: 'left' }} style={{ fontSize: 14, fontWeight: 500 }}>
                    {task.updateTime && moment(task.updateTime).format('YYYY-MM-DD hh:MM A')}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} mt={1}>
                  <Divider />
                </Grid>
              </Grid>)
            })}

          </Grid>
        </Box>
      </div>}
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={openModify}
          onClose={handleCloseModify}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Button
              onClick={() => {
                router.push(`/tasks/view/${selectTask?.id}`)
              }}
            >
              Edit Task
            </Button>
            <br />
            <Button
              onClick={() => {
                deleteTask(selectTask)
              }}
            >
              Delete Task
            </Button>
          </Box>
        </Modal>
      </div>
      </Box>
    </div>
  )
}
OldTasks.layout = 'AdminLayout'

export default OldTasks
