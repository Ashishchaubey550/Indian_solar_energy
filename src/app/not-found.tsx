import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 flex items-center justify-center bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl -z-10 mix-blend-multiply dark:mix-blend-overlay"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl -z-10 mix-blend-multiply dark:mix-blend-overlay"></div>

        <div className="container mx-auto px-4 py-16 text-center z-10">
          <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-yellow-500">
              404
            </h1>
            
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Page Not Found
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Oops! The page you are looking for seems to have gone off the grid. 
                Let's get you back to the sunny side.
              </p>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/"
                className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-green-500/30 active:scale-95"
              >
                Return to Homepage
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 rounded-full font-semibold transition-all shadow-sm active:scale-95"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
