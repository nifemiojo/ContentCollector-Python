import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import CollectionsCards from './CollectionsCards';

export default function DisplayCollections({data}) {
  if (Object.keys(data).length === 0) {
    return (
      <Typography component="h1" variant="h2" align="center" color="textPrimary">
        Create a new collection!
      </Typography>
    );
  }
  return (
    <>
    <Grid container spacing={4}>
      {data.map((data, i) => <CollectionsCards data={data} key={data.id.toString()}/>)}
    </Grid>
    </>
  );
}