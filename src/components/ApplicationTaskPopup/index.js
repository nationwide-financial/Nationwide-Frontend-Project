import { Dialog, DialogContent } from "@material-ui/core"
import { Autocomplete, Button, CircularProgress, DialogTitle, FormControl, Stack, Switch, TextField, Typography } from "@mui/material";
import { type } from "os";
import { useEffect, useState } from "react";
import { _addTask } from "../../services/loanTaskServices";

const defaultTask = {
    description: '',
    assignedTo: '',
    dueDate: '',
    prevert: false,
    editable: false
}

const ApplicationTaskPopup = ({ open, onClose, applicationId, team, applicationData, onClickCreate, error }) => {
    const [taskData, setTaskData] = useState(defaultTask);
    
    useEffect(() => {

    });

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
                    <FormControl>
                        <label style={{ marginBottom: 6 }}>Assign to</label>
                        <Autocomplete
                            value={taskData.assignedTo}
                            renderInput={(params) => (
                                <TextField {...params} size='small' label="User" />
                            )}
                            onChange={(e, val) => handleUpdate('assignedTo', val)}
                            options={team.map(option => option)}
                        >
                        </Autocomplete>
                    </FormControl>
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