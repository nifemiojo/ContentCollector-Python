import React, { useEffect, useState } from 'react';
import { Table, Button, TableBody, 
  TableCell, TableContainer, Link,
  TableHead, TableRow, Typography, Paper, makeStyles } from '@material-ui/core';
import { useLocation, useParams } from 'react-router';
import { Link as RouterLink } from "react-router-dom";
import Cookies from 'js-cookie';
import Fetch from '../fetch/Fetch';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ContentTable({rows}) {
  const classes = useStyles();
  const csrftoken = Cookies.get('csrftoken');
  const [startFetch, toggleFetch] = useState(false);
  const [contentId, setContentId] = useState("");
  const location = useLocation();

  const { collectionId } = useParams();

  useEffect(() => {
    startFetch ? toggleFetch(false) : null;
    return () => {
      toggleFetch(false)
    }
  })

  const config = {
    url: `/api/collections/${collectionId}/content/${contentId}/delete/`,
    method: 'delete',
    headers: { 
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
    },
  };

  function handleDel (e, id) {
      e.preventDefault();
      setContentId(id);
      toggleFetch(true);
  }

  function onDelSuccess({res}) {
    return <Typography>Deleted</Typography>
  }
  

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Content Name</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.title}>
              <TableCell component="th" scope="row">
                <Link component={Button} href={row.link} target="_blank" underline="hover">
                  {row.title}
                </Link>
              </TableCell>
              <TableCell>{row.description}</TableCell>
              {location.pathname.search("collections") !== -1 ? 
             (
             <>
              <TableCell>
                  <Button component={RouterLink} to={`${row.id}`}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={(e) => handleDel(e, row.id)}>
                    Delete
                  </Button>
                  {startFetch && <Fetch config={config} renderSuccess={onDelSuccess} />}
                </TableCell>
              </>
              ) 
              : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}