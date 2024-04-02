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
import SendIcon from '@mui/icons-material/Send';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AI_Icon from '../images/ai.webp'
import AI_Icon2 from '../images/ai2.png'
import UserIcon from '../images/user.png'
import "react-chat-elements/dist/main.css"
import { MessageBox } from "react-chat-elements";
import { MessageList } from "react-chat-elements"
import index from '../index.css'

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
    background-color: rgba(255, 255, 255, 0.4);
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
  overflow-y: auto; 

  @media screen and (max-width: 800px) {
    width: 85%;
  }

  &::-webkit-scrollbar {
    width: 30px; 
    border-radius: 25px;
  }

  &::-webkit-scrollbar-track {
    background: #f6f6f6; 
    border-radius: 10px; 
  }

  &::-webkit-scrollbar-thumb {
    background: #427D9D; 
    border-radius: 25px; 
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }


`;

const ContentContainer = styled.div`
  background-color: white;
  width: 100%;
  border-radius: 25px;
  height: 350px;
  margin-bottom: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow-y: auto; 
  overflow-x: hidden;

  @media screen and (max-width: 800px) {
    width: 85%;
  }

  &::-webkit-scrollbar {
    width: 30px; 
    border-radius: 25px;
  }

  &::-webkit-scrollbar-track {
    background: #f6f6f6; 
    border-radius: 10px; 
  }

  &::-webkit-scrollbar-thumb {
    background: #427D9D; 
    border-radius: 25px; 
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
`;

const FixedSearchContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -2px 4px rgba(0,0,0,0.1); 
  border-radius: 10px;
  
`;

// const InputChat = styled.input`
//   padding: 10px;
//   border: none;
//   border-radius: 10px;
//   width: 100%;
//   font-size: 15px;
//   color: white;
//   background-color: rgba(255, 255, 255, 0.2);
//   cursor: pointer;

//   &::placeholder { 
//   color: rgba(246, 246, 246, 0.8); 
//     text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
//   }
  
//   &:focus {
//     outline: none;
//     background-color: rgba(255, 255, 255, 0.3);
//   }


// `;

// const SearchIconContainer = styled.div`
//   display: flex; 
//   justify-content: center; 
//   align-items: center; 
//   background-color: #427D9D;
//   color: white;
//   padding: 7px 10px;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: all 0.3s ease-in-out;
//   text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
//   font-weight: bold;
//   margin-left: 10px;
//   border: 0.1px solid #9BBEC8;
  
//   &:hover {
//     transform: translateY(-2px);
//     background-color: #64CCC5;
//     border: 0.1px solid #DAFFFB;
//     box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
//     text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
//     font-weight: bold;
//   }
// `;

const SearchIconContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;
  transition: transform 0.3s ease;
  border: 1px solid white; 
  border-radius: 10px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 


  &:hover {
    transform: translateY(-50%) scale(1.3);
  }
`;

const InputChatContainer = styled.div`
  position: relative; 
  flex-grow: 1; 
  margin-right: 10px; 
  overflow: hidden;
  border-radius: 10px;


`;

const InputChat = styled.input`
  padding: 10px;
  padding-right: 50px;
  border: none;
  border-radius: 10px;
  width: 100%; // Full width of its container
  font-size: 15px;
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  cursor: text; // Use text cursor instead of pointer

  &::placeholder { 
    color: rgba(246, 246, 246, 0.8); 
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
    
  }
  
  &:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 0.3);
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
  overflow-y: auto; 

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
  justify-content: space-between; 
  align-items: center; 
  width: 100%; 
`;

const AiContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  margin-left: 10px; 
  margin-top: 10px; 
`;

const AiIconContainer = styled.div`
  /* position: absolute;  */

  width: 40px; 
  height: 50px; 

  img {
    width: 100%; 
    height: 35px; 
  }
`;

const UserContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  position: right;
  margin-top: 20px; 
  justify-content: flex-end;
`;

const UserIconContainer = styled.div`
  /* position: absolute;  */
  width: 40px; 
  height: 40px; 

  img {
    width: 100%; 
    height: 35px; 
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
  const [titles, setTitles] = useState([]);
  const [selectedSummary, setSelectedSummary] = useState('');
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const username = localStorage.getItem('username');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleDocumentClick = (title, summary) => {
    setSelectedTitle(title);
    setSelectedSummary(summary); 
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
          const titlesData = response.data.searched_titles || [];
          setTitles(titlesData.reverse());

        } else {
            console.error('Failed to fetch titles');
            setTitles([]); 
        }
    } catch (error) {
        console.error('Error fetching titles:', error);
        setTitles([]); 
    }
  };

  useEffect(() => {
      fetchTitles();
      setTriggerFetch(false);
    }, [triggerFetch]);

  const handleSearch = async (e) => {
    if (!searchQuery) {
        toast.error("Please fill the search field!");
        return;
    }
    e.preventDefault();
    setIsFetching(true);
    setSearchResults([]); 

    console.log(searchQuery);
    setTitle(title);

    try 
    {
        const token = localStorage.getItem('access_token');
        const summaryResponse = await axios.get('http://127.0.0.1:5000/getSummary', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            params: { page_title: searchQuery.trim() }
        });

        if (summaryResponse.status === 200) {
            const results = Array.isArray(summaryResponse.data) 
                ? summaryResponse.data 
                : summaryResponse.data.split('\n');
    
            setSearchResults(results);
            setSelectedSummary(results.join('\n'));
            localStorage.setItem('lastSearchResults', JSON.stringify(results));
            console.log('Search results:', results);
            setTriggerFetch(true);
        } 
        else 
        {
            toast.error('The page doesn\'t exist on English Wikipedia!');
        }
    } 
    catch (error) 
    {
        if (error.response && error.response.status === 404)
        {
            toast.error(error.response.data.message);

        }
        else 
        {
            //console.error('Error fetching search results:', error);
            //toast.error('An error occurred while fetching search results.');
            //toast.error('The page doesn\'t exist on English Wikipedia!');
            setTriggerFetch(true);
        }
    } 
    finally 
    {
        setIsFetching(false);
        setSearchQuery(''); 
    }
  };

  const handleDeleteClick = (e, titleToDelete) => {
    e.stopPropagation(); 
  
    if (!window.confirm(`Are you sure you want to delete "${titleToDelete}"?`)) {
      return; 
    }
  
    const token = localStorage.getItem('access_token');
    axios.post('http://127.0.0.1:5000/deleteTitle', { title: titleToDelete }, {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
        if (response.status === 200) {
            // fetchTitles(); 
            setTriggerFetch(true);
            setSelectedSummary('');
            toast.success('Title deleted successfully!');
        } else {
            console.error('Failed to delete the title');
            toast.error('Failed to delete the title');
        }
    })
    .catch(error => {
        console.error('Error deleting the title:', error);
        toast.error('An error occurred while deleting the title');
    });
  };


  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      setMessages([...messages, userInput]);
      setUserInput(''); 
    }
  };

  const clearDialog = () => {
    setSelectedSummary(''); 
    setMessages([]); 
  };
  
  const handleNewDialogClick = () => {
    if (isOpen) {
      clearDialog(); // Only clear when the sidebar is open and going to be closed
    }
  };

  return (
    <Container0>
        <Container isOpen={isOpen} style={isOpen ? { width: '15%' } : { width: '2%'}}>
          
        <ToggleButtonContainer>
          <ToggleButton onClick={toggleSidebar} isOpen={isOpen}>
            {isOpen ? <ChatIcon /> : <ChatIcon style={{ fontSize: 20 }} />}
          </ToggleButton>
          <Title onClick={handleNewDialogClick} isOpen={isOpen}>{isOpen ? 'New Dialog' : null}</Title>
        </ToggleButtonContainer>

        <SidebarContainer style={isOpen ? { width: '100%' } : { display: 'none'}}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {titles.map((item, index) => (
                <li key={index}>
                  <StyledButton
                    isOpen={isOpen}
                    onClick={() => handleDocumentClick(item.title, item.summary)} 
                    style={isOpen ? { width: '195px' } : { width: '0%'}}
                  >
                    {isOpen && (
                      <ButtonContent>
                        <DocumentTitle>{item.title}</DocumentTitle>
                        <div onClick={(e) => handleDeleteClick(e, item.title)}>
                          <DeleteIcon style={{ marginRight: '5px' }} />
                        </div>
                      </ButtonContent>
                    )}
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
            {selectedSummary.split('\n').map((part, index) => (
              <React.Fragment key={index}>
                <p key={index} style={{ textIndent: '2em', marginLeft: "3px" }}>{part}</p> 
              </React.Fragment>
            ))}
          </DocumentContainer>

          <ContentContainer>
            <AiContainer>
              <AiIconContainer>
                <img src={AI_Icon2} alt="AI Icon" />
              </AiIconContainer>

              <MessageBox
              position='left'
              title='AI'
              type='text'
              text={selectedTitle ? `Hi, I'm your automated assistant. I can answer your questions about ${selectedTitle}.` : `Hi, I'm your automated assistant. I can answer your questions.`}
              />              
            </AiContainer>

            {messages.map((message, index) => (
              <UserContainer key={index}>
                <MessageBox
                  position="right"
                  title={username}
                  type="text"
                  text={message}
                />
                <UserIconContainer>
                  <img src={UserIcon} alt="User Icon" />
                </UserIconContainer>
              </UserContainer>
            ))}

          </ContentContainer>

          <FixedSearchContainer>
            <InputChatContainer>
              <InputChat 
                placeholder="Ask a question..."
                value={userInput}
                onChange={handleInputChange}
              />
              <SearchIconContainer onClick={handleSendMessage}>
                <ArrowUpwardIcon/>
              </SearchIconContainer>
            </InputChatContainer>
          </FixedSearchContainer>

        </ChatContainer>
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

    </Container0>
  );
}

export default Sidebar;