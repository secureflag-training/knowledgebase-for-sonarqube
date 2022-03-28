export function formatDateWithBrowserTimeZone(date, locale) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  if (locale) {
    return date.toLocaleString(locale, {timeZone})
  }
  return date.toLocaleString(undefined, {timeZone})
}