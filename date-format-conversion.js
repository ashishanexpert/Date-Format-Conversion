$(function(){
	// Utility Function
	function toDate(dateString){
		var monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
			dateArr = [],
			day,
			month,
			year,
			dateObj;
		
		// Filtering out DIGITS only cases
		dateArr = dateString.match(/\d{1,4}|[a-zA-Z]{2,9}/g);
		
		// Getting date elements from the input
		if(dateArr.length === 2){
			if(isMonthInDigits(dateArr[0]) && isDay(dateArr[1])){  // mm-dd
				day = dateArr[1];
				month = dateArr[0] - 1;
			} else if(isMonthInDigits(dateArr[1]) && isDay(dateArr[0])) {  // dd-mm
				day = dateArr[0];
				month = dateArr[1] - 1;
			} else if(isMonthInAlphabets(dateArr[0]) && isDay(dateArr[1])){  // MMM-dd
				day = dateArr[1];
				month = isMonthInAlphabets(dateArr[0]);
			} else if(isMonthInAlphabets(dateArr[1]) && isDay(dateArr[0])) {  // dd-MMM
				day = dateArr[0];
				month = isMonthInAlphabets(dateArr[1]);
			}
			
			year = new Date().getFullYear();
		} else if(isMonthInDigits(dateArr[0]) && isDay(dateArr[1]) && isYear(dateArr[2])){ // mm-dd-yyyyy
			day = dateArr[1];
			month = dateArr[0] - 1;
			year = dateArr[2];
		} else if(isMonthInDigits(dateArr[1]) && isDay(dateArr[0]) && isYear(dateArr[2])){ // dd-mm-yyyy
			day = dateArr[0];
			month = dateArr[1] - 1;
			year = dateArr[2];
		} else if(isMonthInDigits(dateArr[1]) && isDay(dateArr[2]) && isYear(dateArr[0])){ // yyyy-MM-dd
			day = dateArr[2];
			month = dateArr[1] - 1;
			year = dateArr[0];
		} else if(isMonthInAlphabets(dateArr[0]) !== false && isDay(dateArr[1]) && isYear(dateArr[2])){ //MMM-dd-yyyy
			day = dateArr[1];
			month = isMonthInAlphabets(dateArr[0]);
			year = dateArr[2];
		} else if(isMonthInAlphabets(dateArr[1]) !== false && isDay(dateArr[0]) && isYear(dateArr[2])){ // dd-MMM-yyyy
			day = dateArr[0];
			month = isMonthInAlphabets(dateArr[1]);
			year = dateArr[2];
		}
		
		// If OK: go to next step
		if(day && !isNaN(month) && year){
			dateObj = new Date(year, month, day);
		}
		
		// Validation functions
		function isMonthInDigits(input){
			return input <= 12;
		}
		
		function isMonthInAlphabets(input){
			var isMonth = false;
			for(var i=0, lim = monthNames.length; i<lim; i++){
				if(monthNames[i].indexOf(input.toLowerCase()) === 0){
					isMonth = i;
					break;
				}
			}
			return isMonth;
		}
		
		function isDay(input){
			return input <= 31;
		}
		
		function isYear(input){
			return input >= 1900;
		}
		
		return dateObj || "";
	}
	
	// Updating the element
	function formatDate(e){
		var $elm = $(e.target).removeClass("error"),
			val = $elm.val(),
			dateFormat = $(":radio[name=date-format]:checked").val(),
			monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			dateObj = toDate(val, $elm),
			month,
			day,
			output;
			
		//
		if(dateObj){
			month = dateObj.getMonth() + 1;
			day = dateObj.getDate();
			
			//	
			month = month < 10 ? "0" + month : month;
			day = day < 10 ? "0" + day : day;
			
			//
			switch(dateFormat){
				case "1":
					output = month + "-" + day + "-" + dateObj.getFullYear();
					break;
				case "2":
					output = day + "-" + month + "-" + dateObj.getFullYear();
					break;
				case "3":
					output = day + "-" + monthNames[dateObj.getMonth()] + "-" + dateObj.getFullYear();
					break;
				case "4":
					output = monthNames[dateObj.getMonth()] + "-" + day + "-" + dateObj.getFullYear();
					break;
				case "5":
					output = dateObj.getFullYear() + "-" + month + "-" + day;
					break;
			}
			
			output && $elm.val(output);
		} else {
			$elm.addClass("error");
		}
	}
	
	
	$("#date-field").change(formatDate);
	$(":radio[name=date-format]").change(function(){
		$("#date-field").change();
	});
});
