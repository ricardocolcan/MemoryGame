export class Card {
    constructor(aTag) {
      this.img = $(aTag).find("img")[0];
      this.id = $(aTag).attr("id");
    }

    //Validate is the image is revelated
    //I was not need it coz in my code I remove the event listener qhen match..but I change it to create according the instructions
    isBlankOrRevealed(){
        if(this.img.src.split("/images/")[1] === "blank.png"){
            return true;
        }
        return false;
    }
    //Match the images. I need to pass images array, 
    //because my code dont compare ID to match cards, my code compare the image card name so if you see teh web browser
    // with inspect code, you can not cheat to match cards
    cardsMatch(firstCard,images){
        if(images[this.id.split("_")[1]]===images[firstCard.id.split("_")[1]]){
            return true;
        }
        return false;
    }

}