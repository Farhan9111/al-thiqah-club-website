# Al Thiqah Club for Disabled - Project Context

## Project Overview
- **Client**: Al Thiqah Club for Disabled (نادي الثقة لذوي الإعاقة)
- **Developer**: [User]
- **Status**: Website rebuild project (replacing outdated existing site)
- **New Logo**: Yes - updated branding to be reflected
- **Type**: Main organizational website

## Goals
- Replace outdated existing website
- Reflect new Al Thiqah Club branding/logo
- Modern, accessible, bilingual (EN/AR) web presence
- Support the organization's mission for people with disabilities

## Technology Stack

### Frontend
- **Framework**: React 18
- **Language**: TypeScript (Strict Mode)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **Animation**: Framer Motion
- **Icons**: Lucide React

### Backend & Services (To Be Implemented)
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel (primary), GitHub Pages (mirror/backup)
- **Forms**: Need integration (see Requirements)

### Form Submission Requirements
Forms must support:
- [ ] Backend API submission (REST API)
- [ ] Email notifications
- [ ] Database storage

**Forms to implement:**
1. Volunteer Application
2. Membership Application
3. Corporate Sponsorship
4. Contact Form

## Assets
- **Images**: Real images available for replacement
- **Current state**: Using placeholder images (picsum.photos)
- **Action needed**: Replace with actual Al Thiqah Club assets

## Deployment Strategy
- **Primary**: Vercel (serverless, edge-cached)
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **Source Control**: GitHub
- **Future**: Local cloud service (to be evaluated)

## Definition of Done
- [ ] All pages functional with real content
- [ ] New logo integrated throughout
- [ ] Form submissions working (API + email + database)
- [ ] Real images replacing placeholders
- [ ] Deployed to production (Vercel + Supabase)
- [ ] Accessibility audit passed (WCAG 2.1 AA minimum)
- [ ] Bilingual support complete (EN/AR)

## Maintenance
- **Type**: Long-term organizational website
- **Maintenance model**: Ongoing updates and improvements expected

## Project Structure
```
├── components/          # Reusable UI components
├── pages/               # Route-level page components
├── contexts/            # React Context (LanguageProvider)
├── utils/               # Utilities and constants
├── types.ts             # Global TypeScript interfaces
├── App.tsx              # Router and layout
└── index.tsx            # Entry point
```

## Assets Location
**Path**: `Brand-asset/`
```
Brand-asset/
├── Logo.png                          # Main logo
├── Logo without text.png             # Icon only
├── Only text.png                     # Wordmark only
└── images/
    ├── athletes/                     # 20+ athlete photos (1.png - 20.png, girl-running.jpeg)
    ├── brand/                        # Brand assets (Logo variations)
    ├── facilities/                   # Gym, wheelchair basketball (3 images)
    └── history/                      # Historic victory photos (2 images)
```
**Total Images**: ~28 images across 4 categories
**Status**: Organized, ready for integration

## Deployment Strategy (Updated)
- **Primary**: Vercel (serverless, edge-cached)
- **Staging**: Vercel subdomain (althiqah-club.vercel.app) — *immediate*
- **Production Domain**: Custom domain (TBD — althiqahclub.ae or similar)
- **Database**: Supabase (PostgreSQL + Auth + Storage) — *to be created*
- **Source Control**: GitHub — *not yet initialized*
- **Email Service**: Resend (free tier: 3,000 emails/month)
- **Future**: Local cloud service (to be evaluated)
- **CMS**: Needed for admin, media, and other departments (Phase 2)

## GitHub & Vercel Setup
- **Status**: Not yet initialized
- **Next Steps**:
  1. Initialize git repository
  2. Create GitHub repo: `al-thiqah-club-website`
  3. Import to Vercel
  4. Connect custom domain

## Form Data Retention
- **Active**: 1 year in primary database
- **Archive**: After 1 year, move to cold storage
- **Compliance**: GDPR-ready deletion policies

## Admin & CMS Requirements (Phased)
- **Phase 1** (Now): Email notifications via Resend
- **Phase 2** (Post-launch): Admin dashboard for form submissions
- **Phase 3** (Future): Full CMS for content management across departments

## Final Decisions (Locked)

| Decision | Choice |
|----------|--------|
| GitHub Repo | `al-thiqah-club-website` |
| Production Domain | `althiqahclub.com` |
| Supabase Region | Mumbai (ap-south-1) |
| CMS Scope | Content editing for non-technical staff (Phase 2) |
| Form Flow | Save → Email admin → Show success + optional auto-reply |
| Execution Order | E → A → B → C → D (staging → git → images → supabase → forms) |

## Execution Plan

### Phase 1: Staging Deployment (NOW)
- [ ] Initialize git repository
- [ ] Create GitHub repo: `al-thiqah-club-website`
- [ ] Push code to GitHub
- [ ] Deploy to Vercel (staging)

### Phase 2: Image Integration
- [ ] Copy Brand-asset images to public/assets/
- [ ] Update utils/assets.ts with real image paths
- [ ] Replace placeholder URLs in pages

### Phase 3: Supabase Setup
- [ ] Create Supabase project (Mumbai region)
- [ ] Design database schema for forms
- [ ] Create tables: volunteers, members, sponsors, contacts

### Phase 4: Form Backend
- [ ] Create API endpoints for form submission
- [ ] Integrate Resend for email notifications
- [ ] Add form validation and error handling

### Phase 5: Production
- [ ] Configure custom domain (althiqahclub.com)
- [ ] SSL certificate
- [ ] Performance optimization

## Notes
- Built with accessibility-first approach
- RTL support for Arabic language
- Responsive design (mobile-first)
- WCAG 2.1 AAA compliance target
- ~28 real images ready for integration
