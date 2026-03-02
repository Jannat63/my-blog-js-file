export default function Footer() {
  return (
    <footer className="border-t mt-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MyBlog. All rights reserved.
      </div>
    </footer>
  );
}