import { ClientUtils, RegisterNuiCB } from '@project-error/pe-utils'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

const rpc = new ClientUtils()

async function main() {
  const res = await rpc.emitNetPromise('test', {
    hello: 'from client',
  })

  console.log(res)
}

RegisterCommand(
  'menu',
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

RegisterNuiCB('godmode', (_, cb) => {
  SetPlayerInvincible(PlayerId(), true)
  cb({ success: true })
})

RegisterNuiCB('giveWeapon', (data: { playerId: number; weaponName: string; ammo: number }, cb) => {
  const player = GetPlayerFromServerId(data.playerId)

  if (player === -1) {
    return cb({ playerId: data.playerId, success: false, error: 'Player not found' })
  }

  const ped = GetPlayerPed(player)

  if (!IsWeaponValid(data.weaponName)) {
    return cb({ playerId: data.playerId, success: false, error: 'Weapon not valid' })
  }

  GiveWeaponToPed(ped, data.weaponName, data.ammo, false, true)
  cb({ playerId: data.playerId, success: true, weapon: data.weaponName, ammo: data.ammo })
})

RegisterNuiCB('spawnVehicle', async (data: { model: string; insideVeh: boolean }, cb) => {
  const model = data.model
  const insideVeh = data.insideVeh

  if (IsModelValid(model)) {
    RequestModel(model)
    while (!HasModelLoaded(model)) {
      await delay(500)
    }

    const pos = GetEntityCoords(PlayerPedId())
    const heading = GetEntityHeading(PlayerPedId())

    const veh = CreateVehicle(model, pos[0], pos[1], pos[2], heading, true, false)

    if (insideVeh) {
      SetPedIntoVehicle(PlayerPedId(), veh, -1)
    }

    SetModelAsNoLongerNeeded(model)

    cb({ success: true, model })
  } else {
    cb({ success: false, error: 'Model not found' })
  }
})

main()
