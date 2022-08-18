import React, { useState, useEffect } from "react";
import {  Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./componenta/Navbar";
import Savdo from "./componenta/Savdo/savdo";
import Savatcha from "./componenta/Savatcha";
import Maxsulot from "./componenta/Maxsulotlar";
import Edit from "./componenta/Maxsulotlar/EditPro";
import Add from "./componenta/Maxsulotlar/AddPro";
import Tanlangan from "./componenta/Savdo/tanlangan_maxsulot/index";
import Sotilgan from "./componenta/Maxsulotlar/Sotilgan";
import Home from "./Tekshirish";
import Login from "./LoginPage/input";

function App() {
  const [temp, setTemp] = useState(true);
  const [user2,setUser2] = useState();

  const [user,setUser] = useState('')

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("MyUser")))
  }, [])

  const updateUser =(user) => {
    localStorage.setItem("MyUser", JSON.stringify(user))
    setUser(user)
  }

  return (
    <>
      <div className="App">
      <Navbar user={user}/>
        <br />
          <Routes>
            <Route path="/" element={
            user ? <Home updateUser={updateUser} /> : <Login updateUser={updateUser} setUser2={setUser2}/>
            } />
            <Route path="savdo" element={<Savdo setTemp={setTemp} />} />
            <Route path="tanlangan" element={<Tanlangan setTemp={setTemp} />} />
            <Route path="savatcha" element={<Savatcha setTemp={setTemp} />} />
            <Route path="maxsulotlar" element={<Maxsulot temp={temp} setTemp={setTemp} />}/>
            <Route path="edit" element={<Edit setTemp={setTemp} />} />
            <Route path="added" element={<Add setTemp={setTemp} />} />
            <Route path="sotilganmaxsulotlar" element={<Sotilgan temp={temp} setTemp={setTemp} />} />
            <Route path="login" element={<Login updateUser={updateUser} setUser2={setUser2}/>} />
          </Routes>
      </div>
    </>
  );
}

export default App;

