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
