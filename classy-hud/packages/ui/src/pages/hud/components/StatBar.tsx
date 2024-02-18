interface StatBarProps {
  text?: string
  statPercent: number
}

const StatBar = ({ statPercent }: StatBarProps) => {
  return (
    <div className='w-96 h-10 bg-green-400/50'>
      <div style={{ width: `${statPercent}%` }} className='bg-green-400 h-full'></div>
    </div>
  )
}

export default StatBar
