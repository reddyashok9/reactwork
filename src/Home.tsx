import * as React from 'react';
import './App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import { useId, useState } from 'react';
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Modal, TextField, Typography } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Home() {

  let navigate = useNavigate();
  let login: string = sessionStorage.getItem('login') || 'false';
  let id = useId();

  const [rows, setRows] = useState([
     {id: id, name: "Ashok", surname:"Mr.", age:24, diseage:"fever"},
  ])

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    const name: any = data.get('name');
    const surname:any = data.get('surname');
    const age:any = data.get('age');
    const diseage:any = data.get('diseage');
    setRows([...rows, {id: id, name: name, surname:surname, age:age, diseage:diseage}])
    setOpen(false)
  }

  const deleteRow = (row: any) => {
    const indexOfObject = rows.findIndex(object => {
          return object.id === row.id;
    });
    
    console.log(indexOfObject); // 👉️ 1

    let newRows = rows;
    
    newRows.splice(indexOfObject, 1);

    setRows([...newRows]);

  }
  
  return login === "true" ?  (
    <Container maxWidth="lg">
    <Button variant="contained" onClick={handleOpen}>Add New Patient</Button>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="right">Name</TableCell>
          <TableCell align="right">Sur Name</TableCell>
          <TableCell align="right">Age</TableCell>
          <TableCell align="right">Diseage</TableCell>
          <TableCell align="right">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="right">{row.name}</TableCell>
            <TableCell align="right">{row.surname}</TableCell>
            <TableCell align="right">{row.age}</TableCell>
            <TableCell align="right">{row.diseage}</TableCell>
            <TableCell align="right"><Delete onClick={() => deleteRow(row)} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
><Box sx={style} component="form" noValidate onSubmit={handleSubmit}>
<React.Fragment>
      <Typography variant="h6" gutterBottom>
        Add New Patient
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="surname"
            name="surname"
            label="Sur Name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="age"
            name="age"
            label="Age"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="diseage"
            name="diseage"
            label="Diseage"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit" >Add</Button>
        </Grid>
        
      </Grid>
    </React.Fragment></Box>
</Modal>
  </Container>
  ) : <Login/> 
  
}

export default Home;
