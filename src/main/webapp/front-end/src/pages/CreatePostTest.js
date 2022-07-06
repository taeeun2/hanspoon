import React from 'react';
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import bgImage from "assets/images/illustrations/illustration-reset.jpg";
import Header from 'components/Header';

const CreatePostTest = () => {
    return (
        <div>
            <Header/>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} lg={6}>
                    <MKBox
                        display={{ xs: "none", lg: "flex" }}
                        width="calc(100% - 2rem)"
                        height="calc(100vh - 2rem)"
                        borderRadius="lg"
                        ml={2}
                        mt={2}
                        sx={{ backgroundImage: `url(${bgImage})` }}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default CreatePostTest;