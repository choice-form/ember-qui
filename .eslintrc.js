module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  extends: 'eslint:recommended',
  env: {
    browser: true
  },
  globals: {
    device: false,
    plyr: false,
    PhotoSwipe: false,
    PhotoSwipeUI_Default: false
  },
  rules: {
  }
};
