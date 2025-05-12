import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "InjuryPredictionML - Sports Injury Prediction with Machine Learning",
  description:
    "Predict sports injuries and recovery time with InjuryPredictionML, a machine learning project by UIET PU students. Enter player details to get instant predictions.",
  keywords:
    "sports injury prediction, injury prediction ML, machine learning sports, athlete injury risk, sports analytics, UIET PU project, 6th semester project",
  openGraph: {
    title: "InjuryPredictionML - Sports Injury Prediction",
    description:
      "Use our ML model to predict sports injuries and recovery times. A 6th-semester project by UIET PU students.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "InjuryPredictionML",
      },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
    <head>
        <meta
          name="google-site-verification"
          content="3C7Fp5JCJYH_HXkjYxLQeuLQLGJjVN5HMk3GTKYHiiw"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
