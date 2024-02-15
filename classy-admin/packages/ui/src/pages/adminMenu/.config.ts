import { fetchNui } from '../../utils/nui'

interface Category {
  category: string
  items: MenuItem[]
}

interface MenuItem {
  name: string
  description?: string
  function: () => void
  functionOptions?: ItemOption[]
}

export interface ItemOption {
  name: string
  id: string
  toggle?: boolean
}

const cfg: { categories: Category[] } = {
  categories: [
    {
      category: 'Player',
      items: [
        {
          name: 'Kill Player',
          description: 'Kill a player.',
          function: async () => {
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
          },
          functionOptions: [
            {
              name: 'Player ID',
              id: 'player-id',
            },
          ],
        },
        {
          name: 'Give Weapon',
          description: 'Give player a weapon.',
          function: async () => {},
          functionOptions: [
            {
              name: 'Player ID',
              id: 'player-id',
            },
            {
              name: 'Weapon Name',
              id: 'weapon-name',
            },
            {
              name: 'Ammo',
              id: 'ammo',
            },
          ],
        },
        {
          name: 'God Mode',
          description: 'Enable god mode.',
          function: async () => {
            await fetchNui('godmode').then((res) => {
              console.log(JSON.stringify(res))
            })
          },
        },
        {
          name: 'No Clip',
          description: 'Enable no clip mode.',
          function: async () => {},
        },
        {
          name: 'Spawn Vehicle',
          description: 'Spawn a vehicle.',
          function: async () => {},
          functionOptions: [
            {
              name: 'Vehicle Name',
              id: 'vehicle-name',
            },
            {
              name: 'In Vehicle',
              id: 'in-vehicle',
              toggle: true,
            },
          ],
        },
        {
          name: 'Teleport',
          description: 'Teleport to a location.',
          function: async () => {},
          functionOptions: [
            {
              name: 'X',
              id: 'x',
            },
            {
              name: 'Y',
              id: 'y',
            },
            {
              name: 'Z',
              id: 'z',
            },
            {
              name: 'Waypoint',
              id: 'waypoint',
              toggle: true,
            },
          ],
        },
      ],
    },
    {
      category: 'Server',
      items: [
        {
          name: 'Kick Player',
          description: 'Kick a player.',
          function: async () => {},
          functionOptions: [
            {
              name: 'Player ID',
              id: 'player-id',
            },
          ],
        },
        {
          name: 'Ban Player',
          description: 'Ban a player.',
          function: async () => {},
          functionOptions: [
            {
              name: 'Player ID',
              id: 'player-id',
            },
            {
              name: 'Reason',
              id: 'reason',
            },
            {
              name: 'Duration',
              id: 'duration',
            },
          ],
        },
        {
          name: 'Announce',
          description: 'Send an announcement.',
          function: async () => {},
          functionOptions: [
            {
              name: 'Message',
              id: 'message',
            },
          ],
        },
        {
          name: 'Set Weather',
          description: 'Set the weather.',
          function: async () => {},
          functionOptions: [
            {
              name: 'Weather',
              id: 'weather',
            },
          ],
        },
        {
          name: 'Set Time',
          description: 'Set the time.',
          function: async () => {},
          functionOptions: [
            {
              name: 'Time',
              id: 'time',
            },
          ],
        },
      ],
    },
    {
      category: 'Inventory',
      items: [
        {
          name: 'Give Item',
          description: 'Give a player an item.',
          function: async () => {},
          functionOptions: [
            {
              name: 'Player ID',
              id: 'player-id',
            },
            {
              name: 'Item Name',
              id: 'item-name',
            },
            {
              name: 'Amount',
              id: 'amount',
            },
          ],
        },
        {
          name: 'Remove Item',
          description: 'Remove an item from a player.',
          function: async () => {},
          functionOptions: [
            {
              name: 'Player ID',
              id: 'player-id',
            },
            {
              name: 'Item Name',
              id: 'item-name',
            },
            {
              name: 'Amount',
              id: 'amount',
            },
          ],
        },
      ],
    },
    {
      category: 'Misc',
      items: [
        {
          name: 'Close Menu',
          description: 'Close the menu.',
          function: close,
        },
      ],
    },
  ],
}

export default cfg
