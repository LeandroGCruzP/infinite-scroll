export function formatDate (value: string, locale = 'pt-br') {
  const newDateFormat = new Date(value).toLocaleDateString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  return newDateFormat
}
