import React from 'react'
import { useLocation } from 'react-router-dom'

function NewPlan() {
    const location = useLocation();
    const {numWeeks, daysPerWeek, exercisesPerDay} = location.state;
  return (
    <>
        <div>{numWeeks}</div>
        <div>{daysPerWeek}</div>
        <div>{exercisesPerDay}</div>
    </>
  )
}

export default NewPlan