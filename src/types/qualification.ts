export type Objective = 'affiliate' | 'tech_partner' | 'service_provider';

export type MonetizationType = 
  | 'consulting'
  | 'courses'
  | 'mentoring'
  | 'advertising'
  | 'affiliate'
  | 'not_monetizing';

export type AuthorityTrainingLevel =
  | 'recurring_courses'
  | 'occasional_workshops'
  | 'free_tutorials'
  | 'informative_content';

export type CommunityType =
  | 'whatsapp_telegram'
  | 'newsletter'
  | 'private_group'
  | 'social_posts_only';

export type EcommerceExperience =
  | 'nuvemshop_user'
  | 'nuvemshop_for_clients'
  | 'other_platforms_for_clients'
  | 'teaches_without_store'
  | 'no_technical_experience';

export type ProgramExpectation =
  | 'commissions'
  | 'exclusive_support'
  | 'training_materials'
  | 'authority_partnership';

// Service Provider (Agencies) Types
export type ServiceType =
  | 'agency'
  | 'freelancer'
  | 'consultant'
  | 'developer'
  | 'traffic_manager';

export type EmployeeCount =
  | 'solo'
  | '2_5'
  | '6_10'
  | '11_50'
  | 'more_than_50';

export type StoreCreationFrequency =
  | 'monthly'
  | 'bimonthly_or_more'
  | 'not_yet_interested'
  | 'other_segment';

export type ServiceOffered =
  | 'store_creation'
  | 'design'
  | 'marketing'
  | 'traffic_management'
  | 'seo_content'
  | 'development'
  | 'consulting'
  | 'support'
  | 'migration';

export type ClientsVolume =
  | 'none'
  | '1_5'
  | '6_20'
  | '21_50'
  | 'more_than_50';

export type NuvemshopExperienceLevel =
  | 'active_stores'
  | 'created_for_clients'
  | 'familiar'
  | 'no_experience';


// Tech Partner Types
export type SolutionType =
  | 'app'
  | 'theme'
  | 'integration'
  | 'erp_crm';

export type EcommercePlatformExperience =
  | 'shopify'
  | 'vtex'
  | 'woocommerce'
  | 'magento'
  | 'other'
  | 'none';

export type CompanySize =
  | '1_10'
  | '11_50'
  | '51_200'
  | 'more_than_200';

// Affiliate Types
export type ContentPlatform =
  | 'youtube'
  | 'instagram'
  | 'tiktok'
  | 'blog'
  | 'podcast'
  | 'linkedin'
  | 'other';

export type PromotionChannel =
  | 'blog'
  | 'youtube'
  | 'social_media'
  | 'email_marketing'
  | 'paid_advertising'
  | 'community'
  | 'podcast'
  | 'other';

export type AudienceSize =
  | 'under_1k'
  | '1k_10k'
  | '10k_100k'
  | 'more_than_100k';

export type AudienceNiche =
  | 'ecommerce'
  | 'entrepreneurship'
  | 'marketing'
  | 'technology'
  | 'lifestyle'
  | 'other';

export interface AffiliateData {
  username?: string;
  siteUrl: string;
  readyToRefer: 'yes' | 'no';
  monetization: MonetizationType[];
  authorityTraining: AuthorityTrainingLevel;
  communityType: CommunityType;
  experience: EcommerceExperience;
  expectations: ProgramExpectation[];
  // New fields from the plan
  contentPlatforms?: ContentPlatform[];
  promotionChannels?: PromotionChannel[];
  audienceSize?: AudienceSize;
  audienceNiche?: AudienceNiche;
}

export interface ServiceProviderData {
  serviceType: ServiceType;
  storeCreationFrequency: StoreCreationFrequency;
  employeeCount: EmployeeCount;
  servicesOffered: ServiceOffered[];
  clientsVolume: ClientsVolume;
  nuvemshopExperience: NuvemshopExperienceLevel;
  portfolioUrl: string;
}

export interface TechPartnerData {
  companyName: string;
  websiteUrl: string;
  country: string;
  companySize: CompanySize;
  solutionType: SolutionType;
  hasExistingProduct: boolean;
  existingPlatforms?: EcommercePlatformExperience[];
  solutionDescription: string;
}

export interface QualificationData {
  objective: Objective;
  email?: string;
  name?: string;
  country?: string;
  affiliateData?: AffiliateData;
  serviceProviderData?: ServiceProviderData;
  techPartnerData?: TechPartnerData;
}

export interface StepProps {
  onNext: () => void;
  onBack?: () => void;
}

export interface RadioOption<T extends string = string> {
  value: T;
  label: string;
  description?: string;
}

export interface CheckboxOption<T extends string = string> {
  value: T;
  label: string;
  description?: string;
}
