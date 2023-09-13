var x = window.matchMedia("(min-width: 750px)");

function addElementIfNotMatched(x) {
    const existingDiv = document.querySelector(".second-solid");

    if (!x.matches) {
        // The screen width is less than 750px
        if (!existingDiv) {
            // Create and add the element if it doesn't already exist
            const newDiv = document.createElement("div");
            newDiv.classList.add("second-solid");

            const buttonContainer = document.querySelector(".button-container");
            const lastChild = buttonContainer.lastElementChild;

            buttonContainer.insertBefore(newDiv, lastChild.nextSibling);
        }
    } else {
        // The screen width is greater than or equal to 750px
        if (existingDiv) {
            // Remove the element if it exists
            existingDiv.remove();
        }
    }
}

// Initial check when the page loads
addElementIfNotMatched(x);

// Add an event listener to detect changes in the screen size
x.addListener(addElementIfNotMatched);



function calculate(month, day, year){
    var today = new Date();
    var current_year = today.getFullYear()
    var current_month = (today.getMonth()+1)
    var current_day = today.getDate();

    var birthMonth =  month;
    var birthDay  =  day;
    var birthYear =  year;

    var finalYear = 0;
    var finalMonth = 0;
    var finalDay = 0;

    var iniDay = 0;
    var iniDay2 = 0;
    var iniDay3 = 0;
    var allMonthsDays=[]

    const daysInMonths = [
        31, // January
        28, // February (non-leap year)
        31, // March
        30, // April
        31, // May
        30, // June
        31, // July
        31, // August
        30, // September
        31, // October
        30, // November
        31, // December
    ];
    const daysInMonthsLeap = [
        31, // January
        29, // February (non-leap year)
        31, // March
        30, // April
        31, // May
        30, // June
        31, // July
        31, // August
        30, // September
        31, // October
        30, // November
        31, // December
    ];

    //List all the leap years between birth year and current year
    if(current_year > birthYear){
        var leapYears = []
        for(var i = birthYear; i <= current_year; i++){
            if(i % 4 === 0 && i % 100 !== 0 || i % 400 === 0){
                leapYears.push(i);
            }
        }
    }    
    //Push years including birth year and current year
    if(current_year-birthYear !== 0){
        for(var i = birthYear; i <= current_year; i++){
            //checks if birthyear is leap year or not
            if(i % 4 === 0 && i % 100 !== 0 || i % 400 === 0){
                iniDay += 366;
                allMonthsDays.push(366)
            }else{
                iniDay += 365;
                allMonthsDays.push(365)
            }
        }
        
        //Gets total days of birth year
        if(allMonthsDays.length > 1){
            var deductedMonth = birthMonth-1;
            //calculate each day of months prior to birthmonth on the same birthyear
            for(var i = deductedMonth; i < 12; i++ ){
                if(i===deductedMonth){
                    var remainDay = daysInMonths[deductedMonth] - birthDay;
                    iniDay2 += remainDay;
                }else{
                    iniDay2 += daysInMonths[i]
                }
            }
        }
        //removes first item on array
        allMonthsDays.shift()
        //adds item on the first position of array
        allMonthsDays.unshift(iniDay2)

        //Gets total days of the current year until the current day
        var currentMonthPosition=current_month-1;
        //calculate total days since first month of the current year
        for(var r = 0; r < current_month; r++){
            if(r === currentMonthPosition){
                iniDay3 += current_day;
            }else{
                iniDay3 += daysInMonths[r];
            }
        }
        //remove last item in array
        allMonthsDays.pop()
        //adds an item on the last position of array
        allMonthsDays.push(iniDay3)

        //Calculate the total days since the birthdate of the user
        var value = 0;
        for(var i = 0; i < allMonthsDays.length; i++){
            value += allMonthsDays[i]
        }
        
        var finalYear = Math.floor(((value-leapYears.length)/365))
        var finalMonth = Math.floor( ((value-leapYears.length)%365)/30)
        var finalDay = Math.floor( ((value-leapYears.length)%365)% 30);

        document.querySelector(".yearResult").textContent = finalYear;
        document.querySelector(".dayResult").textContent = finalDay;
        document.querySelector(".monthResult").textContent = finalMonth;
        console.log("Years: "+finalYear+ " Months: "+finalMonth+" Days: "+finalDay)
        
    }else{
        //Condition if user has less than 12 months of living
        var monthsList=[]
        var iniDay = 0;
        var birthMonthPosition = birthMonth-1;
        if(current_month-birthMonth < 0){
            //Push days in months to an array starting January until the current month
            for(var i = 0; i < current_month; i++){
                // if month is the current month, push the current day
                if(i === (current_month-1)){
                    iniDay += current_day;
                    monthsList.push(current_day)
                }else{
                    iniDay += daysInMonths[i]
                    monthsList.push(daysInMonths[i])
                }

            } 
            //Push days in months to an array from user's birthyear until december
            for(var j = birthMonthPosition; j < 12; j++){
                if(j === (birthMonthPosition)){
                    iniDay += daysInMonths[j]-birthDay;
                    monthsList.push(daysInMonths[j]-birthDay)
                }else{
                    iniDay += daysInMonths[j];
                    monthsList.push(daysInMonths[j])
                }

            }
            
        }else if(birthMonthPosition === current_month-1){
            iniDay += current_day-birthDay;
            monthsList.push(iniDay)
        }else{
            for(var i = birthMonthPosition; i < current_month; i++){
                if(i === (current_month-1)){
                    iniDay += current_day;
                    monthsList.push(current_day)
                }else if(i === (birthMonth-1)){
                    iniDay += daysInMonths[i] - birthDay
                    monthsList.push(daysInMonths[i]-birthDay)
                }else{
                    iniDay += daysInMonths[i];
                    monthsList.push(daysInMonths[i])
                    console.log(iniDay)
                }       
            }
        }
        var lastMonthItem = monthsList.length-1
        // Calculates the total months
        if(monthsList.length > 1){
            if( (((monthsList[0] + (monthsList[lastMonthItem])) >= 30) && ((monthsList[0] + (monthsList[lastMonthItem])) <= 31))){
                var finalMonth = monthsList.length-1
                var finalDay = 0;
            }else if( (((monthsList[0] + monthsList[lastMonthItem]) > 31))  && (monthsList[0] +  monthsList[lastMonthItem]) < 60 ){
                var finalMonth = monthsList.length-1;
                var finalDay = ((monthsList[0] + monthsList[lastMonthItem]) - 30) 
            }else if( ((monthsList[lastMonthItem] >= 30)&&(monthsList[0]>=30))){
                var finalMonth = monthsList.length
                var finalDay = monthsList[0]
            }else if((monthsList[0] + monthsList[lastMonthItem] < 30)){
                var finalMonth = monthsList.length-1
                var finalDay = monthsList[0] + monthsList[lastMonthItem];
            }else{
                var finalMonth = monthsList.length-2
                var finalDay = monthsList[0] + monthsList[lastMonthItem];
            }
        }else{
            var finalMonth = 0;
            var finalDay = monthsList[0];
        }
        
        var finalYear = Math.floor(iniDay/365)
        
        document.querySelector(".yearResult").textContent = finalYear;
        document.querySelector(".dayResult").textContent = finalDay;
        document.querySelector(".monthResult").textContent = finalMonth;
    }

}

var x = document.querySelector(".calculate")
x.addEventListener("click", function(){
    var today = new Date();
    var current_year = today.getFullYear()

    const daysInMonths = [
        31, // January
        28, // February (non-leap year)
        31, // March
        30, // April
        31, // May
        30, // June
        31, // July
        31, // August
        30, // September
        31, // October
        30, // November
        31, // December
    ];
    const daysInMonthsLeap = [
        31, // January
        29, // February (non-leap year)
        31, // March
        30, // April
        31, // May
        30, // June
        31, // July
        31, // August
        30, // September
        31, // October
        30, // November
        31, // December
    ];

    // Check if the day is valid based on the month (taking leap years into account)
    var month = document.getElementById('month').value.trim();
    var day = document.getElementById("day").value.trim();
    var year = document.getElementById("year").value.trim();
    
    function checkDate(monthInput, dayInput, yearInput){
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth()+1;
        
        const yearValue = currentYear-year;
        const monthValue = currentMonth-monthInput;
        const dayValue =currentDay-dayInput;
        if( (yearValue === 0 && monthValue < 0) ){
            return false;
        }else if(yearValue === 0 && monthValue === 0 && dayValue <0){
            return false;
        }else{
            return true;
        }
    }

    var monthValue = 0;
    var yearValue = 0;

    function validateAndStyleField(fieldId, msgSelector, labelId) {
        const field = document.getElementById(fieldId);
        const msg = document.querySelector(msgSelector);
        const label = document.getElementById(labelId);
        
        //Checks if value is empty
        if (field.value === "") {
            msg.textContent = "This field is required";
            field.style.borderColor = "red";
            label.style.color = "#ee6d74";
            return null;
        //If not, clear the style attributed to the element
        }else{
            msg.textContent = "";
            field.style.borderColor ="";
            label.style.color = "";
        }

       

        //Month element validation if valid
        if(fieldId === "month"){
            if(checkDate(month, day, year) === false){
                msg.textContent = "Must be in the past";
                field.style.borderColor = "red";
                label.style.color = "#ee6d74";
                return null;
            }else{
                msg.textContent = "";
                field.style.borderColor ="";
                label.style.color = "";
            }
            if(field.value >= 1 && field.value <= 12){
                console.log("Pass")
                monthValue = field.value;
            }else{
                msg.textContent = "Must be a valid month";
                field.style.borderColor = "red";
                label.style.color = "#ee6d74";
                return null;
            }
        }else{
            msg.textContent = "";
            field.style.borderColor ="";
            label.style.color = "";
        }

        //Year element validation if valid
        if(fieldId === "year"){
            if(field.value >= 0 && field.value <= current_year){
                yearValue = field.value;
            }else if(field.value > current_year){
                msg.textContent = "Must be in the past";
                field.style.borderColor = "red";
                label.style.color = "#ee6d74";
                return null;
            }else{
                msg.textContent = "Must be a valid year";
                field.style.borderColor = "red";
                label.style.color = "#ee6d74";
                return null;
            }
        }else{
            msg.textContent = "";
            field.style.borderColor ="";
            label.style.color = "";
        }

        function checkIfLeapYear(yearValue){
            if( (year % 4 === 0 && year % 100 !== 0)||(year%400 === 0) ){
                return true;
            }else{
                return false;
            }
        }

        //Day validation if valid
        if(fieldId === "day"){
            //If leap year
            if(checkDate(month, day, year) === false){
                msg.textContent = "Must be in the past";
                field.style.borderColor = "red";
                label.style.color = "#ee6d74";
                return null;
            }else{
                msg.textContent = "";
                field.style.borderColor ="";
                label.style.color = "";
            }

            if(checkIfLeapYear() === true){
                if(field.value > 0 && field.value <= daysInMonthsLeap[monthValue-1]){
                    console.log("day pass")
                }else if(field.value > daysInMonthsLeap[monthValue-1]){
                    msg.textContent = "Must be a valid day";
                    field.style.borderColor = "red";
                    label.style.color = "#ee6d74";
                    return null;
                }else{
                    msg.textContent = "Must be a valid date";
                    field.style.borderColor = "red";
                    label.style.color = "#ee6d74";
                    return null;
                }
            //If not leap year
            }else{
                if(field.value > 0 && field.value <= daysInMonths[monthValue-1]){
                    console.log("day pass")
                }else if(field.value > daysInMonths[monthValue]){
                    msg.textContent = "Must be a valid day";
                    field.style.borderColor = "red";
                    label.style.color = "#ee6d74";
                    return null;
                }else{
                    msg.textContent = "Must be a valid date";
                    field.style.borderColor = "red";
                    label.style.color = "#ee6d74";
                    return null;
                }
            }
        }else{
            msg.textContent = "";
            field.style.borderColor ="";
            label.style.color = "";
        }
    
        return field.value;
    }

    //Function that checks if input year is a leap year or not
    const birthMonth = validateAndStyleField("month", ".month-msg", "month-label");
    const birthDay = validateAndStyleField("day", ".day-msg", "day-label");
    const birthYear = validateAndStyleField("year", ".year-msg", "year-label");
    
    if (birthMonth !== null && birthDay !== null && birthYear !== null) {
        // All fields are valid, you can proceed with further actions here
        // For example, you can use birthMonth, birthDay, and birthYear in this block
        calculate(birthMonth, birthDay, birthYear);
        // checkDate()
    }
      
})
