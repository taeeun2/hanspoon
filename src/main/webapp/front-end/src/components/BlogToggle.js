import { useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function Toggle() {
  const [checked, setChecked] = useState(true);

  const toggleSwitch = () => setChecked(!checked);

  return (
        <Grid item xs={12} lg={4} sx={{ ml: "auto", mt: { xs: 3, lg: 0 } }}>
          <MKBox display="flex" justifyContent="flex-end" alignItems="center" >
            <Switch checked={checked} onChange={toggleSwitch} />
            <MKTypography
              variant="button"
              color="text"
              fontWeight="regular"
              ml={1}
              sx={{ cursor: "pointer", userSelect: "none" }}
              onClick={toggleSwitch}
            >
              모집 중만 보기
            </MKTypography>
          </MKBox>
        </Grid>
  );
}

export default Toggle;