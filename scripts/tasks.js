function new_cat(category, gender) {
	gender = typeof gender !== 'undefined' ? gender : 'neutral';
	
	if(gender == disp_gender || gender == 'neutral')
		document.getElementById('buttons').innerHTML += '<h1 class="category">'+category+'</h1>';
}

function new_task(task, points, gender, notRandom) {
	gender = typeof gender !== 'undefined' ? gender : 'neutral';
	notRandom = typeof notRandom !== 'undefined' ? notRandom : false;
	
	if(disp_gender == gender || gender == 'neutral') {
		var type, start, old_task;
		var id_task = tasks_value.length;
		var re = /(\d+)(x|s)/;
		
		if(task.match(re) !== null) {
			old_task = task.replace(re, '#');
			start = task.match(re)[1];
			
			if(task.match(re)[2] == 'x'){
				type = 'simple';
				task = task.replace(re, '<strong id="val_'+id_task+'">'+start+'<span class="unit">x</span></strong>');
				document.getElementById('buttons').innerHTML += '<div id="button_'+id_task+'" class="false_button '+gender+'" onclick="simple_task('+id_task+')">'+
					'<span class="caption" id="caption_'+id_task+'">'+task+'</span><span class="points" id="points_'+id_task+'">'+points+'</span></div>';
				stat = task.replace('<strong id="val_'+id_task+'">'+start+'<span class="unit">x</span></strong>', 
					'<strong id="stat_'+id_task+'">0<span class="unit">x</span></strong>');
			}
			
			else if(task.match(re)[2] == 's') {
				type = 'chrono';
				task = task.replace(re, '<strong id="val_'+id_task+'">'+time_format(start)+'</strong>');
				document.getElementById('buttons').innerHTML += '<div id="button_'+id_task+'" class="false_button '+gender+'" onclick="chrono_task('+id_task+')">'+
					'<span class="caption" id="caption_'+id_task+'">'+task+'</span><span class="points" id="points_'+id_task+'">'+points+'</span></div>';	
				stat = task.replace('<strong id="val_'+id_task+'">'+time_format(start)+'</strong>', 
					'<strong id="stat_'+id_task+'">0<span class="unit">x</span></strong>');
			}
			
		}
		
		else {
			type = 'simple';
			start = 0;
			old_task = task;
			
			document.getElementById('buttons').innerHTML += '<div id="button_'+id_task+'" class="false_button '+gender+'" onclick=\'simple_task("'+id_task+'")\'>'+
				'<span class="caption" id="caption_'+id_task+'">'+task+'</span><span class="points" id="points_'+id_task+'">'+points+'</span></div>';
			stat = task + ' <strong id="stat_'+id_task+'">0<span class="unit">x</span></strong>';
		}
		
		document.getElementById('ul-stats').innerHTML += '<li id="li_stat_'+id_task+'" style="display: none;">'+stat+'</li>';
		
		// Make the arrays for getting info about tasks
		tasks_value.push(start);
		tasks_stat.push(0);
		tasks_started.push(0);
		tasks_caption.push(old_task);
		tasks_points.push(points);
		tasks_type.push(type);
		tasks_start.push(start);
		tasks_notRandom.push(notRandom);
	}
}

function simple_task(id_task) {
	var old_stat = tasks_stat[id_task];
	
	if(tasks_value[id_task] !== 0) {
		tasks_stat[id_task] += Math.round(tasks_value[id_task]); // update stats
		tasks_value[id_task] *= mult; // increase value
		
		// Update caption
		document.getElementById('val_'+id_task).innerHTML = Math.round(tasks_value[id_task])+'<span class="unit">x</span>';
	}
	
	else { // Task that never changes its value
		tasks_stat[id_task]++;
	}
	
	// Update stats
	document.getElementById('stat_'+id_task).innerHTML = tasks_stat[id_task]+'<span class="unit">x</span>';
	
	// Display stats if currently hidden
	if(old_stat === 0)
		document.getElementById('li_stat_'+id_task).style.display = 'list-item';
		
	add_points(tasks_points[id_task]); // add some points
}

function cb_chrono_task(id_task, time, points, old_time) { // callback for next function
	// points and old_time are only there if it is a random task
	old_time = typeof old_time !== 'undefined' ? old_time : tasks_value[id_task];
	points = typeof points !== 'undefined' ? points : tasks_points[id_task];
	
	var old_stat = tasks_stat[id_task];
	var new_time, lasted = false;
	
	if(tasks_started[id_task] !== 0) {
		if(Math.round(time) == 1) { // Time elapsed.
			// Change values
			tasks_value[id_task] *= mult;
			new_time = tasks_value[id_task];
			document.getElementById('val_'+id_task).innerHTML = time_format(Math.round(new_time));
			lasted = (tasks_started[id_task] == 2) ? true : false;
			
			// Update stats.
			tasks_stat[id_task] += Math.round(old_time);
			document.getElementById('stat_'+id_task).innerHTML = time_format(tasks_stat[id_task]);
			
			// Display stats if currently hidden
			if(old_stat === 0)
				document.getElementById('li_stat_'+id_task).style.display = 'list-item';
			
			add_points(points);
		}
		
		else // let's go for another second
			new_time = time - 1;
		
		// update status
		if(!lasted) {
			document.getElementById('status_'+id_task+'_sec').innerHTML = time_format(Math.round(new_time));
			setTimeout('cb_chrono_task("'+id_task+'", '+new_time+', '+points+', '+old_time+')', 1000);
		}
		
		else { // "Last"ed -> stop the task
			tasks_started[id_task] = 0;
			document.getElementById('button_'+id_task).classList.remove('active');
			document.getElementById('ul-status').removeChild(document.getElementById('status_'+id_task));
		}
	}
	
	// else task stopped = no points
}

function chrono_task(id_task) {
	var time = tasks_value[id_task];
	var points = tasks_points[id_task];
	var caption = tasks_caption[id_task];
	var status;

	if(tasks_started[id_task] == 0) { // begin task
		tasks_started[id_task] = 1;

		status = caption.replace('#', '<strong id="status_'+id_task+'_sec">'+time_format(Math.round(time))+'</strong>');
		status += '<span style="opacity: .5;"> for <strong>'+points+'</strong> points</span>';
		
		document.getElementById('button_'+id_task).classList.add('active');
		document.getElementById('ul-status').innerHTML += '<li id="status_'+id_task+'">'+
			'<a href="#" class="chrono_stop" onclick="chrono_task('+id_task+'); return false;" title="Stop the task">S</a>'+
			'<a href="#" class="chrono_last" id="chrono_last_'+id_task+'" onclick="chrono_last('+id_task+'); return false;" title="Stop the task after the countdown finishes">L</a>&nbsp;'+
			status+'</li>';
		
		setTimeout('cb_chrono_task("'+id_task+'", '+time+')', 1000);
	}
	
	else {	// Stop task
		tasks_started[id_task] = 0;
		document.getElementById('button_'+id_task).classList.remove('active');
		document.getElementById('ul-status').removeChild(document.getElementById('status_'+id_task));
	}
}

function chrono_last(id_task) {
	if(tasks_started[id_task] == 1) {
		tasks_started[id_task] = 2;
		document.getElementById('chrono_last_'+id_task).classList.add('lasted');
	}	
	
	else {
		tasks_started[id_task] = 1;
		document.getElementById('chrono_last_'+id_task).classList.remove('lasted');
	}
}