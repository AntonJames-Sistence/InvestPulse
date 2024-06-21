export const formatPercentage = (value: number) => {
    if (typeof value !== 'number') {
        return parseFloat(value).toFixed(2);
    }
    return value.toFixed(2);
};