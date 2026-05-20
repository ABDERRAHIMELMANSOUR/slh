import { useLang } from '../context/LangContext'
import useSEO from '../hooks/useSEO'
import Layout from '../components/layout/Layout'
import Hero from '../components/home/Hero'
import { StatsStrip, HomeCEO, HomeServices, HomeHydrogenBanner, HomeContactCTA } from '../components/home/HomeSections'
import HomeProjects, { HomeNews, HomePartners } from '../components/home/HomeProjects'

export default function Home() {
  const { lang } = useLang()
  useSEO({ title:'SLH Service Nederland | Green Hydrogen & Energy Transition', description:'International consulting in green hydrogen, energy transition, and Morocco–Netherlands strategic partnerships.', path:'/', lang })
  return (
    <Layout>
      <Hero/>
      <StatsStrip/>
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
