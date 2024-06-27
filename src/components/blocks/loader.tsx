import React from 'react'

function Loader() {
  return (
    <div className="flex h-full items-center justify-center dark:invert">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-[#000] border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
    </div>
  )
}

export default Loader
