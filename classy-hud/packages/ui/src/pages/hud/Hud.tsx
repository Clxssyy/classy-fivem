import { useEffect, useState } from 'react'

const Hud = () => {
  const [health, setHealth] = useState<number>(100)

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

  return (
    <div className='grid h-screen content-end text-white p-4'>
      <div className='flex gap-2 m-2'>
        <div className='w-10 h-10 border-2 border-black rounded-full overflow-hidden grid place-items-end'>
          <div style={{ height: `${health}%` }} className={`w-full bg-red-400`}></div>
        </div>
        <div className='w-10 h-10 border-2 border-black rounded-full overflow-hidden grid place-items-end'>
          <div style={{ height: `${health}%` }} className={`w-full bg-red-400`}></div>
        </div>
      </div>
    </div>
  )
}

export default Hud
