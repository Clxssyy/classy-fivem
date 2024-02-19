import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'
import { group } from '../Hud'

interface StatsPageProps {
  groups: group[]
  setGroups: React.Dispatch<React.SetStateAction<group[]>>
}

const StatsPage = ({ groups, setGroups }: StatsPageProps) => {
  return (
    <>
      <section className='divide-y-2 divide-neutral-600'>
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
                <input type='checkbox' name='' id='health-bar-toggle' />
              </div>
              <div className='gap-2 flex'>
                <label htmlFor=''>Armor</label>
                <input type='checkbox' name='' id='armor-bar-toggle' />
              </div>
              <div className='gap-2 flex'>
                <label htmlFor=''>Stamina</label>
                <input type='checkbox' name='' id='stamina-bar-toggle' />
              </div>
              <div className='gap-2 flex'>
                <label htmlFor=''>Oxygen</label>
                <input type='checkbox' name='' id='oxygen-bar-toggle' />
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
                <input type='range' name='' id='bar-width' />
              </div>
              <div className='flex flex-col'>
                <label htmlFor=''>Height</label>
                <input type='range' name='' id='bar-height' />
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
                    setGroups((prev) => {
                      return prev.map((group) => {
                        return {
                          ...group,
                          items: group.items.map((item) => {
                            if (item.stat === 'health') {
                              return {
                                ...item,
                                styles: {
                                  ...item.styles,
                                  bar: { backgroundColor: e.target.value },
                                  backdrop: {
                                    ...item.styles?.backdrop,
                                    backgroundColor: e.target.value + '80',
                                  },
                                },
                              }
                            }
                            return item
                          }),
                        }
                      })
                    })
                  }}
                />
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
        </section>
      </section>
    </>
  )
}

export default StatsPage
