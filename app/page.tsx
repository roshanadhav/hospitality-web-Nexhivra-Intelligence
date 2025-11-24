import React from 'react'
import Hero from './components/hero'
import WhoWeAre from './components/whoWeAre'
import FullscreenProjectShowcase from './components/topprojects'
import LuxuryFooter from './components/footer'
function page() {
  return (
    <div>
      <Hero />
      <WhoWeAre />
      <FullscreenProjectShowcase/>
      {/* <LuxuryFooter /> */}
    </div>
  )
}

export default page

