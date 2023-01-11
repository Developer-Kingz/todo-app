import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage/LoginPage';
import MyApp from './components/MyApp';
import Signup from './components/signup/Signup';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path='my-app' element={<MyApp/>}/>
        <Route path='/' element={<Signup/>}/>
        <Route path='login' element={<LoginPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
