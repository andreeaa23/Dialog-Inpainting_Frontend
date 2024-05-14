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
  border-radius: 10px;
  opacity: 0.8;
  margin-top:20px;
  align-items:center;


`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items:center;
  
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  margin: 5px 0;
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
  margin-top: 5px;
  width:30%;
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

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  align-items: center;
`

const LinkText = styled.h2`
  background: none;
  color: white;
  text-decoration: underline;
  border: none;
  cursor: pointer;
  padding-top: 15px;
  transition: transform 0.3s ease-in-out;
  font-size: 15px;
  
  &:hover {
    transform: translateY(-3px);
  }
`;

//daca reset code  bun => redirectionare la change pass
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [receivedCode, setReceivedCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [isFetching2, setIsFetching2] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
};


const handleSubmit = async (e) => {
  e.preventDefault();

  setIsFetching(true);
  try {
      const response = await axios.post('http://127.0.0.1:5000/forgot-password', { email });
      toast.success('Codul a fost trimis cu succes!');
      setEmailSent(true);
      setCodeVerified(false); // Reset code verification state
  } catch (error) {
      if (error.response && error.response.data.error === 'Email-ul introdus nu se regăsește in baza de date!') {
          toast.error('Acest e-mail nu se află în baza de date!');
      } else {
          toast.error('Nu s-a putut trimite codul către acest e-mail!');
      }
  }
  setIsFetching(false);
};

const handleCodeSubmit = async (e) => {
  e.preventDefault();

  setIsFetching2(true);
  try {
    const response = await axios.post('http://127.0.0.1:5000/verify-reset-code', {
      email,
      resetCode: receivedCode
    });
    localStorage.setItem('email', email);
    setCodeVerified(true); // Set to true when code is verified
   // navigate('/change-password/'+ receivedCode);
  } catch (error) {
    if (error.response && error.response.data.error === 'Invalid reset code') {
      toast.error('Cod de resetare invalid');
    } else {
      toast.error('A intervenit o eroare');
    }
  }
  setIsFetching2(false);
};

//sa fac apel la change-password sa trimit noua parola
const handlePasswordChange = async (e) => {
  e.preventDefault();
  if (newPassword !== confirmNewPassword) {
    toast.error('Parolele nu corespund!');
    return;
  }
  try {
    // Assume JWT is stored in localStorage after login

    const response = await axios.post('http://127.0.0.1:5000/change-password2', { email: email, password: newPassword });
    toast.success(response.data.message);
    navigate('/login'); // Redirect to login after successful password change
  }
   catch (error) {
    if (error.response) 
      toast.error(error.response.data.error || 'Failed to change password');
    else 
      toast.error('An error occurred while changing the password');
    
  }

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
                    <Title>Change password</Title>
                    <Input 
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange} 
                    id="email"
                    name="email"
                    />
              {isFetching ? (
                <Spinner />
              ) : (
                <Button type="submit" disabled={codeVerified}>{emailSent && !codeVerified ? "Send another reset code" : "Send email"}</Button>              )}                  </Form> 

                  {emailSent && !codeVerified &&(  
                  <Form onSubmit={handleCodeSubmit}> 
                    <Input 
                    type="code" 
                    placeholder="Reset code"
                    value={receivedCode}
                    onChange={(e) => setReceivedCode(e.target.value)} 
                    id="code"
                    name="code"/>
                    {isFetching2 ? (<Spinner/>) : (<Button>Send reset code</Button>)}
                    </Form>
                )}

                {codeVerified && (
                <Form onSubmit={handlePasswordChange}>
                <Input 
                  type="password" 
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  id="newPassword"
                  name="newPassword"
                />
                <Input 
                  type="password" 
                  placeholder="Confirm New Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  id="confirmPassword"
                  name="confirmPassword"
                />
                <Button type="submit">Change Password</Button>
              </Form>
            )}
                <LinkContainer>
                    <Link to='chane-password'>
                      <LinkText>Back to Login</LinkText>
                    </Link>
                </LinkContainer>
               
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

export default ForgotPassword