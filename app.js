// Create the question and answer objects
function createQuizItems(){
	function QuizItem(question, answers, correct) {
		this.question = question;
		this.answers = answers;
		this.correct = correct;
	};

	var intro = new QuizItem('Welcome to this incredible quiz; now shut up and hang on.',
		['Choose your answer carefully',
		'There is only one correct answer per question.',
		'Only the penitent man will pass.',
		'Good luck!'],
		null
	);

	var q1 = new QuizItem('What is Murphy\'s Law?',
		['&quot;The road to success and the road to failure are almost exactly the same.&quot;', '&quot;Anything that can go wrong, will go wrong.&quot;', '&quot;Two wrongs don\'t make a right.&quot;', '&quot;Hope for the best, but prepare for the worst.&quot;'], '&quot;Anything that can go wrong, will go wrong.&quot;'
	);

	var q2 = new QuizItem('How can you tell, without question, if someone is allowed access?',
		['They will have a proper badge or pass.',
		'Security will let them in if it\'s ok.',
		'They look like part of the band.',
		'They look like the want to be elsewhere.'],
		'They look like the want to be elsewhere.'
	);

	var q3 = new QuizItem('As an audio tech, how can you avoid injury lifting heavy equipment?',
		['Label all heavy items as \"Lighting\".',
		'Lift with your legs, never your back.',
		'Have someone help you lift.',
		'Try harder.'],
		'Label all heavy items as \"Lighting\".'
	);

	var q4 = new QuizItem('Video content is on the way, when should you test it?',
		['As soon as possible.',
		'1 hour before show.',
		'10 minutes before show.',
		'Tell the client \"No\".'],
		'Tell the client \"No\".'
	);

	var q5 = new QuizItem('How do you make money in the music business?',
		['Hard work and dedication.',
		'Sell beer.',
		'Networking -It\'s who you know that counts.',
		'Knowledge - Folks will value your skills.'],
		'Sell beer.'
	);

	var q6 = new QuizItem('If a patron requests a change to the mix, what should you do?',
		['Ignore them.',
		'Pretend to make an adjustment.',
		'Have security escort them out of the event.',
		'All of the above.'],
		'All of the above.'
	);

	var q7 = new QuizItem('Lighting is taking a long time to load out, what should you do?',
		['Jump in and help wrap some cables.',
		'Try to catch a nap or have a snack.',
		'Offer to help tear down fixtures.',
		'Push cases to the truck.'],
		'Try to catch a nap or have a snack.'
	);

	var q8 = new QuizItem('When should you schedule your lunch or dinner break?',
		['There is no lunch or dinner break.',
		'Mid-day.',
		'During intermission or set change.',
		'After the event is complete.']
	);

	var q9 = new QuizItem('An artist shows up with a tom drum that is not part of the drum kit, you should:',
		['Make sure you have a microphone for it.',
		'Add some low end EQ for maximum impact.',
		'Throw it in the garbage.',
		'Make sure it is tuned properly.'],
		'Throw it in the garbage.'
	);

	var q10 = new QuizItem('When was the last time you got enough sleep?',
		['Huh?',
		'What?',
		'I dunno.',
		'Eh.'],
		['Huh?',
		'What?',
		'I dunno.',
		'Eh.']
	);

	var end = new QuizItem('Well, you made it to the end. See your results below:',[
		q1.question + '</br>yourAnswers',
		q2.question + '</br>Your Answer',
		q3.question + '</br>Your Answer',
		q4.question + '</br>Your Answer',
		q5.question + '</br>Your Answer',
		q6.question + '</br>Your Answer',
		q7.question + '</br>Your Answer',
		q8.question + '</br>Your Answer',
		q9.question + '</br>Your Answer',
		q10.question + '</br>Your Answer',
		],
		null
	);
	return [intro, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, end];
};

// Array to store questions in order
// var quizItemArr = [intro, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, end];

// Store Current Question 
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
		var answerHTML =
	'<div class="answer-container"><input type="radio" name="answer" id="'+value+'"><label for="'+value+'" class="answer">'+value+'</label></div>'
		answerList.push(answerHTML);
	});
	$('.answer-list').html(answerList);
}

function initializeSelection(){
	// Save answer selection to yourAnswer object
	$('.quiz-box').find('input[type=radio]').change(function(){
		console.log('Selected: ' + $(this).attr('id'));4
		q = 'q'+quizItemArr.indexOf(currentQ);
		yourAnswers[q] = $(this).attr('id');
		console.log('yourAnswers: ' + yourAnswers[q]);
	});
}



function renderQuiz(x){
	createQuizItems();
	renderQuestion(x);
	renderAnswerList(x);
	initializeSelection();
}


// Next (submit) button
$('form').submit(function(event){
	nextQuestion(event);
});

function nextQuestion(){
	console.log('NEXT');
	event.preventDefault();
	findCurrentQ();
	renderQuiz(currentQ);
};

// Find the question that should be currently displayed
function findCurrentQ(i) {
	for(i = 0; i < quizItemArr.length; i++) {
		if (quizItemArr[i].question == currentQ.question){
			currentQ = quizItemArr[i + 1];
			console.log('currentQ is: [' + quizItemArr.indexOf(currentQ) + '] ' + currentQ.question);
			return currentQ;
		}
		else if (currentQ == quizItemArr[9].question) {
			console.log("currentQ at end of array");
		}
	}
};

// Document ready
$(function() {
	console.log('doc ready');
	// Call render functions
	console.log('currentQ is: [' + quizItemArr.indexOf(currentQ) + '] ' + currentQ.question);
	renderQuiz(currentQ);

});