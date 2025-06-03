const Footer = () => {
  return (
    <footer className="bg-black text-white min-h-[400px] w-full px-4 sm:px-6 lg:px-10 py-8">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-center min-h-[320px]">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">

          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h1 className="text-2xl font-bold font-lora mb-3">
              <span className="text-[#ff5835]">te</span>
              <span className="italic">sera</span>
            </h1>
            <p className="text-sm leading-relaxed text-gray-300 max-w-xs">
              Learn, write, share, and grow — all in one platform built for developers.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="font-semibold mb-3 text-white">Navigation</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/feature" className="hover:text-white transition-colors">Feature</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h2 className="font-semibold mb-3 text-white">Features</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Courses</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Articles</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Posts & Feeds</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community Spaces</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h2 className="font-semibold mb-3 text-white">Community</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Join Our Discord</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Follow us on Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GitHub Repo</a></li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <ul className="space-y-2 text-sm text-gray-300 mb-6">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Getting Started Guide</a></li>
            </ul>
            <div className="text-sm text-gray-400 border-t border-gray-700 pt-4 lg:border-t-0 lg:pt-0">
              <div>tesera</div>
              <div>—</div>
              <div>Indonesia</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;