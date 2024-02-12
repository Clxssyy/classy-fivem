import { usePageContext } from '../../App'
import { useExitListener } from '../../utils/exitListener'
import { fetchNui } from '../../utils/nui'
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import MenuItem from './components/MenuItem'
import { useEffect, useState } from 'react'
import MenuCategory from './components/MenuCategory'
import cfg from './.config'

const categories = cfg.categories

const AdminMenu = () => {
  const { closePage } = usePageContext()
  const [collapsed, setCollapsed] = useState(true)
  const [extended, setExtended] = useState(1)
  const [search, setSearch] = useState('')
  const [categoryExtended, setCategoryExtended] = useState(1)
  const [categoryCollapsed, setCategoryCollapsed] = useState(true)
  const [expandMenu, setExpandMenu] = useState(false)
  const [openedItem, setOpenedItem] = useState('')

  const [filteredItems, setFilteredItems] = useState(categories)

  useEffect(() => {
    if (search !== '') setCategoryExtended(categoryExtended + 1)
    if (search === '') setCategoryCollapsed(!categoryCollapsed)

    setFilteredItems(() => {
      if (search === '') return categories

      let searchResults = categories.map((group) => {
        return {
          category: group.category,
          items: group.items.filter((item) => {
            return item.name.toLowerCase().includes(search.toLowerCase())
          }),
        }
      })

      // Sort by most items
      searchResults = searchResults.sort((a, b) => {
        if (a.items.length > b.items.length) return -1
        if (a.items.length < b.items.length) return 1
        return 0
      })

      return searchResults
    })
  }, [search])

  useEffect(() => {
    if (expandMenu === false) {
      setCollapsed(!collapsed)
      setOpenedItem('')
    }
  }, [expandMenu])

  async function close() {
    closePage('AdminMenu')
    await fetchNui('closeMenu', { pageName: 'AdminMenu' })
  }

  async function kill() {
    const options = document.getElementById('Kill Player-options')?.children
    const playerID = options && (options[0] as HTMLInputElement).value

    if (playerID !== '') {
      await fetchNui('kill', { playerId: Number(playerID) }).then((res) => {
        console.log(JSON.stringify(res))
      })
    } else {
      await fetchNui('kill').then((res) => {
        console.log(JSON.stringify(res))
      })
    }

    if (options) {
      for (let i = 0; i < options.length; i++) {
        ;(options[i] as HTMLInputElement).value = ''
      }
    }
  }

  async function openItem(item: string) {
    if (!expandMenu) await setExpandMenu(true)
    await setOpenedItem(item)
  }

  useExitListener(async () => {
    await close()
  })

  return (
    <div className='grid p-10 h-screen overflow-hidden place-items-start'>
      <main
        id='menu'
        className={`transition-all ease-in-out bg-neutral-700/50 border border-neutral-800 rounded flex flex-col shadow-lg overflow-hidden hover:bg-neutral-700 group/menu ${
          expandMenu
            ? 'max-w-full max-h-full min-h-full min-w-full'
            : 'min-w-[25%] min-h-min max-h-[75%] max-w-[25%]'
        }`}
      >
        <header className='justify-between flex'>
          <div className='flex p-2 place-items-center gap-2'>
            <h1 className='text-xl font-bold cursor-default select-none'>
              <span className='text-green-500'>Classy</span>Menu
            </h1>
            <input
              type='search'
              name='Search'
              id='search'
              placeholder='Search'
              className={`p-2 rounded text-neutral-400/50 bg-neutral-600/50 shadow-lg border border-neutral-800 group-hover/menu:bg-neutral-600 group-hover/menu:text-neutral-400 ${
                expandMenu ? '' : 'hidden'
              }`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {expandMenu ? (
            <>
              <div className='p-2 flex place-items-center'>
                <button
                  onClick={() => {
                    setCollapsed(!collapsed)
                    setCategoryCollapsed(!categoryCollapsed)
                  }}
                  className='hidden sm:block hover:scale-105 transition-all active:scale-95 text-neutral-400/50 bg-neutral-600/50 rounded p-1 px-2 shadow-lg border border-neutral-800 group-hover/menu:bg-neutral-600 group-hover/menu:text-neutral-400'
                >
                  <ChevronDoubleUpIcon className='w-6 h-6' />
                </button>
              </div>
              <div className='p-2 flex place-items-center'>
                <button
                  onClick={() => {
                    setExtended(extended + 1)
                    setCategoryExtended(categoryExtended + 1)
                  }}
                  className='hidden sm:block hover:scale-105 transition-all active:scale-95 text-neutral-400/50 bg-neutral-600/50 rounded p-1 px-2 shadow-lg border border-neutral-800 group-hover/menu:bg-neutral-600 group-hover/menu:text-neutral-400'
                >
                  <ChevronDoubleDownIcon className='w-6 h-6' />
                </button>
              </div>
            </>
          ) : null}
          <div className='p-2 flex place-items-center gap-2'>
            <button
              onClick={() => {
                setExpandMenu(!expandMenu)
                setCollapsed(!collapsed)
              }}
              className='hover:scale-105 transition-all active:scale-95 text-neutral-400/50 bg-neutral-600/50 rounded p-1 px-2 shadow-lg border border-neutral-800 group-hover/menu:bg-neutral-600 group-hover/menu:text-neutral-400'
            >
              {expandMenu ? (
                <ArrowsPointingInIcon className='w-6 h-6' />
              ) : (
                <ArrowsPointingOutIcon className='w-6 h-6' />
              )}
            </button>
            <button
              onClick={close}
              className='hover:scale-105 transition-all active:scale-95 text-neutral-400/50 bg-neutral-600/50 rounded p-1 px-2 shadow-lg border border-neutral-800 group-hover/menu:bg-neutral-600 group-hover/menu:text-neutral-400'
            >
              <XMarkIcon className='w-6 h-6' />
            </button>
          </div>
        </header>
        <section id='categories' className='shadow-lg overflow-y-auto'>
          {filteredItems.map((group, index) => {
            return (
              <MenuCategory
                key={index}
                id={group.category}
                category={group.category}
                children={group.items.map((item, index) => (
                  <MenuItem
                    key={index}
                    id={item.name}
                    name={item.name}
                    description={item.description}
                    function={item.function}
                    functionOptions={item.functionOptions}
                    collapsed={collapsed}
                    extended={extended}
                    menuExpanded={expandMenu}
                    openItem={openItem}
                    openedItem={openedItem}
                  />
                ))}
                categoryExtend={categoryExtended}
                catergoryCollapse={categoryCollapsed}
              />
            )
          })}
        </section>
      </main>
    </div>
  )
}

export default AdminMenu
