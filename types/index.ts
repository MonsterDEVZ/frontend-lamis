/**
 * Collection Interface
 * Represents a furniture collection in the LAMIS catalog
 */
export interface Collection {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
}

/**
 * Product Interface
 * Represents a product within a collection
 */
export interface Product {
  id: string;
  name: string;
  slug: string;
  collectionId: string;
  images: string[];
  price: number;
  description?: string;
}
