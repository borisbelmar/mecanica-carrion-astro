import React from 'react'
import SvgIso from './svgIso'
import SvgLogo from './svgLogo'

const Navbar: React.FC = () => {
  return (
    <div className="w-full p-2">
      <div className="max-w-xl flex items-center justify-center h-full py-3">
        <figure className="flex items-center">
          <SvgIso className="h-12 mr-2" />
          <SvgLogo className="h-8" />
        </figure>
      </div>
    </div>
  )
}

export default Navbar
