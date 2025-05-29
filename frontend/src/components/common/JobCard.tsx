
import { MapPin, Clock, Briefcase, DollarSign, Heart } from 'lucide-react'
import { useState } from 'react'

interface JobCardProps {
  job: {
    id: string
    title: string
    company: string
    location: string
    type: string
    salary?: string
    description: string
    tags: string[]
    postedAt: string
    logo?: string
  }
  onClick?: (jobId: string) => void
}

export const JobCard = ({ job, onClick }: JobCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false)

  return (
    <div 
      className="job-card group"
      onClick={() => onClick?.(job.id)}
    >
      <div className="job-card-header">
        <div className="flex items-start gap-4">
          {job.logo ? (
            <img 
              src={job.logo} 
              alt={`${job.company} logo`}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="job-card-title group-hover:text-brand-600">
              {job.title}
            </h3>
            <p className="job-card-company">{job.company}</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsFavorited(!isFavorited)
          }}
          className={`p-2 rounded-full transition-colors ${
            isFavorited 
              ? 'text-red-500 hover:text-red-600' 
              : 'text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart 
            className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} 
          />
        </button>
      </div>

      <div className="job-card-meta">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{job.type}</span>
        </div>
        {job.salary && (
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{job.salary}</span>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-600 line-clamp-2">
        {job.description}
      </p>

      <div className="job-card-tags">
        {job.tags.slice(0, 4).map((tag, index) => (
          <span key={index} className="tag-primary">
            {tag}
          </span>
        ))}
        {job.tags.length > 4 && (
          <span className="tag">+{job.tags.length - 4} more</span>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-500">{job.postedAt}</span>
        <button className="btn-brand text-sm px-4 py-2">
          Apply Now
        </button>
      </div>
    </div>
  )
}
