import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "../pages/Login"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"
import CreateCase from "../pages/CreateCase"
import CaseDetails from "../pages/CaseDetails"
import AddUpdate from "../pages/AddUpdate"
import UploadEvidence from "../pages/UploadEvidence"
// App.jsx ya router mein
import CaseTracker from "../pages/CaseTracker";

// Route add kar


function AppRoutes(){

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/create-case" element={<CreateCase />} />

        <Route path="/case/:id" element={<CaseDetails />} />

        <Route path="/case/:id/update" element={<AddUpdate />} />

        <Route path="/case/:id/evidence" element={<UploadEvidence />} />

         <Route path="/track" element={<CaseTracker />} />
      </Routes>

    </BrowserRouter>

  )

}

export default AppRoutes