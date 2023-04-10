import React from 'react';
// import TodoList from '../component/TodoList';
import { useNavigate } from 'react-router-dom';
import Button from '../component/Button';
import BlogList from '../component/BlogList';

function Home() {
  const navigate = useNavigate();
  const handleLogOutClick = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login', { replace: true });
  };
  return (
    <div>
      {' '}
      {/* <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      width: '100%',
                      padding: '10px'
                    }}>
                    <h2 style={{ marginLeft: '10%' }}> Todo App </h2>{' '}
                    {
                      <Button
                        text="LogOut"
                        style={{ width: '100px', backgroundColor: 'red' }}
                        onClick={handleLogOutClick}
                      />
                    }{' '}
                  </div>{' '} */}{' '}
      {/*<TodoList />*/} <BlogList />
    </div>
  );
}

export default Home;
