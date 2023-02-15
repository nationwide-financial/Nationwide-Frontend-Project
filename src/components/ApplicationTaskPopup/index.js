import { Dialog, DialogContent } from "@material-ui/core"
import { Autocomplete, Button, CircularProgress, DialogTitle, FormControl, Stack, Switch, TextField, Typography } from "@mui/material";
import { type } from "os";
import { useEffect, useState } from "react";
import { _addTask } from "../../services/loanTaskServices";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {   Avatar, Box } from "@mui/material";
import Chip from "@mui/material/Chip";
import AvatarGroup from "@mui/material/AvatarGroup";
import { s3URL } from '../../utils/config'
const defaultTask = {
    description: '',
    assignedTo: [],
    dueDate: '',
    prevert: false,
    editable: false
}

const ApplicationTaskPopup = ({users, open, onClose, applicationId, team, applicationData, onClickCreate, error }) => {
    
    console.log("team",team)
    const [taskData, setTaskData] = useState(defaultTask);
    const [personName, setPersonName] = useState([]);
    console.log(personName)
    useEffect(() => {

    });

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
    const setInitialStateOfTeam = (ids) => {
      setPersonName([...ids]);
    };
    const handleChangeEditTeamMember = async (event) => {
      const {
        target: { value },
      } = event;
      let users = typeof value === "string" ? value.split(",") : value;
      setPersonName(users);
      setTaskData({ ...taskData, assignedTo: users })
    };

    console.log("taskData",taskData)

    const handleUpdate = (type, value) => {
        switch (type) {
            case 'descripition': {
                setTaskData({ ...taskData, description: value })
                break;
            }
            case 'assignedTo': {
                setTaskData({ ...taskData, assignedTo: value })
                break;
            }
            case 'dueDate': {
                setTaskData({ ...taskData, dueDate: value })
                break;
            }
            case 'prevert': {
                setTaskData({ ...taskData, prevert: value })
                break;
            }
            case 'editable': {
                setTaskData({ ...taskData, editable: value })
                break;
            }
        }
    }

    const onClosePopup = () => {
        setTaskData(defaultTask);
        onClose();
    }

    return (
        <Dialog
            open={open}
            onClose={onClosePopup}
            fullWidth
            m={4}
        >
            <DialogTitle>
                <Typography
                    variant="h6"
                    style={{
                        fontSize: 21,
                        fontWeight: 700,
                        fontStyle: "normal",
                    }}
                >
                    Create Task
                </Typography>
            </DialogTitle>
            <DialogContent>
                {false ? <CircularProgress /> : <Stack direction='column' spacing={2}>
                    <FormControl>
                        <label style={{ marginBottom: 6 }}>Description</label>
                        <TextField onChange={(e) => handleUpdate('descripition', e.target.value)} size="small" value={taskData.description} />
                    </FormControl>
                    <div style={{ marginTop: "20px"}}>
                        <FormControl sx={{width:"100%"}}>
                        <Select
                            id="demo-multiple-chip"
                            multiple
                            value={personName}
                            onChange={handleChangeEditTeamMember}
                            renderValue={(selected) => (
                            <Box
                                sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                                }}
                            >
                                {selected.map((value) => (
                                <Chip
                                    key={value}
                                    label={value}
                                    style={{ borderRadius:0 }}
                                    avatar={
                                        <Avatar alt={value} src={`${s3URL}/${users?.filter((user)=>{ return user?.PK == `USER#${value}`})[0]?.imageId}`} />
                                    }
                                />
                                ))}
                            </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {team.map((member, key) => (
                            <MenuItem
                                key={key}
                                value={member}
                            >
                                {member}
                            </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                    </div>
                    <FormControl>
                        <label style={{ marginBottom: 6 }}>Due Date</label>
                        <TextField value={taskData.dueDate} onChange={(e) => handleUpdate('dueDate', e.target.value)} size="small" />
                    </FormControl>
                    <FormControl>
                        <Stack direction='row' spacing={2} alignItems="center">
                            <Switch value={taskData.prevert} onChange={(e) => handleUpdate('prevert', e.target.checked)} />
                            <Typography fontSize={14}>Prevent applications from entering status(es) if task is not done</Typography>
                        </Stack>
                    </FormControl>
                    <FormControl>
                        <Stack direction='row' spacing={2} alignItems="center">
                            <Switch value={taskData.editable} onChange={(e) => handleUpdate('editable', e.target.checked)} />
                            <Typography fontSize={14}>Include editable application data within the task</Typography>
                        </Stack>
                    </FormControl>
                    {error && <Typography color="error">{error}</Typography>}
                    <FormControl>
                        <Button onClick={() => onClickCreate(taskData)} variant="contained" sx={{ maxWidth: 200, marginTop: 2, marginBottom: 2 }}>Create Task</Button>
                    </FormControl>
                </Stack>}
            </DialogContent>
        </Dialog>
    )
}

export default ApplicationTaskPopup;