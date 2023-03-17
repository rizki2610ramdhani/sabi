import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { API, setAuthToken } from './config/api';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/userContext';

import Navigation from './components/Navigation';

import LandingPage from './pages/LandingPage';
import ProductDetail from './pages/ProductDetail';
import ProductEdit from './pages/ProductEdit';
import ProductCreate from './pages/ProductCreate';
import ListProduct from './pages/ListProduct';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      console.log("check user success : ", response)
      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
      setIsLoading(false)
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: 'AUTH_ERROR',
      });
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false)
    }
  }, []);

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate('/');
      }
    }
  }, [isLoading]);

  return (
    <>
    <Navigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/product-edit/:id" element={<ProductEdit />} />
        <Route path="/product-create" element={<ProductCreate />} />
        <Route path="/list-product" element={<ListProduct />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile/:id" element={<EditProfile />} />
      </Routes>
    </>
  );

}

export default App;
