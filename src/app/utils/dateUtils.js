export const convertFireDateToString = (date) => {
  return `${date?.toDate().toString().split(' ')[1]} ${date?.toDate().toString().split(' ')[2]} ${date?.toDate().toString().split(' ')[3]}`
}

export const convertFireDateToMonthAndYear = (date) => {
  return `${date?.toDate().toString().split(' ')[1]} ${date?.toDate().toString().split(' ')[3]}`
}

export const convertFireDateToInputDateFormat = (date) => {
  return `${date?.toDate().toString().split(' ')[3]}-${monthNames.indexOf(date?.toDate().toString().split(' ')[1]) < 10 ? '0'+monthNames.indexOf(date?.toDate().toString().split(' ')[1]) : monthNames.indexOf(date?.toDate().toString().split(' ')[1])}-${date?.toDate().toString().split(' ')[2]}`
}

export const msToDays = (ms) => {
  return (ms / (60*60*24*1000))
}

export const monthNames = ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


export const msToTime = (ms) => {
    let seconds = Math.floor((ms / 1000) % 60),
    minutes = Math.floor((ms / (1000 * 60)) % 60),
    hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return hours + ":" + minutes + ":" + seconds
}

export const getDaysAgo = (date) => {
  return Math.round(msToDays(Date.now()) - msToDays(date))
}

export const formatAMPM = (date) => {
  let hours = date?.getHours();
  let minutes = date?.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; 
  minutes = minutes < 10 ? '0'+minutes : minutes;
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}