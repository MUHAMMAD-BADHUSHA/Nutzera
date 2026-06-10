export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  ingredients: string[]
  image: string
  color: string
}

export interface Ingredient {
  name: string
  benefit: string
  image: string
}

export interface Benefit {
  title: string
  description: string
  icon: string
}

export interface TimelineStep {
  step: number
  title: string
  description: string
}

export interface Testimonial {
  name: string
  role: string
  content: string
  avatar: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface ComparisonItem {
  label: string
  left: number
  right: number
}
