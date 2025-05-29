import { ArrowRight, Check, Compass, Sparkles, Target, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-content py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Navigate Your Career Journey with AI-Powered Guidance
              </h1>
              <p className="text-xl text-primary-100 max-w-lg">
                Get personalized insights on your resume, job applications, and interview preparation with advanced AI analysis.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link 
                  to="/register" 
                  className="px-6 py-3 bg-white text-primary-700 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  Get Started Free
                </Link>
                <Link 
                  to="/about" 
                  className="px-6 py-3 bg-primary-700 text-white rounded-md font-medium hover:bg-primary-800 transition-colors flex items-center"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-white rounded-lg shadow-xl overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Career Compass Dashboard" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-6">
                    <p className="text-white font-medium">AI-Powered Job Analysis Dashboard</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-accent-500 rounded-full opacity-20 blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container-content">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Career Guidance</h2>
            <p className="text-xl text-gray-600">
              CareerCompassAI uses advanced artificial intelligence to analyze your career materials and provide actionable insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8 border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all"
              >
                <div className="bg-primary-100 rounded-lg w-12 h-12 flex items-center justify-center text-primary-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
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
const features = [
  {
    title: "AI Resume Analysis",
    description: "Get detailed feedback on your resume with AI-powered analysis that highlights strengths and improvement areas.",
    icon: <Sparkles className="h-6 w-6" />
  },
  {
    title: "Job Fit Evaluation",
    description: "See how well your skills and experience match job descriptions with our sophisticated matching algorithm.",
    icon: <Target className="h-6 w-6" />
  },
  {
    title: "Interview Preparation",
    description: "Prepare for interviews with AI-generated questions based on the job description and your experience.",
    icon: <Users className="h-6 w-6" />
  },
  {
    title: "Career Path Guidance",
    description: "Receive personalized recommendations for skills to develop based on your career goals.",
    icon: <Compass className="h-6 w-6" />
  },
  {
    title: "Application Tracking",
    description: "Keep track of all your job applications and their status in one organized dashboard.",
    icon: <Check className="h-6 w-6" />
  },
  {
    title: "Salary Insights",
    description: "Get data-driven salary insights for your industry, location, and experience level.",
    icon: <Sparkles className="h-6 w-6" />
  }
]

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