
document.body.style.cssText = 'margin: 0; padding: 0;'


function randomNum(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomLetter(){
    return map[randomNum(1,26)];
}

var map = {
    1:'A',
    2:'B',
    3:'C',
    4:'D',
    5:'E',
    6:'F',
    7:'G',
    8:'H',
    9:'I',
    10:'J',
    11:'K',
    12:'L',
    13:'M',
    14:'N',
    15:'O',
    16:'P',
    17:'Q',
    18:'R',
    19:'S',
    20:'T',
    21:'U',
    22:'V',
    23:'W',
    24:'X',
    25:'Y',
    26:'Z'
}
var letter = document.querySelector('.letter');
document.querySelector('.button').addEventListener('click',()=>{
    letter.innerHTML = randomLetter();
});




