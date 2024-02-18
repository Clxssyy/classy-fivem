import { useEffect, useState } from 'react'
import { HeartIcon } from '@heroicons/react/24/solid'
import HudSettings from './components/HudSettings'
import { useExitListener } from '../../utils/exitListener'
import { fetchNui } from '../../utils/nui'

const Hud = () => {
  const [health, setHealth] = useState<number>(100)
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

  // TODO: change the drag and drop logic specifically how to add / remove from elements
  function dragElement(elmnt: HTMLElement) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0
    if (document.getElementById(elmnt.id)) {
      const element = document.getElementById(elmnt.id)
      if (element) {
        element.onmousedown = dragMouseDown
      }
    } else {
      elmnt.onmousedown = dragMouseDown
    }

    function dragMouseDown(e: MouseEvent) {
      e.preventDefault()

      pos3 = e.clientX
      pos4 = e.clientY

      document.onmouseup = closeDragElement
      document.onmousemove = elementDrag
    }

    function elementDrag(e: MouseEvent) {
      e.preventDefault()

      pos1 = pos3 - e.clientX
      pos2 = pos4 - e.clientY
      pos3 = e.clientX
      pos4 = e.clientY

      if (elmnt.offsetTop - pos2 < 0) {
        elmnt.style.top = 0 + 'px'
      } else if (elmnt.offsetTop - pos2 > window.innerHeight - elmnt.offsetHeight) {
        elmnt.style.top = window.innerHeight - elmnt.offsetHeight + 'px'
      } else {
        elmnt.style.top = elmnt.offsetTop - pos2 + 'px'
      }
      if (elmnt.offsetLeft - pos1 < 0) {
        elmnt.style.left = 0 + 'px'
      } else if (elmnt.offsetLeft - pos1 > window.innerWidth - elmnt.offsetWidth) {
        elmnt.style.left = window.innerWidth - elmnt.offsetWidth + 'px'
      } else {
        elmnt.style.left = elmnt.offsetLeft - pos1 + 'px'
      }
    }

    function closeDragElement() {
      document.onmouseup = null
      document.onmousemove = null
    }
  }

  // Improve this
  if (editMode) {
    const drag = document.getElementById('stats')
    if (drag) {
      dragElement(drag)
    }

    const element = document.getElementById('health')
    if (element) {
      dragElement(element)
    }

    const element2 = document.getElementById('health-circle')
    if (element2) {
      dragElement(element2)
    }
  } else {
    const drag = document.getElementById('stats')
    if (drag) {
      drag.onmousedown = null
    }

    const element = document.getElementById('health')
    if (element) {
      element.onmousedown = null
    }

    const element2 = document.getElementById('health-circle')
    if (element2) {
      element2.onmousedown = null
    }
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
      <section
        id='stats'
        className={`${
          editMode ? 'bg-blue-400/50 border-2 border-dashed border-blue-700 cursor-grab' : ''
        } select-none absolute grid place-items-center text-center`}
      >
        <p className={`${editMode ? '' : 'hidden'} absolute text-blue-700 font-bold`}>Stats</p>
        <div className={`flex gap-2 ${editMode ? 'invisible' : ''}`}>
          <div className='flex items-center justify-center gap-2'>
            <HeartIcon className='w-6 h-6' />
            <p>{health}%</p>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <HeartIcon className='w-6 h-6' />
            <p>{health}%</p>
          </div>
        </div>
      </section>
      <section
        id='health'
        className={`${
          editMode ? 'bg-blue-400/50 border-2 border-dashed border-blue-700 cursor-grab' : ''
        } select-none absolute grid place-items-center text-center`}
      >
        <p className={`${editMode ? '' : 'hidden'} absolute text-blue-700 font-bold`}>Stats</p>
        <div className={`flex gap-2 ${editMode ? 'invisible' : ''}`}>
          <div className='w-96 h-10 bg-green-400/50'>
            <div style={{ width: `${health}%` }} className='bg-green-400 h-full'></div>
          </div>
        </div>
      </section>
      <section
        id='health-circle'
        className={`${
          editMode ? 'bg-blue-400/50 border-2 border-dashed border-blue-700 cursor-grab' : ''
        } select-none absolute grid place-items-center text-center`}
      >
        <p className={`${editMode ? '' : 'hidden'} absolute text-blue-700 font-bold`}>Stats</p>
        <div className={`flex gap-2 ${editMode ? 'invisible' : ''}`}>
          <div className='w-10 h-10 rounded-full overflow-hidden bg-green-400/50 flex place-items-center justify-center'>
            <HeartIcon className='w-6 h-6 absolute' />
            <div
              style={{ height: `${health}%` }}
              className='bg-green-400 w-full place-self-end'
            ></div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Hud
