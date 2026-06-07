import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Compass, Ship, MapPin, Anchor, Stamp, Feather, Navigation } from 'lucide-react';

// --- CONFIGURAÇÃO VISUAL ---
const colors = {
  bgMap: '#e3c68c',       
  bgLetter: '#f4e8d1',    
  textSepia: '#3a200d',   
  accentGold: '#9c7a46',  
  sealRed: '#7a1c14',     
  iconsDark: '#211002',   
  burnEdge: 'rgba(101, 67, 33, 0.35)' 
};

// --- ÁUDIO ---
const playSound = (soundType) => {
  try {
    // Procura os arquivos na pasta 'public'
    const audio = new Audio(soundType === 'paper' ? '/paper.mp3' : '/magic.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => console.log("Áudio aguardando interação."));
  } catch (error) {
    console.log("Erro de áudio", error);
  }
};

// --- ANIMAÇÕES GLOBAIS ---
const letterVariants = {
  hidden: { opacity: 0, y: 120, rotate: -5 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    rotate: (index % 2 === 0 ? -1.5 : 2.5) + (Math.random() - 0.5) * 1.5,
    transition: { duration: 1.2, type: "spring", bounce: 0.4, delay: index * 0.15 }
  })
};

const floatingVariants = {
  float: {
    y: [0, -6, 0],
    rotate: [null, -0.5, 0.5, 0],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
  }
};

// --- COMPONENTES VISUAIS EXTRAS ---
const DustParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#f1e2c3] opacity-20"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -100, -200],
            x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25],
            opacity: [0, 0.4, 0]
          }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
};

const HeartBurst = () => {
  const hearts = Array.from({ length: 8 });
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-50 flex justify-center items-center">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 1, scale: 0, y: 0, x: 0 }}
          animate={{ 
            opacity: 0, 
            scale: Math.random() * 1.8 + 0.5, 
            y: - (Math.random() * 180 + 60), 
            x: (Math.random() - 0.5) * 120,
            rotate: Math.random() * 360
          }}
          transition={{ duration: 1.2 + Math.random() * 0.5, ease: "easeOut" }}
          className="absolute"
        >
          <Heart className="text-[#7a1c14] w-6 h-6 fill-[#7a1c14]" />
        </motion.div>
      ))}
    </div>
  );
};

const PhotoCorners = () => (
  <div className="absolute inset-0 pointer-events-none z-20">
    <div className="absolute top-2 left-2 w-6 h-6 border-t-[3px] border-l-[3px] rounded-tl-sm opacity-60 shadow-sm" style={{ borderColor: colors.accentGold }}></div>
    <div className="absolute top-2 right-2 w-6 h-6 border-t-[3px] border-r-[3px] rounded-tr-sm opacity-60 shadow-sm" style={{ borderColor: colors.accentGold }}></div>
    <div className="absolute bottom-2 left-2 w-6 h-6 border-b-[3px] border-l-[3px] rounded-bl-sm opacity-60 shadow-sm" style={{ borderColor: colors.accentGold }}></div>
    <div className="absolute bottom-2 right-2 w-6 h-6 border-b-[3px] border-r-[3px] rounded-br-sm opacity-60 shadow-sm" style={{ borderColor: colors.accentGold }}></div>
  </div>
);

const RusticPaperTexture = () => (
  <div 
    className="absolute inset-0 pointer-events-none z-0 rounded-sm"
    style={{
      boxShadow: `inset 0 0 40px ${colors.burnEdge}, inset 0 0 10px rgba(0,0,0,0.3)`,
      backgroundImage: `
        linear-gradient(to right, transparent 49%, rgba(0,0,0,0.03) 50%, transparent 51%),
        radial-gradient(circle at center, transparent 40%, rgba(101, 67, 33, 0.08) 100%)
      `
    }}
  />
);

// --- COMPONENTES PRINCIPAIS ---

// Componente 1: A Carta de Memória
const MemoryLetter = ({ question, title, text, index }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  const handleOpen = () => {
    if (!isOpened) {
      playSound('paper'); // Som ao abrir carta de memória
      setIsOpened(true);
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 1500);
    }
  };

  const stampIcons = [
    <Ship className="w-full h-full" />,
    <Anchor className="w-full h-full" />,
    <MapPin className="w-full h-full" />,
    <Navigation className="w-full h-full" />
  ];

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      whileHover="float"
      variants={letterVariants}
      viewport={{ once: true, margin: "-100px" }}
      className="w-[92%] max-w-xl mx-auto mb-32 relative z-20 group"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.4 }}
        className="absolute -top-16 -left-4 md:-left-12 z-10 flex flex-col items-center"
        style={{ color: colors.iconsDark }} 
      >
        <Ship className="w-8 h-8 md:w-10 md:h-10 mb-2" style={{ filter: 'drop-shadow(0px 2px 3px rgba(255,255,255,0.6))' }} />
        <div 
          className="w-1.5 h-16 md:h-20 opacity-90"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, ${colors.iconsDark} 50%, transparent 50%)`, 
            backgroundSize: '100% 16px',
            filter: 'drop-shadow(0px 0px 2px rgba(255,255,255,0.4))'
          }}
        ></div>
      </motion.div>

      <motion.div 
        layout
        onClick={handleOpen}
        whileHover={{ scale: !isOpened ? 1.02 : 1 }}
        style={{ backgroundColor: colors.bgLetter, color: colors.textSepia, borderColor: '#d4c0a1' }}
        className={`rounded-sm shadow-[0_20px_40px_rgba(0,0,0,0.6)] border relative cursor-pointer overflow-hidden transition-colors
          ${!isOpened ? 'min-h-[160px]' : 'min-h-[300px]'}`}
      >
        <RusticPaperTexture />
        <PhotoCorners />

        <AnimatePresence>
          {!isOpened ? (
            // ESTADO: FECHADO (Corrigido o posicionamento da aba, do selo e do texto)
            <motion.div
              key="closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, display: 'none' }}
              // pt-[100px] garante que o texto comece bem abaixo do selo
              className="text-center flex flex-col items-center justify-start h-full relative z-10 pt-[100px] pb-8"
            >
              {/* Aba do envelope responsiva e perfeita */}
              <div 
                className="absolute top-0 left-0 w-full h-[75px] opacity-80 z-10 pointer-events-none drop-shadow-md" 
                style={{ backgroundColor: '#e8dac0', clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
              ></div>
              
              {/* Mini selo de cera (exatamente na ponta da aba) */}
              <div 
                className="absolute top-[55px] left-1/2 -translate-x-1/2 w-10 h-10 rounded-full shadow-md flex items-center justify-center z-20" 
                style={{ backgroundColor: colors.sealRed }}
              >
                <div className="w-6 h-6 rounded-full border border-white/20"></div>
              </div>

              {/* Título da Carta - Agora sem sobreposição */}
              <h3 className="font-['Dancing_Script'] text-3xl md:text-5xl px-4 font-bold opacity-90 mt-2">
                {question}
              </h3>
              <div className="mt-6 flex items-center gap-2 opacity-60">
                <div className="w-8 h-[1px] bg-current"></div>
                <p className="font-serif text-[10px] uppercase tracking-[0.2em]">Quebrar o selo</p>
                <div className="w-8 h-[1px] bg-current"></div>
              </div>
            </motion.div>
          ) : (
            // ESTADO: ABERTA
            <motion.div
              key="opened"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative z-10 p-8 md:p-12"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                animate={{ opacity: 0.15, scale: 1, rotate: 15 }} 
                transition={{ duration: 0.8 }}
                className="absolute top-0 right-0 md:top-4 md:right-4 w-28 h-28 border-[3px] rounded-full p-4 flex items-center justify-center pointer-events-none z-0"
                style={{ borderColor: colors.iconsDark, color: colors.iconsDark }}
              >
                {stampIcons[index % stampIcons.length]}
              </motion.div>

              <div className="relative z-10 pt-2">
                <h2 className="font-['Dancing_Script'] text-5xl md:text-6xl mb-6 mt-2 text-center font-bold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
                  {title}
                </h2>
                <p className="font-serif text-lg md:text-xl whitespace-pre-line text-justify leading-[1.8] px-2 md:px-4 opacity-90">
                  {text}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showHearts && <HeartBurst />}
      </motion.div>
    </motion.div>
  );
};

// 2. Componente da Carta Final (O Pedido - COM CHUVA DE CORAÇÕES)
const ProposalLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGrandFinale, setShowGrandFinale] = useState(false);

  const whatsappNumber = "5581991401898";
  const linkSim = `https://wa.me/${whatsappNumber}?text=Sim!%20Eu%20quero%20namorar%20com%20voc%C3%AA!`;
  const linkComCerteza = `https://wa.me/${whatsappNumber}?text=Com%20certeza!%20%C3%89%20o%20que%20eu%20mais%20quero!`;

  const handleSealClick = () => {
    playSound('magic');
    setShowGrandFinale(true); // Dispara a chuva de corações
    setTimeout(() => setIsOpen(true), 500); // Abre a carta logo depois
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] py-16 relative z-20 w-full px-4">
      
      {/* CHUVA DE CORAÇÕES MASSIVA NO CLIQUE */}
      {showGrandFinale && (
        <div className="fixed inset-0 pointer-events-none z-[100] flex justify-center items-center overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, scale: 0, y: 0, x: 0 }}
              animate={{ 
                opacity: 0, 
                scale: Math.random() * 2 + 0.5, 
                y: (Math.random() - 0.5) * 800, // Espalha verticalmente
                x: (Math.random() - 0.5) * 800  // Espalha horizontalmente
              }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="absolute"
            >
              <Heart className="text-red-700 w-10 h-10 fill-red-700" />
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="sealed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            className="relative cursor-pointer group flex flex-col items-center w-full"
            onClick={handleSealClick}
          >
            <div className="w-[300px] md:w-[360px] h-[200px] md:h-[240px] rounded-sm shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-[#a8907a] flex items-center justify-center relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-2" style={{ backgroundColor: '#cbb694' }}>
              <div className="absolute top-0 left-0 w-full h-full border-t-[100px] md:border-t-[120px] border-x-[150px] md:border-x-[180px] border-x-transparent border-b-0 drop-shadow-2xl z-0" style={{ borderTopColor: '#bfa782' }}></div>
              <motion.div 
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full shadow-[0_10px_25px_rgba(122,28,20,0.8)] flex items-center justify-center z-10 border-[4px] relative"
                style={{ backgroundColor: colors.sealRed, borderColor: '#4a0f0a' }}
              >
                <div className="absolute top-1 left-2 w-6 h-3 bg-white/20 rounded-full rotate-[-45deg] pointer-events-none"></div>
                <Heart className="text-[#f1e2c3] w-10 h-10 md:w-12 md:h-12 fill-[#f1e2c3] drop-shadow-md" />
              </motion.div>
            </div>
            <motion.p 
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-center mt-10 font-['Dancing_Script'] text-4xl shadow-sm px-6 py-2 rounded-full font-bold"
              style={{ color: colors.bgLetter, backgroundColor: 'rgba(33, 16, 2, 0.7)', backdropFilter: 'blur(4px)' }}
            >
              Destravar o baú...
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="rounded-sm shadow-[0_0_80px_rgba(0,0,0,0.9)] border-2 w-full max-w-xl text-center relative overflow-hidden"
            style={{ backgroundColor: colors.bgLetter, borderColor: colors.accentGold }}
          >
            <RusticPaperTexture />
            <PhotoCorners />
            <Compass className="absolute inset-0 m-auto w-72 h-72 pointer-events-none z-0 opacity-15" style={{ color: colors.iconsDark }} />

            <div className="relative z-10 p-8 md:p-16">
              <h1 className="font-['Dancing_Script'] text-6xl md:text-7xl mb-8 mt-4 leading-[1.1] font-bold" style={{ color: colors.sealRed, textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
                Você quer namorar comigo?
              </h1>
              <p className="font-serif mb-12 text-lg md:text-xl px-2 font-medium" style={{ color: colors.textSepia }}>
                (Insira aqui a sua declaração final. Descreva como essa viagem até aqui foi incrível e como você mal pode esperar pelas próximas aventuras.)
              </p>
              <div className="flex flex-col gap-5 px-2 md:px-8">
                <motion.a
                  href={linkSim} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, backgroundColor: '#4a0f0a' }} whileTap={{ scale: 0.95 }}
                  className="px-8 py-5 text-[#fdfbf7] font-serif text-2xl font-bold rounded-sm shadow-2xl transition-all text-center border"
                  style={{ backgroundColor: colors.sealRed, borderColor: '#4a0f0a' }}
                >
                  Sim
                </motion.a>
                <motion.a
                  href={linkComCerteza} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(122,28,20,0.1)' }} whileTap={{ scale: 0.95 }}
                  className="px-8 py-5 bg-transparent border-2 font-serif text-2xl font-bold rounded-sm shadow-md transition-all text-center"
                  style={{ borderColor: colors.sealRed, color: colors.sealRed }}
                >
                  Com certeza!
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (APP) ---
export default function App() {
  const memories = [
    {
      question: "O Primeiro Porto...",
      title: "Onde tudo começou",
      text: "Lembra daquele primeiro dia? Eu confesso que estava nervoso(a). O clima estava perfeito, e assim que nossos olhares se cruzaram, eu soube que ali havia começado uma viagem muito especial."
    },
    {
      question: "Navegando juntos...",
      title: "Um mar de momentos",
      text: "Tivemos tantas aventuras incríveis, mas aquele dia em que [insira uma situação] ficou marcado como um farol. Ali eu percebi que sua companhia era tudo o que eu precisava."
    },
    {
      question: "A minha bússola...",
      title: "O que me encanta",
      text: "Eu amo o jeito que você sorri, a forma como consegue transformar mares agitados em calmaria, e como me faz sentir seguro(a) quando estamos juntos."
    },
    {
      question: "Olhando o horizonte...",
      title: "Nossos planos",
      text: "Olhando para trás no mapa, vejo o quanto avançamos. Mas o que mais me anima é olhar para o oceano à frente. Descobrir novos mundos com você é meu passatempo favorito."
    }
  ];

  return (
    <div 
      className="min-h-screen overflow-x-hidden relative"
      style={{
        backgroundImage: "url('/Mapa Antigo.webp')",
        backgroundColor: colors.bgMap,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "multiply"
      }}
    >
      <div className="fixed inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(circle, transparent 10%, rgba(20,10,0,0.65) 100%)' }}></div>

      <DustParticles />

      <Feather className="fixed top-32 right-12 w-32 h-32 rotate-[-20deg] opacity-50 pointer-events-none z-10" style={{ color: colors.iconsDark, filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' }} />
      <Compass className="fixed bottom-20 left-10 w-64 h-64 rotate-[15deg] opacity-40 pointer-events-none z-10" style={{ color: colors.iconsDark, filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' }} />
      <Stamp className="fixed top-[45vh] left-16 w-24 h-24 rotate-[35deg] opacity-40 pointer-events-none z-10" style={{ color: colors.iconsDark, filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' }} />

      <header className="pt-28 pb-20 px-4 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="inline-block"
        >
          <h1 className="font-['Dancing_Script'] text-7xl md:text-9xl font-bold" style={{ color: colors.bgLetter, textShadow: '5px 5px 15px rgba(0,0,0,0.9), 0px 0px 5px rgba(0,0,0,0.8)' }}>
            Nossa Viagem
          </h1>
          <p className="font-serif mt-6 text-xl tracking-[0.3em] uppercase opacity-90 font-bold" style={{ color: colors.bgLetter, textShadow: '2px 2px 5px rgba(0,0,0,0.8)' }}>
            Um diário de bordo
          </p>
        </motion.div>
      </header>

      <main className="w-full relative z-20 flex flex-col items-center">
        {memories.map((memory, index) => (
          <MemoryLetter 
            key={index} 
            index={index} 
            question={memory.question}
            title={memory.title} 
            text={memory.text} 
          />
        ))}

        <ProposalLetter />
      </main>
      
      <footer className="text-center py-16 font-serif text-sm relative z-20 pointer-events-none font-bold" style={{ color: colors.bgLetter, opacity: 0.7, textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
        <Anchor className="w-8 h-8 mx-auto mb-4" />
        <p>Com todo o meu amor, para sempre sua âncora.</p>
      </footer>
    </div>
  );
}