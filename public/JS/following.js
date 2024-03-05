//showing following list
document.addEventListener('DOMContentLoaded',()=>{
    let followerBtn = document.querySelector('.following');
    let followerPages = document.querySelector('.followings-page');
    let  followerUser = document.querySelector('.following-user');
    let currUserName =  followerBtn.getAttribute('currUser-name');
    let postUserName = followerBtn.getAttribute('postUser-name');
    let followerList = document.querySelector('.following-list ul');
    console.log(currUserName);
    console.log(postUserName);
    followerBtn.addEventListener('click',async (event)=>{
        let show = followerPages.classList.contains("hide");
        console.log('this is show contains',show);
         if(show){
         followerPages.classList.remove('hide');
         }else{
             followerPages.classList.add('hide');
         }

        if(currUserName !== postUserName){
            let response = await fetch(`/profile/${postUserName}/following`,{
                method:'GET',
                headers:{
                    'content-type':'application/json',
                }
             });

             let data = await response.json();
             console.log(data.users);

             data.users.following.forEach(following => {
                const followerItem = document.createElement('li');
               
                followerItem.innerHTML = `
                    <div class="following-user">
                        <div class="following-profile"><img src="${following.profile.url}" alt="Profile Image"></div>
                        <div class="following-name">
                            <span class="following-username">${following.username}</span>
                            <span class="following-fullname">${following.fullname}</span>
                        </div>
                        <div class="following-btn">
                            <button>remove</button>
                        </div>
                    </div>
                `;
                followerList.appendChild(followerItem);
            });


        } else{
            let response = await fetch(`/profile/${currUserName}/following`,{
                method:'GET',
                headers:{
                    'content-type':'application/json',
                }
             });

             let data = await response.json();
             console.log(data.users);

             data.users.following.forEach(following => {
                const followerItem = document.createElement('li');
                
                followerItem.innerHTML = `
                <div class="following-user">
                <div class="following-profile"><img src="${following.profile.url}" alt="Profile Image"></div>
                <div class="following-name">
                    <span class="following-username">${following.username}</span>
                    <span class="following-fullname">${following.fullname}</span>
                </div>
                <div class="following-btn">
                    <button>remove</button>
                </div>
            </div>
                `;
                followerList.appendChild(followerItem);
            });
        }
    });

    document.addEventListener('click',(event)=>{
        
        let followerContain = followerPages.contains(event.target);
        let btnContains = followerBtn.contains(event.target);
        let userContain = followerUser.contains(event.target);
        if(followerContain && !btnContains &&  !userContain ){
             followerPages.classList.add('hide');
             followerList.innerHTML = "";
        }
    });
});