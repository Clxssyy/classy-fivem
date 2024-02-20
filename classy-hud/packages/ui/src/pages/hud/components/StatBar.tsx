interface StatBarProps {
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

const StatBar = ({ statPercent, item }: StatBarProps) => {
  return (
    <div className='flex' style={item.styles.backdrop}>
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
  )
}

export default StatBar
