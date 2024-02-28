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
  width: 15%;
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
  font-size: 17px;
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;

  &::placeholder { /* This targets the placeholder text */
  color: rgba(246, 246, 246, 0.8); /* Set the placeholder text color to semi-transparent white */
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  }
  
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

  /* Styling for WebKit-based browsers like Chrome and Safari */
  &::-webkit-scrollbar {
    width: 30px; /* Width of the scrollbar */
    border-radius: 25px;
  }

  &::-webkit-scrollbar-track {
    background: #f6f6f6; /* Color of the track */
    border-radius: 10px; /* Border radius of the track */
  }

  &::-webkit-scrollbar-thumb {
    background: #64CCC5; /* Color of the thumb */
    border-radius: 25px; /* Border radius of the thumb */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; /* Color of the thumb on hover */
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
  margin-top: 10%;

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
  margin-top: 5%;

  @media screen and (max-width: 880px) {
    width: 50%;
    font-size: 13px;
  }
`;

const ToggleButton = styled.button`
  width: 20%;
  cursor: pointer;
  background-color: inherit;
  color: #e7ecef;
  border: none;
  padding: 3px 4px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-left: 5px;


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
  align-items: left;
  cursor: pointer; 

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const DocumentTitle = styled.h1`
  text-align: left;
  font-size: 13px;
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

const ButtonContent = styled.div`
  display: flex;
  justify-content: space-between; /* Aligns children (title and icon) to start and end of the container */
  align-items: center; /* Centers children vertically */
  width: 100%; /* Takes full width to utilize justify-content properly */
`;

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isFetching, setIsFetching] = useState(false); 
    const [searchResults, setSearchResults] = useState([]);
    const [titles, setTitles] = useState([]);

    const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

 
  const handleDocumentClick = title => {
    setSelectedTitle(title); //ce titlu de articol se selecteaza 
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

          
             const rsp = await axios.post('http://127.0.0.1:5000/addTitle', {
              titles: [searchQuery.trim()] 
          }, {
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
              }
          });

          if (rsp.status === 200) {
            // Update local state with new title
            await fetchTitles();
        }


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

  const fetchTitles = async () => {
    const token = localStorage.getItem('access_token');
    try {
        const response = await axios.get('http://127.0.0.1:5000/getTitles', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        if (response.status === 200) {
          const reversedTitles = response.data.titles.reverse();
          setTitles(response.data.titles); // Update the state with the fetched titles
                        //setTitles(prevTitles => [...prevTitles, searchQuery.trim()]);
        } else {
            console.error('Failed to fetch titles');
        }
    } catch (error) {
        console.error('Error fetching titles:', error);
    }
  };

  // Fetch titles when the component mounts
    useEffect(() => {
      fetchTitles();
    }, []);

  return (
    <Container0>
        <Container isOpen={isOpen} style={isOpen ? { width: '15%' } : { width: '2%'}}>
          
        <ToggleButtonContainer>
          <ToggleButton onClick={toggleSidebar} isOpen={isOpen}>
            {isOpen ? <ChatIcon /> : <ChatIcon style={{ fontSize: 20 }} />}
          </ToggleButton>
          <Title isOpen={isOpen}>{isOpen ? 'New Dialog' : null}</Title>
        </ToggleButtonContainer>

            <SidebarContainer>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {titles.map((title, index) => (
                  <li key={index}>
                    <StyledButton
                      isOpen={isOpen}
                      style={isOpen ? { width: '100%' } : { width: '0%'}}
                      onClick={() => handleDocumentClick(title)}
                    >
                      {isOpen &&
                      <ButtonContent>
                        <DocumentTitle>{title}</DocumentTitle>
                          <DeleteIcon style={{ marginRight: '5px' }} />
                      </ButtonContent>
                      }
                    </StyledButton>
                  </li>
                ))}
                </ul>
            </SidebarContainer>
        </Container>

        <ChatContainer>
          <SearchContainer>
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
              <div key={index} style={{ paddingLeft: '20px' }}>
                <p>{result}</p>
              </div>
            ))}
          </DocumentContainer>
          <ContentContainer>DIALOG HERE</ContentContainer>
        </ChatContainer>
    </Container0>
  )
}

export default Sidebar