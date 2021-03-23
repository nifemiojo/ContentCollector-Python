import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, TextField } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, description, link) {
  return { name, description, link };
}

const rows = [
  createData('Lamide Elizabeth', 'Youtuber', 'Youtube'),
  createData('Tech Lead', 'Youtuber', 'Youtube'),
  createData('Bankless Podcast', 'Crypto Podcast', 'Spotify'),
  createData('Sahil Bloom', 'Life & Business', 'Twitter'),
];

export default function ContentTable() {
  const classes = useStyles();

  let handleClick = () => {
    console.log("clicked row");
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Content Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.link}</TableCell>
              <TableCell align="right">
                <Button>
                  Edit
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}