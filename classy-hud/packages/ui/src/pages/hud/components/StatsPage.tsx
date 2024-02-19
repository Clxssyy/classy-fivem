import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react'
import { group } from '../Hud'

interface StatsPageProps {
  statBars: string[]
  setStatBars: React.Dispatch<React.SetStateAction<string[]>>
  statCircles: string[]
  setStatCircles: React.Dispatch<React.SetStateAction<string[]>>
  groups: group[]
  setGroups: React.Dispatch<React.SetStateAction<group[]>>
}

const StatsPage = ({
  statBars,
  setStatBars,
  statCircles,
  setStatCircles,
  groups,
  setGroups,
}: StatsPageProps) => {
  useEffect(() => {
    statBars.map((bar) => {
      const id = document.getElementById(bar + '-bar-toggle') as HTMLInputElement

      if (id) id.checked = true
    })

    statCircles.map((circle) => {
      const id = document.getElementById(circle + '-circle-toggle') as HTMLInputElement

      if (id) id.checked = true
    })
  }, [])

  const handleBarWidth: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value

    statBars.map((bar) => {
      const id = document.getElementById(bar + '-' + e.target.id.replace('width', 'backdrop'))
      if (id) id.style.width = value + 'px'
    })
  }

  const handleBarHeight: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value

    statBars.map((bar) => {
      const id = document.getElementById(bar + '-' + e.target.id.replace('height', 'backdrop'))
      if (id) id.style.height = value + 'px'
    })
  }

  const handleBarToggle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const id = e.target.id.replace('-bar-toggle', '')

    if (e.target.checked) {
      if (!statBars.includes(id)) {
        setStatBars((prevStatBars) => [...prevStatBars, id])
      }
    } else {
      setStatBars((prevStatBars) => prevStatBars.filter((bar) => bar !== id))
    }
  }

  const handleCircleToggle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const id = e.target.id.replace('-circle-toggle', '')

    if (e.target.checked) {
      if (!statCircles.includes(id)) {
        setStatCircles((prevStatCircles) => [...prevStatCircles, id])
      }
    } else {
      setStatCircles((prevStatCircles) => prevStatCircles.filter((circle) => circle !== id))
    }
  }

  const handleCircleSize: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value

    statCircles.map((circle) => {
      const id = document.getElementById(circle + '-' + e.target.id.replace('size', 'backdrop'))
      if (id) {
        id.style.width = value + 'px'
        id.style.height = value + 'px'
      }
    })
  }

  return (
    <>
      <section className='divide-y-2 divide-neutral-600'>
        <h1 className='font-bold text-2xl p-2 text-neutral-600'>Stat Bars</h1>
        <section className='p-2'>
          <h2 className='font-bold text-2xl text-neutral-600'>Groups</h2>
          <div
            id='stat-bar-groups-container'
            className='rounded overflow-hidden bg-neutral-600 flex flex-col divide-y divide-neutral-900 shadow-lg'
          >
            <div id='stat-bar-groups' className='overflow-y-scroll custom-scroll h-48'>
              {groups.map((group, index) => {
                return (
                  <div key={index}>
                    <h3 className='p-2'>{group.name}</h3>
                  </div>
                )
              })}
            </div>
            <div id='stat-bar-groups-options' className='flex divide-x divide-neutral-900'>
              <button className='p-2'>
                <PlusIcon className='h-6 w-6' />
              </button>

              <button className='p-2'>
                <MinusIcon className='h-6 w-6' />
              </button>
            </div>
          </div>
          <div>
            <p className='underline'>Toggle stat bars:</p>
            <div className='flex gap-2 justify-between'>
              <div className='gap-2 flex'>
                <label htmlFor=''>Health</label>
                <input type='checkbox' name='' id='health-bar-toggle' onChange={handleBarToggle} />
              </div>
              <div className='gap-2 flex'>
                <label htmlFor=''>Armor</label>
                <input type='checkbox' name='' id='armor-bar-toggle' onChange={handleBarToggle} />
              </div>
              <div className='gap-2 flex'>
                <label htmlFor=''>Stamina</label>
                <input type='checkbox' name='' id='stamina-bar-toggle' onChange={handleBarToggle} />
              </div>
              <div className='gap-2 flex'>
                <label htmlFor=''>Oxygen</label>
                <input type='checkbox' name='' id='oxygen-bar-toggle' onChange={handleBarToggle} />
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <h3 className='underline'>Customize</h3>
            <div className='flex gap-2'>
              <div className='flex flex-col'>
                <label htmlFor=''>Alignment</label>
                <select name='' id=''>
                  <option value='columns'>Columns</option>
                  <option value='rows'>Rows</option>
                </select>
              </div>
              <div className='flex flex-col'>
                <label htmlFor=''>Grouped</label>
                <select name='' id=''>
                  <option value='true'>True</option>
                  <option value='false'>False</option>
                </select>
              </div>
              <div className='flex flex-col'>
                <label htmlFor=''>Gap</label>
                <input type='range' name='' id='' />
              </div>
              <div className='flex flex-col'>
                <label htmlFor=''>Width</label>
                <input type='range' name='' id='bar-width' onChange={handleBarWidth} />
              </div>
              <div className='flex flex-col'>
                <label htmlFor=''>Height</label>
                <input type='range' name='' id='bar-height' onChange={handleBarHeight} />
              </div>
            </div>
            <div className='flex gap-2'>
              <div>
                <h3>Health</h3>
                <input
                  type='color'
                  name='health'
                  id='health'
                  onChange={(e) => {
                    const color = e.target.value

                    const backdrop = document.getElementById('health-bar-backdrop')
                    const bar = document.getElementById('health-bar')

                    if (backdrop) backdrop.style.backgroundColor = color + '80'

                    if (bar) bar.style.backgroundColor = color
                  }}
                />
              </div>
              <div>
                <h3>Armor</h3>
                <input
                  type='color'
                  name=''
                  id=''
                  onChange={(e) => {
                    const color = e.target.value

                    const backdrop = document.getElementById('armor-bar-backdrop')
                    const bar = document.getElementById('armor-bar')

                    if (backdrop) backdrop.style.backgroundColor = color + '80'

                    if (bar) bar.style.backgroundColor = color
                  }}
                />
              </div>
              <div>
                <h3>Stamina</h3>
                <input type='color' name='' id='' />
              </div>
              <div>
                <h3>Oxygen</h3>
                <input type='color' name='' id='' />
              </div>
            </div>
          </div>
        </section>
      </section>
      <section className='divide-y-2 divide-neutral-600'>
        <h2 className='font-bold text-neutral-600 text-2xl p-2'>Stat Circles</h2>
        <div className='p-2 divide-y divide-neutral-600'>
          <div>
            <h3>Toggle stat circles:</h3>
            <div className='flex gap-2 justify-between'>
              <div className='gap-2 flex'>
                <label htmlFor=''>Health</label>
                <input
                  type='checkbox'
                  name=''
                  id='health-circle-toggle'
                  onChange={handleCircleToggle}
                />
              </div>
              <div className='gap-2 flex'>
                <label htmlFor=''>Armor</label>
                <input
                  type='checkbox'
                  name=''
                  id='armor-circle-toggle'
                  onChange={handleCircleToggle}
                />
              </div>
              <div className='gap-2 flex'>
                <label htmlFor=''>Stamina</label>
                <input
                  type='checkbox'
                  name=''
                  id='stamina-circle-toggle'
                  onChange={handleCircleToggle}
                />
              </div>
              <div className='gap-2 flex'>
                <label htmlFor=''>Oxygen</label>
                <input
                  type='checkbox'
                  name=''
                  id='oxygen-circle-toggle'
                  onChange={handleCircleToggle}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <h3 className='underline'>Customize</h3>
            <div className='flex gap-2'>
              <div className='flex flex-col'>
                <label htmlFor=''>Alignment</label>
                <select name='' id=''>
                  <option value='columns'>Columns</option>
                  <option value='rows'>Rows</option>
                </select>
              </div>
              <div className='flex flex-col'>
                <label htmlFor=''>Grouped</label>
                <select name='' id=''>
                  <option value='true'>True</option>
                  <option value='false'>False</option>
                </select>
              </div>
              <div className='flex flex-col'>
                <label htmlFor=''>Gap</label>
                <input type='range' name='' id='' />
              </div>
              <div className='flex flex-col'>
                <label htmlFor=''>Size</label>
                <input type='range' name='' id='circle-size' onChange={handleCircleSize} />
              </div>
            </div>
            <div className='flex gap-2'>
              <div>
                <h3>Health</h3>
                <input type='color' name='' id='' />
              </div>
              <div>
                <h3>Armor</h3>
                <input type='color' name='' id='' />
              </div>
              <div>
                <h3>Stamina</h3>
                <input type='color' name='' id='' />
              </div>
              <div>
                <h3>Oxygen</h3>
                <input type='color' name='' id='' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default StatsPage
