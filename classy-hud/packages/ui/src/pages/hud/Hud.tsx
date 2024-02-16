import { useEffect, useState } from 'react'
import { HeartIcon } from '@heroicons/react/24/solid'

const Hud = () => {
  const [health, setHealth] = useState<number>(100)
  const [draggable, setDraggable] = useState<boolean>(true)

  useEffect(() => {
    window.addEventListener('message', (event) => {
      setHealth(() => {
        return Math.floor((event.data.data.health / event.data.data.total) * 100)
      })
    })

    return () => {
      window.removeEventListener('message', (event) => {
        setHealth(() => {
          return Math.floor((event.data.data.health / event.data.data.total) * 100)
        })
      })
    }
  }, [])

  useEffect(() => {
    let offsetX: number
    let offsetY: number

    window.addEventListener('dragstart', (event) => {
      const rect = event.target as HTMLElement
      const dragged = rect.getBoundingClientRect()

      offsetX = event.clientX - dragged.x
      offsetY = event.clientY - dragged.y
    })

    window.addEventListener('dragend', (event) => {
      event.preventDefault()
      console.log('dragend', event.clientX, event.clientY)
      if (event.target && draggable) {
        const targetElement = event.target as HTMLElement

        const X = event.clientX - offsetX
        const Y = event.clientY - offsetY

        if (X < 0) {
          targetElement.style.left = '0px'
        } else if (X > window.innerWidth - targetElement.offsetWidth) {
          targetElement.style.left = `${window.innerWidth - targetElement.offsetWidth}px`
        } else {
          targetElement.style.left = `${X}px`
        }

        if (Y < 0) {
          targetElement.style.top = '0px'
        } else if (Y > window.innerHeight - targetElement.offsetHeight) {
          targetElement.style.top = `${window.innerHeight - targetElement.offsetHeight}px`
        } else {
          targetElement.style.top = `${Y}px`
        }
      }
    })
  }, [])

  return (
    <main className='h-screen bg-black/70'>
      <section
        id='stats'
        className='bg-blue-400/50 border-2 border-dashed border-blue-600 max-w-max cursor-move z-12 select-none absolute'
        draggable={draggable}
      >
        <div className='flex gap-2 z-10'>
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
    </main>
  )
}

export default Hud
