export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export function getDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear() || ""} - ${date.getMonth() || ""} - ${date.getDate() || ""}`;
} 

export function getDateWithDay(ts){
    let date = new Date(ts);
    return date.toDateString();
}

export function orderArray(data,time){
    let orderedData = data?.sort((a, b) => (a[`${time}`] < b[`${time}`]) ? 1 : ((b[`${time}`] < a[`${time}`]) ? -1 : 0));
    return orderedData;
}