import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return {
      temp: [
        {href: "/icp", label: "icon preview"},
        {href: "/temp/faker", label: "faker"},
      ],
      page: [
        {href: "/single", label: "single"},
        {href: "/contact-information/gender", label: "gender"},
      ],
      welcome: [
        {href: "/welcome/cover", label: "cover"},
        {href: "/welcome/full-screen-cover", label: "full-screen-cover"},
        {href: "/welcome/no-cover", label: "no-cover"},
      ],
      question: [
        {href: "/question/choice", label: "choice"},
        {href: "/question/end-page", label: "end-page"},
        {href: "/question/file-upload", label: "file-upload"},
        {href: "/question/icon", label: "icon"},
        {href: "/question/intro-page", label: "intro-page"},
        {href: "/question/location", label: "location"},
        {href: "/question/dropdown", label: "dropdown"},
        {href: "/question/ranking", label: "ranking"},
        {href: "/question/rating", label: "rating"},
        {href: "/question/region", label: "region"},
        {href: "/question/short-text", label: "short-text"},
        {href: "/question/range", label: "range"},
        {href: "/question/slide", label: "slide"},
        {href: "/question/matrix", label: "matrix"},
        {href: "/question/weight", label: "weight"},
        {href: "/question/lottery", label: "lottery"},
      ],
      picture: [
        {href: "/question/picture-choice/grid", label: "grid"},
        {href: "/question/picture-choice/matrix", label: "matrix"},
        {href: "/question/picture-choice/pinterest", label: "pinterest"},
        {href: "/question/picture-choice/superscript", label: "superscript"},
        {href: "/question/picture-choice/thumbnail", label: "thumbnail"},
        {href: "/question/picture-choice/full", label: "full"},
      ],
      verification: [
        {href: "/question/verification/captcha", label: "captcha"},
        {href: "/question/verification/password", label: "password"},
        {href: "/question/verification/sms", label: "sms"},
      ],
      reward: [
        {href: "/reward/custom", label: "custom"},
        {href: "/reward/random", label: "random"},
        {href: "/reward/wechat", label: "wechat"},
      ],
      warning: [
        {href: "/warning/complete", label: "complete"},
        {href: "/warning/error", label: "error"},
        {href: "/warning/planning", label: "planning"},
      ],
      other: [
        {href: "/notification", label: "notification"},
      ]
    };
  }
});
