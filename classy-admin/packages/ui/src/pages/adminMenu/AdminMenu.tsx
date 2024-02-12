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
import MenuItem from '../../components/MenuItem'
import { useEffect, useState } from 'react'
import MenuCategory from '../../components/MenuCategory'

const AdminMenu = () => {
  const { closePage } = usePageContext()
  const [collapse, setCollapse] = useState(true)
  const [extend, setExtend] = useState(1)
  const [search, setSearch] = useState('')
  const [categoryExtend, setCategoryExtend] = useState(1)
  const [categoryCollapse, setCategoryCollapse] = useState(true)
  const [expandMenu, setExpandMenu] = useState(false)
  const [openedItem, setOpenedItem] = useState('')

  const menuItems = [
    {
      category: 'Player',
      items: [
        {
          itemName: 'Kill Player',
          itemDescription: 'Kill a player.',
          itemFunction: kill,
          functionOptions: (
            <>
              <input
                type='text'
                placeholder='Player ID'
                id='player-id'
                className='p-2 rounded shadow-md bg-white/50 group-hover/menu:bg-white'
              />
            </>
          ),
        },
        {
          itemName: 'Give Weapon',
          itemDescription: 'Give player a weapon.',
          itemFunction: kill,
          functionOptions: (
            <>
              <input
                type='text'
                placeholder='Player ID'
                id='player-id'
                className='p-2 rounded shadow-md bg-white/50 group-hover/menu:bg-white'
              />
              <input
                type='text'
                placeholder='Weapon Name'
                id='weapon-name'
                className='p-2 rounded shadow-md bg-white/50 group-hover/menu:bg-white'
              />
              <input
                type='text'
                placeholder='Ammo'
                id='ammo'
                className='p-2 rounded shadow-md bg-white/50 group-hover/menu:bg-white'
              />
            </>
          ),
        },
        {
          itemName: 'God Mode',
          itemDescription: 'Enable god mode.',
          itemFunction: kill,
        },
        {
          itemName: 'No Clip',
          itemDescription: 'Enable no clip mode.',
          itemFunction: kill,
        },
        {
          itemName: 'Spawn Vehicle',
          itemDescription: 'Spawn a vehicle.',
          itemFunction: kill,
          functionOptions: (
            <>
              <input
                type='text'
                placeholder='Vehicle Name'
                id='vehicle-name'
                className='p-2 rounded shadow-md bg-white/50 group-hover/menu:bg-white'
              />
            </>
          ),
        },
        {
          itemName: 'Teleport',
          itemDescription: 'Teleport to a location.',
          itemFunction: kill,
          functionOptions: (
            <>
              <input
                type='text'
                placeholder='X'
                id='x'
                className='p-2 rounded shadow-md bg-white/50 group-hover/menu:bg-white'
              />
              <input
                type='text'
                placeholder='Y'
                id='y'
                className='p-2 rounded shadow-md bg-white/50 group-hover/menu:bg-white'
              />
              <input
                type='text'
                placeholder='Z'
                id='z'
                className='p-2 rounded shadow-md bg-white/50 group-hover/menu:bg-white'
              />
              <div className='flex place-items-center gap-2'>
                <label htmlFor='waypoint'>Waypoint</label>
                <input type='checkbox' name='waypoint' id='waypoint' className='w-6 h-6' />
              </div>
            </>
          ),
        },
      ],
    },
    {
      category: 'Server',
      items: [
        {
          itemName: 'Kick Player',
          itemDescription: 'Kick a player.',
          itemFunction: kill,
          functionOptions: (
            <>
              <input
                type='text'
                placeholder='Player ID'
                id='player-id'
                className='p-2 rounded shadow-md bg-white/50 group-hover/menu:bg-white'
              />
            </>
          ),
        },
        {
          itemName: 'Ban Player',
          itemDescription: 'Ban a player.',
          itemFunction: kill,
          functionOptions: (
            <>
              <input
                type='text'
                placeholder='Player ID'
                id='player-id'
                className='p-2 rounded shadow-md bg-white/50 group-hover/menu:bg-white'
              />
              <input
                type='text'
                placeholder='Reason'
                id='reason'
                className='p-2 rounded shadow-md bg-white/50 group-hover/menu:bg-white'
              />
              <input
                type='text'
                placeholder='Duration'
                id='duration'
                className='p-2 rounded shadow-md bg-white/50 group-hover/menu:bg-white'
              />
            </>
          ),
        },
        {
          itemName: 'Announce',
          itemDescription: 'Send an announcement.',
          itemFunction: kill,
          functionOptions: (
            <>
              <input
                type='text'
                placeholder='Message'
                id='message'
                className='p-2 rounded shadow-md bg-white/50 group-hover/menu:bg-white'
              />
            </>
          ),
        },
        {
          itemName: 'Set Weather',
          itemDescription: 'Set the weather.',
          itemFunction: kill,
          functionOptions: (
            <>
              <input
                type='text'
                placeholder='Weather Name'
                id='weather-name'
                className='p-2 rounded shadow-md bg-white/50 group-hover/menu:bg-white'
              />
            </>
          ),
        },
        {
          itemName: 'Set Time',
          itemDescription: 'Set the time.',
          itemFunction: kill,
          functionOptions: (
            <>
              <input
                type='text'
                placeholder='Time'
                id='time'
                className='p-2 rounded shadow-md bg-white/50 group-hover/menu:bg-white'
              />
            </>
          ),
        },
      ],
    },
    {
      category: 'Inventory',
      items: [
        {
          itemName: 'Give Item',
          itemDescription: 'Give a player an item.',
          itemFunction: kill,
          functionOptions: (
            <>
              <input
                type='text'
                placeholder='Player ID'
                id='player-id'
                className='p-2 rounded shadow-md bg-white/50 group-hover/menu:bg-white'
              />
              <input
                type='text'
                placeholder='Item Name'
                id='item-name'
                className='p-2 rounded shadow-md bg-white/50 group-hover/menu:bg-white'
              />
              <input
                type='text'
                placeholder='Amount'
                id='amount'
                className='p-2 rounded shadow-md bg-white/50 group-hover/menu:bg-white'
              />
            </>
          ),
        },
        {
          itemName: 'Remove Item',
          itemDescription: 'Remove an item from a player.',
          itemFunction: kill,
          functionOptions: (
            <>
              <input
                type='text'
                placeholder='Player ID'
                id='player-id'
                className='p-2 rounded shadow-md bg-white/50 group-hover/menu:bg-white'
              />
              <input
                type='text'
                placeholder='Item Name'
                id='item-name'
                className='p-2 rounded shadow-md bg-white/50 group-hover/menu:bg-white'
              />
              <input
                type='text'
                placeholder='Amount'
                id='amount'
                className='p-2 rounded shadow-md bg-white/50 group-hover/menu:bg-white'
              />
            </>
          ),
        },
      ],
    },
    {
      category: 'Misc',
      items: [
        {
          itemName: 'Close Menu',
          itemDescription: 'Close the menu.',
          itemFunction: close,
        },
      ],
    },
  ]

  const [filteredItems, setFilteredItems] = useState(menuItems)

  useEffect(() => {
    if (search !== '') setCategoryExtend(categoryExtend + 1)
    if (search === '') setCategoryCollapse(!categoryCollapse)

    setFilteredItems(() => {
      if (search === '') return menuItems

      let searchResults = menuItems.map((group) => {
        return {
          category: group.category,
          items: group.items.filter((item) => {
            return item.itemName.toLowerCase().includes(search.toLowerCase())
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
      setCollapse(!collapse)
      setOpenedItem('')
    }
  }, [expandMenu])

  async function close() {
    closePage('AdminMenu')
    await fetchNui('closeMenu', { pageName: 'AdminMenu' })
  }

  async function kill() {
    const options = document.getElementById('Kill Player-options')?.children

    if (options) {
      const playerID = (options[0] as HTMLInputElement).value
      console.log('Player ID:', playerID)
      await fetchNui('kill', { playerID: Number(playerID) })
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
        className={`transition-all bg-neutral-700/50 border border-neutral-800 rounded flex flex-col shadow-lg overflow-hidden hover:bg-neutral-700 group/menu ${
          expandMenu
            ? 'max-w-full max-h-full min-h-full min-w-full ease-out'
            : 'ease-out min-w-[25%] min-h-min max-h-[75%] max-w-[25%]'
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
                    setCollapse(!collapse)
                    setCategoryCollapse(!categoryCollapse)
                  }}
                  className='hidden sm:block hover:scale-105 transition-all active:scale-95 text-neutral-400/50 bg-neutral-600/50 rounded p-1 px-2 shadow-lg border border-neutral-800 group-hover/menu:bg-neutral-600 group-hover/menu:text-neutral-400'
                >
                  <ChevronDoubleUpIcon className='w-6 h-6' />
                </button>
              </div>
              <div className='p-2 flex place-items-center'>
                <button
                  onClick={() => {
                    setExtend(extend + 1)
                    setCategoryExtend(categoryExtend + 1)
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
                setCollapse(!collapse)
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
                    id={item.itemName}
                    itemName={item.itemName}
                    itemDescription={item.itemDescription}
                    itemFunction={item.itemFunction}
                    functionOptions={item.functionOptions}
                    toggleCollapse={collapse}
                    toggleExtend={extend}
                    menuExpanded={expandMenu}
                    openItem={openItem}
                    openedItem={openedItem}
                  />
                ))}
                toggleCollapse={collapse}
                toggleExtend={extend}
                toggleCategoryExtend={categoryExtend}
                toggleCatergoryCollapse={categoryCollapse}
              />
            )
          })}
        </section>
      </main>
    </div>
  )
}

export default AdminMenu
