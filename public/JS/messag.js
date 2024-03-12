// messages 

document.addEventListener('DOMContentLoaded',()=>{
    const InboxRout = window.location.pathname.includes('/inbox');
    const menuBar = document.querySelector('.menu-bar').style;
    const menuList = document.querySelector('.menu-list');
    const pTag = menuList.querySelectorAll('ul li p');
    const logo = document.querySelector('.logo img').style;
    const logoI = document.querySelector('.logo i').style;
    const logoSpan = document.querySelector('.logo span').style;
    const LiTag = document.querySelectorAll('.menu-list ul li');
    const LiDivTag = document.querySelectorAll('.menu-list ul li div');
    const more = document.querySelector('.more').style;
    const moreSpan = document.querySelector('.more a span').style;
    const moreA = document.querySelector('.more a').style;

    if(InboxRout){
      menuBar.width = "48px";
      menuBar.padding = "8px 12px 34px 12px";
      menuBar.display = "flex";
      menuBar.justifyContent = "space-between";

      menuList.style.width = '48px';
      menuList.style.height = '500px';
      menuList.style.display = 'flex';
      menuList.style.justifyContent = 'center';

      pTag.forEach(p => p.style.display = 'none');
      logo.display = 'none';
      logoI.display = 'block';
      logoImarginBottom = '16px';
      logImatginLeft = '10px';

      LiTag.forEach(l =>{
        l.style.width = '48px';
        l.style.height = '48px';
      });

      LiDivTag.forEach(d =>{
        d.style.width = '24px';
        d.style.height = '24px';
        d.style.marginLeft = '10px'
      });

      more.width = '48px';
      more.height = '56px';

      moreSpan.display = 'none';

      moreA.marginLeft = '10px';

      logoSpan.width = '48px';
      logoSpan.height = '73px';
      logoSpan.paddingBottom = '23px';

    }

});


const isNoChats = window.location.pathname.includes('/inbox');
const noChate = document.querySelector('.no-chats');
const activeChats = document.querySelector('.active-chates');
console.log(noChate)

if(isNoChats){
    activeChats.style.display = 'block';
    noChate.style.display = 'none';
}else{
    activeChats.style.display = 'none';
    noChate.style.display = 'block';
}


//message

const messageInput = document.getElementById('messageInput');
const recordingFileLike = document.getElementById('recordingFileLike');
const sendBtn = document.querySelector('.send-message-btn');

const messagecheck = (msg)=>{
        // Check if the input field is empty
        if (msg.value.trim() === '' || msg.value == null) {
            // If it's empty, show the recording-file-like section
            recordingFileLike.style.display = 'flex'; // or 'block' if it's a block-level element
            sendBtn.style.display = 'none';
        } else{
            recordingFileLike.style.display = 'none';
            sendBtn.style.display = 'block';
        }
}

console.log(messageInput,recordingFileLike)
messageInput.addEventListener('input', function() {

    messagecheck(this)

});

document.addEventListener('DOMContentLoaded',()=>{
    const sendBtn = document.getElementById('send-message-btn');
    const messageInput = document.getElementById('messageInput');
    const senderId = sendBtn.getAttribute('sender-id');
    const receiverId = sendBtn.getAttribute('receiver-id');
    let messageContent = messageInput.value;
    
    console.log('tis is current user id',senderId);
    console.log('this is post user id',receiverId);

    sendBtn.addEventListener('click',async(e)=>{
        let response = await fetch(`/inbox/chates/${receiverId}/?senderId=${senderId}`,{
            method:"POST",
            headers:{
                'content-type':'application/json',
            },
            body: JSON.stringify({messageContent}),
            
        });
        console.log(response);
        messageInput.value = null;
        messagecheck(messageInput);
    });

});



// Conversation data 
