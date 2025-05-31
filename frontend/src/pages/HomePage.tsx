import { ArrowRight, Check, Compass, Sparkles, Target, Users, Brain, FileText, CheckCircle, Search, TrendingUp, Award, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SearchFilters } from '../components/common/SearchFilters'

const HomePage = () => {
  const stats = [
    { number: '10K+', label: 'Jobs Analyzed' },
    { number: '95%', label: 'Success Rate' },
    { number: '5K+', label: 'Happy Users' },
    { number: '500+', label: 'Companies' }
  ]

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced AI evaluates your resume against job requirements and provides actionable insights.'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Track your progress and get personalized recommendations for career advancement.'
    },
    {
      icon: Award,
      title: 'Success Guarantee',
      description: 'Our proven methodology has helped thousands land their dream jobs.'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get detailed feedback and improvement suggestions in seconds, not days.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-50 via-primary-50 to-secondary-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2523f1f5f9%22%20fill-opacity%3D%220.4%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div></div>

        <div className="container-content relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 text-brand-700 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                AI-Powered Career Intelligence
              </span>
              <h1 className="text-display-2xl text-gray-900 leading-tight mb-6">
                Land Your Dream Job with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-primary-600">
                  AI-Powered
                </span>{' '}
                Career Guidance
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Get personalized feedback on your job applications, optimize your resume with AI insights, 
                and discover opportunities that perfectly match your skills and career goals.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/job-analysis" className="btn-brand text-lg px-8 py-4 shadow-lg">
                Start Free Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/about" className="btn-outline text-lg px-8 py-4">
                Watch Demo
              </Link>
            </div>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <SearchFilters />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-content">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="stats-card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="stats-number">{stat.number}</div>
                <div className="stats-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-content">
          <div className="section-header">
            <h2 className="section-title">
              Why Choose CareerCompassAI?
            </h2>
            <p className="section-subtitle">
              Our AI-powered platform provides comprehensive insights and tools to accelerate your career success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div 
                  key={index} 
                  className="feature-card animate-scale-in group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="feature-icon group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-full h-full" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Feature Highlight */}
          <div className="mt-20 bg-gradient-to-r from-brand-600 to-primary-600 rounded-2xl p-12 text-center text-white">
            <h3 className="text-display-md mb-4">Ready to Transform Your Career?</h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of successful job seekers who have accelerated their career growth with our AI-powered insights.
            </p>
            <Link to="/job-analysis" className="inline-flex items-center gap-2 bg-white text-brand-600 px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-content">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">
              Our platform makes it easy to get valuable insights about your job applications in just a few steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-6">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container-content">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">
              Join thousands of job seekers who have improved their career prospects with CareerCompassAI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 text-white py-20">
        <div className="container-content">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Advance Your Career?</h2>
            <p className="text-xl text-primary-200 mb-8">
              Join thousands of professionals who have transformed their job search with AI-powered insights.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/register" 
                className="px-8 py-4 bg-white text-primary-700 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Get Started Free
              </Link>
              <Link 
                to="/pricing" 
                className="px-8 py-4 bg-primary-800 text-white rounded-md font-medium hover:bg-primary-700 transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Data
const steps = [
  {
    title: "Upload Your Resume",
    description: "Upload your resume and we'll analyze it to understand your skills, experience, and career trajectory."
  },
  {
    title: "Add Job Descriptions",
    description: "Paste job descriptions you're interested in or connect to job boards to automatically import listings."
  },
  {
    title: "Get AI-Powered Insights",
    description: "Receive detailed analysis, match scores, and specific recommendations to improve your application."
  }
]

const testimonials = [
  {
    text: "CareerCompassAI helped me identify gaps in my resume that were holding me back. After making the suggested changes, I started getting more interview calls!",
    name: "Sarah Johnson",
    position: "Marketing Manager",
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    text: "The job fit analysis feature saved me hours of time. Instead of applying to dozens of positions, I focused on the ones where I had a high match score and landed my dream job.",
    name: "Michael Chen",
    position: "Software Engineer",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    text: "The interview questions generated by CareerCompassAI were incredibly accurate. Many were asked in my actual interviews, and I was well-prepared thanks to this platform.",
    name: "Alex Rivera",
    position: "Product Manager",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300"
  }
]

export default HomePage