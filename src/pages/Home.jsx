import { useLang } from '../context/LangContext'
import useSEO from '../hooks/useSEO'
import Layout from '../components/layout/Layout'
import Hero from '../components/home/Hero'
/* The founder profile (HomeCEO) is deliberately not on the homepage — Nouraddine Gribi
   is featured on the About page only. */
import { StatsStrip, HomeServices, HomeTechnical, HomeHydrogenBanner, HomeContactCTA } from '../components/home/HomeSections'
import HomeProjects, { HomeNews, HomePartners } from '../components/home/HomeProjects'
import { organizationSchema, websiteSchema } from '../lib/schema'

export default function Home() {
  const { t, lang } = useLang()
  useSEO({
    lang,
    pageKey: 'home',
    title: t.seo.home.title,
    description: t.seo.home.description,
    jsonLd: [organizationSchema(lang), websiteSchema(lang)],
  })
  return (
    <Layout>
      <Hero/>
      <StatsStrip/>
      <HomeTechnical/>
      <HomeServices/>
      <HomeHydrogenBanner/>
      <HomeProjects/>
      <HomeNews/>
      <HomePartners/>
      <HomeContactCTA/>
    </Layout>
  )
}
