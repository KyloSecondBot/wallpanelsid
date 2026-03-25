import "./globals.css";

export const metadata = {
  title: "wallpanels.id | Wall Panel Elegan | Interior Cepat Beres !",
  description: "wallpanels.id - Wall panel elegan dan modern untuk interior yang tak lekang waktu. Interior Cepat Beres !",
  icons: {
    icon: "/images/logo/wallpanels-logo.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  );
}
