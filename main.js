'use strict';

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
var fs = require('fs');
var dialog = electron.dialog;
let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({width: 1200, height: 800, show: false})
  mainWindow.loadURL(`file://${__dirname}/app/index.html`)

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
