import React, {useState,useEffect} from 'react'
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { getCookie, deleteCookie } from 'cookies-next';
import {_authMS, _authMSToken} from '../../services/authServices'

const Email = () => {
    const router = useRouter();
    const [emaildatarows, setEmaildatarows] = useState([]);
    const [showContent, setShowContent] = useState(false);
    
    const handleEditDetails = async () => {
        // setShowContent(true)
        // setShowContent(!showContent);
        const res = await _authMS();
        // const res: { url: string } = await ky.get('/api/auth/twitter/generate-auth-link').json()
        console.log(JSON.stringify(res?.data?.url), "urlurlurl");
        window.location.href = res?.data?.url
    };
    const {code, client_info} = router.query

    useEffect(() => {

        const accessToken =  getCookie('accessToken');
        if (accessToken) setShowContent(true);

        code && _authMSToken(code)
        .then((res) => {
            router.push("/email");
            
            console.log(accessToken, "accessToken", res.data.token);
            if (accessToken || res.data.token) {
                fetch('https://graph.microsoft.com/v1.0/me/messages', {
                    method: 'GET',
                    headers: {
                    Authorization: `Bearer ${accessToken || res.data.token}`
                    },
                })
                .then(response => response.json())
                .then((res) => {
                    console.log(res,  "sssss");
                    console.log(res?.value, "dddd", res?.error?.code);
                    if (res?.error?.code === "InvalidAuthenticationToken") {
                        deleteCookie('accessToken');
                    } else {
                        setShowContent(true);
                        setEmaildatarows(res?.value || []);
                    }
                
                })
                    .catch((error) => {
                    console.error(error);
                });
        }
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

  return (
    <Box p={3} style={{ marginTop: 40 }}>
        {showContent ? 
        <Grid container>
            {/* email  table */}
            <Grid container p={0} mb={2}>
                <Grid item xs={12} md={6}>
                    <Typography
                        style={{ fontSize: 21, fontWeight: 700 }}
                    >
                        Email
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                <Button
                    variant="contained"
                    sx={{ padding: "10px 40px", marginLeft: "5px" }}
                    onClick={()=> window.location = '/email/new-email'}
                    >
                    Send Email
                </Button>
                </Grid>
            {/* sub-section */}
            <Grid
                container
                style={{
                display: "flex",
                justifyContent: "space-between",
                }}
            >
                <Stack direction="row">
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                        <SearchOutlinedIcon fontSize="medium" />
                        </Grid>
                        <TextField
                        id="input-with-icon-textfield"
                        label="Search"
                        variant="standard"
                        />
                    </Grid>
                </Stack>
                {/* active-user-display-section */}
            </Grid>
            </Grid>
            <Grid container>
            {/* col-1 */}
            <Grid item xs={12}>
                <TableContainer
                    style={{ backgroundColor: "transparent" }}
                    >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="left">From</TableCell>
                                <TableCell align="left">To</TableCell>
                                <TableCell align="left">Subject</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {console.log("emaildatarows",emaildatarows)}
                            {emaildatarows?.map((row, i) => (
                                <TableRow
                                    key={i}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                        border: 0,
                                        },
                                    }}
                                    >
                                    <TableCell component="th" scope="row">
                                        {row.createdDateTime}
                                    </TableCell>
                                    <TableCell align="left">
                                    {row.sender.emailAddress.address}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.toRecipients[0].emailAddress.address}
                                    </TableCell>

                                    <TableCell align="left">
                                        {row.subject}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            {/* </Grid> */}
            </Grid>
        </Grid>
        :
        <Grid container>
            <Grid container p={0} mb={2}>
                <Grid item xs={12} md={6}>
                    <Typography style={{ fontSize: 21, fontWeight: 700 }}>
                        Emails
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box>
                        <Button
                        variant="outlined"
                        sx={{ padding: "10px 40px" }}
                        onClick={handleEditDetails}
                        >
                        Connect Email
                        </Button>
                        <Button
                        variant="contained"
                        sx={{ padding: "10px 40px", marginLeft: "5px" }}
                        onClick={()=>location.href="/email/new-email"}
                        >
                        Send Email
                        </Button>

                    </Box>
                </Grid>
            </Grid>
            <Grid item>
                <Grid xs={8}>
                <Typography>
                    To connect emails to the DigiFi Loan Origination
                    System, please CC or BCC the following email address
                    on your outbound emails:
                </Typography>

                <Typography mt={1}>
                    0-fw19519jeweweeruidfkjdfh@mail.digifyllc
                </Typography>
                </Grid>

                <Grid xs={4}></Grid>
            </Grid>{" "}
        </Grid>                     }
    </Box>
  )
}

Email.layout = "AdminLayout";
export default Email