import logo from './logo192.png';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './helper/PrivateRoutes';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <Routes>
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route />
        <Route />
      </Routes>
    </div>
  );
}

export default App;
