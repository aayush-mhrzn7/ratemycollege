// district type
export interface District {
  id: number;
  name: string;
}

// affiliated type
export interface Affiliated {
  id: number;
  slug: string;
  name: string;
  established_year: number;
  address: string;
}

// individual college item
export interface College {
  id: number;
  slug: string;
  name: string;
  dp_image: string;
  is_verified: boolean;
  address: string;
  district: District;
  affiliated: Affiliated[];
  banner_image: string;
}

// full API response wrapper
export interface CollegeApiResponse {
  count: number;
  total_pages: number;
  next: string | null;
  previous: string | null;
  results: College[];
}

export interface Information {
  slug: string;
  title: string;
  featured_image: string;
}

export interface InformationApiResponse {
  count: number;
  total_pages: number;
  next: string | null;
  previous: string | null;
  results: Information[];
}
