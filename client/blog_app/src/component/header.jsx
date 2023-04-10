import React, { useState, useEffect } from 'react';
import RoundImage from './RoundImage';
import logo from '../logo192.png';
import { Col, Row } from 'react-bootstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './header.css';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../services/authService';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const toggle = () => setIsOpen(!isOpen);
  const handleHideDropdown = () => setIsOpen(false);
  const hidden = 'hidden';
  const token = localStorage.token;
  const userId = localStorage.userId;
  const user = localStorage.user;

  useEffect(() => {
    if (token && userId && user) {
      setLogin(true);
    }
    const fetchUser = async () => {
      const user = await getUser();
      if (user.status === 200) {
        setUserData(user.data.data.data);
      }
    };
    fetchUser();
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
    navigate('/');
  };
  console.log(user);

  return (
    <Row
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: '2rem',
        marginRight: '2rem'
      }}>
      <Col>
        <img
          src={logo}
          className="App-logo"
          style={{ marginTop: '1rem', cursor: 'pointer' }}
          alt="logo"
          onClick={handleLogoClick}
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
            <RoundImage img={user.profile_image} />
            <h3 className="profile-username">{JSON.parse(localStorage.user)?.email}</h3>
          </DropdownToggle>{' '}
          {isOpen === true && (
            <DropdownMenu end className="profile-menu">
              <DropdownItem className="dropdown-item" onClick={handleProfileClick}>
                {' '}
                Profile{' '}
              </DropdownItem>{' '}
              {/* <DropdownItem> Settings </DropdownItem>{' '} */}{' '}
              <DropdownItem className="dropdown-item" divider onClick={handleProfileClick} />{' '}
              <DropdownItem className="dropdown-item" onClick={handleLogOutClick}>
                {' '}
                Sign out{' '}
              </DropdownItem>{' '}
            </DropdownMenu>
          )}{' '}
        </Dropdown>
      )}{' '}
    </Row>
  );
}
//    /* (
//                         <Col style={{ marginTop: '2.4rem', cursor: 'pointer   ' }}>
//                           <RoundImage />{' '}
//                         </Col>
//                       )
export default Header;
