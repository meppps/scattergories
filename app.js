// const { start } = require("repl");

document.body.style.cssText = 'margin: 0; padding: 0;';


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
document.querySelector('button.letterGenBtn').addEventListener('click',()=>{
    letter.innerHTML = randomLetter();
});


// Scattergories
var list1 = ["Boy's Name","Color","School Subject","Breakfast Food","TV Show","Animal","Country","School Supply","Something at a picnic","Things that are cold"];
var list2 = ['Fruit','Clothing','Dessert','Items in a Fridge','Ways to get from A to B','Movie','Kind of Weather','Things you don’t want in the house','Pizza Topping','Nickname'];
var list3 = ['People you admire','Things you learned as a kid','Item on a menu','Found at the beach','Comes in pairs or sets','Things that need to be cleaned','Insect','Items in a kitchen','Music Group','Actor'];
var list4 = ['Beverage','Something you drive','City','Someplace you spend your money','Cartoon Character','Sea Creature','Comedy Movie','Children\'s Book','Girl\'s','Ice Cream Flavor'];


// lists
var songList = ['mission.mp3','bourne.mp3','jamesbond.mp3','24.mp3','indiana.mp3','seinfeld.mp3','nfl.mp3'];
var masterList = [list1,list2,list3,list4];
var teamList = [];
var timesUp = false;
var animationComplete = false;

// Show list
function outputList(list){
    var section = document.querySelector('.listSection');
    section.innerHTML = '';

    wordCount = 1;
    list.forEach((word)=>{
        
        var h3 = document.createElement('h3');
        h3.innerText = `${wordCount}. ${word}`;
        section.appendChild(h3);
        wordCount += 1;
    });

};

// Flip thru list
document.querySelector('.showList').addEventListener('click',()=>{
    if(!masterList.length==0){
        outputList(masterList[0]);
        masterList.shift();
    }else{
        document.querySelector('.listSection').innerText = 'Thats it.'
    }
    
});





// Countdown timer w/ music
document.querySelector('.timerBtn').addEventListener('click',()=>{

    // Timer duration (secs)
    var duration = 120;
    var display = document.querySelector('h1.time');
    var timer = duration, minutes, seconds;

    var audio = new Audio(songList[0]);
    audio.play();
    songList.shift();


    var interval = setInterval(()=>{

        
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;


        // Buzz on time up
        if (--timer < 0) {
            timer = duration;            
            audio.pause();
            var buzzer = new Audio('buzzer.mp3');
            buzzer.play();
            timesUp = true;
            clearInterval(interval);
        }
        
    },1000)

});


// Scoreboard object
function ScoreBoard(){

    this.el = document.querySelector('table.scoreboard');
    
    // Add a new team row)
    this.addNew = function(team){
        this.newTeam = team;
        var name = team.name;
        var newRow = document.createElement('tr');
        this.newRow = newRow;

        newRow.innerHTML = `<td>${team.name}</td><td>${team.score}</td><td><input type="text" class="addPoints"></td>`;
        this.el.appendChild(newRow);

        team.scoreBox = newRow.childNodes[1];

        // Update score
        document.querySelector('button.updateScore').addEventListener('click',()=>{
            var pointsToAdd = Number(newRow.childNodes[2].children[0].value);         
            team.addPoints(pointsToAdd);
            newRow.childNodes[2].children[0].value = 0;
        })         
    }
}


// Team object
function Team(name){
    this.name = name;
    this.score = 0;
    this.scoreBox = null;

    this.addPoints = function(points){
        this.score += points;
        this.scoreBox.innerText = `${this.score}`;
    }
}





document.querySelector('.addTeam').addEventListener('click',()=>{
    var teamName = document.querySelector('input#newTeamName').value;
    var team = new Team(teamName);
    scoreboard.addNew(team);
    teamList.push(team);   
    document.querySelector('input#newTeamName').value = '';
});


// Enter to conf
document.querySelector('input#newTeamName').onkeydown = function(e){
    console.log(e.keyCode)
        if(e.keyCode === 13){
            document.querySelector('.addTeam').click();
        }
    }


// Winner
document.querySelector('.confetti').addEventListener('click',()=>{

    // homes.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    var winners = teamList.sort((a, b) => b.score - a.score);
    var leaderboard = document.createElement('div');
    leaderboard.classList.add('leaderboard');
    leaderboard.classList.add('generator');
    leaderboard.innerHTML =`
    <h2>Winner</h2>
    <table class="winners">
    <tr><th>Name</th><th>Score</th></tr>
    <tbody>
    <tr><td><h3 class="winnerName">1. ${winners[0] ? winners[0].name : ''}</h3></td><td>${winners[0] ? winners[0].score : ''}</td></tr>
    <tr><td><h3 class="winnerName">2. ${winners[1] ? winners[1].name : ''}</h3></td><td>${winners[1] ? winners[1].score : ''}</td></tr>
    <tr><td><h3 class="winnerName">3. ${winners[2] ? winners[2].name : ''}</h3></td><td>${winners[2] ? winners[2].score : ''}</td></tr>
    
    </tbody>
    `;


    document.querySelector('div.leaderboardArea').appendChild(leaderboard);


    

    var css = '.sect2 { opacity: 0.1; }',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');
    head.appendChild(style);
    style.appendChild(document.createTextNode(css));

    leaderboard.style.top = '-230px';
    let timer = setInterval(function() {

        var px = Number(leaderboard.style.top.replace('px',''));
        animationComplete = px > 110;
        if (animationComplete){ clearInterval(timer)}
        else{
            
            var increase = px += 2.5;
            leaderboard.style.top = `${increase}px`
            
        }
      }, 10); // change by 2px every 20ms, about 50 frames per second

      var cheer = new Audio('celebrate.mp3');
    cheer.play();


    confetti.start();
    setTimeout(()=>{
     confetti.stop();   
    },5000);




})




var scoreboard = new ScoreBoard();

