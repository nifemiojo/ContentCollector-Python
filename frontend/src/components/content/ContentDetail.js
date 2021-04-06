import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button, Grid, Typography, 
    TextField, FormHelperText, FormControl, 
    InputLabel, Select, MenuItem } from "@material-ui/core";
import { useCollections } from '../context_providers/CollectionProvider';
import { useInput } from '../hooks/UseInput';
import Cookies from 'js-cookie';
import Fetch from '../fetch/Fetch';

export default function ContentDetail({data}) {
    const csrftoken = Cookies.get('csrftoken');

    const [titleProps, resetTitle] = useInput(data.title);
    const [descriptionProps, resetDescription] = useInput(data.description);
    const [linkProps, resetLink] = useInput(data.link);
    const [startFetch, toggleFetch] = useState(false);
    const { collectionId, contentId } = useParams();


    const config = {
        url: `api/collections/${collectionId}/content/${contentId}/save/`,
        method: 'put',
        headers: { 
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        data: JSON.stringify({
            title: titleProps.value,
            description: descriptionProps.value,
            privacyLevel: linkProps.value
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
                        {...titleProps} required={true} type="text" 
                        label="Content Title" placeholder="Title"
                    />
                </Grid>
            <Grid item xs={4} align="center">
                <TextField 
                    {...descriptionProps} type="text" label="Description" 
                    placeholder="Description"
                />
            </Grid>
            <Grid item xs={4} align="center">
                <TextField 
                    {...linkProps} type="text" label="Link" 
                    placeholder="Link"
                />
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