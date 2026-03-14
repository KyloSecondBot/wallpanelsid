import "./globals.css";

export const metadata = {
  title: "Wallpanels.id | Wall Panel Elegan | Interior Cepat Beres",
  description: "Wallpanels.id — Wall panel elegan dan modern untuk interior yang tak lekang waktu. Interior Cepat Beres.",
  icons: {
    icon: "/images/wallpanels-logo.webp",
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
