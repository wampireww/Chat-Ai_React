import React, { useState } from 'react'
import SelectAllIcon from '@mui/icons-material/SelectAll';
import '../css/login.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { _Girisyap } from '../server/Firebaseislemleri';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


const Login=()=> {

  const [Username,setusername]=useState("");
  const [Password,setpassword]=useState("");

  const navigate=useNavigate();

  const [searchParams] = useSearchParams();


  const Girisyap=()=>{
        if(Username!="" && Password!=""){
          _Girisyap(Username,Password,navigate)
        }
        else{

        }
  }

  
  return (
    <div className='login'>
        <div className='login-1'>
            <span className='login-1-1'>
            <SelectAllIcon style={{color:"#039BE5",fontSize:45,marginLeft:5}}/>
        <h4 style={{color:"#333333",fontSize:28,marginTop:5,fontWeight:600,marginRight:5,marginLeft:2}}>Chat With </h4>
        <h4 style={{paddingLeft:5,paddingRight:5,backgroundColor:"#039BE5",color:"#333333",fontSize:28,marginTop:5,fontWeight:600,marginRight:5,marginLeft:0}}> AI</h4>
        <h4 style={{color:"#333333",fontSize:20,marginTop:15,fontWeight:600,marginRight:15,marginLeft:0}}>v1.0 </h4>     
            </span>
            <hr className='login-hr'></hr>
          <span className='login-1-2' >
          <TextField
       
       defaultValue={""}
       multiline={false}
       value={Username}
       onChange={(text)=>setusername(text.target.value)}
       style={{width:"100%",backgroundColor:"#FAFAFA",fontSize:14,height:"auto",marginTop:10}}
       inputProps={{ style: {fontSize:15,color: '#333333',maxHeight:17} }}
         placeholder='Kullanıcı Adı'
           id="outlined-size-small"
           size="small"
           color="primary"
         />
            <TextField
       
       defaultValue={""}
       multiline={false}
       value={Password}
       onChange={(text)=>setpassword(text.target.value)}
       style={{width:"100%",backgroundColor:"#FAFAFA",fontSize:14,height:"auto",marginTop:15}}
       inputProps={{ style: {fontSize:15,color: '#333333',maxHeight:17} }}
         placeholder='Şifre'
           id="outlined-size-small"
           size="small"
           color="primary"
         />
          </span>
          <span className='login-1-3'>
          <Button onClick={()=>Girisyap()} style={{marginTop:15,textTransform:"none"}} variant="contained">Giriş Yap</Button>
          </span>
          {searchParams.get("giris") == "basarisiz" && 
          <span className='login-1-4'>
          <ErrorOutlineIcon style={{color:"red",marginRight:5,fontSize:23}}/>
          <h4 style={{textAlign:"center",color:"red",fontSize:15,marginTop:5,fontWeight:"400",marginBottom:5}}>Kullanıcı Adı Veya Şifreniz Hatalı !</h4>
          </span>
}
        <span className='login-1-5'>
          <PhoneAndroidIcon style={{color:"#C5E1A5",marginRight:5,fontSize:23}}/>
          <h4 style={{textAlign:"center",color:"#C5E1A5",fontSize:15,marginTop:3,fontWeight:"400",marginBottom:3}}>Android APK İndir </h4>
          </span>
        </div>
    </div>
  )
}

export default Login