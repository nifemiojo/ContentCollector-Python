import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Button, Grid, Typography, 
    TextField, FormHelperText, FormControl, 
    InputLabel, Select, MenuItem } from "@material-ui/core";
import { useCollections } from '../context_providers/CollectionProvider';
import { useInput } from '../hooks/UseInput';
import EnhancedTable from '../data_display/Table';
import Cookies from 'js-cookie';

export default function CollectionDetail() {
    const csrftoken = Cookies.get('csrftoken');

    let { collectionId } = useParams();
    const { clickedCollection } = useCollections();

    const [nameProps, resetName] = useInput(clickedCollection.name);
    const [descriptionProps, resetDescription] = useInput(clickedCollection.description);
    const [privacyLevelProps, resetPrivacyLevel] = useInput(clickedCollection.privacyLevel);

    const requestOptions = {
        method: 'PUT',
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
        fetch(`/api/collections/${clickedCollection.id}/save/`, requestOptions)
            .then((res) => res.json())
            .then((data) => console.log(data));
	}

    return (
        <>
            {/* Will need to fetch if the clickedCollection is Null */}
            <h3>Requested collection ID: {collectionId}</h3>
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
                <Grid item xs={12} align="center" onClick={submit}>
                    <Button color="primary" variant="contained">
                        Save
                    </Button>
                </Grid>
            </Grid>
            <EnhancedTable />
        </>
    ) 
  }