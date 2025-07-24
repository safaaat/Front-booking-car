export const extractImageUrl = (event: any) => {
    try {
        const objFromDB = JSON.parse(event);
        const arr = Object.values(objFromDB);
        return arr;
    } catch (error) {
        console.warn('Invalid JSON format:', event);
        return [];
    }
}