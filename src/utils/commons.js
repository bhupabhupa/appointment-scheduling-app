const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export const getUserId = () => {
    let user = sessionStorage.getItem('user');
    let user_id = "";
    if(user) {
        user = JSON.parse(user)
        user_id = user._id
    }

    return user_id;
}


export const formatDate = (myDate, myTime, duration) => {
	
    let endTime = getEndTimeFormat(myTime, duration);
	let dateString = getDateFormat(myDate);

	let formatDateTime = myTime + " - " + endTime + ", " + dateString

	return formatDateTime;
}

export const getEndTimeFormat = (myTime, duration) => {
    let amPmSplit = myTime.split('');
	let amPm = amPmSplit[amPmSplit.length-2] + amPmSplit[amPmSplit.length-1]
	let timeSplit = myTime.split('am').join('').split('pm').join('').split(":")

	let myMin = parseInt(timeSplit[1]) + parseInt(duration);
	let myHour = parseInt(timeSplit[0])
	if(myMin >= 60) {
		myMin -= 60
		myHour += 1
	}

	if(myHour>=12) {
		amPm = 'pm'
    }
    
	if(myHour>12) {
		myHour -= 12
    }
    if(myMin < 10) {
        myMin = ('0'+myMin)
    }
    let endTime = myHour+":"+myMin+amPm;

    return endTime;
    
}

export const getDateFormat = (dateObj) => {
    let newDate = new Date(dateObj);
    return (weekdays[newDate.getDay()] + ", " + months[newDate.getMonth()] + " " + newDate.getDate() + ", " + newDate.getFullYear());
}

export const compareMeetingDate = (a, b) => {
    const bandA = new Date(a.meetingDate);
    const bandB = new Date(b.meetingDate);
  
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }


  export const sortObject = (obj) => {
    let keyList = Object.keys(obj).sort(compareKeys)
	const temp = {}
	for (let i = 0; i < keyList.length; i++) {
        temp[keyList[i]] = obj[keyList[i]];
        delete obj[keyList[i]];
    }

    for (var i = 0; i < keyList.length; i++) { 
        obj[keyList[i]] = temp[keyList[i]]; 
    }
    return obj;
}

export const compareKeys = (a, b) => {
  // Use toUpperCase() to ignore character casing
  const bandA = new Date(a);
  const bandB = new Date(b);

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
}