import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
interface MenuCategoryProps {
  category: string
  children: JSX.Element[] | JSX.Element
  categoryExtend: number
  catergoryCollapse: boolean
  id: string
}

const MenuCategory = (props: MenuCategoryProps) => {
  const {
    category: category,
    children: children,
    categoryExtend: categoryExtend,
    catergoryCollapse: categoryCollapse,
    id: id,
  } = props

  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    if (categoryExtend === 1) return
    setHidden(false)
  }, [categoryExtend])

  useEffect(() => {
    setHidden(true)
  }, [categoryCollapse])

  return (
    <>
      <section id={id} className='flex flex-col'>
        <header className='flex grow sticky top-0 z-10 bg-neutral-600/50 group-hover/menu:bg-neutral-600'>
          <button
            onClick={() => setHidden(!hidden)}
            className='flex grow justify-between p-2 border-t border-b border-neutral-800 text-neutral-400/50 group-hover/menu:text-neutral-400'
          >
            <h1 className='font-bold'>{category}</h1>
            <div>
              <ChevronDownIcon
                className={`w-6 h-6 transition-all ${hidden ? 'rotate-0' : 'rotate-180'}`}
              />
            </div>
          </button>
        </header>
        <section
          id={id + '-items'}
          className={`flex flex-col divide-y divide-neutral-800 transition-all ease-in-out overflow-hidden ${
            hidden ? 'max-h-0' : 'max-h-[1000px]'
          }`}
        >
          {children}
        </section>
      </section>
    </>
  )
}

export default MenuCategory
