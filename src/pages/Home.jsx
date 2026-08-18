import { useLang } from '../context/LangContext'
import useSEO from '../hooks/useSEO'
import Layout from '../components/layout/Layout'
import Hero from '../components/home/Hero'
/* The founder profile (HomeCEO) is deliberately not on the homepage — Nouraddine Gribi
   is featured on the About page only. */
import { StatsStrip, HomeServices, HomeTechnical, HomeHydrogenBanner, HomeContactCTA } from '../components/home/HomeSections'
import HomeProjects, { HomeNews, HomePartners } from '../components/home/HomeProjects'
import useSchema from '../hooks/useSchema'

export default function Home() {
  const { t, lang } = useLang()
  const schema = useSchema()
  useSEO({
    lang,
    pageKey: 'home',
    title: t.seo.home.title,
    description: t.seo.home.description,
    jsonLd: [schema.organization(), schema.website()],
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
