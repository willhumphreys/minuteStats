
const ONE_HOUR = 1000 * 60 * 60;

export const timeDiff = (startDate, endDate) => {

    if (startDate != null) {
        const timeDiff = Math.abs(startDate.getTime() - endDate.getTime());

        if (timeDiff > ONE_HOUR) {
            console.log(`Invalid gap ${timeDiff} previous ${startDate.toISOString()} current ${endDate.toISOString()}`);
            return true;
        }
        return false;

    }
    return false;

}