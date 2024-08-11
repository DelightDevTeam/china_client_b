import React, { useState } from 'react'
import logo from '../assets/images/logo.png';
import { Form, Modal, Spinner } from 'react-bootstrap';
import user from '../assets/images/user.png';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/baseURL';
import { FaUser } from 'react-icons/fa';
import { FaRegCircleUser, FaRightFromBracket } from 'react-icons/fa6';

const Navbar = () => {
  const [isLoginOpen,setIsLoginOpen]=useState(false)
  const {data:user} = useFetch(BASE_URL + '/user')
  const [loader, setLoader] = useState(false);
  const language = localStorage.getItem('lan');
  const auth = localStorage.getItem('token');
  
  return (
    <div className='py-2 py-sm-3 px-1 px-sm-2 px-lg-4 d-flex align-items-center justify-content-between'>
      <Link to={'/'}>
      <img src={logo} className='logo' />
      </Link>
      {/* <button onClick={()=>setIsLoginOpen(true)} className="primaryBtn py-2 px-4">Login</button> */}
      <div className="d-flex align-items-center gap-4">
        {!auth && (
          <Link to={'/login'} className="primaryBtn py-2 px-4">Login</Link>
        )}
        {auth && (
          <div className='d-flex align-items-center gap-2'>
            <FaRegCircleUser className="" style={{ fontSize: "30px" }} />
            <div>
              <small className='userNav fw-semibold d-block'>Name : {user && user.name}</small>
              <small className='userNav fw-semibold'>
                <i className="fas fa-wallet"></i> : {user && Number(user.balance).toLocaleString()}</small>
            </div>
          </div>
        )}
      </div>



      {/* <Modal  className='text-black loginModal rounded-4' show={isLoginOpen} onHide={()=>setIsLoginOpen(false)}>
        <Modal.Header closeButton style={{background:'#Eee'}}>
          <Modal.Title className='text-center' style={{width:'100%'}}>
            <h5 className="fw-semibold text-center">Login Your Account</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body  style={{background:'#eee',
          borderBottomLeftRadius:'8px',
          borderBottomRightRadius:'8px'}}>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Player ID</Form.Label>
        <Form.Control type="text" placeholder="A12380XD" />
       </Form.Group>
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"   />
       </Form.Group>
       <Form.Group  className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="I confirm that I am over 18 years old and have read Terms of Service" />
      </Form.Group>
      </Form>
        <button className="mb-3 loginBtn fw-semibold py-2 w-full">
          Login
        </button>
        </Modal.Body>
        
      </Modal> */}
    </div>
  )
}

export default Navbar
