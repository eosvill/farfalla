import Hero from '../components/Hero'
import Collections from '../components/Collections'
import ZodiacBanner from '../components/ZodiacBanner'
import StonePower from '../components/StonePower'
import ArtisanProcess from '../components/ArtisanProcess'
import Testimonials from '../components/Testimonials'
import CTABanner from '../components/CTABanner'
import MailingList from '../components/MailingList'

export default function Home() {
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
