

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Tasks from "./components/UserTasks/Tasks";

import TaskForm from "./components/UserTasks/TaskForm";




const App = () => {
  
  
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tasks" element={<Tasks/>} />
        <Route path="/newtask" element={<TaskForm />} />
        
      </Routes>
    </Router>
  );
};

export default App;
