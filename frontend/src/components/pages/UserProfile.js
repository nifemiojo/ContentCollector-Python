import React from "react";
import { Container, Grid } from '@material-ui/core';
import { useParams } from 'react-router';
import UserDetail from "../user/UserDetail";
import Fetch from "../fetch/Fetch"
import CollectionsCards from "../collections/CollectionsCards";

function DisplayCards({data}) { 
    return (
    <>
    <Grid container spacing={4}>
      {data.map((data, i) => <CollectionsCards data={data} key={i}/>)}
    </Grid>
    </>
    ) 
  }

export default function UserProfile() {
    const { username } = useParams();

    return (
        <>
            <Container>
                <UserDetail user={username}/>
            </Container>
            <Container>
                    <Fetch uri="api/collections/" renderSuccess={DisplayCards} />
            </Container>
        </>
    );
  }