fx_version 'cerulean'
games { 'gta5' }

author 'Classy'
description 'Classy HUD'
version '1.0.0'

client_script 'packages/resource/dist/client.js'

server_script 'packages/resource/dist/server.js'

files {
  'packages/ui/dist/index.html',
  'packages/ui/dist/*',
  'packages/ui/dist/**/*',
  'packages/ui/dist/**/**/*',
}

ui_page 'packages/ui/dist/index.html'
