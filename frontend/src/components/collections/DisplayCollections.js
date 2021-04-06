import { Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDeletedCollections } from '../context_providers/DeletedCollectionProvider';
import CollectionsCards from './CollectionsCards';

export default function DisplayCollections({data}) {
  console.log("Displaying Collections") 

  if (Object.keys(data).length === 0) {
    return (
      <Typography component="h1" variant="h2" align="center" color="textPrimary">
        Create a new collection!
      </Typography>
    );
  }
  return (
    <>
   {console.log("Displaying Cards")}
    <Grid container spacing={4}>
      {data.map((data, i) => <CollectionsCards data={data} key={i}/>)}
    </Grid>
    </>
  );
}