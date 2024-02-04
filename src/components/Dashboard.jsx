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
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ListIcon from '@mui/icons-material/List';
import CloseIcon from '@mui/icons-material/Close';
import {
  useWindowSize,

} from '@react-hook/window-size'

import Credits from './Credits';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import '../css/Agents.css'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PaymentsIcon from '@mui/icons-material/Payments';

import LoginInfo from './LoginInfo';
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

 const [view, setView] = useState('accounts');
 const [showMenu, setShowMenu] = useState(true)
 const toggleShowButton = ()=> {
  setShowMenu(!showMenu)
}
const [width] = useWindowSize()

const getClassName = ()=> {

  if(width > 750)
  {
    return 'left'
  }
  else if(width < 750 && showMenu)
  {
    return 'hide'
  }
  else{
    return 'side'
  }
}

      
    const [showRemark, setShowRemark] = useState(false)
    const handleCloseShowRemark = ()=> {
      setShowRemark(false)
    }
    const [selectedRemark, setSelectedRemark]
 = useState('')
 const handleChange = (event, nextView) => {
  setView(nextView);
};
const [loading, setLoading] = useState(false)
const [credits, setCredits] = useState([])

useEffect(() => {
  setLoading(true)
  const fetchData = async () => {
    try {
      setLoading(false)

      const response = await fetch('https://instacartbackend.onrender.com/api/agentRoute/forAgents',{ method:'GET', headers: {}
    },  {credentials:'include'} );
    
      var fetchedData = await response.json();
       
         console.log(fetchedData)
       setCredits(fetchedData);

    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  fetchData();
}, []); 

const [loginInfo, setLoginInfo]= useState([])
useEffect(() => {
  setLoading(true)
  const fetchData = async () => {
    try {
      setLoading(false)

      const response = await fetch('https://instacartbackend.onrender.com/api/agentRoute/loginwithout',{ method:'GET', headers: {}
    },  {credentials:'include'} );
    
      var fetchedData = await response.json();
       
       setLoginInfo(fetchedData);

    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  fetchData();
}, []); 
 
   return (

    <div className='centerAgent'>
      <div className={getClassName()}>
   <ToggleButtonGroup
      orientation="vertical"
      value={view}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton onClick={toggleShowButton}  value="accounts" aria-label="accounts">
        <SupervisorAccountIcon/>   <span className='mx-2'>Accounts Instacart</span> 
      </ToggleButton>
      <ToggleButton value="credits" onClick={toggleShowButton} aria-label="credits" className='my-2'>
        <PaymentsIcon/> <span className='mx-2'>Credits</span> 
      </ToggleButton>

      <ToggleButton onClick={toggleShowButton}  value="login" aria-label="login">
        <VpnKeyIcon/>   <span className='mx-2'>Instacart Login</span> 
      </ToggleButton>
    </ToggleButtonGroup>
    
    </div>
    {   width <  750 ? <>     {showMenu ? 
           
           <div className="icons"><Button
              type='button'
              variant='primary'
              className='p-2'
              onClick={()=>setShowMenu(!showMenu)}
            >
              <ListIcon/>
            </Button>
            </div>
            :   <div className="iconsDelete"> <Button
            type='button'
            variant='danger'
            className='p-2'
            onClick={()=>setShowMenu(!showMenu)}
          >
<CloseIcon/>           </Button>
</div>
}</>:<></>}

{!loading ? <><div className="right">

    {(() => {
        switch(view) {
          case 'accounts':
            return  <>{rows.length !== 0 || timer ? (<>     <div className="agentTable">
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
              </>
          case 'credits':
            return <Credits credits = {credits} />
          case 'login': 
          return <LoginInfo loginInfo = {loginInfo}/>
           default:
            return null
        }
      })()}
</div></> :<Loader/> }


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


   
      
    </div>
  )
}

export default InstacartAccounts
