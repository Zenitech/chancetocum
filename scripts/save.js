function save() {
	// Arrays
	for(var i=0; i < tasks_value.length; i++) {
		localStorage['tasks_value_'+i] = tasks_value[i];
		localStorage['tasks_stat_'+i] = tasks_stat[i];
	}
	
	// Global variables
	localStorage['glob_points'] = glob_points;
	localStorage['rand_diff'] = rand_diff;
}

function save_settings() {
	localStorage['disp_gender'] = disp_gender;
	localStorage['mult'] = mult;
	localStorage['goal'] = goal;
	localStorage['orgasm_cost'] = orgasm_cost;
}

function load() {
	// Settings
	mult = localStorage['mult']*1;
	goal = localStorage['goal']*1;
	orgasm_cost = localStorage['orgasm_cost']*1;
	
	for(var i=0; localStorage['tasks_value_'+i] !== undefined; i++) {
		tasks_value[i] = localStorage['tasks_value_'+i]*1;
		tasks_stat[i] = localStorage['tasks_stat_'+i]*1;
		
		// Display - value & stats
		if(tasks_type[i] == 'chrono'){
			document.getElementById('val_'+i).innerHTML = time_format(Math.round(tasks_value[i]));
			
			if(tasks_stat[i] !== 0) {
				document.getElementById('stat_'+i).innerHTML = time_format(tasks_stat[i]);
				document.getElementById('li_stat_'+i).style.display = 'list-item';
			}
		}
		
		else {
			if(tasks_value[i] !== 0) {
				document.getElementById('val_'+i).innerHTML = Math.round(tasks_value[i])+'<span class="unit">x</span>';
			}
			
			if(tasks_stat[i] !== 0) {
				document.getElementById('stat_'+i).innerHTML = tasks_stat[i]+'<span class="unit">x</span>';
				document.getElementById('li_stat_'+i).style.display = 'list-item';
			}
		}
	}

	glob_points = localStorage['glob_points']*1;
	rand_diff = localStorage['rand_diff']*1;
	
	add_points(0); // Update display
}