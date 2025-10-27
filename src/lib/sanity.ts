import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { PortableTextBlock } from '@portabletext/types'

export const client = createClient({
  projectId: 'urovlws4',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-02-06',
})

// Safe image URL builder that handles broken/missing images
function safeImageUrl(imageRef: any): string | undefined {
  if (!imageRef) return undefined
  
  try {
    // Check if the image reference has the required properties
    if (!imageRef._type || imageRef._type !== 'image') {
      console.warn('Invalid image reference:', imageRef)
      return undefined
    }
    
    // Check if asset reference exists
    if (!imageRef.asset || !imageRef.asset._ref) {
      console.warn('Missing asset reference:', imageRef)
      return undefined
    }
    
    // Additional check for _upload objects (broken uploads)
    if (imageRef._upload) {
      console.warn('Broken upload reference found:', imageRef)
      return undefined
    }
    
    return imageUrlBuilder(client).image(imageRef).url()
  } catch (error) {
    console.warn('Failed to generate image URL:', error, imageRef)
    return undefined
  }
}

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
    avatar: safeImageUrl(testimonial.avatar),
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
    image: safeImageUrl(project.image),
    gallery: project.gallery ? project.gallery.map((img: any) => safeImageUrl(img)).filter(Boolean) : [],
  }))
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  const project = await client.fetch(`*[_type == "project" && slug.current == $slug][0]{_id, title, slug, type, model, year, publishedAt, image, body, gallery}`, { slug })
  if (!project) return null
  return {
    ...project,
    image: safeImageUrl(project.image),
    gallery: project.gallery ? project.gallery.map((img: any) => safeImageUrl(img)).filter(Boolean) : [],
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
    image: safeImageUrl(brand.image),
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
    block.image = safeImageUrl(block.image)
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
  const heroImage = safeImageUrl(aboutPage.heroImage) || ''
  
  // Process history blocks
  const historyBlocks = []
  
  if (aboutPage.historyBlock1) {
    historyBlocks.push({
      ...aboutPage.historyBlock1,
      image: safeImageUrl(aboutPage.historyBlock1.image)
    })
  }
  
  if (aboutPage.historyBlock2) {
    historyBlocks.push({
      ...aboutPage.historyBlock2,
      image: safeImageUrl(aboutPage.historyBlock2.image)
    })
  }
  
  if (aboutPage.historyBlock3) {
    historyBlocks.push({
      ...aboutPage.historyBlock3,
      image: safeImageUrl(aboutPage.historyBlock3.image)
    })
  }
  
  if (aboutPage.historyBlock4) {
    historyBlocks.push({
      ...aboutPage.historyBlock4,
      images: aboutPage.historyBlock4.images ? aboutPage.historyBlock4.images.map((img: any) => safeImageUrl(img)).filter(Boolean) : undefined
    })
  }

  // Process gallery images
  const galleryImages = aboutPage.galleyImages ? aboutPage.galleyImages.map((img: any) => safeImageUrl(img)).filter(Boolean) : []

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
