import React, { useEffect, useRef, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import ForwardIcon from '@mui/icons-material/Forward';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import TextField from '@mui/material/TextField';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { _Basliksil, _Degisiklikkaydet, _Kaydet, _Veritabaniidsil, _Veritabanitumsil, _Yildizdurum, _Yildizekle } from '../server/Firebaseislemleri';
import '../css/mainpage.css';
import { Box, makeStyles } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const Modal=({baslik,govde,id,amac,Sohbet,setsohbet,kaydetbaslik,Sohbetdeger,eklebaslik,chatHistory,setuyarialert,yildizdurum,Basliktarihi,MBaslikismi,amac2,mesajkey,params,onclick,setChatHistory})=> {

  const navigate=useNavigate();

    const [open, setOpen] =useState(false)
    const[Baslikismi,setbaslikismi]=useState("");
    const[Basliksec,setbaslik]=useState("");
    const[Yildizekle,setyildizekle]=useState(null);

    useEffect(() => {
      
      _Yildizdurum(setyildizekle,id)

    }, []);

    const handleClickOpen = () => {

      
      setOpen(true);
      document.body.style.overflow = 'hidden';
    };
  
    const handleClose = () => {
      document.documentElement.style.overflow = 'auto';

      setOpen(false);

    };

    const Sil=(id)=>{
        if(amac=="normalsil"){

          if(amac2=="veritabani"){
          
            _Veritabaniidsil(id,mesajkey,Sohbet,navigate);
            const Filterarray = Sohbet.filter((item) => item.id !== id);
            setsohbet(Filterarray);
            setOpen(false);
              
          }
          else{
            console.log("değil")
            var Filterarray=[];
            Filterarray=Sohbet.filter(item=>item.id!=id)
            setsohbet(Filterarray);
            setOpen(false);
          }
          
        }
        else if(amac=="sidebarsil"){
          _Basliksil(id,params,navigate)
          setOpen(false);

        }
        else if(amac=="veritabantumsil"){
          setsohbet([{platform:null,mesaj:null,tarih:null,gonderen:null,id:null,durum:"array"}]);
          _Veritabanitumsil(id,navigate)
          setOpen(false);

        }
        else if(amac=="normaltumsil"){
            setsohbet([{platform:null,mesaj:null,tarih:null,gonderen:null,id:null,durum:"array"}])
            setChatHistory([]);
            setOpen(false);
        }

    }

    const Kaydet=()=>{

          if(Sohbetdeger==1){
            

          }
          else{
            if(Baslikismi==""){

            }
            else{
              
             _Kaydet(Sohbet,Baslikismi,chatHistory,Sohbetdeger,setuyarialert)
             document.documentElement.style.overflow = 'auto';
             setOpen(false);
            }
            
          }  
        
    }

    const Veritabaniyildizekle=(e)=>{
      setyildizekle(e.target.checked);
     
      _Yildizekle(id,!Yildizekle)
      console.log(yildizdurum)
    }

  const Degisiklikkaydet=(id)=>{

    _Degisiklikkaydet(Sohbet,chatHistory,setuyarialert,id,Basliktarihi,MBaslikismi)
    document.documentElement.style.overflow = 'auto';
    setOpen(false);
  }

  return (
    <div>
      {amac=="yildizekle" && 
        <span style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",justifyContent:"center",backgroundColor:"#8BC34A",padding:0,paddingLeft:2,paddingRight:3,borderRadius:10}}>
            <Switch onChange={(e)=>Veritabaniyildizekle(e)} checked={Yildizekle} value={Yildizekle} size='small'  color="info" />
            <h4 style={{textAlign:"center",marginLeft:-15,marginTop:7,fontSize:13,fontWeight:"500",color:"#3F4B58",width:100}}>Yıldız Ekle</h4>
       </span>
      }
      {amac=="pdfolustur" && 
        <span style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",justifyContent:"center",marginTop:0}}>
        <Button onClick={onclick} style={{height:30,marginRight:10,width:"100%",textTransform: 'none',fontSize:13,color:"#607D8B",borderColor:"#FF6F00",borderWidth:1}} color="info" variant="outlined" startIcon={<PictureAsPdfIcon style={{color:"FF6F00",fontSize:22}} />}>
      <h4 style={{textAlign:"center",marginTop:9,fontSize:13,fontWeight:"500",color:"#FF6F00"}}>PDF Oluştur</h4>
     </Button>
     </span>
      }
      {amac=="sidebarsil" && 
        <span onClick={()=>handleClickOpen()}>
        <DeleteOutlineOutlinedIcon className='silliste' style={{color:"red",fontSize:21,marginBottom:7,marginLeft:0}}/>
        </span>
        }
      {amac=="veritabantumsil" &&  
       <span style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",justifyContent:"center",marginTop:0}}>
       <Button onClick={()=>handleClickOpen()} style={{height:30,marginRight:10,width:"100%",textTransform: 'none',fontSize:13,color:"#607D8B",borderColor:"#F4511E",borderWidth:1}} color="error" variant="outlined" startIcon={<DeleteForeverOutlinedIcon style={{color:"F4511E",fontSize:24}} />}>
     <h4 style={{textAlign:"center",marginTop:9,fontSize:13,fontWeight:"500",color:"#F4511E"}}>Sohbeti Sil</h4>
    </Button>
      </span>
      }
      {amac=="sohbetdegisiklikkaydet" && 
       <span style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",justifyContent:"center",marginTop:0}}>
       <Button onClick={()=>handleClickOpen()} style={{height:30,marginRight:10,width:"100%",textTransform: 'none',fontSize:13,color:"#607D8B",borderColor:"#404C59",borderWidth:1}} color="info" variant="outlined" startIcon={<SaveOutlinedIcon style={{color:"3F4B58",fontSize:24}} />}>
     <h4 style={{textAlign:"center",marginTop:9,fontSize:13,fontWeight:"500",color:"#3F4B58"}}>Değişiklikleri Kaydet</h4>
    </Button>
    </span>
      }
         {amac=="sohpetbasliktasi" && 
        <span onClick={()=>handleClickOpen()}>
        <ReplyOutlinedIcon className='silliste' style={{color:"404C59",fontSize:23,marginBottom:7,marginLeft:0}}/>
        </span>
      }       
         {amac=="sohbetkaydet" && 
        <span style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",justifyContent:"center",marginTop:3}}>
         <Button onClick={()=>handleClickOpen()} style={{height:30,marginRight:10,width:"100%",textTransform: 'none',fontSize:13,color:"#607D8B",borderColor:"#404C59",borderWidth:1}} color="info" variant="outlined" startIcon={<SaveOutlinedIcon style={{color:"3F4B58",fontSize:24}} />}>
       <h4 style={{textAlign:"center",marginTop:9,fontSize:13,fontWeight:"500",color:"#3F4B58"}}>Sohbeti Kaydet</h4>
      </Button>
      </span>
      }       
        {amac=="normaltumsil" && 
        <span style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",justifyContent:"center",marginTop:3}}>
         <Button onClick={()=>handleClickOpen()} style={{height:30,marginRight:10,width:"100%",textTransform: 'none',fontSize:13,color:"#607D8B",borderColor:"#F4511E",borderWidth:1}} color="error" variant="outlined" startIcon={<DeleteForeverOutlinedIcon style={{color:"F4511E",fontSize:24}} />}>
       <h4 style={{textAlign:"center",marginTop:9,fontSize:13,fontWeight:"500",color:"#F4511E"}}>Sohbeti Sil</h4>
      </Button>
      </span>
      }       
        {amac=="normalsil" && 
        <span onClick={()=>handleClickOpen()}>
        <DeleteOutlineOutlinedIcon className='silliste' style={{color:"red",fontSize:23,marginBottom:7,marginLeft:0}}/>
        </span>
        }
     
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><h4>Uyarı !</h4></DialogTitle>
        {amac=="sohbetkaydet" && 
        <DialogContent style={{width:400}}>
        <h4 style={{fontSize:15,color:"#FF0000",marginBottom:5}}>{kaydetbaslik}</h4>
        <TextField
value={Baslikismi}
onChange={(text)=>setbaslikismi(text.target.value)}
style={{width:"100%",borderRadius:20}}
inputProps={{ style: {fontSize:14,color: '#333333',height:15,borderRadius:20 } }}
  placeholder=''
    id="outlined-size-small"
    size="small"  
    color="primary"
  />
        <h4 style={{fontSize:15,color:"#FF0000",marginBottom:5}}>{baslik}</h4>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:0}}>{govde}</h4>
        </DialogContent> }
        {amac=="sohpetbasliktasi" &&
        <DialogContent style={{width:400}}>
        <h4 style={{fontSize:15,color:"#FF0000",marginBottom:5}}>{eklebaslik}</h4>
        <Select
         defaultValue={"sssssss"}
        size='small'
        style={{width:300,height:25,fontSize:13,color:"333333",backgroundColor:"#FAFAFA"}}
        labelId="demo-select-small"
        id="demo-select-small"
        value={Basliksec}
        onChange={(e)=>setbaslik(e.target.value)}
        >
        <MenuItem style={{fontSize:13}} value={"aaaaaaaaaaaa"}>ChatGPT</MenuItem>
        <MenuItem style={{fontSize:13}}  value={"bbbbbbbbbb"}>Not Defteri</MenuItem>
        <MenuItem style={{fontSize:13}}  value={"bbbbbbbbbb"}>Not Defteri</MenuItem>
        <MenuItem style={{fontSize:13}}  value={"bbbbbbbbbb"}>Not Defteri</MenuItem>
        <MenuItem style={{fontSize:13}}  value={"bbbbbbbbbb"}>Not Defteri</MenuItem>

        </Select>
        <h4 style={{fontSize:15,color:"#FF0000",marginBottom:5}}>{baslik}</h4>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:0}}>{govde}</h4>
        </DialogContent>
         }
        <DialogContent>
        <h4 style={{fontSize:15,color:"#FF0000",marginBottom:5}}>{baslik}</h4>
        <h4 style={{fontSize:15,color:"#333333",marginBottom:0}}>{govde}</h4>
        </DialogContent>
        {amac=="sohbetkaydet" && 
         <span>
        <DialogActions style={{marginTop:-50}}>
        <Button onClick={()=>handleClose()} style={{marginTop:5,textTransform: 'none',fontSize:15}} color="error" size='small' variant="contained">Vazgeç</Button>
        <Button onClick={()=>Kaydet(id)} style={{marginTop:5,textTransform: 'none',fontSize:15}} color="primary" size='small' variant="contained">Kaydet</Button>
        </DialogActions> 
        </span>
        }
        {amac=="sohpetbasliktasi" &&
        <DialogActions style={{marginTop:-50}}>
      <Button onClick={()=>handleClose()} style={{marginTop:5,textTransform: 'none',fontSize:15}} color="error" size='small' variant="contained">Vazgeç</Button>
      <Button onClick={()=>Sil(id)} style={{marginTop:5,textTransform: 'none',fontSize:15}} color="primary" size='small' variant="contained">Taşı</Button>
      </DialogActions>  
}
{amac=="normalsil" && 
      <DialogActions>
        <Button onClick={()=>handleClose()} style={{marginTop:5,textTransform: 'none',fontSize:15}} color="error" size='small' variant="contained">Hayır</Button>
        <Button onClick={()=>Sil(id)} style={{marginTop:5,textTransform: 'none',fontSize:15}} color="primary" size='small' variant="contained">Evet</Button>
        </DialogActions> 
        }
        {amac=="sohbetdegisiklikkaydet" && 
        <DialogActions>
        <Button onClick={()=>handleClose()} style={{marginTop:5,textTransform: 'none',fontSize:15}} color="error" size='small' variant="contained">Hayır</Button>
        <Button onClick={()=>Degisiklikkaydet(id)} style={{marginTop:5,textTransform: 'none',fontSize:15}} color="primary" size='small' variant="contained">Evet</Button>
        </DialogActions> 
        }
        {amac=="veritabantumsil" && 
        <DialogActions>
        <Button onClick={()=>handleClose()} style={{marginTop:5,textTransform: 'none',fontSize:15}} color="error" size='small' variant="contained">Hayır</Button>
        <Button onClick={()=>Sil(id)} style={{marginTop:5,textTransform: 'none',fontSize:15}} color="primary" size='small' variant="contained">Evet</Button>
        </DialogActions> 
        }
         {amac=="sidebarsil" && 
        <DialogActions>
        <Button onClick={()=>handleClose()} style={{marginTop:5,textTransform: 'none',fontSize:15}} color="error" size='small' variant="contained">Hayır</Button>
        <Button onClick={()=>Sil(id)} style={{marginTop:5,textTransform: 'none',fontSize:15}} color="primary" size='small' variant="contained">Evet</Button>
        </DialogActions> 
        }
        {amac=="normaltumsil" && 
      <DialogActions>
        <Button onClick={()=>handleClose()} style={{marginTop:5,textTransform: 'none',fontSize:15}} color="error" size='small' variant="contained">Hayır</Button>
        <Button onClick={()=>Sil(id)} style={{marginTop:5,textTransform: 'none',fontSize:15}} color="primary" size='small' variant="contained">Evet</Button>
        </DialogActions> 
        }
       
      
        
      </Dialog>
     
    </div>
  )
}

export default Modal