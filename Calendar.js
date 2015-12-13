function Calendar(div_id) {
	this.div = document.createElement('div');
	this.div.setAttribute('id', div_id);

	// Create unique ID tags of buttons for CSS & JavaScript
	this.next_month = div_id + "-next-button";
	this.prev_month = div_id + "-prev-button";

	document.body.appendChild(this.div);
}

Calendar.prototype.render = function(date) {
	// General information for month names, month lengths, and day labels
	var month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septemeber', 'October', 'November', 'December'];
	var month_lengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var leap_year_length = 29;
	var day_labels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

	// Date-specific variable declaration
	var month = date.getMonth();
	var year = date.getFullYear();
	var first_day = new Date(year, month, 1);
	var starting_day = first_day.getDay();
	var month_name = month_names[month];
	var month_length = month_lengths[month];

	// Function to check if it's a leap year
	function leap_year_check(year) {
		if (year % 400 == 0 || year % 4 == 0 && year % 100 != 0) {
			return true;
		} else {
			return false;
		}
	}

	// Check if it's a leap year
	if (month == 1 && leap_year_check(year) == true) {
		month_length = leap_year_length; // Special value for Feb length in leap year		
	}

	// Set previous month length for displaying previous month days.
	// If it's MAR, check if this year is a leap year since the 
	// previous month is FEB.
	var previous_month_length;
	if (month == 0) { // If it's JAN, the previous month is DEC
		previous_month_length = month_lengths[11];
	} else if (month == 2 && leap_year_check(year) == true) {
		previous_month_length = leap_year_length;
	} else { 
		previous_month_length = month_lengths[month-1];
	}

	// Generating the calendar html
	var cal_html = '<table class="cal-table">';

	// Create calendar title and buttons
	cal_html += "<tr><th id='cal-title' colspan='7'>" + "<button id="+ this.prev_month + "><</button>" + "&nbsp;&nbsp;" + month_name + "&nbsp;" + year + "&nbsp;&nbsp;" + "<button id="+ this.next_month + ">></button>" + "</th></tr>";

	// Create calendar column headers
	cal_html += '<tr id="cal-header">';
	for (i = 0; i < day_labels.length; i++) {
		cal_html += "<th class='cal-headers'>" + day_labels[i] + "</th>";
	}
	cal_html += '</tr>';

	// Create the current calendar weeks/days
	var days_count = 1;
	var days_in_week_count;

	while (days_count <= month_length) {
		days_in_week_count = 0;
		cal_html += "<tr class='month-days'>";
		while (days_in_week_count <= 6) {
			if ( days_count == 1 ) {     
				// Create the previous months' days     
				for ( j = 1; j <= starting_day; j++ ) {
					cal_html += "<td class='other-month-day'>" + (previous_month_length - starting_day + j) + "</td>";
					days_in_week_count ++;
				}
			}

			// Create displayed months' days
			if (days_count <= month_length) {
				cal_html += "<td class='displayed-month-day'>" + days_count + "</td>";
				days_count ++;
				days_in_week_count ++;
			} else {
				// Create the next month's days
				while (days_in_week_count <= 6) {
					cal_html += "<td class='other-month-day'>" + (days_count - month_length) + "</td>";
					days_in_week_count ++;
					days_count ++;
				}
			}		
		}
		cal_html += "</tr>";	
	}

	// Write the calendar html to the appropriate div
	this.div.innerHTML = cal_html;

	// Navigate to previous months/years with arrows
	document.getElementById(this.prev_month).onclick = function() {
		if (month == 0) {
			date.setMonth(11);
			date.setFullYear(year - 1);
		} else { 
			date.setMonth(month - 1);
		}
		this.render(date);
	}.bind(this)

	// Navigate to next months/years with arrows
	document.getElementById(this.next_month).onclick = function() {
		if (month == 11) {
			date.setMonth(0);
			date.setFullYear(year + 1);
		} else { 
			date.setMonth(month + 1);
		}j
		this.render(date);
	}.bind(this)

}

var calendar1 = new Calendar("div1");
calendar1.render(new Date("January, 2009"));
var calendar2 = new Calendar("div2");
calendar2.render(new Date());