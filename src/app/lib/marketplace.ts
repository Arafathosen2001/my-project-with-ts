export type MarketplaceItem = {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: string;
  location: string;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  tags: string[];
  specifications?: Array<{ label: string; value: string }>;
  createdAt?: string;
  seller: string;
  featured: boolean;
  ownerId?: string;
};

export async function fetchItems(): Promise<MarketplaceItem[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to load projects');
  }

  const data = (await response.json()) as MarketplaceItem[];
  return Array.isArray(data) ? data : [];
}

export function getFeaturedItems(items: MarketplaceItem[]): MarketplaceItem[] {
  return items.filter((item) => item.featured).slice(0, 3);
}

export function getCollections(items: MarketplaceItem[]): MarketplaceItem[] {
  return items.slice(0, 4);
}
