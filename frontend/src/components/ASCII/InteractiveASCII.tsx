
import React, { useState, useEffect } from 'react'

interface ASCIISpinnerProps {
  size?: number
  speed?: number
}

export const ASCIISpinner: React.FC<ASCIISpinnerProps> = ({ size = 7, speed = 200 }) => {
  const [frame, setFrame] = useState(0)

  const frames = [
    ['  ·##·  ', ' #····# ', '#······#', '·······#', '#······#', ' #····# ', '  ·##·  '],
    ['  #··#  ', ' ·····# ', '#······#', '·······#', '#······#', ' #······ ', '  #··#  '],
    ['  #··#  ', ' ······ ', '·······#', '#······#', '·······#', ' ······ ', '  #··#  '],
    ['  ·##·  ', ' ····# ', '·····#', '#···#', '·····#', ' ····# ', '  ·##·  ']
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % frames.length)
    }, speed)
    return () => clearInterval(interval)
  }, [speed])

  return (
    <div className="ascii-spinner flex justify-center">
      <pre className="font-mono text-sm text-brand-600 leading-none">
        {frames[frame].join('\n')}
      </pre>
    </div>
  )
}

interface ASCIIProgressBarProps {
  progress: number
  label: string
  width?: number
}

export const ASCIIProgressBar: React.FC<ASCIIProgressBarProps> = ({ 
  progress, 
  label, 
  width = 20 
}) => {
  const filled = Math.floor((progress / 100) * width)
  const empty = width - filled
  const bar = '█'.repeat(filled) + '░'.repeat(empty)

  return (
    <div className="ascii-progress-bar">
      <pre className="font-mono text-sm text-gray-700">
        {`${label}: [${bar}] ${Math.round(progress)}%`}
      </pre>
    </div>
  )
}

interface ASCIIButtonProps {
  children: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary'
  className?: string
}

export const ASCIIButton: React.FC<ASCIIButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [rippleActive, setRippleActive] = useState(false)

  const handleClick = () => {
    setRippleActive(true)
    setTimeout(() => setRippleActive(false), 300)
    onClick()
  }

  const asciiOverlay = isHovered ? '·'.repeat(20) : ''

  return (
    <button
      className={`ascii-button relative overflow-hidden transition-all duration-200 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {children}
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <pre className="font-mono text-xs opacity-20 text-brand-600">
            {asciiOverlay}
          </pre>
        </div>
      )}
      {rippleActive && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="animate-ping">
            <pre className="font-mono text-xs text-brand-600">
              {'○'}
            </pre>
          </div>
        </div>
      )}
    </button>
  )
}

interface ASCIIMeterProps {
  value: number
  max?: number
  label?: string
  orientation?: 'horizontal' | 'vertical'
}

export const ASCIIMeter: React.FC<ASCIIMeterProps> = ({ 
  value, 
  max = 100, 
  label, 
  orientation = 'horizontal' 
}) => {
  const percentage = (value / max) * 100
  
  if (orientation === 'vertical') {
    const height = 10
    const filled = Math.floor((percentage / 100) * height)
    const meter = Array(height).fill('░').map((_, i) => 
      i >= height - filled ? '█' : '░'
    )
    
    return (
      <div className="ascii-meter-vertical">
        {label && <span className="text-xs text-gray-600">{label}</span>}
        <pre className="font-mono text-xs text-brand-600 leading-tight">
          {meter.join('\n')}
        </pre>
      </div>
    )
  }

  const width = 15
  const filled = Math.floor((percentage / 100) * width)
  const bar = '█'.repeat(filled) + '░'.repeat(width - filled)

  return (
    <div className="ascii-meter-horizontal">
      {label && <span className="text-xs text-gray-600 mr-2">{label}</span>}
      <pre className="font-mono text-xs text-brand-600 inline">
        [{bar}] {Math.round(percentage)}%
      </pre>
    </div>
  )
}
