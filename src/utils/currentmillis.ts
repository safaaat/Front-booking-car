export const dateToUnixTime = (value: Date | null) => {
    if (value) {
        const date = new Date(value);
        const unixTimestamp = Math.floor(date.getTime() / 1000);

        return unixTimestamp;
    } else {
        return null
    }
}

export const durationBooking = (start_time: number, end_time: number) => {
    const secondsPerDay = 60 * 60 * 24;
    const durationInSeconds = end_time - start_time;
    const totalDays = Math.ceil(durationInSeconds / secondsPerDay);

    const months = Math.floor(totalDays / 30);
    const days = totalDays % 30;

    let result = '';
    if (months > 0) {
        result += `${months} Bulan`;
    }
    if (days > 0) {
        result += `${months > 0 ? ' ' : ''}${days} Hari`;
    }

    // Jika 0 hari dan 0 bulan (misal waktu sangat dekat), tetap tampilkan "0 Hari"
    return result || '0 Hari';
};