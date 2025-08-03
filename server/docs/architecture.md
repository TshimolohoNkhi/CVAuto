Coverly Backend Architecture

Summary

Coverly is an application that solves problems job-seekers and recruiters go through regularly. It consists of two sections, for job seekers and for recruiters. For job seekers, it sets the stage for the user to input information about their desired job and information that is relevant or required to apply for those jobs. Using that information, it then matches the user with jobs they are most likely to qualify for. When a match has been found, a match score is assigned and any jobs where the user met 80%+ of the requirements, a CV is automatically generated for them using AI (strictly no hallucination) using the information they initially provided. Additionally, a cover letter is also automatically generated and both the CV and cover letter is sent to the recruiter for the final decision. For recruiters, the applications takes the role of a filter, the recruiter will be greeted with a form, where they will be asked to grant permissions to search their job portals and other additional information. When one of their jobs have a match, the information of the candidate will be sent directly to their email inbox where they can reject, approve or further review the candidate, their response will be rendered in real time on the candidate's dashboard.

Tech Stack

- FastAPI (backend)
- Supabase (Auth + DB)
- Stripe (billing)
- Pydantic (validation)
- Postgres (via Supabase)

Folder Structure

`app/`
    - `api/`: Handles FastAPI requests and route handlers
    - `core/`: Centralised key settings
    - `db/`: Supabase integration
    - `models/`: Defines data structures in DB table models for using ORM
    - `routes/`: Entry points to the backend 
    - `schemas/`: Pydantic classes that define what is allowed in and out of endpoints
    - `services/`: Business logic and core flows
    - `utils/`: Reusable helper functions like email manager, credit manager, token tools, etc.

`docs/`

`tests/`