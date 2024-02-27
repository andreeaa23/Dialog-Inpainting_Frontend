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
  align-items: right;
  /* justify-content: flex-end; */
  margin-left: 800px;
  color: #e7ecef;
  font-size: 17px;
  margin-right: 10;
  font-weight: bold;
  cursor: pointer;

  @media screen and (max-width: 880px) {
    margin-left: 80px;
  }

  @media screen and (min-width: 880px) {
    margin-left: 730px;
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
  font-weight: bold;
  border: 0.1px solid #9BBEC8;
 

  &:hover {
    transform: translateY(-2px);
    background-color: #d32f2f;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    font-weight: bold;
  }

`;

const LogOutIcon = styled(LogoutIcon)`
  margin-right: 10px;
`;

const InputContainer = styled.div`
  position: relative;
  z-index: 20;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 10px;
  width: 300px;
  font-size: 18px;
  color: white;
  background-color: rgba(255, 255, 255, 0.2);

  &:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const SearchIconContainer = styled(SearchIcon)`
  position: absolute;
  top: 50%;
  left: -25px;
  transform: translateY(-50%);
  color: #fff;
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


const Navbar = () => {

    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isFetching, setIsFetching] = useState(false); 
    const [searchResults, setSearchResults] = useState([]);

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

  const handleSearch = async (e) => {
    if (!searchQuery) {
        toast.error("Please fill the search field!");
        return;
    }
    e.preventDefault();
    setIsFetching(true);

    console.log(searchQuery);
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
        <Container>
          <Wrapper>
            {/* <Left> */}

                {/* <SearchIcon />
                <Input placeholder="Search a title..."
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchButton onClick={handleSearch} disabled={isFetching}>
                    {isFetching ? 'Searching...' : 'Search'}
                </SearchButton> */}
                
            {/* </Left> */}

            <Right>
            <LogOutButton onClick={handleLogout}>
                <LogOutIcon icon={LogoutIcon}/>
                    Log Out
                </LogOutButton>      
            </Right>
          </Wrapper>
          <ToastContainer/>
        </Container>
      );
    
}

export default Navbar