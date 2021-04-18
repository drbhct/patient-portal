module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: 'Phunkey Patient Portal',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      exclude: [
        /^.*\/codemirror\/.*$/
      ]
    },
    iconPaths: {
      favicon32: 'assets/icon/favicon-32x32.png',
      favicon16: 'assets/icon/favicon-16x16.png',
      appleTouchIcon: 'assets/icon/apple-icon-152x152.png',
      maskIcon: 'assets/icon/safari-pinned-tab.svg',
      msTileImage: 'assets/icon/ms-icon-144x144.png'
    }
  },
  devServer: {
    port: 8080, // CHANGE YOUR PORT HERE!
    https: false
  }
}
