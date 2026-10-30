<div align="center">

<img src="public/assets/logo.png" alt="FitLog logo" width="56" />

# FitLog — Workout Library

**A dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.**

[Live Demo](#) · [GitHub Repository](#)

</div>

---

## 📖 Description

FitLog is a responsive workout library built with **Next.js (App Router)**. Browse twelve lifts covering every major
muscle group, open a detailed breakdown of any exercise, then add it to **Today's Plan** or **Saved** and track your
total exercises, minutes and calories on the **My Plan** page.

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| Next.js 15 (App Router) | UI + file-based routing |
| React 19 | Component model, hooks, context |
| Tailwind CSS 4 | Styling and responsive layout |
| react-hot-toast | Toast notifications |
| react-icons (Lucide set) | Icons |
| Oswald + Inter (next/font) | Typography |

## ✨ Key Features

1. **Responsive layout** — navbar, hero, 3-column library grid and My Plan page adapt to mobile, tablet and desktop.
2. **Workout library** — all lifts fetched from the FitLog API (with a fallback endpoint) and shown as cards with tags, equipment, duration, calories and rating, plus an animated loading state.
3. **Detailed workout page** — large image, spec panel (equipment, difficulty, sets, reps, duration, calories, rating) and step-by-step instructions.
4. **Today's Plan & Saved** — add to plan or save for later with live navbar badge counters and toast feedback; plan is capped at 5 lifts.
5. **My Plan dashboard** — live Exercises / Minutes / Calories metrics, tabs, sort by duration / calories / rating, *Mark as Done* and remove actions.
6. **Persistent data** — plan, saved and completed lists survive page reloads via `localStorage`.
7. **Custom 404 page** and reload-safe routing for every page.

## 🚀 Getting Started

```bash
git clone <your-repo-url>
cd fitlog
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build   # production build
npm start       # run the production build
```

## 📁 Project Structure

```
app/
  layout.js            # root layout, navbar, footer, toaster
  page.js              # home: hero + library
  workouts/[id]/       # workout details
  my-plan/             # plan & saved dashboard
  not-found.js         # 404 page
components/            # Navbar, Footer, Hero, Library, WorkoutCard, Spinner, Logo
context/PlanContext.js # plan / saved / done state + localStorage
hooks/useWorkouts.js   # cached data fetching
lib/api.js             # API helpers with fallback endpoint
public/assets/         # banner.png, logo.png
```

## 🌐 API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`
- Fallback: `https://api.api-store.workers.dev/api/fitlog`

## ☁️ Deployment

Deploy on Vercel: import the repository and click **Deploy** — no extra configuration required.
