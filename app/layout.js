import { inter } from "@/app/ui/font"
import { NavbarDemo } from "@/app/ui/navbar";
import Footer from "@/components/footer";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'


export const metadata = {
  title: {
    template: '%s | Process List',
    default: 'Process Manager',
  },
  description: 'This app helps you organize the process of software Engineering Models.',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
      

      <body className={`${inter.className} antialiased  `}>
        {/* Header */}
        
        <NavbarDemo />

        {/* Main Content */}

          {/* implement toaster */}
        <main className="min-h-screen   "> 
          {children}
        </main>

        {/* Footer */}

          <Footer />

      </body>
    </html>
    </ClerkProvider>
  );
}
