import { useEffect, useState } from 'react'
import { HeartIcon } from '@heroicons/react/24/solid'
import HudSettings from './components/HudSettings'
import { useExitListener } from '../../utils/exitListener'
import { fetchNui } from '../../utils/nui'
import DragWrapper from './components/DragWrapper'
import StatBar from './components/StatBar'
import StatCircle from './components/StatCircle'

const Hud = () => {
  const [health, setHealth] = useState<number>(100)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [settings, setSettings] = useState<boolean>(true)

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
        const healthPercent = Math.floor(((event.data.data.health - 100) / 100) * 100)
        setHealth(() => {
          return healthPercent <= 0 ? 0 : healthPercent
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
      <DragWrapper id='health-bar' editMode={editMode}>
        <StatBar statPercent={health} />
      </DragWrapper>
      <DragWrapper id='health-circle' editMode={editMode}>
        <StatCircle statPercent={health} />
      </DragWrapper>
    </main>
  )
}

export default Hud
