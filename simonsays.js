let sound = new Audio("khel-khatam-beta_FYJ3qdwe.mp3")
let gameSeq = [];
let userSeq = [];
let btns = ["btn1", "btn2", "btn3", "btn4"];
let started = false;
let btnS = document.querySelectorAll(".btn");
let lvl = 0;
let highestScore = 0 ;
let userTurn = false;
let start = document.querySelector(".start");
let restart = document.querySelector(".restart");

let h2 = document.querySelector("h2");
document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game started");
        started = true;
        lvlIndexer();
                start.style.opacity = "0";
                restart.innerText = "Restart"

        setTimeout(lvlUp,500);
    }
});
start.addEventListener("click", function () {
    if (started == false) {
        console.log("game started");
        started = true;
        lvlIndexer();
        // start.classList.add("restart");
        start.style.opacity = "0";
        restart.innerText = "Restart"
        setTimeout(lvlUp,500);
        // console.dir(restart);
    }
});


function lvlIndexer(){
     lvl++;
    h2.innerHTML = `Level ${lvl}`;
}
function lvlUp() {
    // gameSeq = [];
    userTurn = false;
    userSeq = [];

    let rand = Math.floor(Math.random() * 4);
    let randBtn = document.querySelector(`.${btns[rand]}`);
    gameSeq.push(btns[rand]);
    gameFlash(randBtn);

    setTimeout(() => {
       userTurn = true; 
    }, 100);
    // console.log(gameSeq); 
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash")
    }, 150);
}
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash")
    }, 150);
}
function lostflash(){
    let body = document.querySelector("body");
    body.classList.add("lost");
    setTimeout(() => {
        body.classList.remove("lost");  
    }, 3500);
}
function btnPress(){
    if(!userTurn) return;
    let btn = this;
    userFlash(btn);
    let userbtn = btn.getAttribute("id");
    userSeq.push(userbtn);
    // console.log(userSeq); 
    checkAns(userSeq.length-1); 
}
function playsequence(){
    userTurn = false;
     for(let  i = 0 ; i < gameSeq.length;i++){
                let  btnName = gameSeq[i];

                setTimeout(() => {
                    let btn = document.querySelector(`.${btnName}`);
                    gameFlash(btn);
                }, i*500 + 500);
            }
            setTimeout(()=>{
                userTurn = true;
            },gameSeq.length*500 + 100);
}
function reset(){
    lostflash();
    h2.innerHTML = `Game over! Your Score was <b>${lvl-1}<b><br>Press any key to start.<br>Highest score : ${highestScore}`;
        setTimeout(()=>{
            started = false;
        },3600);
        lvl = 0;
       gameSeq = [];
    restart.style.opacity = "1";
    restart.innerText = "Restart"
    
}
function checkAns(idx){

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            userSeq = [];
           playsequence();
            lvlIndexer();
           setTimeout(lvlUp,gameSeq.length*500+500); 
        }
        
    }
    else{
        highestScore = Math.max(highestScore,lvl-1);
        userTurn = false;
        sound.play();
        reset();

    }
}

for(btn of btnS){
    btn.addEventListener("click",btnPress);
}