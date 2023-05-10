import {scores} from './library_scores.js';

const settings ={
    
    saveDataGame:function(memorySettings){//Save the game info directly to session storage
        const jsonMemorySettings=JSON.stringify(memorySettings);
        sessionStorage.setItem("memory",jsonMemorySettings);  
            
    },
    getNamePlayer:function(){//To get the name directly from session storage
        let memorySettings=JSON.parse(sessionStorage.getItem("memory"));
        return memorySettings.player; 
    },
    cardsPerGame:function(){ //To get how many cards we are going to use for the game
        let memorySettings=sessionStorage.getItem("memory");
        memorySettings=JSON.parse(memorySettings);
        return parseInt(memorySettings.cards);
    },
    sessionExist:function(){//To know if there is session in the browser Key: memory
        const exist=sessionStorage.getItem("memory");  
        return exist==null?false:true; 
    },
    getHighScore:function(){//Get the high score
        return parseInt(JSON.parse(sessionStorage.getItem("memory")).highScore);
    },
    setHighScore:function(score){
        let memorySettings=JSON.parse(sessionStorage.getItem("memory"));
        memorySettings.highScore=score;//Replace the high score
        this.saveDataGame(memorySettings);
    },
    displayName:function(){//Display the name on main page
        $("#player").text(`Player: ${this.getNamePlayer()}`);
    },
    displayHighScore:function(){
        $("#high_score").text(`High Score: ${this.getHighScore()}%`);
        $("#correct").text(`Corrects: ${scores.getCorrect()}`);
        $("#attemp").text(`Attemps: ${scores.getAttempt()}`);
    }

};

export {settings};