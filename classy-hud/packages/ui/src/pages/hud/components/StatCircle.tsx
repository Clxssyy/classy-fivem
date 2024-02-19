import { HeartIcon } from '@heroicons/react/24/solid'

interface StatCircleProps {
  statPercent: number
  id: string
}

const StatCircle = ({ statPercent, id }: StatCircleProps) => {
  return (
    <div
      id={id + '-backdrop'}
      className='w-10 h-10 rounded-full overflow-hidden bg-green-400/50 flex place-items-center justify-center'
    >
      <HeartIcon className='w-6 h-6 absolute' />
      <div
        id={id}
        style={{ height: `${statPercent}%` }}
        className='bg-green-400 w-full place-self-end'
      ></div>
    </div>
  )
}

export default StatCircle
