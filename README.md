# Hiking Buddies Frontend V2

A Next.js frontend for Hiking Buddies with server-side authentication and API proxy.

## Prerequisites

- Node.js 20+ (recommended: 24.x)
- npm 10+

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Install shadcn/ui components

```bash
npx shadcn@3.6.2 add avatar badge button card carousel collapsible dialog dropdown-menu input label navigation-menu separator
```

### 3. Configure environment variables

Copy the example environment file and adjust as needed:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Backend API URL (server-side only)
API_BASE_URL=https://www.hiking-buddies.com

# Asset base URL for images (public, used in browser)
NEXT_PUBLIC_ASSET_BASE_URL=https://www.hiking-buddies.com
```

### 4. Start development server

```bash
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to see the app.

## Architecture

### Key Differences from V1

| Feature              | V1                           | V2                        |
| -------------------- | ---------------------------- | ------------------------- |
| **CORS Handling**    | External CORS proxy (Docker) | Next.js API routes        |
| **Authentication**   | localStorage                 | HTTP-only cookies         |
| **Sign In**          | Dialog popup                 | Dedicated `/signin` page  |
| **Docker for Dev**   | Required                     | Not required              |
| **Production Build** | Static export (nginx)        | Standalone Node.js server |

### API Routes

All API requests go through Next.js API routes that mirror the hiking-buddies.com endpoints:

- `/api/auth/login/` - Login endpoint (sets cookies)
- `/api/auth/logout/` - Logout endpoint (clears cookies)
- `/api/dashboard/` - Dashboard data (PK inferred from JWT)
- `/api/events/news-feed/` - Community news feed
- `/api/me` - Get current user's pk (helper for httpOnly cookie access)

### Authentication Flow

1. User navigates to `/signin`
2. Form submits to `/api/auth/login/`
3. Server validates with backend, sets HTTP-only cookies
4. User is redirected to home
5. Dashboard fetches `/api/me` to get user pk, then `/api/dashboard/` (PK inferred from JWT)
6. Sign out calls `/api/auth/logout/` to clear cookies

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Production Docker Build

Build the Docker image:

```bash
docker build -t hiking-buddies-frontend:latest .
```

Run the container:

```bash
docker run -p 3000:3000 \
  -e API_BASE_URL=https://www.hiking-buddies.com \
  -e NEXT_PUBLIC_ASSET_BASE_URL=https://www.hiking-buddies.com \
  hiking-buddies-frontend:latest
```

The image uses Next.js standalone output for minimal size (~150MB).

## Project Structure

```
frontend-v2/
├── app/
│   ├── api/
│   │   ├── me/route.ts
│   │   └── routes/
│   │       ├── login/route.ts
│   │       ├── logout/route.ts
│   │       ├── news_feed/route.ts
│   │       └── user_main_page/[pk]/route.ts
│   ├── events/page.tsx
│   ├── routes/page.tsx
│   ├── signin/
│   │   ├── page.tsx
│   │   └── signin-form.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── common/
│   ├── event/
│   ├── home/
│   ├── layout/
│   └── ui/           # shadcn components (install separately)
├── lib/
│   ├── auth.ts
│   └── utils.ts
├── public/
├── Dockerfile
├── next.config.ts
├── package.json
└── README.md
```

## Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

## TODOs

There are list of things that are being mocked and needs to be **immediately** replaced once there are more data:

- Ways to get identity from JWT token (needs another HB endpoint) - currently we count on "/api/dashboard/"
