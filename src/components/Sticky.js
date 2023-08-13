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

const Sticky=()=> {

  return (
    <div className='mainpage'>
    <Navbar/>
  <div className='mainpage-main'>
    <Sidebar/>
    <div className='mainpage-main-1'>
    <Outlet/>
    </div>
    
</div>

                 
    </div>
  ) 
}

export default Sticky