import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, TextField, Typography } from '@material-ui/core';
import { useParams, useRouteMatch } from 'react-router';
import Cookies from 'js-cookie';
import Fetch from '../fetch/Fetch';
import { Link } from 'react-router-dom';

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
      console.log("Clicked delete")
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
            <TableCell>Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.title}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.link}</TableCell>
              <TableCell align="right">
                <Button component={Link} to={`${collectionId}/${row.id}`}>
                  Edit
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button onClick={(e) => handleDel(e, row.id)}>
                  Delete
                </Button>
                {startFetch && <Fetch config={config} renderSuccess={onDelSuccess} />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}