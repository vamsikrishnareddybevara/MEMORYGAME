/*  To make sure that that the js engine throws erros
 when a varible is not declared */
    "use strict";
    const restart = document.querySelector('.restart');
    restart.addEventListener('click',shuffle);
    let movesReset=false;
    let initialRating=true;
    let matches=0;
    let intro,button,listChild,star;
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => card.addEventListener('click',showCard));
    let hasFlipped,lockBoard = false, lockBoardInitially=true;
    let firstCard,secondCard,firstTime=true;
    let move=document.querySelector('.moves');
    let numberOfMoves=0,matchedCards=0,noOfStars=0,limit=0;
    let successDiv,successIndicator=false,playAgain,again;
    let sec,min,playTime=0,clockStop=false,firstClick=true,timeInterval;
    let spanElement;


/* To display cards when the file is loaded*/
    
    cardsDisplay();
    
    function cardsDisplay(){
        if(firstTime===true){
        ratingCalculate();
        firstTime=false;
        }
        cards.forEach(function(card) {
        card.className='card open show';
        });
    }

/* Intro card to  give information about how to play the game */

    introDisplay();
    function introDisplay(){   
        intro = document.querySelector('.intro');
        button = intro.querySelector('button');
        button.addEventListener('click',startgame);   
    }

/* To remove the intro card when play button is clicked  card and to start the timer */

    function startgame(event){
        intro.remove();
        timer();
        setTimeout(cardsRemove,10000);
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
        sec=0,min=0;
        document.querySelector('.timer').innerHTML= min +' min : ' + sec+' sec';
        clearInterval(intervalOne);
    }     
}

/* To calculate the time taken to complete the game */

    function clock(){
        sec+=1;
        playTime = convertSeconds(sec);
        document.querySelector('.timer').innerHTML=playTime;
    }
    function clockEnd(){
        if(clockStop === true){
            clearInterval(timeInterval);
            clockStop=false;
        } 
    }
    function convertSeconds(s){
        min=min+Math.floor(s/60);
        sec=s%60;
        let realtime;       
        realtime = min +' min : ' + sec+' sec';
        return realtime;
    }

/* To remove cards after 10 seconds */

   function cardsRemove(){
        cards.forEach(function(card) {
        card.className='card';                
        })
        lockBoardInitially=false;
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
            star=document.querySelector('.stars');
            listChild= star.getElementsByTagName('li');
            for(let i=0;i<=4;i++){
                listChild[i].firstElementChild.className='fa fa-star rating';
            }
            document.querySelector('.moves').innerHTML=0;
            document.querySelector('.timer').innerHTML=10;
            lockBoardInitially=true;
            firstClick=true;
            movesReset=true;        
            introDisplay();
            clockStop=true;
            clockEnd();
            successDiv.remove();
}

/* To disable cards when they are matched */

    function disableCards(){
        numberOfMove();
        lockBoard=true;
        setTimeout(function(){
        firstCard.className='card correct'
        secondCard.className='card correct'
        },300)
        setTimeout(function(){
        firstCard.className='card match';
        secondCard.className='card match';
        if(firstCard.className == secondCard.className){
            matches++;
        }
        /* To check if all the cards are matched */

        if(matches===8){
            matches=0;
            successIndicator=true;
            clockStop = true;
            if(clockStop===true){
                clockEnd();
            }
        
            success();
            noOfStars=0;
        }

        resetValues();            
        },1000);
        firstCard.removeEventListener('click',showCard);
        secondCard.removeEventListener('click',showCard);       
    }

 /* To unshow the cards if they are not matched */

    function unShowCards(){
        numberOfMove();
        lockBoard=true;
        setTimeout(function(){
        firstCard.className='card wrong';
        secondCard.className='card wrong';
        },300)
        setTimeout(function(){
        firstCard.className='card';
        secondCard.className='card';       
        resetValues();
 
        },1000);
    }
 /* To calculate no of moves */

 function numberOfMove(){
    if(movesReset===true){
        numberOfMoves=0;
    }
    numberOfMoves++
    stars();
    move.innerHTML = numberOfMoves;  
    movesReset=false;
 }
/* To open and show a card when it is clicked */

    function showCard(){
        if(lockBoardInitially===true){return;}
        if(firstClick ===true){
        timeInterval = setInterval(clock,1000);
        firstClick=false;
        }   

        if(lockBoard){return;}
            this.classList.add('open');
            this.classList.add('show');
        if(!(hasFlipped)){       
            // first click
            hasFlipped=true;
            firstCard=this;
        }
        else{
            // second click
            // To resist matching when same card is double clicked 
            if(this === firstCard){return;}
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

/* To reset value after each move */ 

function resetValues(){
    [hasFlipped,lockBoard]=[false,false];
    [firstCard,secondCard]=[null,null];
}

/* To pop a card saying congrats when all the cards are matched and to give rating*/

function success(){
    document.querySelector('.timer').innerHTML='Congratulations !';
    successDiv = document.createElement('div');
    successDiv.className='success';
    document.querySelector('#success').appendChild(successDiv);
    let successHeading = document.createElement('h2');
    successHeading.textContent='Awesome!'
    successDiv.appendChild(successHeading);
    let para = document.createElement('p');
    successDiv.appendChild(para);
    successRating();
    let starsSpan = document.createElement('span');
    starsSpan.textContent=' stars .';
    if(limit===0){
        starsSpan.textContent=' star .';
    }
    para.innerHTML = 'You won with '+numberOfMoves+' moves and took ' +playTime+ '. And earned ';
    para.appendChild(spanElement);
    para.appendChild(starsSpan);
    let playAgainButton = document.createElement('button');
    playAgainButton.textContent='Play Again';
    playAgainButton.className='play-again';
    successDiv.appendChild(playAgainButton);
    playAgainButton.addEventListener('click',shuffle);  
}

/* To display rating in the success card */

function successRating(){
    spanElement = document.createElement('span')
    let unorderList = document.createElement('ul');
    unorderList.className='success-stars';
    for(let k=0;k<noOfStars;k++){
        let orderedList = document.createElement('li');
        let iconTag = document.createElement('i');
        iconTag.className='fa fa-star success-rating';
        orderedList.appendChild(iconTag);
        unorderList.appendChild(orderedList);
    } 
    spanElement.appendChild(unorderList);
    return spanElement;
}

/* To give rating based on no of moves */

function stars(){
    if(numberOfMoves<=10){
        limit=4;
        noOfStars=0;
        ratingCalculate();
    }
    else if(numberOfMoves===12){
        limit=3;
        noOfStars=0;
        ratingCalculate();
    }
    else if(numberOfMoves==14){
        limit=2;
        noOfStars=0;
        ratingCalculate();
    }
    else if(numberOfMoves===16){
        limit=1;
        noOfStars=0;
        ratingCalculate();
    }
    else if(numberOfMoves>16){
        limit=0;
        noOfStars=0;
        ratingCalculate();
    }
}

/* To calculate rating */

function ratingCalculate(){
    if(initialRating === true){
        limit=4;       
    }
        initialRating=false;
        star=document.querySelector('.stars');
        listChild= star.getElementsByTagName('li');
        noOfStars=0;       
        for(let i=0;i<=limit;i++){
            noOfStars++;
            listChild[i].firstElementChild.className='fa fa-star rating';
        }
        if(limit<4){
            for(let j=limit+1;j<=4;j++){
                listChild[j].firstElementChild.className='fa fa-star-o';
            }
        }   
}

/* Back-Ground particle.js animation */

particlesJS("particles-js", {"particles":{"number":{"value":144,"density":{"enable":true,"value_area":2244.776885211732}},"color":{"value":"#f70202"},"shape":{"type":"circle","stroke":{"width":2,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":1,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":8.017060304327615,"random":true,"anim":{"enable":true,"speed":2.4362316369040355,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":160.3412060865523,"color":"#ffffff","opacity":0.456972437346674,"width":1.763753266952075},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":false});

