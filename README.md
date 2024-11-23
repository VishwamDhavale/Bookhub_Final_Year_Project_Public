# Book Hub

Book Hub is a comprehensive platform designed to revolutionize the digital reading experience. It offers features like personalized book recommendations, intuitive note-taking, summarization, and collaborative functionalities, all aimed at fostering a vibrant reading community.

---

## Features

### 1. Personalized Recommendations
- Collaborative filtering-based recommendation system.
- Tailored suggestions based on reading preferences and history.
- Integration with external book metadata APIs.

### 2. Note-Taking
- Rich text editor for detailed annotations.
- Features like text formatting, highlighting, and embedding links.
- Notes linked to specific books or passages.

### 3. Summarization
- AI-powered summarization of notes and books.
- Quickly grasp key ideas from content.

### 4. PDF Integration
- Upload and manage large PDF documents.
- Annotate PDFs with highlights and comments.

### 5. Collaborative Features
- Share annotations, reading progress, and recommendations with friends.
- Engage in community discussions.

---

## Tech Stack

### Frontend
- **Framework**: Next.js, React
- **Styling**: Tailwind CSS
- **Editor**: TipTap for rich text editing
- **File Upload**: Uppy with TUS protocol for resumable uploads

### Backend
- **Authentication**: NextAuth.js with JWT and bcrypt for password hashing
- **Database**: Supabase with PostgreSQL
- **Recommendation System**: Python (scikit-learn, pandas, cosine similarity)
- **APIs**: FastAPI for backend services
- **Deployment**: Vercel

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/book-hub.git
   cd book-hub

2. First, run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev