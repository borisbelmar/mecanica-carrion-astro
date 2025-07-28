import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

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
