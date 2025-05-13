import axios from '.axios';
import './App.css';
import { useState,useEffect } from 'react';

function App() {
  const [players,setPlayers]=useState([]);
  const [editing,setEditing]=useState(null);
  const getplayers=async()=>{
    try{
const res= await axios.get('http://localhost:6000/players')
setPlayers(res.data ||[])

    } catch(error){
      console.error("error in get players",error);
    }
  }
  useEffect(()=>{
    getplayers();
  },[]);

  const addingplayers=async(player)=>{
    try{
      const req= await axios.post('http://localhost:6000/players',player)
      addingplayers();

    }catch(error){
      console.error('post they have problem',error);
    }
  };

  const updateplayers=async(id,updatedPlayers)=>{
    try{
      const res= await axios.put(`http://locolhost:6000/players/${id}`,updatedPlayers)
      getplayers();
    }
  catch(error){
      console.error('post they have problem',error);
    }
  }
 
}

export default App;
