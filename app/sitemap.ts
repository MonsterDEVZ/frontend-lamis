import { MetadataRoute } from 'next';
import { fetchCatalogBrowse } from '@/services/api/products';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lamis.ru';

  try {
    // Fetch complete catalog structure
    const { catalog } = await fetchCatalogBrowse();

    const routes: MetadataRoute.Sitemap = [
      // Static pages
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/catalog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/contacts`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/service-center`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
    ];

    // Add dynamic catalog routes
    for (const sectionData of catalog) {
      const { section, categories } = sectionData;

      // Section page: /catalog/{section_slug}/
      routes.push({
        url: `${baseUrl}/catalog/${section.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });

      // Category pages and their items
      for (const categoryData of categories) {
        const { category, collections, types } = categoryData;

        // Category page: /catalog/{section_slug}/{category_slug}/
        routes.push({
          url: `${baseUrl}/catalog/${section.slug}/${category.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        });

        // Collection pages: /catalog/{section_slug}/{category_slug}/{collection_slug}/
        for (const collection of collections) {
          routes.push({
            url: `${baseUrl}/catalog/${section.slug}/${category.slug}/${collection.slug}`,
            lastModified: collection.created_at ? new Date(collection.created_at) : new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
          });
        }

        // Type pages: /catalog/{section_slug}/{category_slug}/{type_slug}/
        for (const type of types) {
          routes.push({
            url: `${baseUrl}/catalog/${section.slug}/${category.slug}/${type.slug}`,
            lastModified: type.created_at ? new Date(type.created_at) : new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
          });
        }
      }
    }

    return routes;
  } catch (error) {
    console.error('Error generating sitemap:', error);

    // Return minimal sitemap if API fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/catalog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
    ];
  }
}
