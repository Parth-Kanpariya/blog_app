import './App.css';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './helper/PrivateRoutes';
import Home from './pages/Home';
import Blog from './component/Blog';
import Header from './component/header';
import Login from './pages/Login';
import Register from './pages/SignUp';
import Profile from './pages/Profile';
import BlogList from './component/BlogList';
import Following from './component/Following';
import CreateBlog from './component/CreateBlog';
import SetAuthToken from './helper/SetAuthToken';
import EditProfile from './pages/EditProfile';
import { useState } from 'react';

import { useEffect } from 'react';
import EditBlog from './pages/EditBlog';
if (localStorage.token && localStorage.userId) {
  SetAuthToken(localStorage.token);
  // console.log(localStorage.userId)
}
function App() {
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearch(query) {
    setSearchQuery(query);
  }
  return (
    <div className="App">
      <Header onSearch={handleSearch} />
      <Routes>
        {' '}
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/profile" element={<Profile />}>
            <Route index element={<EditProfile />} />
            <Route path="/profile/myBlogs" element={<BlogList id="myBlogs" />} />{' '}
            <Route path="/profile/following" element={<Following />} />
            <Route path="/profile/create" element={<CreateBlog />} />
            <Route path="/profile/editblog" element={<EditBlog />} />
          </Route>
        </Route>
        <Route path="/register" element={<Register />} />{' '}
        <Route path="/login" element={<Login />} />{' '}
      </Routes>{' '}
    </div>
  );
}

export default App;
