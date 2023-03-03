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
  IconButton,
} from "@mui/material";
import { TextField } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";

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
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
function EmailCollectionCards() {
  return (
    <>
      <Card sx={{ maxWidth: 345, margin: 2 }}>
        <CardActionArea>
          <CardContent
            style={{ backgroundColor: "#F2F2F2", height: 200 }}
          ></CardContent>
          <CardContent>
            <Stack
              direction="row"
              spacing={2}
              style={{
                dispaly: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid>
                <Typography
                  gutterBottom
                  component="div"
                  style={{ fontSize: 14, fontWeight: 500 }}
                >
                  Coronavirus Response
                </Typography>
              </Grid>
              <Grid>
                <VisibilityOutlinedIcon align="right" />
              </Grid>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

export default EmailCollectionCards;
