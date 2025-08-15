<<<<<<< HEAD

# Portfolio (Ready to deploy)

This project includes:
- Vite + React + Tailwind skeleton
- Filled project details (no placeholders)
- Resume upload using Supabase Storage (bucket name: 'resumes')

## Quick setup
1. Create a Supabase project and a Storage bucket named `resumes`.
2. In Supabase Settings -> API, copy Project URL and Anon key.
3. In Vercel, set environment variables:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
4. Push this repo to GitHub and import to Vercel or deploy from CLI.

## Local testing
Create .env with:
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...

npm install
npm run dev

## Security note
- For production, consider a server-side endpoint to generate signed download URLs and to keep the service_role key secret.
=======
# portfolio
My Work Portfolio
>>>>>>> 24923fa3b4514dd9287c6b0b89a3e9a8dfe50b41
