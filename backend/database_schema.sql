
-- CareerCompassAI Database Schema
-- Run this in your Supabase SQL Editor

-- Users table for authentication and basic user info
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles table for detailed user information
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    phone VARCHAR(20),
    location VARCHAR(255),
    linkedin_url VARCHAR(500),
    github_url VARCHAR(500),
    portfolio_url VARCHAR(500),
    bio TEXT,
    skills JSONB DEFAULT '[]',
    experience_years INTEGER DEFAULT 0,
    education JSONB DEFAULT '[]',
    work_experience JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job postings table
CREATE TABLE IF NOT EXISTS job_postings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    job_type VARCHAR(50), -- full-time, part-time, contract, etc.
    remote_option VARCHAR(50), -- remote, hybrid, on-site
    salary_range VARCHAR(100),
    description TEXT,
    requirements TEXT,
    posted_date DATE,
    application_deadline DATE,
    job_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User applications table
CREATE TABLE IF NOT EXISTS user_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    job_posting_id UUID REFERENCES job_postings(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'applied', -- applied, interview, rejected, offered, accepted
    application_date DATE DEFAULT CURRENT_DATE,
    notes TEXT,
    resume_version VARCHAR(255),
    cover_letter TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI analysis results table
CREATE TABLE IF NOT EXISTS ai_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    job_posting_id UUID REFERENCES job_postings(id) ON DELETE CASCADE,
    analysis_type VARCHAR(50), -- resume_match, skill_gap, interview_prep
    analysis_data JSONB,
    score DECIMAL(3,2), -- 0.00 to 1.00
    recommendations TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User resumes table
CREATE TABLE IF NOT EXISTS user_resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    file_url VARCHAR(500),
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_applications_user_id ON user_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_user_applications_job_posting_id ON user_applications(job_posting_id);
CREATE INDEX IF NOT EXISTS idx_ai_analysis_user_id ON ai_analysis(user_id);
CREATE INDEX IF NOT EXISTS idx_user_resumes_user_id ON user_resumes(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_postings_updated_at BEFORE UPDATE ON job_postings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_applications_updated_at BEFORE UPDATE ON user_applications 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_resumes_updated_at BEFORE UPDATE ON user_resumes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
