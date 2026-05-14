import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00ff00] selection:text-white font-sans">
      <div className="flex flex-col min-h-screen border-[8px] border-[#00FF00] box-border relative mx-auto w-full max-w-none overflow-x-hidden">
        <header className="flex justify-between items-center px-4 sm:px-[40px] py-[20px] border-b-2 border-[#1a1a1a] w-full z-50 bg-[#050505]">
          <Link to="/" className="font-sans text-[12px] font-[700] tracking-[2px] text-[#00FF00] uppercase hover:text-white transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="font-sans text-[24px] font-[900] tracking-[-1px] text-[#00FF00] uppercase">GA.</div>
          <div className="w-[80px]"></div>{/* Spacer */}
        </header>

        <section className="pt-32 pb-24 px-4 sm:px-[40px] max-w-4xl mx-auto flex-1">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="space-y-12"
          >
            <div className="text-center space-y-6">
               <h1 className="font-sans text-[60px] sm:text-[80px] font-[900] uppercase text-emerald-chrome tracking-tighter m-0">
                 My Story
               </h1>
               <p className="font-sans text-[12px] font-[700] text-[#00FF00] uppercase tracking-[4px]">
                 Logan Davila // Est. 2008 // Buffalo, NY
               </p>
            </div>

            <div className="relative">
              <div className="relative bg-[#0a0a0a] p-6 sm:p-[40px] border-2 border-[#1a1a1a] space-y-[30px] text-[#888] text-[14px] leading-[1.8] font-normal">
                
                <p>
                  I was born in Buffalo, New York, but my true home has always been the digital ether. As a creator native to the internet since day one, physical geography never limited my ambition. I started making music when I was 12, treating genres not as walled gardens, but as open-source toolkits.
                </p>

                <div className="pl-[20px] border-l-2 border-[#00FF00] py-[10px]">
                  <p className="italic text-white text-[16px] font-[700]">
                    "I don't just want to carve a rhythm, I want to sculpt a mood."
                  </p>
                </div>

                <p>
                  I've always been a one-man studio. I handle my own programming, build my own synthesizer arrangements, track my own vocals, and compose the majority of my catalog. Operating at the intersection of hip-hop, hyperpop, and synth-pop, I aim for a sound that hits with low-end kinetic energy while leaving you immersed in heavy, atmospheric nostalgia.
                </p>

                <div className="space-y-[20px] pt-[20px] border-t border-[#1a1a1a]">
                  <h3 className="font-[800] text-white text-[18px] uppercase flex items-center gap-[10px] m-0">
                    <Sparkles className="w-5 h-5 text-[#00FF00]" /> 
                    The Journey So Far
                  </h3>
                  <ul className="space-y-[15px] m-0 p-0 list-none">
                    <li className="flex gap-[20px]">
                      <span className="text-[#00FF00] font-[900] min-w-[50px]">2021</span>
                      <span>Released my debut album "All You Need Is Love" at age 13, establishing my digital footprint.</span>
                    </li>
                    <li className="flex gap-[20px]">
                      <span className="text-[#00FF00] font-[900] min-w-[50px]">2022</span>
                      <span>Dropped two albums and an EP ("Heartbreak // Depression", "New Era", "Unethical - EP") pivoting to a darker, more introspective sound.</span>
                    </li>
                    <li className="flex gap-[20px]">
                      <span className="text-[#00FF00] font-[900] min-w-[50px]">2024</span>
                      <span>Found critical acclaim with "Dance With Me", praised for what reviewers called a "chromatic typhoon."</span>
                    </li>
                    <li className="flex gap-[20px]">
                      <span className="text-[#00FF00] font-[900] min-w-[50px]">2025</span>
                      <span>Released a torrential cascade of singles detailing the relentless emotional turbulence of late adolescence.</span>
                    </li>
                    <li className="flex gap-[20px]">
                      <span className="text-[#00FF00] font-[900] min-w-[50px]">2026</span>
                      <span>Teamed up with elite industry educator Simon Servida to co-produce "ain't lyin", officially bridging the gap between bedroom production and high-level sonic architecture.</span>
                    </li>
                  </ul>
                </div>

                <p className="pt-[20px] border-t border-[#1a1a1a]">
                  They call what I do an "electric lasso" — whispering over heavy, hyper-compressed 808s to bring the audience into a deeply secretive, intimate space. Whatever you want to call it, it's just me, sculpting the soundtrack to nocturnal youth.
                </p>

              </div>
            </div>
          </motion.div>
        </section>
        
        <footer className="h-[40px] bg-[#00FF00] text-black flex items-center justify-between px-4 sm:px-[40px] font-sans font-[800] text-[10px] uppercase tracking-[1px] border-t-2 border-[#1a1a1a] mt-auto">
           <div className="hidden sm:block">&copy; 2026 GREENARTS RECORDS</div>
           <div>ALL RIGHTS RESERVED</div>
           <div className="flex gap-[20px]">
              <a href="https://www.instagram.com/greenarts.music?utm_source=gr&igsh=" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <a href="https://www.tiktok.com/@greenarts1?_r=1&_t=ZP-96LwdziVopK" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a>
              <a href="https://open.spotify.com/artist/46JGRcV3DcpVxSyhxDPwbN" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Spotify</a>
              <a href="https://music.apple.com/us/artist/greenarts/1552854976" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Apple</a>
           </div>
        </footer>
      </div>
    </div>
  );
}
