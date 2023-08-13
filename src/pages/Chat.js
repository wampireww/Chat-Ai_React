import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import '../css/mainpage.css';
import Footer from '../components/Footer';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import FlareOutlinedIcon from '@mui/icons-material/FlareOutlined';
import MoveUpOutlinedIcon from '@mui/icons-material/MoveUpOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Modal from '../components/Modal';
import Alert from '@mui/material/Alert';


const Chat=()=> {

  const [Uyarialert,setuyarialert] = useState(false);
  const[Sohbet,setsohbet]=useState([{platform:null,mesaj:null,tarih:null,gonderen:null,id:null,durum:"array"}]);
  const[Textkontrol,settextkontrol]=useState(false);
  const [chatHistory, setChatHistory] = useState([]);



  useEffect(() => {
    const timer = setTimeout(() => {
      setuyarialert(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [Uyarialert]);



  return (
    <div className='mainpage'>
  <div className='mainpage-main'>
  <div className='sayfakaydet'>
      <span style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",justifyContent:"flex-start",marginTop:5,marginBottom:-2,marginLeft:10}}>
      <Modal setuyarialert={setuyarialert}  chatHistory={chatHistory} Sohbetdeger={Sohbet.length} Sohbet={Sohbet} kaydetbaslik={"Kaydedeceğiniz başlık ismini girin"} amac={"sohbetkaydet"} />
      <Modal setChatHistory={setChatHistory} setsohbet={setsohbet} baslik={"Bütün sohbeti"} govde={"Silmek istediğinizden emin misiniz ?"} amac={"normaltumsil"} />
       <span style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",width:"50%",backgroundColor:"#8BC34A",marginTop:5}}>
      {Uyarialert && 
   <h4 style={{ marginRight:"0%",marginTop:5,textAlign: "center",fontSize: 14, fontWeight: "600", color: "#D84315" }}>Sohbet Kaydedildi !</h4>
      }
        </span>
      </span>
      <hr className='sayfakaydet-hr1'></hr>
      </div>
    <div className='mainpage-main-1'>
      {Sohbet.length==1 && <p style={{marginTop:0,fontSize:14,backgroundColor:"#E0E0E0",padding:5,color:"333333",width:"50%",marginLeft:"25%",zIndex:20}}>Herhangi bir Sohbet bulunamadı. Sohbet başlatmak için aşağıdaki sohbet kutusunu kullanın.</p>}
      {Sohbet.map(item=>item.gonderen=="admin" ?
          <div key={item.id} className='chatben-1'>
          <span className='detay-ai-1'>
            <span style={{display:"flex",flexDirection:"row"}}>
            <h4 style={{borderRadius:5,backgroundColor:"#E0E0E0",padding:5,fontSize:12,color:"#333333",marginLeft:0}}>{new Date(item.tarih).toLocaleString('tr-TR')}</h4>
            </span>
            <span style={{display:"flex",flexDirection:"row"}}>
              {item.platform=="Notdefteri" &&
            <h4 style={{borderRadius:5,padding:5,backgroundColor:"#A1887F",fontSize:12,color:"#FFFFFF",marginLeft:2}}>Not Defteri</h4>
          }
                   <Modal Sohbet={Sohbet} setsohbet={setsohbet} id={item.id} amac={"normalsil"} baslik={new Date(item.tarih).toLocaleString('tr-TR')} govde={"Tarihli mesajı silmek istediğinizden emin misiniz ?"} />
  
            </span>
          </span>
          
          <hr className='chat-hr1'></hr>
          <span className='detay-ai-2'>
          <h4 style={{lineHeight:1.4,whiteSpace:"pre-wrap",width:"auto",textAlign:"start",fontSize:14,color:"#333333",marginLeft:0}}>{item.mesaj}</h4>
          </span>
        </div>
     : item.gonderen=="ai" && 

    
       <div key={item.id} className='chatai-1'>
      <span className='detay-ai-1'>
        <span style={{display:"flex",flexDirection:"row"}}>
        <h4 style={{borderRadius:5,backgroundColor:"#E0E0E0",padding:5,fontSize:12,color:"#333333",marginLeft:0}}>{new Date(item.tarih).toLocaleString('tr-TR')}</h4>
        </span>
        <span style={{display:"flex",flexDirection:"row"}}>
          {item.platform=="ChatGPT" && 
        <h4 style={{borderRadius:5,backgroundColor:"#BF57CB",padding:5,fontSize:12,color:"#FFFFFF",marginLeft:2}}>ChatGPT</h4>
      }
      <Modal Sohbet={Sohbet} setsohbet={setsohbet} id={item.id} amac={"normalsil"} baslik={new Date(item.tarih).toLocaleString('tr-TR')} govde={"Tarihli mesajı silmek istediğinizden emin misiniz ?"} />


        </span>
      </span>
      <hr className='chat-hr1'></hr>
      <span className='detay-ai-2'>
      <h4 style={{lineHeight:1.4,whiteSpace:"pre-wrap",width:"auto",textAlign:"start",fontSize:14,color:"#333333",marginLeft:2}}>{item.mesaj}</h4>
      </span>
    </div> 
  
        )}
      
      
      <Footer setChatHistory={setChatHistory} chatHistory={chatHistory} Textkontrol={Textkontrol} settextkontrol={settextkontrol} Sohbet={Sohbet} setsohbet={setsohbet}/>
    </div>
</div>

                 
    </div>
  ) 
}

export default Chat