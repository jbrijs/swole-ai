import React from 'react'

function AddModalOption({option, onClick, visibility, style}) {
  return (
    <button className= {`w-full bg-slate-50 ${style}`}
    hidden={!visibility}
    onClick={()=> onClick}>
       Add {option}
    </button>
  )
}

export default AddModalOption