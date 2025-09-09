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

## 🖼️ Screenshots

<img width="2523" height="1324" alt="image" src="https://github.com/user-attachments/assets/a17644f1-1a69-413c-89df-c82dd723dad9" />

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
=====

