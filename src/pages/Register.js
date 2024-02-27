import React, { useState } from 'react'
import backgroundImage from '../images/image.jpg';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Container = styled(motion.div)`
  position: relative;
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url(${backgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(2px);
    z-index: -1;
  }

`;

const InnerContainer = styled.div`
 
`;

const FormContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  border: 1px solid white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  opacity: 0.8;
  margin-top:20px;
  align-items:center;
  border-radius: 10px;

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items:center;
  
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  margin: 7px 0;
  min-width: 40%;
  height: 8vh;
  width: 20vw;
  border-radius: 10px;
  border: 1px solid grey;

`;

const Title = styled.h1`
  text-align: center;
  font-size: 25px;
  margin-bottom: 10px;
  color: white;

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const Button = styled.button`
  cursor: pointer;
  border: 2px solid #000;
  color: #fff;
  margin-bottom: 10px;
  margin-top: 7px;
  width:20%;
  height: 5vh;
  background-color: #000;
  transition: all 0.2s ease-in-out;
  border-radius: 4px;
  transition: all 0.3s ease-in-out;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  font-weight: bold;

  &:hover {
    border: 2px solid #427D9D;
    background-color: #427D9D;
    color: white;
    height: 5vh;
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    font-weight: bold;
  }

  &:disabled {
    color: green;
    cursor: not-allowed;
  }

`;

const Description = styled.p`
  font-size: 15px;
  margin-top: 3px;
  margin-bottom: 15px;
  color: white;

`;

const Spinner = styled.div`
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !username || !password) 
    {
      toast.error('Please fill all the fields!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });

      return;
    }

    setIsFetching(true);
    try 
    {
      const response = await axios.post('http://127.0.0.1:5000/register', {
        email: email,
        username: username,
        password: password
      })

      localStorage.setItem('access_token', response.data.access_token);
      console.log(response.data);

      toast.success('Successful registration!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });

      //redirect to login if successful register
      navigate('/login');

      } 
      catch (error) 
      {
        console.error(error);
        toast.error(error.response?.data?.message);
      }

    setIsFetching(false);
  };

  return (
    <Container  
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}>
        <InnerContainer>
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}>
            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <Title>Create a new account</Title>
                    <Input 
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    id="email"
                    name="email"
                      />
                    <Input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                    id="username"
                    name="username"
                      />
                    <Input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    id="password"
                    name="password"/>
                    {isFetching ? (<Spinner/>) : (<Button>Sign up</Button>)}
                    <Description>
                        Already have an account?&nbsp;
                        <Link to='/login' style={{color: 'inherit'}}>
                            Sign in
                        </Link>
                    </Description>
                </Form>
            </FormContainer>
        </motion.h1>
      </InnerContainer>
      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

    </Container>
  )
}

export default Register