// showing followerList 


document.addEventListener('DOMContentLoaded',()=>{
    let followerBtn = document.querySelector('.followers');
    let followerPages = document.querySelector('.followers-page');
    console.log('this is followers pages',followerPages)
    let  followerUser = document.querySelector('.followers-user');
    let currUserName =  followerBtn.getAttribute('currUser-name');
    let postUserName = followerBtn.getAttribute('postUser-name');
    let followerList = document.querySelector('.follower-list ul');
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
            let response = await fetch(`/profile/${postUserName}/followers`,{
                method:'GET',
                headers:{
                    'content-type':'application/json',
                }
             });

             let data = await response.json();
             console.log(data.users);

             data.users.follower.forEach(follower => {
                const followerItem = document.createElement('li');
               
                followerItem.innerHTML = `
                    <div class="follower-user">
                        <div class="follower-profile"><img src="${follower.profile.url}" alt="Profile Image"></div>
                        <div class="follower-name">
                            <span class="follower-username">${follower.username}</span>
                            <span class="follower-fullname">${follower.fullname}</span>
                        </div>
                        <div class="followed-btn">
                            <button>remove</button>
                        </div>
                    </div>
                `;
                followerList.appendChild(followerItem);
            });


        } else{
            let response = await fetch(`/profile/${currUserName}/followers`,{
                method:'GET',
                headers:{
                    'content-type':'application/json',
                }
             });

             let data = await response.json();
             console.log(data.users);

             data.users.follower.forEach(follower => {
                const followerItem = document.createElement('li');
                
                followerItem.innerHTML = `
                    <div class="follower-user">
                        <div class="follower-profile"><img src="${follower.profile.url}" alt="Profile Image"></div>
                        <div class="follower-name">
                            <span class="follower-username">${follower.username}</span>
                            <span class="follower-fullname">${follower.fullname}</span>
                        </div>
                        <div class="followed-btn">
                            <button>remove</button>
                        </div>
                    </div>
                `;
                followerList.appendChild(followerItem);
            });
        }
    });

    document.addEventListener('click',(event)=>{
        followerList.innerHTML = "";
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
    let msgBtn = document.querySelector('.message-btn');
    let currUserId = followBtn.getAttribute('followed-user-id');
    let postUserId = followBtn.getAttribute('post-user-id');
    let followers = document.querySelector('.follower-count');
    let following = document.querySelector('.followings');
    let editBtn = document.querySelector('.edit-profile-btn');
    let viewBtn = document.querySelector('.view-archive-btn');
    console.log(currUserId);
    console.log(postUserId);

    let response = await fetch(`/follow/followed/${currUserId}`,{
        method:"POST",
        headers:{
            'content-type':'application/json',
        },
        body : JSON.stringify({postUserId})
    });
    let {hasFollowed , hasFollowing , currUser} = await response.json();
    console.log('this is currUser',currUser);

    if(hasFollowed){
        followBtn.style.display = "none";
        followingBtn.style.display = "block";
        editBtn.style.display = 'none';
        viewBtn.style.display = 'none';
    } else if(currUserId === postUserId) {
        followBtn.style.display = 'none';
        followingBtn.style.display = 'none';
        msgBtn.style.display = 'none';
        editBtn.style.display = 'block';
        viewBtn.style.display = 'block';
    } else {
        followingBtn.style.display = "none";
        followBtn.style.display = "block";
        editBtn.style.display = 'none';
        viewBtn.style.display = 'none';
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


