import { useEffect, useState } from 'react'
import { HeartIcon } from '@heroicons/react/24/solid'
import HudSettings from '../hudSettings/HudSettings'
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

      setHealth(() => {
        return Math.floor((event.data.data.health / event.data.data.total) * 100)
      })
    })
  }, [])

  const returnHandler = async () => {
    setEditMode(!editMode)
    await fetchNui('settingsReturn')
  }

  useExitListener(async () => {
    await returnHandler()
  })

  const exitSettings = async () => {
    setSettings(!settings)
    await fetchNui('exitSettings')
  }

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

  if (editMode) {
    const drag = document.getElementById('stats')
    if (drag) {
      dragElement(drag)
    }

    const element = document.getElementById('test')
    if (element) {
      dragElement(element)
    }
  } else {
    const drag = document.getElementById('stats')
    if (drag) {
      drag.onmousedown = null
    }

    const element = document.getElementById('test')
    if (element) {
      element.onmousedown = null
    }
  }

  return (
    <main className={`h-screen w-screen absolute ${editMode ? 'bg-black/70' : 'bg-black/0'}`}>
      {settings ? (
        <HudSettings editMode={editMode} setEditMode={setEditMode} exit={exitSettings} />
      ) : null}
      <section
        id='stats'
        className='bg-blue-400/50 border-2 border-dashed border-blue-600 max-w-max cursor-move select-none absolute'
        draggable={editMode}
      >
        <div className='flex gap-2'>
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
      <section id='test' className='bg-red-400 p-2 absolute'>
        sfsf
      </section>
    </main>
  )
}

export default Hud
