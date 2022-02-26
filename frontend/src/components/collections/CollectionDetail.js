import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Button, Grid, Typography, 
    TextField, FormControl, 
    InputLabel, Select, MenuItem } from "@material-ui/core";
import { useInput } from '../hooks/UseInput';
import Cookies from 'js-cookie';
import Fetch from '../fetch/Fetch';

export default function CollectionDetail({data}) {
    const csrftoken = Cookies.get('csrftoken');

    const [nameProps, resetName] = useInput(data.name);
    const [descriptionProps, resetDescription] = useInput(data.description);
    const [privacyLevelProps, resetPrivacyLevel] = useInput(data.privacyLevel);
    const [startFetch, toggleFetch] = useState(false);
    const { collectionId } = useParams();


    const config = {
        url: `api/collections/${collectionId}/save/`,
        method: 'put',
        headers: { 
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        data: JSON.stringify({
            name: nameProps.value,
            description: descriptionProps.value,
            privacyLevel: privacyLevelProps.value
        }),
    };

    const submit = e => {
		e.preventDefault();
        toggleFetch(true);
	}

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={4} align="center">
                    <TextField 
                            {...nameProps} required={true} type="text" 
                        label="Name of Collection" placeholder="Name"
                    />
                </Grid>
            <Grid item xs={4} align="center">
                <TextField 
                    {...descriptionProps} type="text" label="Description" 
                    placeholder="Description"
                />
            </Grid>
            <Grid item xs={4} align="center">
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
            <Grid item xs={12} align="center" >
                <Button color="primary" variant="contained" onClick={submit}>
                    Save
                </Button>
                {startFetch && <Fetch config={config} renderSuccess={() => <Typography>Successfully Created!</Typography>}/>}
            </Grid>
        </Grid>
    </>
    )
  }