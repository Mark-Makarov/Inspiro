// react/next.js
import type { Metadata } from "next";

// components
import { Room } from "@/app/Room";

// styles
import { Work_Sans } from "next/font/google";
import "@/styles/globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "600", "700"]
});

export const metadata: Metadata = {
  title: "Inspiro",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="ru">
      <body className={`${workSans.className} bg-primary-grey-200`}>
        <Room>
            {children}
        </Room>
      </body>
    </html>
  );
}
