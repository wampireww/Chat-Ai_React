import React, { useState } from 'react'
import SelectAllIcon from '@mui/icons-material/SelectAll';
import '../css/sidebar.css';
import Button from '@mui/material/Button';
import DataSaverOnOutlinedIcon from '@mui/icons-material/DataSaverOnOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoveUpOutlinedIcon from '@mui/icons-material/MoveUpOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import { useEffect } from 'react';
import { _Basliklistele } from '../server/Firebaseislemleri';
import CircularProgress from '@mui/material/CircularProgress';
import StarsIcon from '@mui/icons-material/Stars';
import Modal from './Modal';


const Sidebar=()=> {

  const navigate=useNavigate();
  const[Arama,setarama]=useState("");
  const[Baslikliste,setbaslikliste]=useState([]);
  const[Progress,setprogress]=useState(false);

  var { id } = useParams();


  useEffect(()=>{

    _Basliklistele(setbaslikliste,Arama,setprogress)
   
  },[Arama])

  const Degis=(gelen)=>{
    navigate("/home/"+gelen);
    window.location.reload();
  }

  const yenisohbet=()=>{
    navigate("/home/newchat");
    window.location.reload();
  }

  return (
    <div className='sidebar'>
        <div className='yenibuton'>
        <Button onClick={()=>yenisohbet()} style={{height:35,marginLeft:0,width:"90%",textTransform: 'none',fontSize:14,color:"#607D8B",borderColor:"#039BE5",borderWidth:1}} color="primary" variant="outlined" startIcon={<DataSaverOnOutlinedIcon style={{color:"039BE5",fontSize:25}} />}>
       <h4 style={{textAlign:"center",marginTop:8,fontSize:14,fontWeight:"500",color:"#039BE5"}}>Yeni Sohbet Başlat</h4>
      </Button>
      <hr className='sidebar-hr1'></hr>
        </div>
        <div className='arama'>
        <TextField
value={Arama}
onChange={(text)=>setarama(text.target.value)}
style={{width:"100%",borderRadius:20,marginRight:5}}
inputProps={{ style: {fontSize:14,color: '#333333',height:15,borderRadius:20 } }}
  placeholder='Aramak için başlık giriniz.'
    id="outlined-size-small"
    size="small"  
    color="primary"
  />
  
  <SearchOutlinedIcon style={{fontSize:25,color:"#388E3C",marginLeft:-30}} />
        </div>
        <hr className='sidebararama-hr1'></hr>
        <ul className='sidebar-ul' >
          {Progress==true ? <li className='sidebar-li'>
            <span style={{alignItems:"center",display:"flex",flexDirection:"column",justifyContent:"center"}}> <CircularProgress size={30} />
            </span>
            </li> : Baslikliste.length==0 ? <li >
              <span style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>
              <h4 className='soru' style={{fontSize:13,color:"#333333",marginLeft:5,marginTop:0}}>- Kayıtlı bir Sohbet Bulunamadı !</h4>
                </span>
                </li> :
              Baslikliste.map((item)=>
                  <li key={item.baslikdid} className='sidebar-li'>
                  <span style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>
                  <span style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:0,width:"100%"}}>
                  <h4 onClick={()=>Degis(item.baslikdid)} className='soru' style={{fontSize:13,color:"#333333",marginLeft:5,marginTop:0}}>{item.Baslikismi}</h4>
                  {item.Yildiz &&
                    <span style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:0}}>
                    <StarsIcon style={{color:"#F57C00",fontSize:20,marginBottom:8,marginLeft:2}}/>
                    </span>
                     }
                    <h4 style={{borderRadius:5,padding:3,paddingInline:5,backgroundColor:"#BDBDBD",fontSize:12,color:"#333333",marginLeft:2}}>{item.kayittarihi}</h4>
                    <Modal params={id} id={item.baslikdid} baslik={item.Baslikismi} govde={"isimli başlığı silmek istediğinizden emin misiniz ?"} amac={"sidebarsil"}/>
                    <h4 style={{width:20,textAlign:"end",borderRadius:5,padding:3,fontSize:13,color:"#333333",marginLeft:0,marginRight:6}}>({item.Sohbetdeger})</h4>
                    </span>
                    </span>
                    <hr className='sidebar-hr'></hr>
                  </li>

                 
                 )}
                
            </ul>
            
    </div>
  )
}

export default Sidebar