
document.addEventListener('DOMContentLoaded',async()=>{
    let postSection = document.querySelector('.post-section');
    let likebtn = document.querySelectorAll('.likeBtn');
    let userId = postSection.getAttribute('data-user-id');
    console.log('this is user id',userId);
    try{
        let response = await fetch('/like',{
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
        console.log('click');

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
        console.log(response);
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

