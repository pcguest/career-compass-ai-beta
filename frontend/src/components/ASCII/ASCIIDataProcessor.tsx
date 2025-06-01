
import React, { useState, useEffect } from 'react'

interface ASCIIDataProcessorProps {
  data: any
  visualization: 'flow' | 'grid' | 'wave' | 'typewriter'
  onProcess?: (stage: string) => void
  stages?: string[]
}

export const ASCIIDataProcessor: React.FC<ASCIIDataProcessorProps> = ({
  data,
  visualization,
  onProcess,
  stages = ['Reading', 'Processing', 'Analyzing', 'Complete']
}) => {
  const [currentStage, setCurrentStage] = useState(0)
  const [frame, setFrame] = useState(0)
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => f + 1)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (currentStage < stages.length) {
      onProcess?.(stages[currentStage])
      
      const timer = setTimeout(() => {
        setCurrentStage(s => s + 1)
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [currentStage, stages, onProcess])

  const generateFlowVisualization = () => {
    const lines = []
    const chars = ['·', '-', '=', '#']
    
    for (let i = 0; i < 8; i++) {
      let line = ''
      for (let j = 0; j < 40; j++) {
        const waveOffset = Math.sin((frame + j) * 0.1) * 2
        const intensity = Math.max(0, Math.sin((frame + j - i * 5) * 0.2))
        const charIndex = Math.floor(intensity * (chars.length - 1))
        line += chars[charIndex] || ' '
      }
      lines.push(line)
    }
    
    return lines.join('\n')
  }

  const generateTypewriterEffect = () => {
    const text = stages[currentStage] || 'Complete'
    const revealLength = Math.min(text.length, Math.floor(frame / 3))
    return text.substring(0, revealLength) + (frame % 6 < 3 ? '_' : ' ')
  }

  const renderVisualization = () => {
    switch (visualization) {
      case 'flow':
        return generateFlowVisualization()
      case 'typewriter':
        return generateTypewriterEffect()
      case 'wave':
        return Array(6).fill(null).map((_, i) => {
          const wave = Array(30).fill(null).map((_, j) => {
            const amplitude = Math.sin((frame + j) * 0.2 + i * 0.5) * 3 + 3
            return i === Math.floor(amplitude) ? '~' : ' '
          }).join('')
          return wave
        }).join('\n')
      default:
        return 'Processing...'
    }
  }

  return (
    <div className="ascii-data-processor bg-gray-50 rounded-lg p-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {stages[currentStage] || 'Complete'}
        </h3>
      </div>
      
      <div className="bg-gray-900 rounded p-4">
        <pre className="font-mono text-green-400 text-xs leading-tight overflow-hidden">
          {renderVisualization()}
        </pre>
      </div>
      
      <div className="mt-4 flex justify-center">
        <div className="flex space-x-1">
          {stages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index < currentStage 
                  ? 'bg-green-500' 
                  : index === currentStage 
                    ? 'bg-blue-500 animate-pulse' 
                    : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
