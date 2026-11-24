import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Linkedin, Mail, Phone } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { allMembers } from '../data/team';
import { getAttorneyBySlug, urlFor } from '../sanity';

function splitBio(bio: string): string[] {
  if (bio.includes('\n\n')) {
    const parts = bio.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
    if (parts.length >= 2) {
      return [parts[0], parts.slice(1).join('\n\n')];
    }
    return [parts[0] || bio, ''];
  }
  const sentences = bio.match(/[^.!?]+[.!?]+/g) ?? [bio];
  const mid = Math.ceil(sentences.length / 2);
  return [
    sentences.slice(0, mid).join('').trim(),
    sentences.slice(mid).join('').trim(),
  ].filter(Boolean);
}

export default function TeamMemberPage() {
  const { id } = useParams<{ id: string }>();
  const localMember = allMembers.find((m) => m.id === id);
  const [liveAttorney, setLiveAttorney] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    let active = true;
    getAttorneyBySlug(id).then((data) => {
      if (active && data) {
        setLiveAttorney(data);
      }
    });
    return () => {
      active = false;
    };
  }, [id]);

  const sanityCroppedUrl = liveAttorney?.image
    ? urlFor(liveAttorney.image)?.width(800).auto('format').quality(85).url()
    : null;
  const sanityHeroUrl = liveAttorney?.profileImage
    ? urlFor(liveAttorney.profileImage)?.width(1600).auto('format').quality(85).url()
    : null;

  const member = localMember
    ? {
        ...localMember,
        name: liveAttorney?.name || localMember.name,
        title: liveAttorney?.title || localMember.title,
        qualifications: liveAttorney?.qualifications ?? localMember.qualifications,
        bio: liveAttorney?.bio || localMember.bio,
        email: liveAttorney?.email || localMember.email,
        linkedin: liveAttorney?.linkedinUrl || localMember.linkedin,
        practiceAreas: liveAttorney?.practiceAreas?.length ? liveAttorney.practiceAreas : localMember.practiceAreas,
        image: sanityHeroUrl || liveAttorney?.profileImageUrl || localMember.profileImage || sanityCroppedUrl || liveAttorney?.imageUrl || localMember.image,
        hasNewPortrait: typeof liveAttorney?.hasNewPortrait === 'boolean' ? liveAttorney.hasNewPortrait : Boolean(localMember.hasNewPortrait),
        imageAlt: liveAttorney?.profileImageAlt || liveAttorney?.imageAlt || `${liveAttorney?.name || localMember.name} - ${liveAttorney?.title || localMember.title}`,
        seo: liveAttorney?.seo,
      }
    : liveAttorney
    ? {
        id: liveAttorney.slug,
        name: liveAttorney.name,
        title: liveAttorney.title || 'Attorney',
        qualifications: liveAttorney.qualifications || '',
        bio: liveAttorney.bio || '',
        email: liveAttorney.email || 'info@steinscop.com',
        linkedin: liveAttorney.linkedinUrl,
        practiceAreas: liveAttorney.practiceAreas || [],
        image: sanityHeroUrl || liveAttorney.profileImageUrl || sanityCroppedUrl || liveAttorney.imageUrl || '/logo-new.png',
        hasNewPortrait: Boolean(liveAttorney.hasNewPortrait),
        imageAlt: liveAttorney.profileImageAlt || liveAttorney.imageAlt || `${liveAttorney.name} - ${liveAttorney.title}`,
        seo: liveAttorney.seo,
      }
    : null;

  if (!member) {
    return (
      <main className="min-h-screen bg-brand-cream flex items-center justify-center">
        <Helmet>
          <title>Team Member Not Found | Stein Scop Attorneys</title>
        </Helmet>
        <div className="text-center space-y-4">
          <p className="text-brand-primary/40 uppercase tracking-widest text-xs">Profile not found</p>
          <Link to="/team" className="text-brand-accent underline text-sm">Back to Team</Link>
        </div>
      </main>
    );
  }

  const [firstPara, secondPara] = splitBio(member.bio);
  const defaultMetaTitle = `${member.name} | ${member.title} | Stein Scop Attorneys`;
  const defaultMetaDesc = member.bio.length > 155 ? `${member.bio.slice(0, 152).trim()}...` : member.bio;

  const metaTitle = member.seo?.metaTitle || defaultMetaTitle;
  const metaDescription = member.seo?.metaDescription || defaultMetaDesc;
  const ogImageUrl =
    member.seo?.ogImageUrl ||
    (member.image.startsWith('http') ? member.image : `https://www.steinscop.com${member.image}`);

  return (
    <main className="min-h-screen flex flex-col">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        {member.seo?.canonicalUrl && <link rel="canonical" href={member.seo.canonicalUrl} />}
        {member.seo?.noIndex && <meta name="robots" content="noindex, nofollow" />}
        {member.seo?.keywords?.length > 0 && <meta name="keywords" content={member.seo.keywords.join(', ')} />}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="profile" />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
        {member.seo?.structuredData && (
          <script type="application/ld+json">{member.seo.structuredData}</script>
        )}
      </Helmet>

      {/* ── Hero split ──────────────────────────────────────────────── */}
      <section
        className="flex flex-col md:flex-row min-h-[614px] relative overflow-hidden mt-[100px]"
        style={{ background: '#0a111a' }}
      >
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 min-w-0 p-8 sm:p-10 md:p-12 lg:p-16 xl:p-24 flex flex-col justify-center relative z-10"
        >
          <p className="text-brand-accent text-xs tracking-[0.3em] font-semibold uppercase mb-4">
            {member.title}
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-[2.5rem] lg:text-6xl xl:text-7xl font-serif text-white leading-tight mb-6 break-words">
            {member.name}
          </h1>

          <p className="text-white/40 text-sm tracking-widest uppercase mb-8">
            {member.qualifications}
          </p>

          <div className="w-12 h-px bg-white/20 mb-8" />

          <div className="flex flex-wrap gap-3 mb-12">
            {member.practiceAreas.map((area: string) => (
              <span
                key={area}
                className="px-4 py-1.5 rounded-full border border-white/20 text-xs tracking-wider text-white/60 uppercase hover:border-brand-accent transition-colors cursor-default"
              >
                {area}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-6 text-sm text-white/45">
            <a href={`mailto:${member.email}?subject=${encodeURIComponent(`Attention: ${member.name} — Legal Enquiry`)}&body=${encodeURIComponent(`Dear ${member.name},\n\n`)}`}
              className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={14} /> {member.email}
            </a>
            <a href="tel:+27113808080"
              className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={14} /> +27 (0)11 380 80 80
            </a>
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className="flex items-center gap-2 hover:text-brand-accent transition-colors"
              >
                <Linkedin size={14} /> LinkedIn Profile
              </a>
            )}
          </div>
        </motion.div>

        {/* Right: portrait */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`w-full md:w-1/2 relative overflow-hidden border-t md:border-t-0 md:border-l border-white/10 ${
            member.hasNewPortrait
              ? 'aspect-[3/2] md:aspect-auto md:min-h-[520px]'
              : 'min-h-[360px] md:min-h-[520px]'
          }`}
        >
          {member.hasNewPortrait ? (
            <img
              src={member.image}
              alt={member.imageAlt}
              decoding="async"
              className="w-full h-full object-cover object-[center_20%]"
            />
          ) : (
            <div
              className="w-full h-full min-h-[360px] md:min-h-[520px] flex flex-col items-center justify-center relative overflow-hidden px-6 select-none"
              style={{ background: 'radial-gradient(circle at 50% 45%, #8a7e68 0%, #6f6450 100%)', contain: 'layout paint' }}
            >
              <div className="ss-sheen-sweep absolute inset-0 w-[55%] pointer-events-none" />
              <img
                src="/stein-scop-knight-watermark.png"
                alt={`${member.name} - Stein Scop Attorneys`}
                decoding="async"
                width={161}
                height={260}
                className="ss-knight-breath w-28 h-auto opacity-[0.28] relative z-10"
              />
              <span className="mt-5 text-center text-[10px] uppercase tracking-[0.28em] font-semibold text-white/55 relative z-10">
                {member.name.split(' ')[0]}’s Updated Portrait Forthcoming
              </span>
            </div>
          )}
        </motion.div>
      </section>

      {/* ── Bio ─────────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-brand-border py-24 px-8 md:px-24 flex flex-col md:flex-row gap-12 flex-grow">
        <div className="w-full md:w-1/4 pt-1">
          <p className="text-brand-accent text-xs tracking-[0.2em] font-semibold uppercase sticky top-28">
            Profile
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full md:w-3/4 max-w-4xl space-y-6"
        >
          <p className="text-lg md:text-xl text-brand-primary font-normal leading-relaxed">
            {firstPara}
          </p>
          {secondPara && (
            <p className="text-base text-brand-primary/60 font-light leading-relaxed whitespace-pre-line">
              {secondPara}
            </p>
          )}

          <div className="flex gap-4 pt-6 border-t border-brand-border">
            <a
              href={`mailto:${member.email}?subject=${encodeURIComponent(`Attention: ${member.name} — Legal Enquiry`)}&body=${encodeURIComponent(`Dear ${member.name},\n\n`)}`}
              className="btn px-8 py-4 bg-brand-primary text-brand-cream uppercase tracking-[2px] text-[10px] font-bold rounded-full hover:bg-brand-accent transition-all duration-500"
            >
              Send an Email
            </a>
            <Link
              to="/team"
              className="btn px-8 py-4 border border-brand-border text-brand-primary uppercase tracking-[2px] text-[10px] font-bold rounded-full hover:border-brand-accent hover:text-brand-accent transition-all duration-500"
            >
              All Attorneys
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
