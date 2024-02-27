import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const Container0 = styled.div`
  display: flex;
  flex-direction: row;
  background-color: transparent;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  /* border: 1px solid white; */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top:20px;
  color: #e7ecef;
  font-size: 17;
  font-weight: bold;
  width:30%;
  height: 100%;
`

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin-right: 1%;
  margin-left:1%;
  /* background-color: pink; */

`
const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 10px;
  width: 100%;
  font-size: 18px;
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;

  &:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const animateSearchBar = keyframes`
  0% {
    width: 300px;
  }
  100% {
    width: 500px;
  }
`;

const AnimatedInput = styled(Input)`
  animation: ${animateSearchBar} 0.3s forwards;
  transition: width 0.3s ease-in-out;
`;

const SearchButton = styled.div`
  //position: fixed;
  background-color: #427D9D;
  color: 7439db;
  padding: 7px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  font-weight: bold;
  margin-left: 10px;
  border: 0.1px solid #9BBEC8;

  &:hover {
    transform: translateY(-2px);
    background-color: #64CCC5;
    border: 0.1px solid #DAFFFB;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    font-weight: bold;
  }

`;

const DocumentContainer = styled.div`
  background-color: white;
  width: 100%;
  border-radius: 25px;
  margin-top: 20px;
  height: 200px;
  margin-bottom: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
  overflow-y: auto; /* Make the container scrollable */

  @media screen and (max-width: 800px) {
    width: 85%;
  }
`;

const ContentContainer = styled.div`
  background-color: white;
  width: 100%;
  border-radius: 25px;
  height: 400px;
  margin-bottom: 30px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);

  @media screen and (max-width: 800px) {
    width: 85%;
  }
`;

const SidebarContainer = styled.div`
  width: 100%;
  height: 100%;
  color: #e7ecef;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: row;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const ToggleButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #e7ecef;
  font-weight: bold;
  /* border-bottom: 0.5px solid white; */

  @media screen and (max-width: 880px) {
    width: 50%;
    font-size: 13px;
  }
`;

const ToggleButton = styled.button`
  width: 50%;
  cursor: pointer;
  background-color: inherit;
  color: #e7ecef;
  border: none;
  padding: 3px 4px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;

  @media screen and (max-width: 880px) {
    width: 50%;
    font-size: 20px;
  }
`;

const Title = styled.h1`
  text-align: left;
  font-size: 20px;
  color: white;
  white-space: nowrap; 
  margin-left: 5px;
  padding: 3px 4px;
  cursor: pointer; //cand se apasa aici trb sa se creze un nou chat: o noua cautare dupa titlu + golire content container

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const DocumentTitle = styled.h1`
  text-align: left;
  font-size: 15px;
  color: white;
  white-space: nowrap; 
  padding: 3px 4px;
  cursor: pointer; //cand se apasa aici trb sa se creze un nou chat: o noua cautare dupa titlu + golire content container
  font-weight: normal;

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const StyledButton = styled.button`
  background-color: #427D9D;
  border: 0.1px solid #427D9D;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  color: #e7ecef;
  font: inherit;
  cursor: pointer;
  padding: 10px;
  display: flex;
  flex-direction: row;
  font-size: 15px;
  height: 40px;
  align-items: center;
  width: 100%;
  margin-bottom: 1px;
  border-radius: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    font-weight: bold;
    background-color: #64CCC5;
    border: 2px solid #64CCC5;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }


  @media screen and (max-width: 768px) {
    width: 100%;
    height: 40px;
    font-size: 15px;
  }

`;


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isFetching, setIsFetching] = useState(false); 
    const [searchResults, setSearchResults] = useState([]);

    const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

 
  const handleDocumentClick = title => {
    setSelectedTitle(title); //ce titlu de articol se selecteaza 
  };

  const renderContent = () => {
        //trb sa afisez acolo propozitiile selectate din articol
        //trb facut aici un get
        console.log("Sunt in content container");
        return;
    };
  
    useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearch = async (e) => {
    if (!searchQuery) {
        toast.error("Please fill the search field!");
        return;
    }
    e.preventDefault();
    setIsFetching(true);

    console.log(searchQuery);
    setTitle(title);
    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://127.0.0.1:5000/getContent', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            params: { page_title: searchQuery.trim() }
        });

        if (response.status === 200) {
            setSearchResults(response.data);
            localStorage.setItem('lastSearchResults', JSON.stringify(response.data));

            setSearchQuery('');
            console.log('Search results:', response.data);
        } else {
            console.error('Failed to fetch search results');
        }
    } catch (error) {
        console.error('Error fetching search results:', error);
    } finally {
        setIsFetching(false);
    }
};

  return (
    <Container0>
        <Container>
        <ToggleButtonContainer>
          <ToggleButton onClick={toggleSidebar} isOpen={isOpen}>
            {isOpen ? <ChatIcon /> : <ChatIcon style={{ fontSize: 20 }} />}
          </ToggleButton>
          <Title isOpen={isOpen}>{isOpen ? 'New Dialog' : null}</Title>
        </ToggleButtonContainer>

            <SidebarContainer>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <StyledButton
                isOpen={isOpen}
                style={isOpen ? { width: '100%' } : { width: '100%'}}
                onClick={() => handleDocumentClick('TITLU1')} //aici trb pus ce acceseaza gen
              >
                <DocumentTitle>First Title Here</DocumentTitle>
                {isOpen ? (<DeleteIcon style={{ marginRight: '5px' }} />) : (null)}
              </StyledButton>
            </li>
            <li>
              <StyledButton
                isOpen={isOpen}
                style={isOpen ? { width: '100%' } : { width: '100%'}}
                onClick={() => handleDocumentClick('TITLU2')} //aici trb pus ce acceseaza gen
              >
                <DocumentTitle>Second Title Here</DocumentTitle>
                {isOpen ? (<DeleteIcon style={{ marginRight: '5px' }} />) : (null)}
              </StyledButton>
            </li>
            </ul>
            </SidebarContainer>
        </Container>

        <ChatContainer>
          <SearchContainer>
            {/* <SearchIcon /> */}
            <Input placeholder="Introduce a title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchButton onClick={handleSearch} disabled={isFetching}>
                {isFetching ? 'Searching...' : 'Search'}
            </SearchButton>
          </SearchContainer>

          <DocumentContainer>
          {searchResults.map((result, index) => (
    <div key={index}>
      <p>{result}</p>
    </div>
  ))}
          </DocumentContainer>
          {/* <ContentContainer>{renderContent()}</ContentContainer> */}
          <ContentContainer>DIALOG HERE</ContentContainer>
        </ChatContainer>
    </Container0>
  )
}

export default Sidebar