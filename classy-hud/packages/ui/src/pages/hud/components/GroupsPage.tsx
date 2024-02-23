import {
  ClipboardDocumentListIcon,
  DocumentDuplicateIcon,
  EllipsisVerticalIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/24/solid'
import { group, item } from '../Hud'
import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

interface GroupsPageProps {
  groups: group[]
  setGroups: React.Dispatch<React.SetStateAction<group[]>>
}

// TODO: Split into smaller components
const GroupsPage = ({ groups, setGroups }: GroupsPageProps) => {
  const [activeGroup, setActiveGroup] = useState<group>()
  const [activeItem, setActiveItem] = useState<group['items'][0]>()

  useEffect(() => {
    if (activeGroup) setActiveGroup(groups.find((group) => group.id === activeGroup.id))
  }, [groups])

  useEffect(() => {
    if (activeGroup === undefined) setActiveItem(undefined)
    else if (activeItem && !activeGroup?.items.includes(activeItem)) {
      setActiveItem(undefined)
    }
  }, [activeGroup])

  // TODO: Change to work with database instead of state
  const handleAddGroup = () => {
    const newGroup: group = {
      id: Math.random() * 1000,
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
      const index = groups.findIndex((group) => group === activeGroup)
      setGroups((prevGroups) => {
        return prevGroups.filter((group) => group !== activeGroup)
      })
      setActiveGroup(() => {
        const newActiveGroup = index === 0 ? 0 : index - 1
        return groups[newActiveGroup]
      })
    }
  }

  const handleRemoveItem = () => {
    if (activeGroup && activeItem) {
      const index = activeGroup.items.findIndex((item) => item === activeItem)
      setGroups((prevGroups) => {
        return prevGroups.map((group) => {
          if (group === activeGroup) {
            group.items = group.items.filter((item) => item !== activeItem)
          }
          return group
        })
      })
      setActiveItem(() => {
        const newActiveItem = index === 0 ? 0 : index - 1
        return activeGroup?.items[newActiveItem]
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
      const randomColor = '#000000'.replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16)
      })
      const newItem = {
        id: Math.random() * 1000,
        name: 'New Item',
        type: 'bar',
        stat: 'health',
        statDirection: 'r-l',
        styles: {
          bar: { backgroundColor: randomColor },
          backdrop: { backgroundColor: randomColor + '80', width: '120px', height: '10px' },
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

  const handleGroupCopy = () => {
    if (activeGroup) {
      localStorage.setItem('activeGroup', JSON.stringify(activeGroup))
    }
  }

  const handleGroupPaste = () => {
    const group = localStorage.getItem('activeGroup')
    if (group) {
      let pastedGroup = JSON.parse(group) as group
      pastedGroup.id = Math.random() * 1000
      setGroups((prevGroups) => {
        return [...prevGroups, pastedGroup]
      })
    }
  }

  const handleItemCopy = () => {
    if (activeItem) {
      localStorage.setItem('activeItem', JSON.stringify(activeItem))
    }
  }

  const handleItemPaste = () => {
    const item = localStorage.getItem('activeItem')
    if (item) {
      let pastedItem = JSON.parse(item) as item
      pastedItem.id = Math.random() * 1000
      setGroups((prevGroups) => {
        return prevGroups.map((group) => {
          if (group === activeGroup) {
            return { ...group, items: [...group.items, pastedItem] }
          }
          return group
        })
      })
    }
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return
    const { source, destination } = result
    if (source.droppableId === destination.droppableId && source.index === destination.index) return
    if (source.droppableId !== destination.droppableId) return

    if (source.droppableId === 'groups') {
      const movedGroup = groups[source.index]
      const newGroups = [...groups]
      newGroups.splice(source.index, 1)
      newGroups.splice(destination.index, 0, movedGroup)
      setActiveGroup(movedGroup)
      setGroups(newGroups)
    } else if (source.droppableId === 'items') {
      const updatedGroups = groups.map((group) => {
        if (group === activeGroup) {
          const items = [...group.items]
          const [reorderedItem] = items.splice(source.index, 1)
          items.splice(destination.index, 0, reorderedItem)
          return { ...group, items }
        }
        return group
      })
      setGroups(updatedGroups)
    }
  }

  const handleDragStart = (result: any) => {
    if (result.source.droppableId === 'groups') {
      const group = groups[result.source.index]
      setActiveGroup(group)
    } else if (result.source.droppableId === 'items') {
      const item = activeGroup?.items[result.source.index]
      setActiveItem(item)
    }
  }

  return (
    <>
      <h1 className='font-bold text-2xl'>Groups</h1>
      <div className='rounded overflow-hidden flex flex-col main-colors shadow-lg border border-neutral-800'>
        <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
          <Droppable droppableId='groups'>
            {(provided) => (
              <div
                className='overflow-y-scroll secondary-scroll h-48 flex flex-col shadow-lg'
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {groups.map((group, index) => {
                  return (
                    <Draggable key={group.id} draggableId={String(group.id)} index={index}>
                      {(provided) => (
                        <div
                          id={'group-' + String(group.id)}
                          className={`${
                            activeGroup?.id === group.id ? 'secondary-colors' : ''
                          } flex hover:bg-white/10 place-items-center border-y border-neutral-800 main-colors`}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <button
                            className='text-sm grow overflow-hidden'
                            onClick={() => {
                              if (activeGroup?.id === group.id) setActiveGroup(undefined)
                              else setActiveGroup(group)
                            }}
                          >
                            <p className='text-xs p-2 overflow-hidden flex justify-center'>
                              <span className='truncate'>{group.name}</span>({group.items.length})
                            </p>
                          </button>
                          <div
                            className='cursor-grab h-full flex place-items-center'
                            {...provided.dragHandleProps}
                          >
                            <EllipsisVerticalIcon className='h-6 w-6' />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className='flex divide-x divide-neutral-800 justify-between'>
          <div className='grow flex justify-center'>
            <button
              className='p-2 grow flex justify-center hover:bg-white/10 active:scale-[99%]'
              onClick={handleAddGroup}
            >
              <PlusIcon className='h-6 w-6' />
            </button>
          </div>
          <div className='flex'>
            <div className='grow flex justify-center'>
              <button
                className='p-2 grow flex justify-center hover:bg-white/10 active:scale-[99%]'
                onClick={handleGroupCopy}
              >
                <DocumentDuplicateIcon className='h-6 w-6' />
              </button>
            </div>
            <div className='grow flex justify-center'>
              <button
                className='p-2 grow flex justify-center hover:bg-white/10 active:scale-[99%]'
                onClick={handleGroupPaste}
              >
                <ClipboardDocumentListIcon className='h-6 w-6' />
              </button>
            </div>
          </div>
          <div className='grow flex justify-center'>
            <button
              className='p-2 grow flex justify-center hover:bg-white/10 active:scale-[99%]'
              onClick={handleRemoveGroup}
            >
              <MinusIcon className='h-6 w-6' />
            </button>
          </div>
        </div>
      </div>
      {activeGroup ? (
        <>
          <div className='p-2 flex flex-col gap-2'>
            <h2 className='font-bold text-xl'>Options</h2>
            <form
              className='flex flex-col p-2 gap-2 main-colors rounded shadow-lg'
              onSubmit={handleGroupEdit}
            >
              <div className='w-full flex gap-1'>
                <label htmlFor='name'>Name:</label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Name'
                  value={activeGroup?.name}
                  className='input'
                  onChange={(e) => {
                    setActiveGroup({ ...activeGroup, name: e.target.value })
                  }}
                />
              </div>
              <div className='w-full flex gap-1'>
                <label htmlFor='x-pos'>X Position:</label>
                <input
                  type='number'
                  min={0}
                  max={window.innerHeight}
                  name='x-pos'
                  id='x-pos'
                  placeholder='X Position'
                  className='input'
                  value={activeGroup?.position.x.replace('px', '')}
                  onChange={(e) => {
                    setActiveGroup({
                      ...activeGroup,
                      position: { ...activeGroup.position, x: e.target.value + 'px' },
                    })
                  }}
                />
              </div>
              <div className='w-full flex gap-1'>
                <label htmlFor='y-pos'>Y Position:</label>
                <input
                  type='number'
                  min={0}
                  max={window.innerWidth}
                  name='y-pos'
                  id='y-pos'
                  placeholder='Y Position'
                  className='input'
                  value={activeGroup?.position.y.replace('px', '')}
                  onChange={(e) => {
                    setActiveGroup({
                      ...activeGroup,
                      position: { ...activeGroup.position, y: e.target.value + 'px' },
                    })
                  }}
                />
              </div>
              <div className='w-full flex gap-1'>
                <label htmlFor='item-gap'>Item gap:</label>
                <input
                  type='number'
                  min={0}
                  max={100}
                  name='item-gap'
                  id='item-gap'
                  value={activeGroup?.gap}
                  className='input'
                  onChange={(e) => {
                    setActiveGroup({
                      ...activeGroup,
                      gap: e.target.value,
                    })
                  }}
                />
              </div>
              <div className='w-full flex gap-1'>
                <label htmlFor='vertical'>Column Stack:</label>
                <input
                  type='checkbox'
                  min={0}
                  max={window.innerHeight}
                  name='vertical'
                  id='vertical'
                  checked={activeGroup?.vertical}
                  className='rounded'
                  onChange={(e) => {
                    setActiveGroup({
                      ...activeGroup,
                      vertical: !activeGroup.vertical,
                    })
                  }}
                />
              </div>
              <button
                type='submit'
                className='secondary-colors rounded shadow-lg hover:bg-white/10 hover:scale-[101%] active:scale-[99%]'
              >
                Save
              </button>
            </form>
          </div>
          <div className='p-2 flex flex-col gap-2'>
            <h2 className='font-bold text-xl'>Items</h2>
            <div className='rounded overflow-hidden main-colors flex flex-col divide-y-2 divide-neutral-800 shadow-lg border border-neutral-800'>
              <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                <Droppable droppableId='items'>
                  {(provided) => (
                    <div
                      className='overflow-y-scroll secondary-scroll h-48 flex flex-col shadow-lg'
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {activeGroup.items.map((item, index) => {
                        return (
                          <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                            {(provided) => (
                              <div
                                id={'item-' + String(item.id)}
                                className={`${
                                  activeItem?.id === item.id ? 'secondary-colors' : ''
                                } flex hover:bg-white/10 place-items-center border-y border-neutral-800 main-colors`}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                              >
                                <button
                                  className='text-sm grow overflow-hidden'
                                  onClick={() => {
                                    if (activeItem?.id === item.id) setActiveItem(undefined)
                                    else setActiveItem(item)
                                  }}
                                >
                                  <p className='text-xs p-2 overflow-hidden flex justify-center'>
                                    <span className='truncate'>{item.name}</span>({item.type})
                                  </p>
                                </button>
                                <div
                                  className='cursor-grab h-full flex place-items-center'
                                  {...provided.dragHandleProps}
                                >
                                  <EllipsisVerticalIcon className='h-6 w-6' />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <div className='flex divide-x divide-neutral-800 justify-between'>
                <div className='grow flex justify-center'>
                  <button
                    className='p-2 grow flex justify-center hover:bg-white/10 active:scale-[99%]'
                    onClick={handleItemAdd}
                  >
                    <PlusIcon className='h-6 w-6' />
                  </button>
                </div>
                <div className='flex'>
                  <div className='grow flex justify-center'>
                    <button
                      className='p-2 grow flex justify-center hover:bg-white/10 active:scale-[99%]'
                      onClick={handleItemCopy}
                    >
                      <DocumentDuplicateIcon className='h-6 w-6' />
                    </button>
                  </div>
                  <div className='grow flex justify-center'>
                    <button
                      className='p-2 grow flex justify-center hover:bg-white/10 active:scale-[99%]'
                      onClick={handleItemPaste}
                    >
                      <ClipboardDocumentListIcon className='h-6 w-6' />
                    </button>
                  </div>
                </div>
                <div className='grow flex justify-center'>
                  <button
                    className='p-2 grow flex justify-center hover:bg-white/10 active:scale-[99%]'
                    onClick={handleRemoveItem}
                  >
                    <MinusIcon className='h-6 w-6' />
                  </button>
                </div>
              </div>
            </div>
            {activeItem ? (
              <div className='p-2 flex flex-col gap-2'>
                <h2 className='font-bold text-xl'>Options</h2>
                <form
                  className='flex flex-col p-2 gap-2 main-colors rounded shadow-lg'
                  onSubmit={handleItemEdit}
                >
                  <div className='w-full flex gap-1'>
                    <label htmlFor='item-name'>Name:</label>
                    <input
                      type='text'
                      name='name'
                      id='item-name'
                      placeholder='Name'
                      className='input'
                      value={activeItem.name}
                      onChange={(e) => {
                        setActiveItem({ ...activeItem, name: e.target.value })
                      }}
                    />
                  </div>
                  <div className='w-full flex gap-1'>
                    <label htmlFor='type'>Type:</label>
                    <select
                      name='type'
                      id='type'
                      value={activeItem.type}
                      className='input'
                      onChange={(e) => {
                        if (e.target.value === 'circle') {
                          setActiveItem({
                            ...activeItem,
                            type: e.target.value,
                            styles: {
                              ...activeItem.styles,
                              backdrop: {
                                ...activeItem.styles?.backdrop,
                                width: '40px',
                                height: '40px',
                              },
                            },
                          })
                        } else {
                          setActiveItem({ ...activeItem, type: e.target.value })
                        }
                      }}
                    >
                      <option value='bar'>Bar</option>
                      <option value='circle'>Circle</option>
                    </select>
                  </div>
                  <div className='flex justify-center gap-1'>
                    <label htmlFor='stat'>Stat:</label>
                    <select
                      name='stat'
                      id='stat'
                      className='input'
                      value={activeItem.stat}
                      onChange={(e) => {
                        setActiveItem({ ...activeItem, stat: e.target.value })
                      }}
                    >
                      <option value='health'>Health</option>
                      <option value='armor'>Armor</option>
                      <option value='stamina'>Stamina</option>
                      <option value='oxygen'>Oxygen</option>
                    </select>
                  </div>
                  <div className='flex justify-center gap-1'>
                    <label htmlFor='stat-direction'>Stat Drain:</label>
                    <select
                      name='stat'
                      id='stat-direction'
                      className='input'
                      value={activeItem.statDirection || 'r-l'}
                      onChange={(e) => {
                        setActiveItem({
                          ...activeItem,
                          statDirection: e.target.value,
                        })
                      }}
                    >
                      <option value='t-b'>Top down</option>
                      <option value='r-l'>Right left</option>
                    </select>
                  </div>
                  {activeItem.type === 'bar' ? (
                    <>
                      <div className='w-full flex gap-1'>
                        <label htmlFor='width'>Width:</label>
                        <input
                          type='number'
                          name='width'
                          id='width'
                          className='input'
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
                      </div>
                      <div className='w-full flex gap-1'>
                        <label htmlFor='height'>Height:</label>
                        <input
                          type='number'
                          name='height'
                          id='height'
                          className='input'
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
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='flex justify-center gap-1'>
                        <label htmlFor='size'>Size:</label>
                        <input
                          type='number'
                          name='size'
                          id='size'
                          className='input'
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
                      </div>
                    </>
                  )}
                  <div className='w-full flex justify-evenly'>
                    <div className='flex justify-center gap-1'>
                      <label htmlFor='fill-color'>Fill:</label>
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
                    </div>
                    <div className='flex justify-center gap-1'>
                      <label htmlFor='backdrop-color'>Backdrop:</label>
                      <input
                        type='color'
                        name='backdrop-color'
                        id='backdrop-color'
                        value={
                          activeItem.styles?.backdrop?.backgroundColor?.replace('80', '') ||
                          '#000000'
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
                    </div>
                  </div>
                  <button
                    type='submit'
                    className='secondary-colors hover:bg-white/10 rounded shadow-lg hover:scale-[101%] active:scale-[99%]'
                  >
                    Save
                  </button>
                </form>
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  )
}

export default GroupsPage
