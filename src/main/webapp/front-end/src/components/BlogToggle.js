import { useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Box from '@mui/material/Box';

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function Toggle({ checked, setChecked }) {
  
  // const [checked, setChecked] = useState(isOn);

  const toggleSwitch = () => setChecked(!checked);

  return (
    <Grid item xs={12} lg={12} className="blog_toggle">
      <Box sx={{ width: '100%', justifyContent: 'flex-end' }} >
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
              style={{
                "fontFamily": 'NanumSquareRound',
                "fontWeight" : 'bold',
                "fontSize": '23px'}}
            >
              모집 중만 보기
            </MKTypography>
          </MKBox>
        </Grid>
    </Box>
  </Grid>
  );
}

export default Toggle;