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

export interface group {
  id: number
  name: string
  items: {
    id: number
    type: string
    name: string
    stat: string
    styles?: {
      backdrop?: {
        backgroundColor?: string
        width?: string
        height?: string
      }
      bar?: {
        backgroundColor: string
      }
    }
  }[]
  position: {
    x: string
    y: string
  }
  vertical: boolean
  gap: string
}

const exmapleSettings = {
  groups: [
    {
      id: 0,
      name: 'default',
      items: [
        {
          type: 'bar',
          id: 0,
          name: 'health',
          stat: 'health',
          styles: {
            backdrop: {
              backgroundColor: '#ff000080',
              width: '96px',
              height: '10px',
            },
            bar: {
              backgroundColor: '#00ff00',
            },
          },
        },
        {
          type: 'bar',
          id: 1,
          name: 'armor',
          stat: 'armor',
          styles: {
            backdrop: {
              backgroundColor: '#ff000080',
              width: '96px',
              height: '10px',
            },
            bar: {
              backgroundColor: '#00ff00',
            },
          },
        },
        {
          type: 'bar',
          id: 2,
          name: 'stamina',
          stat: 'stamina',
          styles: {
            backdrop: {
              backgroundColor: '#ff000080',
              width: '96px',
              height: '10px',
            },
            bar: {
              backgroundColor: '#00ff00',
            },
          },
        },
        {
          type: 'bar',
          id: 3,
          name: 'oxygen',
          stat: 'health',
          styles: {
            backdrop: {
              backgroundColor: '#ff000080',
              width: '96px',
              height: '10px',
            },
            bar: {
              backgroundColor: '#00ff00',
            },
          },
        },
      ],
      position: {
        x: '200',
        y: '300',
      },
      vertical: true,
      gap: '8',
    },
    {
      id: 1,
      name: 'test',
      items: [
        {
          type: 'bar',
          id: 0,
          stat: 'health',
          name: 'health',
          styles: {
            backdrop: {
              backgroundColor: '#ff000080',
              width: '96px',
              height: '10px',
            },
            bar: {
              backgroundColor: '#00ff00',
            },
          },
        },
        {
          type: 'bar',
          id: 1,
          stat: 'armor',
          name: 'armor',
          styles: {
            backdrop: {
              backgroundColor: '#ff000080',
              width: '96px',
              height: '10px',
            },
            bar: {
              backgroundColor: '#00ff00',
            },
          },
        },
        {
          type: 'bar',
          id: 2,
          stat: 'stamina',
          name: 'stamina',
          styles: {
            backdrop: {
              backgroundColor: '#ff000080',
              width: '96px',
              height: '10px',
            },
            bar: {
              backgroundColor: '#00ff00',
            },
          },
        },
      ],
      position: {
        x: '0',
        y: '0',
      },
      vertical: false,
      gap: '8',
    },
  ],
}

const Hud = () => {
  const [stats, setStats] = useState<PlayerStats>({
    health: 100,
    armor: 0,
    stamina: 100,
    oxygen: 10,
  })
  const [editMode, setEditMode] = useState<boolean>(false)
  const [settings, setSettings] = useState<boolean>(true)
  const [groups, setGroups] = useState<group[]>([])

  useEffect(() => {
    if (editMode) {
      setSettings(!settings)
    }
  }, [editMode])

  useEffect(() => {
    setGroups(exmapleSettings.groups as group[])

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
      className={`h-screen w-screen absolute ${
        editMode || settings ? 'bg-black/70' : 'bg-black/0'
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
          <DragWrapper key={index} editMode={editMode} id={group.name} group={group}>
            {group.items.map((item, index) => {
              if (item.type === 'bar') {
                return (
                  <StatBar
                    key={index}
                    statPercent={stats[item.stat]}
                    id={item.id + '-bar'}
                    styles={item.styles}
                  />
                )
              } else if (item.type === 'circle') {
                return (
                  <StatCircle key={index} statPercent={stats[item.stat]} id={item.id + '-circle'} />
                )
              }
            })}
          </DragWrapper>
        )
      })}
    </main>
  )
}

export default Hud
