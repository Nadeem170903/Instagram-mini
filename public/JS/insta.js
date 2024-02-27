document.addEventListener('DOMContentLoaded',()=>{
    let creat = document.querySelector(".Create");
    let close = document.querySelector('.close');
    let pst = document.querySelector(".creat-pst-dis");
    let createForm = document.querySelector('#create-form');

    creat.addEventListener("click",()=>{
        
        console.log(pst);
        let show = pst.classList.contains('show');
       if(!show){
        pst.classList.add('show');
        pst.classList.remove('hide');
       }
    });

    close.addEventListener('click',()=>{
        let pst = document.querySelector(".creat-pst-dis");
        console.log(pst);
        let show = pst.classList.contains('show');
       if(show){
        pst.classList.remove('show');
        pst.classList.add('hide');
       }
    });
    
   
    document.addEventListener('click',(event)=>{
        let pstContain = pst.contains(event.target);
        let createContain = creat.contains(event.target);

        if(pstContain && !createContain && !isDescendant(pst, event.target)){
            let show = pst.classList.contains('show');
            if(show){
                pst.classList.remove('show');
                pst.classList.add('hide');
            }
        } 
    });


    function isDescendant(parent, child) {
        let node = child.parentNode;
        while (node != null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }


   


});

 

// Create post 

let form = document.querySelector("#create-form");
let nextBtn = document.querySelectorAll('.next-btn');
let preBtn = document.querySelectorAll('.pre-btn');
let fileInput = document.querySelector('#fileInput');
let fileBtn = document.querySelector('#noSubmitButton');
let postPortel = document.querySelector('.post-portel');
let currentStep = 1;




function stopPro(event, BtnId){
    if (event.submitter && event.submitter.id === BtnId) {
        // Prevent the form from being submitted
        event.preventDefault();}
}


form.addEventListener("submit",(event)=>{
    stopPro(event,"noSubmitButton");
})





function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            let preview = document.querySelectorAll('.i');
            console.log(preview);
            for(let img of preview){
                img.src = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    }
};

function openFileInput(fileInput) {
    document.getElementById(fileInput).click();
}

function postsize(postPortel,currentStep){
    if(currentStep >2){
        postPortel.style.width = "796px";
        console.log(postPortel)
    }else{
        postPortel.style.width = "460px";
    }
}


function nextStep (){
    const currentFormPage = document.getElementById(`step${currentStep}`);
    currentFormPage.classList.remove('active');
    currentStep++;
    const nextFormPage = document.getElementById(`step${currentStep}`);
    if (nextFormPage) {
        nextFormPage.classList.add('active');
    } else if(currentStep>3){

       currentStep = 3;
       const nextFormPage = document.getElementById(`step${currentStep}`);
       if (nextFormPage) {
           nextFormPage.classList.add('active');
        }
    }
}



function preStep() {
    const currentFormPage = document.getElementById(`step${currentStep}`);
    currentFormPage.classList.remove('active');
    currentStep--;
    const preFormPage = document.getElementById(`step${currentStep}`);
    if (preFormPage) {
        preFormPage.classList.add('active');
    } else if(currentStep<1){
        currentStep = 1;
        const preFormPage = document.getElementById(`step${currentStep}`);
        if (preFormPage){
            preFormPage.classList.add('active');
        } 
     }
}




fileInput.addEventListener('change',(event)=>{
    handleFileSelect(event);
    nextStep();
})

fileBtn.addEventListener('click',()=>{
     openFileInput('fileInput');
})



for(let btn of preBtn){
    btn.addEventListener('click',()=>{
        preStep();
        postsize(postPortel,currentStep)
    })
}

for(let btn of nextBtn){
    btn.addEventListener('click',()=>{
    
        nextStep();
        postsize(postPortel,currentStep)
    })
}
for(let btn of nextBtn){
    btn.addEventListener('change',(event)=>{
       handleFileSelect(event)
    })
}



//sign up pages

let validateInput = document.querySelectorAll('.validate');

let navBar = document.querySelector('.menu-bar');
const isSignupPage = window.location.pathname.includes('/signup');
const isLogin = window.location.pathname.includes('/login');





if(isSignupPage || isLogin){
    navBar.style.display = "none";
}


console.log(currentStep)

function nextStep2 (){
    const currentFormPage = document.getElementById(`Step${currentStep}`);
    currentFormPage.classList.remove('active');
    currentStep++;
    const nextFormPage = document.getElementById(`Step${currentStep}`);
    if (nextFormPage) {
        nextFormPage.classList.add('active');
    } else if(currentStep>3){

       currentStep = 3;
       const nextFormPage = document.getElementById(`Step${currentStep}`);
       if (nextFormPage) {
           nextFormPage.classList.add('active');
        }
    }
}



let signUp = document.querySelectorAll('.signUpbtn');
let signUpForm = document.querySelector('#signUpForm');
let openFile = document.querySelector('.selectbtn');
let fileInpute = document.querySelector('#file');



if(isSignupPage){
    signUpForm.addEventListener('submit',(event)=>{
        stopPro(event,"noSubmit");
        stopPro(event,"noSubmit1");
        stopPro(event,"noSubmit2");
    });
}




for(let btn of signUp){
    btn.addEventListener('click',()=>{
        
for(let validate of validateInput){
    if(validate.value !== ""){
        nextStep2();
    }
}
    })
}


function handleFileSelect2(event) {
    const files = event.target.files;
    
    if (files && files.length > 0) {
        const file = files[0];

        const reader = new FileReader();
        reader.onload = function (e) {
            let preview = document.querySelector('.dp');
            console.log(preview);
            preview.src = e.target.result;
            console.log(preview.src);
        };
        reader.readAsDataURL(file);
    }
};



let changeBtn = ()=>{
    openFile.removeAttribute('id');
    fileInpute.removeAttribute('id');
    console.log(fileInpute)
    openFile.innerHTML = "next";


}

if(isSignupPage){
    file.addEventListener('change',(event)=>{
        handleFileSelect2(event);
        changeBtn();
    });


    
openFile.addEventListener('click',(event)=>{
    openFileInput('file');
    console.log(event);
});
    
}








// for more option



document.addEventListener("DOMContentLoaded", () => {
    let moreBtn = document.querySelector('#more');
    let moreOption = document.querySelector('.moreOption');

    moreBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        moreOption.classList.toggle('hide');
        moreOption.classList.toggle('show');
    });

    document.addEventListener('click', (event) => {
        let moreBtnCon = moreBtn.contains(event.target);
        let moreOptionCon = moreOption.contains(event.target);
        if (!moreOptionCon && moreOption.classList.contains('show') ) {
            moreOption.classList.remove('show');
            moreOption.classList.add('hide');
        }
    });
});



document.addEventListener('DOMContentLoaded',async()=>{
    let postSection = document.querySelector('.post-section');
    let likebtn = document.querySelectorAll('.likeBtn');
    let userId = postSection.getAttribute('data-user-id');
    console.log('this is user id',userId);
    try{
        let response = await fetch('/liked',{
            method:'POST',
            headers:{
            'Content-Type':'application/json'
            },
            body: JSON.stringify({userId})
        });
         let data = await response.json();
         let likedUser = data.likedUser.likedPost;
         console.log("this is data",likedUser);
 


    likebtn.forEach(async (like) =>{
    
        let postId = like.getAttribute('data-post-id');


        let hasLiked = likedUser.some(post => post._id === postId);
        console.log(hasLiked);
        if(hasLiked){
            like.style.display = "none"
            let container = like.closest('.caption-sections');
            let unlike = container.querySelector('.unlikeBtn');
               unlike.style.display = "block";
        } else{
            like.style.display = "block"
            let container = like.closest('.caption-sections');
            let unlike = container.querySelector('.unlikeBtn');
               unlike.style.display = "none";
        }
        like.addEventListener('click', async (event)=>{
            event.preventDefault();
            
    
            let postId = like.getAttribute('data-post-id');
            let userId = like.getAttribute('data-user-id');
           
            try {
                // Send a POST request to your server to update the like count
                const response = await fetch(`/like/${postId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            
                if (!response.ok) {
                    throw new Error('Failed to like the post');
                }
    
                // Update the like count on the client side
                let  data = await response.json();
                  let total = data.populatedPost.likes.length;
    
                  let container = like.closest('.caption-sections');
                  console.log(container);
                  let totalLike = container.querySelector('.total-likes');
                  totalLike.innerText = total;
                  event.target.style.display = "none";
                  let unlike = container.querySelector('.unlikeBtn');
                      unlike.style.display = "block";

            } catch (error) {
                console.error('Error:', error);
            }
    
           
          
        });
    });
}catch (error){
    console.log(error);
}









// unlike 

let unlikes = document.querySelectorAll('.unlikeBtn');


unlikes.forEach(unlike => unlike.addEventListener('click',async (event)=>{
    event.preventDefault();
  try{
    let postId = unlike.getAttribute('data-post-id');
    let userId = unlike.getAttribute('data-user-id');


    let response = await fetch(`/unlike/${postId}`,{
        method:'POST',
        headers:{
            'content-type':'application/json',
        }
    });

    let data = await response.json();
    console.log('this is unlike data',data.likes.length);
    let container = unlike.closest('.caption-sections');
    let total = container.querySelector('.total-likes');
    total.innerText = data.likes.length;
    unlike.style.display = 'none';
    const likeBtn = container.querySelector('.likeBtn');
    likeBtn.style.display = 'block';
  }catch(error){
    console.log(error);
  }
  
}));

});


// followers 


document.addEventListener('DOMContentLoaded',()=>{
    let followerBtn = document.querySelector('.followers');
    let followerPages = document.querySelector('.followers-page');
    let  followerUser = document.querySelector('.followers-user');
   

 
    followerBtn.addEventListener('click',async (event)=>{
        event.preventDefault();
        let show = followerPages.classList.contains("hide");
        console.log('this is show contains',show);
         if(show){
         followerPages.classList.remove('hide');
         }else{
             followerPages.classList.add('hide');
         }
 
         show = !show;
         console.log('click');

     let response = await fetch('/followers',{
        method:'GET',
        headers:{
            'content-type':'application/json',
        }
     })

    

  
    });



document.addEventListener('click',(event)=>{
    let followerContain = followerPages.contains(event.target);
    let btnContains = followerBtn.contains(event.target);
    let userContain = followerUser.contains(event.target);
    if(followerContain && !btnContains &&  !userContain ){
         followerPages.classList.add('hide');
    }

  
});

});


// followers 

document.addEventListener('DOMContentLoaded',async()=>{
    let followBtn = document.querySelector('.follow-btn');
    let followingBtn = document.querySelector('.followings-btn');
    let currUserId = followBtn.getAttribute('followed-user-id');
    let postUserId = followBtn.getAttribute('post-user-id');
    let followers = document.querySelector('.follower-count');
    let following = document.querySelector('.followings');

    if(currUserId === postUserId){
        followBtn.style.display = 'none';
        followingBtn.style.display = 'none';
    }

    let response = await fetch(`/followed/${currUserId}`,{
        method:"POST",
        headers:{
            'content-type':'application/json',
        },
        body : JSON.stringify({postUserId})
    });
    let {hasFollowed , hasFollowing , currUser} = await response.json();
    console.log('this is currUser',currUser)
    if(hasFollowed){
        followBtn.style.display = "none";
        followingBtn.style.display = "block";
    }else{
        followingBtn.style.display = "none";
        followBtn.style.display = "block";
    }


     followBtn.addEventListener('click',async()=>{
        console.log('click');
        console.log(currUserId);
        console.log(postUserId);

        let response = await fetch(`/follow/${currUserId}`,{
            method:"POST",
            headers:{
                'content-type':'application/json',
            },
            body : JSON.stringify({postUserId})
        });

        let data = await response.json();
        console.log('follower and followeing data',data);
         followers.innerText = data.follow.follower.length;
         followBtn.style.display = "none";
         followingBtn.style.display = "block";

     });

     // unfollow 
     followingBtn.addEventListener('click',async()=>{
        console.log('click');
        console.log(currUserId);
        console.log(postUserId);

        let response = await fetch(`/unfollow/${currUserId}`,{
            method:"POST",
            headers:{
                'content-type':'application/json',
            },
            body : JSON.stringify({postUserId})
        });

        let data = await response.json();

        followers.innerText = data.follow.follower.length;
        followBtn.style.display = "block";
        followingBtn.style.display = "none";

     });
})



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

})




























  
