/**
 * GROQ Queries for Stein Scop Attorneys Sanity CMS
 */

export const PAGE_SEO_QUERY = `
  *[_type == "page" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    heroTag,
    heroTitle,
    heroSubtitle,
    seo {
      metaTitle,
      metaDescription,
      canonicalUrl,
      noIndex,
      keywords,
      structuredData,
      "ogImageUrl": ogImage.asset->url,
      "ogImageAlt": ogImage.alt
    }
  }
`;

export const ALL_PAGES_QUERY = `
  *[_type == "page"] {
    title,
    "slug": slug.current,
    seo {
      metaTitle,
      metaDescription,
      canonicalUrl,
      noIndex,
      structuredData
    }
  }
`;

export const ATTORNEYS_QUERY = `
  *[_type == "attorney"] | order(order asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    title,
    qualifications,
    email,
    practiceAreas,
    bio,
    image,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    seo {
      metaTitle,
      metaDescription,
      "ogImageUrl": ogImage.asset->url,
      "ogImageAlt": ogImage.alt
    }
  }
`;

export const ATTORNEY_BY_SLUG_QUERY = `
  *[_type == "attorney" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    title,
    qualifications,
    email,
    practiceAreas,
    bio,
    image,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    seo {
      metaTitle,
      metaDescription,
      canonicalUrl,
      noIndex,
      keywords,
      structuredData,
      "ogImageUrl": ogImage.asset->url,
      "ogImageAlt": ogImage.alt
    }
  }
`;

export const PRACTICE_AREAS_QUERY = `
  *[_type == "practiceArea"] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    tag,
    detail,
    desc,
    featuredOnHome,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    seo {
      metaTitle,
      metaDescription
    }
  }
`;

export const CAREER_PROGRAMMES_QUERY = `
  *[_type == "careerProgramme" && active != false] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    statusBadge,
    location,
    duration,
    audience,
    notice,
    description,
    admissionsEmail,
    emailSubject,
    emailBody,
    active,
    order
  }
`;

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    firmName,
    telephone,
    infoEmail,
    admissionsEmail,
    physicalAddress,
    officeHours,
    linkedinUrl,
    googleSiteVerification,
    googleAnalyticsId,
    robotsTxt,
    defaultSeo {
      metaTitle,
      metaDescription,
      canonicalUrl,
      noIndex,
      keywords,
      structuredData,
      "ogImageUrl": ogImage.asset->url
    }
  }
`;

export const REDIRECTS_QUERY = `
  *[_type == "redirect" && defined(source) && defined(destination)] {
    _id,
    source,
    destination,
    permanent
  }
`;

