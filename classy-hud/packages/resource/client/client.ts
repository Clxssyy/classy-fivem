import { RegisterNuiCB } from '@project-error/pe-utils'

on('playerSpawned', () => {
  SetEntityMaxHealth(PlayerPedId(), 200)
  SetEntityHealth(PlayerPedId(), 200)
  SendNUIMessage({
    action: 'openPage',
    data: {
      pageName: 'Hud',
    },
  })
})

RegisterCommand(
  'kill',
  () => {
    SetEntityHealth(PlayerPedId(), 0)
  },
  false,
)

RegisterCommand(
  'hud',
  () => {
    SendNUIMessage({
      action: 'toggleSettings',
    })
    SetNuiFocus(true, true)
  },
  false,
)

RegisterNuiCB('exitSettings', (_, cb) => {
  SetNuiFocus(false, false)

  cb({})
})

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const updateStats = async () => {
  while (true) {
    await delay(100)

    SendNUIMessage({
      action: 'updateStats',
      data: {
        health: GetEntityHealth(PlayerPedId()),
        armor: GetPedArmour(PlayerPedId()),
        stamina: GetPlayerSprintStaminaRemaining(PlayerId()),
        oxygen: GetPlayerUnderwaterTimeRemaining(PlayerId()),
      },
    })
  }
}

updateStats()
