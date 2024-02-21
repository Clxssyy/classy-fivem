import { ArrowPathIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import GroupsPage from './GroupsPage'
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
  const [activePage, setActivePage] = useState<string>('Layout')

  return (
    <div className='absolute grid place-items-center h-screen w-screen'>
      <main className='w-1/2 h-3/4 main-colors rounded shadow-lg flex-col flex divide-y divide-neutral-800 z-10 overflow-hidden'>
        <header className='flex justify-between shadow-lg'>
          <h1 className='p-2 font-bold text-3xl'>Settings</h1>
          <button className='p-2' onClick={exit}>
            <XMarkIcon className='h-6 w-6' />
          </button>
        </header>
        <section className='grow flex divide-x divide-neutral-800 overflow-hidden'>
          <nav className='flex flex-col justify-between w-1/6 divide-y divide-neutral-800'>
            <div className='flex flex-col divide-y divide-neutral-800 overflow-y-auto custom-scroll'>
              <button
                className={`${
                  activePage === 'Layout'
                    ? 'secondary-colors cursor-not-allowed'
                    : 'hover:bg-white/10'
                } flex p-2 grow`}
                onClick={() => setActivePage('Layout')}
              >
                Layout
              </button>
              <button
                className={`${
                  activePage === 'Groups'
                    ? 'secondary-colors cursor-not-allowed'
                    : 'hover:bg-white/10'
                } flex p-2 grow`}
                onClick={() => setActivePage('Groups')}
              >
                Groups
              </button>
            </div>
            <div className='flex justify-between divide-x divide-neutral-800'>
              <button
                className='p-2 grow flex justify-center'
                onClick={() => setEditMode(!editMode)}
              >
                <PencilIcon className='h-6 w-6' />
              </button>
              <button className='p-2 grow flex justify-center'>
                <ArrowPathIcon className='h-6 w-6' />
              </button>
            </div>
          </nav>
          <section className='grow overflow-y-scroll custom-scroll secondary-colors p-2'>
            {
              {
                Layout: <LayoutPage editMode={editMode} setEditMode={setEditMode} />,
                Groups: <GroupsPage groups={groups} setGroups={setGroups} />,
              }[activePage]
            }
          </section>
        </section>
      </main>
    </div>
  )
}

export default HudSettings
