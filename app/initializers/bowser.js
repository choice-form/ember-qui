import bowser from 'bowser';

export default {
  name: 'bowser',

  initialize() {
    if (bowser.msie && bowser.version <= 9) {
      const classNames = ` ie -${bowser.version.split('.')[0]}`
      document.documentElement.classNames += classNames
    } else {
      const classNames = bowser.name.toLowerCase().split(' ')
      classNames.push('-' + bowser.version.split('.')[0])

      const classList = document.documentElement.classList
      classList.add.apply(classList, classNames)
    }
  }
}
