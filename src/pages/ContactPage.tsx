import { person } from '@/data';
import { Header } from '@/components/layout/Header';
import { Footer, SocialLinks } from '@/components/layout/Footer';
import { AppLink } from '@/components/ui/AppLink';
import { ArrowIcon } from '@/components/ui/Icon';
import { WordReveal } from '@/components/ui/Reveal';
import { ContactForm } from '@/components/contact/ContactForm';
import { Page } from './Page';

export default function ContactPage() {
  return (
    <Page id="contact">
      <section className="contact">
        <Header page="contact" theme="light" />
        <div className="container contact-head">
          <h1 className="page-title contact-title">
            <span className="footer-title-row">
              <span className="avatar">
                <img src={person.avatar} alt="" width={200} height={200} />
              </span>
              <WordReveal lines="Let’s start a" />
            </span>
            <WordReveal lines="project together" />
          </h1>
          <span className="contact-arrow" aria-hidden="true">
            <ArrowIcon />
          </span>
        </div>
        <div className="container contact-grid">
          <ContactForm />
          <aside className="contact-aside">
            <div>
              <p className="meta-label">Contact details</p>
              <p>
                <AppLink className="underline-link" href={`mailto:${person.email}`}>
                  {person.email}
                </AppLink>
              </p>
            </div>
            <div>
              <p className="meta-label">Location</p>
              <p>Based in {person.location}</p>
            </div>
            <div>
              <p className="meta-label">Socials</p>
              <p className="aside-socials">
                <SocialLinks separator="br" />
              </p>
            </div>
          </aside>
        </div>
      </section>
      <Footer compact />
    </Page>
  );
}
