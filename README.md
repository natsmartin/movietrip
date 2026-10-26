# MovieTrip

MovieTrip is a movie discovery app built with Next.js. Browse popular, top-rated, and upcoming films; search by title; filter movie lists by genre; and view film and cast details. Movie data is provided by [The Movie Database (TMDb)](https://www.themoviedb.org/).

## Features

- Search movies by title and load additional results.
- Browse popular, top-rated, and upcoming movies.
- Filter movie lists by genre and load more results.
- View movie details, cast, director, and available trailers.
- View people profiles, biographies, and film credits.
- Responsive interface styled with Tailwind CSS and Material UI.

## Getting started

### Requirements

- Node.js and npm
- A TMDb API key

### Installation

1. Clone the repository and open its directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root and add your TMDb API key:

   ```env
   API_KEY=your_tmdb_api_key
   ```

   The application reads `API_KEY` in its server-side TMDb request helper. Keep the key private and do not commit `.env.local`.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Available routes

| Route | Description |
| --- | --- |
| `/` | Search movies by title |
| `/popular` | Browse popular movies and filter by genre |
| `/top_rated` | Browse top-rated movies and filter by genre |
| `/upcoming` | Browse upcoming movies |
| `/movie/[movieId]` | View movie details, cast, crew, and trailer |
| `/person/[personId]` | View a person's profile and movie credits |

## Development commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run the Next.js ESLint checks |
| `npm test` | Run the Jest test suite |
| `npm run test:watch` | Run Jest in watch mode |

## Project structure

```text
app/
  (pages)/             Movie category routes
  components/          Shared UI, navigation, search, and filters
  movie/[movieId]/     Movie detail route and sections
  person/[personId]/   Person profile route and credits
  sections/            Reusable movie list and overview sections
  utils/actions/       TMDb API request helpers
  page.tsx             Home page and movie search
```

The app uses the Next.js App Router with React and TypeScript. TMDb API calls are centralized in `app/utils/actions/`, and `app/components/` contains shared interface components.

## Deployment

Deploy as a Next.js application. Configure `API_KEY` in the deployment environment before building or running the app, and keep the value out of source control.

Movie data and images are provided by TMDb. MovieTrip is not endorsed or certified by TMDb.
