import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button, Grid, Typography, 
    TextField, FormHelperText, FormControl, 
    InputLabel, Select, MenuItem } from "@material-ui/core";
import { useCollections } from '../context_providers/CollectionProvider';
import { useInput } from '../hooks/UseInput';
import Cookies from 'js-cookie';
import Fetch from '../fetch/Fetch';

export default function NewContent() {
    const csrftoken = Cookies.get('csrftoken');

    const { clickedCollection } = useCollections();
    const [titleProps, resetTitle] = useInput();
    const [descriptionProps, resetDescription] = useInput();
    const [linkProps, resetLink] = useInput();
    const [startFetch, toggleFetch] = useState(false);
    const { collectionId } = useParams();


    const config = {
        url: `/api/collections/${collectionId}/content/create/`,
        method: 'post',
        headers: { 
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        data: JSON.stringify({
            title: titleProps.value,
            description: descriptionProps.value,
            link: linkProps.value
        })
    };

    useEffect(() => {
        return () => {
            resetTitle()
            resetDescription()
            resetLink()
        }
      }, [])

    function submit(e) {
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
            <Grid item xs={12} align="center" onClick={submit}>
                <Button color="primary" variant="contained">
                    Save
                </Button>
                {startFetch && <Fetch config={config} renderSuccess={() => <Typography>Successfully Created!</Typography>}/>}
            </Grid>
        </Grid>
    </>
    )
  }