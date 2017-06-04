const STORE = { // currentQuestion, currentUserAnswer, question (q,a,u,c, r), history
	currentQ: 0,
	currentUserAnswer: null,
	questions: [{
					// [0] (INTRO)
					q: 'Welcome to this incredible quiz; now shut up and hang on.',
					a: ['Choose your answer carefully', 'Only the penitent man will pass.', 'Have fun and good luck!', 'suh dude'],
					u: null,
					c: null,
					r: null
				},{
					// [1]
					q:'What is Murphy\'s Law?',
					a: ['"The road to success and the road to failure are almost exactly the same."', '"Anything that can go wrong, will go wrong."', '"Two wrongs don\'t make a right."', '"Hope for the best, but prepare for the worst."'],
					u: null,
					c: 1,
					r: null
				},{
					// [2]
					q: 'How can you tell, without question, if someone is allowed access?',
					a: ['They will have a proper badge or pass.', 'Security will let them in if it\'s ok.', 'They look like part of the band.', 'They look like they want to be elsewhere.'],
					u: null,
					c: 3,
					r: null
				},{
					// [3]
					q: 'As an audio tech, how can you avoid injury lifting heavy equipment?',
					a: ['Label all heavy items as \"Lighting\".', 'Lift with your legs, never your back.', 'Have someone help you lift.', 'Try harder.'],
					u: null,
					c: 0,
					r: null
				},{
					// [4]
					q: 'Video content is on the way, when should you test it?',
					a: ['As soon as possible.', '1 hour before show.', '10 minutes before show.', 'Tell the client \"No\".'],
					u: null,
					c: 3,
					r: null
				},{
					// [5]
					q: 'How do you make money in the music business?',
					a: ['Hard work and dedication.', 'Sell beer.', 'Networking -It\'s who you know that counts.', 'Knowledge - Folks will value your skills.'],
					u: null,
					c: 1,
					r: null
				},{
					// [6]
					q: 'If a patron requests a change to the mix, what should you do?',
					a: ['Ignore them.', 'Pretend to make an adjustment.', 'Have security escort them out of the event.', 'All of the above.'],
					u: null,
					c: 3,
					r: null
				},{
					// [7]
					q: 'Lighting is taking a long time to load out, what should you do?',
					a: ['Jump in and help wrap some cables.', 'Try to catch a nap or have a snack.', 'Offer to help tear down fixtures.', 'Push cases to the truck.'],
					u: null,
					c: 1,
					r: null
				},{
					// [8]
					q: 'When should you schedule your lunch or dinner break?',
					a: ['There is no lunch or dinner break.', 'Mid-day.', 'During intermission or set change.', 'After the event is complete.'],
					u: null,
					c: 0,
					r: null
				},{
					// [9]
					q: 'An artist shows up with a tom drum that is not part of the drum kit, you should:',
					a: ['Make sure you have a microphone for it.', 'Add some low end EQ for maximum impact.', 'Throw it in the garbage.', 'Make sure it is tuned properly.'],
					u: null,
					c: 2,
					r: null
				},{
					// [10]
					q: 'When was the last time you got enough sleep?',
					a: ['Huh?', 'What?', 'I dunno.', 'Eh.'],
					u: null,
					c: 'Any', //ALL ANSWERS CORRECT
					r: 'Correct'
				},{
					// [11] (END)
					q: 'Well, you made it to the end. See your results below:',
					a: [],
					u: null,
					c: null
				}]
	};

function renderQA(currentQ, qSelector){ //Render current question and matching answers to the form
	$('#count').text('Question '+STORE.currentQ+' of '+STORE.questions.length); // Render question count
	qSelector.text(STORE.questions[currentQ].q); // Render question as form legend text
	if(currentQ == 0){ // INTRO
		$('#count').css('visibility', 'hidden');
		STORE.questions[currentQ].a.forEach(function(answer, index){ // Render answers to radio labels
			$('label[for="answer-'+index+'"]').text(answer);
		});
		$('#button-submit').text('Begin');
	}
	else if(currentQ == 11){ // END
		$('#count').css('visibility', 'hidden');
		$('#button-submit').text('Restart');
		getResults();
		for (i = 1; i < STORE.questions.length-1; i++){ // Render answers to radio labels
				var results = {
					n: i,
					q: STORE.questions[i].q,
					c: STORE.questions[i].a[STORE.questions[i].c],
					u: STORE.questions[i].a[STORE.questions[i].u],
					r: STORE.questions[i].r
				}
			var resultsHTML = `<p>${results.n}: ${results.q}<br>Correct Answer: ${results.c}<br>Your Answer: ${results.u}<br>Result: ${results.r}</p>`;
			$('.radio-item').remove();
			$('#form-content').append(resultsHTML);
		};
	}
	else{
		$('#count').css('visibility', 'visible');
		STORE.questions[currentQ].a.forEach(function(answer, index){ // Render answers to radio labels
			$('label[for="answer-'+index+'"]').text(answer);
		});
		$('#button-submit').text('Submit');
	}
	initSelection();
	displayResult(null);
} 

function initSelection(){ // CHECK FIRST RADIO AND GET IT AS THE CURRENT ANSWER
	$('input[type=radio]:first').prop('checked', true);
	getUserAnswer();
}

function startListeners(form){ // LISTEN TO FORM FOR ANSWER SELECTION AND SUBMIT
	form.on('change','input[type=radio]', getUserAnswer)
		.on('submit', handleSubmit);
}

function getUserAnswer(event){ // This gets the checked radio and stores it
	STORE.currentUserAnswer = Number($('input:checked').val());
	// console.log('currentUserAnswer is: '+STORE.currentUserAnswer);
	return STORE.currentUserAnswer;
}

function handleSubmit(event){ //When a fool smashes dat SUBMIT, please do the following
	event.preventDefault();

	if(STORE.currentQ == 11){ // If at end, submit will reload entire quiz
		window.location.href='';
		console.log('RESTART');
	}
	else{
		console.log('SUBMIT');
		storeUserAnswer(getUserAnswer());
		checkUserAnswer(getUserAnswer());
		CURRENTQ = STORE.currentQ += 1; // Increment to move to next Question
		Q_SELECTOR = $('#question'); // <----- I think there's probably a better way to do this rather than declare this again
		renderQA(CURRENTQ, Q_SELECTOR); //Renders the new current page (next page)
	}
}

function storeUserAnswer(answer){ // Push stored User Answer into the answerHistory array
	STORE.questions[STORE.currentQ].u = answer;
	console.log('STORE.questions['+STORE.currentQ+'].u is: '+STORE.questions[STORE.currentQ].u+'');
}	

function checkUserAnswer(userAnswer){ // check answer and push true if correct, false if incorrect
	console.log('Checking: '+userAnswer);
	if(STORE.currentQ == 10){ // Any answer is correct for question 10
		STORE.questions[10].a.push('Any'); // Push a new answer 'Any'
		STORE.questions[10].c = 4;	// Ensure correct answer will be 'Any'
		console.log('CORRECT!');
		displayResult('CORRECT!');
	}
	else if(userAnswer == STORE.questions[STORE.currentQ].c){
		STORE.questions[STORE.currentQ].r = 'Correct';
		console.log('CORRECT!');
		displayResult('CORRECT!');
	}
	else {
		STORE.questions[STORE.currentQ].r = 'Incorrect';
		console.log('YA BLEW IT!');
		displayResult('YA BLEW IT!');
	}
}

function displayResult(result){ // Show if User Answer is correct or not
	$('#result').text(result);
}

function getResults(){ // Match each user answer with appropriate question
	var resultsArray=[];
	for(i = 1 ; i < STORE.questions.length-1; i++){
		var question = STORE.questions[i].q;
		var answerNum = STORE.questions[i].u;
		var answerStr = STORE.questions[i].a[answerNum];
		resultsArray.push( {q:question, a:answerStr} );
	}
	return STORE.questions[11].a = resultsArray;
}

$(function(){ //DOCUMENT READY!
	const FORM = $('form');
	const Q_SELECTOR = $('#question');
	const CURRENTQ = STORE.currentQ
	console.log('DOM READY');
	renderQA(CURRENTQ, Q_SELECTOR);
	startListeners(FORM);
});