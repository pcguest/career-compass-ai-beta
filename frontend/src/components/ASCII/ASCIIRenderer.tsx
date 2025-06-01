
import React, { useRef, useEffect, useState } from 'react'

// Character set for subtle gradients (like the Street View example)
const ASCII_GRADIENT = ' ·-:;=+x#%@'

interface ASCIIRendererProps {
  source: 'camera' | 'image' | 'canvas' | 'data'
  density: number // 40-120 characters per line
  theme: 'light' | 'dark' | 'amber' | 'blue'
  interactive: boolean
  flowSpeed?: number // For animated transitions
  className?: string
  children?: React.ReactNode
}

const ASCIIRenderer: React.FC<ASCIIRendererProps> = ({
  source,
  density = 80,
  theme = 'light',
  interactive = false,
  flowSpeed = 1,
  className = '',
  children
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [asciiOutput, setAsciiOutput] = useState<string>('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const getThemeColors = () => {
    switch (theme) {
      case 'dark':
        return { bg: 'bg-gray-900', text: 'text-gray-100', accent: 'text-blue-400' }
      case 'amber':
        return { bg: 'bg-amber-50', text: 'text-amber-900', accent: 'text-amber-600' }
      case 'blue':
        return { bg: 'bg-blue-50', text: 'text-blue-900', accent: 'text-blue-600' }
      default:
        return { bg: 'bg-gray-50', text: 'text-gray-700', accent: 'text-brand-600' }
    }
  }

  const pixelToASCII = (brightness: number) => {
    const index = Math.floor((brightness / 255) * (ASCII_GRADIENT.length - 1))
    return ASCII_GRADIENT[index]
  }

  const generateDataVisualization = (data: any) => {
    // Generate ASCII based on data patterns
    const lines = []
    for (let i = 0; i < 20; i++) {
      let line = ''
      for (let j = 0; j < density; j++) {
        const intensity = Math.sin((i + j) * 0.1) * 0.5 + 0.5
        const charIndex = Math.floor(intensity * (ASCII_GRADIENT.length - 1))
        line += ASCII_GRADIENT[charIndex]
      }
      lines.push(line)
    }
    return lines.join('\n')
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    })
  }

  useEffect(() => {
    if (source === 'data') {
      setAsciiOutput(generateDataVisualization({}))
    }
  }, [source, density])

  const colors = getThemeColors()

  return (
    <div 
      className={`ascii-container ${colors.bg} ${colors.text} ${className}`}
      onMouseMove={handleMouseMove}
    >
      <canvas ref={canvasRef} className="hidden" />
      <pre 
        className={`font-mono antialiased leading-none text-xs overflow-hidden ${
          interactive ? 'cursor-crosshair' : ''
        }`}
        style={{
          letterSpacing: '0.1em',
          lineHeight: 1,
          filter: interactive ? `hue-rotate(${mousePosition.x}deg)` : 'none',
          transition: 'filter 0.1s ease'
        }}
      >
        {asciiOutput}
      </pre>
      {children}
    </div>
  )
}

export default ASCIIRenderer
