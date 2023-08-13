import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import LinearProgress from '@mui/material/LinearProgress';
import { sendMessageToChatGPT } from '../server/Apicalls';

import '../css/footer.css'

const Footer=({setsohbet,Sohbet,setChatHistory,chatHistory})=> {

    const[Mesaj,setmesaj]=useState("");
    const[Platform,setplatform]=useState("ChatGPT");
    const[Kontrol,setkontrol]=useState(false)
    const[Textkontrol,settextkontrol]=useState(false)
    const shortid = require('shortid');

    const [isRunning, setIsRunning] = useState(false);


    const[Pcgbt,setpcgbt]=useState(false)
    const[Pyc,setpyc]=useState(false)
    const[Pycs,setpcs]=useState(false)

    useEffect(()=>{

      setkontrol(false)

        if(Kontrol==true){
          Sohbet.map(item=>{
            if(item.platform=="ChatGPT"){
              setpyc(true);
              setpcs(true);
            }
          })
        }


    },[Kontrol])


    const saniyebekle = () => {
      if (!isRunning) {
        setIsRunning(true);
        performAction();
      }
    };
  
    const performAction = () => {
       Mesajekle();
     
      setTimeout(() => {
        
        setIsRunning(false);
      }, 1000);
    };


    const Mesajekle=(e)=>{
        if(Platform==""){
            setplatform("");
        }
        else{
          if(Mesaj==""){
              setmesaj("");
          }
          else{
            const zaman=new Date();

              if(Platform=="ChatGPT"){
                setsohbet(old=>[...old,{platform:Platform,mesaj:Mesaj,tarih:zaman.getTime(),gonderen:"admin",id:shortid.generate(),durum:"array"}]);
                setkontrol(true);    
                sendMessageToChatGPT(Mesaj,setsohbet,settextkontrol,chatHistory);
                setChatHistory(prevHistory =>[...prevHistory, { role: 'user', content: Mesaj }]);  
              }
              else if(Platform=="Notdefteri"){
                setsohbet(old=>[...old,{platform:Platform,mesaj:Mesaj,tarih:zaman.getTime(),gonderen:"admin",id:shortid.generate(),durum:"array"}]);
                setkontrol(true);
                setChatHistory(prevHistory =>[...prevHistory, { role: 'user', content: "" }]);  

              }
              
            setmesaj("");
          }  
        }
    }

    

  return (
    <div className='footer'>
          {Textkontrol==true && <div style={{marginBottom:30,marginTop:-15}}> <LinearProgress/> </div>}
        <div className='chat'>
            <span className='chat-1'>
            <h4 style={{fontSize:13,color:"#FAFAFA",marginLeft:-5,marginRight:5,marginTop:4}}>Platform Seçiniz :</h4>
              
            <Select
          
         defaultValue={"ChatGPT"}
        size='small'
        style={{width:150,height:25,fontSize:13,color:"333333",backgroundColor:"#FAFAFA"}}
        labelId="demo-select-small"
        id="demo-select-small"
        value={Platform}
        onChange={(e)=>setplatform(e.target.value)}
        >
        <MenuItem disabled={Pcgbt} style={{fontSize:13}} value={"ChatGPT"}>ChatGPT</MenuItem>
        <MenuItem style={{fontSize:13}}  value={"Notdefteri"}>Not Defteri</MenuItem>
        </Select>
            </span>
       <span className='chat-2'>
       <TextField
        onKeyDown={(e)=>{if(e.key=="Enter"){
          saniyebekle();
            e.preventDefault();
        }}}
      defaultValue={""}
      multiline={true}
      disabled={Textkontrol}
      maxRows={20}
      value={Mesaj}
      onChange={(text)=>setmesaj(text.target.value)}
      style={{width:"100%",backgroundColor:"#FAFAFA",fontSize:14,height:"auto"}}
      inputProps={{ style: {fontSize:15,color: '#333333',minHeight:"15px"} }}
        placeholder='Bir metin girin'
          id="outlined-size-small"
          size="small"
          color="primary"
        />
        <span onClick={()=>saniyebekle()}>
        <NearMeOutlinedIcon className='sendbutton' style={{borderRadius:10,padding:3,backgroundColor:"#039BE5",marginLeft:5,fontSize:34,color:"#1B5E20"}} />
        </span>
       </span>
      
        </div>
        
    </div>
  )
}

export default Footer