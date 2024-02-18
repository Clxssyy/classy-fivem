interface DragWrapperProps {
  children: JSX.Element | JSX.Element[]
  editMode: boolean
  id: string
}

// TODO: change the drag and drop logic
function dragElement(elmnt: HTMLElement) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0
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
    } else if (elmnt.offsetTop - pos2 > window.innerHeight - elmnt.offsetHeight) {
      elmnt.style.top = window.innerHeight - elmnt.offsetHeight + 'px'
    } else {
      elmnt.style.top = elmnt.offsetTop - pos2 + 'px'
    }
    if (elmnt.offsetLeft - pos1 < 0) {
      elmnt.style.left = 0 + 'px'
    } else if (elmnt.offsetLeft - pos1 > window.innerWidth - elmnt.offsetWidth) {
      elmnt.style.left = window.innerWidth - elmnt.offsetWidth + 'px'
    } else {
      elmnt.style.left = elmnt.offsetLeft - pos1 + 'px'
    }
  }

  function closeDragElement() {
    document.onmouseup = null
    document.onmousemove = null
  }
}

const DragWrapper = ({ children, editMode, id }: DragWrapperProps) => {
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
    >
      <p
        className={`${editMode ? '' : 'hidden'} absolute text-blue-400 font-bold whitespace-nowrap`}
      >
        {id}
      </p>
      <div className={`flex gap-2 flex-wrap ${editMode ? 'invisible' : ''}`}>{children}</div>
    </div>
  )
}

export default DragWrapper
