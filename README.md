# Music Admin Dashboard

A modern web application for managing music campaigns, built with Next.js, TypeScript, and PostgreSQL.

## Features

- Campaign management (create, read, update, delete)
- User authentication
- Responsive design with Tailwind CSS
- Type-safe API with tRPC
- Form validation with Zod
- Database management with Drizzle ORM

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or later)
- PostgreSQL (v14 or later)
- npm or yarn

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd music-admin
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/music_admin
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set Up the Database

1. Create a PostgreSQL database named `music_admin`
2. Run the database migrations:

```bash
npm run db:generate
npm run db:migrate
```

### 5. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
music-admin/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # Reusable React components
│   ├── db/              # Database configuration and migrations
│   ├── server/          # tRPC server and API routes
│   └── utils/           # Utility functions and hooks
├── drizzle/             # Database migration files
├── public/              # Static assets
└── ...                  # Configuration files
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Apply database migrations

## Technology Stack

- **Frontend Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Drizzle ORM
- **API**: tRPC
- **Authentication**: Supabase
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Headless UI and Heroicons

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
