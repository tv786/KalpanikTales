import { useEffect } from "react";

interface StructuredDataProps {
  data: Record<string, any>;
  type: string;
}

export function StructuredData({ data, type }: StructuredDataProps) {
  useEffect(() => {
    // Remove existing script with same type if any
    const existingScript = document.querySelector(`script[type="application/ld+json"][data-schema-type="${type}"]`);
    if (existingScript) {
      existingScript.remove();
    }

    // Create new script
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema-type", type);
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [data, type]);

  return null;
}

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KalpanikTales",
    description: "Read mythological, folklore, and fantasy story books from across Bharat — chapter by chapter, page by page.",
    url: typeof window !== "undefined" ? window.location.origin : "https://kalpaniktales.com",
    logo: "https://kalpaniktales.com/logo.png",
    sameAs: [
      "https://twitter.com/kalpaniktales",
      "https://facebook.com/kalpaniktales",
      "https://instagram.com/kalpaniktales",
    ],
  };

  return <StructuredData data={data} type="organization" />;
}

export function WebsiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KalpanikTales",
    url: typeof window !== "undefined" ? window.location.origin : "https://kalpaniktales.com",
    description: "Read mythological, folklore, and fantasy story books from across Bharat.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: typeof window !== "undefined" 
          ? `${window.location.origin}/search?q={search_term_string}`
          : "https://kalpaniktales.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return <StructuredData data={data} type="website" />;
}

export function BreadcrumbSchema({ items }: { items?: { name: string; item: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: (items || []).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };

  return <StructuredData data={data} type="breadcrumb" />;
}

export function BookSchema(book: {
  title: string;
  author?: string | null;
  synopsis?: string | null;
  cover_image_url?: string | null;
  slug: string;
  avg_rating?: number | null;
  total_pages?: number | null;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: book.author ? {
      "@type": "Person",
      name: book.author,
    } : undefined,
    description: book.synopsis,
    image: book.cover_image_url,
    url: typeof window !== "undefined" 
      ? `${window.location.origin}/book/${book.slug}`
      : `https://kalpaniktales.com/book/${book.slug}`,
    aggregateRating: book.avg_rating ? {
      "@type": "AggregateRating",
      ratingValue: book.avg_rating,
      bestRating: "5",
      worstRating: "1",
    } : undefined,
    numberOfPages: book.total_pages,
    inLanguage: "en",
  };

  return <StructuredData data={data} type="book" />;
}

export function ArticleSchema(article: {
  title: string;
  description?: string | null;
  author?: string | null;
  publishedAt?: string | null;
  modifiedAt?: string | null;
  url: string;
  imageUrl?: string | null;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: article.author ? {
      "@type": "Person",
      name: article.author,
    } : undefined,
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt,
    url: article.url,
    image: article.imageUrl,
    publisher: {
      "@type": "Organization",
      name: "KalpanikTales",
      logo: "https://kalpaniktales.com/logo.png",
    },
  };

  return <StructuredData data={data} type="article" />;
}
