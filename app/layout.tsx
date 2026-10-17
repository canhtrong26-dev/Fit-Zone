import "./globals.css";

export const metadata = {
  title: "FitZone Gym",
  description: "Join FitZone - where champions are made",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}