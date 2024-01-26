import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import { Outlet  } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='body'>

    <Header/>
       <ToastContainer />
    <div className='center'>
     <Container >
     <Outlet/>
      </Container>
      </div>
    </div>
  )
}

export default App
