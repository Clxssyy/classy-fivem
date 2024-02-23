import { useEffect, useState } from 'react'
import HudSettings from './components/HudSettings'
import { useExitListener } from '../../utils/exitListener'
import { fetchNui } from '../../utils/nui'
import DragWrapper from './components/DragWrapper'
import StatBar from './components/StatBar'
import StatCircle from './components/StatCircle'

interface PlayerStats {
  health: number
  armor: number
  stamina: number
  oxygen: number
  [key: string]: number
}

export interface item {
  id: number
  type: string
  name: string
  stat: string
  statDirection: string
  styles: {
    backdrop: {
      backgroundColor: string
      width: string
      height: string
    }
    bar: {
      backgroundColor: string
    }
  }
}

export interface group {
  id: number
  name: string
  items: item[]
  position: {
    x: string
    y: string
  }
  vertical: boolean
  gap: string
}

export const DEFAULT_GROUPS: group[] = [
  {
    id: 1,
    name: 'Group 1',
    items: [
      {
        id: 1,
        type: 'bar',
        name: 'Health',
        stat: 'health',
        statDirection: 'r-l',
        styles: {
          backdrop: {
            backgroundColor: '#f4433680',
            width: '120px',
            height: '12px',
          },
          bar: {
            backgroundColor: '#f44336',
          },
        },
      },
      {
        id: 2,
        type: 'bar',
        name: 'Armor',
        stat: 'armor',
        statDirection: 'r-l',
        styles: {
          backdrop: {
            backgroundColor: '#a0aec080',
            width: '120px',
            height: '12px',
          },
          bar: {
            backgroundColor: '#a0aec0',
          },
        },
      },
    ],
    position: {
      x: '0px',
      y: '1064px',
    },
    vertical: false,
    gap: '2',
  },
  {
    id: 2,
    name: 'Group 2',
    items: [
      {
        id: 3,
        type: 'circle',
        name: 'Stamina',
        stat: 'stamina',
        statDirection: 'b-t',
        styles: {
          backdrop: {
            backgroundColor: '#f59e0b80',
            width: '40px',
            height: '40px',
          },
          bar: {
            backgroundColor: '#f59e0b',
          },
        },
      },
      {
        id: 4,
        type: 'circle',
        name: 'Oxygen',
        stat: 'oxygen',
        statDirection: 'b-t',
        styles: {
          backdrop: {
            backgroundColor: '#4299e180',
            width: '40px',
            height: '40px',
          },
          bar: {
            backgroundColor: '#4299e1',
          },
        },
      },
    ],
    position: {
      x: '0px',
      y: '980px',
    },
    vertical: true,
    gap: '2',
  },
]

const Hud = () => {
  const [stats, setStats] = useState<PlayerStats>({
    health: 100,
    armor: 0,
    stamina: 100,
    oxygen: 10,
  })
  const [editMode, setEditMode] = useState<boolean>(false)
  const [settings, setSettings] = useState<boolean>(true)
  const [groups, setGroups] = useState<group[]>(DEFAULT_GROUPS)

  useEffect(() => {
    if (editMode) {
      setSettings(!settings)
    }
  }, [editMode])

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data.action === 'toggleSettings') {
        setSettings(!settings)
        return
      }

      if (event.data.action === 'updateStats') {
        const healthPercent = Math.floor(((event.data.stats.health - 100) / 100) * 100)
        const armorPercent = Math.floor((event.data.stats.armor / 100) * 100)
        const staminaPercent = Math.floor(((100 - event.data.stats.stamina) / 100) * 100)
        const oxygenPercent = Math.floor((event.data.stats.oxygen / 100) * 100)

        setStats({
          health: healthPercent <= 0 ? 0 : healthPercent,
          armor: armorPercent,
          stamina: staminaPercent,
          oxygen: oxygenPercent,
        })
      }
    })
  }, [])

  const returnHandler = async () => {
    setEditMode(!editMode)
    setSettings(!settings)
  }

  useExitListener(async () => {
    if (!editMode) return
    await returnHandler()
  })

  const exitSettings = async () => {
    setSettings(!settings)
    await fetchNui('exitSettings')
  }

  return (
    <main
      className={`h-screen w-screen absolute overflow-hidden ${
        editMode || settings ? 'bg-black/70' : 'bg-transparent'
      }`}
    >
      {settings ? (
        <HudSettings
          editMode={editMode}
          setEditMode={setEditMode}
          exit={exitSettings}
          groups={groups}
          setGroups={setGroups}
        />
      ) : null}
      {editMode ? (
        <div className='w-full h-full absolute flex place-items-center justify-center text-neutral-600'>
          <p className='font-bold text-5xl select-none'>Edit Mode</p>
        </div>
      ) : null}
      {groups.map((group, index) => {
        return (
          <DragWrapper
            key={index}
            editMode={editMode}
            id={group.id.toString()}
            group={group}
            setGroups={setGroups}
          >
            {group.items.map((item) => {
              if (item.type === 'bar') {
                return <StatBar key={item.id} statPercent={stats[item.stat]} item={item} />
              } else if (item.type === 'circle') {
                return <StatCircle key={item.id} statPercent={stats[item.stat]} item={item} />
              }
            })}
          </DragWrapper>
        )
      })}
    </main>
  )
}

export default Hud
