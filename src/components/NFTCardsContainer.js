import React from 'react'
import NFTCard from './NFTCard'


function NFTCardsContainer({kbirds}) {


    const kBirdCards = kbirds && kbirds[0] && kbirds.map( (kbird, index) =>{
        return (
            <NFTCard key={index} kbird={kbird} kbirdIndex={index} />
        )
    })
  return (
    <div className="d-flex flex-sm-row flex-md-row flex-lg-row flex-wrap justify-content-around">
        {kBirdCards}
    </div>
  )
}

export default NFTCardsContainer