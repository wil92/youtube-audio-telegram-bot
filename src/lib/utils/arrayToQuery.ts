export function arrayToQuery(array: any[] = []): string {
    return '[' + array.reduce((previousValue, currentValue, currentIndex) => {
        return previousValue + (currentIndex ? ',' : '') + `"${currentValue}"`
    }, '') + ']'
}
