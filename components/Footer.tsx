import Link from "next/link";

const CATEGORIES = [
  { label: "Photography", slug: "photography" },
  { label: "Catering", slug: "catering" },
  { label: "Flowers & Decoration", slug: "flowers-decoration" },
  { label: "Music / DJ", slug: "music-dj" },
  { label: "Venues", slug: "venues" },
  { label: "Event Planner", slug: "event-planner" },
  { label: "Decoration", slug: "decoration" },
];

export default function Footer() {
  return (
    <footer className="w-full mt-20 rounded-t-[40px] bg-zinc-100 text-sm leading-relaxed">
      <div className="max-w-[1200px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-xl font-bold text-orange-900 mb-4 font-headline">
              L&apos;Île Host
            </div>
            <p className="text-zinc-500 max-w-xs leading-relaxed text-sm">
              The premium marketplace for world-class event services in the
              heart of the Indian Ocean.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-primary hover:text-on-primary transition-colors"
              >
                <span className="material-symbols-outlined text-base">
                  social_leaderboard
                </span>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-primary hover:text-on-primary transition-colors"
              >
                <span className="material-symbols-outlined text-base">
                  photo_camera
                </span>
              </a>
              <a
                href="#"
                aria-label="Website"
                className="w-9 h-9 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-primary hover:text-on-primary transition-colors"
              >
                <span className="material-symbols-outlined text-base">
                  language
                </span>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-orange-900 uppercase tracking-widest text-xs mb-5">
              Categories
            </h4>
            <ul className="flex flex-col gap-3">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-zinc-500 hover:text-orange-700 hover:underline transition-all"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-bold text-orange-900 uppercase tracking-widest text-xs mb-5">
              Platform
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/about"
                  className="text-zinc-500 hover:text-orange-700 hover:underline transition-all"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-zinc-500 hover:text-orange-700 hover:underline transition-all"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-zinc-500 hover:text-orange-700 hover:underline transition-all"
                >
                  List Your Service
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-zinc-500 hover:text-orange-700 hover:underline transition-all"
                >
                  Search Providers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-orange-900 uppercase tracking-widest text-xs mb-5">
              Legal
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/legal/cgu"
                  className="text-zinc-500 hover:text-orange-700 hover:underline transition-all"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy"
                  className="text-zinc-500 hover:text-orange-700 hover:underline transition-all"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/mentions"
                  className="text-zinc-500 hover:text-orange-700 hover:underline transition-all"
                >
                  Legal Notices
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-400 text-xs">
            © {new Date().getFullYear()} L&apos;Île Host. Inspired by Mauritian
            Warmth.
          </p>
          <p className="text-zinc-400 text-xs">
            Made with ❤️ for Mauritius
          </p>
        </div>
      </div>
    </footer>
  );
}
