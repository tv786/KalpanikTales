import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function Analytics() {
  const { data: seoSettings } = useQuery({
    queryKey: ["seo-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seo_settings" as any)
        .select("*")
        .single();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (!seoSettings) return;

    const settings = seoSettings as any;

    // Google Analytics
    if (settings.google_analytics_id) {
      // Load Google Analytics
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics_id}`;
      document.head.appendChild(script);

      // Initialize gtag
      const gtagScript = document.createElement("script");
      gtagScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${settings.google_analytics_id}');
      `;
      document.head.appendChild(gtagScript);
    }

    // Google Tag Manager
    if (settings.google_tag_manager_id) {
      // GTM noscript
      const noscript = document.createElement("noscript");
      noscript.innerHTML = `
        <iframe src="https://www.googletagmanager.com/ns.html?id=${settings.google_tag_manager_id}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>
      `;
      document.body.insertBefore(noscript, document.body.firstChild);

      // GTM script
      const gtmScript = document.createElement("script");
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${settings.google_tag_manager_id}');
      `;
      document.head.appendChild(gtmScript);
    }

    // Google Search Console Verification
    if (settings.google_search_console_verification) {
      const meta = document.createElement("meta");
      meta.name = "google-site-verification";
      meta.content = settings.google_search_console_verification;
      document.head.appendChild(meta);
    }

    // Bing Webmaster Verification
    if (settings.bing_webmaster_verification) {
      const meta = document.createElement("meta");
      meta.name = "msvalidate.01";
      meta.content = settings.bing_webmaster_verification;
      document.head.appendChild(meta);
    }
  }, [seoSettings]);

  return null;
}
