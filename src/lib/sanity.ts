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
    
    // Check if asset reference exists - handle both _ref and expanded asset object
    if (!imageRef.asset) {
      console.warn('Missing asset reference:', imageRef)
      return undefined
    }
    
    // If we have an expanded asset with URL, use it directly
    if (imageRef.asset.url) {
      return imageRef.asset.url
    }
    
    // If we have a reference (_ref), use the image builder
    if (imageRef.asset._ref) {
      return imageUrlBuilder(client).image(imageRef).url()
    }
    
    // If we have an _id, construct reference object for image builder
    if (imageRef.asset._id) {
      const refObj = {
        ...imageRef,
        asset: {
          _ref: imageRef.asset._id,
          _type: 'reference'
        }
      }
      return imageUrlBuilder(client).image(refObj).url()
    }
    
    // Additional check for _upload objects (broken uploads)
    if (imageRef._upload) {
      console.warn('Broken upload reference found:', imageRef)
      return undefined
    }
    
    console.warn('Missing asset reference or URL:', imageRef)
    return undefined
    
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

export type Service = {
  icon: string
  title: string
  description: string
  bgImage: string
  slug: string
}

export type WorkshopGallery = {
  title: string
  description: string
  images: string[]
}

export type ProcessStep = {
  step: string
  title: string
  description: string
}

export type ServicesPageData = {
  heroTitle: string
  heroSubtitle: string
  services: Service[]
  workshopGallery: WorkshopGallery
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export type HomePageHero = {
  video: string
  mainTitle: string
  subtitle: string
  buttonText: string
  buttonUrl: string
}

export type HomePageWhySection = {
  title: string
  paragraphs: string[]
  image: string
}

export type HomePageService = {
  icon: string
  title: string
  description: string
}

export type HomePageServicesSection = {
  title: string
  description: string
  backgroundImage: string
  services: HomePageService[]
}

export type HomePageProcessStep = {
  icon: string
  title: string
  description: string
}

export type HomePageProcessSection = {
  title: string
  description: string
  steps: HomePageProcessStep[]
}

export type HomePageWorkshopSection = {
  title: string
  paragraphs: string[]
  buttonText: string
  buttonUrl: string
  images: string[]
}

export type HomePageData = {
  hero: HomePageHero
  whySection: HomePageWhySection
  servicesSection: HomePageServicesSection
  processSection: HomePageProcessSection
  workshopSection: HomePageWorkshopSection
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
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

export async function fetchServicesPage(): Promise<ServicesPageData> {
  const servicesPage = await client.fetch(`*[_type == "servicesPage"][0]{
    heroTitle,
    heroSubtitle,
    services[]{
      icon,
      title,
      description,
      bgImage{
        _type,
        asset->{
          _id,
          url
        },
        hotspot,
        crop,
        alt
      },
      slug
    },
    workshopGallery{
      title,
      description,
      images[]{
        _type,
        asset->{
          _id,
          url
        },
        hotspot,
        crop,
        alt
      }
    },
    seo{
      metaTitle,
      metaDescription
    }
  }`)

  if (!servicesPage) {
    throw new Error('Services page data not found in Sanity')
  }

  // Transform services with safe image URLs
  const services = servicesPage.services ? servicesPage.services.map((service: any) => ({
    ...service,
    bgImage: safeImageUrl(service.bgImage) || ''
  })) : []

  // Transform workshop gallery images
  const workshopGallery = servicesPage.workshopGallery ? {
    ...servicesPage.workshopGallery,
    images: servicesPage.workshopGallery.images ? 
      servicesPage.workshopGallery.images.map((img: any) => safeImageUrl(img)).filter(Boolean) : []
  } : {
    title: '',
    description: '',
    images: []
  }

  return {
    heroTitle: servicesPage.heroTitle || 'Servicios',
    heroSubtitle: servicesPage.heroSubtitle || 'Más de 20 años perfeccionando el arte de la mecánica',
    services,
    workshopGallery,
    seo: servicesPage.seo
  }
}

export async function fetchHomePage(): Promise<HomePageData> {
  const homePage = await client.fetch(`*[_type == "homePage"][0]{
    hero{
      video{
        _type,
        asset->{
          _id,
          url
        }
      },
      mainTitle,
      subtitle,
      buttonText,
      buttonUrl
    },
    whySection{
      title,
      paragraphs,
      image{
        _type,
        asset->{
          _id,
          url
        },
        hotspot,
        crop,
        alt
      }
    },
    servicesSection{
      title,
      description,
      backgroundImage{
        _type,
        asset->{
          _id,
          url
        },
        hotspot,
        crop,
        alt
      },
      services[]{
        icon,
        title,
        description
      }
    },
    processSection{
      title,
      description,
      steps[]{
        icon,
        title,
        description
      }
    },
    workshopSection{
      title,
      paragraphs,
      buttonText,
      buttonUrl,
      images[]{
        _type,
        asset->{
          _id,
          url
        },
        hotspot,
        crop,
        alt
      }
    },
    seo{
      metaTitle,
      metaDescription
    }
  }`)

  if (!homePage) {
    throw new Error('Home page data not found in Sanity')
  }

  // Helper function to get file URL (for video)
  const getFileUrl = (fileRef: any): string => {
    if (!fileRef || !fileRef.asset) return ''
    return fileRef.asset.url || ''
  }

  return {
    hero: {
      video: getFileUrl(homePage.hero?.video) || '/videos/home-video.mp4',
      mainTitle: homePage.hero?.mainTitle || 'Pasión que ruge. \n Mecánica con historia.',
      subtitle: homePage.hero?.subtitle || 'Desde hace tres generaciones.',
      buttonText: homePage.hero?.buttonText || 'Ver nuestros proyectos',
      buttonUrl: homePage.hero?.buttonUrl || '/proyectos'
    },
    whySection: {
      title: homePage.whySection?.title || 'No somos solo un taller.',
      paragraphs: homePage.whySection?.paragraphs || [
        'Somos una familia que lleva tres generaciones viviendo la mecánica como forma de vida. Aquí, cada moto que entra es tratada como si fuera nuestra.',
        'Porque no reparamos por rutina. Lo hacemos por pasión. Porque entendemos lo que significa esa moto para ti: libertad, carácter y una historia que continúa.'
      ],
      image: safeImageUrl(homePage.whySection?.image) || '/images/reason-why.png'
    },
    servicesSection: {
      title: homePage.servicesSection?.title || 'Nuestros Servicios',
      description: homePage.servicesSection?.description || 'En Mecánica Carrión, ofrecemos un servicio integral para tu moto, desde el mantenimiento preventivo hasta modificaciones personalizadas.',
      backgroundImage: safeImageUrl(homePage.servicesSection?.backgroundImage) || '/images/services.webp',
      services: homePage.servicesSection?.services || [
        { icon: 'gauge', title: 'Mantenimiento', description: 'Deja tu moto al día con diagnósticos precisos y cuidado profesional.' },
        { icon: 'sparkles', title: 'Restauración', description: 'Rescatamos la esencia original y devolvemos la gloria a tu moto.' },
        { icon: 'wrench', title: 'Modificaciones', description: 'Creamos motos únicas que reflejan tu personalidad y estilo.' }
      ]
    },
    processSection: {
      title: homePage.processSection?.title || 'Nuestro Proceso',
      description: homePage.processSection?.description || 'En Mecánica Carrión, seguimos un proceso claro y transparente para garantizar la satisfacción de nuestros clientes.',
      steps: homePage.processSection?.steps || [
        { icon: 'clipboardList', title: 'Diagnóstico', description: 'Revisamos tu moto contigo y evaluamos el trabajo necesario.' },
        { icon: 'fileText', title: 'Presupuesto', description: 'Te entregamos una propuesta clara, justa y sin sorpresas.' },
        { icon: 'hammer', title: 'Trabajo en marcha', description: 'Comenzamos a trabajar y te mantenemos informado del progreso.' },
        { icon: 'checkCircle2', title: 'Entrega', description: 'Recibes tu moto lista para rugir otra vez. Garantía incluida.' }
      ]
    },
    workshopSection: {
      title: homePage.workshopSection?.title || 'Nuestro Taller',
      paragraphs: homePage.workshopSection?.paragraphs || [
        'Aquí es donde todo sucede. Un taller lleno de herramientas, historia, grasa, y muchas motos que han pasado por nuestras manos.',
        'Es un espacio que respira mecánica, donde el pasado y el futuro se cruzan. Ven a conocerlo, y a vivir la experiencia Carrión.'
      ],
      buttonText: homePage.workshopSection?.buttonText || 'Conocer más',
      buttonUrl: homePage.workshopSection?.buttonUrl || '/quienes-somos',
      images: homePage.workshopSection?.images ? 
        homePage.workshopSection.images.map((img: any) => safeImageUrl(img)).filter(Boolean) : 
        ['/images/taller-1.webp', '/images/taller-2.webp', '/images/taller-3.webp']
    },
    seo: homePage.seo
  }
}
