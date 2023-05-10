import {settings} from './library_settings.js';
import {cardsObj} from './library_cards.js';

$(document).ready(()=>{
    //Create Tabs
    $("#tabs").tabs();    
    
    //Validate if exist to display name, highscore and cards
    if(settings.sessionExist()){
        settings.displayName();
        settings.displayHighScore();
        cardsObj.displayCards(settings.cardsPerGame()/2);
    }else{
        //By default display 24 cards
        cardsObj.displayCards(48/2);
    }

    $("#save_settings").click(()=>{
        
        //To validate if the name is empty
        if($("#player_name").val()!=""){
            
            if(!settings.sessionExist()){//Validate if the session exist (first game session)          
                
                //Save data in "memory" session 
                settings.saveDataGame({
                    player:$("#player_name").val(),
                    cards:$("#num_cards").val(),
                    highScore:0
                });             
            }else{//Keep the high score
                
                //Save data in "memory" session
                settings.saveDataGame({
                    player:$("#player_name").val(),
                    cards:$("#num_cards").val(),
                    highScore:settings.getHighScore()
                });
            }
                        
            //Reload and start (display cards) the game after save
            location.reload();
        }
        else{
            $("#player_name").next().text("Player name must not be empty");
            $("#player_name").focus();
        }               

    });
});