export default (str) => {
  const pattern = new RegExp('^(https?:\\/\\/).*$','i')
  return pattern.test(str)
}
