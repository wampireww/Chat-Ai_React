import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Chat from '../pages/Chat'
import Nopage from '../pages/Nopage'
import Sticky from './Sticky'
import Chatid from '../pages/Chatid'

const Root=()=> {
  return (
    <div>
            <Routes>
            <Route path='*' element={<Nopage/>} />
            <Route path='/' element={<Login/>}/>
            <Route path='/home' element={<Sticky/>}>
            <Route index element={<Home/>}/>
            <Route path='newchat' element={<Chat/>}/>
            <Route path=':id' element={<Chatid/>}/>  
            </Route>
            </Routes>
    </div>
  )
}

export default Root