import React from 'react'
import Sidebar from '../components/Sidebar.js'
import Navbar from '../components/Navbar.js';
import backgroundImage from '../images/image.jpg';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;


const Container = styled(motion.div)`
  position: relative;
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100vh;
  /* display: flex;
  justify-content: center;
  align-items: center; */

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
    filter: blur(4px);
    z-index: -1;
  }

`;

const Dashboard = () => {
  return (
    <>
    <GlobalStyle />
    <Container>
      <Navbar/>
      <Sidebar/>
    </Container>
    </>
  )
}

export default Dashboard