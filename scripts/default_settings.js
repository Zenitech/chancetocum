// These are the default settings that are loaded when 
// you customize settings or are forced when you put disallow_settings_modification on true

// Intro won't show and default settings will be enforced if set to true:
var disallow_settings_modification = false;

// Default settings
var disp_gender = 'male'; // Only used if disallow_settings_modification = true
var mult = 1.15;	
var goal = 1000;
var orgasm_cost = 200;

// List of presets:
function use_preset(preset) {
	switch(preset) {
		case 1: // Short easy
			mult = 1.1;	
			goal = 750;
			orgasm_cost = 100;
		break;
		
		case 2: // Short Normal
			mult = 1.15;	
			goal = 1000;
			orgasm_cost = 200;
		break;
		
		case 3: // Short Difficult
			mult = 1.25;	
			goal = 1500;
			orgasm_cost = 300;
		break;
		
		case 4: // Long easy
			mult = 1.05;	
			goal = 5000;
			orgasm_cost = 1000;
		break;
		
		case 5: // Long normal
			mult = 1.1;	
			goal = 10000;
			orgasm_cost = 2000;
		break;
		
		case 6: // Long difficult
			mult = 1.15;	
			goal = 20000;
			orgasm_cost = 5000;
		break;
	}
	
	// Update customizable fields
	document.getElementById('mult_set').value = mult;
	document.getElementById('goal_set').value = goal;
	document.getElementById('orgasm_cost_set').value = orgasm_cost;
}