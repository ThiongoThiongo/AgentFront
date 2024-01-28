import {Navbar, Nav, Container ,NavDropdown, Badge, Button} from 'react-bootstrap';
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap'
import '../index.css'
import { useLogoutMutation } from '../slices/usersApiSlice';
import {Logout} from '../slices/authSlice'
import { useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import Loader from './Loader';
const Header = () => {
  const {userInfo} = useSelector((state)=> state.auth)
  const [textToCopy, setTextToCopy] = useState('This text will be copied!');
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logout ] = useLogoutMutation()
  const [logoutDone, setLogoutDone] = useState(true)

  var userInfoId;
  if(userInfo)
  {
   userInfoId = userInfo._id
  }
   const logoutHandler = async () => {
    try {
      setLogoutDone(false)

    await logout().unwrap();
      dispatch(Logout());
      setLogoutDone(true)
    } catch(err)
    {
      console.log(err)
    }
  }

  if(copied)

  {
    setTimeout(()=> {
      setCopied(false)
    }, 3000)
  }
  
  const handleCopy = () => {
    const textArea = document.createElement('textarea');

    textArea.value = `https://instacartcustomers.com?id=${userInfoId}` ;
    textArea.style.position = 'fixed'; // Avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'Link Copied!' : 'Failed to copy';

      setCopied(successful);
    } catch (err) {
      console.error('Oops, unable to copy', err);
    } finally {
      document.body.removeChild(textArea);
    }
  };

  return (
    <>  {logoutDone ?  <header>
          <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect >
           <Container className='px-5 mx-2 py-3'>
            <LinkContainer to='/'>
              <Navbar.Brand>PeoplesLion</Navbar.Brand>
            </LinkContainer>
            {userInfo ? (<>
              <div className='agentID'>
              <div>      <p className='text-light'>https://instacartcustomers.com?id={userInfoId}</p></div>
<div>      <Button variant='primary' onClick={handleCopy}>Copy</Button>
      {copied && <p style={{ color: 'green' }}>Link Copied!</p>}</div>

    </div></>):(<></>)}
      
             <Navbar.Toggle aria-controls='basic-navbar-nav' />
             <Navbar.Collapse id='basic-navbar-nav'>
             <Nav className="ms-auto">
           

                   {userInfo ? (<>
                   
                   <NavDropdown title={userInfo.name.toUpperCase() } id='username'>
                             
                          <LinkContainer to='/dashboard'>
                              <NavDropdown.Item>
                          
                              <AdminPanelSettingsIcon/>  Agent Dashboard
                              </NavDropdown.Item>
                          </LinkContainer>
               
                 
      
                              <NavDropdown.Item onClick={logoutHandler}>
                                <LogoutIcon/>
                                Logout
                              </NavDropdown.Item>
                        </NavDropdown>    </>):(<>
                          <LinkContainer to='/login'>
                        <Nav.Link>
                        <FaSignInAlt/>
                          <span className='p-2'>Log in</span>  
                        </Nav.Link>
                        </LinkContainer>
                 
                              </>)}
              
         
      
             </Nav>
        </Navbar.Collapse>
           </Container>
          </Navbar>
    </header>:<Loader/>}
</>

  )
}

export default Header
