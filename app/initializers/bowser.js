export default {
  name: 'bowser',

  initialize() {
    const browserName = bowser.name.toLowerCase()
    const browserVerion = '-' + bowser.version.split('.')[0]
    document.documentElement.classList.add(browserName, browserVerion)
  }
}
