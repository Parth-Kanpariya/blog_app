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
if (localStorage.token && localStorage.userId) {
  SetAuthToken(localStorage.token);
  // console.log(localStorage.userId)
}
function App() {
  return (
    <div className="App">
      {' '}
      {/* <img src={logo} className="App-logo" alt="logo" /> */} <Header />
      <Routes>
        {' '}
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/profile" element={<Profile />}>
            <Route index element={<BlogList id="myBlogs" />} />{' '}
            <Route path="/profile/following" element={<Following />} />
            <Route path="/profile/create" element={<CreateBlog />} />
            <Route path="/profile/edit" element={<EditProfile />} />
          </Route>
        </Route>
        <Route path="/register" element={<Register />} />{' '}
        <Route path="/login" element={<Login />} />{' '}
      </Routes>{' '}
    </div>
  );
}

export default App;
