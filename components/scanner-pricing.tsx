"use client"

import type React from "react"

type ScannerPricingProps = {}

const ScannerPricing: React.FC<ScannerPricingProps> = () => {
  return (
    <div>
      <h2>Scanner Pricing</h2>
      <p>Explore our scanner pricing options below.</p>

      <button
        onClick={() => {
          window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
        }}
      >
        Ver as nossas ofertas
      </button>

      <button
        onClick={() => {
          // Replace this with the actual behavior of "Ver apresentação" button
          alert("Ver apresentação button clicked!")
        }}
      >
        Ver apresentação
      </button>
    </div>
  )
}

export default ScannerPricing
