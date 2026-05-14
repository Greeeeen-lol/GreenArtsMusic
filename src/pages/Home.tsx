import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Disc3, Star, Play, Sparkles, X, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Marquee = ({ text, color = "stroke-green1" }: { text: string, color?: "stroke-green1" | "stroke-green2" }) => (
  <div className="marquee-container bg-black py-4 border-y border-zinc-800 transform -rotate-2 scale-110 relative z-10 w-full overflow-hidden">
    <div className="marquee-content font-sans font-[900] text-4xl sm:text-6xl uppercase tracking-widest pl-4">
      {[...Array(6)].map((_, i) => (
        <span key={i} className="mx-4">
          <span className={`text-${color} mr-4`}>{text}</span>
          <Star className={`inline-block mr-4 ${color === 'stroke-green1' ? 'text-[#00ff00]' : 'text-[#b8ff00]'} animate-pulse`} />
        </span>
      ))}
      {[...Array(6)].map((_, i) => (
        <span key={i} className="mx-4">
          <span className={`text-${color} mr-4`}>{text}</span>
          <Star className={`inline-block mr-4 ${color === 'stroke-green1' ? 'text-[#00ff00]' : 'text-[#b8ff00]'} animate-pulse`} />
        </span>
      ))}
    </div>
  </div>
);

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#050505] pt-20 px-4">
      <div className="absolute top-[10%] left-[15%] text-[#00FF00] text-[40px] opacity-60">✦</div>
      <div className="absolute bottom-[20%] right-[10%] text-[#00FF00] text-[60px] opacity-60">✦</div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
           initial={{ opacity: 0, y: 50, scale: 0.9 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="relative"
        >
          <h1 className="font-plank uppercase text-[11vw] sm:text-[140px] leading-[0.8] tracking-widest text-emerald-chrome relative z-10 w-full max-w-[1135px] h-auto pb-4 text-center m-0">
            greenarts
          </h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-6"
        >
           <div className="px-6 py-2 border border-[#1a1a1a] flex items-center gap-3 bg-[#0a0a0a]">
             <span className="relative flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full bg-[#00FF00] opacity-75"></span>
               <span className="relative inline-flex h-3 w-3 bg-[#00FF00]"></span>
             </span>
             <span className="font-sans text-[12px] font-[700] text-[#00FF00] uppercase tracking-[2px]">Album 2026</span>
           </div>
           <div className="px-6 py-2 border border-[#1a1a1a] bg-[#0a0a0a]">
             <span className="font-sans text-[12px] font-[700] text-[#888] uppercase tracking-[2px]">Est. 2021 // Buffalo, NY</span>
           </div>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8 }}
           className="mt-16 w-full max-w-lg mx-auto"
        >
           <p className="text-[#888] text-[14px] leading-[1.6] text-center uppercase tracking-[2px]">
             "Sculpting moods" with heavy 808s and hyper-compressed pop textures. The electric lasso capturing nocturnal youth.
           </p>
        </motion.div>
      </div>
    </section>
  );
};

const Biography = () => (
  <section id="bio" className="py-32 px-4 relative z-20">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div className="relative">
        <div className="absolute inset-0 bg-[#b8ff00] transform rotate-3 rounded-2xl" />
        <div className="absolute inset-0 bg-[#00ff00] transform -rotate-3 rounded-2xl" />
        <div className="relative bg-[#111] p-8 aspect-square rounded-2xl flex flex-col justify-between overflow-hidden group">
          <div className="absolute inset-0 bg-[url('/profile.png')] bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-700" />
          <div className="relative z-10 flex justify-between items-start">
             <span className="font-sans font-black text-5xl sm:text-6xl text-stroke-green2 opacity-50 uppercase">greenarts</span>
             <Sparkles className="text-[#00ff00] w-8 h-8" />
          </div>
          <div className="relative z-10 glass-panel p-6 rounded-xl border-l-4 border-l-[#b8ff00]">
             <h3 className="font-sans font-bold text-3xl uppercase tracking-wider mb-2">greenarts</h3>
             <p className="text-zinc-400 text-sm font-mono leading-relaxed">
               BORN 2008.<br/>
               PRODUCER. SYNTH DESIGNER.<br/>
               VOCAL TRACKER.
             </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-8">
        <div>
          <h2 className="font-sans font-bold text-5xl sm:text-7xl uppercase text-white mb-6">Aesthetic <br/><span className="text-chrome">Architect</span></h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#00ff00] to-[#b8ff00]" />
        </div>
        
        <p className="text-zinc-300 text-lg leading-relaxed mix-blend-plus-lighter">
          Operating directly at the intersection of hip-hop, hyperpop, and synth-pop, GreenArts rejects the notion of being a mere participant in the trend. Instead, greenarts functions as a <span className="text-[#b8ff00] italic">true sculptor of moods</span>.
        </p>
        
        <p className="text-zinc-300 text-lg leading-relaxed mix-blend-plus-lighter">
          His process involves "crescendoing heartbeats drowned in basslines" typical of Atlanta-derived trap, layered meticulously beneath "sticky, sweet, irrepressible" synth waves. The result is an inescapable wall of sound.
        </p>
        
        <div className="pt-6 grid grid-cols-3 gap-4 border-t border-zinc-800">
           <div>
             <div className="text-[#00ff00] font-sans font-bold text-4xl">4+</div>
             <div className="text-zinc-500 text-xs uppercase tracking-wider mt-1 font-bold">Years Active</div>
           </div>
           <div>
             <div className="text-[#b8ff00] font-sans font-bold text-4xl">20+</div>
             <div className="text-zinc-500 text-xs uppercase tracking-wider mt-1 font-bold">Releases</div>
           </div>
           <div>
             <div className="text-white font-sans font-bold text-4xl italic">Y2K</div>
             <div className="text-zinc-500 text-xs uppercase tracking-wider mt-1 font-bold">Soundscape</div>
           </div>
        </div>
        
        <div className="pt-8">
            <Link to="/about" className="inline-block px-8 py-3 bg-[#b8ff00] text-black font-bold uppercase tracking-wider text-sm hover:bg-white hover:scale-105 transition-all duration-300 rounded-sm">
              Read My Story
            </Link>
        </div>
      </div>
    </div>
  </section>
);

const discographyData = [
  { year: "2026", title: "ain't lyin", type: "Single", feature: "Co-prod. Simon Servida", highlight: true },
  { year: "2026", title: "For You", type: "Single", feature: "feat. Nxte*" },
  { year: "2025", title: "games", type: "Single" },
  { year: "2025", title: "partyallnight!", type: "Single", feature: "High Energy" },
  { year: "2025", title: "heatwaves", type: "Single", highlight: true },
  { year: "2025", title: "INeedU!", type: "Single" },
  { year: "2024", title: "Dance With Me", type: "Single", feature: "Critically Acclaimed", highlight: true },
  { year: "2024", title: "Home", type: "Single", feature: "feat. BlackOutDawn" },
  { year: "2023", title: "I Go", type: "Single", feature: "Massive Synergy" },
  { year: "2022", title: "New Era", type: "Album", highlight: true },
  { year: "2022", title: "Heartbreak // Depression", type: "Album" },
  { year: "2021", title: "All You Need Is Love", type: "Album" },
];

const Discography = () => {
  const [playingId, setPlayingId] = useState<number | null>(null);

  return (
    <section id="music" className="py-24 relative bg-black border-t border-zinc-900">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#00ff00] to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="font-sans font-black text-6xl sm:text-8xl uppercase tracking-tighter">
              <span className="text-stroke-green1 opacity-50 block -mb-4 sm:-mb-8">THE DIGITAL</span>
              <span className="text-white relative z-10">ARCHIVE</span>
            </h2>
          </div>
          <Disc3 className="w-16 h-16 sm:w-24 sm:h-24 text-[#b8ff00] animate-[spin_10s_linear_infinite] opacity-50 hidden md:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {discographyData.map((item, i) => (
             <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                key={i} 
                className={`group flex items-center justify-between p-4 border-b ${item.highlight ? 'border-[#00ff00] bg-[#00ff00]/5' : 'border-zinc-800 hover:border-zinc-500'} transition-all cursor-pointer`}
             >
                <div className="flex items-center gap-6">
                  <span className={`font-mono text-sm ${item.highlight ? 'text-[#00ff00]' : 'text-zinc-600'}`}>{item.year}</span>
                  <div>
                    <h4 className={`font-sans font-bold text-lg uppercase tracking-wide group-hover:text-[#b8ff00] transition-colors ${item.highlight ? 'text-white' : 'text-zinc-300'}`}>{item.title}</h4>
                    <p className="text-xs font-mono text-zinc-500 mt-1">{item.type} {item.feature && `// ${item.feature}`}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setPlayingId(i);
                    setTimeout(() => setPlayingId(null), 2000);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 sm:p-3 rounded-full bg-white text-black hover:bg-[#b8ff00] hover:scale-110 duration-200 min-w-[40px] min-h-[40px] flex items-center justify-center font-bold text-[10px] uppercase text-center leading-tight"
                >
                  {playingId === i ? (
                    <span>Coming<br/>Soon</span>
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-[2px]" />
                  )}
                </button>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="h-[40px] bg-[#00FF00] text-black flex items-center justify-between px-4 sm:px-[40px] font-sans font-[800] text-[10px] uppercase tracking-[1px] border-t-2 border-[#1a1a1a]">
     <div className="hidden sm:block">&copy; 2026 GREENARTS RECORDS</div>
     <div>ALL RIGHTS RESERVED</div>
     <div className="flex gap-4">
        <a href="https://www.instagram.com/greenarts.music?utm_source=gr&igsh=" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
        <a href="https://www.tiktok.com/@greenarts1?_r=1&_t=ZP-96LwdziVopK" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a>
        <a href="https://open.spotify.com/artist/46JGRcV3DcpVxSyhxDPwbN" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Spotify</a>
        <a href="https://music.apple.com/us/artist/greenarts/1552854976" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Apple</a>
     </div>
  </footer>
);

export default function Home() {
  const [showStreamPopup, setShowStreamPopup] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00ff00] selection:text-white font-sans">
      <div className="flex flex-col min-h-screen border-[8px] border-[#00FF00] box-border relative mx-auto w-full max-w-none overflow-x-hidden">
        <header className="flex justify-between items-center px-4 sm:px-[40px] py-[20px] border-b-2 border-[#1a1a1a] w-full z-50 bg-[#050505]">
           <div className="font-sans text-[24px] font-[900] tracking-[-1px] text-[#00FF00] uppercase">GA.</div>
           <div className="hidden md:flex items-center gap-[30px] font-sans text-[12px] font-[700] uppercase tracking-[2px] text-white">
              <a href="#bio" className="hover:text-[#00FF00] transition-colors">Bio</a>
              <a href="#music" className="hover:text-[#00FF00] transition-colors">Music</a>
              <Link to="/about" className="hover:text-[#00FF00] transition-colors">My Story</Link>
              <Link to="/latest" className="text-[#00FF00] hover:text-white transition-colors">Latest Release</Link>
              <Link to="/contact" className="hover:text-[#00FF00] transition-colors">Contact</Link>
           </div>
           <div className="flex items-center gap-4">
             <button 
               onClick={() => setShowStreamPopup(true)}
               className="text-[12px] font-[700] uppercase tracking-[2px] text-[#00FF00] hover:text-white transition-colors bg-transparent border-none cursor-pointer">
               Stream Now
             </button>
             <button title="Toggle Menu" onClick={() => setShowMobileMenu(!showMobileMenu)} className="md:hidden text-[#00FF00] hover:text-white transition-colors">
               {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
             </button>
           </div>
        </header>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-b-2 border-[#1a1a1a] bg-[#050505] z-40 overflow-hidden"
            >
              <div className="flex flex-col px-4 py-6 gap-6 font-sans text-[12px] font-[700] uppercase tracking-[2px] text-white items-center">
                <a href="#bio" onClick={() => setShowMobileMenu(false)} className="hover:text-[#00FF00] transition-colors">Bio</a>
                <a href="#music" onClick={() => setShowMobileMenu(false)} className="hover:text-[#00FF00] transition-colors">Music</a>
                <Link to="/about" onClick={() => setShowMobileMenu(false)} className="hover:text-[#00FF00] transition-colors">My Story</Link>
                <Link to="/latest" onClick={() => setShowMobileMenu(false)} className="text-[#00FF00] hover:text-white transition-colors">Latest Release</Link>
                <Link to="/contact" onClick={() => setShowMobileMenu(false)} className="hover:text-[#00FF00] transition-colors">Contact</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Hero />
        <Marquee text='"MIDNIGHT CONFESSIONS"' color="stroke-green1" />
        <Biography />
        <Marquee text='"CHROMATIC TYPHOON"' color="stroke-green2" />
        <Discography />
        <Footer />

        <AnimatePresence>
          {showStreamPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              onClick={() => setShowStreamPopup(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.4 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#050505] border-2 border-[#1a1a1a] p-8 max-w-md w-full relative"
              >
                <button
                  onClick={() => setShowStreamPopup(false)}
                  className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <h3 className="font-sans text-2xl font-black uppercase mb-2 text-white">Select Platform</h3>
                <p className="text-[#888] text-sm uppercase tracking-widest mb-8">Choose where to stream</p>
                
                <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
                  <a
                    href="https://open.spotify.com/artist/46JGRcV3DcpVxSyhxDPwbN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border border-[#1a1a1a] hover:border-[#00ff00] hover:bg-[#00ff00]/5 transition-all group"
                  >
                    <span className="font-sans font-bold uppercase tracking-widest text-[#00ff00]">Spotify</span>
                    <Play className="w-5 h-5 text-zinc-600 group-hover:text-[#00ff00] transition-colors" />
                  </a>
                  <a
                    href="https://music.apple.com/us/artist/greenarts/1552854976"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border border-[#1a1a1a] hover:border-[#00ff00] hover:bg-[#00ff00]/5 transition-all group"
                  >
                    <span className="font-sans font-bold uppercase tracking-widest text-white">Apple Music</span>
                    <Play className="w-5 h-5 text-zinc-600 group-hover:text-[#00ff00] transition-colors" />
                  </a>
                  <a
                    href="https://music.youtube.com/@GreenArtsOfficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border border-[#1a1a1a] hover:border-[#00ff00] hover:bg-[#00ff00]/5 transition-all group"
                  >
                    <span className="font-sans font-bold uppercase tracking-widest text-white">YouTube Music</span>
                    <Play className="w-5 h-5 text-zinc-600 group-hover:text-[#00ff00] transition-colors" />
                  </a>
                  <a
                    href="https://music.amazon.com/artists/B08Y92T38J?ref=dm_ff_tracklists"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border border-[#1a1a1a] hover:border-[#00ff00] hover:bg-[#00ff00]/5 transition-all group"
                  >
                    <span className="font-sans font-bold uppercase tracking-widest text-white">Amazon Music</span>
                    <Play className="w-5 h-5 text-zinc-600 group-hover:text-[#00ff00] transition-colors" />
                  </a>
                  <a
                    href="https://soundcloud.com/greenarts-music"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border border-[#1a1a1a] hover:border-[#00ff00] hover:bg-[#00ff00]/5 transition-all group"
                  >
                    <span className="font-sans font-bold uppercase tracking-widest text-white">SoundCloud</span>
                    <Play className="w-5 h-5 text-zinc-600 group-hover:text-[#00ff00] transition-colors" />
                  </a>
                  <a
                    href="https://tidal.com/artist/23839599"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border border-[#1a1a1a] hover:border-[#00ff00] hover:bg-[#00ff00]/5 transition-all group"
                  >
                    <span className="font-sans font-bold uppercase tracking-widest text-white">Tidal</span>
                    <Play className="w-5 h-5 text-zinc-600 group-hover:text-[#00ff00] transition-colors" />
                  </a>
                  <a
                    href="https://www.deezer.com/us/artist/122858672"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border border-[#1a1a1a] hover:border-[#00ff00] hover:bg-[#00ff00]/5 transition-all group"
                  >
                    <span className="font-sans font-bold uppercase tracking-widest text-white">Deezer</span>
                    <Play className="w-5 h-5 text-zinc-600 group-hover:text-[#00ff00] transition-colors" />
                  </a>
                  <a
                    href="https://www.pandora.com/artist/greenarts/ARmkPnmqbl77h5g"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border border-[#1a1a1a] hover:border-[#00ff00] hover:bg-[#00ff00]/5 transition-all group"
                  >
                    <span className="font-sans font-bold uppercase tracking-widest text-white">Pandora</span>
                    <Play className="w-5 h-5 text-zinc-600 group-hover:text-[#00ff00] transition-colors" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
