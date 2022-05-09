

export const countChars = (value: string): number =>
  value.replace(/(\r\n|\n\r|\r|\n)/g, '').length

export const countWords = (value: string): number => {
  return value.length === 0
    ? value.length
    : value.replace(/(\r\n|\n\r|\r|\n)/g, '').split(/\s+/).length
}
