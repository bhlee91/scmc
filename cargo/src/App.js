import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "src/utils/ProtectedRoute";
import Customer from "src/components/Customer";
import UseList from "src/components/UseList";
import Camera from "src/components/Camera";
import ShipSize from "src/components/ShipSize";
import DateTime from "src/components/DateTime";
import Address from "src/components/Address";
import LoadUnload from "src/components/LoadUnload";
import RequestItem from "src/components/RequestItem";
import TransTerms from "src/components/TransTerms";
import UseTerms from "src/components/UseTerms";
import PersonalPolicy from "src/components/PersonalPolicy";
import LogIn from "src/components/LogIn";
import MemberReg from "src/components/MemberReg";

import Main from "src/main";
import "src/App.css";
import ShipperRequire from "src/components/ShipperRequire";
import NaverLogin from "src/components/social/NaverLogin";
import KaKaoLogin from "src/components/social/KaKaoLogin";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Customer" element={<Customer />} />
        <Route path="/Camera" element={<Camera />} />
        <Route path="/ShipSize" element={<ShipSize />} />
        <Route path="/DateTime" element={<DateTime />} />
        <Route path="/Address" element={<Address />} />
        <Route path="/LoadUnload" element={<LoadUnload />} />
        <Route path="/RequestItem" element={<RequestItem />} />
        <Route path="/TransTerms" element={<TransTerms />} />
        <Route path="/UseTerms" element={<UseTerms />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/ShipperRequire" element={<ShipperRequire />} />
          <Route path="/UseList" element={<UseList />} />
        </Route>
        <Route path="/PersonalPolicy" element={<PersonalPolicy />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/LogIn/nid" element={<NaverLogin />} />
        <Route path="/LogIn/kid" element={<KaKaoLogin />} />
        <Route path="/MemberReg" element={<MemberReg />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
