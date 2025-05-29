import { motion } from 'framer-motion'
import { Compass, BarChart, Award, Users, Lightbulb, Code } from 'lucide-react'

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-24">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About CareerCompassAI</h1>
            <p className="text-xl text-primary-100">
              We're on a mission to transform career guidance with AI technology, helping job seekers navigate their career journey with confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6">
                CareerCompassAI was founded in 2023 by a team of professionals who experienced firsthand the challenges of navigating the modern job market. We recognized that while technology was transforming many aspects of our lives, career guidance remained largely traditional and subjective.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our founding team—with backgrounds in AI, HR, and career coaching—came together with a shared vision: to leverage artificial intelligence to provide personalized, data-driven career guidance that empowers job seekers to make informed decisions.
              </p>
              <p className="text-lg text-gray-700">
                Today, CareerCompassAI serves thousands of professionals across various industries, helping them navigate their career journeys with confidence and clarity.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Our team at work" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -z-10 bottom-0 right-0 w-64 h-64 bg-primary-100 rounded-full opacity-50 -mb-12 -mr-12"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission and Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-content">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission & Values</h2>
            <p className="text-xl text-gray-600">
              We're guided by a clear mission and strong values that shape everything we do.
            </p>
          </div>

          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-10 shadow-md border border-gray-100 text-center max-w-3xl mx-auto"
            >
              <Compass className="h-16 w-16 text-primary-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg text-gray-700">
                To democratize career guidance by providing AI-powered insights that help people make informed career decisions, regardless of their background or resources.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="bg-primary-100 rounded-lg w-12 h-12 flex items-center justify-center text-primary-600 mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container-content">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              We're a diverse team of experts in AI, career development, and technology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl overflow-hidden text-center hover:shadow-md transition-all"
              >
                <img 
                  src={member.photo} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary-600 mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Technology</h2>
              <p className="text-lg text-gray-700 mb-6">
                At the heart of CareerCompassAI is our proprietary machine learning technology that analyzes resumes, job descriptions, and career paths to provide personalized insights.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our algorithms are trained on millions of data points from various industries, job levels, and geographical regions, allowing us to provide accurate and relevant guidance to professionals at any stage of their career.
              </p>
              <p className="text-lg text-gray-700">
                We continuously refine our models based on user feedback and market trends to ensure that our recommendations remain cutting-edge and effective.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative order-1 lg:order-2"
            >
              <img 
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Our technology" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -z-10 top-0 left-0 w-64 h-64 bg-accent-100 rounded-full opacity-50 -mt-12 -ml-12"></div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Data
const values = [
  {
    title: "Innovation",
    description: "We constantly push boundaries to create cutting-edge solutions that transform career guidance.",
    icon: <Lightbulb className="h-6 w-6" />
  },
  {
    title: "Empowerment",
    description: "We believe in giving people the tools and knowledge they need to take control of their career journey.",
    icon: <Award className="h-6 w-6" />
  },
  {
    title: "Inclusion",
    description: "We're committed to making career guidance accessible to people from all backgrounds and walks of life.",
    icon: <Users className="h-6 w-6" />
  },
  {
    title: "Data-Driven",
    description: "We base our guidance on comprehensive data and analysis, not assumptions or outdated practices.",
    icon: <BarChart className="h-6 w-6" />
  },
  {
    title: "Transparency",
    description: "We're clear about how our technology works and the factors that influence our recommendations.",
    icon: <Code className="h-6 w-6" />
  },
  {
    title: "Continuous Learning",
    description: "We're always learning and improving, just like we encourage our users to do in their careers.",
    icon: <Compass className="h-6 w-6" />
  }
]

const team = [
  {
    name: "Emma Rodriguez",
    role: "CEO & Co-Founder",
    bio: "Former HR Executive with 15+ years of experience in talent acquisition and development.",
    photo: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    name: "David Kim",
    role: "CTO & Co-Founder",
    bio: "AI researcher with a PhD in Machine Learning and 10+ years in natural language processing.",
    photo: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    name: "Sophia Patel",
    role: "Chief Data Scientist",
    bio: "Former career coach with expertise in data science and predictive analytics.",
    photo: "https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    name: "Marcus Johnson",
    role: "Head of Product",
    bio: "Product leader with experience building AI-powered solutions for enterprise clients.",
    photo: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300"
  }
]

export default AboutPage