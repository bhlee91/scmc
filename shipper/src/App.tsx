import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customer from "./components/Customer";
import UseList from "./components/UseList";
import Camera from "./components/Camera";
import ShipSize from "./components/ShipSize";
import DateTime from "./components/DateTime";
import Address from "./components/Address";
import LoadUnload from "./components/LoadUnload";
import RequestItem from "./components/RequestItem";
import TransTerms from "./components/TransTerms";
import UseTerms from "./components/UseTerms";
import PersonalPolicy from "./components/PersonalPolicy";
import LogIn from "./components/LogIn";
import MemberReg from "./components/MemberReg";

import Main from "./main";
import "./App.css";
import ShipperRequire from "./components/ShipperRequire";
import NaverLogin from "./components/NaverLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/ShipperRequire" element={<ShipperRequire />} />
        <Route path="/UseList" element={<UseList />} />
        <Route path="/Customer" element={<Customer />} />
        <Route path="/Camera" element={<Camera />} />
        <Route path="/ShipSize" element={<ShipSize />} />
        <Route path="/DateTime" element={<DateTime />} />
        <Route path="/Address" element={<Address />} />
        <Route path="/LoadUnload" element={<LoadUnload />} />
        <Route path="/RequestItem" element={<RequestItem />} />
        <Route path="/TransTerms" element={<TransTerms />} />
        <Route path="/UseTerms" element={<UseTerms />} />
        <Route path="/PersonalPolicy" element={<PersonalPolicy />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/LogIn/nid" element={<NaverLogin />} />
        <Route path="/MemberReg" element={<MemberReg />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
