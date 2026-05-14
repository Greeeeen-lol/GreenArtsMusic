import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Release() {
  const amuseLink = "https://share.amuse.io/track/greenarts-aint-lyin-1";
  const coverUrl = "https://i.scdn.co/image/ab67616d0000b27373cae8b5cd77049dcb1ea72e";

  const platforms = [
    { name: "Spotify", icon: "/amuse-img/spotify.png", url: "https://open.spotify.com/track/5ENDlLT6s9q76veLdVLfB4", action: "Play" },
    { name: "Apple Music", icon: "/amuse-img/apple-music.png", url: "https://music.apple.com/us/album/aint-lyin/1894718142", action: "Play" },
    { name: "YouTube Music", icon: "/amuse-img/youtube.png", url: "https://music.youtube.com/watch?v=G5MPOsxpmJg", action: "Play" },
    { name: "Deezer", icon: "/amuse-img/deezer.png", url: "https://www.deezer.com/track/3971030511", action: "Play" },
  ];

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#f3f3f3] font-sans antialiased flex flex-col relative w-full overflow-x-hidden">
      
      {/* Back Button (GreenArts context) */}
      <div className="absolute top-0 left-0 w-full p-6 z-50 flex items-center justify-between pointer-events-none">
        <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-semibold tracking-widest uppercase pointer-events-auto bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
      </div>

      {/* Header section (Blurry Background) */}
      <div className="relative w-full h-[332px] bg-black">
        <div 
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ 
            backgroundImage: `url(${coverUrl})`,
            filter: 'blur(50px)',
            transform: 'scale(1.1)' // Prevent blurred edges from becoming transparent
          }} 
        />
        <div className="absolute inset-0 bg-black/20" /> {/* Slight overlay */}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 -mt-[180px] flex-1 flex flex-col items-center w-full px-6">
        
        {/* Featured Title and Cover */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center w-full max-w-[856px] gap-8 mb-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[300px] lg:max-w-[392px] shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded bg-[#181818] order-2 lg:order-1 relative group"
          >
            <div className="w-full aspect-square relative overflow-hidden rounded">
              <img 
                src={coverUrl} 
                alt="GreenArts - ain't lyin container"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center lg:text-left order-1 lg:order-2 flex-1 pt-6 lg:pt-0"
          >
            <h1 className="text-3xl lg:text-[42px] font-medium leading-tight mb-2 tracking-tight lg:mb-4 lg:ml-6 drop-shadow-md">
              ain't lyin
            </h1>
            <p className="text-lg text-zinc-300 font-medium tracking-wide lg:ml-6 drop-shadow-md uppercase text-sm">
              GreenArts
            </p>
          </motion.div>
        </div>

        {/* Links Table Container */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-[808px] bg-[#181818] rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden mb-24"
        >
          <div className="flex flex-col w-full">
            {platforms.map((platform, index) => (
              <a
                key={platform.name}
                href={amuseLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between p-5 hover:bg-[#252525] transition-colors group ${
                  index % 2 === 0 ? 'bg-[#1e1e1e]' : 'bg-[#181818]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-[32px] h-[32px] flex items-center justify-center rounded overflow-hidden">
                    <img 
                      src={platform.icon} 
                      alt={platform.name} 
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <span className="text-[15px] lg:text-[18px] font-medium text-[#f3f3f3] group-hover:text-white transition-colors">
                    {platform.name}
                  </span>
                </div>
                <div>
                  <button className="bg-[#303030] hover:bg-[#565656] text-[#f3f3f3] text-[13px] font-medium px-8 py-3 rounded transition-colors uppercase tracking-wider">
                    {platform.action}
                  </button>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

      </div>
      
      {/* Footer Area */}
      <div className="bg-[#070707] py-8 text-center text-[#9a9a9a] text-[12px] flex flex-col items-center gap-2 mt-auto border-t border-[#1a1a1a]">
        <img src="/logo.png" alt="Amuse" className="h-[24px] opacity-30 grayscale mb-2" />
        <p>A mock presave link inspired by Amuse</p>
        <p>&copy; {new Date().getFullYear()} GreenArts. All Rights Reserved.</p>
      </div>

    </div>
  );
}
