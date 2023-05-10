import {settings} from './library_settings.js';
import {scores} from './library_scores.js';
import {Card} from './library_card.js'

const cardsObj=( function() {

    //Object to know the turn to flip and which ID pick on each turn 
    let flippedCard={turn:1, card1:"",card2:""};
    //cards pool
    let cards=['card_1.png','card_2.png','card_3.png','card_4.png','card_5.png','card_6.png','card_7.png','card_8.png','card_9.png','card_10.png','card_11.png','card_12.png'
,'card_13.png','card_14.png','card_15.png','card_16.png','card_17.png','card_18.png','card_19.png','card_20.png','card_21.png','card_22.png','card_23.png','card_24.png'];
    //Array of images to display
    let images=[];
    //
    let firstCard=null;
    let secondCard=null;

    return {
        displayCards(numCards){

            this.shuffleCards(numCards);
            //console.log("display imagesss",this.images);
            const display = document.querySelector('#cards');
        
            //To create the DIV element with ID for Div, A and IMG tag
            for(let i=0;i<this.images.length;i++){
                let div = document.createElement('div');
                div.id = `div_${i}`;
                div.innerHTML = `<a href='#' id='a_${i}'><img id='img_${i}' src='./images/back.png' alt=''></a>`; 
                display.appendChild(div); //Add new div to display cards      
            }    
            
            let CardsATag=$("#cards a");
            for(let j=0;j<CardsATag.length;j++){
                let link=CardsATag[j];
                // preload the image
                const image = new Image(); // <img>
                image.src = "./images/"+(this.images[j]);  

                //Object Class CARD
                const cardOb=new Card(CardsATag[j]);                              
                
                const flipCardUp = evt => {

                    const id=parseInt(evt.target.id.split("_")[1]);  //Take the number ID;                                         

                    if(!cardOb.isBlankOrRevealed()){                            
                        
                        if(flippedCard.turn==1  && id!==flippedCard.card2){//To validate the turn 1 and the card choosen must not be the same (double click or choose the same card)    
                            //FIRST TURN(card): fade out the back image and show (fade in) the first image to compare
                            $(`#img_${id}`).fadeOut(500,()=>{
                                $(`#img_${id}`).attr('src',"./images/"+this.images[id]).fadeIn(500);  
                            });
                            firstCard = cardOb;
                            flippedCard.turn=2;
                            flippedCard.card1=id;       
                        }else if(flippedCard.turn==2 && id!==flippedCard.card1){//To validate the turn 2 and the card choosen must not be the same (double click or choose the same card)
                            
                            //SECOND TURN(card): fade out the back image and show (fade in) the second image to compare, and go to compare function (cardMatch())
                            $(`#img_${id}`).fadeOut(500,()=>{
                                $(`#img_${id}`).attr('src',"./images/"+this.images[id]).fadeIn(500,cardsMatch);            
                            });
                            secondCard=cardOb;
                            flippedCard.turn=1;
                            flippedCard.card2=id;            
                        }
                    }
                }
                
                //flipCardUp function
                link.addEventListener("click", flipCardUp);  //Add event listerner for each image    
                
                const cardsMatch=()=>{
                   
                    //increse number of attemps
                    scores.increaseAttempt();
                    $("#attemp").text(`Attemps: ${scores.getAttempt()}`);
                    //Compare if the cards are the same (compare the image name) using the ID for each card
                    //if(this.images[flippedCard.card1]==this.images[flippedCard.card2]){
                    if(cardOb.cardsMatch(firstCard,this.images)){
                                
                        const id1=flippedCard.card1;
                        const id2=flippedCard.card2;
                
                        //fade in the back image
                        $(`#img_${id1}`).delay(1000).fadeOut(500,()=>{
                             $(`#img_${id1}`).attr('src',"./images/blank.png").fadeIn(1000);
                         });
                         $(`#img_${id2}`).delay(1000).fadeOut(500,()=>{
                             $(`#img_${id2}`).attr('src',"./images/blank.png").fadeIn(1000);
                         });
                        
                        
                        scores.increaseCorrect();
                        $("#correct").text(`Corrects: ${scores.getCorrect()}`);
                        //Remove event listener click for both cards using the ID
                        //document.querySelector(`#a_${id1}`).removeEventListener("click",flipCardUp);
                        //document.querySelector(`#a_${id2}`).removeEventListener("click",flipCardUp);
                
                        //To validate if the player match all the cards
                        //console.log("cards per game ",settings.cardsPerGame());
                        if(scores.getCorrect()==(settings.cardsPerGame()/2)){
                                        
                            //Save new high score            
                            if(scores.getScore()>settings.getHighScore()){
                                settings.setHighScore(scores.getScore());//Replace the high score
                                $("#cards").html(`New High Score. <b>Player ${settings.getNamePlayer()} with Score: ${settings.getHighScore()}%</b>`);//Display message about the New High Score
                                settings.displayHighScore();
                            }
                            else{
                                $("#cards").html(`Well Done, <b>your score was ${scores.getScore()}</b>, try again to break the highscore ${settings.getHighScore()}%`);//Display message to encourage playing again
                            }
                            //Reset correct and attemp
                            scores.setAttempt();
                            scores.setCorrect();
                        }
                    }
                    else{
                        //Flip down if the player 
                        flipDown();
                        //Reset turn and chosen cards for each turn
                        flippedCard={turn:1,card1:"",card2:""};
                        firstCard=null;
                        secondCard=null;
                    }
                }

                const flipDown=()=>{
    
                    //Take the id of chosen cards
                    const id1=flippedCard.card1;
                    const id2=flippedCard.card2;
                
                    //Fadeout the card choosen, using the ID in IMG tag     
                    $(`#img_${id1}`).delay(2000).fadeOut(500,()=>{
                        $(`#img_${id1}`).attr('src',"./images/back.png").fadeIn(500);
                    });   
                    
                    $(`#img_${id2}`).delay(2000).fadeOut(500,()=>{
                        $(`#img_${id2}`).attr('src',"./images/back.png").fadeIn(500);
                    });   
                }
            }
            
        },
        shuffleCards(numCards){
    
            this.images=cards.slice(0,numCards);
            this.images=(this.images).concat([...this.images]);//two of the same card to get pairs
            //Fisher–Yates shuffle algorithm
            for (let i = this.images.length - 1; i > 0; i--) {//it loops through from last position to the first position
                const j = Math.floor(Math.random() * (i + 1)); //for each position, te generates a random number between 0 and the current index
                [this.images[i], this.images[j]] = [this.images[j], this.images[i]]; // swap positions using current index and random index
            }
        },
        imagesArray(){
            return this.images;
        },
        
        
    };
})();

export {cardsObj};