# L'Île Host - Event Services Platform in Mauritius

L'Île Host is a modern web platform designed to connect users with service providers for various events in Mauritius (weddings, birthdays, corporate events, private parties, etc.).

## 🚀 Features

- **Multilingual Support**: English and French (using `next-intl`).
- **Dynamic Content**: Powered by Sanity CMS.
- **Mobile-First Design**: Clean and responsive UI.
- **Provider Categories**: Photography, Catering, Flowers/Decoration, Music/DJ, Venues, Event Planner.
- **Provider Profiles**: Image galleries, descriptions, services, and direct WhatsApp contact.
- **Search & Filters**: Basic filtering by category and location.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **CMS**: [Sanity.io](https://www.sanity.io/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)

## 🏗️ Sanity Integration

This project uses Sanity as a headless CMS to manage providers and categories.

### Schema Types

- **Category**: `name` (EN/FR), `slug`, `description` (EN/FR), `image` (upload or URL).
- **Provider**: `name` (EN/FR), `slug`, `category` (reference), `shortDescription` (EN/FR), `description` (EN/FR), `location`, `images` (upload or URLs), `services` (EN/FR), `whatsapp`, `email`, `priceRange`, `rating`, `featured`.

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=your_write_token
```

### Sanity Scripts

The project includes utility scripts to manage Sanity content:

- **Seed Data**: Import initial categories and providers from `seed/sanity/`.
  ```bash
  npm run seed:sanity
  ```
- **Clear Content**: Delete all providers and categories from the dataset.
  ```bash
  npm run clear:sanity
  ```
- **Full Reset**: Clear and then seed.
  ```bash
  npm run clear:sanity && npm run seed:sanity
  ```

## 🚦 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Sanity**:
   Ensure your `.env.local` is set up with the correct Project ID and Token.

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Access Sanity Studio**:
   The Studio is integrated into the Next.js app (if configured) or can be run separately via `npx sanity start` in the `sanity` directory (if applicable).

## 📁 Project Structure

- `app/[locale]/`: Next.js App Router with internationalization.
- `components/`: Reusable UI components.
- `lib/sanity/`: Sanity client, queries, and image utilities.
- `sanity/`: Sanity schema definitions and configuration.
- `seed/sanity/`: Initial data in NDJSON format.
- `messages/`: Translation files for `next-intl`.

## 📝 License

This project is private.
