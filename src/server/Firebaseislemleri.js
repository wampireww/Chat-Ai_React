import React from 'react';
import { db } from './Firebaseconfig';
import {push,ref,set,get,update,remove,child,onValue,orderByChild,equalTo, orderByValue} from "firebase/database";



export const _Kaydet=async(Sohbet,Baslikismi,chatHistory,Sohbetdeger,setuyarialert)=>{

    const shortid = require('shortid');
    const baslikdid=shortid.generate();
    const gelenisim=Baslikismi.charAt(0).toLocaleUpperCase('tr-TR')+ Baslikismi.slice(1);
    
    var zaman = new Date();
  //  const kayittarihi={gun:zaman.getDate(),ay:zaman.getUTCMonth()+1,yil:zaman.getFullYear()};
    var ay=zaman.getUTCMonth()+1;

        Sohbet.forEach(item =>{
              
            set(ref(db,"/Basliklar/"+baslikdid+"/"+item.id),{
                kayittarihi:zaman.getDate()+" / "+ay+" / "+zaman.getFullYear(),
                platform:item.platform,
                mesaj:item.mesaj,
                mesajtarih:item.tarih,
                gonderen:item.gonderen,
                id:item.id,
                Baslikismi:gelenisim,
                tasima:false,
                key:baslikdid,
                durum:"veritabani",
                telefon:false,
                chatHistory:chatHistory,
            })
            
        });

        set(ref(db,"/Baslikisimleri/"+baslikdid),{
            kayittarihi:zaman.getDate()+"/"+ay+"/"+zaman.getFullYear(),
            kayitsirala:zaman.getTime(),
            baslikdid:baslikdid,
            Baslikismi:gelenisim,
            Sohbetdeger:Sohbetdeger-1,
            Yildiz:false

        }).then(()=>setuyarialert(true)).catch((e)=>console.log(e));

    }
        
    
    export const _Basliklistele = async (setbaslikliste, arama, setprogress) => {
      setprogress(true);
      const gelenisim = arama.charAt(0).toLocaleUpperCase('tr-TR') + arama.slice(1);
      var items = [];
      const baslik = ref(db, "/Baslikisimleri/");
      var degerler = [{ id: "", deger: null }]
    
      var basliklar = ref(db, "/Basliklar/");
      
      onValue(basliklar, (snapshot) => {
        degerler = []; // degerler dizisini her onValue tetiklendiğinde temizle
        snapshot.forEach((item2) => {
          degerler.push({ id: item2.key, deger: item2.size - 1 })
        });
        
        console.log(degerler)
        console.log("id")
        
        onValue(baslik, (snapshot) => {
          items = [];
          snapshot.forEach((item) => {
            if (item.val().Baslikismi.startsWith(gelenisim)) {
              degerler.forEach((deger) => {
                if (deger.id === item.val().baslikdid) {
                  items.push({
                    kayitsirala:item.val().kayitsirala,
                    kayittarihi: item.val().kayittarihi,
                    baslikdid: item.val().baslikdid,
                    Baslikismi: item.val().Baslikismi,
                    Sohbetdeger: deger.deger,
                    Yildiz: item.val().Yildiz
                  });
                }
              });
            }
          });
          items.sort((a, b) => new Date(b.kayitsirala) - new Date(a.kayitsirala));
          setbaslikliste(items);
          setprogress(false);
        });
      });
    };

        
        export const _Sohbetlistele=async(setbaslikliste,gelenid,setprogress,setChatHistory)=>{
          setprogress(true);

            var items=[];
          
            onValue(ref(db,"/Basliklar/"+gelenid),(snapshot)=>{

            
                snapshot.forEach((item,index)=>{if(item.val().id!=undefined){
                 
                     items.push({
                        id:item.val().id,
                         kayittarihi:item.val().kayittarihi,
                         platform:item.val().platform,
                         mesaj:item.val().mesaj,
                         tarih:item.val().mesajtarih,
                         gonderen:item.val().gonderen,
                         id:item.val().id,
                         Baslikismi:item.val().Baslikismi,
                         tasima:false,
                         key:item.val().key,
                         durum:item.val().durum,
                         telefon:item.val().telefon,
                         index:index,
                         history:item.val().chatHistory
                         
                     })
                    
                    }
                  })
                  items.sort((a, b) => {
                    const dateComparison = new Date(a.tarih).getTime() - new Date(b.tarih).getTime();
                    if (dateComparison === 0) {
                      // Aynı saniyede yazılmış öğeler, index'e göre sıralanır
                      return a.index - b.index;
                    } else {
                      return dateComparison;
                    }
                  });
              
                  const formattedItems = items.map((item) => {
                    return {
                      ...item,
                      tarih: item.tarih
                     // new Date(item.tarih).toLocaleString('tr-TR')
                    };
                  });

                  setbaslikliste(formattedItems)
                  const historyArray = items.map(item => item.history);
                  setChatHistory(historyArray[0]);

                //  setbaslikliste([{platform:items.platform,mesaj:items.mesaj,tarih:items.kayittarihi,gonderen:items.gonderen,id:items.key,durum:"array"}])
                //  console.log(items);
                setprogress(false);
                })

               

                }


                export const _Yildizekle=(gelenid,gelendeger)=>{

                  update(ref(db,"/Baslikisimleri/"+gelenid),{
                    
                    Yildiz:gelendeger
        
                }).then(()=>console.log("yildizeklendi")).catch((e)=>console.log(e));
                
                }


                export const _Basliklisteleid = async (setbaslikliste,gelenid) => {

                  onValue(ref(db,"/Baslikisimleri/"+gelenid),(snapshot)=>{
                    var items = [];
                   
                      console.log(snapshot.child("Yildiz").val());
    
                      items.push({
                        kayittarihi: snapshot.child("kayittarihi").val(),
                        baslikdid: snapshot.child("baslikdid").val(),
                        Baslikismi: snapshot.child("Baslikismi").val(),
                        Sohbetdeger: snapshot.child("Sohbetdeger").val(),
                        Yildiz: snapshot.child("Yildiz").val()
                      });
               
                    setbaslikliste(items[0]);
                  });

                };

                export const _Yildizdurum = async (setyildizekle,gelenid) => {

                  onValue(ref(db,"/Baslikisimleri/"+gelenid),(snapshot)=>{
                  
                    setyildizekle(snapshot.child("Yildiz").val());
                  });

                };
                  
              
                export const _Degisiklikkaydet=async(Sohbet,chatHistory,setuyarialert,gelenid,kayittarihi,baslikismi)=>{
                  
               //   const shortid = require('shortid');
                   
                //  const kayittarihi={gun:zaman.getDate(),ay:zaman.getUTCMonth()+1,yil:zaman.getFullYear()};
               

                      Sohbet.forEach((item) =>{
                            if(item.durum=="array"){

                               set(ref(db,"/Basliklar/"+gelenid+"/"+item.id),{
                            kayittarihi:kayittarihi,
                            platform:item.platform,
                            mesaj:item.mesaj,
                            mesajtarih:item.tarih,
                            gonderen:item.gonderen,
                            id:item.id,
                            Baslikismi:baslikismi,
                            tasima:false,
                            key:gelenid,
                            durum:"veritabani",
                            telefon:false,
                            chatHistory:chatHistory
                                
                          }).then(()=>{
                            window.location.reload();
                            setuyarialert(true);
                          })
                         
                        }
                      })
                    }

export const _Veritabanitumsil=async(id,navigate)=>{

  await remove(ref(db,"/Basliklar/"+id));
  await remove(ref(db,"/Baslikisimleri/"+id)).then(()=>{
    navigate("/home")
  }).catch((error)=>console.log(error));


}

// export const _Veritabaniidsil=async(id,key,setsohbet,Sohbet,navigate)=>{
//   var Filterarray=[];
//   await remove(ref(db,"/Basliklar/"+key+"/"+id)).then(()=>{
//     Filterarray=Sohbet.filter(item=>item.id!=id);
//     setsohbet(Filterarray);
//   })
   
   
//     if(Sohbet.length==1){

//        remove(ref(db,"/Basliklar/"+key));
//        remove(ref(db,"/Baslikisimleri/"+key)).then(()=>{
//         navigate("/home")
//       }).catch((error)=>console.log(error));
//     }

// }

export const _Veritabaniidsil = async (id, key, Sohbet, navigate) => {
  try {
  
    await remove(ref(db, "/Basliklar/" + key + "/" + id));
    console.log("silindi!!!!!!")
   
    if (Sohbet.length === 1) {
      await remove(ref(db, "/Basliklar/" + key));
      await remove(ref(db, "/Baslikisimleri/" + key));
      navigate("/home");
    }
  } catch (error) {
    console.log(error);
  }
};

export const _Basliksil=async(id,params,navigate)=>{

  if(id==params){
    await remove(ref(db,"/Basliklar/"+id));
    await remove(ref(db,"/Baslikisimleri/"+id)).then(()=>{
      navigate("/home")
    }).catch((error)=>console.log(error));
  }
 else{
  await remove(ref(db,"/Basliklar/"+id));
  await remove(ref(db,"/Baslikisimleri/"+id));
 }

 
}

export const _Girisyap= async(username,password,navigate)=>{

    
  get(ref(db,"/Login")).then((snapshot)=>{
     
     if(snapshot.val().username==username && snapshot.val().password==password){

         localStorage.setItem("login", "true");
         navigate("/home")
     }
     else{
        
         navigate("/?giris=basarisiz")
     }

  })
     

}

            
          
        