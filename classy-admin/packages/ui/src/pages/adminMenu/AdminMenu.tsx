import { useState } from 'react'
import { usePageContext } from '../../App'
import { useExitListener } from '../../utils/exitListener'
import { fetchNui } from '../../utils/nui'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'

const AdminMenu = () => {
  const [hidden, setHidden] = useState(true)

  const { closePage } = usePageContext()

  async function close() {
    closePage('AdminMenu')
    await fetchNui('closeMenu', { pageName: 'AdminMenu' })
  }

  async function kill() {
    await fetchNui('kill')
  }

  useExitListener(async () => {
    await close()
  })

  return (
    <div className='grid align-items h-screen place-content-center p-10'>
      <div className='bg-slate-400 p-4 rounded flex flex-col gap-2'>
        <div className='flex justify-between'>
          <h1 className='text-xl font-bold'>
            <span className='text-green-500'>Classy</span> Menu
          </h1>
          <button onClick={close}>
            <XMarkIcon className='w-6 h-6' />
          </button>
        </div>
        <div className='bg-white rounded divide-y'>
          <div className='flex justify-between'>
            <button onClick={kill} className='p-2 rounded'>
              Kill
            </button>
            <button
              onClick={() => {
                setHidden(!hidden)
              }}
              className='p-2 rounded'
            >
              <ChevronDownIcon className='w-6 h-6' />
            </button>
          </div>
          <div className={`bg-black text-white ${hidden ? 'hidden' : ''}`}>
            <form action=''>
              <input
                type='text'
                name='name'
                id='name'
                className='p-2 rounded bg-gray-200'
                placeholder='Name'
              />
              <input
                type='text'
                name='age'
                id='age'
                className='p-2 rounded bg-gray-200'
                placeholder='Age'
              />
              <input
                type='text'
                name='job'
                id='job'
                className='p-2 rounded bg-gray-200'
                placeholder='Job'
              />
              <input
                type='submit'
                value='Submit'
                className='p-2 rounded bg-green-500 text-white cursor-pointer'
              />
            </form>
          </div>
          <div className='flex justify-between'>
            <button onClick={kill} className='p-2 rounded'>
              Kill
            </button>
            <button
              onClick={() => {
                setHidden(!hidden)
              }}
              className='p-2 rounded'
            >
              <ChevronDownIcon className='w-6 h-6' />
            </button>
          </div>
          <div className={`bg-black text-white ${hidden ? 'hidden' : ''}`}></div>
        </div>
      </div>
    </div>
  )
}

export default AdminMenu
