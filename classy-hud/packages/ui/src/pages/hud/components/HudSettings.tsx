import { PencilIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import StatsPage from './StatsPage'
import { group } from '../Hud'

interface HudSettingsProps {
  editMode: boolean
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
  exit: () => Promise<void>
  groups: group[]
  setGroups: React.Dispatch<React.SetStateAction<group[]>>
}

const LayoutPage = ({
  editMode,
  setEditMode,
}: {
  editMode: boolean
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <button className='p-2' onClick={() => setEditMode(!editMode)}>
      <PencilIcon className='h-6 w-6' />
    </button>
  )
}

const HudSettings = ({ editMode, setEditMode, exit, groups, setGroups }: HudSettingsProps) => {
  const [activePage, setActivePage] = useState<JSX.Element>(
    <LayoutPage editMode={editMode} setEditMode={setEditMode} />,
  )

  return (
    <div className='absolute grid place-items-center h-screen w-screen'>
      <div className='w-1/2 h-3/4 bg-neutral-700 rounded shadow-lg flex-col flex divide-y divide-neutral-800 z-10'>
        <header className='flex justify-between text-neutral-600'>
          <h1 className='p-2 font-bold text-3xl'>Settings</h1>
          <button className='p-2' onClick={exit}>
            <XMarkIcon className='h-6 w-6' />
          </button>
        </header>
        <section className='grow flex divide-x divide-neutral-800 overflow-hidden'>
          <div className='flex flex-col divide-y divide-neutral-800 w-1/6'>
            <div>
              <button
                className='p-2'
                onClick={() =>
                  setActivePage(<LayoutPage editMode={editMode} setEditMode={setEditMode} />)
                }
              >
                Layout
              </button>
            </div>
            <div>
              <button
                className='p-2'
                onClick={() => setActivePage(<StatsPage groups={groups} setGroups={setGroups} />)}
              >
                Stats
              </button>
            </div>
          </div>
          <div className='grow flex flex-col overflow-y-scroll custom-scroll'>{activePage}</div>
        </section>
      </div>
    </div>
  )
}

export default HudSettings
