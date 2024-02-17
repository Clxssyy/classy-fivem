interface HudSettingsProps {
  editMode: boolean
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
  exit: () => Promise<void>
}

const HudSettings = ({ editMode, setEditMode, exit }: HudSettingsProps) => {
  return (
    <div className='absolute grid place-items-center h-screen w-screen'>
      <div className='w-1/2 h-3/4 bg-neutral-700 rounded p-4 shadow-lg'>
        <button className='' onClick={() => setEditMode(!editMode)}>
          dddd
        </button>
        <button onClick={exit}>Close</button>
      </div>
    </div>
  )
}

export default HudSettings
