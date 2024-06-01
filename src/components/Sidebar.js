import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link } from 'react-router-dom';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AI_Icon from '../images/ai.webp'
import AI_Icon2 from '../images/ai2.png'
import UserIcon from '../images/user.png'
import "react-chat-elements/dist/main.css"
import { MessageBox } from "react-chat-elements";
import { MessageList } from "react-chat-elements"
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import HelpMenu from '../components/HelpMenu.js'

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
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top:20px;
  color: #e7ecef;
  font-size: 17;
  font-weight: bold;
  width:40%;
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

const SearchButton = styled.div`
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
  display: flex;
  align-items: center;
  flex-direction: row;

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
  width: 100%; 
  font-size: 15px;
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  cursor: text; 

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
  cursor: pointer; 
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
  flex-direction: column;
  margin-left: 10px; 
  margin-top: 10px; 
`;

const AiMessageContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const AiIconContainer = styled.div`
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
  width: 40px; 
  height: 40px; 

  img {
    width: 100%; 
    height: 35px; 
  }
`;
const RelevantQuestionsContainer = styled.div`
  display: flex;
  /* justify-content: space-around; */
  flex-direction: column;
  margin-top: 10px;
  margin-left: 70px;
  margin-right: 50px;
`;

const RelevantQuestionBox = styled.div`
  background-color: #f6f6f6;
  border: 1px solid #427D9D;
  border-radius: 10px;
  padding: 0px;
  width: 30%;
  height: 40px; 
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px;
  font-size: 12px;
  

  &:hover {
    background-color: #427D9D;
    color: white;
  }
`;

const TextStyle = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: #427D9D;
  margin-left: 3px;
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedTitle, setSelectedTitle] = useState('');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFetching, setIsFetching] = useState(false); 
  const [isFetching2, setIsFetching2] = useState(false); 
  const [searchResults, setSearchResults] = useState([]);
  const [titles, setTitles] = useState([]);
  const [selectedSummary, setSelectedSummary] = useState('');
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [AImessages, setAIMessages] = useState([]);
  const username = localStorage.getItem('username');
  const [conversation, setConversation] = useState([]);
  const [helpMenuOpen, setHelpMenuOpen] = useState(false);
  const contentRef = useRef(null);

  const [questions, setQuestions] = useState(["What is Inna's most popular song?"]);

  const fetchQuestions = async (title) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post('http://127.0.0.1:5000/getQuestion', {
        title: title,
       
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(response.data);
      const responseText = response.data;
      const question = responseText.split('question: ')[1];
      setQuestions(question);

    } 
    catch (error) 
    {
      console.error('Error fetching questions:', error);
    } 
  };

  useEffect(() => {
    if (selectedTitle) {
      fetchQuestions(selectedTitle);
    }
  }, [selectedTitle]);

  const renderRelevantQuestions = (question) => (
    <RelevantQuestionsContainer>
      <TextStyle>Predicted masked question:</TextStyle>
      {/* {questions.map((question, index) => ( */}
        {/* <RelevantQuestionBox key={index}> */}
        <RelevantQuestionBox>
          {question}
        </RelevantQuestionBox>
      {/* ))} */}
    </RelevantQuestionsContainer>
  );


  const handleHelpMenuOpen = () => {
    setHelpMenuOpen(true);
  };

  const handleHelpMenuClose = () => {
    setHelpMenuOpen(false);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleDocumentClick = async (title, summary) => {
    setSelectedTitle(title);
    setSelectedSummary(summary); 
    console.log(title);
    setAIMessages([`Hi, I'm your automated assistant. I can answer your questions about ${title}.`]);
    setConversation([{ type: 'AI', text: `Hi, I'm your automated assistant. I can answer your questions about ${title}.` }]);
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://127.0.0.1:5000/getConversation', {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          params: { title }
      });

      if (response.status === 200 && response.data?.conversation?.length > 0) {
          setConversation(response.data.conversation);
          console.log('Conversation:', response.data.conversation);
      } else {
          // No conversation found or an empty list returned
          setConversation([{ type: 'AI', text: `Hi, I'm your automated assistant. I can answer your questions about ${title}.` }]);
          //setAIMessages([`Hi, I'm your automated assistant. I can answer your questions about ${title}.`]);
         // setConversation([]);

      }
  } catch (error) {
      console.error('Error fetching conversation:', error);
     // setConversation([{ type: 'AI', text: `Failed to load conversation for "${title}". You may start a new conversation.` }]);
     setConversation([]);
  }
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
          //setTitles(titlesData.reverse());
          setTitles(titlesData);

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

            setConversation([{ type: 'AI', text: `Hi, I'm your automated assistant. I can answer your questions about ${searchQuery}.` }]);
            setSearchResults(results);
            setSelectedSummary(results.join('\n'));
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
            toast.error(error.response.data.message);
        else 
        {
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
            setConversation([]);
            setSelectedTitle('');
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


  const clearDialog = () => {
    setSelectedSummary(''); 
    setMessages([]); 
    setConversation([]);
    setSelectedTitle("");

  };
  
  const handleNewDialogClick = () => {
    if (isOpen) {
      clearDialog(); 
    }
  };

  const handleQuestionSubmit = async () => {
    if (userInput.trim()) {
      setMessages([...messages, userInput]);
      setUserInput(''); 
    }

    if (!selectedTitle || !userInput) {
      toast.error("Both title and question are required!");
      return;
    }

    setConversation(prev => [...prev, { type: 'User', text: userInput }]);

    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.post('http://127.0.0.1:5000/getAnswer', {
        title: selectedTitle,
        question: userInput
       
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(userInput);
  
      if (response.status === 200) 
      {
        const responseText = response.data;
        const answer = responseText.split('answer: ')[1];
        const finalAnswer = answer.charAt(0).toUpperCase() + answer.slice(1)
        
        setConversation(prev => [...prev, { type: 'AI', text: `${finalAnswer}` }]);
        console.log(finalAnswer);
        setAIMessages([...AImessages, answer]);
        toast.success('Answer fetched successfully!');
      } 
      else 
      {
        toast.error('Failed to fetch answer');
      }
    }
    catch (error) 
    {
      console.error('Error fetching answer:', error);
      toast.error('An error occurred while fetching the answer');
    } 
    finally 
    {
      setUserInput('');
    }
  };

  const handleSaveConversation = async () => {
    if (!selectedTitle || conversation.length === 0) 
    {
        toast.error("No conversation to save or no title selected!");
        return;
    }

    setIsFetching2(true); 

    const token = localStorage.getItem('access_token');
    try
    {
        console.log(conversation);
        const response = await axios.post('http://127.0.0.1:5000/saveConversation', {
            title: selectedTitle,
            conversation: conversation
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.status === 200) 
            toast.success('Conversation saved successfully!');
        else 
            toast.error('Failed to save conversation');
        
    } 
    catch (error) 
    {
        console.error('Error saving conversation:', error);
        toast.error('An error occurred while saving the conversation');
    } 
    finally 
    {
        setIsFetching2(false);  
    }
};

// const handleHelpMenu = () => {
//   navigate('/helpMenu');
// }
useEffect(() => {
  if (contentRef.current) {
    contentRef.current.scrollTop = contentRef.current.scrollHeight;
  }
}, [conversation]);
  
  return (
    <Container0>
        <Container isOpen={isOpen} style={isOpen ? { width: '15%' } : { width: '2%'}}>
          
        <ToggleButtonContainer>
          <ToggleButton onClick={toggleSidebar} isOpen={isOpen}>
            {isOpen ? <ChatIcon style={{marginTop:"2px"}}/> : <ChatIcon style={{ fontSize: 20 }} />}
          </ToggleButton>
          <Title onClick={handleNewDialogClick} isOpen={isOpen}>{isOpen ? 'New Conversation' : null}</Title>
        </ToggleButtonContainer>

        <SidebarContainer style={isOpen ? { width: '100%' } : { display: 'none'}}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {titles.map((item, index) => (
                <li key={index}>
                  <StyledButton
                    isOpen={isOpen}
                    onClick={() => handleDocumentClick(item.title, item.summary)} 
                    style={isOpen ? { width: '207px' } : { width: '0%'}}
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
            <SearchButton onClick={handleSearch} disabled={isFetching}
            >
                {isFetching ? 'Searching...' : 'Search'}
                <SearchIcon style={{marginLeft:"5px"}}/>
            </SearchButton>

            <SearchButton onClick={handleSaveConversation} disabled={isFetching2}>
                {isFetching2 ? 'Saving...' : 'Save'}
                <SaveAltIcon style={{marginLeft:"5px"}}/>
            </SearchButton>

            <SearchButton onClick={handleHelpMenuOpen}>
                Help
                <HelpOutlineOutlinedIcon style={{marginLeft:"5px"}}/>
            </SearchButton>
            <HelpMenu open={helpMenuOpen} onClose={handleHelpMenuClose} />
          </SearchContainer>

          <DocumentContainer>
            {selectedSummary.split('\n').map((part, index) => (
              <React.Fragment key={index}>
                <p key={index} style={{ textIndent: '2em', marginLeft: "3px" }}>{part}</p> 
              </React.Fragment>
            ))}
          </DocumentContainer>

          <ContentContainer ref={contentRef}>
      {conversation && conversation.length > 0 ? (
        conversation.map((message, index) => (
          <AiContainer key={index}>
            {message.type === 'AI' ? (
              <>
                <AiMessageContainer>
                  <AiIconContainer>
                    <img src={AI_Icon2} alt="AI Icon" />
                  </AiIconContainer>
                  <MessageBox position='left' title='WikiDialog' type='text' text={message.text} />
                </AiMessageContainer>
                {renderRelevantQuestions(questions)}
              </>
            ) : (
              <UserContainer>
                <MessageBox position="right" title={username} type="text" text={message.text} />
                <UserIconContainer>
                  <img src={UserIcon} alt="User Icon" />
                </UserIconContainer>
              </UserContainer>
            )}
          </AiContainer>
        ))
      ) : (
        <AiContainer>
          <AiMessageContainer>
            <AiIconContainer>
              <img src={AI_Icon2} alt="AI Icon" />
            </AiIconContainer>
            <MessageBox
              position='left'
              title='WikiDialog'
              type='text'
              text={selectedTitle ? `Hi, I'm your automated assistant. I can answer your questions about ${selectedTitle}.` : `Hi! Start a new conversation by searching for a Wikipedia document title! See "Help Menu" for more details!`}
            />
          </AiMessageContainer>
          {renderRelevantQuestions(questions)}
        </AiContainer>
      )}
    </ContentContainer>

          <FixedSearchContainer>
            <InputChatContainer>
              <InputChat 
                placeholder="Ask a question..."
                value={userInput}
                onChange={handleInputChange}
              />
              <SearchIconContainer onClick={handleQuestionSubmit}>
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