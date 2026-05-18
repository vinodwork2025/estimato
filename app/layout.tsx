import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Estimato – Plan before you build",
    template: "%s | Estimato",
  },
  description:
    "Estimato helps Indian homeowners plan their home construction budget in 7 steps, with honest numbers and no contractor pitch.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in"
  ),
  openGraph: {
    siteName: "Estimato",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
