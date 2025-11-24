import React from 'react'
import Hero from './components/hero'
import WhoWeAre from './components/whoWeAre'
import FullscreenProjectShowcase from './components/topprojects'
function page() {
  return (
    <div>
      <Hero />
      <WhoWeAre />
      <FullscreenProjectShowcase/>
    </div>
  )
}

export default page

