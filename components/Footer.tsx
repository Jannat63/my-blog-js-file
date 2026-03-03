export default function Footer() {
  return (
    <footer className="border-t mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12 text-sm text-gray-600">

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">
            Ahsan.
          </h3>
          <p className="leading-relaxed">
            A clean minimalist blog built with Next.js and
            powered by modern design principles.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">
            Navigation
          </h4>
          <ul className="space-y-2">
            <li>Home</li>
            <li>Articles</li>
            <li>Admin</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">
            Connect
          </h4>
          <ul className="space-y-2">
            <li>Twitter</li>
            <li>LinkedIn</li>
            <li>GitHub</li>
          </ul>
        </div>

      </div>

      <div className="text-center text-xs text-gray-400 pb-8">
        © {new Date().getFullYear()} Ahsan Blog. All rights reserved.
      </div>
    </footer>
  );
}