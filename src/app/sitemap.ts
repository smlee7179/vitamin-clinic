import { MetadataRoute } from 'next'

interface Notice {
  id: string;
  updatedAt: string;
}

interface ClinicPage {
  slug: string;
  updatedAt: string;
}

interface TreatmentPage {
  slug: string;
  updatedAt: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vitaminpain.com'

  // Fetch dynamic content
  let notices: Notice[] = [];
  let clinicPages: ClinicPage[] = [];
  let treatmentPages: TreatmentPage[] = [];

  try {
    const [noticesRes, clinicPagesRes, treatmentPagesRes] = await Promise.all([
      fetch(`${baseUrl}/api/notices`, { next: { revalidate: 3600 } }),
      fetch(`${baseUrl}/api/clinic-pages`, { next: { revalidate: 3600 } }),
      fetch(`${baseUrl}/api/treatment-pages`, { next: { revalidate: 3600 } }),
    ]);

    if (noticesRes.ok) {
      notices = await noticesRes.json();
    }
    if (clinicPagesRes.ok) {
      clinicPages = await clinicPagesRes.json();
    }
    if (treatmentPagesRes.ok) {
      treatmentPages = await treatmentPagesRes.json();
    }
  } catch (error) {
    console.error('Failed to fetch dynamic sitemap data:', error);
  }

  // Static pages with their priorities
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // About pages
    {
      url: `${baseUrl}/about/greeting`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/doctors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/hospital`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/equipment`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Services pages
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Notices
    {
      url: `${baseUrl}/notices`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6,
    },
    // Contact/Hours
    {
      url: `${baseUrl}/contact/hours`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact/location`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ];

  // Dynamic notice pages
  const noticePages: MetadataRoute.Sitemap = notices.map((notice) => ({
    url: `${baseUrl}/notices/${notice.id}`,
    lastModified: new Date(notice.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  // Dynamic clinic pages
  const dynamicClinicPages: MetadataRoute.Sitemap = clinicPages.map((page) => ({
    url: `${baseUrl}/services/${page.slug}`,
    lastModified: new Date(page.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic treatment pages
  const dynamicTreatmentPages: MetadataRoute.Sitemap = treatmentPages.map((page) => ({
    url: `${baseUrl}/services/treatments/${page.slug}`,
    lastModified: new Date(page.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...noticePages,
    ...dynamicClinicPages,
    ...dynamicTreatmentPages,
  ];
} 