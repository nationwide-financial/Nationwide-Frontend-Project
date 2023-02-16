export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export function getDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear() || ""} - ${date.getMonth() || ""} - ${date.getDate() || ""}`;
} 