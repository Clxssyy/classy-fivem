interface StatBarProps {
  statPercent: number
  id: string
  styles?: {
    [key: string]: string
  }
}

const StatBar = ({ statPercent, id, styles }: StatBarProps) => {
  return (
    <div id={id + '-backdrop'} className='w-96 h-10 bg-green-400/50' style={styles}>
      <div
        id={id}
        style={{ width: `${statPercent}%` }}
        className='bg-green-400 h-full transition-all'
      ></div>
    </div>
  )
}

export default StatBar
