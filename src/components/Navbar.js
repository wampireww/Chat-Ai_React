import React from 'react'
import '../css/navbar.css'
import SelectAllIcon from '@mui/icons-material/SelectAll';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Navbar=()=> {

  const navigate=useNavigate();

  const Cikis=()=>{
    
    localStorage.setItem("login", "false");
    navigate("/");
  }


  useEffect(()=>{

    if(localStorage.getItem("login")=="true"){

    }
    else{
        navigate("/")
    }

},[])


  return (
    <div className='navbar'>
        <span onClick={()=>navigate("/home")} className='navbar-1'>
        <SelectAllIcon style={{color:"#039BE5",fontSize:32,marginLeft:5}}/>
        <h4 style={{color:"#333333",fontSize:19,marginTop:5,fontWeight:600,marginRight:5,marginLeft:0}}>Chat With </h4>
        <h4 style={{paddingLeft:5,paddingRight:5,backgroundColor:"#039BE5",color:"#333333",fontSize:19,marginTop:5,fontWeight:600,marginRight:5,marginLeft:0}}> AI</h4>
        <h4 style={{color:"#333333",fontSize:15,marginTop:10,fontWeight:600,marginRight:15,marginLeft:0}}>v1.0 </h4>

        </span>
        <span onClick={()=>Cikis()} className='navbar-2'>
        <ExitToAppRoundedIcon style={{borderRadius:50,padding:5,backgroundColor:"white",color:"red",fontSize:35}}/>
        </span>
    </div>
  )
}

export default Navbar