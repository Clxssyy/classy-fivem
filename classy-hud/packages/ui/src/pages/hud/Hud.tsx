import { useEffect, useState } from 'react'
import { HeartIcon } from '@heroicons/react/24/solid'
import HudSettings from './components/HudSettings'
import { useExitListener } from '../../utils/exitListener'
import { fetchNui } from '../../utils/nui'
import DragWrapper from './components/DragWrapper'

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
      <DragWrapper id='stats' editMode={editMode}>
        <div className='flex items-center justify-center gap-2'>
          <HeartIcon className='w-6 h-6' />
          <p>{health}%</p>
        </div>
        <div className='flex items-center justify-center gap-2'>
          <HeartIcon className='w-6 h-6' />
          <p>{health}%</p>
        </div>
      </DragWrapper>
      <DragWrapper id='health-bar' editMode={editMode}>
        <div className='w-96 h-10 bg-green-400/50'>
          <div style={{ width: `${health}%` }} className='bg-green-400 h-full'></div>
        </div>
      </DragWrapper>
      <DragWrapper id='health circle' editMode={editMode}>
        <div className='w-10 h-10 rounded-full overflow-hidden bg-green-400/50 flex place-items-center justify-center'>
          <HeartIcon className='w-6 h-6 absolute' />
          <div
            style={{ height: `${health}%` }}
            className='bg-green-400 w-full place-self-end'
          ></div>
        </div>
      </DragWrapper>
      <DragWrapper editMode={editMode} id='test'>
        <div>test</div>
        <div>test</div>
      </DragWrapper>
    </main>
  )
}

export default Hud
