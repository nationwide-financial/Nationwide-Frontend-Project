import React from "react";
import { Component, use, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  AvatarGroup,
  Divider,
  Typography,
  CircularProgress,
} from "@mui/material";
import { TextField } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { Table, TableContainer } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DownloadIcon from "@mui/icons-material/Download";
import PhotoIcon from "@mui/icons-material/Photo";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ReplyIcon from "@mui/icons-material/Reply";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import { getCookie } from 'cookies-next';
import moment from "moment";

function EmailDocumentRequested() {
  const [emaildata, setEmaildata] = useState({});
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    const query = router.query;
    let id = query.id;
    console.log("id",id)

    const accessToken = getCookie('accessToken');
    console.log(accessToken, "accessToken")
    if (accessToken) {
      fetch('https://graph.microsoft.com/v1.0/me/messages', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      })
        .then(response => response.json())
        .then((res) => {
          console.log(res, "sssss");
          console.log(res?.value, "dddd", res?.error?.code);
          setEmaildata(res?.value?.filter((mail)=>mail?.id == `${id}=`)[0] || {});
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [router.isReady, router.query])
console.log("emaildatarows",emaildata)

  function renderBody(body){

  }
  return (
    <div style={{ backgroundColor: "#fff", margin: 0 }}>
      <Box>
        <Grid
          style={{
            paddingLeft: 20,
            paddingTop: 20,
            paddingBottom: 100,
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography
                style={{ fontSize: 36, fontWeight: 700 }}
                align="left"
                mb={5}
              >
                Documents You Requested
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <Card elevation={0}>
                <CardContent style={{ backgroundColor: "#F0F7FF" }}>
                  <CardContent>
                    <Grid container>
                      <Grid xs={9}>
                        <Stack direction="row" spacing={2}>
                          <Grid>
                            <Typography
                              align="left"
                              style={{ fontSize: 25, fontWeight: 700 }}
                            >
                              Cameron Williamson
                            </Typography>
                          </Grid>
                          <Grid>
                            <Stack
                              direction="row"
                              style={{ fontSize: 16, fontWeight: 500 }}
                            >
                              {" "}
                              <ArrowBackIosIcon fontSize="small" />
                              {emaildata?.from?.emailAddress?.address}
                              <ArrowForwardIosIcon fontSize="small" />{" "}
                            </Stack>
                          </Grid>
                        </Stack>
                      </Grid>

                      <Grid xs={3}>
                        <Typography align="right">
                          {moment(emaildata?.createdDateTime).format("YYYY-MM-DD hh:MM A")}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>

                  <CardContent>
                    <Grid container>
                      <Grid xs={1}>
                        <Typography align="center" pt={3}>
                          To
                        </Typography>
                      </Grid>
                      <Grid xs={11}>
                        <TextField
                          value={emaildata?.toRecipients && emaildata?.toRecipients[0]?.emailAddress?.address || ""}
                          fullWidth
                          size="small"
                          margin="normal"
                          id="outlined-basic"
                          variant="standard"
                        />
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid xs={1}>
                        <Typography align="center" pt={3}>
                          cc
                        </Typography>
                      </Grid>
                      <Grid xs={11}>
                        <TextField
                          fullWidth
                          size="small"
                          margin="normal"
                          id="outlined-basic"
                          variant="standard"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardContent>
                <CardContent>
                  <Stack direction="column">
                    <pre>
                      {emaildata?.bodyPreview}
                    </pre>
                  </Stack>
                </CardContent>

                <CardContent>
                  <Stack direction="column">
                   {emaildata?.hasAttachments &&                     <div>
                    <Grid>
                      <Typography
                        style={{ fontSize: 25, fontWeight: 700 }}
                        align="left"
                      >
                        3 Attachments
                      </Typography>
                    </Grid>

                    <Grid>
                      <TableContainer>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <Stack direction="row" spacing={1}>
                                  <Grid style={{ color: "#1478F1" }}>
                                    <PictureAsPdfIcon fontSize="small" />
                                  </Grid>
                                  <Grid>
                                    <Typography>Loan Agreement.pdf</Typography>
                                  </Grid>
                                </Stack>
                              </TableCell>
                              <TableCell>
                                <Typography>JPEG image, .jpeg</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography>0.8 mb</Typography>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <Stack direction="row" spacing={1}>
                                  <Grid style={{ color: "#1478F1" }}>
                                    <PhotoIcon fontSize="small" />
                                  </Grid>
                                  <Grid>
                                    <Typography>Drivers License.svg</Typography>
                                  </Grid>
                                </Stack>
                              </TableCell>
                              <TableCell>
                                <Typography>JPEG image, .jpeg</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography>2.4 mb</Typography>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    </div>} 
                    <Grid ml={1} mt={2}>
                      <Stack direction="row" spacing={1}>
                        {/* <Grid mt={1} style={{ color: "#1478F1" }}>
                          <DownloadIcon fontSize="small" />
                        </Grid> */}
                        <Grid>
                          {/* <Button
                            variant="text"
                            style={{
                              fontSize: 18,
                              fontWeight: 500,
                              textTransform: "capitalize",
                            }}
                          >
                            Download Attachments
                          </Button> */}
                          <Button variant="contained" startIcon={<ReplyIcon />}>
                            Reply
                          </Button>
                        </Grid>
                        <Grid>
                          <Button
                            variant="outlined"
                            endIcon={<ForwardToInboxOutlinedIcon />}
                          >
                            Foward
                          </Button>
                        </Grid>
                      </Stack>
                    </Grid>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

EmailDocumentRequested.layout = "AdminLayout";

export default EmailDocumentRequested;
