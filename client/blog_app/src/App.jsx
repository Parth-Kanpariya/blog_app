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

function App() {
  return (
    <div className="App">
      {' '}
      {/* <img src={logo} className="App-logo" alt="logo" /> */} <Header />
      <Routes>
        {' '}
        {/* <Route path="/" element={<PrivateRoutes />}> */} <Route path="/" element={<Home />} />{' '}
        {/* </Route> */} <Route />
        <Route path="/blog" element={<Blog />} /> <Route />
        <Route path="/register" element={<Register />} />{' '}
        <Route path="/login" element={<Login />} />{' '}
        <Route path="/profile" element={<Profile />}>
          <Route index element={<BlogList />} />{' '}
          <Route path="/profile/following" element={<Following />}>
            {' '}
          </Route>{' '}
        </Route>{' '}
      </Routes>{' '}
    </div>
  );
}

export default App;
