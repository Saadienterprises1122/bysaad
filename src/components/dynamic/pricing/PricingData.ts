import { ServicePricing } from './PricingTypes';

export const PRICING_DATA: ServicePricing[] = [
  {
    service: 'Web Development',
    plans: [
      {
        name: 'Basic Website',
        price: '$500',
        features: [
          'Up to 5 pages',
          'Responsive design',
          'Basic SEO optimization',
          'Contact form integration',
          '1 month support',
          'Mobile-friendly'
        ]
      },
      {
        name: 'Business Website',
        price: '$1,500',
        features: [
          'Up to 15 pages',
          'Custom design',
          'Advanced SEO',
          'CMS integration',
          'Analytics setup',
          '3 months support',
          'Performance optimization',
          'Social media integration'
        ],
        highlighted: true
      },
      {
        name: 'E-Commerce',
        price: '$3,000',
        features: [
          'Unlimited pages',
          'Product catalog',
          'Payment gateway integration',
          'Inventory management',
          'Customer accounts',
          '6 months support',
          'Advanced security',
          'Marketing tools'
        ]
      }
    ]
  },
  {
    service: 'Graphic Design',
    plans: [
      {
        name: 'Starter Pack',
        price: '$200',
        features: [
          'Logo design (3 concepts)',
          'Business card design',
          '2 revisions',
          'Source files included',
          '7-day delivery'
        ]
      },
      {
        name: 'Brand Identity',
        price: '$800',
        features: [
          'Logo design (5 concepts)',
          'Business card & letterhead',
          'Social media templates',
          'Brand style guide',
          'Unlimited revisions',
          '14-day delivery',
          'Print-ready files'
        ],
        highlighted: true
      },
      {
        name: 'Complete Branding',
        price: '$2,000',
        features: [
          'Full brand identity',
          'Marketing collateral',
          'Packaging design',
          'Website graphics',
          'Social media kit',
          'Unlimited revisions',
          '30-day delivery',
          'Dedicated support'
        ]
      }
    ]
  },
  {
    service: 'Data Analysis',
    plans: [
      {
        name: 'Basic Analysis',
        price: '$400',
        features: [
          'Data cleaning',
          'Descriptive statistics',
          'Basic visualizations',
          '1 dashboard',
          'Summary report',
          '1 week delivery'
        ]
      },
      {
        name: 'Business Intelligence',
        price: '$1,200',
        features: [
          'Advanced data modeling',
          'Interactive dashboards',
          'Trend analysis',
          'Predictive insights',
          'Custom reports',
          '2 weeks delivery',
          'Training session included'
        ],
        highlighted: true
      },
      {
        name: 'Enterprise Analytics',
        price: '$3,500',
        features: [
          'Complete data pipeline',
          'Real-time dashboards',
          'Machine learning models',
          'API integration',
          'Automated reporting',
          '1 month delivery',
          'Ongoing consultation',
          'Priority support'
        ]
      }
    ]
  }
];
