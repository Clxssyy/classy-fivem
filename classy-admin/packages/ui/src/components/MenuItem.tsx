import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { MouseEventHandler, useEffect, useState } from 'react'

interface MenuItemProps {
  itemName: string
  itemDescription?: string
  itemFunction: MouseEventHandler
  functionOptions?: JSX.Element
  toggleCollapse: boolean
  toggleExtend: number
}

const MenuItem = (props: MenuItemProps) => {
  const [hidden, setHidden] = useState(true)
  const {
    itemFunction: func,
    itemName: name,
    itemDescription: description,
    functionOptions: options,
    toggleCollapse: collapse,
    toggleExtend: extend,
  } = props

  useEffect(() => {
    setHidden(true)
  }, [collapse])

  useEffect(() => {
    if (extend === 1) return
    setHidden(false)
  }, [extend])

  return (
    <>
      <div className='flex flex-col'>
        <div className='flex'>
          <div className='p-2 min-w-fit'>
            <button
              onClick={func}
              className='font-bold hover:scale-105 active:scale-95 transition-all bg-neutral-600/50 rounded px-2 shadow-lg border border-neutral-800 text-neutral-400/50 group-hover/menu:text-neutral-400 group-hover/menu:bg-neutral-600'
            >
              {name}
            </button>
          </div>
          {options ? (
            <button
              onClick={() => setHidden(!hidden)}
              className={`flex grow place-items-center overflow-hidden gap-2 text-neutral-400/50 ${
                description ? 'justify-between' : 'justify-end'
              }`}
            >
              {description ? (
                <div className='overflow-hidden'>
                  <p className='text-xs truncate text-neutral-400/50 group-hover/menu:text-neutral-400'>
                    {description}
                  </p>
                </div>
              ) : null}
              <div className='p-2'>
                <ChevronDownIcon
                  className={`w-6 h-6 transition-all duration-300 text-neutral-400/50 group-hover/menu:text-neutral-400 ${
                    hidden ? 'rotate-0' : 'rotate-180'
                  }`}
                />
              </div>
            </button>
          ) : description ? (
            <div className='flex place-items-center overflow-hidden text-neutral-400/50 group-hover/menu:text-neutral-400'>
              <p className='text-xs truncate'>{description}</p>
            </div>
          ) : null}
        </div>
        {options ? (
          <div
            className={`transition-all duration-300 overflow-hidden ${
              hidden ? 'max-h-0 ease-out' : 'ease-in max-h-96'
            }`}
          >
            <div className='flex gap-2 p-2 flex-wrap'>{options}</div>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default MenuItem
