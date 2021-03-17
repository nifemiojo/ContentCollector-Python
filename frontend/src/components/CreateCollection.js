import React from 'react';
import { Button, Grid, Typography, 
    TextField, FormHelperText, FormControl, 
    InputLabel, Select, MenuItem } from "@material-ui/core";
import Cookies from 'js-cookie';

import { useInput } from './hooks/UseInput';

export default function CreateCollection () {
    // Get the CSRF Token
    const csrftoken = Cookies.get('csrftoken');
    
    // Custom Hook
    const [nameProps, resetName] = useInput("");
    const [descriptionProps, resetDescription] = useInput("");
    const [privacyLevelProps, resetPrivacyLevel] = useInput("");

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            name: nameProps.value,
            description: descriptionProps.value,
            privacyLevel: privacyLevelProps.value
        }),
        mode: 'same-origin',
    };

    const submit = e => {
		e.preventDefault();
        fetch('/api/collection/save/', requestOptions)
            .then((res) => res.json())
            .then((data) => console.log(data));
        resetName();
        resetDescription();
        resetPrivacyLevel();
	}

    return(
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component='h4' variant='h4'>
                    Create Collection
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <div align='center'>
                        <FormHelperText>
                            Create a collection.
                        </FormHelperText>
                    </div>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField 
                    {...nameProps} required={true} type="text" 
                    label="Name of Collection" placeholder="Name"
                />
            </Grid>
            <Grid item xs={12} align="center">
                <TextField 
                    {...descriptionProps} type="text" label="Description" 
                    placeholder="Description"
                />
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl required={true}>
                    <InputLabel id="privacy-label">Privacy Level</InputLabel>
                    <Select
                        {...privacyLevelProps}
                        labelId="privacy-label"
                    >
                        <MenuItem value="Public">Public</MenuItem>
                        <MenuItem value="Private">Private</MenuItem>
                        <MenuItem value="Personal">Personal</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" onClick={() => submit()}>
                    Create
                </Button>
            </Grid>
        </Grid>
    );
} 