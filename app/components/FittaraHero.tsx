import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "700"] });

type Language = "en" | "hi";

const copy = {
  en: {
    headlineLine1: "Welcome to Fittara",
    headlineLine2:
      "Your AI Compass in building the next big ecommerce fashion brand",
    body:
      "Fittara is your AI Compass to build the next big ecommerce fashion brand. Helping you launch and scale your fashion brand with AI-powered photo cataloguing, 3D TryOn for your customers and instant storefront setup. Seamlessly run Meta and WhatsApp marketing with intelligent automation that guides your growth. Payments, logistics, and order management are fully integrated so you focus on creating, while Fittara handles the rest.",
  },
  hi: {
    headlineLine1: "Fittara में आपका स्वागत है",
    headlineLine2:
      "अगला बड़ा ecommerce fashion brand बनाने में आपका AI Compass",
    body:
      "Fittara आपका AI Compass है, जो आपको अगला बड़ा ecommerce fashion brand बनाने में मदद करता है। AI-powered photo cataloguing, ग्राहकों के लिए 3D TryOn और instant storefront setup के साथ अपने फैशन ब्रांड को लॉन्च और scale करें। Intelligent automation के साथ Meta और WhatsApp marketing आसानी से चलाएं, जो आपकी growth को guide करता है। Payments, logistics और order management पूरी तरह integrated हैं—आप creation पर फोकस करें, बाकी Fittara संभालेगा।",
  },
};

type FittaraHeroProps = {
  language: Language;
};

export default function FittaraHero({ language }: FittaraHeroProps) {
  const t = copy[language];

  return (
    <section className="relative min-h-[50vh] md:min-h-[60vh]">
      <div
        className={`${openSans.className} relative max-w-5xl mx-auto px-4 pt-24 pb-20 md:pt-28 md:pb-24 text-center`}
      >
        <h1
          className="text-[32px] leading-[40px] md:text-[40px] md:leading-[49px] font-bold text-slate-900 mb-4"
        >
          <span className="fabric-ink" style={{ animationDelay: "0s" }}>
            {t.headlineLine1}
          </span>
          <br />
          <span className="fabric-ink" style={{ animationDelay: "0s" }}>
            {t.headlineLine2}
          </span>
        </h1>

        <div className="text-[13px] md:text-[14px] leading-[1.5] font-bold text-[#414141] max-w-[734px] mx-auto text-center">
          <p className="space-y-2">
            <span className="block mx-auto max-w-[520px]">
              {t.body}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
