/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function Footer() {
  return (
    <MKBox component="footer" py={6}>
      <Container>
        <Grid container>
          <Grid
            item
            xs={12}
            lg={4}
            textAlign={{ xs: "center", lg: "left" }}
            mr="auto"
            mb={{ xs: 3, lg: 0 }}
          >
            <MKTypography variant="h3" textTransform="uppercase" mb={{ xs: 2, lg: 3 }} style={{
                      "fontFamily": 'Carter One',
                      "cursor": 'default'}}>
              Hanspoon
            </MKTypography>
            <Stack
              component="ul"
              direction="row"
              flexWrap="wrap"
              spacing={3}
              justifyContent={{ xs: "center", lg: "flex-start" }}
              pl={0}
              mb={6}
              sx={{ listStyle: "none" }}
            >
              <MKBox component="li">
                <MKTypography
                  variant="button"
                  fontWeight="regular"
                  opacity={0.8}
                  component={Link}
                  style={{"textWeight": 'bolder', "color":"#333333"}}
                >
                  Image Source
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography
                  variant="button"
                  fontWeight="regular"
                  opacity={0.8}
                  component={Link}
                  href="https://unsplash.com/"
                  target="_blank"
                  rel="noreferrer"
                  style={{"textDecoration": "underline", "color":"blue"}}
                >
                  unsplash
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography
                  variant="button"
                  fontWeight="regular"
                  opacity={0.8}
                  component={Link}
                  href="https://www.pexels.com/ko-kr/"
                  target="_blank"
                  rel="noreferrer"
                  style={{"textDecoration": "underline", "color":"blue"}}
                >
                  pexels
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography
                  variant="button"
                  fontWeight="regular"
                  opacity={0.8}
                  component={Link}
                  href="https://www.hansolinticube.com/home/"
                  target="_blank"
                  rel="noreferrer"
                  style={{"textDecoration": "underline", "color":"blue"}}
                >
                  Han Seong Ah
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography
                  variant="button"
                  fontWeight="regular"
                  opacity={0.8}
                  component={Link}
                  href="https://www.flaticon.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{"textDecoration": "underline", "color":"blue"}}
                >
                  Freepik
                </MKTypography>
              </MKBox>
            </Stack>
            <MKTypography variant="button" opacity={0.8} style={{
                      "fontFamily": 'NanumSquareRound',
                      "cursor": 'default'}}>
              Copyright © <script>document.write(new Date().getFullYear())</script>2022 
              Hanspoon by HansolInticube.
            </MKTypography>
          </Grid>
          <Grid item xs={12} lg={6} ml="auto" textAlign={{ xs: "center", lg: "right" }}>
            <MKTypography variant="body1" fontWeight="bold" mb={6} sx={{ fontSize: "1.125rem" }}>
            The food you eat tells you who you are.
            </MKTypography>
            <MKTypography
              component={Link}
              href="#dribbble"
              target="_blank"
              rel="noreferrer"
              variant="body2"
              color="dark"
              opacity={0.5}
              mr={3}
            >
              <i className="fab fa-dribbble" />
            </MKTypography>
            <MKTypography
              component={Link}
              href="#twitter"
              target="_blank"
              rel="noreferrer"
              variant="body2"
              color="dark"
              opacity={0.5}
              mr={3}
            >
              <i className="fab fa-twitter" />
            </MKTypography>
            <MKTypography
              component={Link}
              href="#pinterest"
              target="_blank"
              rel="noreferrer"
              variant="body2"
              color="dark"
              opacity={0.5}
              mr={3}
            >
              <i className="fab fa-pinterest" />
            </MKTypography>
            <MKTypography
              component={Link}
              href="#github"
              target="_blank"
              rel="noreferrer"
              variant="body2"
              color="dark"
              opacity={0.5}
            >
              <i className="fab fa-github" />
            </MKTypography>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Footer;
