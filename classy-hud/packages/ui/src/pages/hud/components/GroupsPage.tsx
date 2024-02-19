import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'
import { group } from '../Hud'
import { useState } from 'react'

interface GroupsPageProps {
  groups: group[]
  setGroups: React.Dispatch<React.SetStateAction<group[]>>
}

const GroupsPage = ({ groups, setGroups }: GroupsPageProps) => {
  const [activeGroup, setActiveGroup] = useState<group>(groups[0])

  return (
    <>
      <section className='p-2'>
        <h1 className='font-bold text-2xl text-neutral-600'>Groups</h1>
        <div
          id='stat-bar-groups-container'
          className='rounded overflow-hidden bg-neutral-800 flex flex-col divide-y-2 divide-neutral-900 shadow-lg'
        >
          <div
            id='stat-bar-groups'
            className='overflow-y-auto custom-scroll h-48 divide-y divide-neutral-900 flex flex-col'
          >
            {groups.map((group, index) => {
              return (
                <button
                  key={index}
                  className={`${
                    activeGroup === group ? 'bg-white/10' : ''
                  } text-sm px-2 hover:bg-white/10`}
                  onClick={() => setActiveGroup(group)}
                >
                  <h3>{group.name}</h3>
                </button>
              )
            })}
          </div>
          <div
            id='stat-bar-groups-options'
            className='flex divide-x divide-neutral-900 justify-between'
          >
            <div className='grow flex justify-center'>
              <button className='p-2 grow flex justify-center hover:bg-white/10 active:scale-95'>
                <PlusIcon className='h-6 w-6' />
              </button>
            </div>
            <div className='grow flex justify-center'>
              <button className='p-2 grow hover:bg-white/10 active:scale-95'>Edit</button>
            </div>
            <div className='grow flex justify-center'>
              <button className='p-2 grow flex justify-center hover:bg-white/10 active:scale-95'>
                <MinusIcon className='h-6 w-6' />
              </button>
            </div>
          </div>
        </div>
        <h2 className='font-bold text-xl text-neutral-600'>Items</h2>
        <div
          id='stat-bar-groups-container'
          className='rounded overflow-hidden bg-neutral-800 flex flex-col divide-y-2 divide-neutral-900 shadow-lg'
        >
          <div
            id='stat-bar-groups'
            className='overflow-y-auto custom-scroll h-48 divide-y divide-neutral-900'
          >
            {activeGroup.items.map((item, index) => {
              return (
                <div key={index} className='text-sm px-2'>
                  <h3>{item.id}</h3>
                </div>
              )
            })}
          </div>
          <div
            id='stat-bar-groups-options'
            className='flex divide-x divide-neutral-900 justify-between'
          >
            <div className='grow flex justify-center'>
              <button className='p-2 grow flex justify-center hover:bg-white/10 active:scale-95'>
                <PlusIcon className='h-6 w-6' />
              </button>
            </div>
            <div className='grow flex justify-center'>
              <button className='p-2 grow hover:bg-white/10 active:scale-95'>Edit</button>
            </div>
            <div className='grow flex justify-center'>
              <button className='p-2 grow flex justify-center hover:bg-white/10 active:scale-95'>
                <MinusIcon className='h-6 w-6' />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default GroupsPage
