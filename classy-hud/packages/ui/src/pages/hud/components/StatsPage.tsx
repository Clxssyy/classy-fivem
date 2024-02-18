const StatsPage = () => {
  return (
    <>
      <section className='divide-y-2 divide-neutral-600'>
        <h2 className='font-bold text-2xl p-2 text-neutral-600'>Stat Bars</h2>
        <div className='p-2 divide-y divide-neutral-600'>
          <div>
            <p className='underline'>Toggle stat bars:</p>
            <div className='flex gap-2 justify-between'>
              <div className='gap-2 flex'>
                <label htmlFor=''>Health</label>
                <input type='checkbox' name='' id='' />
              </div>
              <div className='gap-2 flex'>
                <label htmlFor=''>Armor</label>
                <input type='checkbox' name='' id='' />
              </div>
              <div className='gap-2 flex'>
                <label htmlFor=''>Stamina</label>
                <input type='checkbox' name='' id='' />
              </div>
              <div className='gap-2 flex'>
                <label htmlFor=''>Oxygen</label>
                <input type='checkbox' name='' id='' />
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
                <input type='range' name='' id='' />
              </div>
              <div className='flex flex-col'>
                <label htmlFor=''>Height</label>
                <input type='range' name='' id='' />
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
        </div>
      </section>
      <section className='divide-y-2 divide-neutral-600'>
        <h2 className='font-bold text-neutral-600 text-2xl p-2'>Stat Circles</h2>
        <div className='p-2 divide-y divide-neutral-600'>
          <div>
            <h3>Toggle stat circles:</h3>
            <div className='flex gap-2 justify-between'>
              <div className='gap-2 flex'>
                <label htmlFor=''>Health</label>
                <input type='checkbox' name='' id='' />
              </div>
              <div className='gap-2 flex'>
                <label htmlFor=''>Armor</label>
                <input type='checkbox' name='' id='' />
              </div>
              <div className='gap-2 flex'>
                <label htmlFor=''>Stamina</label>
                <input type='checkbox' name='' id='' />
              </div>
              <div className='gap-2 flex'>
                <label htmlFor=''>Oxygen</label>
                <input type='checkbox' name='' id='' />
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
                <input type='range' name='' id='' />
              </div>
              <div className='flex flex-col'>
                <label htmlFor=''>Height</label>
                <input type='range' name='' id='' />
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
