import { useEffect } from "react";

interface SEOMetaProps {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  keywords?: string;
}

export function SEOMeta({
  title,
  description,
  canonical,
  noindex = false,
  nofollow = false,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  keywords,
}: SEOMetaProps) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (!metaDesc) {
        metaDesc = document.createElement('meta') as HTMLMetaElement;
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = description;
    }

    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta') as HTMLMetaElement;
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = keywords;
    }

    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link') as HTMLLinkElement;
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = canonical;
    }

    if (noindex || nofollow) {
      let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta') as HTMLMetaElement;
        robotsMeta.name = 'robots';
        document.head.appendChild(robotsMeta);
      }
      const directives = [];
      if (noindex) directives.push('noindex');
      if (nofollow) directives.push('nofollow');
      if (directives.length === 0) {
        robotsMeta.remove();
      } else {
        robotsMeta.content = directives.join(', ');
      }
    }

    // Open Graph tags
    if (ogTitle) {
      let ogTitleMeta = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
      if (!ogTitleMeta) {
        ogTitleMeta = document.createElement('meta') as HTMLMetaElement;
        ogTitleMeta.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitleMeta);
      }
      ogTitleMeta.setAttribute('content', ogTitle);
    }

    if (ogDescription) {
      let ogDescMeta = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
      if (!ogDescMeta) {
        ogDescMeta = document.createElement('meta') as HTMLMetaElement;
        ogDescMeta.setAttribute('property', 'og:description');
        document.head.appendChild(ogDescMeta);
      }
      ogDescMeta.setAttribute('content', ogDescription);
    }

    if (ogImage) {
      let ogImageMeta = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
      if (!ogImageMeta) {
        ogImageMeta = document.createElement('meta') as HTMLMetaElement;
        ogImageMeta.setAttribute('property', 'og:image');
        document.head.appendChild(ogImageMeta);
      }
      ogImageMeta.setAttribute('content', ogImage);
    }

    if (ogType) {
      let ogTypeMeta = document.querySelector('meta[property="og:type"]') as HTMLMetaElement;
      if (!ogTypeMeta) {
        ogTypeMeta = document.createElement('meta') as HTMLMetaElement;
        ogTypeMeta.setAttribute('property', 'og:type');
        document.head.appendChild(ogTypeMeta);
      }
      ogTypeMeta.setAttribute('content', ogType);
    }

    // Twitter Card tags
    if (twitterCard) {
      let twitterCardMeta = document.querySelector('meta[name="twitter:card"]') as HTMLMetaElement;
      if (!twitterCardMeta) {
        twitterCardMeta = document.createElement('meta') as HTMLMetaElement;
        twitterCardMeta.name = 'twitter:card';
        document.head.appendChild(twitterCardMeta);
      }
      twitterCardMeta.setAttribute('content', twitterCard);
    }

    if (ogTitle) {
      let twitterTitleMeta = document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement;
      if (!twitterTitleMeta) {
        twitterTitleMeta = document.createElement('meta') as HTMLMetaElement;
        twitterTitleMeta.name = 'twitter:title';
        document.head.appendChild(twitterTitleMeta);
      }
      twitterTitleMeta.setAttribute('content', ogTitle);
    }

    if (ogDescription) {
      let twitterDescMeta = document.querySelector('meta[name="twitter:description"]') as HTMLMetaElement;
      if (!twitterDescMeta) {
        twitterDescMeta = document.createElement('meta') as HTMLMetaElement;
        twitterDescMeta.name = 'twitter:description';
        document.head.appendChild(twitterDescMeta);
      }
      twitterDescMeta.setAttribute('content', ogDescription);
    }

    if (ogImage) {
      let twitterImageMeta = document.querySelector('meta[name="twitter:image"]') as HTMLMetaElement;
      if (!twitterImageMeta) {
        twitterImageMeta = document.createElement('meta') as HTMLMetaElement;
        twitterImageMeta.name = 'twitter:image';
        document.head.appendChild(twitterImageMeta);
      }
      twitterImageMeta.setAttribute('content', ogImage);
    }
  }, [title, description, canonical, noindex, nofollow, ogTitle, ogDescription, ogImage, ogType, twitterCard, keywords]);

  return null;
}
