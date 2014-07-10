// Global variables
var glob_points = 0;
var rand_diff = 1;

// Arrays for saving
var tasks_value = [];
var tasks_stat = [];
var tasks_started = [];

// Arrays for getting information about tasks
var tasks_caption = [];
var tasks_points = [];
var tasks_type = [];
var tasks_start = [];
var tasks_notRandom = [];

function add_points(points) {
	var chance;
	glob_points += points;
	
	document.getElementById('points').innerHTML = glob_points;
	
	if(glob_points <= 0) chance = 0;
	else {
		chance = Math.round((glob_points/goal)*10000)/100;
		if(chance > 100) chance = 100;
	}
	
	document.getElementById('chance').innerHTML = chance + '<span class="unit">%</span>';
	document.getElementById('chance_p').style.backgroundColor = 'rgba('+Math.round(255 - 2.55*chance)+', '+Math.round(0 + 2.55*chance)+', 0, 0.4)';
	
	document.getElementById('ask_cum').className = (glob_points >= orgasm_cost) ? 'enabled' : '';
	
	if(points !== 0)
		save();
}

function ask_cum(confirmed) {	
	if(glob_points >= orgasm_cost) {
		if(confirmed) {
			var random = randomInt(1, goal);
			
			if(random <= glob_points) {
				if(glob_points < goal)
					add_points(-glob_points)
				
				else
					add_points(-goal);
					
				display_message('You\'re allowed to cum!', 'You\'ve got to cum! Enjoy it!', 'Thank you!');
			}
			
			else {
				add_points(-orgasm_cost); // Remove some points
				display_message('Denied!', 'I really think you\'d better gather more points before being allowed.', 'Ok');
			}
		}
		
		else {
			// Ask for confirmation
			display_message('Ask to cum', 'Do you really want to ask if you can cum? It will cost you '+orgasm_cost+' points!', 'Yes', 
				'ask_cum(true)', 'No');
		}
	}
	
	else
		display_message('Ask to cum', 'You don\'t have enough points to ask...', 'Okay');
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function time_format(seconds) {
	var hours = Math.floor(seconds/3600);
	var minutes = Math.floor((seconds%3600)/60)
	var remainder = Math.floor(seconds%60);
	var string = '';
	
	if(hours > 0) string += hours+'<span class="unit">h&nbsp;</span>&nbsp;';
	if(minutes > 0 || hours > 0) string += minutes+'<span class="unit">m</span>&nbsp;';
	
	string += remainder+'<span class="unit">s</span>';
	return string;
}

function display_message(title, text, butt1, event1, butt2, event2, size) {
	// Default arguments 
	event1 = typeof event1 !== 'undefined' ? event1 : '';
	butt2 = typeof butt2 !== 'undefined' ? butt2 : '';
	event2 = typeof event2 !== 'undefined' ? event2 : '';
	size = typeof size !== 'undefined' ? size : '';
	
	document.getElementById('message_h2').innerHTML = title;
	document.getElementById('message_p').innerHTML = '<div class="content"><p>'+text+'</p></div>';
	document.getElementById('message_buttons').innerHTML = '<input type="button" onclick="hide_message();'+event1+'" value="'+butt1+'" />';
	
	if(butt2 != '') 
		document.getElementById('message_buttons').innerHTML += '&nbsp;<input type="button" onclick="hide_message();'+event2+'" value="'+butt2+'" />';
	
	if(size == 'large')
		document.getElementById('message').classList.add('large')
	
	else
		document.getElementById('message').classList.remove('large')
		
	// Display the message
	document.getElementById('message').style.display = 'block';
	document.getElementById('placeholder').style.display = 'block';
}

function hide_message() {
	document.getElementById('message').style.display = 'none';
	document.getElementById('placeholder').style.display = 'none';
}