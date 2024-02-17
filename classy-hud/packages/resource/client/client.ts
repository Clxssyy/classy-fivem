on('playerSpawned', () => {
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
    SetEntityHealth(PlayerPedId(), 49)
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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const updateHealth = async () => {
  while (true) {
    await delay(1000)

    SendNUIMessage({
      action: 'updateHealth',
      data: {
        health: GetEntityHealth(PlayerPedId()),
        total: GetEntityMaxHealth(PlayerPedId()),
      },
    })
  }
}

updateHealth()
