// ============================================
// UTILITÁRIOS DE TRACKING DE CONVERSÃO
// ============================================

export function trackWhatsAppClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  location: string,
  phone?: string,
  message?: string
) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'whatsapp_click', {
      event_category: 'engagement',
      event_label: location,
      phone: phone || '5513996432357',
      message_preview: message ? message.substring(0, 50) : '',
    });
  }

  // Meta Pixel - Contact
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Contact', {
      content_name: location,
      content_category: 'whatsapp',
    });
  }

  // Google Ads Conversion
  if (
    typeof window !== 'undefined' &&
    typeof (window as any).trackWhatsAppConversion === 'function'
  ) {
    // Let the native anchor open WhatsApp once; conversion tracking must not redirect again.
    (window as any).trackWhatsAppConversion();
  }
}

export function trackFormSubmit(
  formName: string,
  formData?: { interest?: string; [key: string]: any }
) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'form_submit', {
      event_category: 'lead',
      event_label: formName,
      form_id: formName,
      interest: formData?.interest || 'unknown',
    });
  }

  // Meta Pixel - Lead
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead', {
      content_name: formName,
      content_category: 'lead_generation',
    });
  }

  // Google Ads Conversion
  if (
    typeof window !== 'undefined' &&
    typeof (window as any).trackFormConversion === 'function'
  ) {
    (window as any).trackFormConversion();
  }
}

export function trackProductView(productName: string, category?: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'select_content', {
      content_type: 'product',
      content_id: productName,
      content_category: category || 'general',
    });
  }
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'ViewContent', {
      content_name: productName,
      content_category: category || 'general',
      content_type: 'product',
    });
  }
}

export function trackCTAClick(ctaName: string, ctaLocation: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: ctaName,
      location: ctaLocation,
    });
  }
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('trackCustom', 'CTAClick', {
      cta_name: ctaName,
      cta_location: ctaLocation,
    });
  }
}

export function trackPageScroll(depth: number) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'page_scroll', {
      event_category: 'engagement',
      event_label: `scroll_${depth}%`,
      value: depth,
    });
  }
}
