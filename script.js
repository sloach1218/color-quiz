//variabls to store quiz score and question nmber
let score = 0;
let questionNumber = 0;

//begin quiz when user clicks start
function start (){
    $('.startQuiz').on('click', function (event){
        $('.question p').hide();
        $(this).hide();
        generateQuestion();
        $('p.questionTracker').show();
        $('p.scoreTracker').show();
        $('#submit').show();

    })
}


//generate quiz question
function generateQuestion(){
    //use current questionNumber to find values in STORE
    let question = STORE[questionNumber].question;
    let userOptions = createUserOptions();
    
    //generate html and insert values of question
    
    $('.question').prepend(
        `<p>${question}</p><form id="colorQuestions">${userOptions}</form>`);
    
    $('.submitScore').show()
}

//create userOptions
function createUserOptions(){
    let options = STORE[questionNumber].possibleAnswers;
    let possibleOptions = '';
    for(let i = 0; i < options.length; i++){
        possibleOptions = `<label for="option${i+1}"><input type="radio" name="options" id="option${i+1}" value="${options[i]}" tabindex="${i+1}">
                ${options[i]}</label>` + `${possibleOptions}`}
    return possibleOptions;
    
}


//watch for event of user to choose answer
//only allow one answer to be chosen?
//evaluate if correct or not
function submitAnswer(){
    $('#submit').on('click', function (event){
        event.preventDefault();
        let selected = $('input:checked');
        let userAnswer = selected.val();
        let correctUserAnswer = STORE[questionNumber].correctAnswer;
        if (userAnswer === correctUserAnswer){
            rightAnswer();
        } else {
            wrongAnswer();
        }
    })
}

//if correct answer response 
function rightAnswer(){
    $('#submit').hide();
    $('form').after(
        `<p>Correct!</p>
        <button type="button" class="nxtbtn">Next</button>`
    );
    updateScore();
}
//if wrong answer
function wrongAnswer(){
    let correctUserAnswer = STORE[questionNumber].correctAnswer;
    $('#submit').hide();
    $('form').after(
        `<p>Incorrect!</p>
        <p>The correct answer is: ${correctUserAnswer}</p>
        <button type="button" class="nxtbtn">Next</button>`
    );
    
}
//go to next question
function nextQuestion(){
    $('.question').on('click','.nxtbtn', function(){
        $('.question').remove();
        updateQuestionNumber();
        generateQuestion();
        
        
    })
}

//update the question number by one
//also updates the number in the view
function updateQuestionNumber(){
    questionNumber++;
    $('.qNumber').text(questionNumber);
}

//update the score by one
function updateScore(){
    score++;
    $('.score').text(score);
}



//handles the app
function handleQuizApp(){
    start();
    submitAnswer();
    nextQuestion();
}

$(handleQuizApp);