// Create the question and answer objects
var correctAnswers = [
	null,
	'\"Anything that can go wrong, will go wrong.\"',
	'They look like they want to be elsewhere.',
	'Label all heavy items as \"Lighting\".',
	'Tell the client \"No\".',
	'Sell beer.',
	'All of the above.',
	'Try to catch a nap or have a snack.',
	'There is no lunch or dinner break.',
	'Throw it in the garbage.',
	['Huh?', 'What?', 'I dunno.', 'Eh.'],
	null
]


function createQuizItems(){
	function QuizItem(question, answers, location) {
		this.question = question;
		this.answers = answers;
		this.location = location;
	};
// can create array for all quiz items and not use constructor
	var intro = new QuizItem('Welcome to this incredible quiz; now shut up and hang on.',
		['Choose your answer carefully',
		'Only the penitent man will pass.',
		'Good luck!'],
		 null
	);

	var q1 = new QuizItem('What is Murphy\'s Law?',
		['&quot;The road to success and the road to failure are almost exactly the same.&quot; ',
		'&quot;Anything that can go wrong, will go wrong.&quot;',
		'&quot;Two wrongs don&#39;t make a right.&quot;',
		'&quot;Hope for the best, but prepare for the worst.&quot;'],
		'1 of 10'
	);

	var q2 = new QuizItem('How can you tell, without question, if someone is allowed access?',
		['They will have a proper badge or pass.',
		'Security will let them in if it&#39;s ok.',
		'They look like part of the band.',
		'They look like they want to be elsewhere.'],
		'2 of 10'
	);

	var q3 = new QuizItem('As an audio tech, how can you avoid injury lifting heavy equipment?',
		['Label all heavy items as &quot;Lighting&quot;.',
		'Lift with your legs, never your back.',
		'Have someone help you lift.',
		'Try harder.'],
		'3 of 10'
	);

	var q4 = new QuizItem('Video content is on the way, when should you test it?',
		['As soon as possible.',
		'1 hour before show.',
		'10 minutes before show.',
		'Tell the client &quot;No&quot;.'],
		'4 of 10'
	);

	var q5 = new QuizItem('How do you make money in the music business?',
		['Hard work and dedication.',
		'Sell beer.',
		'Networking -It&#39;s who you know that counts.',
		'Knowledge - Folks will value your skills.'],
		'5 of 10'
	);

	var q6 = new QuizItem('If a patron requests a change to the mix, what should you do?',
		['Ignore them.',
		'Pretend to make an adjustment.',
		'Have security escort them out of the event.',
		'All of the above.'],
		'6 of 10'
	);

	var q7 = new QuizItem('Lighting is taking a long time to load out, what should you do?',
		['Jump in and help wrap some cables.',
		'Try to catch a nap or have a snack.',
		'Offer to help tear down fixtures.',
		'Push cases to the truck.'],
		'7 of 10'
	);

	var q8 = new QuizItem('When should you schedule your lunch or dinner break?',
		['There is no lunch or dinner break.',
		'Mid-day.',
		'During intermission or set change.',
		'After the event is complete.'],
		'8 of 10'
	);

	var q9 = new QuizItem('An artist shows up with a tom drum that is not part of the drum kit, you should:',
		['Make sure you have a microphone for it.',
		'Add some low end EQ for maximum impact.',
		'Throw it in the garbage.',
		'Make sure it is tuned properly.'],
		'9 of 10'
	);

	var q10 = new QuizItem('When was the last time you got enough sleep?',
		['Huh?',
		'What?',
		'I dunno.',
		'Eh.'],
		'10 of 10'
	);

	var end = new QuizItem('Well, you made it to the end. See your results below:',[
		'01. ' + q1.question + '<br>Correct Answer: <span class=correct-answer id=a1></span>' + '<br>Your Answer: <span class=youranswer id=1></span>',
		'02. ' + q2.question + '<br>Correct Answer: <span class=correct-answer id=a2></span>' + '<br>Your Answer: <span class=youranswer id=2></span>',
		'03. ' + q3.question + '<br>Correct Answer: <span class=correct-answer id=a3></span>' + '<br>Your Answer: <span class=youranswer id=3></span>',
		'04. ' + q4.question + '<br>Correct Answer: <span class=correct-answer id=a4></span>' + '<br>Your Answer: <span class=youranswer id=4></span>',
		'05. ' + q5.question + '<br>Correct Answer: <span class=correct-answer id=a5></span>' + '<br>Your Answer: <span class=youranswer id=5></span>',
		'06. ' + q6.question + '<br>Correct Answer: <span class=correct-answer id=a6></span>' + '<br>Your Answer: <span class=youranswer id=6></span>',
		'07. ' + q9.question + '<br>Correct Answer: <span class=correct-answer id=a7></span>' + '<br>Your Answer: <span class=youranswer id=9></span>',
		'08. ' + q7.question + '<br>Correct Answer: <span class=correct-answer id=a8></span>' + '<br>Your Answer: <span class=youranswer id=7></span>',
		'09. ' + q8.question + '<br>Correct Answer: <span class=correct-answer id=a9></span>' + '<br>Your Answer: <span class=youranswer id=8></span>',
		'10. ' + q10.question + '<br>Correct Answer: <span class=correct-answer id=a10></span>' + '<br>Your Answer: <span class=youranswer id=10></span>',
		],
		null
		// ^ iterate through questions and check CORRECT answers
	);
	return [intro, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, end];
};

// Store Current Question and Answers
var quizItemArr = createQuizItems();
var currentQ = quizItemArr[0];
var yourAnswers = [0];



// Render quiz
	function renderQuestion(item){
		$('.question').text(item.question);
	}

	function renderAnswerList(item) {
		var answerList = [];
		$.each(item.answers, function(i, value){
			// console.log('answer list value: ' + value);
			var answerHTML = '<li class=answer-container><input class=visuallyhidden type=radio name=answer id="'+value+'"><label for="'+value+'"></span>'+value+'</span></label></li>'
			answerList.push(answerHTML);
		});
		$('.answer-list').html(answerList); 

		// INTRO
		if (currentQ == quizItemArr[0]){
			console.log('AT INTRO');
			$('input[type=radio]').attr('disabled', true); // Disable radio selection
			$('#btn-alt').attr('value', 'BEGIN').click(function(){ // Change button value to BEGIN
				nextQuestion();
			});
		}

		// END
		else if (currentQ == quizItemArr[11]){
			console.log('AT END');
			$('input[type=radio]').attr('disabled', true); // Disable radio selection
			$('#btn-submit').addClass('display-none'); // Hide SUBMIT
			$('#btn-alt').removeClass('display-none');
			$('#btn-alt').attr('value', 'RESTART').click(function(){ // Change button to RESTART and link to page to 'refresh'
				window.location.href='';
			});
		}

		// QUESTIONS
		else {
			focusStyles();
			// Display SUBMIT instead of alt buttons
			$('#btn-alt').addClass('display-none');
			$('#btn-submit').attr('value', 'SUBMIT').removeClass('display-none');	
		}

		console.log('ANSWER LIST RENDERED');
	}


	function focusStyles(){
		// Sets checked and focus for first radio button adds style for li and the parent ul
		$('input[type=radio]:first').prop('checked', true).focus().closest('ul').addClass('js-focus');;
		$('input[type=radio]:checked').parent('li').addClass('js-li-focus');

		// Adds custom focus class to UL to indicate entire radio group is in focus
		$('input[type=radio]').focusin(function(){
			$('input[type=radio]').closest('ul').addClass('js-focus');
		});
		$('input[type=radio]').focusout(function(){
			$('input[type=radio]').closest('ul').removeClass('js-focus');
		});
		
		// Toggle visual focus style for selected answer's li
		$('input[type=radio]').change(function(){
		$('input[type=radio]:not(:checked)').parent('li').removeClass('js-li-focus');
		$('input[type=radio]:checked').parent('li').addClass('js-li-focus');
		});
	}

	//Checks answer and returns result along with colored DIV
	function checkAnswer(location, answer) {
		var nextButton = '<input id="btn-next" class="button" type="button" value="Continue">';
		$('#btn-submit').prop('disabled', true);
		if (answer == correctAnswers[location]){
			console.log('CORRECT');
			$('.pop-up').removeClass('incorrect').addClass('enabled correct').html('<h2>CORRECT</h2> <p>'+correctAnswers[location]+'</p>'+nextButton);
			$('#btn-next').click(function(){
				nextQuestion();
			});
		}

		else if (location == 10){
			console.log('ANY ANSWER CORRECT');
			$('.pop-up').removeClass('incorrect').addClass('enabled correct').html('<h2>CORRECT</h2> <p>All answers are correct; get some sleep already!</p>'+nextButton);
			$('#btn-next').click(function(){
				nextQuestion();
			});
		}

		else {
			console.log('INCORRECT');
			$('.pop-up').removeClass('correct').addClass('enabled incorrect').html('<h2>INCORRECT</h2><p>'+correctAnswers[location]+'</p>'+nextButton);
			$('#btn-next').click(function(){
				nextQuestion();
			});
		}
	}

	function renderCorrect(){
		$('#a1').text(correctAnswers[1]);
		$('#a2').text(correctAnswers[2]);
		$('#a3').text(correctAnswers[3]);
		$('#a4').text(correctAnswers[4]);
		$('#a5').text(correctAnswers[5]);
		$('#a6').text(correctAnswers[6]);
		$('#a7').text(correctAnswers[7]);
		$('#a8').text(correctAnswers[8]);
		$('#a9').text(correctAnswers[9]);
		$('#a10').text(correctAnswers[10]);
	}

	function renderYourAnswers(){
		$('#1').text(yourAnswers[1]);
		$('#2').text(yourAnswers[2]);
		$('#3').text(yourAnswers[3]);
		$('#4').text(yourAnswers[4]);
		$('#5').text(yourAnswers[5]);
		$('#6').text(yourAnswers[6]);
		$('#7').text(yourAnswers[7]);
		$('#8').text(yourAnswers[8]);
		$('#9').text(yourAnswers[9]);
		$('#10').text(yourAnswers[10]);
	}

	
	function renderCounter(){
		$('.question-counter').html(currentQ.location)
	}


function renderQuiz(x){
	createQuizItems();
	renderQuestion(x);
	renderAnswerList(x);
	renderYourAnswers();
	renderCorrect();
	renderCounter();
	console.log('QUIZ RENDERED');
}



function nextQuestion(){
	console.log('NEXT');
	findCurrentQ();
	renderQuiz(currentQ);
	$('.pop-up').removeClass('enabled')
	$('#btn-submit').prop('disabled', false);

};

// Find the question that should be currently displayed
function findCurrentQ(i) {
	for(var i = 0; i < quizItemArr.length; i++) {
		if (quizItemArr[i].question == currentQ.question){
			currentQ = quizItemArr[i + 1];
			console.log('CURRENTQ IS: [' + quizItemArr.indexOf(currentQ) + '] ' + currentQ.question);
			return currentQ;
		}
		else if (currentQ == quizItemArr[9].question) { //May not need this if restart button works as it should
			console.log("CURRENTQ AT END OF ARRAY");
		}
	}
};

// Document ready
$(function() {
	console.log('DOC READY');
	// Call render functions
	console.log('CURRENTQ IS: [' + quizItemArr.indexOf(currentQ) + '] ' + currentQ.question);
	renderQuiz(currentQ);
	$('form').submit(function(event){ // SUBMIT BUTTON
		event.preventDefault();
		console.log('SUBMIT');
		yourAnswers.push($('input[type=radio]:checked').attr('id')); // Store answer
		var location = quizItemArr.indexOf(currentQ); // find location of current question
		var answer = yourAnswers[location];
		console.log('YOUR ANSWER: ' + answer);

		checkAnswer(location, answer); // Call function to check answer
	});
});