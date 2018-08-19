    const restart = document.querySelector('.restart');
    restart.addEventListener('click',shuffle);
    let retry=false;
    let movesReset=false;
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
    let interval=setInterval(setTime,1000); 
    function setTime(){ 
        count=count+1;
        document.querySelector('.timer').innerHTML=time-count; 
    }
    setTimeout(stopInterval,10000);
    function stopInterval(){
    clearInterval(interval);
    }     
    setTimeout(removeTimer,10000);
    function removeTimer(){
    document.querySelector('.timer').innerHTML='Good Luck!';
   }    
}


/* Intro card to  give information about how to play the game */
    intro();
    function intro(){
        let intro , button;
        intro = document.querySelector('.intro');
        button = intro.querySelector('button');
        button.addEventListener('click',startgame);
        function startgame(event){
            intro.remove();
            timer();
            setTimeout(cardsRemove,10000);
        }        
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
            let frag=document.createElement('div');       
            let heading = document.createElement('h1');
            heading.textContent='MEMORY GAME';
            frag.appendChild(heading);
            let para1 = document.createElement('p');
            para1.textContent = 'lets have some fun with this game.I will give you 10 seconds to remember the positions of the symbols.';
            frag.appendChild(para1);
            let para2 = document.createElement('p');
            para2.textContent='You have to try to match them in 3 chances. Good luck mate!';
            frag.appendChild(para2);
            let playButton = document.createElement('button');
            playButton.textContent='Play';
            playButton.className='button';
            frag.appendChild(playButton);
            frag.className='intro';
            let introSection=document.querySelector("#intro");
            introSection.appendChild(frag);
            document.querySelector('.restart').firstElementChild.className='';
            cards.forEach(card => card.addEventListener('click',showCard));
            const star=document.querySelector('.stars');
            let listChild= star.getElementsByTagName('li');
            for(let i=0;i<=2;i++){
                listChild[i].firstElementChild.className='fa fa-star';
            }
            document.querySelector('.moves').innerHTML=0;
            movesReset=true;
            intro();
            retry=true;
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
        firstCard.className='card';
        secondCard.className='card';
        secondCard.className='card';
        
        starsCount();
        resetValues();
 
        },1500);
 }
 let starCount=3,moves=3,lockBoard=false,i=2;
 function starsCount(){
    if(starCount>=1){
        if(retry){i=2;}  
        let star = document.querySelector('.stars').getElementsByTagName('li');
        star[i].firstElementChild.className='fa fa-star-o';
        i--;
        starCount--;
        retry=false;
    }
    if(starCount===0){
        document.querySelector('.timer').innerHTML='Game Over &#128541;';
        cards.forEach(card => card.removeEventListener('click',showCard));
        starCount=3;  
    }
 }
 function numberOfMove(){
    if(movesReset===true){
        numberOfMoves=0;
        console.log('hello');
    }
    numberOfMoves++
    console.log(numberOfMoves);
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
cards.forEach(card => card.addEventListener('click',showCard));
let hasFlipped = false;
let firstCard,secondCard;
let move=document.querySelector('.moves');
let numberOfMoves = 0;


