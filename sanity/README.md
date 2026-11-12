# Stein Scop Attorneys — Sanity.io CMS & SEO Setup Guide

This guide explains how to connect your free **Sanity.io** account to this website, giving your SEO specialist an intuitive dashboard to manage metadata, copy, practice areas, and attorney profiles on the fly.

---

## 1. Quick Setup (2 Minutes)

### Step 1: Create a Free Sanity Account
1. Go to [https://www.sanity.io](https://www.sanity.io) and click **Sign Up** (free plan is more than enough).
2. Go to your dashboard at [https://www.sanity.io/manage](https://www.sanity.io/manage) and click **Create Project**.
3. Name your project (e.g. `Stein Scop Attorneys`).
4. Select the default dataset name: `production`.
5. Copy your **Project ID** (a 7-8 character alphanumeric code, e.g. `a1b2c3d4`).

### Step 2: Add Your Project ID to the Website
Open `.env.local` (and add to Vercel Environment Variables):
```env
VITE_SANITY_PROJECT_ID="your_project_id_here"
VITE_SANITY_DATASET="production"
VITE_SANITY_API_VERSION="2024-01-01"
```

---

## 2. Launching or Deploying the Sanity Studio

Your Studio schemas and configuration are fully set up in the `/sanity` folder:

### Option A: Free Cloud Hosting on `sanity.studio` (Recommended)
You can deploy the studio with one command to a free, secure URL (e.g. `https://steinscop.sanity.studio`):
```bash
npx sanity deploy
```
- It will prompt you for a studio hostname (e.g. `steinscop`).
- Once deployed, your SEO specialist can simply bookmark `https://steinscop.sanity.studio`, sign in with their email or Google account, and start editing!

### Option B: Run Locally
To run the studio locally on your computer:
```bash
npx sanity start
```
The studio will open at `http://localhost:3333`.

---

## 3. What the SEO Specialist Can Manage

The Studio includes purpose-built schemas tailored for legal practice and SEO:

### 1. **Pages & SEO (`page`)**
For each route (`home`, `about`, `practice-areas`, `careers`, `contact`):
- **Meta Title**: Custom title tag with a live warning if exceeding 60 characters.
- **Meta Description**: Search snippet with a live warning if exceeding 160 characters.
- **Social Share Image (OpenGraph)**: Custom 1200x630 share card for LinkedIn, WhatsApp, X, and Facebook.
- **Canonical URL Override**: To manage duplicate content or canonical targets.
- **NoIndex Toggle**: Checkbox to hide test or draft pages from Googlebot.
- **Hero Headings & Paragraphs**: Update the page's top headline and subtitle on the fly.

### 2. **Attorneys & Team (`attorney`)**
- Full Name, Role (Director, Consultant, Senior Associate, Associate, Candidate Attorney, Management).
- Academic Qualifications.
- Practice Area tags.
- Full Biography.
- Studio Portrait.
- Individual Profile Page SEO Title & Meta Description.

### 3. **Practice Areas (`practiceArea`)**
- Name, Category Tag, Scope sub-label.
- Capabilities summary and detailed copy.
- Cover photo and homepage sticky stack toggle.
- Individual practice area SEO tags.

### 4. **Global Firm Settings & SEO (`siteSettings`)**
- Default fallback Meta Title, Description, and Social Share Image.
- Firm Phone, Address, Office Hours, and Admissions Email.

---

## 4. Automatic Vercel Deploy Hook (Instant Publishing)

Because your website pre-renders static HTML for maximum Google ranking speed, you can connect Sanity directly to Vercel so that hitting **"Publish"** instantly updates the live website:

1. In your **Vercel Dashboard**, go to **Project Settings** → **Git** → scroll down to **Deploy Hooks**.
2. Click **Create Hook**, name it `Sanity CMS Publish`, and select the `main` branch.
3. Copy the generated webhook URL (e.g. `https://api.vercel.com/v1/integrations/deploy/prj_...`).
4. In your **Sanity Dashboard** ([https://www.sanity.io/manage](https://www.sanity.io/manage)):
   - Go to your Project → **API** → **Webhooks**.
   - Click **Add Webhook**.
   - Paste the Vercel Deploy Hook URL.
   - Set **Trigger on**: `Create`, `Update`, `Delete`.
   - Set **Filter**: `_type in ["page", "attorney", "practiceArea", "siteSettings"]`.
5. Done! Whenever your SEO specialist hits **"Publish"**, Vercel rebuilds and deploys the updated static HTML in ~45 seconds.

---

## 5. Graceful Fallback Guarantee

The website's client code (`src/sanity/api.ts`) contains built-in fallback logic:
- If `VITE_SANITY_PROJECT_ID` is empty or unconfigured, the website seamlessly serves the local `src/data/team.ts` and hardcoded static text.
- The website will **never crash or show blank pages**, ensuring complete stability during setup and deployment.
