'use client';

import { motion } from 'framer-motion';
import { usePageBySlug } from '@/hooks/usePages';
import { PageBanner } from '@/components/pages/PageBanner';
import { RichTextRenderer } from '@/components/admin/pages/RichTextRenderer';
import { Loader2 } from 'lucide-react';

const SLUG = 'about';

const fallbackContent = {
  title: 'About Nutzera',
  description: 'Discover our journey towards healthier snacking.',
  heroBanner: '/images/about-hero.jpg',
  sections: [
    {
      id: 'story',
      title: 'Our Story',
      content: `Nutzera was born from a simple belief: snacking should be both delicious and nutritious. Founded in India, we set out to create premium snack bars that combine the goodness of natural ingredients with exceptional taste. Our journey began with a passion for health and a commitment to quality.`,
    },
    {
      id: 'mission',
      title: 'Our Mission',
      content: `To make healthy eating accessible, enjoyable, and sustainable. We believe that every bite should nourish your body while delighting your taste buds. Our mission is to transform the snacking industry by offering products that are as good for you as they taste.`,
    },
    {
      id: 'vision',
      title: 'Our Vision',
      content: `To become the most trusted name in healthy snacking, inspiring millions to make better food choices without compromising on taste or quality. We envision a world where nutritious food is the norm, not the exception.`,
    },
    {
      id: 'why-choose',
      title: 'Why Choose Nutzera',
      content: `We stand apart because of our unwavering commitment to quality. Every Nutzera product is crafted with carefully sourced ingredients, free from artificial preservatives, and designed to provide genuine nutritional benefits. We don't just make snacks — we create experiences that fuel your life.`,
    },
    {
      id: 'values',
      title: 'Our Values',
      items: [
        {
          title: 'Premium Ingredients',
          description: 'We source only the finest dates, nuts, and dark chocolate from trusted suppliers around the world.',
        },
        {
          title: 'Healthy Lifestyle',
          description: 'Every product is designed to support your wellness journey without sacrificing great taste.',
        },
        {
          title: 'Sustainability',
          description: 'We are committed to eco-friendly practices, from sourcing to packaging.',
        },
      ],
    },
  ],
};

export default function AboutPage() {
  const { data: page, isLoading } = usePageBySlug(SLUG);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-[#10B981]" />
      </div>
    );
  }

  const hasCmsContent = page?.content && page.content.trim().length > 0;

  return (
    <div>
      <PageBanner
        title={page?.title || fallbackContent.title}
        description={page?.description || fallbackContent.description}
        bannerImage={page?.bannerImage || fallbackContent.heroBanner}
      />

      {hasCmsContent ? (
        <section className="section-padding">
          <div className="mx-auto max-w-4xl px-6">
            <RichTextRenderer content={page!.content} />
          </div>
        </section>
      ) : (
        <>
          {/* Our Story */}
          <section className="section-padding">
            <div className="mx-auto max-w-7xl px-6">
              <div className="grid gap-12 lg:grid-cols-2 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-display mb-6">
                    Our Story
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {fallbackContent.sections[0].content}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Today, Nutzera is a trusted name in healthy snacking, with products available across India and beyond. Our commitment to quality and innovation continues to drive everything we do.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#10B981]/10 to-[#064E3B]/10 overflow-hidden">
                    <img
                      src="/images/about-story.jpg"
                      alt="Nutzera Story"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#10B981]/10 rounded-2xl -z-10" />
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#10B981]/5 rounded-2xl -z-10" />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="section-padding bg-gray-50">
            <div className="mx-auto max-w-7xl px-6">
              <div className="grid gap-8 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 font-display mb-4">
                    Our Mission
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {fallbackContent.sections[1].content}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center mb-4">
                    <span className="text-2xl">🔮</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 font-display mb-4">
                    Our Vision
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {fallbackContent.sections[2].content}
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Why Choose Nutzera */}
          <section className="section-padding">
            <div className="mx-auto max-w-7xl px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-display mb-4">
                  Why Choose Nutzera
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {fallbackContent.sections[3].content}
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-3">
                {(fallbackContent.sections[4].items as Array<{ title: string; description: string }>).map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center mb-4">
                      <span className="text-2xl">{i === 0 ? '🌿' : i === 1 ? '💪' : '♻️'}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="section-padding bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#10B981]">
            <div className="mx-auto max-w-4xl px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white font-display mb-4">
                  Ready to Experience Nutzera?
                </h2>
                <p className="text-white/80 mb-8 max-w-xl mx-auto">
                  Discover our range of premium, healthy snack bars crafted for modern lifestyles.
                </p>
                <a
                  href="/products"
                  className="inline-flex items-center px-8 py-3 bg-white text-[#10B981] font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Explore Products
                </a>
              </motion.div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
