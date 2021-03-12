import React from 'react';
import { Button, Grid, Typography, 
    TextField, FormHelperText, FormControl, 
    Radio, RadioGroup, FormControlLabel, 
    InputLabel, Select, MenuItem } from "@material-ui/core";
import { Link } from 'react-dom';

export default function CreateCollection () {

    return(
        // spacing * 8 = # of pixels
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component='h4' variant='h4'>
                    Create Collection
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align='center'>
                            Create a collection.
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField required={true} type="text" label="Name of Collection" placeholder="Name"/>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField type="text" label="Description" placeholder="Description"/>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl required={true}>
                    <InputLabel id="privacy-label">Privacy Level</InputLabel>
                    <Select
                        labelId="privacy-label"
                    >
                        <MenuItem value="Public">Public</MenuItem>
                        <MenuItem value="Private">Private</MenuItem>
                        <MenuItem value="Personal">Personal</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained">
                    Create
                </Button>
            </Grid>
        </Grid>
    );
} 