export const formatDate = (datestr) => {
    const inputDate = new Date(datestr);

    function getOrdinalSuffix(day) {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    const day = inputDate.getUTCDate();
    const month = inputDate.toLocaleString('en-GB', { month: 'short', timeZone: 'UTC' });
    const year = inputDate.getUTCFullYear();
    const hours = inputDate.getUTCHours();
    const minutes = inputDate.getUTCMinutes().toString().padStart(2, '0');

    const suffix = getOrdinalSuffix(day);

    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHour = hours % 12 || 12;

    const formattedDate = `${day}${suffix} ${month}, ${year} ${formattedHour}:${minutes}${period}`;

    return formattedDate;
}
