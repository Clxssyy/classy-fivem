const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

on("onClientResourceStart", (resource: string) => {
  if (resource !== GetCurrentResourceName()) return;

  global.exports.spawnmanager.addSpawnPoint({
    x: -75.529,
    y: -818.646,
    z: 326.175,
    heading: 0,
    model: "u_m_m_streetart_01",
  });

  global.exports.spawnmanager.setAutoSpawnCallback(() => {
    global.exports.spawnmanager.spawnPlayer();
  });

  global.exports.spawnmanager.setAutoSpawn(true);
});

RegisterCommand(
  "nui",
  () => {
    SetNuiFocus(true, true);
    SendNuiMessage(
      JSON.stringify({
        type: "setVisible",
        display: true,
      })
    );
  },
  false
);

onNet("onPlayerJoining", async () => {
  SetEntityVisible(GetPlayerPed(-1), false, false);
  global.exports.spawnmanager.forceRespawn();

  await delay(500);

  ShutdownLoadingScreen();
  SetEntityVisible(GetPlayerPed(-1), true, false);
});
