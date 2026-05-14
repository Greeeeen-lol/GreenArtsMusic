import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";

export default function Contact() {
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

        <section className="pt-32 pb-24 px-4 sm:px-[40px] max-w-4xl mx-auto flex-1 w-full flex flex-col justify-center items-center">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="space-y-12 w-full text-center"
          >
            <div className="text-center space-y-6">
               <h1 className="font-sans text-[60px] sm:text-[80px] font-[900] uppercase text-emerald-chrome tracking-tighter m-0">
                 Contact
               </h1>
            </div>

            <div className="relative mx-auto max-w-xl">
              <div className="relative bg-[#0a0a0a] p-8 sm:p-[60px] border-2 border-[#1a1a1a] space-y-[30px] flex flex-col items-center justify-center hover:border-[#00FF00] transition-colors duration-500 group">
                <Mail className="w-16 h-16 text-[#888] group-hover:text-[#00FF00] transition-colors duration-500" />
                <div className="text-center">
                  <p className="text-[#888] text-[14px] uppercase tracking-[2px] font-[700] mb-2">Bookings & Inquiries</p>
                  <a 
                    href="mailto:greenarts615@gmail.com" 
                    className="text-[#00FF00] text-[18px] sm:text-[24px] font-[900] hover:text-white transition-colors"
                  >
                    greenarts615@gmail.com
                  </a>
                </div>
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
