
import React, { useState, useEffect } from 'react'
import { ASCIISpinner, ASCIIProgressBar } from './InteractiveASCII'

interface CareerLoadingStatesProps {
  type: 'resume' | 'matching' | 'insights'
  progress?: number
}

export const CareerLoadingStates: React.FC<CareerLoadingStatesProps> = ({ 
  type, 
  progress = 0 
}) => {
  const [messageIndex, setMessageIndex] = useState(0)

  const loadingStates = {
    resume: {
      messages: [
        "Reading your experience...",
        "Extracting key skills...",
        "Mapping career trajectory..."
      ],
      ascii: 'document-scan'
    },
    matching: {
      messages: [
        "Searching 10,000+ opportunities...",
        "Calculating compatibility scores...",
        "Finding your perfect match..."
      ],
      ascii: 'radar-sweep'
    },
    insights: {
      messages: [
        "Analyzing market trends...",
        "Comparing salary data...",
        "Generating recommendations..."
      ],
      ascii: 'data-stream'
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(i => (i + 1) % loadingStates[type].messages.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [type])

  const renderASCIIAnimation = () => {
    switch (loadingStates[type].ascii) {
      case 'document-scan':
        return <DocumentScanAnimation />
      case 'radar-sweep':
        return <RadarSweepAnimation />
      case 'data-stream':
        return <DataStreamAnimation />
      default:
        return <ASCIISpinner />
    }
  }

  return (
    <div className="career-loading-states text-center p-8">
      <div className="mb-6">
        {renderASCIIAnimation()}
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {loadingStates[type].messages[messageIndex]}
      </h3>
      
      {progress > 0 && (
        <ASCIIProgressBar 
          progress={progress} 
          label="Progress" 
          width={25}
        />
      )}
    </div>
  )
}

const DocumentScanAnimation: React.FC = () => {
  const [scanLine, setScanLine] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine(line => (line + 1) % 8)
    }, 200)
    return () => clearInterval(interval)
  }, [])

  const document = [
    '┌─────────────────┐',
    '│ █████████████   │',
    '│ █████████████   │',
    '│ ████████        │',
    '│ █████████████   │',
    '│ ████████████    │',
    '│ █████████████   │',
    '└─────────────────┘'
  ]

  return (
    <pre className="font-mono text-sm text-blue-600">
      {document.map((line, index) => (
        <div key={index} className={index === scanLine ? 'bg-blue-100' : ''}>
          {line}
        </div>
      ))}
    </pre>
  )
}

const RadarSweepAnimation: React.FC = () => {
  const [angle, setAngle] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle(a => (a + 30) % 360)
    }, 200)
    return () => clearInterval(interval)
  }, [])

  const generateRadar = () => {
    const size = 7
    const center = Math.floor(size / 2)
    const grid = Array(size).fill(null).map(() => Array(size).fill('·'))
    
    // Draw circle
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const dx = j - center
        const dy = i - center
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (Math.abs(distance - center) < 0.5) {
          grid[i][j] = '○'
        }
      }
    }
    
    // Draw sweep line
    const radians = (angle * Math.PI) / 180
    for (let r = 0; r <= center; r++) {
      const x = Math.round(center + r * Math.cos(radians))
      const y = Math.round(center + r * Math.sin(radians))
      if (x >= 0 && x < size && y >= 0 && y < size) {
        grid[y][x] = '│'
      }
    }
    
    return grid.map(row => row.join('')).join('\n')
  }

  return (
    <pre className="font-mono text-sm text-green-600">
      {generateRadar()}
    </pre>
  )
}

const DataStreamAnimation: React.FC = () => {
  const [streams, setStreams] = useState<string[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setStreams(prevStreams => {
        const newStreams = [...prevStreams]
        
        // Add new characters at top
        newStreams.unshift(
          Array(8).fill(null).map(() => 
            Math.random() > 0.7 ? ['█', '▓', '▒', '░'][Math.floor(Math.random() * 4)] : ' '
          ).join('')
        )
        
        // Remove old lines
        if (newStreams.length > 10) {
          newStreams.pop()
        }
        
        return newStreams
      })
    }, 150)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <pre className="font-mono text-xs text-blue-600">
      {streams.join('\n')}
    </pre>
  )
}
