interface StatBarProps {
  statPercent: number
  id: string
}

const StatBar = ({ statPercent, id }: StatBarProps) => {
  return (
    <div id={id + '-backdrop'} className='w-96 h-10 bg-green-400/50'>
      <div
        id={id}
        style={{ width: `${statPercent}%` }}
        className='bg-green-400 h-full transition-all'
      ></div>
    </div>
  )
}

export default StatBar
