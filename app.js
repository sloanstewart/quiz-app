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
		['&quot;The road to success and the road to failure are almost exactly the same.&quot;',
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
		'01. ' + q1.question + '<br>Correct Answer: <span class=correct-answer id=a1></span>' + '<br>Your Answer: <span class=youranswer id=q1></span>',
		'02. ' + q2.question + '<br>Correct Answer: <span class=correct-answer id=a2></span>' + '<br>Your Answer: <span class=youranswer id=q2></span>',
		'03. ' + q3.question + '<br>Correct Answer: <span class=correct-answer id=a3></span>' + '<br>Your Answer: <span class=youranswer id=q3></span>',
		'04. ' + q4.question + '<br>Correct Answer: <span class=correct-answer id=a4></span>' + '<br>Your Answer: <span class=youranswer id=q4></span>',
		'05. ' + q5.question + '<br>Correct Answer: <span class=correct-answer id=a5></span>' + '<br>Your Answer: <span class=youranswer id=q5></span>',
		'06. ' + q6.question + '<br>Correct Answer: <span class=correct-answer id=a6></span>' + '<br>Your Answer: <span class=youranswer id=q6></span>',
		'07. ' + q9.question + '<br>Correct Answer: <span class=correct-answer id=a7></span>' + '<br>Your Answer: <span class=youranswer id=q9></span>',
		'08. ' + q7.question + '<br>Correct Answer: <span class=correct-answer id=a8></span>' + '<br>Your Answer: <span class=youranswer id=q7></span>',
		'09. ' + q8.question + '<br>Correct Answer: <span class=correct-answer id=a9></span>' + '<br>Your Answer: <span class=youranswer id=q8></span>',
		'10. ' + q10.question + '<br>Correct Answer: <span class=correct-answer id=a10></span>' + '<br>Your Answer: <span class=youranswer id=q10></span>',
		],
		null
		// ^ iterate through questions and check CORRECT answers
	);
	return [intro, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, end];
};

// Store Current Question and Answers
quizItemArr = createQuizItems();
var currentQ = quizItemArr[0];
var yourAnswers = {
	intro: null,
	q0: "",
	q1: "",
	q2: "",
	q3: "",
	q4: "",
	q5: "",
	q6: "",
	q7: "",
	q8: "",
	q9: "",
	end: null
};



// Render quiz
	function renderQuestion(item){
		$('.question').text(item.question);
	}

	function renderAnswerList(item) {
			var answerList = [];
			$.each(item.answers, function(i, value){
				console.log('answer list value: ' + value);
				var answerHTML = '<div class=answer-container><input type=radio name=answer id="'+value+'"><label for="'+value+'">'+value+'</label></div>'
				answerList.push(answerHTML);
			});

		$('.answer-list').html(answerList);

		// Disable radio selection for intro and end. Change buttons for those sections.
		if (currentQ == quizItemArr[0]){
			console.log('AT INTRO');
			$('input[type=radio]').attr('disabled', true);
			$('.button').attr('value', 'BEGIN');
		}

		else if (currentQ == quizItemArr[11]){
			console.log('AT END');
			$('input[type=radio]').attr('disabled', true);
			$('.button').attr('value', 'RESTART').click(function(){
				window.location.href=' ';
			});
		}

		// Button should read NEXT for questions
		else {
			$('.button').attr('value', 'NEXT');
			$('.button').attr('disabled', true);
			$('.button').addClass('disabled');
		}

		console.log('ANSWER LIST RENDERED');
	}


	function initializeSelection(){
	// Save answer selection to yourAnswer object and then check it
	$('.quiz-box').find('input[type=radio]').change(function(){

		// Disable selection when one is made and enable button
		$('input[type=radio]').attr('disabled', true);
		$('.button').attr('disabled', false);
		$('.button').removeClass('disabled');
		q = 'q'+quizItemArr.indexOf(currentQ);
		yourAnswers[q] = $(this).attr('id');
		console.log('YOUR ANSWER: ' + yourAnswers[q]);

		// Check Answer
		checkAnswer(quizItemArr.indexOf(currentQ), yourAnswers[q]);
		
	});
	}
	//Checks answer and returns result along with colored DIV
	function checkAnswer(location, answer) {
		if (answer == correctAnswers[location]){
			console.log('CORRECT');
			return $('.pop-up').removeClass('incorrect').addClass('enabled correct').text('CORRECT \n'+ correctAnswers[location]);
		}

		else if (location == 10){
			console.log('ANY ANSWER CORRECT');
			return $('.pop-up').removeClass('incorrect').addClass('enabled correct').text('CORRECT \n'+ 'All answers are correct; get some sleep already!');
		}

		else {
			console.log('INCORRECT');
			return $('.pop-up').removeClass('correct').addClass('enabled incorrect').text('INCORRECT \n'+ correctAnswers[location]);
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
		$('#q1').text(yourAnswers.q1);
		$('#q2').text(yourAnswers.q2);
		$('#q3').text(yourAnswers.q3);
		$('#q4').text(yourAnswers.q4);
		$('#q5').text(yourAnswers.q5);
		$('#q6').text(yourAnswers.q6);
		$('#q7').text(yourAnswers.q7);
		$('#q8').text(yourAnswers.q8);
		$('#q9').text(yourAnswers.q9);
		$('#q10').text(yourAnswers.q10);
	}

	function renderCounter(){
		$('.question-counter').html(currentQ.location)
	}

function renderQuiz(x){
	createQuizItems();
	renderQuestion(x);
	renderAnswerList(x);
	initializeSelection();
	renderYourAnswers();
	renderCorrect();
	renderCounter();
	console.log('QUIZ RENDERED');
}



function nextQuestion(){
	console.log('NEXT');
	event.preventDefault();
	findCurrentQ();
	renderQuiz(currentQ);
	$('.pop-up').removeClass('enabled')
};

// Find the question that should be currently displayed
function findCurrentQ(i) {
	for(i = 0; i < quizItemArr.length; i++) {
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
	// Disable submit button
	// $('input[type=submit').prop('disabled', true);

	// Next (submit) button
	$('form').submit(function(event){
		nextQuestion(event);
	});
});