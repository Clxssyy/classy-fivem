interface StatBarProps {
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

const StatBar = ({ statPercent, item }: StatBarProps) => {
  return (
    <div className='w-96 h-10 bg-green-400/50' style={item.styles?.backdrop}>
      <div
        style={{ width: `${statPercent}%`, ...item.styles?.bar }}
        className='bg-green-400 h-full transition-all'
      ></div>
    </div>
  )
}

export default StatBar
