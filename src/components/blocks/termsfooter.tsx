import Link from 'next/link'
import React from 'react'

function TermsFooter() {
  return (
    <div className="w-full flex items-center justify-center gap-3 text-xs">
      <div>
        <Link href="#">Terms of Use</Link>
      </div>
      <div className="border-l py-2 " />
      <div>
        <Link href="#">Privacy Policy</Link>
      </div>
    </div>
  )
}

export default TermsFooter
