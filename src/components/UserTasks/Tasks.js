import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "./TaskList";
import LongMenu from "./menu";
import Navbar from "../../Navbar";
import { CiSearch } from "react-icons/ci";
import "./Tasks.css";

import { ThreeDots } from 'react-loader-spinner'
import { IoClose } from "react-icons/io5";

const statusConstants = {
  initial:"INITIAL",
  success:"SUCCESS",
  failure:"FAIlure",
  inProgress:"in-progress"
}


const statusColors = { Pending: "#FFA500","In Progress": "#1E90FF", Completed: "#32CD32"};
const priorityColors = { Low: "#ADD8E6",Medium: "#FFD700", High: "#FF4500" };
// const sample_data = [
//   {
//     "id": "3f5e8a63-7b9f-4b99-86f4-1d9a2e1634ae",
//     "TaskName": "Submit project report",
//     "Description": "Prepare and submit the final project report.",
//     "DueDate": "2024-12-30",
//     "Status": "Pending",
//     "Priority": "High"
//   },
//   {
//     "id": "d9cfdc98-5e12-44d9-83de-2e3d9a48f5ea",
//     "TaskName": "Team meeting",
//     "Description": "Weekly sync-up with the team.",
//     "DueDate": "2024-12-27",
//     "Status": "In Progress",
//     "Priority": "Medium"
//   },
//   {
//     "id": "b1b3b8e4-1e78-4c89-bc9d-67fc72dfbc8e",
//     "TaskName": "Code review",
//     "Description": "Review the codebase for the new feature.",
//     "DueDate": "2024-12-28",
//     "Status": "Pending",
//     "Priority": "High"
//   },
// ]

const Tasks = () => {
  
  const [tasks, setTasks] = useState([]);
  const [apiStatus,setApiStatus] = useState(statusConstants.initial)
  const [isTrigger,setTrigger] = useState(false)
  const [editingTask,setEditingTask] = useState({id:'',TaskName:'',Description:'',DueDate:'',Status:'',Priority:''})
  const [isDelete,setIsDelete] = useState(false)
  const [taskId,setTaskId] = useState('');
 
  const [searchInput,setSearchInput] = useState('')

 
 
  const fetchTasks = async () => {
    setApiStatus(statusConstants.inProgress)
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://robotspacebackend.onrender.com/tasks",
        {
          headers: { Authorization: token },
        }
      );
      
      setTasks(response.data.reverse());
      // console.log(response.data)
      setApiStatus(statusConstants.success)
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setApiStatus(statusConstants.failure)
    }
  };


  useEffect(() => {
    
    fetchTasks();
  }, []);

  const apiView = ()=>{
    switch(apiStatus){
      case statusConstants.success:
        return successView()
      case statusConstants.inProgress:
        return loadingView()
      default:
        return null
    }
  }
  

  const loadingView = ()=>{
    return (
      <div className="loading-container">
        <ThreeDots
      className ="dots"
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      />
      </div>
      
 
    )
  }

  const updateCheckbox = async (id)=>{
      
      const checkStatus = "Completed"
      
  const token = localStorage.getItem("token");
      try{
        await axios.put(
          `https://robotspacebackend.onrender.com/update/status/${id}`,{Status:checkStatus},
          {
            headers: { Authorization: token },
          }
          
        );
        setTasks(() =>(
          tasks.map(task=>{
            if(id === task.id){
              return {...task,Status:checkStatus}
            }
            return task
          })
    )) 
      }catch(err){
        console.error("Error fetching tasks:", err);
      }

      

  }

  const onSubmitForm = async (event)=>{
      event.preventDefault()
      
      const token = localStorage.getItem("token");
      try{
        await axios.put(
          `https://robotspacebackend.onrender.com/update/task/${editingTask.id}`,editingTask,
          {
            headers: { Authorization: token },
          }
          
        );
        alert("task updated")
        setTasks(() =>(
          tasks.map(task=>{
            if(editingTask.id === task.id){
              return editingTask
            }
            return task
          })
          
    )) 
    
      }catch(err){
        console.error("Error fetching tasks:", err);
      }
      setTrigger(false)
  }




  const editTask = (id)=>{
      setTrigger(true)
      const task = tasks.filter(task=>id === task.id);
      
      setEditingTask(task[0])
      
  }

  const deleteTask = async ()=>{
   
    setIsDelete(false)
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://robotspacebackend.onrender.com/tasks/delete/${taskId}`,
        {
          headers: { Authorization: token },
        }
      );
      setTasks(tasks.filter((task) => task.id !== taskId)); 
      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Failed to delete task", error.response.data);
      alert("Failed to delete task.");
    }
  }


  const handleDelete =  (id) => {
    
    setTaskId(id)
    setIsDelete(true)
    
  };


  const onClickEnter= async(event)=>{
      if(event.key === "Enter" && searchInput.length !== 0){
        const token = localStorage.getItem("token");
        try{
          const response = await axios.get(
            `https://robotspacebackend.onrender.com/tasks/search/${searchInput}`,
            {
              headers: { Authorization: token },
            }
            
          );
         
          setTasks(response.data)
         
     
        }catch(err){
          console.error("Error fetching tasks:", err);
        }
      }
  }

  const filterTasksMeth = async (val)=>{
   
      const Status = val;

      if(Status === "None"){
        fetchTasks()
      }else{
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `https://robotspacebackend.onrender.com/tasks/filter/${Status}`,
            {
              headers: { Authorization: token },
            }
          );
          setTasks(response.data); 
          
        } catch (error) {
          console.error("Failed to fetch tasks", error.response.data);
          alert("Failed to fetch task.");
        }
      }
      
      
  }

  

  const successView = ()=>{
   
    return (

    
      
      <div className="list-main-container">
      <Navbar />

       <div className="head-and-filter">
       <h1 className="task-heading">Task List</h1>
       <div className="search-container">
       <CiSearch />
       <input type="search" 
       className="search-input" 
       onChange={(e)=>{

        setSearchInput(e.target.value)
        if(!e.target.value.length) fetchTasks()
        }} 
       onKeyDown={onClickEnter}/>
       </div>
       
       <LongMenu filtersTasks={filterTasksMeth}/>
       </div>
       
       
        
        {isDelete && <div className="delete-conformation-container">
              <h1 className="modal-heading">Delete Task</h1>
              <p className="modal-para">Are you sure you want to delete</p>
              <div className="modal-buttons-container">

              <button type="button" onClick={()=>setIsDelete(false)} className="modal-buttons">Cancel</button>
              <button type="button" onClick={deleteTask} className="modal-buttons">Confirm</button>
              </div>

              
        </div>}
        {isTrigger && <form className="edit-task-form" onSubmit={onSubmitForm}>
              <div className="close-button-container">
                <button className="close-button" onClick={()=>setTrigger(false)}><IoClose size={18}/></button>
              </div>
              <h1 className="modal-heading">Update Task</h1>
              <input 
                className="edit-input"
                placeholder="username"
                value={editingTask.TaskName}
                onChange={(e) => setEditingTask({...editingTask,TaskName:e.target.value})}
                required
              />
            <textarea
              className="edit-area"
              placeholder="Description"
              value={editingTask.Description}
              onChange={(e) => setEditingTask({...editingTask,Description:e.target.value})}
            />
          
            <select className="edit-status" value={editingTask.Status} onChange={(e) => setEditingTask({...editingTask,Status:e.target.value})}>
              
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
              <option value="Completed">Completed</option>
            </select>
            <select className="edit-priority" value={editingTask.Priority} onChange={(e) => setEditingTask({...editingTask,Priority:e.target.value})}>
              
              <option value="Low">Low</option>
              <option value="Mediuam">Medium</option>
              <option value="High">High</option>
            </select>
            <button type="submit" className="submit-btn">Update</button>
        

        </form>}
        <ul className="list-container">
          {tasks.map((task) =>  (<TaskList tasks = {task}
            key = {task.id} 
            onChangeCheckbox = {updateCheckbox} 
            onDeleteTask={handleDelete} 
            onClickEdit = {editTask}
            colors = {{statusColors,priorityColors}}/>)
            
          )}
        </ul>
      </div>

    );
  }

  return (
    apiView()
  );
};

export default Tasks;
