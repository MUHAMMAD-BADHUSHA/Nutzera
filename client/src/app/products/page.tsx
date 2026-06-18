'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, Star, SlidersHorizontal, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { products } from '@/lib/admin-data'
import { ProductSliderBanner } from '@/components/sections/ProductSliderBanner'

const categories = ['All', 'Nut Bars', 'Chocolate Bars', 'Fruit Bites', 'Protein Bars']

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [sort, setSort] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = [...products].filter((p) => p.status === 'active')

    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory)
    }

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      )
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }

    return result
  }, [search, activeCategory, sort])

  return (
    <>
      <ProductSliderBanner />

      <section id="product-grid" className="bg-ivory">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16 lg:px-16 lg:py-20">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-display text-3xl text-dark md:text-4xl">Our Products</h1>
              <p className="mt-1 text-sm text-text-muted">
                {filtered.length} product{filtered.length !== 1 && 's'} available
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-xl border border-border bg-white py-2.5 pl-10 pr-4 text-sm text-dark outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 md:w-56"
                />
              </div>

              <div className="relative hidden md:block">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none rounded-xl border border-border bg-white px-4 py-2.5 pr-10 text-sm text-dark outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name: A-Z</option>
                </select>
                <SlidersHorizontal className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-dark transition-all hover:border-primary md:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden md:hidden"
              >
                <div className="rounded-2xl border border-border bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-dark">Sort By</span>
                    <button onClick={() => setShowFilters(false)}>
                      <X className="h-4 w-4 text-text-muted" />
                    </button>
                  </div>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm text-dark outline-none focus:border-primary"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name">Name: A-Z</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'rounded-full px-5 py-2 text-sm font-medium transition-all',
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white text-text-muted hover:text-dark border border-border',
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <ShoppingBag className="mb-4 h-12 w-12 text-text-muted" />
              <h3 className="text-lg font-semibold text-dark">No products found</h3>
              <p className="mt-1 text-sm text-text-muted">Try adjusting your search or filter.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-white/60 backdrop-blur-sm">
                          <ShoppingBag className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-xs font-medium text-primary">{product.category}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>

                  <div className="p-5">
                    <div className="mb-2 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            'h-3.5 w-3.5',
                            star <= 4 ? 'fill-gold text-gold' : 'fill-gray-200 text-gray-200',
                          )}
                        />
                      ))}
                      <span className="ml-1 text-xs text-text-muted">(24)</span>
                    </div>

                    <h3 className="font-display text-lg font-semibold text-dark transition-colors group-hover:text-primary">
                      {product.name}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-text-muted">
                      {product.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xl font-bold text-dark">${product.price.toFixed(2)}</span>
                      <button className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-primary-dark">
                        <ShoppingBag className="h-3.5 w-3.5" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
