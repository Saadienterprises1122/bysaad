export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

export interface ServicePricing {
  service: 'Web Development' | 'Graphic Design' | 'Data Analysis';
  plans: PricingPlan[];
}

export interface PricingProps {}
