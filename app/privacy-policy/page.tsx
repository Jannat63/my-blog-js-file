import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Ahsan's Blog",
  description:
    "Read the privacy policy of Ahsan's Blog to understand how visitor information may be collected and used.",
};

export default function PrivacyPolicy() {
  return (
    <main className="max-w-[900px] mx-auto px-6 py-16">

      {/* Page Header */}
      <div className="mb-14">

        <h1 className="text-4xl font-bold tracking-tight">
          Privacy Policy
        </h1>

        <p className="text-gray-500 mt-3">
          How information may be collected and used on Ahsan's Blog.
        </p>

        <div className="mt-4 inline-block text-xs bg-gray-100 px-3 py-1 rounded-full">
          Last updated: March 2026
        </div>

      </div>


      {/* Section */}
      <section className="space-y-10 text-gray-700 leading-relaxed">

        <div className="bg-gray-50 p-6 rounded-xl border">
          <h2 className="text-xl font-semibold mb-3">
            1. Information We Collect
          </h2>

          <p>
            Ahsan's Blog does not require visitors to create accounts or submit
            personal information in order to read content. However, certain
            technical information may be collected automatically when you
            visit the website.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Browser type and version</li>
            <li>Device type</li>
            <li>Pages visited</li>
            <li>Date and time of visits</li>
            <li>Referring websites</li>
          </ul>
        </div>


        <div className="bg-gray-50 p-6 rounded-xl border">
          <h2 className="text-xl font-semibold mb-3">
            2. Cookies
          </h2>

          <p>
            Like many modern websites, Ahsan's Blog may use cookies or similar
            technologies to improve browsing experience and analyze how
            visitors interact with the site.
          </p>

          <p className="mt-3">
            You can disable cookies through your browser settings if you
            prefer.
          </p>
        </div>


        <div className="bg-gray-50 p-6 rounded-xl border">
          <h2 className="text-xl font-semibold mb-3">
            3. Third-Party Services
          </h2>

          <p>
            This website may use third-party services such as analytics tools,
            hosting providers, or content delivery networks that help improve
            website performance.
          </p>

          <p className="mt-3">
            These services may collect anonymous usage data according to their
            own privacy policies.
          </p>
        </div>


        <div className="bg-gray-50 p-6 rounded-xl border">
          <h2 className="text-xl font-semibold mb-3">
            4. External Links
          </h2>

          <p>
            Ahsan's Blog may contain links to external websites, including
            technology resources, news sources, or personal projects.
          </p>

          <p className="mt-3">
            We are not responsible for the privacy practices or content of
            external websites. Visitors are encouraged to review the privacy
            policies of those websites.
          </p>
        </div>


        <div className="bg-gray-50 p-6 rounded-xl border">
          <h2 className="text-xl font-semibold mb-3">
            5. Data Security
          </h2>

          <p>
            Reasonable measures are taken to protect website information and
            maintain security. However, no method of transmission over the
            internet is completely secure.
          </p>
        </div>


        <div className="bg-gray-50 p-6 rounded-xl border">
          <h2 className="text-xl font-semibold mb-3">
            6. Children's Information
          </h2>

          <p>
            Ahsan's Blog does not knowingly collect personal information from
            children under the age of 13.
          </p>

          <p className="mt-3">
            If you believe that a child has provided personal information
            through this website, please contact us and the information will
            be removed.
          </p>
        </div>


        <div className="bg-gray-50 p-6 rounded-xl border">
          <h2 className="text-xl font-semibold mb-3">
            7. Changes to This Policy
          </h2>

          <p>
            This Privacy Policy may be updated from time to time to reflect
            changes in website practices or legal requirements. Updates will
            always be posted on this page.
          </p>
        </div>


        {/* Contact */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">

          <h2 className="text-xl font-semibold mb-3">
            Contact
          </h2>

          <p>
            If you have any questions regarding this Privacy Policy, you may
            contact:
          </p>

          <div className="mt-4 space-y-1 text-sm">
            <p><strong>Ahsan Jannat</strong></p>
            <p>Email: ajbmix63@gmail.com</p>
          </div>

        </div>

      </section>


      {/* Back to Home */}
      <div className="mt-14 text-sm text-gray-500">
        ← <Link href="/" className="hover:underline">Back to Home</Link>
      </div>

    </main>
  );
}