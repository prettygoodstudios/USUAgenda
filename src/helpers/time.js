export function parseTime(time){
    if(!time) return "";
    let hour = parseInt(time.split(":")[0]);
    const amPM = hour >=12 ? "PM" : "AM";
    hour = hour == 0 ? 12 : hour;
    hour = hour > 12 ? hour-12 : hour;
    return hour+":"+time.split(":")[1]+" "+amPM;
}