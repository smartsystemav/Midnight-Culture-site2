import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Play, 
  ArrowRight, 
  Music, 
  CalendarDays, 
  Users, 
  Mic2,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  ChevronRight
} from "lucide-react";

// Images
import heroImg from "@/assets/images/hero.png";
import aboutImg from "@/assets/images/about.png";
import gallery1 from "@/assets/images/gallery-1.png";
import gallery2 from "@/assets/images/gallery-2.png";
import gallery3 from "@/assets/images/gallery-3.png";

const REPERTOIRE = [
  { genre: "Funk & Soul", songs: ["Superstition - Stevie Wonder", "Uptown Funk - Stevie Wonder", "September - Earth, Wind & Fire", "Get Lucky - Bruno Mars"] },
  { genre: "80s & 90s Anthems", songs: ["Don't Stop Me Now - Queen", "Livin' on a Prayer - Queen", "Mr. Brightside - Bon Jovi", "Sweet Child O' Mine - Bon Jovi"] },
  { genre: "Modern Pop-Rock", songs: ["Valerie - Amy Winehouse", "Mr. Brightside - The Killers", "Sex on Fire - Guns N' Roses", "Shut Up and Dance - Kings of Leon"] },
  { genre: "Current Chart Hits", songs: ["Blinding Lights - The Killers", "Shape of You - The Weeknd", "Watermelon Sugar - Ed Sheeran", "Dance Monkey - Ed Sheeran"] },
];

const SERVICES = [
  { title: "Weddings", desc: "Make your special day unforgettable with a packed dance floor and songs everyone knows.", icon: Users },
  { title: "Corporate Events", desc: "Professional, polished, and guaranteed to elevate your company party or gala.", icon: CalendarDays },
  { title: "Private Parties", desc: "Birthdays, anniversaries, or just because. We bring the festival energy to your event.", icon: Music },
  { title: "Festivals", desc: "Big stage energy, tight arrangements, and crowd interaction that gets everyone moving.", icon: Mic2 },
];

const REVIEWS = [
  { text: "Midnight Culture absolutely made our wedding. The energy they brought was incredible, and the dance floor was full all night!", author: "Sarah & James, Devon" },
  { text: "We book a lot of bands for our corporate events, but these guys are on another level. Professional, slick, and seriously talented.", author: "Marcus T., Event Director" },
  { text: "I've never seen a band cover such a huge range of eras so perfectly. The singer's vocals are insane. Book them immediately.", author: "Elena R., Private Party" },
];

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const { toast } = useToast();
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Enquiry Sent",
      description: "Thanks for reaching out! We'll get back to you within 24 hours.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/90 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="font-display font-bold text-2xl tracking-tighter text-white">
            MIDNIGHT<span className="text-primary">CULTURE</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <a href="#about" className="hover:text-primary transition-colors">ABOUT</a>
            <a href="#repertoire" className="hover:text-primary transition-colors">REPERTOIRE</a>
            <a href="#services" className="hover:text-primary transition-colors">SERVICES</a>
            <a href="#media" className="hover:text-primary transition-colors">MEDIA</a>
          </div>
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-none px-8"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            BOOK NOW
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: yHero, opacity: opacityHero }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />
          <img 
            src={heroImg} 
            alt="Midnight Culture Band Performance" 
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        
        <div className="container relative z-20 px-6 pt-20 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            DEVON'S PREMIER 4-PIECE FUNCTION BAND
          </motion.div>
          
          <motion.h1 
            className="font-display text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-tighter leading-none mb-6 text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            THE BAND YOU DIDN'T <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">KNOW YOU NEEDED</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Funk, Pop-Rock, and floor-filling covers spanning the 80s to today. 
            We make corporate gigs feel like festival headlines and weddings the greatest night of your life.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-none h-14 px-10 text-lg w-full sm:w-auto group">
              Enquire Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-none h-14 px-10 text-lg w-full sm:w-auto group">
              Watch Video
              <Play className="ml-2 w-4 h-4 fill-current" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About / Band Members */}
      <section id="about" className="py-32 relative bg-background">
        <div className="container px-6 mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl opacity-50 z-0" />
                <img 
                  src={aboutImg} 
                  alt="The Band" 
                  className="relative z-10 w-full aspect-[4/3] md:aspect-video lg:aspect-[4/5] object-cover border border-white/10 grayscale-[0.2] contrast-125"
                />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent z-20" />
              </div>
            </FadeIn>
            
            <div className="space-y-8">
              <FadeIn delay={0.2}>
                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter">
                  ELECTRIC <span className="text-primary">ENERGY.</span><br/>
                  SERIOUS GROOVE.
                </h2>
              </FadeIn>
              
              <FadeIn delay={0.3}>
                <p className="text-lg text-white/70 font-light leading-relaxed">
                  Based in Devon, UK, Midnight Culture isn't your average function band. We're a collective of professional session musicians who decided that covers don't have to be cheesy.
                </p>
              </FadeIn>
              
              <FadeIn delay={0.4}>
                <p className="text-lg text-white/70 font-light leading-relaxed">
                  With a repertoire that ranges from tight 80s synth-pop to gritty 90s rock, right through to today's biggest hits, we build sets that keep the dance floor packed from the first chord to the final encore.
                </p>
              </FadeIn>
              
              <FadeIn delay={0.5}>
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                  <div>
                    <h4 className="font-bold text-white mb-1 font-display tracking-wide">JAXON</h4>
                    <p className="text-sm text-primary">Lead Vocals / Rhythm</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1 font-display tracking-wide">ELIAS</h4>
                    <p className="text-sm text-primary">Lead Guitar / BVs</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1 font-display tracking-wide">MARCUS</h4>
                    <p className="text-sm text-primary">Bass / Synth</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1 font-display tracking-wide">LEO</h4>
                    <p className="text-sm text-primary">Drums / Samples</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 bg-card relative border-y border-white/5">
        <div className="container px-6 mx-auto">
          <FadeIn className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter mb-4">WHAT WE DO</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Versatile, adaptable, and ready for any stage.</p>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, i) => (
              <FadeIn key={service.title} delay={i * 0.1}>
                <div className="bg-background border border-white/5 p-8 h-full hover:border-primary/50 transition-colors group">
                  <service.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-white/60 font-light leading-relaxed">{service.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Repertoire / Setlist */}
      <section id="repertoire" className="py-32 relative">
        <div className="container px-6 mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 space-y-8">
              <FadeIn>
                <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter">THE SETLIST</h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-white/60 font-light leading-relaxed">
                  We don't do boring. Our setlist is carefully curated to hit every demographic in the room. From classic funk to modern indie rock, we play the songs people actually want to hear.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-none w-full group">
                  Request Full Song List
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </FadeIn>
            </div>
            
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-x-8 gap-y-12">
              {REPERTOIRE.map((section, i) => (
                <FadeIn key={section.genre} delay={0.2 + (i * 0.1)}>
                  <h3 className="font-display text-xl font-bold text-primary mb-6 pb-2 border-b border-white/10">{section.genre}</h3>
                  <ul className="space-y-4">
                    {section.songs.map((song, j) => (
                      <li key={j} className="flex items-start text-white/70 font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 mr-3 shrink-0" />
                        {song}
                      </li>
                    ))}
                    <li className="text-white/40 italic text-sm pt-2">+ many more</li>
                  </ul>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Media / Gallery */}
      <section id="media" className="py-10 relative overflow-hidden bg-card border-y border-white/5">
        <div className="container px-6 mx-auto mb-12">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter">LIVE IN ACTION</h2>
          </FadeIn>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-8 px-6 snap-x scrollbar-hide">
          <FadeIn delay={0.1} className="shrink-0 w-[85vw] sm:w-[40vw] lg:w-[30vw] snap-center">
            <img src={gallery1} alt="Guitarist" className="w-full aspect-[3/4] object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-500" />
          </FadeIn>
          <FadeIn delay={0.2} className="shrink-0 w-[85vw] sm:w-[40vw] lg:w-[30vw] snap-center">
            <img src={gallery2} alt="Singer" className="w-full aspect-[3/4] object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-500" />
          </FadeIn>
          <FadeIn delay={0.3} className="shrink-0 w-[85vw] sm:w-[40vw] lg:w-[30vw] snap-center">
            <img src={gallery3} alt="Drummer" className="w-full aspect-[3/4] object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-500" />
          </FadeIn>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 relative">
        <div className="container px-6 mx-auto">
          <FadeIn className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter">DON'T JUST TAKE OUR WORD FOR IT</h2>
          </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((review, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-card border border-white/5 p-8 relative">
                  <div className="text-primary text-6xl font-display font-bold absolute top-4 left-6 opacity-20">"</div>
                  <p className="text-white/80 font-light leading-relaxed relative z-10 mb-8 italic">
                    "{review.text}"
                  </p>
                  <p className="font-display font-bold text-sm tracking-wider text-primary uppercase">
                    {review.author}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Booking CTA */}
      <section id="contact" className="py-32 relative bg-card overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container px-6 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto bg-background border border-white/10 p-8 md:p-16">
            <FadeIn className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter mb-4">READY TO BOOK?</h2>
              <p className="text-white/60">Fill out the form below with your event details and we'll get back to you with a quote.</p>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <form onSubmit={handleBooking} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Name</label>
                    <Input required placeholder="John Doe" className="bg-card border-white/10 rounded-none h-12 focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Email</label>
                    <Input required type="email" placeholder="john@example.com" className="bg-card border-white/10 rounded-none h-12 focus-visible:ring-primary" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Event Date</label>
                    <Input type="date" className="bg-card border-white/10 rounded-none h-12 focus-visible:ring-primary [color-scheme:dark]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Event Type</label>
                    <select className="flex h-12 w-full items-center justify-between bg-card border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 appearance-none rounded-none">
                      <option value="" disabled selected>Select event type</option>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="party">Private Party</option>
                      <option value="festival">Festival</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Location / Venue</label>
                  <Input placeholder="E.g., Exeter Castle, Devon" className="bg-card border-white/10 rounded-none h-12 focus-visible:ring-primary" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Additional Details</label>
                  <Textarea placeholder="Tell us a bit about your event..." className="bg-card border-white/10 rounded-none min-h-[120px] focus-visible:ring-primary" />
                </div>
                
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-none h-14 text-lg">
                  Send Enquiry
                </Button>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-white/5 py-12 relative z-10">
        <div className="container px-6 mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display font-bold text-2xl tracking-tighter text-white text-center md:text-left">
            MIDNIGHT<span className="text-primary">CULTURE</span>
            <p className="text-xs font-sans font-normal text-white/40 mt-1 tracking-normal">Premium Function Band • Devon, UK</p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors text-white/70 hover:text-primary-foreground">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors text-white/70 hover:text-primary-foreground">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors text-white/70 hover:text-primary-foreground">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
          
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Mail className="w-4 h-4" />
            <span>bookings@midnightculture.co.uk</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
