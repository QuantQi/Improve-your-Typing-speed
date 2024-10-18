// helpers.js

// Helper functions

function getFingerNumber(row,currentCharIndex) {
   
    //for left hand
    for(let index = 0; index < row.length; index++){
       
        let midPoint = Math.floor((row.length - 1 ) / 2);
      //  console.log('midPoint: '+midPoint);
        //for left hand
        if(currentCharIndex <= midPoint){
           return Math.min(4,Math.Max(midPoint - currentCharIndex,1));
        }else{ // for right hand
            return Math.min(4,Math.Max(currentCharIndex - midPoint,1));
        }
    }
}

function isLeftHand(row,currentCharIndex) {
    return currentCharIndex <= Math.floor(row.length / 2);
}

function flashRed(element) {
    element.classList.add('flash-red');
    setTimeout(() => {
        element.classList.remove('flash-red');
    }, 1000); // Flash red for 1 second
}




