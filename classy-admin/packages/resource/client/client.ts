import { ClientUtils, RegisterNuiCB } from '@project-error/pe-utils'

const rpc = new ClientUtils()

async function main() {
  const res = await rpc.emitNetPromise('test', {
    hello: 'from client',
  })

  console.log(res)
}

RegisterCommand(
  'nuitest',
  () => {
    SendNUIMessage({
      action: 'openPage',
      data: {
        pageName: 'HelloWorld',
      },
    })

    SetNuiFocus(true, true)
  },
  false,
)

RegisterCommand(
  'adminmenu',
  () => {
    SendNUIMessage({
      action: 'openPage',
      data: {
        pageName: 'AdminMenu',
      },
    })

    SetNuiFocus(true, true)
  },
  false,
)

RegisterNuiCB('closeMenu', (data: { pageName: string }, cb) => {
  SetNuiFocus(false, false)
  SendNUIMessage({
    action: 'closePage',
    data: {
      pageName: data ? data.pageName : 'HelloWorld',
    },
  })

  cb(true)
})

RegisterNuiCB('kill', (_, cb) => {
  SetEntityHealth(PlayerPedId(), 0)

  cb({})
})

RegisterNuiCB('getDemoData', (data, cb) => {
  console.log(data)

  cb({ demo: true, inBrowser: false })
})

main()
