# Partner Qualification Flow

Multi-step qualification flow for the [Nuvemshop Partner Portal](https://partners.nuvemshop.com.br). Classifies, qualifies and collects relevant data from new partners based on their desired partnership type.

**Live:** https://qualification-flow.vercel.app
**Docs:** https://qualification-flow.vercel.app/flow
**PRD:** [Google Docs](https://docs.google.com/document/d/1q8aNW4S73L3CIKRF6QRonSongQZljP-o/edit)

---

## Overview

After signing up on the Partner Portal, users are guided through a qualification form tailored to their profile:

```
Partner Portal → Signup → "Qual e seu objetivo?" → Track-specific Form → Partner Portal Access
                                                                         ↳ Partner Program Review (parallel)
```

### Partner Tracks

| Track | Steps | Target |
|-------|-------|--------|
| **Tech Partner** | 5 | Developers building apps, themes, integrations or ERP/CRM connectors |
| **Agency Partner** | 8 | Agencies, freelancers and consultants offering e-commerce services |
| **Affiliate** | 10 | Content creators, influencers and educators driving referrals |
| **Merchant** | redirect | Users who want to create a store (redirected to merchant signup) |

### Tech Partner (5 steps)
1. Objective (shared) - Partnership type selection
2. Company - Name, website, country, team size
3. Solution Type - App, theme, integration, ERP/CRM
4. Experience - Previous platforms (Shopify, VTEX, WooCommerce, etc.)
5. Description - Free-text solution description

### Agency Partner (8 steps)
1. Objective (shared)
2. Provider Type - Agency, freelancer, consultant, developer, traffic manager
3. Store Implementation - Frequency of store creation
4. Team Size - Number of employees
5. Services Offered - Multi-select (design, marketing, SEO, development, etc.)
6. Website / Instagram - Portfolio URL
7. Monthly Store Volume - Stores created per month
8. Nuvemshop Experience - Platform familiarity level

### Affiliate (10 steps)
1. Objective (shared)
2. Content Platforms - Up to 3 platforms (YouTube, Instagram, TikTok, Blog, etc.)
3. Website / Social + Audience Size - URL and audience range (dropdown)
4. Ready to Refer - Has clients or referrals in mind
5. Monetization - How they earn today (multi-select)
6. Authority - Training/mentoring background
7. Closed Communities - WhatsApp groups, newsletters, private groups
8. E-commerce Experience - Platform familiarity
9. Audience Niche - E-commerce, entrepreneurship, marketing, etc.
10. Program Expectations - What they seek (multi-select)

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Design System:** [Nimbus DS](https://github.com/TiendaNube/nimbus-design-system) (used in `/signup`)
- **Forms:** React Hook Form + Zod
- **Deploy:** Vercel

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main qualification flow (Tailwind)
│   ├── signup/page.tsx       # Nimbus Design System version
│   ├── flow/page.tsx         # Visual documentation & diagrams
│   └── layout.tsx            # Root layout
├── components/
│   ├── steps/                # 23 step components
│   │   ├── ObjectiveStep.tsx           # Shared first step
│   │   ├── ContentPlatformStep.tsx     # Affiliate
│   │   ├── MonetizationStep.tsx        # Affiliate
│   │   ├── NuvemshopExperienceStep.tsx # Agency
│   │   ├── TechSolutionTypeStep.tsx    # Tech
│   │   ├── WhatsAppStep.tsx            # Shared last step
│   │   └── ...
│   └── ui/                   # Reusable UI components
│       ├── RadioGroup.tsx
│       ├── CheckboxGroup.tsx
│       ├── PhoneInput.tsx
│       └── ProgressBar.tsx
├── types/
│   └── qualification.ts      # All TypeScript types & interfaces
└── lib/
    ├── analytics.ts
    ├── onboarding.ts
    └── submission.ts
```

---

## Data Model

```typescript
interface QualificationData {
  objective: 'tech_partner' | 'service_provider' | 'affiliate' | 'create_store';
  whatsapp: string;
  techPartnerData?: TechPartnerData;
  serviceProviderData?: ServiceProviderData;
  affiliateData?: AffiliateData;
}
```

Full type definitions in [`src/types/qualification.ts`](src/types/qualification.ts).

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) for the main flow, [/signup](http://localhost:3000/signup) for the Nimbus version, or [/flow](http://localhost:3000/flow) for documentation.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Main qualification flow (Tailwind CSS + Framer Motion) |
| `/signup` | Alternative flow using Nimbus Design System |
| `/flow` | Visual documentation with SVG diagrams, step details, data model |

---

## Integration

Qualification data is structured for **HubSpot** integration:

- **Contact** creation with email, name, WhatsApp
- **Deal** creation in the corresponding pipeline (Tech / Agency / Affiliate)
- **Custom properties** mapped per partner type
- **Lifecycle stages:** Subscriber → Lead → MQL (after review)
- Deduplication by email

---

## License

Internal project - Nuvemshop Ecosystem.
