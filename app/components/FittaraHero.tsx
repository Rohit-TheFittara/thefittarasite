import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "700"] });

export default function FittaraHero() {
  return (
    <section className="relative min-h-[50vh] md:min-h-[60vh]">
      <div
        className={`${openSans.className} relative max-w-5xl mx-auto px-4 pt-24 pb-20 md:pt-28 md:pb-24 text-center`}
      >
        <h1
          className="text-[40px] leading-[49px] font-bold text-slate-900 mb-4"
        >
          <span className="fabric-ink" style={{ animationDelay: "0s" }}>
            Welcome to Fittara
          </span>
          <br />
          <span className="fabric-ink" style={{ animationDelay: "0s" }}>
            Your AI Compass in building the next big ecommerce fashion brand
          </span>
        </h1>

        <div className="text-[14px] leading-[1.5] font-bold text-[#414141] max-w-[734px] mx-auto text-center">
          <p className="space-y-2">
            <span className="block mx-auto max-w-[520px]">
              Fittara is your AI Compass to build the next big ecommerce fashion
              brand.
            {/* </span>
            <span className="block mx-auto max-w-[680px]"> */}
              Helping you launch and scale your fashion brand with AI-powered
              photo cataloguing, 3D TryOn for your customers and instant storefront setup.
            {/* </span>
            <span className="block mx-auto max-w-[680px]"> */}
              Seamlessly run Meta and WhatsApp marketing with intelligent
              automation that guides your growth.
            {/* </span>
            <span className="block mx-auto max-w-[520px]"> */}
              Payments, logistics, and order management are fully integrated so
              you focus on creating, while Fittara handles the rest.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
