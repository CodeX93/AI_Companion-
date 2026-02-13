import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Companion - Your Perfect Match',
  description: 'Connect with your personalized AI companion',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* TinyAds Integration */}
        {/* Replace 'YOUR-PUBLISHER-ID' with actual ID. */}
        {/* Condition this on user subscription if possible (client side or server side check). For now, global. */}
        {/* <script src="https://tinyads.io/publisher.js?id=YOUR_ID" async></script> */}
      </body>
    </html>
  );
}
