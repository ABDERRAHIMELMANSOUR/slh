import { useLang } from '../context/LangContext'
import useSEO from '../hooks/useSEO'
import Layout from '../components/layout/Layout'
import Hero from '../components/home/Hero'
import { StatsStrip, HomeCEO, HomeServices, HomeTechnical, HomeHydrogenBanner, HomeContactCTA } from '../components/home/HomeSections'
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
      <HomeCEO/>
      <HomeServices/>
      <HomeHydrogenBanner/>
      <HomeProjects/>
      <HomeNews/>
      <HomePartners/>
      <HomeContactCTA/>
    </Layout>
  )
}
