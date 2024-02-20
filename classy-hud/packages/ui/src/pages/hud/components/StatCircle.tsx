import { HeartIcon } from '@heroicons/react/24/solid'
import { GiKevlarVest } from 'react-icons/gi'
import { FaRunning } from 'react-icons/fa'
import { RiBubbleChartFill } from 'react-icons/ri'

interface StatCircleProps {
  statPercent: number
  item: {
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
}

const StatCircle = ({ statPercent, item }: StatCircleProps) => {
  return (
    <div className='flex place-items-center justify-center'>
      {
        {
          health: <HeartIcon className='w-6 h-6 absolute' />,
          armor: <GiKevlarVest className='w-6 h-6 absolute' />,
          stamina: <FaRunning className='w-6 h-6 absolute' />,
          oxygen: <RiBubbleChartFill className='w-6 h-6 absolute' />,
        }[item.stat]
      }
      <div className='rounded-full overflow-hidden flex' style={item.styles.backdrop}>
        <div
          style={{
            ...(item.statDirection === 'r-l'
              ? { width: `${statPercent}%` }
              : { height: `${statPercent}%` }),
            ...item.styles.bar,
          }}
          className={`${
            item.statDirection === 'r-l' ? 'h-full' : 'w-full place-self-end'
          } transition-all`}
        ></div>
      </div>
    </div>
  )
}

export default StatCircle
