import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import '../css/mainpage.css';
import '../css/home.css';
import Footer from '../components/Footer';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import FlareOutlinedIcon from '@mui/icons-material/FlareOutlined';
import { Outlet } from 'react-router-dom';

const Home=()=> {

  return (
    <div className='mainpage'>
 
  <div className='mainpage-main'>
  <div className='mainpage-main-1'>
    <h4 style={{marginTop:-60,backgroundColor:"#CFD8DC",borderRadius:5,padding:10,fontSize:16,color:"#333333",marginLeft:8,padding:16}}>Chat With AI v1.0 a Hoşgeldiniz.</h4>
      </div>
</div>

                 
    </div>
  ) 
}

export default Home