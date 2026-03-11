import type { Metadata } from "next";
import 'remixicon/fonts/remixicon.css';
import { Cairo, Kanit } from 'next/font/google';
import "./globals.css";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next"

const peace = localFont({
  src: [
    {
      path: '../public/fonts/PeaceSans.ttf',
    },
   
  ],
  variable: '--font-english'
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-arabic',
  weight: ['400', '700', '900'],
  display: 'swap',
});

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['400', '700', '800', '900'], 
  variable: '--font-english',          
  display: 'swap',
});


export const metadata: Metadata = {
  title: "Group Bimo",
  description: "Group Bimo official website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en" className={`${peace.variable} ${cairo.variable}`} >
  
      <body
      >
        <SpeedInsights />
        
       
        {children}
      </body>
    </html>
   
  );
}
