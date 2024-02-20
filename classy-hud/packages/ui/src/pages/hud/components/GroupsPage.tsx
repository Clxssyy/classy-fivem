import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'
import { group } from '../Hud'
import { useEffect, useState } from 'react'

interface GroupsPageProps {
  groups: group[]
  setGroups: React.Dispatch<React.SetStateAction<group[]>>
}

const GroupsPage = ({ groups, setGroups }: GroupsPageProps) => {
  const [activeGroup, setActiveGroup] = useState<group>()
  const [activeItem, setActiveItem] = useState<group['items'][0]>()

  const handleAddGroup = () => {
    const newGroup: group = {
      id: groups.length + 1,
      name: 'New Group',
      items: [],
      position: { x: '0', y: '0' },
      vertical: false,
      gap: '0',
    }
    setGroups((prevGroups) => [...prevGroups, newGroup])
  }

  const handleRemoveGroup = () => {
    if (activeGroup) {
      setGroups((prevGroups) => {
        return prevGroups.filter((group) => group !== activeGroup)
      })
      setActiveGroup(undefined)
    }
  }

  const handleRemoveItem = () => {
    if (activeGroup && activeItem) {
      setGroups((prevGroups) => {
        return prevGroups.map((group) => {
          if (group === activeGroup) {
            group.items = group.items.filter((item) => item !== activeItem)
          }
          return group
        })
      })
      setActiveItem(undefined)
    }
  }

  const handleGroupEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (activeGroup) {
      setGroups((prevGroups) => {
        return prevGroups.map((group) => {
          if (group.id === activeGroup.id) {
            group = activeGroup
          }
          return group
        })
      })
    }
  }

  useEffect(() => {
    if (activeItem) setActiveItem(undefined)
  }, [activeGroup])

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
                    group.id === activeGroup?.id ? 'bg-white/10' : ''
                  } text-sm px-2 hover:bg-white/10`}
                  onClick={() => {
                    if (activeGroup === group) setActiveGroup(undefined)
                    else setActiveGroup(group)
                  }}
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
              <button
                className='p-2 grow flex justify-center hover:bg-white/10 active:scale-95'
                onClick={handleAddGroup}
              >
                <PlusIcon className='h-6 w-6' />
              </button>
            </div>
            <div className='grow flex justify-center'>
              <button className='p-2 grow hover:bg-white/10 active:scale-95'>Edit</button>
            </div>
            <div className='grow flex justify-center'>
              <button
                className='p-2 grow flex justify-center hover:bg-white/10 active:scale-95'
                onClick={handleRemoveGroup}
              >
                <MinusIcon className='h-6 w-6' />
              </button>
            </div>
          </div>
        </div>
        {activeGroup ? (
          <div>
            <form onSubmit={handleGroupEdit}>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Name'
                value={activeGroup?.name}
                onChange={(e) => {
                  setActiveGroup({ ...activeGroup, name: e.target.value })
                }}
              />
              <input
                type='number'
                min={0}
                max={window.innerHeight}
                name='x-pos'
                id='x-pos'
                placeholder='X Position'
                value={activeGroup?.position?.x}
                onChange={(e) => {
                  setActiveGroup({
                    ...activeGroup,
                    position: { ...activeGroup.position, x: e.target.value },
                  })
                }}
              />
              <input
                type='number'
                min={0}
                max={window.innerWidth}
                name='y-pos'
                id='y-pos'
                placeholder='Y Position'
                value={activeGroup?.position?.y}
                onChange={(e) => {
                  setActiveGroup({
                    ...activeGroup,
                    position: { ...activeGroup.position, y: e.target.value },
                  })
                }}
              />
              <input
                type='checkbox'
                min={0}
                max={window.innerHeight}
                name='vertical'
                id='vertical'
                checked={activeGroup?.vertical}
                onChange={(e) => {
                  setActiveGroup({
                    ...activeGroup,
                    vertical: !activeGroup.vertical,
                  })
                }}
              />
              <input
                type='range'
                name='gap'
                id='gap'
                value={activeGroup?.gap}
                onChange={(e) => {
                  setActiveGroup({
                    ...activeGroup,
                    gap: e.target.value,
                  })
                }}
              />
              <button type='submit'>Save</button>
            </form>
          </div>
        ) : null}
        <h2 className='font-bold text-xl text-neutral-600'>Items</h2>
        <div
          id='stat-bar-items-container'
          className='rounded overflow-hidden bg-neutral-800 flex flex-col divide-y-2 divide-neutral-900 shadow-lg'
        >
          <div
            id='stat-bar-items'
            className='overflow-y-auto custom-scroll h-48 divide-y divide-neutral-900 flex flex-col'
          >
            {activeGroup?.items.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`${activeItem === item ? 'bg-white/10' : ''} text-sm px-2`}
                  onClick={() => setActiveItem(item)}
                >
                  <h3>{item.id}</h3>
                </button>
              )
            })}
          </div>
          <div
            id='stat-bar-items-options'
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
              <button
                className='p-2 grow flex justify-center hover:bg-white/10 active:scale-95'
                onClick={handleRemoveItem}
              >
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
