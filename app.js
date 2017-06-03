var CURRENT_PAGE = 0;
var QUESTION_TEXT = $('#question');
var USER_ANSWER = "";
var BUTTON_SUBMIT = $('#button-submit');
var STORE = [
	{
		// [0] (INTRO)
		q: 'Welcome to this incredible quiz; now shut up and hang on.',
		a: ['Choose your answer carefully', 'Only the penitent man will pass.', 'Have fun and good luck!', null],
		u: null
	},
	{
		// [1]
		q:'What is Murphy\'s Law?',
		a: ['&quot;The road to success and the road to failure are almost exactly the same.&quot; ', '&quot;Anything that can go wrong, will go wrong.&quot;', '&quot;Two wrongs don&#39;t make a right.&quot;', '&quot;Hope for the best, but prepare for the worst.&quot;'],
		u: []
	},
	{
		// [2]
		q: 'How can you tell, without question, if someone is allowed access?',
		a: ['They will have a proper badge or pass.', 'Security will let them in if it&#39;s ok.', 'They look like part of the band.', 'They look like they want to be elsewhere.'],
		u: []
	},
	{
		// [3]
		q: 'As an audio tech, how can you avoid injury lifting heavy equipment?',
		a: ['Label all heavy items as &quot;Lighting&quot;.', 'Lift with your legs, never your back.', 'Have someone help you lift.', 'Try harder.'],
		u: []
	},
	{
		// [4]
		q: 'Video content is on the way, when should you test it?',
		a: ['As soon as possible.', '1 hour before show.', '10 minutes before show.', 'Tell the client &quot;No&quot;.'],
		u: []
	},
	{
		// [5]
		q: 'How do you make money in the music business?',
		a: ['Hard work and dedication.', 'Sell beer.', 'Networking -It&#39;s who you know that counts.', 'Knowledge - Folks will value your skills.'],
		u: []
	},
	{
		// [6]
		q: 'If a patron requests a change to the mix, what should you do?',
		a: ['Ignore them.', 'Pretend to make an adjustment.', 'Have security escort them out of the event.', 'All of the above.'],
		u: []
	},
	{
		// [7]
		q: 'Lighting is taking a long time to load out, what should you do?',
		a: ['Jump in and help wrap some cables.', 'Try to catch a nap or have a snack.', 'Offer to help tear down fixtures.', 'Push cases to the truck.'],
		u: ''
	},
	{
		// [8]
		q: 'When should you schedule your lunch or dinner break?',
		a: ['There is no lunch or dinner break.', 'Mid-day.', 'During intermission or set change.', 'After the event is complete.'],
		u: ''
	},
	{
		// [9]
		q: 'An artist shows up with a tom drum that is not part of the drum kit, you should:',
		a: ['Make sure you have a microphone for it.', 'Add some low end EQ for maximum impact.', 'Throw it in the garbage.', 'Make sure it is tuned properly.'],
		u: ''
	},
	{
		// [10]
		q: 'When was the last time you got enough sleep?',
		a: ['Huh?', 'What?', 'I dunno.', 'Eh.'],
		u: ''
	},
	{
		// [11] (END)
		q: 'Well, you made it to the end. See your results below:',
		a: []
	}
];

function renderQA(currentPage){
	QUESTION_TEXT.text(STORE[currentPage].q); // Render question text
	for(i = 0 ; i < STORE[currentPage].a.length; i++){ // Render answers to Radio labels
		$('label[for="answer-'+i+'"] > span').text(STORE[currentPage].a[i]);
	};


	console.log('CURRENT_PAGE: '+CURRENT_PAGE);
	CURRENT_PAGE = CURRENT_PAGE + 1; // After current page is loaded, increment the count

} 


function storeUserAnswer(){
	var answer = $('input:checked').siblings('span').text();
	STORE[CURRENT_PAGE].u.push(answer);
	console.log('STORE['+CURRENT_PAGE+'].u is: '+STORE[1].u+'');
}

function checkUserAnswer(){

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

$(function(){
	console.log('DOM READY');
	renderQA(0);

	BUTTON_SUBMIT.click(function(event){
		event.preventDefault();
		console.log('SUBMIT');
		storeUserAnswer();
		checkUserAnswer();
		renderQA(CURRENT_PAGE);
	});

	$('input[type=radio]').change(function(){
		USER_ANSWER = $('input:checked').siblings('span').text();
		console.log('USER_ANSWER IS: '+USER_ANSWER);
	});
});