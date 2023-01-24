
import React, {useState, useCallback, useEffect} from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {_setPassword} from '../services/authServices';
import { useRouter } from 'next/router'

const SetPassword = () => {
    const router = useRouter();

    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [error, setError] = useState("");
    const [userId, setUserId] = useState('')

    useEffect(() => {
        if(!router.isReady) return;
        const query = router.query;
        console.log(query.user);
        setUserId(query.user);
    }, [router.isReady, router.query]);

    const onSubmit = async()=> {
        const body =  {
            "newPassword": password,
            "confirmPassword": cPassword
        }
        const response = await _setPassword(userId, body);

        if (response?.status === 200) {
            router.push('/login');
        } else {
            setError(response?.response.data['message']);
        }
    };
    
    return (
        <Grid className="gridroot">
            <Card sx={{ minWidth: 400 }}>
                <CardContent>
                    <Typography variant="h5" component="div" align="center">
                        Set Password
                    </Typography>
                    <TextField
                        label="Password"
                        name='password'
                        type="password"
                        fullWidth
                        sx={{ my: 2 }}
                        size="small"
                        value={password || ''}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <TextField
                        label="Confirm Password"
                        name='cpassword'
                        type="password"
                        fullWidth
                        size="small"
                        value={cPassword || ''}
                        onChange={(e) => setCPassword(e.target.value)}
                    />
                    <p style={{color:"red"}}>{error}</p>
                    <div style={{textAlign:"center"}}>
                        <Button size='small' variant="contained" sx={{ mt: 2 }} onClick={onSubmit}>Set Password</Button>
                    </div>

                </CardContent>
            </Card>
        </Grid>
    )
}
SetPassword.layout = "NormalLayout";
export default SetPassword