import Route from '@ember/routing/route';
import faker from 'faker';

export default Route.extend({
  beforeModel() {
    // 在进入应用程序之前，设定 faker 使用的语言
    faker.locale = 'zh_CN';

    // 并且模拟某种语言应用在应用程序里（模拟多语言）
    document.documentElement.setAttribute('lang', 'zh-CN');
  }
});
