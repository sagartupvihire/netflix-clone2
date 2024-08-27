export function formatReleseDate(date) {
    return new Date(date).toLocaleDateString('en-India', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}