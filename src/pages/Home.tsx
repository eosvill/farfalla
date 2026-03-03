import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import Collections from '../components/Collections'
import ZodiacBanner from '../components/ZodiacBanner'
import StonePower from '../components/StonePower'
import ArtisanProcess from '../components/ArtisanProcess'
import Testimonials from '../components/Testimonials'
import CTABanner from '../components/CTABanner'
import MailingList from '../components/MailingList'

export default function Home() {
    const location = useLocation()

    useEffect(() => {
        if (location.hash) {
            // Need a slight delay to ensure components vary their layout sizes after mount
            setTimeout(() => {
                const id = location.hash.replace('#', '')
                const element = document.getElementById(id)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                }
            }, 300)
        } else {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        }
    }, [location.hash])

    return (
        <main>
            <Hero />
            <Collections />
            <ZodiacBanner />
            <StonePower />
            <ArtisanProcess />
            <Testimonials />
            <CTABanner />
            <MailingList />
        </main>
    )
}

