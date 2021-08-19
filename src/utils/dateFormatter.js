export default function dateFormatter(selectedDate) {
    let day;
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let hours = selectedDate.getHours();
    let minutes = selectedDate.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    const today = new Date();
    var tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    if (
        selectedDate.getDate() === today.getDate() &&
        selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getFullYear() === today.getFullYear()
    ) {
        day = "Today";
    } else if (
        selectedDate.getFullYear() === tomorrow.getFullYear() &&
        selectedDate.getMonth() === tomorrow.getMonth() &&
        selectedDate.getDate() === tomorrow.getDate()
    ) {
        day = "Tomorrow";
    } else {
        day = days[selectedDate.getDay()];
    }
    const d = `${day} ${strTime}`;
    return [d, day];
}