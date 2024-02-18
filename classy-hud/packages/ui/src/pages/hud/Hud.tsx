import { useEffect, useState } from 'react'
import HudSettings from './components/HudSettings'
import { useExitListener } from '../../utils/exitListener'
import { fetchNui } from '../../utils/nui'
import DragWrapper from './components/DragWrapper'
import StatBar from './components/StatBar'
import StatCircle from './components/StatCircle'

interface PlayerStats {
  health: number
  armor: number
  stamina: number
  oxygen: number
}

const Hud = () => {
  const [stats, setStats] = useState<PlayerStats>({
    health: 100,
    armor: 0,
    stamina: 100,
    oxygen: 100,
  })
  const [editMode, setEditMode] = useState<boolean>(false)
  const [settings, setSettings] = useState<boolean>(false)

  useEffect(() => {
    if (editMode) {
      setSettings(!settings)
    }
  }, [editMode])

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data.action === 'toggleSettings') {
        setSettings(!settings)
        return
      }

      if (event.data.action === 'updateStats') {
        const healthPercent = Math.floor(((event.data.stats.health - 100) / 100) * 100)
        const armorPercent = Math.floor((event.data.stats.armor / 100) * 100)
        const staminaPercent = Math.floor(((100 - event.data.stats.stamina) / 100) * 100)
        const oxygenPercent = Math.floor((event.data.stats.oxygen / 100) * 100)

        setStats({
          health: healthPercent <= 0 ? 0 : healthPercent,
          armor: armorPercent,
          stamina: staminaPercent,
          oxygen: oxygenPercent,
        })
      }
    })
  }, [])

  const returnHandler = async () => {
    setEditMode(!editMode)
    setSettings(!settings)
  }

  useExitListener(async () => {
    if (!editMode) return
    await returnHandler()
  })

  const exitSettings = async () => {
    setSettings(!settings)
    await fetchNui('exitSettings')
  }

  return (
    <main
      className={`h-screen w-screen absolute ${
        editMode || settings ? 'bg-black/70' : 'bg-black/0'
      }`}
    >
      {settings ? (
        <HudSettings editMode={editMode} setEditMode={setEditMode} exit={exitSettings} />
      ) : null}
      {editMode ? (
        <div className='w-full h-full absolute flex place-items-center justify-center text-neutral-600'>
          <p className='font-bold text-5xl select-none'>Edit Mode</p>
        </div>
      ) : null}
      <DragWrapper id='health-bar-container' editMode={editMode}>
        <StatBar statPercent={stats.health} id='health-bar' />

        <StatBar statPercent={stats.armor} id='armor-bar' />

        <StatBar statPercent={stats.stamina} id='stamina-bar' />

        <StatBar statPercent={stats.oxygen} id='oxygen-bar' />
      </DragWrapper>
      <DragWrapper id='health-circle' editMode={editMode}>
        <StatCircle statPercent={stats.health} />
      </DragWrapper>
    </main>
  )
}

export default Hud
