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

RegisterNuiCB('kill', (data: { playerId: number }, cb) => {
  if (data) {
    const player = GetPlayerFromServerId(data.playerId)

    if (player === -1) {
      return cb({ playerId: data.playerId, success: false, error: 'Player not found' })
    }

    const ped = GetPlayerPed(player)

    SetEntityHealth(ped, 0)
    cb({ playerId: data.playerId, success: true })
  } else {
    SetEntityHealth(PlayerPedId(), 0)
    cb({ playerId: false, success: true })
  }
})

RegisterNuiCB('getDemoData', (data, cb) => {
  console.log(data)

  cb({ demo: true, inBrowser: false })
})

main()
