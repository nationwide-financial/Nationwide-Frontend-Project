import React from "react";
import { useState, useCallback } from "react";
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
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {_sendMail} from '../../services/authServices'

function NewEmail() {

  const [mail, setMail] = useState({});

  const onChangeHandler = useCallback(({ target }) => {
    setMail((state) => ({ ...state, [target.name]: target.value }));
  }, []);


  const onSend = async() => {
    console.log(mail);
    const res = await _sendMail(mail);
    console.log(res, "emailemail")
    if (res.status === 'ok') {
      console.log("email");
      window.location.href = '/email'
    }

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
          {/* <Grid container>
            <Grid item xs={12}>
              <Typography
                style={{ fontSize: 36, fontWeight: 700 }}
                align="left"
                mb={5}
              >
                Send Email
              </Typography>
            </Grid>
          </Grid> */}

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
                              <Typography>cameron</Typography>{" "}
                              <AlternateEmailIcon fontSize="small" />
                              <Typography> domain.com</Typography>
                              <ArrowForwardIosIcon fontSize="small" />{" "}
                            </Stack>
                          </Grid>
                        </Stack>
                      </Grid>

                      <Grid xs={3}>
                        <Typography align="right">
                          Feb 5, 2021, 1023 PM
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
                          fullWidth
                          size="small"
                          margin="normal"
                          id="outlined-basic"
                          variant="standard"
                          name="toEmail"
                          value={(mail && mail["toEmail"]) || ""}
                          onChange={onChangeHandler}
                        />
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid xs={1}>
                        <Typography align="center" pt={3}>
                          Subject
                        </Typography>
                      </Grid>
                      <Grid xs={11}>
                        <TextField
                          fullWidth
                          size="small"
                          margin="normal"
                          id="outlined-basic"
                          variant="standard"
                          name="subject"
                          value={(mail && mail["subject"]) || ""}
                          onChange={onChangeHandler}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardContent>
                <CardContent>
                  <Stack direction="column">
                    <textarea
                    name="htmlBody"
                    onChange={onChangeHandler}
                    >{(mail && mail["htmlBody"]) || ""}</textarea>

                  {/* <Editor
                    editorState={""}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={()=>{return}}
                  /> */}
                  </Stack>
                </CardContent>

                <CardContent>
                  <Button
                      variant="contained"
                      sx={{ padding: "10px 40px", marginLeft: "5px" }}
                      onClick={onSend}
                      >
                      Send Email
                  </Button>
                </CardContent>

                {/* <CardContent>
                  <Stack direction="column">
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
                    <Grid ml={1}>
                      <Stack direction="row">
                        <Grid mt={1} style={{ color: "#1478F1" }}>
                          <DownloadIcon fontSize="small" />
                        </Grid>
                        <Grid>
                          <Button
                            variant="text"
                            style={{
                              fontSize: 18,
                              fontWeight: 500,
                              textTransform: "capitalize",
                            }}
                          >
                            Download Attachments
                          </Button>
                        </Grid>
                      </Stack>
                    </Grid>
                  </Stack>
                </CardContent> */}
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

NewEmail.layout = "AdminLayout";

export default NewEmail;
