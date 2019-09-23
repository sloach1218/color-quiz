//variabls to store quiz score and question nmber
let score = 0;
let questionNumber = 1;

//begin quiz when user clicks start
function start (){
    $('.startQuiz').on('click', function (event){
        $('.questionWrap p').hide();
        $(this).hide();
        generateQuestion();
        $('p.questionTracker').show();
        $('p.scoreTracker').show();
        $('#submit').show();
        $('.qNumber').text(questionNumber);
        
    })
}

//generate quiz question
function generateQuestion(){
    //use current questionNumber to find values in STORE
    let question = STORE[questionNumber - 1].question;
    let userOptions = createUserOptions();
    
    //generate html and insert values of question
    
    $('.questionWrap').prepend(
        `<p class="question">${question}</p><form id="colorQuestions">${userOptions}</form>`);
    
    
}

//create userOptions
function createUserOptions(){
    let options = STORE[questionNumber - 1].possibleAnswers;
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
        let correctUserAnswer = STORE[questionNumber - 1].correctAnswer;
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
        `<p class="feedback">Correct! Nice job!</p>
        <button type="button" class="nxtbtn">Next</button>`
    );
    updateScore();
}
//if wrong answer
function wrongAnswer(){
    let correctUserAnswer = STORE[questionNumber - 1].correctAnswer;
    $('#submit').hide();
    $('form').after(
        `<p class="feedback">Sorry! That is incorrect!</p>
        <p class="feedback">The correct answer is:<br>${correctUserAnswer}</p>
        <button type="button" class="nxtbtn">Next</button>`
    );
    
}
//go to next question
function nextQuestion(){
        $('.questionWrap').on('click','.nxtbtn', function(){
            event.preventDefault();
            if(questionNumber < STORE.length){
                $('#colorQuestions, p.question, .nxtbtn, .feedback').remove();
                $('#submit').show();
                updateQuestionNumber();
                generateQuestion();
            } else {
                quizResults();
            }
        })
        } 


//function to show results and option to retake
function quizResults (){
        $('#colorQuestions, p.question, .nxtbtn, .feedback').remove();
        $('.questionTracker, .scoreTracker').hide();
        
        if (score === 5){
            $('.questionWrap').prepend('<p class="feedback">Nice job! You got a perfect score of 5 out of 5!</p>');
        } else {
            $('.questionWrap').prepend(`<p class="feedback">Your score is: ${score} out of 5.</p>`);
        };
        $('.questionWrap').append('<button type="button" class="resetbtn">Retake Quiz</button>');
    
}

//if retake is clicked, reset
function resetQuiz (){
    $('.questionWrap').on('click','.resetbtn', function(){
        $('.resetbtn, .feedback').remove();
        resetNumbers();
        
        $('.questionTracker, .scoreTracker').show();
        generateQuestion();
        $('#submit').show();
    })
}
function resetNumbers(){
    score = 0;
    questionNumber = 1;
    $('.qNumber').text(questionNumber);
    $('.score').text(score);
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
    resetQuiz();
}

$(handleQuizApp);