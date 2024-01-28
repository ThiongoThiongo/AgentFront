import '../css/Agents.css'
import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ToggleButton from '@mui/material/ToggleButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../components/Loader';


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
    Id,
    Name,
   Email,
   Phone,
   CreditNumber,
    Remark, 
  Checked, 
  Action,
  ) {
    return {Id, Name,Email, Phone,CreditNumber, Remark,Checked, Action };
  }
 
const InstacartAccounts = (props) => {
  const { instacart } = props;
  const userInf = localStorage.getItem('userInfo')
  const  parsedDat= JSON.parse(userInf)
  const [deleteId, setDeleteId] = useState('')
  var instasAccountArray = [...instacart];
  var instacartArrayLength = instasAccountArray.length;
    var rows = [
    ];

   if(parsedDat.start !=='' && parsedDat.end !=='')
   {
    var starts = parseInt(parsedDat.start) -1, ends =parseInt(parsedDat.end)-1  ;
    instasAccountArray.forEach((agent, index)=> {

        if(starts <= index && index <= ends)
        {
          rows.push(createData(agent._id, agent.name, agent.email, agent.phone,agent.creditNumber, agent.remark, agent.checked, ))
        }

    })
   }


  const checkedButton= async ( checked)=> {
    try {
        const response = await axios.post('https://instacartbackend.onrender.com/api/instacart/update', {checked, id:deleteId});
        
         if(response.data.message)
         {
            toast.success('Successfully Updated');
           props.called(deleteId, checked)

         }
         else{
            toast.error('Something wwent wrong')
         }


        } catch (error) {
        console.error(error);
      }
}

 const [timer, setTimer] = useState(false)
 setTimeout(()=>{
    setTimer(true)
 }, 3000)



      
    const [showRemark, setShowRemark] = useState(false)
    const handleCloseShowRemark = ()=> {
      setShowRemark(false)
    }
    const [selectedRemark, setSelectedRemark]
 = useState('')
   return (
    <div className='centerAgent'>

        <div className="modal">
     
      <Modal
        open={showRemark}
        onClose={handleCloseShowRemark}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
    <FormContainer>
      <h1> Remark</h1>
  
       <h4 className='m-3  p-2 border-3 text-light bg-secondary '>{selectedRemark}</h4>
       <Button type='submit' variant='danger' onClick={handleCloseShowRemark} className='mt-3 mx-3'>
          Cancel
        </Button>


    </FormContainer>



      </Modal>
        </div>

        {rows.length !== 0 || timer ? (<>     <div className="agentTable">
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='left'>Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Credit</TableCell>
            <TableCell align="right">Remark</TableCell>
            <TableCell align="right">Called or Not</TableCell>
            <TableCell align="right">Agent Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.Id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.Id}</TableCell>
              <TableCell align="right">{row.Name}</TableCell>
              <TableCell align="right"> {row.Email} </TableCell>
              <TableCell align="right">  {row.Phone}</TableCell>
              <TableCell align="right">  {row.CreditNumber}</TableCell>
             
              
              <TableCell align="right"><Button  variant='primary' className='mt-3' onClick={()=> {
                setShowRemark(true)
                setSelectedRemark(row.Remark)
              }}> Read</Button></TableCell>
         {row.Checked ?(        
           <TableCell align="right"><CheckBoxIcon/> </TableCell>):(         <TableCell align="right"> <HighlightOffIcon/> </TableCell>)} 

              {row.Checked ? (         <TableCell align="right"><Button  variant='danger'  className='mt-3' onClick={()=>{
                     checkedButton(false)
                     setDeleteId(row.Id)
              }} >  Uncheck </Button> </TableCell>):(         <TableCell align="right"><Button  variant='success'  className='mt-3' onClick={()=>{
                checkedButton( true)
                setDeleteId(row.Id)
         }} >Check</Button> </TableCell>)}   
   
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div></>): (<>
      <Loader/>
        </>)}
   
      
    </div>
  )
}

export default InstacartAccounts
