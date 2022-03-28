export function formatDateWithBrowserTimeZone(date) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  return date.toLocaleString(undefined, {timeZone: timezone})
}