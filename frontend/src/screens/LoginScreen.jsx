/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormContainer from './../components/FormContainer';
import { setCredentials } from './../slices/authSlice';
import { useLoginMutation } from './../slices/userSlice';
import Loader from '../components/Loader';
const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, {isLoading}] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

   useEffect(()=>{
    if(userInfo){
        navigate('/');
    }
   }, [navigate, userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({email, password}).unwrap();
            dispatch(setCredentials({...res}));
            navigate('/');
        } catch (error) {
            toast.error(error.data.message || error.error);
        }
    }

  return (
    <FormContainer >
        <h1>Sign In</h1>

        <Form onSubmit={handleSubmit}>
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
                {isLoading  && <Loader/>}
            <Button variant='primary' type='submit'>
                Sign In
            </Button>

            <Row className='py-3'>
                <Col>
                    New Customer ? <Link to='/register'>Register</Link>
                </Col>
            </Row>
        </Form>

    </FormContainer>
  )
}

export default LoginScreen