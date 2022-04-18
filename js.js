

const yourHero = document.querySelector('.player_hero');
const playArea = document.querySelector('#main_play_area');
const cartaImg = ['img/cartaclowagua.png', 'img/cartaclowfogo.png', 'img/cartaclowgrama.png'];

//funcao de movimento e atirar
function fly (event) {
    if (event.key === 'ArrowUp'){
        event.preventDefault();
        moveUp();
    } else if (event.key === 'ArrowDown'){
        event.preventDefault();
        moveDown();
    } else if (event.key === " "){
        event.preventDefault();
        fireMagic();
    }
}


//funcao de subir
function moveUp(){
    let topPosition = getComputedStyle(yourHero).getPropertyValue('top');
    if(topPosition === "510px") {
        return
    }else {
        let position = parseInt(topPosition);
        position -= 20;
        yourHero.style.top = `${position}px`;
    }
}

//funcao para descer

function moveDown(){
    let topPosition = getComputedStyle(yourHero).getPropertyValue('top');
    if(topPosition === "360px"){
        return
    }else{
        let position = parseInt(topPosition);
        position += 20;
        yourHero.style.top = `${position}px`;
    }
}


// funcoes de magias

function fireMagic(){
    let magicPink = createMagicElement();
    playArea.appendChild(magicPink);
    moveMagic(magicPink);
}

function createMagicElement(){
    let xPosition = parseInt(window.getComputedStyle(yourHero).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourHero).getPropertyValue('top'));
    let newMagic = document.createElement('img');
    newMagic.scr = 'img/magicPink.png';
    newMagic.classList.add('magicPink');
    newMagic.style.left = `${xPosition}px`;
    newMagic.style.top = `${yPosition - 10}px`;
    return newMagic;
}

function newMagic(magicPink) {
    let magicInterval = setInterval(() => {
        let xPosition = parseInt(magicPink.style.left);
        let cartas = document.querySelectorAll('.carta');

        cartas.forEach((carta) => {//comparando para ver se a carta foi atingida
            if(checkMagicCollision(magicPink, carta)){
                carta.src = 'img/cartaclow.png';
                carta.classList.remove('carta');
                carta.classList.add('carta_transformada');
            }
        });

        if(xPosition === 290){
            magicPink.remove();
        } else{
            magicPink.style.left = `${xPosition + 5}px`
        }
    }, 8);

 }

 // funcao para criar as cartas clow

 function createCarta(){
     let newCarta = document.createElement('img');
     let cartaSprite = cartaImg[Math.floor(Math.random() * cartaImg.length)];
     newCarta.src = cartaSprite;
     newCarta.classList.add('carta');
     newCarta.classList.add('carta_transition');
     newCarta.style.left = '280px';
     newCarta.style.top = `${Math.floor(math.random() * 280) + 30}px`;
     playArea.appendChild(newCarta);
     moveCarta(newCarta);
 }

//mover cartas clow 
 function moveCarta(carta){
    let moveCarta = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(carta).getPropertyValue('left'));
        if(xPosition <= 20) {
            if(Array.from(carta.classList).includes('carta_transformada')){
                carta.remove();
            }else{
                gameover();
            }
            }else{
                carta.style.left = `${xPosition - 6}px`;
            }
    }, 15);
 }

//function para colisao
function checkMagicCollision(magicPink,carta){
    let magicTop = parseInt(magicPink.style.top);
    let magicLeft = parseInt(magicPink.style.left);
    let magicBottom = magicTop - 10;
    let cartaTop = parseInt(carta.style.top);
    let cartaLeft = parseInt(carta.style.left);
    let cartaBottom = cartaTop - 15;
    if(magicLeft != 300 && magicLeft + 30 >= cartaLeft){
        if(magicTop <= cartaTop && magicTop >= cartabottom){
            return true;
        }else{
            return false;
        }
    } else {
        return false;
    }
    
}

window.addEventListener('keydown', fly);
createCarta();