var menubar = require('menubar')

var mb = menubar()

mb.on('ready', function ready () {
  console.log('app is ready')
})

mb.on('after-create-window', function() {
  mb.window.openDevTools();
})