export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Thank you for reaching out 👋
        </h1>
        <p className="text-sm md:text-base text-slate-300 mb-4">
          We’ve received your details. Someone from the Fittara team will
          contact you on WhatsApp / phone to understand your boutique and walk
          you through the platform.
        </p>
        <p className="text-xs md:text-sm text-slate-500 mb-8">
          If this was a test submission, you can close this tab and continue
          exploring the site.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-purple-500 hover:bg-purple-400 text-sm font-semibold"
        >
          Back to Fittara
        </a>
      </div>
    </main>
  );
}
