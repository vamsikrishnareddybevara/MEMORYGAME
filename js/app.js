

    const restart = document.querySelector('.restart');
    restart.addEventListener('click',shuffle);
    let retry=false;
    let movesReset=false;
    let matches = 0;
     let intro , button;

/* To display card when the file is loaded*/
    const cards = document.querySelectorAll('.card');
    cardsDisplay();

    function cardsDisplay(){
        cards.forEach(function(card) {
        card.className='card open show';
        });
    }

/* To start the timer when the play button is clicked and stop is after 10 seconds*/
    function timer(){
    let time=10;
    let count=0;
    document.querySelector('.timer').innerHTML=time-count;
    let intervalOne=setInterval(setTime,1000); 
    function setTime(){ 
        count=count+1;
        document.querySelector('.timer').innerHTML=time-count; 
    }
    setTimeout(stopInterval,10000);
    function stopInterval(){
    clearInterval(intervalOne);
    }     
    setTimeout(removeTimer,10000);
    function removeTimer(){
    document.querySelector('.timer').innerHTML='Good Luck!';
   }    
}


/* Intro card to  give information about how to play the game */


    introDisplay();
    function introDisplay(){   
        intro = document.querySelector('.intro');
        button = intro.querySelector('button');
        button.addEventListener('click',startgame);
       
    }


    function startgame(event){
        intro.remove();
        timer();
        setTimeout(cardsRemove,10000);
    } 
/* To remove cards after 10 seconds */

    function cardsRemove(){
        cards.forEach(function(card) {
        card.className='card';                
        })
        repeat();
    }


/* To show the restart icon after 10 seconds */


    function repeat(){
        document.querySelector('.restart').firstElementChild.className='fa fa-repeat';
    }


/* To shuffle the cards after clicking restart */


    function shuffle(){
        var ul = document.querySelector('.deck');
        for (var i = ul.children.length; i >= 0; i--) {
            ul.appendChild(ul.children[Math.random() * i | 0]);
        }
            cardsDisplay();
            recreateIntro();
    }

/* To pop-up the intro card after clicking the restart icon */


    function recreateIntro(){
            let introDiv=document.createElement('div');       
            let heading = document.createElement('h1');
            heading.textContent='MEMORY GAME';
            introDiv.appendChild(heading);
            let para1 = document.createElement('p');
            para1.textContent = 'lets have some fun with this game.I will give you 10 seconds to remember the positions of the icons.';
            introDiv.appendChild(para1);
            let para2 = document.createElement('p');
            para2.textContent='You have to try to match them. Good luck mate!';
            introDiv.appendChild(para2);
            let playButton = document.createElement('button');
            playButton.textContent='Play';
            playButton.className='button';
            introDiv.appendChild(playButton);
            introDiv.className='intro';
            let introSection=document.querySelector("#intro");
            introSection.appendChild(introDiv);
            document.querySelector('.restart').firstElementChild.className='';
            cards.forEach(card => card.addEventListener('click',showCard));
            const star=document.querySelector('.stars');
            let listChild= star.getElementsByTagName('li');
            for(let i=0;i<=4;i++){
                listChild[i].firstElementChild.className='fa fa-star';
            }
            document.querySelector('.moves').innerHTML=0;
            movesReset=true;
            removeRating();
            introDisplay();
            retry=true;
            successDiv.remove();
}





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 function disableCards(){
        lockBoard=true;
        setTimeout(function(){
        firstCard.className='card correct'
        secondCard.className='card correct'
        },500)
        setTimeout(function(){
        firstCard.className='card match';
        secondCard.className='card match';
        if(firstCard.className == secondCard.className){
            matches++;
            console.log(matches);
        }
        if(matches===8){
            matches=0;
            noOfStars=0;
            success();
        }

        resetValues();            
        },1500);
        firstCard.removeEventListener('click',showCard);
        secondCard.removeEventListener('click',showCard);
        
 }
 function unShowCards(){
        lockBoard=true;
        setTimeout(function(){
        firstCard.className='card wrong';
        secondCard.className='card wrong';
        },500)
        setTimeout(function(){
        firstCard.className='card';
        secondCard.className='card';       
        resetValues();
 
        },1500);
 }
 

 function numberOfMove(){
    if(movesReset===true){
        numberOfMoves=0;
    }
    numberOfMoves++
    move.innerHTML = numberOfMoves;
    movesReset=false;

 }


function showCard(){
    numberOfMove();
    if(lockBoard){return;}

    this.classList.add('open');
    this.classList.add('show');
    if(!(hasFlipped)){
        if(this === firstCard){return;}
        // first click
        hasFlipped=true;
        firstCard=this;
    }
    else{
    // second click

    hasFlipped=false;
    secondCard=this;
        if(firstCard.dataset.icon===secondCard.dataset.icon) {
        // its a match
        disableCards();
        }
        else{
        // not a match
        unShowCards();
        }
    }

} 
function resetValues(){
    [hasflipped,lockBoard]=[false,false];
    [firstCard,secondCard]=[null,null];
}


function success(){
    stars();
    document.querySelector('.timer').innerHTML='Congratulations !';
    successDiv = document.createElement('div');
    successDiv.className='success';
    document.querySelector('#success').appendChild(successDiv);
    let para = document.createElement('p');
    successDiv.appendChild(para);
    para.textContent = ' Awesome ! You took '+numberOfMoves+' moves to complete the game with a rating of '+ noOfStars +' stars.';
}


function stars(){
    if(numberOfMoves<=22){
        limit=4;
        ratingCalculate();
    }
    else if(numberOfMoves<=26){
        limit=3;
        ratingCalculate();
    }
    else if(numberOfMoves<=30){
        limit=2;
        ratingCalculate();
    }
    else if(numberOfMoves<=32){
        limit=1;
        ratingCalculate();
    }
    else if(numberOfMoves>32){
        limit=0;
        ratingCalculate();
    }
}

function removeRating(){
        const star=document.querySelector('.stars');
        listChild= star.getElementsByTagName('li');
        for(let i=0;i<=4;i++){
            noOfStars++;
            listChild[i].firstElementChild.className='fa fa-star-o';
        }
}
function ratingCalculate(){
        const star=document.querySelector('.stars');
        listChild= star.getElementsByTagName('li');
        for(let i=0;i<=limit;i++){
            noOfStars++;
            listChild[i].firstElementChild.className='fa fa-star rating';
        }
}


cards.forEach(card => card.addEventListener('click',showCard));
let hasFlipped,lockBoard = false;
let firstCard,secondCard;
let move=document.querySelector('.moves');
let numberOfMoves=0,matchedCards=0,noOfStars=0,limit=0;
let successDiv,playAgain,again;

particlesJS("particles-js", {"particles":{"number":{"value":144,"density":{"enable":true,"value_area":2244.776885211732}},"color":{"value":"#f70202"},"shape":{"type":"circle","stroke":{"width":2,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":1,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":8.017060304327615,"random":true,"anim":{"enable":true,"speed":2.4362316369040355,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":160.3412060865523,"color":"#ffffff","opacity":0.456972437346674,"width":1.763753266952075},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":false});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;

