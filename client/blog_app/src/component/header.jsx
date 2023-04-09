import React, { useState } from 'react';
import RoundImage from './RoundImage';
import logo from '../logo192.png';
import { Col, Collapse, Row } from 'react-bootstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { flatMap } from 'lodash';
import './header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggle = () => setIsOpen(!isOpen);
  const handleHideDropdown = () => setIsOpen(false);
  const login = true;
  const hidden = 'hidden';
  const handleLogOutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

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
            dataToggle="dropdown"
            ariaExpanded={isOpen}
            className="profile-toggle">
            <RoundImage />
            <h3 className="profile-username"> Parth </h3>{' '}
          </DropdownToggle>{' '}
          {isOpen === true && (
            <DropdownMenu right className="profile-menu">
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
