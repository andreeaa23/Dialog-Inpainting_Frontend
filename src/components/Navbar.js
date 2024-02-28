import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import styled, {keyframes} from 'styled-components';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
  position: fixed;
  height: 60px;
  margin-left: 600px;
  background-color: transparent;
  z-index: 1000;
  width: 100%;

`;

const Wrapper = styled.div`
  padding: 18px 10px;
  display: flex;
  align-items: center;
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  @media screen and (max-width: 880px) {
    padding: '0px 5px';
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #e7ecef;
  font-size: 17;
  font-weight: bold;

  @media screen and (max-width: 880px) {
    display: none;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center; // Corrected from 'right' to 'center' for proper CSS value
  justify-content: flex-end;
  margin-left: 780px;
  color: #e7ecef;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;

  @media screen and (min-width: 856px) {
    margin-left: 780px;
  }

  @media screen and (max-width: 905px) {
    margin-left: 700px;
  }



`;

const LogOutButton = styled.div`
  //position: fixed;
  background-color: #427D9D;
  color: 7439db;
  padding: 7px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border: 0.1px solid #9BBEC8;
  display: flex;
  align-items: center;
  font-weight: bold;
 

  &:hover {
    transform: translateY(-2px);
    background-color: #64CCC5;
    border: 2px solid #64CCC5;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    font-weight: bold;
  }

`;

const LogOutIcon = styled(LogoutIcon)`
  margin-left: 10px;

`;

const LogOutText = styled.span`
  font-size: 17px;

`;


const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = async () => 
    {
        localStorage.removeItem('access_token');
        localStorage.removeItem('lastSearchResults')

        toast.success('Successful Log Out!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });

        navigate('/login');
  }


    return (
        <Container>
          <Wrapper>
            <Right>
            <LogOutButton onClick={handleLogout}>
              <LogOutText> Log Out </LogOutText> 
                    <LogOutIcon icon={LogoutIcon}/>
                </LogOutButton>      
            </Right>
          </Wrapper>
          <ToastContainer/>
        </Container>
      );
    
}

export default Navbar