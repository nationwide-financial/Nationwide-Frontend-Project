import { AddCircleOutlineRounded, BalanceOutlined, DeleteOutline, NotificationsNoneOutlined, PauseCircleOutlined, SaveOutlined } from "@mui/icons-material";
import { Box, Button, Grid, InputAdornment, OutlinedInput, Stack, Switch } from "@mui/material"
import { styled } from "@mui/material/styles";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { _addWorkflowStatus, _deleteWorkflowStatus, _updateWorkflowStatus } from "../../services/loanWorkflowStatusServices";

const WorkflowStatusCard = ({ statusData, index, updateStatus, addStatus, setLoading, setTrigger }) => {
    const { id, name, probability, rottingInDays, days } = statusData;
    const [error, setError] = useState();
    const router = useRouter();

    const onClickSave = async () => {
        if (name.length === 0 || probability === undefined || (rottingInDays && days === undefined)) {
            setError('Missing required fields')
        } else {
            setError();
            setLoading(true);
            const newWorkflowStatus = {
                name: name,
                rottingInDays: rottingInDays,
                days: days,
                index: index,
                probability: probability
            }

            const response = !id ? await _addWorkflowStatus(newWorkflowStatus) : await _updateWorkflowStatus(id, newWorkflowStatus);

            setLoading(false);
            setTrigger(moment())
            if (response?.status === 200) {
                
                // window.location.reload()
              } else {
                setError(response?.response.data['message']);
              }
        }
    }

    const onClickDelete = async() => {
        setLoading(true);
        const response = await _deleteWorkflowStatus(id);
        setLoading(false);
        setTrigger(moment());
        // window.location.reload()
        console.log("response ", response)
    }

    const IOSSwitch = styled((props) => (
        <Switch
            focusVisibleClassName=".Mui-focusVisible"
            disableRipple
            {...props}
        />
    ))(({ theme }) => ({
        width: 40,
        height: 24,
        padding: 0,
        "& .MuiSwitch-switchBase": {
            padding: 0,
            margin: 2,
            transitionDuration: "300ms",
            "&.Mui-checked": {
                transform: "translateX(16px)",
                color: "#fff",
                "& + .MuiSwitch-track": {
                    backgroundColor:
                        theme.palette.mode === "dark" ? "#2ECA45" : "#1976d2",
                    opacity: 1,
                    border: 0,
                },
                "&.Mui-disabled + .MuiSwitch-track": {
                    opacity: 0.5,
                },
            },
            "&.Mui-focusVisible .MuiSwitch-thumb": {
                color: "#33cf4d",
                border: "6px solid #fff",
            },
            "&.Mui-disabled .MuiSwitch-thumb": {
                color:
                    theme.palette.mode === "light"
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
            },
        },
        "& .MuiSwitch-thumb": {
            boxSizing: "border-box",
            width: 20,
            height: 20,
        },
        "& .MuiSwitch-track": {
            borderRadius: 24 / 2,
            backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
            opacity: 1,
            transition: theme.transitions.create(["background-color"], {
                duration: 500,
            }),
        },
    }));

    return (
        <Box sx={{ width: 350 }}>
            <Grid container sx={{ padding: 2, backgroundColor: '#ffffff', borderRight: '1px solid #bbbbbb' }}>
                <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ width: '100%' }}>
                    <div style={{ minWidth: 250 }}>
                        <h3>{name.length > 0 ? name : <span style={{ color: '#bbbbbb' }}>Name</span>}</h3>
                        <span style={{ display: 'flex', alignItems: 'center', marginTop: 5, color: '#bbbbbb' }}>
                            <BalanceOutlined sx={{ marginRight: 1 }} />
                            <p>{probability}%</p>
                            <NotificationsNoneOutlined sx={{ marginRight: 1, marginLeft: 2 }} />
                            <p>{days} days</p>
                        </span>
                    </div>
                    <PauseCircleOutlined />
                    <AddCircleOutlineRounded onClick={() => addStatus()} />
                </Stack>
            </Grid>
            <Grid sx={{ padding: '5px', marginTop: 2 }} spacing={2}>
                <Grid container sx={{ backgroundColor: '#ffffff', padding: 2, borderRadius: 1 }}>
                    <Grid item xs={12} mt={3}>
                        <h4>Name</h4>
                        <OutlinedInput
                            size='small'
                            fullWidth
                            startAdornment={
                                <InputAdornment sx={{ paddingRight: 2 }}>$</InputAdornment>
                            }
                            onChange={(e) => updateStatus(index, 'name', e.target.value)}
                            value={name}
                            helperText='adad'
                        />
                    </Grid>
                    <Grid item xs={12} mt={3}>
                        <h4>Probability</h4>
                        <OutlinedInput
                            size='small'
                            fullWidth
                            error={probability > 100}
                            helperText='Can not exceed 100%'
                            value={probability}
                            onChange={(e) => updateStatus(index, 'probability', e.target.value)}
                            type='number'
                        />
                    </Grid>
                    <Grid item xs={12} mt={5}>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <h4>Rotting in (days)</h4>
                            <IOSSwitch checked={rottingInDays} onChange={(e, v) => updateStatus(index, 'rottingInDays', v)} />
                        </Stack>
                    </Grid>
                    {rottingInDays && <Grid item xs={12} mt={1}>
                        <h4>Days</h4>
                        <OutlinedInput
                            size='small'
                            fullWidth
                            value={days}
                            onChange={(e) => updateStatus(index, 'days', e.target.value)}
                            type='number'
                        />
                    </Grid>}
                    <Grid item xs={12} mt={5} sx={{ borderBottom: '1px solid #bbbbbb' }} />
                    {error && error.length > 0 && <Grid item xs={12}>
                        <p style={{ color: "red" }}>{error}</p>
                    </Grid>}
                    <Grid item xs={12} mt={3}>
                        <Stack direction='row' spacing={1}>
                            <Button
                                sx={{ color: '#000000', textTransform: 'none' }}
                                fullWidth
                                disabled={!id}
                                onClick={() => onClickDelete()}
                                startIcon={
                                    <DeleteOutline />
                                }>
                                Delete
                            </Button>
                            <Button
                                sx={{ color: '#ffffff', textTransform: 'none' }}
                                fullWidth
                                variant="contained"
                                onClick={() => onClickSave()}
                                startIcon={
                                    <SaveOutlined />
                                }>
                                {!id ? 'Save' : 'Update'}
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default WorkflowStatusCard;