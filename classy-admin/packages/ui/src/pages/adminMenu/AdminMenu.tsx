import { usePageContext } from '../../App'
import { useExitListener } from '../../utils/exitListener'
import { fetchNui } from '../../utils/nui'
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon, XMarkIcon } from '@heroicons/react/24/outline'
import MenuItem from '../../components/MenuItem'
import { useState } from 'react'

const AdminMenu = () => {
  const [collapse, setCollapse] = useState(true)
  const [extend, setExtend] = useState(1)
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
    <div className='grid align-items h-screen p-10 overflow-hidden'>
      <div className='bg-black/50 rounded flex flex-col shadow-lg overflow-hidden'>
        <div className='flex justify-between border-b border-neutral-800/20'>
          <h1 className='text-xl font-bold cursor-default select-none p-2'>
            <span className='text-green-500'>Classy</span>Menu
          </h1>
          <div className='p-2'>
            <button
              onClick={() => {
                setCollapse(!collapse)
              }}
              className='hover:scale-105 transition-all active:scale-95 text-neutral-500/80 bg-white/20 rounded p-1 px-2 shadow-lg border border-neutral-800/20'
            >
              <ChevronDoubleUpIcon className='w-6 h-6' />
            </button>
          </div>
          <div className='p-2'>
            <button
              onClick={() => {
                setExtend(extend + 1)
              }}
              className='hover:scale-105 transition-all active:scale-95 text-neutral-500/80 bg-white/20 rounded p-1 px-2 shadow-lg border border-neutral-800/20'
            >
              <ChevronDoubleDownIcon className='w-6 h-6' />
            </button>
          </div>
          <div className='p-2'>
            <button
              onClick={close}
              className='hover:scale-105 transition-all active:scale-95 text-neutral-500/80 bg-white/20 rounded p-1 px-2 shadow-lg border border-neutral-800/20'
            >
              <XMarkIcon className='w-6 h-6' />
            </button>
          </div>
        </div>
        <div
          id='menuItems'
          className='bg-white/20 divide-y divide-neutral-800/20 shadow-lg overflow-y-auto overflow-x-hidden'
        >
          <MenuItem
            itemFunction={kill}
            itemName='Kill Player'
            itemDescription='Kill a player.'
            functionOptions={<div>Test</div>}
            toggleCollapse={collapse}
            toggleExtend={extend}
          />
          <MenuItem
            itemFunction={kill}
            itemName='Give Weapon'
            itemDescription='Give player a weapon.'
            functionOptions={<div>Test</div>}
            toggleCollapse={collapse}
            toggleExtend={extend}
          />
          <MenuItem
            itemFunction={kill}
            itemName='Spawn Vehicle'
            itemDescription='Spawn a vehicle.'
            functionOptions={<div>Test</div>}
            toggleCollapse={collapse}
            toggleExtend={extend}
          />
          <MenuItem
            itemFunction={kill}
            itemName='Teleport'
            itemDescription='Teleport to a location.'
            functionOptions={<div>Test</div>}
            toggleCollapse={collapse}
            toggleExtend={extend}
          />
          <MenuItem
            itemFunction={kill}
            itemName='God Mode'
            itemDescription='Enable god mode.'
            toggleCollapse={collapse}
            toggleExtend={extend}
          />
          <MenuItem
            itemFunction={kill}
            itemName='No Clip'
            itemDescription='Enable no clip mode.'
            toggleCollapse={collapse}
            toggleExtend={extend}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminMenu
