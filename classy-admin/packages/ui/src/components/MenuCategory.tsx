import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

interface MenuCategoryProps {
  category: string
  children: JSX.Element[] | JSX.Element
  toggleCollapse: boolean
  toggleExtend: number
  toggleCategoryExtend: number
  toggleCatergoryCollapse: boolean
  menuExpanded: boolean
}

const MenuCategory = (props: MenuCategoryProps) => {
  const {
    category: category,
    children: children,
    toggleCollapse: collapse,
    toggleExtend: extend,
    toggleCategoryExtend: categoryExtend,
    toggleCatergoryCollapse: categoryCollapse,
    menuExpanded: expanded,
  } = props

  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    setHidden(true)
  }, [collapse])

  useEffect(() => {
    if (extend === 1) return
    setHidden(false)
  }, [extend])

  useEffect(() => {
    if (categoryExtend === 1) return
    setHidden(false)
  }, [categoryExtend])

  useEffect(() => {
    setHidden(true)
  }, [categoryCollapse])

  return (
    <>
      <div className='flex flex-col'>
        <div className='flex grow sticky top-0 z-10 bg-neutral-600/50 group-hover/menu:bg-neutral-600'>
          <button
            onClick={() => setHidden(!hidden)}
            className='flex grow justify-between p-2 border-b border-neutral-800 text-neutral-400/50 group-hover/menu:text-neutral-400'
          >
            <h1 className='font-bold'>{category}</h1>
            <div>
              <ChevronDownIcon
                className={`w-6 h-6 transition-all duration-300 ${
                  hidden ? 'rotate-0' : 'rotate-180'
                }`}
              />
            </div>
          </button>
        </div>
        <div
          className={`transition-all duration-300 overflow-hidden ${
            hidden ? 'max-h-0 ease-out' : 'ease-in max-h-[1000px]'
          }`}
        >
          <div
            className={`flex flex-col p-2 divide-y divide-neutral-800 ${expanded ? '' : 'gap-2'}`}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default MenuCategory
