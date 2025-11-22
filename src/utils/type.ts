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

export interface Information {
  slug: string;
  title: string;
  featured_image: string;
}

export interface ApiResponse<T> {
  count: number;
  total_pages: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
export interface CourseDetail {
  id: number;
  slug: string;
  name: string;
  affiliation: Affiliation;
  university_type?: string;
  duration: Duration;
}

export interface Affiliation {
  id: number;
  name: string;
  slug: string;
  university_type: string;
}

interface Duration {
  id: number;
  name: string;
}

export interface CollegeDetail {
  id: number;
  district: District;
  affiliated: Affiliated[];
  college_type: CollegeType;
  discipline: CollegeType[];
  profile_completion_percentage: number;
  meta_title: string;
  meta_tag: null;
  meta_description: null;
  meta_keywords: null;
  meta_author: null;
  canonical_url: null;
  og_title: null;
  og_description: null;
  og_url: null;
  og_image: null;
  og_type: null;
  og_locale: string;
  dc_title: null;
  dc_description: null;
  dc_language: string;
  public_id: string;
  slug: string;
  banner_image: string;
  dp_image: string;
  priority: number;
  name: string;
  is_show: boolean;
  is_verified: boolean;
  established_date: Date;
  website_link: string;
  address: string;
  phone_number: string;
  email: string;
  google_map_link: string;
  latitude: string;
  longitude: string;
  about: string;
  brochure: null;
  placement: null;
  scholarship: null;
  created_date: Date;
  updated_date: Date;
  step_counter: null;
}

export interface Affiliated {
  id: number;
  slug: string;
  name: string;
  established_year: number;
  address: string;
}

export interface CollegeType {
  id: number;
  name: string;
  is_show: boolean;
  created_date: Date;
  created_date_time: Date;
  updated_date: Date;
}

export interface District {
  id: number;
  name: string;
}
