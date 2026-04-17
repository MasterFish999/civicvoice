# CivicVoice

Texas-first civic action site for students.

## Main flow
- Choose an issue
- Vote once
- Write a message
- Find the right representative
- Send by email, phone, or official website

## Setup
Copy `.env.example` to `.env.local` and fill in any values you have:
- `CIVIC_API_KEY`
- Firebase web config values

If Firebase is not configured, the app still renders and local browser storage handles the issue vote and rep-add demo features.

## Pages
- `/` home
- `/topics` issues board
- `/topics/[slug]` issue detail
- `/reps` representative lookup
- `/guide` message-writing guide
- `/login` auth page

## Deploy
This is built for Next.js App Router and can be deployed to Vercel or Firebase Hosting.
