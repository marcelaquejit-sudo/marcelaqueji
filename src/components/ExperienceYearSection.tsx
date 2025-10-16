import React, { useState } from "react";

export default function ExperienceYearsSection() {
  const [showCopy, setShowCopy] = useState(false);
  return (
    <section
      id="anos"
      className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-white group scroll-mt-24"
      onMouseEnter={() => setShowCopy(true)}
      onMouseLeave={() => setShowCopy(false)}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex items-center justify-center [perspective:1200px]">
        <span
          className={`text-[40vw] sm:text-[34vw] md:text-[28vw] lg:text-[24vw] leading-none font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#d9d9d9] via-white to-[#bdbdbd] animate-floatFive transition-transform duration-700 ease-out will-change-transform inline-block text-3d ${showCopy ? '-translate-x-[15%] rotate-y-6' : 'rotate-y-0'}`}
          aria-hidden
        >
          5
        </span>
        <div className={`absolute right-[6%] max-w-xl text-right transition-all duration-700 ease-out ${showCopy ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}>
          <p className="text-gray-600 text-lg sm:text-xl md:text-2xl leading-relaxed">
            Continuando desde 2020. <br />
            Dezenas de empresas. Centenas de projetos. <br />
            E isso é só o começo.
          </p>
        </div>
      </div>
    </section>
  );
}