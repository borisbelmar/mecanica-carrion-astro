import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { PortableTextBlock } from '@portabletext/types'

export const client = createClient({
  projectId: 'urovlws4',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-02-06',
})

export type Testimonial = {
  _id: string
  name: string
  bike: string
  quote: string
  instagram?: string
  avatar?: string
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const testimonials = await client.fetch('*[_type == "testimonial"]')
  return testimonials.map((testimonial: any) => ({
    ...testimonial,
    avatar: testimonial.avatar ? imageUrlBuilder(client).image(testimonial.avatar).url() : undefined,
  }))
}

export type Project = {
  _id: string
  title: string
  slug: { current: string }
  type: 'mantenimiento' | 'restauracion' | 'modificacion'
  model: string
  year: number
  publishedAt: string
  image?: string
  body?: PortableTextBlock[]
  gallery?: string[]
}


export async function fetchProjects(): Promise<Project[]> {
  const projects = await client.fetch('*[_type == "project"]{_id, title, slug, type, year, publishedAt, image}')
  return projects.map((project: any) => ({
    ...project,
    image: project.image ? imageUrlBuilder(client).image(project.image).url() : undefined,
    gallery: project.gallery ? project.gallery.map((img: any) => imageUrlBuilder(client).image(img).url()) : [],
  }))
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  const project = await client.fetch(`*[_type == "project" && slug.current == $slug][0]{_id, title, slug, type, model, year, publishedAt, image, body, gallery}`, { slug })
  if (!project) return null
  return {
    ...project,
    image: project.image ? imageUrlBuilder(client).image(project.image).url() : undefined,
    gallery: project.gallery ? project.gallery.map((img: any) => imageUrlBuilder(client).image(img).url()) : [],
  }
}

export type Brand = {
  _id: string
  name: string
  image: string
  link: string
}

export async function fetchBrands(): Promise<Brand[]> {
  const brands = await client.fetch('*[_type == "brand"]{_id, name, image, link}')
  return brands.map((brand: any) => ({
    ...brand,
    image: brand.image ? imageUrlBuilder(client).image(brand.image).url() : undefined,
  }))
}

export type HistoryBlock = {
  decade: string
  title: string
  subtitle: string
  description: string
  image: string
}

export type AboutPageData = {
  heroBadge: string
  heroTitle: string
  heroSubtitle: string
  heroImage: string
  sectionTitle: string
  sectionDescription: string
  historyBlocks: {
    decade: string
    title: string
    subtitle: string
    description: string
    image?: string
    images?: string[]
  }[]
  galleryTitle: string
  galleryDescription: string
  galleryImages: string[]
  ctaTitle: string
  ctaDescription: string
  primaryButtonText: string
  secondaryButtonText: string
}

export async function fetchHistory(): Promise<HistoryBlock[]> {
  const history = await client.fetch('*[_type == "historyBlock"]{decade, order, title, subtitle, description, image} | order(order asc)')
  history.forEach((block: any) => {
    block.image = block.image ? imageUrlBuilder(client).image(block.image).url() : undefined
  })
  return history
}

export async function fetchAboutPage(): Promise<AboutPageData> {
  const aboutPage = await client.fetch(`*[_type == "aboutPage"][0]{
    heroBadge,
    heroTitle,
    heroSubtitle,
    heroImage,
    sectionTitle,
    sectionDescription,
    historyBlock1,
    historyBlock2,
    historyBlock3,
    historyBlock4,
    galleryTitle,
    galleryDescription,
    galleyImages,
    ctaTitle,
    ctaDescription,
    primaryButtonText,
    secondaryButtonText
  }`)

  if (!aboutPage) {
    throw new Error('About page data not found in Sanity')
  }

  // Transform image URLs
  const heroImage = aboutPage.heroImage ? imageUrlBuilder(client).image(aboutPage.heroImage).url() : ''
  
  // Process history blocks
  const historyBlocks = []
  
  if (aboutPage.historyBlock1) {
    historyBlocks.push({
      ...aboutPage.historyBlock1,
      image: aboutPage.historyBlock1.image ? imageUrlBuilder(client).image(aboutPage.historyBlock1.image).url() : undefined
    })
  }
  
  if (aboutPage.historyBlock2) {
    historyBlocks.push({
      ...aboutPage.historyBlock2,
      image: aboutPage.historyBlock2.image ? imageUrlBuilder(client).image(aboutPage.historyBlock2.image).url() : undefined
    })
  }
  
  if (aboutPage.historyBlock3) {
    historyBlocks.push({
      ...aboutPage.historyBlock3,
      image: aboutPage.historyBlock3.image ? imageUrlBuilder(client).image(aboutPage.historyBlock3.image).url() : undefined
    })
  }
  
  if (aboutPage.historyBlock4) {
    historyBlocks.push({
      ...aboutPage.historyBlock4,
      images: aboutPage.historyBlock4.images ? aboutPage.historyBlock4.images.map((img: any) => imageUrlBuilder(client).image(img).url()) : undefined
    })
  }

  // Process gallery images
  const galleryImages = aboutPage.galleyImages ? aboutPage.galleyImages.map((img: any) => imageUrlBuilder(client).image(img).url()) : []

  return {
    heroBadge: aboutPage.heroBadge,
    heroTitle: aboutPage.heroTitle,
    heroSubtitle: aboutPage.heroSubtitle,
    heroImage,
    sectionTitle: aboutPage.sectionTitle,
    sectionDescription: aboutPage.sectionDescription,
    historyBlocks,
    galleryTitle: aboutPage.galleryTitle,
    galleryDescription: aboutPage.galleryDescription,
    galleryImages,
    ctaTitle: aboutPage.ctaTitle,
    ctaDescription: aboutPage.ctaDescription,
    primaryButtonText: aboutPage.primaryButtonText,
    secondaryButtonText: aboutPage.secondaryButtonText
  }
}
