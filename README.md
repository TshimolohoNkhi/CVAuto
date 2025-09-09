<<<<<<< Updated upstream
# CVAuto - Automated CV Application Platform 📄

A platform that matches job seekers with recruiters by analysing user profiles and job descriptions. CVAuto leverages LLMs, cosine similarity, and a prompt-to-vector pipeline to deliver highly relevant candidate-job matches.  

💼 **Portfolio Project**  
This is a personal portfolio project demonstrating applied AI/ML, NLP, and backend development skills. The project showcases:

- **Artificial Intelligence**: LLMs transform unstructured user profile and job description data into structured embeddings.  
- **Information Retrieval**: Cosine similarity for candidate-job matching.  
- **NLP Engineering**: Prompt engineering pipeline for converting raw data into semantic vectors.  
- **Software Architecture**: Modular, scalable backend design with clear separation of concerns.  
- **Data Science**: Candidate-job vectorisation, scoring, and match ranking.  

---

## 🚀 Key Features  

**Job Matching**  
- **Cosine Similarity**: Ranks candidates by measuring semantic similarity between profile vectors and job description vectors.  
- **Vectorised Pipeline**: LLM-driven embeddings convert raw text into structured vectors for precise matching.  
- **Top-N Recommendations**: Ranks jobs or candidates by similarity score to provide the most relevant matches.  

**Recruiter Tools**  
- **Automated Candidate Matching**: Sends recruiters the suitable candidates for their open roles.   

---

## 🏗️ CVAuto Project Structure

```
CVAuto/
├── client/
│ ├── app/
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── components/ # Reusable UI components
│ │ ├── ui/
│ │ ├── Dashboard.tsx
│ │ ├── ApplicationsDashboard.tsx
│ │ ├── AuthPage.tsx
│ │ └── ...
│ ├── contexts/ # React contexts for state management
│ ├── hooks/ # Custom React hooks
│ ├── lib/ # Utilities & Supabase client
│ └── public/ # Static assets

├── server/
│ ├── app/
│ │ ├── main.py # FastAPI entry point
│ │ ├── api/v1/ # API endpoints
│ │ │ ├── applications.py
│ │ │ ├── auth.py
│ │ │ └── dashboard.py
│ │ ├── config/ # Configuration files
│ │ ├── core/ # Core business logic
│ │ ├── db/ # Database session management
│ │ ├── models/ # SQLAlchemy models
│ │ ├── prompts/ # AI prompts for matching
│ │ ├── routes/ # Additional routes
│ │ ├── schemas/ # Pydantic schemas
│ │ ├── services/ # Business logic services
│ │ └── utils/ # Utility functions
│ └── docs/ # Documentation
└── README.md
```
---

## 📊 Matching Workflow

1. **Data Input**: Candidate submits profile data; recruiter posts job description. Data stored in Supabase.  
2. **Preprocessing**: Cleans and standardises profile data and job descriptions.  
3. **Vectorisation**: LLM-based pipeline transforms text into semantic embeddings.  
4. **Similarity Calculation**: Cosine similarity ranks candidates for each job.  
5. **Results Delivery**: Recruiters receive top candidates via dashboard; candidates get feedback.  

---

## 🖼️ Diagrams & Screenshots

Placeholder section for system architecture diagrams, sequence flows, and UI screenshots.

---

## 🛠️ Technical Implementation

**Technologies Used**  
- Python 3.12+  
- FastAPI (Backend/API)  
- LangChain / SBERT / HuggingFace (LLM processing)  
- Scikit-learn / FAISS (Vector similarity search)  
- Pandas / NumPy (Data handling)  

**Core Algorithms**  
- **Cosine Similarity**: Primary scoring mechanism for matching candidates to jobs.  
- **LLM-Prompt Pipelines**: Converts unstructured user/job data into structured embeddings.  

---

## 📝 Project Notes

This project demonstrates proficiency in:  
- **Applied AI & NLP**: Text embeddings, semantic similarity, prompt engineering.  
- **Backend Development**: FastAPI endpoints, modular service design.  
- **Information Retrieval**: Efficient ranking and scoring for candidate-job matches.  

---

## 🔮 Next Steps

- Implement recruiter dashboard with analytics, filtering, and candidate notifications.  
- Implement real-time matching updates and automated alerting.  
=======
# CVAuto - Intelligent CV & Job Matching Platform

A full-stack web application that automates CV creation, job application tracking, and intelligent job matching using modern web technologies and machine learning algorithms.

## 🚀 Overview

CVAuto is a comprehensive platform designed to streamline the job search process by providing intelligent CV generation, automated job matching, and application tracking capabilities. The platform leverages graph-based algorithms and AI to connect job seekers with relevant opportunities while providing recruiters with powerful tools to find the right candidates.

## 🏗️ Architecture

### Frontend (Next.js 15 + React 19)
- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Components**: Radix UI primitives for accessibility
- **State Management**: React Context API
- **Authentication**: Supabase Auth integration
- **Charts & Analytics**: Recharts for data visualization

### Backend (Python + FastAPI)
- **API Framework**: FastAPI with async/await support
- **Database**: Supabase (PostgreSQL) with real-time subscriptions
- **Authentication**: JWT-based auth with role-based access control
- **Job Matching**: Graph-based matching algorithm using NetworkX
- **Web Scraping**: Scrapy framework for job data collection
- **Email Services**: Automated notification system
- **Security**: Encryption, password hashing, and secure token management

## ✨ Key Features

### For Job Seekers
- **Smart CV Builder**: AI-powered CV generation with multiple templates
- **Job Matching Engine**: Graph-based algorithm matching skills, experience, and preferences
- **Application Tracking**: Comprehensive dashboard to monitor application status
- **Analytics Dashboard**: Insights into job search performance and trends
- **Preference Management**: Customizable job search criteria and notifications
- **Progress Tracking**: Visual indicators for application pipeline stages

### For Recruiters
- **Candidate Discovery**: Advanced search and filtering capabilities
- **Application Management**: Streamlined candidate review process
- **Communication Tools**: Integrated messaging and notification system
- **Analytics**: Recruitment metrics and performance insights

### Platform Features
- **Real-time Notifications**: Live updates on applications and matches
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark/Light Theme**: Customizable UI themes with system preference detection
- **Onboarding Flow**: Guided setup process for new users
- **Donation System**: Optional support mechanism for platform sustainability

## 🛠️ Technical Stack

### Frontend Dependencies
```json
{
  "next": "^15.5.2",
  "react": "^19",
  "typescript": "^5",
  "tailwindcss": "^3.4.17",
  "@radix-ui/react-*": "Latest",
  "@supabase/supabase-js": "^2.50.5",
  "recharts": "2.15.0",
  "react-hook-form": "^7.54.1",
  "zod": "^3.24.1"
}
```

### Backend Dependencies
```python
fastapi
uvicorn
python-jose[cryptography]
passlib[bcrypt]
sqlalchemy
pydantic
python-dotenv
```

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.8+
- Supabase account and project

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

### Backend Setup
```bash
cd server
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Environment Configuration
Create `.env` files in both client and server directories with your Supabase credentials and other configuration variables.

## 📊 Core Algorithms

### Job Matching Engine
The platform uses a sophisticated graph-based matching algorithm that considers:
- **Skills Compatibility**: Weighted matching of technical and soft skills
- **Experience Relevance**: Industry and role experience scoring
- **Location Preferences**: Geographic and remote work preferences
- **Salary Expectations**: Compensation range alignment
- **Company Culture Fit**: Values and work environment matching

### Application Scoring
Applications are scored using multiple factors:
- Profile completeness
- Skill-job alignment
- Experience relevance
- Application timing
- Historical success rates

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Granular permissions for different user types
- **Data Encryption**: Sensitive data encryption at rest and in transit
- **Input Validation**: Comprehensive validation using Pydantic schemas
- **Rate Limiting**: API endpoint protection against abuse
- **CORS Configuration**: Secure cross-origin resource sharing

## 📱 UI/UX Features

- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Accessibility**: WCAG 2.1 compliant with screen reader support
- **Progressive Enhancement**: Graceful degradation for older browsers
- **Loading States**: Skeleton screens and progress indicators
- **Error Handling**: User-friendly error messages and recovery options
- **Offline Support**: Service worker implementation for basic offline functionality

## 🧪 Testing & Quality

- **Type Safety**: Full TypeScript implementation with strict mode
- **Code Quality**: ESLint and Prettier configuration
- **Component Testing**: React Testing Library setup
- **API Testing**: FastAPI test client integration
- **Performance Monitoring**: Core Web Vitals tracking

## 📈 Performance Optimizations

- **Code Splitting**: Dynamic imports and route-based splitting
- **Image Optimization**: Next.js Image component with WebP support
- **Caching Strategy**: Redis caching for frequently accessed data
- **Database Optimization**: Indexed queries and connection pooling
- **CDN Integration**: Static asset delivery optimization

## 🔄 Development Workflow

- **Version Control**: Git with conventional commit messages
- **CI/CD**: Automated testing and deployment pipelines
- **Code Review**: Pull request workflow with automated checks
- **Documentation**: Comprehensive API documentation with OpenAPI
- **Monitoring**: Application performance and error tracking

## 🎯 Future Enhancements

- **AI-Powered Insights**: Machine learning models for career recommendations
- **Video Interviews**: Integrated video calling for remote interviews
- **Skills Assessment**: Automated technical skill evaluation
- **Blockchain Verification**: Credential verification using blockchain
- **Mobile App**: Native mobile applications for iOS and Android

## 📄 License

This project is developed for portfolio demonstration purposes and is not intended for public distribution.

## 🤝 Contributing

This is a portfolio project showcasing full-stack development capabilities, modern web technologies, and software architecture best practices.

---

**Built with ❤️ using modern web technologies and best practices**
>>>>>>> Stashed changes
