

//variables
var lives = 3;
var score = 0;
var x = randomNumber(20, 240);
var y = randomNumber(20, 370);
var randomTime = randomNumber(6000, 9000);
var randomTime2 = randomNumber(15000, 17000);
var randomTime3 = randomNumber(9000, 18000);
var randomTime4 = randomNumber(5000, 10000);
var seconds = 60;
var boneCost = 10;
var livesCost = 15;


//function calls
setInitialValues();
setRandPosition("konaPic");
distractorImage("dingo", randomTime, 1000);
distractorImage("foxImage", randomTime2, 1000);
distractorImage("wolfPic", randomTime3, 1000);
distractorImage("corgi", randomTime4, 1000);
checkCorrectImg();
storePurchase();

//functions
function changeRandTime() {
  timedLoop(5000, function() {
    randomTime = randomNumber(6000, 9000);
    randomTime2 = randomNumber(15000, 18000);
    randomTime3 = randomNumber(9000, 18000);
    randomTime4 = randomNumber(5000, 10000);
  });
}
function updateScore(){
  setText("scoreLabel", "Score : " + score);
  setText("numLives", "Attempts : " + lives);
}
function setRandPosition(image){
 timedLoop(6000, function(){
  x = randomNumber(20, 240);
  y = randomNumber(20, 370);
  setPosition("konaPic", x , y , 100, 100);
  setPosition(image, x , y , 100, 100);
});
}

function setInitialValues() {
  lives = 3;
  score = 0;
  setText("scoreLabel", "Score : " + score);
  setText("numLives", "Attempts : " + lives);
  seconds = 60;
  hideElement("dingo");
  hideElement("foxImage");
  hideElement("wolfPic");
  hideElement("corgi");
}
function setInitialValuesFromStore() {
  score = 0;
  setText("scoreLabel", "Score : " + score);
  setText("numLives", "Attempts : " + lives);
  hideElement("dingo");
  hideElement("foxImage");
  hideElement("wolfPic");
}
//algorithm
function distractorImage(image, time, time2) {
  timedLoop(time, function(){
  changeRandTime();
  hideElement(image);
  setRandPosition(image);
  hideElement("konaPic");
  showElement(image);
  setTimeout(function() {
    hideElement(image);
    showElement("konaPic");
     if (seconds === 0) {
    setScreen("loseScreen");
  }
  if (score == 10 ){
    setScreen("winScreen");
  }
  }, time2);
});
}
function timer(){
  timedLoop(1000, function() {
  seconds--;
  setText("timeLabel", seconds + " Seconds");
  if (seconds === 0) {
    setScreen("loseScreen");
  }
  if (score == 15){
    setScreen("winScreen");
  }
  if (lives === 0){
    setScreen("loseScreen");
  }
});
}
function slowerRandPosition() {
  timedLoop(8000, function(){
  x = randomNumber(20, 240);
  y = randomNumber(20, 370);
  setPosition("konaPic", x , y , 100, 100);
  });
}
function updateStore(item) {
  item = item * 1.5;
  setText("purchaseBone", "Purchase : - " + item + "  seconds" );
  seconds = 60 - 10;
}



//all on Events place here
onEvent("konaPic", "click", function() {
  setRandPosition("konaPic");
  score ++;
  setText("scoreLabel", "Score : " + score);
  if (score == 10){
    setScreen("winScreen");
  }
  if (lives === 0){
    setScreen("loseScreen");
  }
});
//sequencial app process
onEvent("startButton", "click", function() {
  setScreen("gameScreen");
  setInitialValues();
  timer();
});
onEvent("instructionButton", "click", function() {
  setScreen("instructionScreen");
});
onEvent("background", "click", function() {
  lives = lives - 1;
  updateScore();
  if (score == 10){
    setScreen("winScreen");
  }
  if (lives === 0){
    setScreen("loseScreen");
  }
});
onEvent("playAgain", "click", function() {
  setScreen("gameScreen");
  setInitialValues();
  timer();
  distractorImage("dingo", randomTime, 1000);
  distractorImage("foxImage", randomTime2, 1000);
  distractorImage("wolfPic", randomTime3, 1000);
  distractorImage("corgi", randomTime4, 1000);
});
onEvent("tryAgainBtn", "click", function() {
  setScreen("gameScreen");
  setInitialValues();
  timer();
});
onEvent("playButton", "click", function() {
  setScreen("gameScreen");
  setInitialValuesFromStore();
  timer();
  distractorImage("dingo", randomTime, 1000);
  distractorImage("foxImage", randomTime2, 1000);
  distractorImage("wolfPic", randomTime3, 1000);
  distractorImage("corgi", randomTime4, 1000);
});

//distracor images onEvents
function checkCorrectImg() {
  onEvent("foxImage", "click", function() {
  lives--;
  setText("numLives", "Attempts : " + lives);
  
});

onEvent("dingo", "click", function() {
  lives--;
  setText("numLives", "Attempts : " + lives);
});

onEvent("wolfPic", "click", function() {
  score--;
  setText("numLives", "Attemps : " + lives);
});
onEvent("corgi", "click", function() {
  lives--;
   setText("numLives", "Attempts : " + lives);
});
}


//store onEvents
onEvent("storeButton", "click", function() {
  setScreen("storeScreen");
  seconds = 60;
  setText("timeLabel", seconds + " : Seconds");
  setInitialValues();
});
function storePurchase(){
onEvent("purchaseBone", "click", function() {
  updateStore(boneCost);
  updateScore();
  stopTimedLoop();
  slowerRandPosition();
});

onEvent("purchaseLives", "click", function() {
  updateStore(livesCost);
  seconds = 60-15;
  lives = 3 + 2;
  updateScore();
});
}


// Resources 
//Dingo image : https://www.google.com/search?q=dingo&rlz=1C1GGRV_enUS758US758&tbm=isch&source=lnt&tbs=sur:fc&sa=X&ved=0ahUKEwixuv-V2ZvaAhUDRKwKHZSjDasQpwUIHg&biw=1600&bih=745&dpr=1&safe=active&ssui=on#imgrc=kpttg7_tZYgkfM:
//Doge background : https://www.google.com/search?rlz=1C1GGRV_enUS758US758&biw=1600&bih=794&tbm=isch&sa=1&ei=67vMWrnJAujs_QbP76Qo&q=doge+background&oq=doge+background&gs_l=psy-ab.3..0l4j0i30k1l2j0i5i30k1l4.1001.6423.0.6598.34.24.5.1.1.0.335.2863.0j10j4j1.17.0....0...1c.1.64.psy-ab..12.20.2655.0..0i67k1j0i10k1.170.fI-DCAr8if4&safe=active&ssui=on#imgrc=OOarGFC2oTljcM:
//Wolf photo : https://www.google.com/search?q=transparent+wolf+image&rlz=1C1GGRV_enUS758US758&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiYlcaxqLLaAhWkhOAKHUktBIkQ_AUICigB&biw=1600&bih=794&safe=active&ssui=on#imgrc=c9o7gRdnoGb-WM:
//Fox image : https://www.google.com/search?rlz=1C1GGRV_enUS758US758&biw=1600&bih=794&tbm=isch&sa=1&ei=-wvOWsGxEc7r_QbqiriwDw&q=transparent+fox+image&oq=transparent+fox+image&gs_l=psy-ab.3..0i7i30k1j0i8i7i30k1l9.50480.52063.0.52174.7.7.0.0.0.0.212.649.0j3j1.4.0....0...1c.1.64.psy-ab..3.4.648...0.0.VdsJTFOMLXc&safe=active&ssui=on#imgrc=MfzAdzlEUpqbVM:
//Corgi image : https://www.google.com/search?q=transparent+corgi+image&rlz=1C1GGRV_enUS758US758&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjSroTpqrfaAhVRTd8KHZX8DMoQ_AUICigB&biw=1600&bih=794&safe=active&ssui=on#imgrc=0PiqD_DsQC3LNM:



