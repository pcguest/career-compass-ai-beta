
import React, { useState, useEffect } from 'react'

interface SkillConstellationProps {
  skills: string[]
  strength?: number[]
  connections?: Array<[number, number]>
}

export const SkillConstellation: React.FC<SkillConstellationProps> = ({
  skills,
  strength = [],
  connections = []
}) => {
  const [constellation, setConstellation] = useState<string>('')

  useEffect(() => {
    // Create a skill constellation pattern
    const grid = Array(15).fill(null).map(() => Array(60).fill(' '))
    
    // Place skills as dots/symbols
    skills.forEach((skill, index) => {
      const x = Math.floor(Math.random() * 50) + 5
      const y = Math.floor(Math.random() * 10) + 2
      const intensity = strength[index] || 0.5
      const char = intensity > 0.8 ? '@' : intensity > 0.5 ? '#' : intensity > 0.3 ? '+' : '·'
      grid[y][x] = char
    })

    // Draw connections
    connections.forEach(([from, to]) => {
      // Simple line drawing between skills
      const fromX = Math.floor(Math.random() * 50) + 5
      const fromY = Math.floor(Math.random() * 10) + 2
      const toX = Math.floor(Math.random() * 50) + 5
      const toY = Math.floor(Math.random() * 10) + 2
      
      // Basic line algorithm
      const steps = Math.max(Math.abs(toX - fromX), Math.abs(toY - fromY))
      for (let i = 0; i <= steps; i++) {
        const x = Math.floor(fromX + (toX - fromX) * (i / steps))
        const y = Math.floor(fromY + (toY - fromY) * (i / steps))
        if (y >= 0 && y < grid.length && x >= 0 && x < grid[0].length) {
          if (grid[y][x] === ' ') grid[y][x] = '·'
        }
      }
    })

    setConstellation(grid.map(row => row.join('')).join('\n'))
  }, [skills, strength, connections])

  return (
    <div className="skill-constellation">
      <pre className="font-mono text-xs text-brand-600 opacity-70">
        {constellation}
      </pre>
    </div>
  )
}

interface CareerPathFlowProps {
  currentPosition: string
  nextPositions: string[]
  futurePositions: string[]
}

export const CareerPathFlow: React.FC<CareerPathFlowProps> = ({
  currentPosition,
  nextPositions,
  futurePositions
}) => {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % 20)
    }, 200)
    return () => clearInterval(interval)
  }, [])

  const flowChar = frame % 4 === 0 ? '·' : frame % 4 === 1 ? '-' : frame % 4 === 2 ? '=' : '>'

  return (
    <div className="career-path-flow">
      <pre className="font-mono text-sm text-gray-700">
        {`   [@]${flowChar}${flowChar}${flowChar}${flowChar}${flowChar}${flowChar}${flowChar}[+]${flowChar.replace(/[=-]/g, '·')}${flowChar.replace(/[=-]/g, '·')}${flowChar.replace(/[=-]/g, '·')}[?]`}
        <br />
        {`   Now      Next      Future`}
      </pre>
    </div>
  )
}

interface SalaryASCIIProps {
  ranges: Array<{ label: string; value: number; max: number }>
}

export const SalaryASCII: React.FC<SalaryASCIIProps> = ({ ranges }) => {
  return (
    <div className="salary-ascii">
      {ranges.map((range, index) => {
        const percentage = (range.value / range.max) * 100
        const filled = Math.floor(percentage / 10)
        const bar = '#'.repeat(filled) + '·'.repeat(10 - filled)
        
        return (
          <pre key={index} className="font-mono text-sm text-gray-700 mb-1">
            {`${range.label.padEnd(6)} [${bar}] ${range.value.toLocaleString()}`}
          </pre>
        )
      })}
    </div>
  )
}

interface ASCIIIconProps {
  type: 'skill' | 'experience' | 'education' | 'achievement'
  size?: 'sm' | 'md' | 'lg'
}

export const ASCIIIcon: React.FC<ASCIIIconProps> = ({ type, size = 'md' }) => {
  const icons = {
    skill: ['  /\\  ', ' /  \\ ', '/____\\'],
    experience: ['[####]', '[####]', '[####]'],
    education: [' _____ ', '|     |', '|_____|'],
    achievement: ['  ★  ', ' ★★★ ', '★★★★★']
  }

  const sizeClass = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'

  return (
    <pre className={`font-mono ${sizeClass} text-brand-600 leading-none`}>
      {icons[type].join('\n')}
    </pre>
  )
}
