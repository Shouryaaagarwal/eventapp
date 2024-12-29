import type { Metadata } from "next";
import { Poppins } from "next/font/google"; 
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/nextjs'
import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
  
const poppins = Poppins({ subsets: ["latin"]  , 
  weight:['400', '500', '600' ,'700'] ,
  variable: "--font-poppins",
 });

export const metadata: Metadata = {
  title: "Evently ",
  description: "Event Management platform", 
  icons : {
    icon:'/assets/images/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (   
    <ClerkProvider>

    <html lang="en">
      <body
        className={`${poppins.variable} ${poppins.variable} antialiased`}
      > 
            
        {children}
      </body>
    </html>   
    </ClerkProvider>

  );
}
