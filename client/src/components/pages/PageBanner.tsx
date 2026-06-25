'use client';

import { motion } from 'framer-motion';

interface PageBannerProps {
  title: string;
  description?: string;
  bannerImage?: string;
}

export function PageBanner({ title, description, bannerImage }: PageBannerProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#10B981] py-20 md:py-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, white 2%, transparent 0%)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {bannerImage && (
            <div className="mb-8 flex justify-center">
              <div className="w-full max-w-4xl h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={bannerImage}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display mb-4">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L48 52C96 44 192 28 288 20C384 12 480 12 576 16C672 20 768 28 864 32C960 36 1056 36 1152 32C1248 28 1344 20 1392 16L1440 12V60H1392C1344 60 1248 60 1152 60C1056 60 960 60 864 60C768 60 672 60 576 60C480 60 384 60 288 60C192 60 96 60 48 60H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
