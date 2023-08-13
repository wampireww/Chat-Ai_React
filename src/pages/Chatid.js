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
import { useParams } from 'react-router-dom';
import { _Basliklisteleid, _Sohbetlistele } from '../server/Firebaseislemleri';
import CircularProgress from '@mui/material/CircularProgress';
import StorageIcon from '@mui/icons-material/Storage';
import SourceIcon from '@mui/icons-material/Source';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useReactToPrint } from 'react-to-print'
import { useRef } from 'react';
import Print from '../components/Print';



const Chatid=()=> {

  

    
  const [Uyarialert,setuyarialert] = useState(false);
  const[Sohbet,setsohbet]=useState([{platform:null,mesaj:null,tarih:null,gonderen:null,id:null,durum:"array"}]);
  const[Textkontrol,settextkontrol]=useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const[Progress,setprogress]=useState(false);
  const[Baslikliste,setbaslikliste]=useState([]);


  var { id } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      setuyarialert(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [Uyarialert]);


  useEffect(()=>{

    _Sohbetlistele(setsohbet,id,setprogress,setChatHistory);
    _Basliklisteleid(setbaslikliste,id);
    console.log("ss")
    console.log(Sohbet);
  },[id])

  const referance=useRef();

  const Pdfolustur = useReactToPrint({
    content: () => referance.current,
    documentTitle: 'emp-data',
  });

 
  return (
    <div className='mainpage'>
  <div className='mainpage-main'>
  <div className='sayfakaydet'>
    {Progress ? 
  <span style={{marginLeft:10,marginTop:10,alignItems:"flex-start",display:"flex",flexDirection:"column",justifyContent:"center",width:"100%"}}> <CircularProgress size={30} />
            </span> : 
      <><span style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "flex-start", marginLeft: 5 }}>
              <h4 style={{ textAlign: "center", marginTop: 9, fontSize: 14, fontWeight: "600", color: "#3F4B58", textDecoration: "underline" }}>{Baslikliste.Baslikismi}</h4>
            </span><span style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%" }}>
                <span style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "flex-start", width: "22%", marginLeft: 5, backgroundColor: "#CFD8DC", borderRadius: 10, marginRight: 5 }}>
                  <h4 style={{ textAlign: "center", marginTop: 7, fontSize: 13, fontWeight: "500", color: "#3F4B58", marginRight: 5, marginLeft: 5 }}>Başlık Tarihi :</h4>
                  <h4 style={{ textAlign: "center", marginTop: 7, fontSize: 13, fontWeight: "500", color: "#D84315" }}>{Baslikliste.kayittarihi}</h4>
                </span>
                <Modal yildizdurum={Baslikliste.Yildiz} id={id} amac={"yildizekle"} />
                <span style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", borderRadius: 10, width: "100%", marginRight: "18%" }}>
                  <Modal Basliktarihi={Baslikliste.kayittarihi} MBaslikismi={Baslikliste.Baslikismi} id={id} setuyarialert={setuyarialert} baslik={"Değişiklikleri"} govde={"kaydetmek istediğinizden emin misiniz ?"} chatHistory={chatHistory} Sohbetdeger={Sohbet.length} Sohbet={Sohbet} amac={"sohbetdegisiklikkaydet"} />
                  <Modal onclick={Pdfolustur} amac={"pdfolustur"} />
                  <Modal id={id} setsohbet={setsohbet} baslik={"Bütün sohbeti"} govde={"veritabanından silmek istediğinizden emin misiniz ? Evet derseniz bu sohbete ait başlıkta silinecektir."} amac={"veritabantumsil"} />
          
                </span>
              </span></>
        }
        <span style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",width:"100%",backgroundColor:"#8BC34A",marginTop:5}}>
      {Uyarialert && 
   <h4 style={{ marginRight:"20%",marginTop:5,textAlign: "center",fontSize: 14, fontWeight: "600", color: "#D84315" }}>Değişikler Kaydedildi !</h4>
      }
      </span>
    <hr className='sayfakaydet-hr1'></hr>

      </div>
    <div className='mainpage-main-1'>
      <div ref={referance}>
      {Sohbet.length==0 && <p style={{marginTop:30,fontSize:14,backgroundColor:"#E0E0E0",padding:5,color:"333333",width:"50%",marginLeft:"25%",zIndex:20}}>Herhangi bir Sohbet bulunamadı. Sohbet başlatmak için aşağıdaki sohbet kutusunu kullanın.</p>}
      {Sohbet.map(item=>item.gonderen=="admin" ?
          <div key={item.id} className='chatben-1'>
          <span className='detay-ai-1'>
            <span style={{display:"flex",flexDirection:"row"}}>
            <h4 style={{borderRadius:5,backgroundColor:"#E0E0E0",padding:5,fontSize:12,color:"#333333",marginLeft:0}}>{new Date(item.tarih).toLocaleString('tr-TR')}</h4>
            {item.durum=="veritabani" &&
            <LocalOfferIcon style={{color:"#404C59",fontSize:17,marginBottom:7,marginLeft:5,marginTop:3}}/>
          }
            </span>
            <span style={{display:"flex",flexDirection:"row"}}>
              {item.platform=="Notdefteri" &&
            <h4 style={{borderRadius:5,padding:5,backgroundColor:"#A1887F",fontSize:12,color:"#FFFFFF",marginLeft:2}}>Not Defteri</h4>
          }


                   <Modal mesajkey={id} Sohbet={Sohbet} setsohbet={setsohbet} id={item.id} amac2={item.durum} amac={"normalsil"} baslik={new Date(item.tarih).toLocaleString('tr-TR')} govde={"Tarihli mesajı silmek istediğinizden emin misiniz ?"} />
  
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
         {item.durum=="veritabani" &&
            <LocalOfferIcon style={{color:"#404C59",fontSize:17,marginBottom:7,marginLeft:5,marginTop:3}}/>
          }
        </span>
        <span style={{display:"flex",flexDirection:"row"}}>
          {item.platform=="ChatGPT" && 
        <h4 style={{borderRadius:5,backgroundColor:"#BF57CB",padding:5,fontSize:12,color:"#FFFFFF",marginLeft:2}}>ChatGPT</h4>
      }
      <Modal mesajkey={id} Sohbet={Sohbet} setsohbet={setsohbet} id={item.id} amac2={item.durum} amac={"normalsil"} baslik={new Date(item.tarih).toLocaleString('tr-TR')} govde={"Tarihli mesajı silmek istediğinizden emin misiniz ?"} />


        </span>
      </span>
      <hr className='chat-hr1'></hr>
      <span className='detay-ai-2'>
      <h4 style={{lineHeight:1.4,whiteSpace:"pre-wrap",width:"auto",textAlign:"start",fontSize:14,color:"#333333",marginLeft:2}}>{item.mesaj}</h4>
      </span>
    </div> 
  
        )}
      
      </div>
      <Footer setChatHistory={setChatHistory} chatHistory={chatHistory} Textkontrol={Textkontrol} settextkontrol={settextkontrol} Sohbet={Sohbet} setsohbet={setsohbet}/>
    </div>

</div>

                 
    </div>
  ) 
}

export default Chatid