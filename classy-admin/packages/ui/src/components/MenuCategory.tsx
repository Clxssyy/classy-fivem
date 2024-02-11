import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

interface MenuCategoryProps {
  category: string
  children: JSX.Element[] | JSX.Element
  toggleCollapse: boolean
  toggleExtend: number
  toggleCategoryExtend: number
  toggleCatergoryCollapse: boolean
}

const MenuCategory = (props: MenuCategoryProps) => {
  const {
    category: category,
    children: children,
    toggleCollapse: collapse,
    toggleExtend: extend,
    toggleCategoryExtend: categoryExtend,
    toggleCatergoryCollapse: categoryCollapse,
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
        <div className='flex grow'>
          <button
            onClick={() => setHidden(!hidden)}
            className='flex grow text-neutral-500 justify-between p-2 border-b border-neutral-800'
          >
            <h1 className='font-bold text-neutral-600 group-hover/menu:text-neutral-400'>
              {category}
            </h1>
            <div>
              <ChevronDownIcon
                className={`w-6 h-6 transition-all duration-300 text-neutral-600 group-hover/menu:text-neutral-400 ${
                  hidden ? 'rotate-0' : 'rotate-180'
                }`}
              />
            </div>
          </button>
        </div>
        <div
          className={`transition-all duration-300 overflow-hidden bg-white/10 ${
            hidden ? 'max-h-0 ease-out' : 'ease-in max-h-[1000px]'
          }`}
        >
          <div className='flex flex-col p-2 divide-y divide-neutral-800'>{children}</div>
        </div>
      </div>
    </>
  )
}

export default MenuCategory
