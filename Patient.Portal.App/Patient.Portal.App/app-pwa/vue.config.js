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
    }
  },
  devServer: {
    port: 8080, // CHANGE YOUR PORT HERE!
    https: false
  }
}
