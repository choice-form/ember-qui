import { device } from 'device';

export default {
  initialize() {
    device.addClasses(document.documentElement);

    if (bowser.msie) {
      const classNames = ` ie -${bowser.version.split('.')[0]}`
      document.documentElement.classNames += classNames
    } else {
      const classNames = bowser.name.toLowerCase().split(' ')

      if (bowser.version) {
        classNames.push('-' + bowser.version.split('.')[0])
      }

      const classList = document.documentElement.classList
      classList.add.apply(classList, classNames)
    }
  }
}
