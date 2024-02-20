import { useEffect } from 'react'
import { group } from '../Hud'

interface DragWrapperProps {
  children: JSX.Element | JSX.Element[] | any
  editMode: boolean
  id: string
  group: group
  setGroups: React.Dispatch<React.SetStateAction<group[]>>
}

const DragWrapper = ({ children, editMode, id, group, setGroups }: DragWrapperProps) => {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0

  let newXPos: string
  let newYPos: string

  function dragElement(elmnt: HTMLElement) {
    if (document.getElementById(elmnt.id)) {
      const element = document.getElementById(elmnt.id)
      if (element) {
        element.onmousedown = dragMouseDown
      }
    } else {
      elmnt.onmousedown = dragMouseDown
    }

    function dragMouseDown(e: MouseEvent) {
      e.preventDefault()

      pos3 = e.clientX
      pos4 = e.clientY

      document.onmouseup = closeDragElement
      document.onmousemove = elementDrag
    }

    function elementDrag(e: MouseEvent) {
      e.preventDefault()

      pos1 = pos3 - e.clientX
      pos2 = pos4 - e.clientY
      pos3 = e.clientX
      pos4 = e.clientY

      if (elmnt.offsetTop - pos2 < 0) {
        elmnt.style.top = 0 + 'px'
        newYPos = '0px'
      } else if (elmnt.offsetTop - pos2 > window.innerHeight - elmnt.offsetHeight) {
        elmnt.style.top = window.innerHeight - elmnt.offsetHeight + 'px'
        newYPos = window.innerHeight - elmnt.offsetHeight + ' px'
      } else {
        elmnt.style.top = elmnt.offsetTop - pos2 + 'px'
        newYPos = elmnt.offsetTop - pos2 + 'px'
      }
      if (elmnt.offsetLeft - pos1 < 0) {
        elmnt.style.left = 0 + 'px'
        newXPos = '0px'
      } else if (elmnt.offsetLeft - pos1 > window.innerWidth - elmnt.offsetWidth) {
        elmnt.style.left = window.innerWidth - elmnt.offsetWidth + 'px'
        newXPos = window.innerWidth - elmnt.offsetWidth + 'px'
      } else {
        elmnt.style.left = elmnt.offsetLeft - pos1 + 'px'
        newXPos = elmnt.offsetLeft - pos1 + 'px'
      }
    }

    function closeDragElement() {
      document.onmouseup = null
      document.onmousemove = null

      setGroups((prevGroups) => {
        return prevGroups.map((prevGroup) => {
          if (prevGroup.id === group.id) {
            return {
              ...prevGroup,
              position: {
                x: newXPos,
                y: newYPos,
              },
            }
          } else {
            return prevGroup
          }
        })
      })
    }
  }

  const element = document.getElementById(id)

  if (element) {
    if (editMode) dragElement(element)
    else element.onmousedown = null
  }

  return (
    <div
      id={id}
      className={`${
        editMode ? 'bg-blue-400/50 border-2 border-dashed border-blue-700 cursor-grab' : ''
      } select-none absolute grid place-items-center text-center`}
      style={{ top: group.position.y, left: group.position.x }}
    >
      <p
        className={`${editMode ? '' : 'hidden'} absolute text-blue-400 font-bold whitespace-nowrap`}
      >
        {id}
      </p>
      <div
        className={`flex gap-2 flex-wrap ${editMode ? 'invisible' : ''} ${
          group.vertical ? 'flex-col' : ''
        }`}
        style={{ gap: group.gap + 'px' }}
      >
        {children}
      </div>
    </div>
  )
}

export default DragWrapper
