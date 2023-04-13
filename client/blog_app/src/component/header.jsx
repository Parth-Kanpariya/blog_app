/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import RoundImage from './RoundImage';
import logo from '../logo192.png';
import { Col, Row } from 'react-bootstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './header.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../redux/actions';

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const toggle = () => setIsOpen(!isOpen);
  const token = localStorage.token;
  const userId = localStorage.userId;

  useEffect(() => {
    if (token && userId) {
      setLogin(true);
    }

    dispatch(fetchUser());
  }, [token]);

  const handleLogOutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    setLogin(false);
    navigate('/login');
  };
  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogoClick = () => {
    props.onSearch('');
    navigate('/');
  };
  const handleInputSubmit = (e) => {
    if (e.keyCode === 13) {
      props.onSearch(searchInput);
      navigate('/');
    }
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <Row className="header-container">
        <Col>
          <Row className="logo-container" onClick={handleLogoClick}>
            <img src={logo} className="App-logo" alt="logo" />{' '}
            <Col>
              <h1>Excellent</h1>
            </Col>
          </Row>
        </Col>
        <Col>
          <input
            type="text"
            placeholder="Search Blogs"
            value={searchInput}
            onKeyDown={handleInputSubmit}
            onChange={handleInputChange}
          />{' '}
        </Col>{' '}
        {login && (
          <Dropdown isOpen={isOpen} toggle={toggle} className="profile-dropdown">
            <DropdownToggle
              tag="div"
              onClick={toggle}
              data-toggle="dropdown"
              aria-expanded={isOpen}
              className="profile-toggle">
              <RoundImage img={userData.user?.profile_image} />
              <h3 className="profile-username">{userData.user?.firstname}</h3>
            </DropdownToggle>{' '}
            {isOpen === true && (
              <DropdownMenu end className="profile-menu">
                <DropdownItem className="dropdown-item"> {userData.user?.firstname}</DropdownItem>{' '}
                <DropdownItem className="dropdown-item" onClick={handleProfileClick}>
                  {' '}
                  Profile{' '}
                </DropdownItem>{' '}
                <DropdownItem className="dropdown-item" onClick={handleLogOutClick}>
                  {' '}
                  Sign out{' '}
                </DropdownItem>{' '}
              </DropdownMenu>
            )}{' '}
          </Dropdown>
        )}{' '}
      </Row>
      <hr style={{ color: '#F2F3F5' }} />
    </div>
  );
}
export default Header;
