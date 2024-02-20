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
  }
}

const StatCircle = ({ statPercent, item }: StatCircleProps) => {
  return (
    <div
      className='w-10 h-10 rounded-full overflow-hidden flex place-items-center justify-center'
      style={item.styles?.backdrop}
    >
      {
        {
          health: <HeartIcon className='w-6 h-6 absolute' />,
          armor: <GiKevlarVest className='w-6 h-6 absolute' />,
          stamina: <FaRunning className='w-6 h-6 absolute' />,
          oxygen: <RiBubbleChartFill className='w-6 h-6 absolute' />,
        }[item.stat]
      }
      <div
        style={{ height: `${statPercent}%`, ...item.styles?.bar }}
        className='w-full place-self-end'
      ></div>
    </div>
  )
}

export default StatCircle
