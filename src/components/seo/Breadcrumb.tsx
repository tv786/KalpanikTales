import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";
import { BreadcrumbSchema } from "./StructuredData";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  homeHref?: string;
  homeLabel?: string;
}

export function Breadcrumb({ items, homeHref = "/", homeLabel = "Home" }: BreadcrumbProps) {
  const allItems = [{ name: homeLabel, href: homeHref }, ...items];
  const schemaItems = allItems.map((item) => ({
    name: item.name,
    item: typeof window !== "undefined" 
      ? `${window.location.origin}${item.href}`
      : `https://kalpaniktales.com${item.href}`,
  }));

  return (
    <>
      <BreadcrumbSchema {...schemaItems} />
      <nav className="flex items-center space-x-1 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-1">
          {allItems.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
              {index === 0 ? (
                <Link
                  to={item.href}
                  className="flex items-center hover:text-foreground transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span className="sr-only">{item.name}</span>
                </Link>
              ) : index === allItems.length - 1 ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
