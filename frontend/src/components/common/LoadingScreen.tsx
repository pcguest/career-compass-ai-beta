import { Compass } from 'lucide-react'

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <Compass className="h-12 w-12 text-primary-600 animate-pulse-slow" />
        <h1 className="mt-4 text-xl font-semibold text-gray-900">Loading</h1>
        <div className="mt-4 flex space-x-2">
          <div className="h-2 w-2 rounded-full bg-primary-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="h-2 w-2 rounded-full bg-primary-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="h-2 w-2 rounded-full bg-primary-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen