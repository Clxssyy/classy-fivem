import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { MouseEventHandler, useEffect, useState } from 'react'
import { ItemOption } from '../.config'
import FunctionOption from './FunctionOption'

interface MenuItemProps {
  name: string
  description?: string
  function: MouseEventHandler
  functionOptions?: ItemOption[]
  collapsed: boolean
  extended: number
  menuExpanded: boolean
  openItem: (item: string) => Promise<void>
  openedItem: string
  id: string
}

const MenuItem = (props: MenuItemProps) => {
  const [hidden, setHidden] = useState(true)
  const {
    name: name,
    description: description,
    function: func,
    functionOptions: functionOptions,
    collapsed: collapsed,
    extended: extended,
    menuExpanded: expanded,
    id: id,
    openedItem: openItem,
    openItem: setOpenItem,
  } = props

  useEffect(() => {
    if (openItem === id) {
      setHidden(false)
    } else {
      setHidden(true)
    }
  }, [openItem])

  useEffect(() => {
    setHidden(true)
  }, [collapsed])

  useEffect(() => {
    if (extended === 1) return
    setHidden(false)
  }, [extended])

  if (!expanded) {
    return (
      <section id={id} className='flex'>
        <button
          onClick={functionOptions ? () => setOpenItem(id) : func}
          className='grow font-bold hover:scale-105 active:scale-95 transition-all bg-neutral-700/80 px-2 shadow-lg text-neutral-400/80 group-hover/menu:text-neutral-400 group-hover/menu:bg-neutral-700'
        >
          {name}
        </button>
      </section>
    )
  } else {
    return (
      <>
        <div id={id} className='flex flex-col'>
          <div className='flex'>
            <div className='p-2 min-w-fit'>
              <button
                onClick={func}
                className='font-bold hover:scale-105 active:scale-95 transition-all bg-neutral-600/80 rounded px-2 shadow-lg border border-neutral-800 text-neutral-400/80 group-hover/menu:text-neutral-400 group-hover/menu:bg-neutral-600'
              >
                {name}
              </button>
            </div>
            {functionOptions ? (
              <button
                onClick={() => setHidden(!hidden)}
                className={`flex grow place-items-center overflow-hidden gap-2 text-neutral-400/80 ${
                  description ? 'justify-between' : 'justify-end'
                }`}
              >
                {description ? (
                  <div className='overflow-hidden flex'>
                    <p className='text-xs truncate text-neutral-400/80 group-hover/menu:text-neutral-400'>
                      {description}
                    </p>
                  </div>
                ) : null}
                <div className='p-2'>
                  <ChevronDownIcon
                    className={`w-6 h-6 transition-all text-neutral-400/80 group-hover/menu:text-neutral-400 ${
                      hidden ? 'rotate-0' : 'rotate-180'
                    }`}
                  />
                </div>
              </button>
            ) : description ? (
              <div className='flex place-items-center overflow-hidden text-neutral-400/80 group-hover/menu:text-neutral-400'>
                <p className='text-xs truncate'>{description}</p>
              </div>
            ) : null}
          </div>
          {functionOptions ? (
            <div
              className={`transition-all ease-in-out overflow-hidden ${
                hidden ? 'max-h-0' : 'max-h-96'
              }`}
            >
              <div id={id + '-options'} className='flex gap-2 p-2 flex-wrap'>
                {functionOptions.map((option) => (
                  <FunctionOption
                    key={option.id}
                    name={option.name}
                    id={option.id}
                    toggle={option.toggle}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </>
    )
  }
}

export default MenuItem
