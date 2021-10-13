const screens =  document.querySelectorAll('.screen')

const  choose_insect_btns = document.querySelectorAll('.choose-insect-btn')

const start_btn = document.getElementById('start-btn')

const game_container = document.getElementById('game-container')
const tiemE1 = document.getElementById('time')
const scoreE1 = document.getElementById('score')
const message = document.getElementById('message')

let seconds =0;
let score= 0;
let select_insect = {}

start_btn.addEventListener('click',()=>{
    screens[0].classList.add('up')

    console.log(choose_insect_btns)
})

function increaseTime(){
    let m = Math.floor(seconds/60)
    let s = seconds % 60
    m= m<10 ? `0${m}` : m
    s= s<10 ? `0${s}` : s
    tiemE1.innerHTML = `Time: ${m}:${s}`
    seconds++
}

function startGame(){
    setInterval(increaseTime,1000)
}

choose_insect_btns.forEach(btn =>{
    btn.addEventListener('click',()=>{
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        select_insect = {src,alt}
        screens[1].classList.add('up')

        setTimeout(createInsect,1000)
        startGame()
    })
})

function getRandomLocation(){
    const width =window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width -200) + 100
    const y = Math.random() * (height -200) + 100

    return{x,y}

}

function createInsect(){
    const insect=document.createElement('div')
    insect.classList.add('insect')
    const {x,y} = getRandomLocation()
    insect.style.top =`${y}px`
    insect.style.left =`${x}px`
    insect.innerHTML = `<img 
    src="${select_insect.src}" 
    alt="${select_insect.alt}"
    style="transform: rotate(${Math.random()*360}deg)" />`

    insect.addEventListener('click',catchInsect)
    game_container.appendChild(insect)
}

function addInsects(){
    setTimeout(createInsect,3000)
    setTimeout(createInsect,2500)
}

function catchInsect(){
    increaseScore()
    this.classList.add('caught')
    setTimeout(()=> this.remove(),2000)
    addInsects()
}
 function increaseScore(){
     score++
     if(score>5){
         message.classList.add('visible')
     }
     scoreE1.innerHTML=`Score: ${score}`
 }

 message.addEventListener('click',() => {
     location.reload(true)
     screens[0].classList.remove('up')
 })