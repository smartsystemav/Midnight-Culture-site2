import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowRight, 
  Music, 
  CalendarDays, 
  Users, 
  Mic2,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  ChevronRight
} from "lucide-react";

import logoImg from "@assets/Midnight_Culture_Logo_Upscaled_1776245648247.png";
import bannerImg from "@assets/f2f9a2b9-ebb4-4ea6-9484-51b8097807ae_1776246216070.png";
import bgImg from "@assets/MC_Background_1776245648247.png";
import bandImg from "@assets/DSC03883_1776245820156.jpg";

const CONTACT_EMAIL = "midnightcultureband@gmail.com";

const REPERTOIRE = [
  { genre: "Funk & Soul", songs: ["Superstition — Stevie Wonder", "September — Earth, Wind & Fire", "Get Lucky — Daft Punk ft. Pharrell", "Uptown Funk — Bruno Mars"] },
  { genre: "80s Anthems", songs: ["Don't Stop Me Now — Queen", "Livin' on a Prayer — Bon Jovi", "Jump — Van Halen", "Girls Just Wanna Have Fun — Cyndi Lauper"] },
  { genre: "90s & 00s Rock", songs: ["Mr. Brightside — The Killers", "Sex on Fire — Kings of Leon", "Valerie — Amy Winehouse", "Shut Up and Dance — Walk the Moon"] },
  { genre: "Current Chart Hits", songs: ["Blinding Lights — The Weeknd", "Shape of You — Ed Sheeran", "Watermelon Sugar — Harry Styles", "As It Was — Harry Styles"] },
];

const SERVICES = [
  { title: "Weddings", desc: "Make your special day unforgettable with a packed dance floor and songs everyone loves.", icon: Users },
  { title: "Corporate Events", desc: "Professional, polished, and guaranteed to elevate your company party or awards night.", icon: CalendarDays },
  { title: "Private Parties", desc: "Birthdays, anniversaries, or just because — we bring the festival energy to your door.", icon: Music },
  { title: "Festivals", desc: "Big stage energy, tight arrangements, and crowd interaction that gets everyone moving.", icon: Mic2 },
];

const REVIEWS = [
  { text: "Midnight Culture absolutely made our wedding. The energy they brought was incredible and the dance floor was full from the very first song right until midnight.", author: "Sarah & James — Devon Wedding" },
  { text: "We book a lot of bands for our corporate events, but these guys are on another level. Professional, versatile, and seriously talented.", author: "Marcus T. — Event Director, Exeter" },
  { text: "I've never seen a band cover such a huge range of eras so seamlessly. The crowd went absolutely wild. Book them — you will not regret it.", author: "Elena R. — Private Party, Torquay" },
  { text: "From the moment they walked on stage to the very last note, they were incredible. Our guests are still talking about it weeks later.", author: "Tom & Lucy — Dartmoor Wedding" },
];

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const { toast } = useToast();
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const date = data.get("date") as string;
    const type = data.get("type") as string;
    const venue = data.get("venue") as string;
    const details = data.get("details") as string;

    const subject = encodeURIComponent(`Booking Enquiry — ${type ? type : "Event"} ${date ? `on ${date}` : ""}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nEvent Date: ${date || "TBC"}\nEvent Type: ${type || "TBC"}\nVenue: ${venue || "TBC"}\n\nDetails:\n${details}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    toast({
      title: "Opening your email client...",
      description: `Your enquiry will be sent to ${CONTACT_EMAIL}`,
    });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-white">

      {/* Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md border-b border-white/8 py-3" : "bg-transparent py-5"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="shrink-0">
            <img src={logoImg} alt="Midnight Culture" className="h-12 w-12 object-cover rounded-full" />
          </button>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-widest text-white/60 uppercase">
            {["about", "repertoire", "services", "media", "contact"].map(id => (
              <button key={id} onClick={() => scrollTo(id)} className="hover:text-primary transition-colors">
                {id}
              </button>
            ))}
          </div>

          <Button
            className="hidden md:flex bg-primary hover:bg-primary/80 text-white font-bold rounded-none px-7 py-2 text-sm tracking-widest uppercase"
            onClick={() => scrollTo("contact")}
          >
            Book Now
          </Button>

          <button
            className="md:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background/98 border-b border-white/8 overflow-hidden"
            >
              <div className="container mx-auto px-6 py-6 flex flex-col gap-5">
                {["about", "repertoire", "services", "media", "contact"].map(id => (
                  <button key={id} onClick={() => scrollTo(id)} className="text-left text-white/70 hover:text-primary font-semibold uppercase tracking-widest text-sm transition-colors">
                    {id}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: yHero }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background z-10" />
          <img
            src={bgImg}
            alt="Background"
            className="w-full h-full object-cover object-center scale-110"
          />
        </motion.div>

        <div className="container relative z-20 px-6 pt-20 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8"
          >
            <img src={bannerImg} alt="Midnight Culture" className="w-full max-w-3xl mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-primary/40 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Devon's Premier 4-Piece Function Band
          </motion.div>

          <motion.p
            className="text-base md:text-xl text-white/60 max-w-xl mx-auto mb-10 font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Funk, pop-rock, and floor-filling covers spanning the 80s to today.
            We make corporate gigs feel like festival headlines and weddings the greatest night of your life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/80 text-white font-bold rounded-none h-14 px-10 text-sm tracking-widest uppercase group"
              onClick={() => scrollTo("contact")}
            >
              Enquire Now
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/8 rounded-none h-14 px-10 text-sm tracking-widest uppercase"
              onClick={() => scrollTo("repertoire")}
            >
              View Setlist
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
          style={{ opacity: opacityHero }}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <div className="w-6 h-9 border border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About / Band Photo */}
      <section id="about" className="py-24 lg:py-32 relative bg-background">
        <div className="container px-6 mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="relative">
                <div className="absolute -inset-6 bg-primary/10 blur-3xl opacity-40 z-0" />
                <img
                  src={bandImg}
                  alt="Midnight Culture — The Band"
                  className="relative z-10 w-full aspect-[4/3] object-cover object-top border border-white/10"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background to-transparent z-20" />
              </div>
            </FadeIn>

            <div className="space-y-7">
              <FadeIn delay={0.15}>
                <p className="text-xs font-bold tracking-widest uppercase text-primary">About Us</p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none">
                  ELECTRIC ENERGY.<br />
                  <span className="text-primary">SERIOUS GROOVE.</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-white/65 font-light leading-relaxed text-lg">
                  Based in Devon, UK, Midnight Culture are a 4-piece band of professional musicians who believe cover sets should feel like headline performances — not background music.
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <p className="text-white/65 font-light leading-relaxed text-lg">
                  Our repertoire spans four decades — from tight 80s funk and pop anthems, through gritty 90s and 00s rock, right up to today's biggest chart hits. We read every room and build sets that keep the floor packed from the first chord to the final encore.
                </p>
              </FadeIn>
              <FadeIn delay={0.5}>
                <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                  {["Funk", "Pop-Rock", "80s — Today", "Devon, UK", "Fully Professional"].map(tag => (
                    <span key={tag} className="text-xs font-semibold tracking-widest uppercase px-4 py-2 border border-primary/30 text-primary bg-primary/8">
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 lg:py-32 bg-card relative border-y border-white/5">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "cover" }} />
        <div className="container px-6 mx-auto relative z-10">
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">What We Do</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter">AVAILABLE FOR</h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => (
              <FadeIn key={service.title} delay={i * 0.1}>
                <div className="bg-background/80 backdrop-blur-sm border border-white/8 p-8 h-full hover:border-primary/50 transition-colors duration-300 group">
                  <service.icon className="w-10 h-10 text-primary mb-6" />
                  <h3 className="font-display text-xl font-bold mb-3 tracking-tight">{service.title}</h3>
                  <p className="text-white/55 font-light leading-relaxed text-sm">{service.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Repertoire */}
      <section id="repertoire" className="py-24 lg:py-32 relative">
        <div className="container px-6 mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 space-y-7">
              <FadeIn>
                <p className="text-xs font-bold tracking-widest uppercase text-primary">What We Play</p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter">THE SETLIST</h2>
              </FadeIn>
              <FadeIn delay={0.25}>
                <p className="text-white/60 font-light leading-relaxed">
                  We don't do boring. Our setlist hits every demographic in the room — classic funk, 80s anthems, 90s rock, and the biggest tracks from right now.
                </p>
              </FadeIn>
              <FadeIn delay={0.35}>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=Full%20Song%20List%20Request`}
                  className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-white/60 hover:text-primary border border-white/15 hover:border-primary/50 px-6 py-3 transition-colors group"
                >
                  Request Full Song List
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </FadeIn>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-x-10 gap-y-12">
              {REPERTOIRE.map((section, i) => (
                <FadeIn key={section.genre} delay={0.2 + i * 0.1}>
                  <h3 className="font-display text-lg font-bold text-primary mb-5 pb-3 border-b border-white/10 uppercase tracking-wider">{section.genre}</h3>
                  <ul className="space-y-3.5">
                    {section.songs.map((song, j) => (
                      <li key={j} className="flex items-start text-white/65 font-light text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-3 shrink-0" />
                        {song}
                      </li>
                    ))}
                    <li className="text-white/35 italic text-xs pt-2">+ many more across all genres</li>
                  </ul>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Band Photo — Full Width */}
      <section id="media" className="relative overflow-hidden">
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent z-10" />
          <img
            src={bandImg}
            alt="Midnight Culture — Live"
            className="w-full aspect-[21/9] object-cover object-center"
          />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <FadeIn>
              <div className="text-center">
                <img src={logoImg} alt="Midnight Culture" className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-2 border-primary/50 shadow-2xl shadow-primary/20" />
                <p className="text-white/70 text-sm font-semibold tracking-widest uppercase">Midnight Culture</p>
                <p className="text-white/40 text-xs tracking-wider">Devon, UK</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 lg:py-32 relative bg-card border-t border-white/5">
        <div className="container px-6 mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">Reviews</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter">DON'T JUST TAKE OUR WORD FOR IT</h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REVIEWS.map((review, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-background border border-white/8 p-7 h-full relative hover:border-primary/30 transition-colors duration-300">
                  <div className="text-primary/20 text-7xl font-display font-bold absolute top-3 left-5 leading-none select-none">"</div>
                  <p className="text-white/70 font-light leading-relaxed text-sm relative z-10 mb-6 italic pt-6">
                    "{review.text}"
                  </p>
                  <p className="font-bold text-xs tracking-widest text-primary uppercase">
                    {review.author}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Booking */}
      <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "cover" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="container px-6 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto bg-background/90 backdrop-blur-sm border border-white/10 p-8 md:p-14">
            <FadeIn className="text-center mb-12">
              <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">Get In Touch</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter mb-4">READY TO BOOK?</h2>
              <p className="text-white/55 text-sm">Fill out the form below — we'll get back to you with a quote within 24 hours.</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 mt-4 text-primary hover:text-primary/80 transition-colors text-sm font-semibold">
                <Mail className="w-4 h-4" />
                {CONTACT_EMAIL}
              </a>
            </FadeIn>

            <FadeIn delay={0.2}>
              <form onSubmit={handleBooking} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/55">Name *</label>
                    <Input required name="name" placeholder="Your name" className="bg-card/60 border-white/10 rounded-none h-12 focus-visible:ring-primary text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/55">Email *</label>
                    <Input required name="email" type="email" placeholder="your@email.com" className="bg-card/60 border-white/10 rounded-none h-12 focus-visible:ring-primary text-sm" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/55">Event Date</label>
                    <Input name="date" type="date" className="bg-card/60 border-white/10 rounded-none h-12 focus-visible:ring-primary [color-scheme:dark] text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/55">Event Type</label>
                    <select name="type" className="flex h-12 w-full bg-card/60 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none rounded-none">
                      <option value="" disabled>Select event type</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="Private Party">Private Party</option>
                      <option value="Festival">Festival</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest text-white/55">Venue / Location</label>
                  <Input name="venue" placeholder="e.g. Exeter Golf & Country Club, Devon" className="bg-card/60 border-white/10 rounded-none h-12 focus-visible:ring-primary text-sm" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest text-white/55">Additional Details</label>
                  <Textarea name="details" placeholder="Tell us about your event — number of guests, timings, any special requests..." className="bg-card/60 border-white/10 rounded-none min-h-[120px] focus-visible:ring-primary text-sm" />
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/80 text-white font-bold rounded-none h-13 text-sm tracking-widest uppercase">
                  Send Enquiry
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-white/8 py-10 relative z-10">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <button onClick={() => scrollTo("hero")} className="shrink-0">
              <img src={logoImg} alt="Midnight Culture" className="h-14 w-14 object-cover rounded-full" />
            </button>

            <div className="text-center">
              <p className="text-white/30 text-xs tracking-widest uppercase">Premium Function Band — Devon, UK</p>
              <p className="text-white/30 text-xs mt-1">Weddings · Corporate · Private Parties · Festivals</p>
            </div>

            <div className="flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors text-white/50 hover:text-white">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors text-white/50 hover:text-white">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors text-white/50 hover:text-white">
                <Youtube className="w-4 h-4" />
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors text-white/50 hover:text-white">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-white/25 text-xs">
              &copy; {new Date().getFullYear()} Midnight Culture. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
