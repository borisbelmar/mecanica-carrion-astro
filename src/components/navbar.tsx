import React from 'react'
import SvgIso from './svgIso'
import SvgLogo from './svgLogo'

const Navbar: React.FC = () => {
  return (
    <div className="w-full px-8 py-4 bg-gray-800 text-white">
      <div className="max-w-6xl flex items-center h-full py-3 mx-auto">
        <figure className="flex items-center">
          <SvgIso className="h-12 mr-2" />
          <SvgLogo className="h-8" />
        </figure>
      </div>
    </div>
  )
}

export default Navbar
