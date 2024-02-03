import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function createData(
name, cvc, number, Id
) {
  return {name, cvc, number, Id};
}
const Credits = (props) => {
  const { credits }= props;
  
  var rows = [
  ];
  var clientsArray = [...credits]
  clientsArray.forEach((client)=> {

      rows.push(createData( client.name, client.cvc, client.number, client._id ))
    

})
  return (
    <div >
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align='left'>Name</TableCell>
                  <TableCell align="right">Cvc</TableCell>
                  <TableCell align="right">Number</TableCell>
             
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.Id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="right">{row.cvc}</TableCell>
                    <TableCell align="right"> **** **** **** {row.number} </TableCell>
           
         
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
    </div>
  )
}

export default Credits
