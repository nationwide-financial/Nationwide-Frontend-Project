import React, { useState, useCallback } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { _login, _verifyUser } from "../services/authServices";
import Router from "next/router";
import Image from "next/image";

import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import { CardActions } from "@mui/material";
import Divider from "@mui/material/Divider";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const Login = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const onChangeHandler = useCallback(({ target }) => {
    setUser((state) => ({ ...state, [target.name]: target.value }));
  }, []);

  const onSubmit = async () => {
    const body = user;
    if (!user || (user && Object.keys(user).length === 0)) {
      setError("Email and Password can not be empty");
    } else if (
      (user && user["password"] === "") ||
      user["password"] === undefined
    ) {
      setError("Password can not be empty");
    } else if ((user && user["email"] === "") || user["email"] === undefined) {
      setError("Email can not be empty");
    } else {
      setError("");
      const response = await _login(body);

      if (response?.status === 200) {
        Router.push("/");
      } else {
        setError(
          response?.response?.data["message"] || "Issue is ours, Fix it soon!"
        );
      }
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box>
      <Grid className="gridroot">
        <Card style={{ width: "100%" }}>
          <Grid
            container
            className="login_background"
            style={{ padding: 0, margin: 0 }}
          >
            <Grid
              item
              xs={5}
              style={{
                backgroundColor: "#FFFFFF",
                margin: 0,
                border: 2,
                borderColor: "#fff",
              }}
            >
              <CardContent style={{ margin: 15 }}>
                <CardContent>
                  <div>
                    <Image
                      src="/images/image_logo_1.png"
                      alt="Picture of the logo"
                      width={200}
                      height={80}
                    />
                  </div>
                </CardContent>
                <CardContent sx={{ mt: 4 }}>
                  <Typography
                    variant="h5"
                    component="div"
                    align="left"
                    className="page_header"
                    mb={4}
                  >
                    Welcome! <br></br>
                    Please Sign In
                  </Typography>
                  <br />
                  <label>
                    <Typography
                      align="left"
                      variant="h6"
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        fontStyle: "normal",
                      }}
                    >
                      Email <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                  </label>

                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <OutlinedInput
                      style={{ marginTop: 10, marginBottom: 30 }}
                      fullWidth
                      autoFocus
                      size="small"
                      margin="dense"
                      name="email"
                      type="email"
                      id="outlined-basic"
                      className="nwInput"
                      value={(user && user["email"]) || ""}
                      onChange={onChangeHandler}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton>
                            <MoreHorizIcon
                              style={{
                                backgroundColor: "#D9D9D9",
                                color: "#fff",
                                borderRadius: 5,
                              }}
                            />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>

                  <br />

                  <label>
                    <Stack
                      direction="row"
                      spacing={16}
                      style={{ display: "flex" }}
                    >
                      <Grid style={{ width: "100%" }}>
                        <Typography
                          variant="h6"
                          style={{
                            fontSize: 16,
                            fontWeight: 700,
                            fontStyle: "normal",
                          }}
                        >
                          Password <span style={{ color: "#FF0000" }}>*</span>
                        </Typography>
                      </Grid>
                      <Grid style={{ width: "100%", textAlign: "right" }}>
                        <Link
                          href="#"
                          style={{
                            color: "#1478F1",
                            fontSize: "14px",
                            textDecorationLine: "underline",
                          }}
                        >
                          Reset Password
                        </Link>
                      </Grid>
                    </Stack>
                  </label>
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <OutlinedInput
                      style={{ marginTop: 10 }}
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      size="small"
                      className="nwInput"
                      value={(user && user["password"]) || ""}
                      onChange={onChangeHandler}
                      backgroundColor="#FFF"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton>
                            <MoreHorizIcon
                              style={{
                                backgroundColor: "#D9D9D9",
                                color: "#fff",
                                borderRadius: 5,
                              }}
                            />
                          </IconButton>
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </CardContent>

                <CardContent
                  style={{ display: "flex", justifyContent: "center" }}
                  sx={{ mt: 4 }}
                >
                  <div style={{ width: "50%" }}>
                    <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                    <Button
                      style={{ padding: "10px" }}
                      fullWidth
                      variant="contained"
                      sx={{ mt: 2, pr: 4 }}
                      onClick={onSubmit}
                    >
                      Sign in
                    </Button>
                  </div>
                </CardContent>
              </CardContent>
              <Divider style={{ marginTop: 250 }} />
              <div>
                <Typography
                  align="center"
                  color="#858585"
                  fontSize={14}
                  fontWeight={500}
                  m={3}
                >
                  © 2022 National Finance
                </Typography>
              </div>
            </Grid>

            <Grid item xs={7}>
              <CardContent></CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Box>
  );
};

Login.layout = "NormalLayout";
export default Login;
