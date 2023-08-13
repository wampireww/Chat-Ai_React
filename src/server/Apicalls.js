import React from 'react'
import axios from 'axios';

const shortid = require('shortid');

export const sendMessageToChatGPT = async (message,setsohbet,settextkontrol,chatHistory) => {
  
  settextkontrol(true);

  const messages = [
    { role: 'system', content: 'You are' },
    ...chatHistory, // Önceki sohbet geçmişini ekleyin
    { role: 'user', content: message }
  ];

  const zaman=new Date()

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: messages
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "api-key" 
        }
      }
      );

        setsohbet(old=>[...old,{platform:"ChatGPT",mesaj:response.data.choices[0].message.content,tarih:zaman.getTime()+zaman.getSeconds(1),gonderen:"ai",id:shortid.generate(),durum:"array"}]);
        settextkontrol(false)
 
    
    //  return setgelenmesaj(response.data.choices[0].message.content);
    } catch (error) {
      
      console.error('ChatGPT API hatası:', error);
      // Hata durumunda boş bir yanıt döndür
      settextkontrol(false);
      return console.error('ChatGPT API hatası:', error), setsohbet(old=>[...old,{platform:"ChatGPT",mesaj:"Bir Hata ile karşılaşıldı !",tarih:zaman.getTime()+zaman.getSeconds(1),id:shortid.generate(),gonderen:"ai",durum:"array"}]);
      
    }
  };



  