import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "next-sanity";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-on-surface-variant">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-bold text-on-surface mt-8 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-bold text-on-surface mt-6 mb-2">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic text-on-surface-variant">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 text-on-surface-variant">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-on-surface">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href as string | undefined;
      if (!href) return <>{children}</>;
      const external = Boolean(value?.external);
      return (
        <a
          href={href}
          className="text-primary hover:underline"
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

export default function LegalBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="space-y-6 leading-relaxed">
      <PortableText value={value} components={components} />
    </div>
  );
}
