function set_random(id_task, value, points) {
	var status;
	
	document.getElementById('randTaskButton').style.display = 'block';
	
	if(tasks_type[id_task] == 'simple') {	
		document.getElementById('random').style.display = 'none';
		
		// Statistics
		if(tasks_stat[id_task] === 0)
			document.getElementById('li_stat_'+id_task).style.display = 'list-item';
		
		tasks_stat[id_task] += Math.round(value);
		document.getElementById('stat_'+id_task).innerHTML = tasks_stat[id_task]+'<span class="unit">x</span>';
		add_points(points);
	}
	
	else {
		status = tasks_caption[id_task].replace('#', '<strong id="status_'+id_task+'_sec">'+time_format(value)+'</strong>');
		status += '<span style="opacity: .5;"> for <strong>'+points+'</strong> points</span>';
		
		tasks_started[id_task] = 2;
		
		// Some changes to the button
		document.getElementById('button_'+id_task).classList.add('active');
		document.getElementById('button_'+id_task).onclick = function() { stop_random(id_task); return false;};

		document.getElementById('ul-status').innerHTML += '<li id="status_'+id_task+'">'+
			'<a href="#" class="chrono_stop" onclick="stop_random('+id_task+'); return false" title="Stop the task">S</a>'+
			'<a href="#" class="chrono_last lasted" style="cursor: default" title="The task is stopped after the countdown finishes (this is a random task)">L</a>&nbsp;'+
			status+'</li>';
		
		setTimeout("cb_chrono_task('"+id_task+"', "+value+", "+points+", "+value+")", 1000);
		document.getElementById('random').style.display = 'none';
	}
}

function randomTask() {
	// First, we draw a task
	var id_task = randomInt(0, (tasks_value.length - 1));
	var nb_attempts = 0;
	
	// We have to choose another task if it is a timed task & already on, or if this task has no value, or if it is set to not be in random tasks
	while((tasks_started[id_task] !== 0 || tasks_start[id_task] === 0 || tasks_notRandom[id_task] == true) && nb_attempts < tasks_value.length) {
		// Incrementing id_task until it finds a suitable task
		id_task = (id_task < tasks_value.length-1) ? id_task + 1 : 0;
		nb_attempts++; // Used to be sure we're not in an infinite loop
	}
	
	if(nb_attempts >= tasks_value.length) // Every task has been tried and isn't suitable.
		display_message('Error', 'No suitable task could be chosen.', 'Ok');
	
	else {
		document.getElementById('randTaskButton').style.display = 'none';
		var points = Math.ceil(tasks_points[id_task]*rand_diff);
		var task = tasks_caption[id_task];
		var value = Math.ceil(tasks_start[id_task]*rand_diff);
		
		rand_diff *= mult; // Difficulty is raised
		
		if(tasks_type[id_task] == 'simple')
			task = task.replace('#', '<strong id="val_'+id_task+'">'+value+'<span class="unit">x</span></strong>');
		
		else if(tasks_type[id_task] == 'chrono')
			task = task.replace('#', '<strong id="val_'+id_task+'">'+time_format(value)+'</strong>');
		
		document.getElementById('random').style.display = 'block';
		document.getElementById('random').innerHTML = '<h2>Random Task</h2>'+
			'<p><span style="display: inline-block; padding: 5px;">'+ task + ' for&nbsp;<strong>'+ points + '&nbsp;points</strong>.</span></p>';
		document.getElementById('random').innerHTML += '<div id="randomTask_choice">'+
			'<div id="randomTask_accept" onclick="set_random('+id_task+', '+value+', '+points+');">Accept</div>'+
			'<div id="randomTask_refuse" onclick="stop_random('+id_task+');">Refuse</div>'+
			'</div>'
	}
}

function stop_random(id_task) {
	if(tasks_started[id_task] !== 0) {
		tasks_started[id_task] = 0;
		document.getElementById('button_'+id_task).classList.remove('active');
		document.getElementById('button_'+id_task).onclick = function() { chrono_task(id_task); return false; };
		document.getElementById('ul-status').removeChild(document.getElementById('status_'+id_task));
	}
	
	else {
		document.getElementById('random').style.display = 'none';
		document.getElementById('randTaskButton').style.display = 'block';
	}
}