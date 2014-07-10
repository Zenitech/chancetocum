function init(step) {
	
	// Ignore init
	if(disallow_settings_modification || localStorage['disp_gender'] !== undefined)
		step = 5;
	
	switch(step) {
		case 1:
			display_message('Welcome to this Orgasm earning game!',
				'If you\'re willing to play this game, you\'re denied from orgasming until you\'ve earned '+
				'a certain amount of points by doing some tasks, which will be listed at the end of this introduction.</p>'+
				'<p>This amount of points vary every time you ask, in a determined intervall. '+
				'So, the more points you have, the more chance you have to be allowed.</p>'+
				'<p>Some tasks have to be done a certain amount of times. Some others have to be done <em>during</em> '+
				'a certain time. To spice things up, the amount of times the first ones have to be done will '+
				'increase everytime you do it. Similarily, the time the second ones last will increase too.',
				'Continue', 'init(2)', '', '', 'large');
		break;
		
		case 2:
			display_message('Welcome to this Orgasm earning game',
				'The game will save by itself, and the current game will be loaded automatically '+
				'when you open the game. Make sure though to not clear your browser\'s data, or '+
				'you may lose your progression. If you want to reset the game, you can do so in '+
				'the settings panel, which is another file in the folder of the game.</p>'+
				'<p>You will now be able to change your settings. Note that it won\'t be possible to '+
				'modify them in-game. Though, it\'s possible to modify them via the settings panel, '+
				'which is available as a separate file in the game\'s folder.</p>'+
				'<p>First and foremost, please indicate your gender: '+
				'<select onchange="disp_gender=this.value;">'+
				'<option value="male"'+((disp_gender == 'male') ? ' selected' : '')+'>Male</option>'+
				'<option value="female"'+((disp_gender == 'female') ? ' selected' : '')+'>Female</option></select>',
				'Continue', 'init(3)', '', '', 'large');
		break;
		
		case 3:
			display_message('Settings',
				'Here is a list of presets. You may choose one of them, or use customized settings. '+
				'For more information on the settings, read the documentation.</p>'+
				'<h3 style="padding-top: 0;">Presets</h3><div style="text-align: center">'+
				'<input type="button" onclick="use_preset(1)" value="Short Easy" /> '+
				'<input type="button" onclick="use_preset(2)" value="Short Normal" /> '+
				'<input type="button" onclick="use_preset(3)" value="Short Difficult" /> '+
				'<input type="button" onclick="use_preset(4)" value="Long Easy" /> '+
				'<input type="button" onclick="use_preset(5)" value="Long Normal" /> '+
				'<input type="button" onclick="use_preset(6)" value="Long Difficult" /></div>'+
				'<h3>Custom settings</h3><div id="settings"><label for="mult_set">Multiplier: </label>'+
				'<input type="text" id="mult_set" onchange="mult = this.value" value="'+mult+'" class="set" /><br />'+
				'<label for="goal_set">Goal: </label>'+
				'<input type="text" id="goal_set" onchange="goal = this.value" value="'+goal+'" class="set" /><br />'+
				'<label for="orgasm_cost_set">Orgasm cost: </label>'+
				'<input type="text" id="orgasm_cost_set" onchange="orgasm_cost = this.value" value="'+orgasm_cost+'" class="set" /></div><p>',
				'Continue', 'init(4);', '', '', 'large');
		break;

		default:
			document.getElementById('sidebar').style.display = 'block'; // Display sidebar
			
			if(localStorage['disp_gender'] === undefined) {
				document.getElementById('orgasm_cost').innerHTML = orgasm_cost;
				save_settings();
				save();
				init_tasks();
			}
			
			else {
				disp_gender = localStorage['disp_gender'];
				init_tasks();
				load();
				
				document.getElementById('orgasm_cost').innerHTML = orgasm_cost;
			}
	}
}