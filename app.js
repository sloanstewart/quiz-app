// currentQuestion, currentUserAnswer, question (q,a,u,c), history
const STORE = {
	currentQ: 0,
	currentUserAnswer: null,
	questions: [{
					// [0] (INTRO)
					q: 'Welcome to this incredible quiz; now shut up and hang on.',
					a: ['Choose your answer carefully', 'Only the penitent man will pass.', 'Have fun and good luck!', 'suh dude'],
					u: null,
					c: null
				},{
					// [1]
					q:'What is Murphy\'s Law?',
					a: ['"The road to success and the road to failure are almost exactly the same."', '"Anything that can go wrong, will go wrong."', '"Two wrongs don\'t make a right."', '"Hope for the best, but prepare for the worst."'],
					u: "unanswered",
					c: 1
				},{
					// [2]
					q: 'How can you tell, without question, if someone is allowed access?',
					a: ['They will have a proper badge or pass.', 'Security will let them in if it\'s ok.', 'They look like part of the band.', 'They look like they want to be elsewhere.'],
					u: "unanswered",
					c: 3
				},{
					// [3]
					q: 'As an audio tech, how can you avoid injury lifting heavy equipment?',
					a: ['Label all heavy items as \"Lighting\".', 'Lift with your legs, never your back.', 'Have someone help you lift.', 'Try harder.'],
					u: "unanswered",
					c: 0
				},{
					// [4]
					q: 'Video content is on the way, when should you test it?',
					a: ['As soon as possible.', '1 hour before show.', '10 minutes before show.', 'Tell the client \"No\".'],
					u: "unanswered",
					c: 3
				},{
					// [5]
					q: 'How do you make money in the music business?',
					a: ['Hard work and dedication.', 'Sell beer.', 'Networking -It\'s who you know that counts.', 'Knowledge - Folks will value your skills.'],
					u: "unanswered",
					c: 1
				},{
					// [6]
					q: 'If a patron requests a change to the mix, what should you do?',
					a: ['Ignore them.', 'Pretend to make an adjustment.', 'Have security escort them out of the event.', 'All of the above.'],
					u: "unanswered",
					c: 3
				},{
					// [7]
					q: 'Lighting is taking a long time to load out, what should you do?',
					a: ['Jump in and help wrap some cables.', 'Try to catch a nap or have a snack.', 'Offer to help tear down fixtures.', 'Push cases to the truck.'],
					u: "unanswered",
					c: 1
				},{
					// [8]
					q: 'When should you schedule your lunch or dinner break?',
					a: ['There is no lunch or dinner break.', 'Mid-day.', 'During intermission or set change.', 'After the event is complete.'],
					u: "unanswered",
					c: 0
				},{
					// [9]
					q: 'An artist shows up with a tom drum that is not part of the drum kit, you should:',
					a: ['Make sure you have a microphone for it.', 'Add some low end EQ for maximum impact.', 'Throw it in the garbage.', 'Make sure it is tuned properly.'],
					u: "unanswered",
					c: 2
				},{
					// [10]
					q: 'When was the last time you got enough sleep?',
					a: ['Huh?', 'What?', 'I dunno.', 'Eh.'],
					u: "unanswered",
					c: [0,1,2,3] //ALL ANSWERS CORRECT
				},{
					// [11] (END)
					q: 'Well, you made it to the end. See your results below:',
					a: [],
					u: null,
					c: null
				}],
	answerHistory: [], // Number value of answer, current answer will be last
};

function renderQA(currentQ, qSelector){
	qSelector.text(STORE.questions[currentQ].q); // Render question as form legend text
	STORE.questions[currentQ].a.forEach(function(answer, index){
		$('label[for="answer-'+index+'"]').text(answer);
	});
	initSelection();	
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

function handleSubmit(event){
	event.preventDefault();
	console.log('SUBMIT');
	storeUserAnswer(getUserAnswer());
	checkUserAnswer(getUserAnswer());
	CURRENTQ = STORE.currentQ += 1;
	Q_SELECTOR = $('#question');
	renderQA(CURRENTQ, Q_SELECTOR); //Renders the new current page (next page)
}

function storeUserAnswer(answer){ // Push stored User Answer into the answerHistory array
	STORE.questions[STORE.currentQ].u = answer;
	console.log('STORE.questions['+STORE.currentQ+'].u is: '+STORE.questions[STORE.currentQ].u+'');
}	

function checkUserAnswer(userAnswer){ // check answer and push true if correct, false if incorrect
	console.log('Checking: '+userAnswer);
	if(userAnswer == STORE.questions[STORE.currentQ].c){
		return console.log('CORRECT!');
	}
	else {
		console.log('YA BLEW IT!');
	}
}

function results(){ // Match each user a+STORE[1].u+''swer with appropriate question
	var resultsArray=[];
	for(i = 1 ; i < STORE.length-1; i++){
		var q = STORE[i].q;
		var a = STORE[i].u;
		resultsArray.push( {[q]:a} );
	}
	return STORE[11].a = resultsArray;
}

$(function(){ //DOCUMENT READY!
	const FORM = $('form');
	const Q_SELECTOR = $('#question');
	const CURRENTQ = STORE.currentQ
	console.log('DOM READY');
	renderQA(CURRENTQ, Q_SELECTOR);
	startListeners(FORM);
});