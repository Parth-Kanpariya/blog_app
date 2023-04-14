import './App.css';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './helper/PrivateRoutes';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Header from './component/header';
import Login from './pages/Login';
import Register from './pages/SignUp';
import Profile from './pages/Profile';
import BlogList from './component/BlogList';
import Following from './pages/Following';
import CreateBlog from './pages/CreateBlog';
import SetAuthToken from './helper/SetAuthToken';
import EditProfile from './pages/EditProfile';
import { useState } from 'react';
import EditBlog from './pages/EditBlog';
import BlogsOfFollowing from './pages/BlogsOfFollowing';
import VerifyUser from './pages/VerifyUser';
import FavoriteBlogs from './pages/FavoritBlogs';

if (localStorage.token && localStorage.userId) {
  SetAuthToken(localStorage.token);
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
          <Route path="/blog/:id" element={<Blog onSearch={handleSearch} />} />
          <Route path="/profile" element={<Profile />}>
            <Route index element={<EditProfile />} />
            <Route path="/profile/myBlogs" element={<BlogList id="myBlogs" />} />{' '}
            <Route path="/profile/following" element={<Following />} />
            <Route path="/profile/favorits" element={<FavoriteBlogs />} />
            <Route path="/profile/create" element={<CreateBlog />} />
            <Route path="/profile/editblog" element={<EditBlog />} />
          </Route>
          <Route path="blogs/:id" element={<BlogsOfFollowing />} />
        </Route>
        <Route path="/verifyUser" element={<VerifyUser />} />
        <Route path="/register" element={<Register />} />{' '}
        <Route path="/login" element={<Login />} />{' '}
      </Routes>{' '}
    </div>
  );
}

export default App;
