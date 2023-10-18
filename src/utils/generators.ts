export function nameWithTimestamp(prefix: string): string {
  const currentDate = new Date()

  const day = String(currentDate.getDate()).padStart(2, '0')
  const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Los meses en JavaScript van de 0 a 11
  const year = String(currentDate.getFullYear()).slice(-2)
  const hour = String(currentDate.getHours()).padStart(2, '0')
  const minute = String(currentDate.getMinutes()).padStart(2, '0')

  return `${prefix}_${day}${month}${year}_${hour}${minute}`
}
