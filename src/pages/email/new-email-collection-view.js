import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

import EmailCollectionCard from "../../components/email-collection-cards/email-collection-cards.js";
function NewEmailCollectionView() {
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
            <Grid item xs={7}>
              <Typography
                style={{ fontSize: 36, fontWeight: 700 }}
                align="left"
                mb={5}
              >
                New Email
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              style={{ dispaly: "flex", justifyContent: "right" }}
            >
              <Stack direction="row" spacing={1}>
                <Button variant="contained" style={{ width: 200 }}>
                  Select Template
                </Button>
                <Button variant="outlined" style={{ width: 200 }}>
                  Send
                </Button>
              </Stack>
            </Grid>
          </Grid>
          {/* body-card-collection */}
          <Grid
            xs={12}
            container
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <Grid item xs={3}>
              <EmailCollectionCard />
            </Grid>
            <Grid item xs={3}>
              <EmailCollectionCard />
            </Grid>
            <Grid item xs={3}>
              <EmailCollectionCard />
            </Grid>
            <Grid item xs={3}>
              <EmailCollectionCard />
            </Grid>
            {/* second */}
            <Grid item xs={3}>
              <EmailCollectionCard />
            </Grid>
            <Grid item xs={3}>
              <EmailCollectionCard />
            </Grid>
            <Grid item xs={3}>
              <EmailCollectionCard />
            </Grid>
            <Grid item xs={3}>
              <EmailCollectionCard />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

NewEmailCollectionView.layout = "AdminLayout";

export default NewEmailCollectionView;
