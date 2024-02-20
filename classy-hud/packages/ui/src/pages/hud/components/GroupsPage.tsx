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

  useEffect(() => {
    if (activeGroup) setActiveGroup(groups[activeGroup?.id || 0])
  }, [groups])

  useEffect(() => {
    if (activeGroup === undefined) setActiveItem(undefined)
    else if (activeItem && !activeGroup?.items.includes(activeItem)) {
      setActiveItem(undefined)
    }
  }, [activeGroup])

  const handleAddGroup = () => {
    const newGroup: group = {
      id: groups.length,
      name: 'New Group',
      items: [],
      position: { x: '0', y: '0' },
      vertical: false,
      gap: '0',
    }
    setGroups((prevGroups) => [...prevGroups, newGroup])
    setActiveGroup(newGroup)
  }

  const handleRemoveGroup = () => {
    if (activeGroup) {
      setGroups((prevGroups) => {
        return prevGroups.filter((group) => group !== activeGroup)
      })
      setActiveGroup(() => groups[activeGroup.id - 1] || undefined)
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
      setActiveItem(() => {
        const newActiveItem = activeItem?.id - 1
        return activeGroup?.items[newActiveItem] || undefined
      })
    }
  }

  const handleGroupEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (activeGroup) {
      setGroups((prevGroups) => {
        return prevGroups.map((group) => {
          if (group.id === activeGroup.id) {
            return activeGroup
          }
          return group
        })
      })
    }
  }

  const handleItemEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (activeGroup && activeItem) {
      setGroups((prevGroups) => {
        return prevGroups.map((group) => {
          if (group === activeGroup) {
            const updatedItems = group.items.map((item) => {
              if (item.id === activeItem.id) {
                return activeItem
              }
              return item
            })
            return { ...group, items: updatedItems }
          }
          return group
        })
      })
    }
  }

  const handleItemAdd = () => {
    if (activeGroup) {
      const newItem = {
        id: activeGroup.items.length,
        name: 'New Item',
        type: 'bar',
        stat: 'health',
        styles: {
          bar: { backgroundColor: '#000000' },
          backdrop: { backgroundColor: '#00000080', width: '10px', height: '10px' },
        },
      }

      const updatedGroups = groups.map((group) => {
        if (group === activeGroup) {
          return { ...group, items: [...group.items, newItem] }
        }
        return group
      })

      setGroups(updatedGroups)
      setActiveItem(newItem)
    }
  }

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
                    if (activeGroup?.id === group.id) setActiveGroup(undefined)
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
                  className={`${activeItem?.id === item.id ? 'bg-white/10' : ''} text-sm px-2`}
                  onClick={() => {
                    if (activeItem?.id === item.id) setActiveItem(undefined)
                    else setActiveItem(item)
                  }}
                >
                  <h3>{item.name}</h3>
                </button>
              )
            })}
          </div>
          <div
            id='stat-bar-items-options'
            className='flex divide-x divide-neutral-900 justify-between'
          >
            <div className='grow flex justify-center'>
              <button
                className='p-2 grow flex justify-center hover:bg-white/10 active:scale-95'
                onClick={handleItemAdd}
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
                onClick={handleRemoveItem}
              >
                <MinusIcon className='h-6 w-6' />
              </button>
            </div>
          </div>
        </div>
        {activeItem ? (
          <div>
            <form onSubmit={handleItemEdit}>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Name'
                value={activeItem?.name}
                onChange={(e) => {
                  setActiveItem({ ...activeItem, name: e.target.value })
                }}
              />
              <select
                name='type'
                id='type'
                value={activeItem.type}
                onChange={(e) => {
                  setActiveItem({ ...activeItem, type: e.target.value })
                }}
              >
                <option value='bar'>Bar</option>
                <option value='circle'>Circle</option>
              </select>
              {activeItem.type === 'bar' ? (
                <>
                  <input
                    type='color'
                    name='fill-color'
                    id='fill-color'
                    value={activeItem.styles?.bar?.backgroundColor || '#000000'}
                    onChange={(e) => {
                      setActiveItem({
                        ...activeItem,
                        styles: {
                          ...activeItem.styles,
                          bar: { backgroundColor: e.target.value },
                        },
                      })
                    }}
                  />
                  <input
                    type='color'
                    name='backdrop-color'
                    id='backdrop-color'
                    value={
                      activeItem.styles?.backdrop?.backgroundColor?.replace('80', '') || '#000000'
                    }
                    onChange={(e) => {
                      setActiveItem({
                        ...activeItem,
                        styles: {
                          ...activeItem.styles,
                          backdrop: {
                            ...activeItem.styles?.backdrop,
                            backgroundColor: e.target.value + '80',
                          },
                        },
                      })
                    }}
                  />
                  <input
                    type='number'
                    name='width'
                    id='width'
                    value={activeItem.styles?.backdrop?.width?.replace('px', '') || '10'}
                    onChange={(e) => {
                      setActiveItem({
                        ...activeItem,
                        styles: {
                          ...activeItem.styles,
                          backdrop: {
                            ...activeItem.styles?.backdrop,
                            width: e.target.value + 'px',
                          },
                        },
                      })
                    }}
                  />
                  <input
                    type='number'
                    name='height'
                    id='height'
                    value={activeItem.styles?.backdrop?.height?.replace('px', '') || '10'}
                    onChange={(e) => {
                      setActiveItem({
                        ...activeItem,
                        styles: {
                          ...activeItem.styles,
                          backdrop: {
                            ...activeItem.styles?.backdrop,
                            height: e.target.value + 'px',
                          },
                        },
                      })
                    }}
                  />
                </>
              ) : (
                <>
                  <input
                    type='color'
                    name='fill-color'
                    id='fill-color'
                    value={activeItem.styles?.bar?.backgroundColor || '#000000'}
                    onChange={(e) => {
                      setActiveItem({
                        ...activeItem,
                        styles: {
                          ...activeItem.styles,
                          bar: { backgroundColor: e.target.value },
                        },
                      })
                    }}
                  />
                  <input
                    type='color'
                    name='backdrop-color'
                    id='backdrop-color'
                    value={
                      activeItem.styles?.backdrop?.backgroundColor?.replace('80', '') || '#000000'
                    }
                    onChange={(e) => {
                      setActiveItem({
                        ...activeItem,
                        styles: {
                          ...activeItem.styles,
                          backdrop: {
                            ...activeItem.styles?.backdrop,
                            backgroundColor: e.target.value + '80',
                          },
                        },
                      })
                    }}
                  />
                  <input
                    type='number'
                    name='size'
                    id='size'
                    value={activeItem.styles?.backdrop?.width?.replace('px', '') || '10'}
                    onChange={(e) => {
                      setActiveItem({
                        ...activeItem,
                        styles: {
                          ...activeItem.styles,
                          backdrop: {
                            ...activeItem.styles?.backdrop,
                            width: e.target.value + 'px',
                            height: e.target.value + 'px',
                          },
                        },
                      })
                    }}
                  />
                </>
              )}
              <select
                name='stat'
                id='stat'
                onChange={(e) => {
                  setActiveItem({ ...activeItem, stat: e.target.value })
                }}
              >
                <option value='health'>Health</option>
                <option value='armor'>Armor</option>
                <option value='stamina'>Stamina</option>
                <option value='oxygen'>Oxygen</option>
              </select>
              <button type='submit'>Save</button>
            </form>
          </div>
        ) : null}
      </section>
    </>
  )
}

export default GroupsPage
