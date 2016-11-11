export default {
  name: 'bowser',

  initialize() {
    const classNames = bowser.name.toLowerCase().split(' ')
    classNames.push('-' + bowser.version.split('.')[0])

    const classList = document.documentElement.classList
    classList.add.apply(classList, classNames)
  }
}
