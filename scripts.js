
//******************************
//oragnizing the buttons into their future eventlistener functions
//******************************
const allNums = document.querySelectorAll('.numb');
const allOper = document.querySelectorAll('.oper');
const allEqual = document.querySelector('#equals');
const allClr = document.querySelector('#clear');
const allDec=  document.querySelector('#dec');

//******************************
//the NUMBER buttons. adds them to answer box as innertext.
//******************************
for (let i = 0; i < allNums.length; i++){
  allNums[i].addEventListener('click', function(ev){
    let newText = ev.target.innerText;
    document.getElementById('answer').innerText += newText;
  });
}

//******************************
//the OPERAND buttons. adds it to answer element if doesn't exist yet.
//******************************
for (let k = 0; k < allOper.length; k++){
  allOper[k].addEventListener('click', function(ev){

    //turn answer string into an array of single characters.
    let newText = ev.target.innerText;
    let tempString = document.getElementById('answer').innerText;
    let tempArray = tempString.split('');

    //if an operand exists, return false. else keep going in the function.
    for (let j = 0;  j < tempArray.length; j++){
      if (('+' === tempArray[j]) || 
          ('-' === tempArray[j]) || 
          ('*' === tempArray[j]) || 
          ('/' === tempArray[j]) ){
        return false;
      }
    }
    //update answer box with chosen operand.
    document.getElementById('answer').innerText += newText;
  });
}



//******************************
//the CLR button. simply clears the answer innertext.
//******************************
allClr.addEventListener('click', function(){
  document.getElementById('answer').innerText = '';
})



//******************************
//The DEC button. adds decimal to answer text if doesn't exist in the number yet. checks both halfs of an expression.
//******************************
allDec.addEventListener('click', function(ev){
  let newText = ev.target.innerText;
  let tempString = document.getElementById('answer').innerText;

  //split the answer text into an array so we can search for specific characters.
  let aArray = tempString.split('');

  //will search the first expression for a decimal. it will first make sure there isn't an operand. then this will add the decimal if there is not already a decimal.
  function testFirstHalf(){

    //let a var k = 0. if i hit any of the special characters in the for loop then i change the value of k. that means i know to not add a decimal for the first expression.
    let k = 0;
    for (let q = 0; q < aArray.length; q++){
      if(('+' === aArray[q])|| 
        ('-' === aArray[q]) || 
        ('*' === aArray[q]) || 
        ('/' === aArray[q]) ||
        ('.' === aArray[q] )){
          k = 1;
      }
    }
    if (k === 0){
      document.getElementById('answer').innerText += newText;
      }
  }
  
  //searches for operand and then decimal in second expression. if it finds an operand, it will create a subarray of the second expression and search that subarray for a decimal. it will add a decimal to the answer text if one doesn't exist yet.
  function testSecondHalf(){
      for (let p = 0; p < aArray.length; p++){
        if(('+' === aArray[p])|| 
          ('-' === aArray[p]) || 
          ('*' === aArray[p]) || 
          ('/' === aArray[p]) ){
            let secondHalfArray = []
            secondHalfArray = aArray.slice([(p+1), ]);
  
            if(secondHalfArray.includes('.') === false){
              document.getElementById('answer').innerText += newText;
            }
        }
      }
    }
  //run both functions.
  testFirstHalf();
  testSecondHalf();
})



//****************************************
//$$$ THE EQUALS BUTTON BABY FINALLY $$$ *
//****************************************
allEqual.addEventListener('click', function(){

  //make a variable for answer innertext string.
  let answerString = document.getElementById('answer').innerText;


  //This splits the answer string into an array looking like array=["first num", "operand", "second num"]. it is a bit complicated because i'm not a regex expert yet. it works because if after each operand attempt the array still has length 1, it will attempt to search for the true operand.
  let answerArray = answerString.split(/(\+)/); 

  if (answerArray.length < 2){
    answerArray = answerString.split(/(\-)/)}

  if (answerArray.length < 2){
    answerArray = answerString.split(/(\/)/)}

  if (answerArray.length < 2){
    answerArray = answerString.split(/(\*)/)}


  //convert strings to numbers. i checked to see if the math object had anything that didn't use rounding or absolute value but didn't find anything useful. so i tried parseFloat. I thought it would add decimals to integers but it doesn't so it's a more elegant solutuion!
  answerArray[0] = parseFloat(answerArray[0]);
  answerArray[2] = parseFloat(answerArray[2]);


  //do some calculations FINALLY... 
  let finalAnswer = 0;
  if (answerArray[1] === '+'){
    finalAnswer = answerArray[0] + answerArray[2]}

  if (answerArray[1] === '-'){
    finalAnswer = answerArray[0] - answerArray[2]}

  if (answerArray[1] === '*'){
    finalAnswer = answerArray[0] * answerArray[2]}

  if (answerArray[1] === '/'){
    finalAnswer = answerArray[0] / answerArray[2]}
  
    
  //up to two decimal places if its a float. else normal int answer. send this answer in the answer text window.
  if (Number.isInteger(finalAnswer) === true){
    document.getElementById('answer').innerText = finalAnswer}

  else{
    finalAnswer = finalAnswer.toFixed(2);
    document.getElementById('answer').innerText = finalAnswer}
})

/*******************************
//OLD STUFF MAYBE KEEP FOR NOW?

let answerArray = answerText.split(/(\D)/);

note: a good regex attempt at splitting answer array amongst the operand but it will also get the decimal which is bad. 

*******************************/