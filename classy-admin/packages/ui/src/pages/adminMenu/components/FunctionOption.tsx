const FunctionOption = (props: { name: string; id: string; toggle?: boolean }) => {
  const { name, id, toggle } = props

  return (
    <>
      {toggle ? (
        <div className='flex place-items-center gap-2 group-hover/menu:text-neutral-400 text-neutral-400/50'>
          <label htmlFor={id}>{name}</label>
          <input type='checkbox' id={id} name={id} />
        </div>
      ) : (
        <input
          type='text'
          id={id}
          placeholder={name}
          className='p-2 rounded shadow-md bg-white/50 group-hover/menu:bg-white'
        />
      )}
    </>
  )
}

export default FunctionOption
