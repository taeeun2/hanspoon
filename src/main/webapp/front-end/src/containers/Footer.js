import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

function Footer(props) {
    return (
        <Grid className='footer' id='footer'>
            <Box className='content_box'>
                <Grid container direction="row">
                    <Grid item className='footer_box'>
                        Hanspoon
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
}

export default Footer;