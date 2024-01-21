import React from 'react'

function AddModalOption({option, onClick, visibility}) {
  return (
    <button className='w-11/12 py-1 bg-slate-50 '
    hidden={!visibility}
    onClick={()=> onClick}>
       Add {option}
    </button>
  )
}

export default AddModalOption