
import { Search, MapPin, Briefcase, DollarSign, Filter } from 'lucide-react'
import { useState } from 'react'

interface SearchFiltersProps {
  onSearch?: (query: string) => void
  onFilterChange?: (filters: SearchFilters) => void
}

interface SearchFilters {
  location: string
  jobType: string
  salaryRange: string
  experience: string
}

export const SearchFilters = ({ onSearch, onFilterChange }: SearchFiltersProps) => {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    jobType: '',
    salaryRange: '',
    experience: ''
  })
  const [showFilters, setShowFilters] = useState(false)

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Internship']
  const salaryRanges = ['$0-50k', '$50k-100k', '$100k-150k', '$150k+']
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive']

  const handleSearch = () => {
    onSearch?.(query)
  }

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  return (
    <div className="space-y-6">
      {/* Main Search Bar */}
      <div className="search-bar max-w-2xl mx-auto">
        <div className="flex items-center px-4">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search jobs, companies, or keywords..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="search-input"
        />
        <button 
          onClick={handleSearch}
          className="search-button"
        >
          Search
        </button>
      </div>

      {/* Quick Filters */}
      <div className="flex items-center justify-center gap-4">
        <div className="filter-pills">
          {jobTypes.slice(0, 4).map((type) => (
            <button
              key={type}
              onClick={() => handleFilterChange('jobType', type)}
              className={
                filters.jobType === type ? 'filter-pill-active' : 'filter-pill'
              }
            >
              {type}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn-ghost flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          More Filters
        </button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="animate-slide-down bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="input-group">
              <label className="input-label">
                <MapPin className="w-4 h-4 inline mr-2" />
                Location
              </label>
              <input
                type="text"
                placeholder="City, state, or remote"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Salary Range
              </label>
              <select
                value={filters.salaryRange}
                onChange={(e) => handleFilterChange('salaryRange', e.target.value)}
                className="input-field"
              >
                <option value="">Any salary</option>
                {salaryRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">
                <Briefcase className="w-4 h-4 inline mr-2" />
                Experience Level
              </label>
              <select
                value={filters.experience}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
                className="input-field"
              >
                <option value="">Any level</option>
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
