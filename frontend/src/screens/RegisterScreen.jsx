/* eslint-disable react/jsx-no-undef */
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import FormContainer from './../components/FormContainer';
import { setCredentials } from './../slices/authSlice';
import { useRegisterMutation } from './../slices/userSlice';

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    const [register, {isLoading}] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    
   useEffect(()=>{
    if(userInfo){
        navigate('/');
    }
   }, [navigate, userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password!== confirmPassword) {
            toast.error('Passwords do not match');
        } else{
            try {
                const res = await register({ name , email, password}).unwrap();
                dispatch(setCredentials({...res}));
                navigate('/');
                console.log(res);
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }

  return (
    <FormContainer >
        <h1>Sign Up</h1>

        <Form onSubmit={handleSubmit}>
            <Form.Group className='my-2' controlId='eName'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                 type='text' 
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            
            <Form.Group className='my-2' controlId='email'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                 type='email' 
                placeholder='Enter email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password' 
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group className='my-2' controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type='password' 
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Group>
                {isLoading && <Loader />}
            <Button variant='primary' type='submit'>
                Sign Up
            </Button>

            <Row className='py-3'>
                <Col>
                    Already have an account ? <Link to='/login'>Login</Link>
                </Col>
            </Row>
        </Form>

    </FormContainer>
  )
}

export default RegisterScreen