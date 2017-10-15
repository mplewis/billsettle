export default function (count, word) {
  const s = count === 1 ? '' : 's'
  return `${count} ${word}${s}`
}
