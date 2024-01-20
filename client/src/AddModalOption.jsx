import React from 'react'

function AddModalOption({option, onClick}) {
  return (
    <button className='w-full bg-slate-50 border-2 border-black'
    onClick={()=> onClick}>
       Add {option}
    </button>
  )
}

export default AddModalOption