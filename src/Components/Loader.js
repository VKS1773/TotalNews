import React from 'react'
import Spinner from './Spinner.gif'

export default function Loader() {
  return (
    <div className="text-center my-3">
      <img src={Spinner} alt="Loading..." />
    </div>
  )
}
