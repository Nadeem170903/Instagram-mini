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











