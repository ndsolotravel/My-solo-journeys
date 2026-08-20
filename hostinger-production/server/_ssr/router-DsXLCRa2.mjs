import { b as QueryClient, h as hydrate, d as dehydrate } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQueryClient, q as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, b as useRouterState, O as Outlet, H as HeadContent, S as ScriptOnce, d as Scripts, e as createFileRoute, l as lazyRouteComponent, f as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { y as redirect, z as notFound, m as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster, t as toast } from "../_libs/sonner.mjs";
import { s as createSsrRpc, g as getMyRoles } from "./admin.functions-DwpNeojB.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { s as supabase } from "./client-BqBvvzI9.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BO6ULLpK.mjs";
import { S as Search, I as Instagram, U as User, L as LogOut, X, M as Menu, Y as Youtube, T as Twitter, F as Facebook, a as Linkedin, A as ArrowUp, G as Globe, b as LoaderCircle, C as CircleAlert, c as Sun, d as Moon, e as FileText, f as MapPin } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import { o as objectType, s as stringType, e as enumType, n as numberType, b as booleanType, a as arrayType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/ws.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function useServerFn(serverFn) {
  const router2 = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router2.stores.location.get();
        return router2.navigate(router2.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router2, serverFn]);
}
const appCss = "/assets/styles-DnOPAhdu.css";
function ThemeToggle() {
  const [dark, setDark] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: toggle,
      "aria-label": "Toggle theme",
      className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted transition-colors",
      children: dark ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4" })
    }
  );
}
const searchSite = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  q: stringType().min(1).max(120),
  limit: numberType().min(1).max(20).default(8)
}).parse(input)).handler(createSsrRpc("a6fe99b6c5dcc70449cba6ff172f26fdfca262543e0dcc863e3d4993fb3c4e61"));
const STORAGE_PREFIX = "ndsolo_tr_";
function getLangCache(lang) {
  const map = /* @__PURE__ */ new Map();
  if (typeof window === "undefined") return map;
  try {
    const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${lang}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed === "object" && parsed !== null) {
        for (const [k, v] of Object.entries(parsed)) {
          if (typeof v === "string") map.set(k, v);
        }
      }
    }
  } catch {
  }
  return map;
}
function getCached(lang, text) {
  if (typeof window === "undefined" || !lang || !text) return null;
  const map = getLangCache(lang);
  return map.get(text) ?? null;
}
function setCached(lang, text, value) {
  if (typeof window === "undefined" || !lang || !text || !value) return;
  try {
    const map = getLangCache(lang);
    map.set(text, value);
    const obj = {};
    map.forEach((v, k) => {
      obj[k] = v;
    });
    window.localStorage.setItem(`${STORAGE_PREFIX}${lang}`, JSON.stringify(obj));
  } catch {
  }
}
const UI_DICTIONARY = {
  // Bahasa Indonesia
  id: {
    "The Journal": "Jurnal",
    "Stories from the road, the trail, and the saddle.": "Cerita dari jalan, jalur, dan pelana.",
    "Search stories…": "Cari cerita…",
    All: "Semua",
    "No stories match that filter yet.": "Belum ada cerita yang cocok dengan filter itu.",
    story: "cerita",
    stories: "cerita",
    "published so far.": "dipublikasikan sejauh ini.",
    Stories: "Cerita",
    "min read": "menit baca",
    "Keep reading": "Lanjutkan membaca",
    "Story not found": "Cerita tidak ditemukan",
    "This trail has been moved or doesn't exist.": "Jalur ini telah dipindahkan atau tidak ada.",
    "Back to all stories": "Kembali ke semua cerita",
    "Reviews & Comments": "Ulasan & Komentar",
    rating: "penilaian",
    ratings: "penilaian",
    "Your rating": "Penilaian Anda",
    "Name (optional)": "Nama (opsional)",
    "Email (optional, not shown)": "Email (opsional, tidak ditampilkan)",
    "Share your thoughts…": "Bagikan pemikiran Anda…",
    "No account needed. Email is private.": "Tidak perlu akun. Email bersifat pribadi.",
    "Post review": "Kirim ulasan",
    "Posting…": "Mengirim…",
    "Be the first to leave a review.": "Jadilah yang pertama memberikan ulasan.",
    "Could not post review": "Gagal mengirim ulasan",
    "Please write a review": "Silakan tulis ulasan",
    Share: "Bagikan",
    Facebook: "Facebook",
    LinkedIn: "LinkedIn",
    "Copy link": "Salin tautan",
    "Link copied": "Tautan disalin",
    "Photo Gallery": "Galeri Foto",
    "Traveled on": "Dijelajahi pada",
    Destination: "Destinasi",
    Destinations: "Destinasi",
    Language: "Bahasa",
    Home: "Beranda",
    About: "Tentang",
    Contact: "Kontak",
    Gallery: "Galeri",
    Map: "Peta",
    Search: "Cari",
    Category: "Kategori",
    Categories: "Kategori",
    Tags: "Tag",
    Trekking: "Trekking",
    Motorcycle: "Sepeda Motor",
    Overland: "Overland",
    Culture: "Budaya",
    Photography: "Fotografi",
    Guides: "Panduan",
    Tips: "Tips",
    Gear: "Perlengkapan",
    Close: "Tutup",
    Next: "Berikutnya",
    Previous: "Sebelumnya",
    "Read story": "Baca cerita",
    "View destination": "Lihat destinasi",
    "Popular Stories": "Cerita Populer",
    "Latest Stories": "Cerita Terbaru",
    "Featured Story": "Cerita Unggulan",
    "Solo Travel": "Perjalanan Solo",
    "Where the road runs out.": "Di mana jalan berakhir.",
    "Honest country guides, trekking routes and the maps I wish I'd had before I left.": "Panduan negara yang jujur, rute trekking, dan peta yang saya harapkan saya miliki sebelum berangkat.",
    "The light, the cold, the patience.": "Cahaya, dingin, kesabaran.",
    "A thousand sunrises above 4,000 metres.": "Seribu matahari terbit di atas 4.000 meter.",
    "Explore the Journey": "Jelajahi Perjalanan",
    "Discover visited destinations, motorcycle routes and stories from the road.": "Temukan destinasi yang dikunjungi, rute sepeda motor, dan cerita dari perjalanan.",
    "Map View": "Tampilan Peta",
    "Grid View": "Tampilan Kisi",
    Sponsored: "Sponsor",
    Advertisement: "Iklan",
    Explore: "Jelajahi",
    "Previous photo": "Foto sebelumnya",
    "Next photo": "Foto berikutnya"
  },
  // Bahasa Melayu
  ms: {
    "The Journal": "Jurnal",
    "Stories from the road, the trail, and the saddle.": "Kisah dari jalan, laluan, dan pelana.",
    "Search stories…": "Cari kisah…",
    All: "Semua",
    "No stories match that filter yet.": "Tiada kisah yang sepadan dengan penapis itu lagi.",
    story: "kisah",
    stories: "kisah",
    "published so far.": "diterbitkan setakat ini.",
    Stories: "Kisah",
    "min read": "minit bacaan",
    "Keep reading": "Teruskan membaca",
    "Story not found": "Kisah tidak ditemui",
    "This trail has been moved or doesn't exist.": "Laluan ini telah dipindahkan atau tidak wujud.",
    "Back to all stories": "Kembali ke semua kisah",
    "Reviews & Comments": "Ulasan & Komen",
    rating: "penilaian",
    ratings: "penilaian",
    "Your rating": "Penilaian anda",
    "Name (optional)": "Nama (pilihan)",
    "Email (optional, not shown)": "E-mel (pilihan, tidak dipaparkan)",
    "Share your thoughts…": "Kongsi pandangan anda…",
    "No account needed. Email is private.": "Akaun tidak diperlukan. E-mel adalah peribadi.",
    "Post review": "Hantar ulasan",
    "Posting…": "Menghantar…",
    "Be the first to leave a review.": "Jadilah yang pertama meninggalkan ulasan.",
    "Could not post review": "Gagal menghantar ulasan",
    "Please write a review": "Sila tulis ulasan",
    Share: "Kongsi",
    Facebook: "Facebook",
    LinkedIn: "LinkedIn",
    "Copy link": "Salin pautan",
    "Link copied": "Pautan disalin",
    "Photo Gallery": "Galeri Foto",
    "Traveled on": "Pengembaraan pada",
    Destination: "Destinasi",
    Destinations: "Destinasi",
    Language: "Bahasa",
    Home: "Laman Utama",
    About: "Perihal",
    Contact: "Hubungi",
    Gallery: "Galeri",
    Map: "Peta",
    Search: "Cari",
    Category: "Kategori",
    Categories: "Kategori",
    Tags: "Tag",
    Trekking: "Trekking",
    Motorcycle: "Motosikal",
    Overland: "Kembara Darat",
    Culture: "Budaya",
    Photography: "Fotografi",
    Guides: "Panduan",
    Tips: "Petua",
    Gear: "Peralatan",
    Close: "Tutup",
    Next: "Seterusnya",
    Previous: "Sebelumnya",
    "Read story": "Baca kisah",
    "View destination": "Lihat destinasi",
    "Popular Stories": "Kisah Popular",
    "Latest Stories": "Kisah Terkini",
    "Featured Story": "Kisah Pilihan",
    "Solo Travel": "Pengembaraan Solo",
    "Where the road runs out.": "Di mana jalan berakhir.",
    "Honest country guides, trekking routes and the maps I wish I'd had before I left.": "Panduan negara jujur, laluan trekking dan peta yang saya harapkan ada sebelum bertolak.",
    "The light, the cold, the patience.": "Cahaya, sejuk, kesabaran.",
    "A thousand sunrises above 4,000 metres.": "Seribu matahari terbit di atas 4,000 meter.",
    "Explore the Journey": "Terokai Pengembaraan",
    "Discover visited destinations, motorcycle routes and stories from the road.": "Temui destinasi yang dilawati, laluan motosikal dan kisah dari jalanan.",
    "Map View": "Paparan Peta",
    "Grid View": "Paparan Grid",
    Sponsored: "Ditaja",
    Advertisement: "Iklan",
    Explore: "Terokai",
    "Previous photo": "Foto sebelumnya",
    "Next photo": "Foto seterusnya"
  },
  // Spanish
  es: {
    "The Journal": "El Diario",
    "Stories from the road, the trail, and the saddle.": "Historias de la carretera, el sendero y la silla.",
    "Search stories…": "Buscar historias…",
    All: "Todos",
    "No stories match that filter yet.": "No hay historias que coincidan con ese filtro.",
    story: "historia",
    stories: "historias",
    "published so far.": "publicadas hasta ahora.",
    Stories: "Historias",
    "min read": "min de lectura",
    "Keep reading": "Seguir leyendo",
    "Story not found": "Historia no encontrada",
    "This trail has been moved or doesn't exist.": "Este sendero se ha movido o no existe.",
    "Back to all stories": "Volver a todas las historias",
    "Reviews & Comments": "Reseñas y comentarios",
    rating: "valoración",
    ratings: "valoraciones",
    "Your rating": "Tu valoración",
    "Name (optional)": "Nombre (opcional)",
    "Email (optional, not shown)": "Correo (opcional, no mostrado)",
    "Share your thoughts…": "Comparte tus opiniones…",
    "No account needed. Email is private.": "Sin cuenta necesaria. El correo es privado.",
    "Post review": "Publicar reseña",
    "Posting…": "Publicando…",
    "Be the first to leave a review.": "Sé el primero en dejar una reseña.",
    "Could not post review": "No se pudo publicar la reseña",
    "Please write a review": "Por favor escribe una reseña",
    Share: "Compartir",
    Facebook: "Facebook",
    LinkedIn: "LinkedIn",
    "Copy link": "Copiar enlace",
    "Link copied": "Enlace copiado",
    "Photo Gallery": "Galería de fotos",
    "Traveled on": "Viajado en",
    Destination: "Destino",
    Destinations: "Destinos",
    Language: "Idioma",
    Home: "Inicio",
    About: "Acerca de",
    Contact: "Contacto",
    Gallery: "Galería",
    Map: "Mapa",
    Search: "Buscar",
    Category: "Categoría",
    Categories: "Categorías",
    Tags: "Etiquetas",
    Trekking: "Senderismo",
    Motorcycle: "Motocicleta",
    Overland: "Overland",
    Culture: "Cultura",
    Photography: "Fotografía",
    Guides: "Guías",
    Tips: "Consejos",
    Gear: "Equipo",
    Close: "Cerrar",
    Next: "Siguiente",
    Previous: "Anterior",
    "Read story": "Leer historia",
    "View destination": "Ver destino",
    "Popular Stories": "Historias populares",
    "Latest Stories": "Últimas historias",
    "Featured Story": "Historia destacada",
    "Solo Travel": "Viaje en solitario",
    "Where the road runs out.": "Donde el camino se acaba.",
    "Honest country guides, trekking routes and the maps I wish I'd had before I left.": "Guías honestas de países, rutas de senderismo y los mapas que desearía haber tenido antes de salir.",
    "The light, the cold, the patience.": "La luz, el frío, la paciencia.",
    "A thousand sunrises above 4,000 metres.": "Mil amaneceres a más de 4.000 metros.",
    "Explore the Journey": "Explorar el viaje",
    "Discover visited destinations, motorcycle routes and stories from the road.": "Descubre destinos visitados, rutas en moto e historias de la carretera.",
    "Map View": "Vista de mapa",
    "Grid View": "Vista de cuadrícula",
    Sponsored: "Patrocinado",
    Advertisement: "Anuncio",
    Explore: "Explorar",
    "Previous photo": "Foto anterior",
    "Next photo": "Foto siguiente"
  },
  // French
  fr: {
    "The Journal": "Le Journal",
    "Stories from the road, the trail, and the saddle.": "Récits de la route, des sentiers et de la selle.",
    "Search stories…": "Rechercher des récits…",
    All: "Tous",
    "No stories match that filter yet.": "Aucun récit ne correspond à ce filtre.",
    story: "récit",
    stories: "récits",
    "published so far.": "publiés à ce jour.",
    Stories: "Récits",
    "min read": "min de lecture",
    "Keep reading": "Continuer la lecture",
    "Story not found": "Récit introuvable",
    "This trail has been moved or doesn't exist.": "Ce sentier a été déplacé ou n'existe pas.",
    "Back to all stories": "Retour à tous les récits",
    "Reviews & Comments": "Avis et commentaires",
    rating: "note",
    ratings: "notes",
    "Your rating": "Votre note",
    "Name (optional)": "Nom (optionnel)",
    "Email (optional, not shown)": "E-mail (optionnel, non affiché)",
    "Share your thoughts…": "Partagez vos impressions…",
    "No account needed. Email is private.": "Pas de compte requis. L'e-mail reste privé.",
    "Post review": "Publier l'avis",
    "Posting…": "Publication…",
    "Be the first to leave a review.": "Soyez le premier à donner votre avis.",
    "Could not post review": "Impossible de publier l'avis",
    "Please write a review": "Veuillez écrire un avis",
    Share: "Partager",
    Facebook: "Facebook",
    LinkedIn: "LinkedIn",
    "Copy link": "Copier le lien",
    "Link copied": "Lien copié",
    "Photo Gallery": "Galerie photo",
    "Traveled on": "Voyagé le",
    Destination: "Destination",
    Destinations: "Destinations",
    Language: "Langue",
    Home: "Accueil",
    About: "À propos",
    Contact: "Contact",
    Gallery: "Galerie",
    Map: "Carte",
    Search: "Rechercher",
    Category: "Catégorie",
    Categories: "Catégories",
    Tags: "Étiquettes",
    Trekking: "Trekking",
    Motorcycle: "Moto",
    Overland: "Overland",
    Culture: "Culture",
    Photography: "Photographie",
    Guides: "Guides",
    Tips: "Conseils",
    Gear: "Équipement",
    Close: "Fermer",
    Next: "Suivant",
    Previous: "Précédent",
    "Read story": "Lire le récit",
    "View destination": "Voir la destination",
    "Popular Stories": "Récits populaires",
    "Latest Stories": "Derniers récits",
    "Featured Story": "Récit à la une",
    "Solo Travel": "Voyage en solo",
    "Where the road runs out.": "Là où la route s'arrête.",
    "Honest country guides, trekking routes and the maps I wish I'd had before I left.": "Des guides de pays honnêtes, des itinéraires de trekking et les cartes que j'aurais aimé avoir avant de partir.",
    "The light, the cold, the patience.": "La lumière, le froid, la patience.",
    "A thousand sunrises above 4,000 metres.": "Mille lever de soleil à plus de 4 000 mètres.",
    "Explore the Journey": "Explorer le voyage",
    "Discover visited destinations, motorcycle routes and stories from the road.": "Découvrez les destinations visitées, les itinéraires à moto et les récits de route.",
    "Map View": "Vue carte",
    "Grid View": "Vue grille",
    Sponsored: "Sponsorisé",
    Advertisement: "Publicité",
    Explore: "Explorer",
    "Previous photo": "Photo précédente",
    "Next photo": "Photo suivante"
  },
  // Portuguese
  pt: {
    "The Journal": "O Diário",
    "Stories from the road, the trail, and the saddle.": "Histórias da estrada, da trilha e do selim.",
    "Search stories…": "Pesquisar histórias…",
    All: "Todos",
    "No stories match that filter yet.": "Nenhuma história corresponde a esse filtro.",
    story: "história",
    stories: "histórias",
    "published so far.": "publicadas até agora.",
    Stories: "Histórias",
    "min read": "min de leitura",
    "Keep reading": "Continuar lendo",
    "Story not found": "História não encontrada",
    "This trail has been moved or doesn't exist.": "Esta trilha foi movida ou não existe.",
    "Back to all stories": "Voltar a todas as histórias",
    "Reviews & Comments": "Avaliações e comentários",
    rating: "avaliação",
    ratings: "avaliações",
    "Your rating": "Sua avaliação",
    "Name (optional)": "Nome (opcional)",
    "Email (optional, not shown)": "E-mail (opcional, não exibido)",
    "Share your thoughts…": "Compartilhe seus pensamentos…",
    "No account needed. Email is private.": "Sem necessidade de conta. O e-mail é privado.",
    "Post review": "Publicar avaliação",
    "Posting…": "Publicando…",
    "Be the first to leave a review.": "Seja o primeiro a avaliar.",
    "Could not post review": "Não foi possível publicar a avaliação",
    "Please write a review": "Por favor, escreva uma avaliação",
    Share: "Compartilhar",
    Facebook: "Facebook",
    LinkedIn: "LinkedIn",
    "Copy link": "Copiar link",
    "Link copied": "Link copiado",
    "Photo Gallery": "Galeria de Fotos",
    "Traveled on": "Viajou em",
    Destination: "Destino",
    Destinations: "Destinos",
    Language: "Idioma",
    Home: "Início",
    About: "Sobre",
    Contact: "Contato",
    Gallery: "Galeria",
    Map: "Mapa",
    Search: "Pesquisar",
    Category: "Categoria",
    Categories: "Categorias",
    Tags: "Tags",
    Trekking: "Trekking",
    Motorcycle: "Motocicleta",
    Overland: "Overland",
    Culture: "Cultura",
    Photography: "Fotografia",
    Guides: "Guias",
    Tips: "Dicas",
    Gear: "Equipamentos",
    Close: "Fechar",
    Next: "Próximo",
    Previous: "Anterior",
    "Read story": "Ler história",
    "View destination": "Ver destino",
    "Popular Stories": "Histórias populares",
    "Latest Stories": "Últimas histórias",
    "Featured Story": "História em destaque",
    "Solo Travel": "Viagem solo",
    "Where the road runs out.": "Onde a estrada termina.",
    "Honest country guides, trekking routes and the maps I wish I'd had before I left.": "Guias honestos de países, rotas de trekking e os mapas que eu gostaria de ter antes de partir.",
    "The light, the cold, the patience.": "A luz, o frio, a paciência.",
    "A thousand sunrises above 4,000 metres.": "Mil nasceres do sol acima de 4.000 metros.",
    "Explore the Journey": "Explorar a jornada",
    "Discover visited destinations, motorcycle routes and stories from the road.": "Descubra destinos visitados, rotas de moto e histórias da estrada.",
    "Map View": "Vista de mapa",
    "Grid View": "Vista de grade",
    Sponsored: "Patrocinado",
    Advertisement: "Anúncio",
    Explore: "Explorar",
    "Previous photo": "Foto anterior",
    "Next photo": "Próxima foto"
  },
  // Norwegian
  no: {
    "The Journal": "Journalen",
    "Stories from the road, the trail, and the saddle.": "Historier fra veien, stien og salen.",
    "Search stories…": "Søk etter historier…",
    All: "Alle",
    "No stories match that filter yet.": "Ingen historier passer til det filteret ennå.",
    story: "historie",
    stories: "historier",
    "published so far.": "publisert så langt.",
    Stories: "Historier",
    "min read": "min lesing",
    "Keep reading": "Les videre",
    "Story not found": "Historie ikke funnet",
    "This trail has been moved or doesn't exist.": "Denne stien har blitt flyttet eller finnes ikke.",
    "Back to all stories": "Tilbake til alle historier",
    "Reviews & Comments": "Anmeldelser og kommentarer",
    rating: "vurdering",
    ratings: "vurderinger",
    "Your rating": "Din vurdering",
    "Name (optional)": "Navn (valgfritt)",
    "Email (optional, not shown)": "E-post (valgfritt, vises ikke)",
    "Share your thoughts…": "Del dine tanker…",
    "No account needed. Email is private.": "Ingen konto nødvendig. E-post er privat.",
    "Post review": "Publiser anmeldelse",
    "Posting…": "Publiserer…",
    "Be the first to leave a review.": "Vær den første til å legge igjen en anmeldelse.",
    "Could not post review": "Kunne ikke publisere anmeldelsen",
    "Please write a review": "Vennligst skriv en anmeldelse",
    Share: "Del",
    Facebook: "Facebook",
    LinkedIn: "LinkedIn",
    "Copy link": "Kopier lenke",
    "Link copied": "Lenke kopiert",
    "Photo Gallery": "Fotogalleri",
    "Traveled on": "Reiste den",
    Destination: "Destinasjon",
    Destinations: "Destinasjoner",
    Language: "Språk",
    Home: "Hjem",
    About: "Om",
    Contact: "Kontakt",
    Gallery: "Galleri",
    Map: "Kart",
    Search: "Søk",
    Category: "Kategori",
    Categories: "Kategorier",
    Tags: "Tagger",
    Trekking: "Fjelltur",
    Motorcycle: "Motorsykkel",
    Overland: "Overland",
    Culture: "Kultur",
    Photography: "Fotografering",
    Guides: "Guider",
    Tips: "Tips",
    Gear: "Utstyr",
    Close: "Lukk",
    Next: "Neste",
    Previous: "Forrige",
    "Read story": "Les historie",
    "View destination": "Vis destinasjon",
    "Popular Stories": "Populære historier",
    "Latest Stories": "Siste historier",
    "Featured Story": "Utvalgt historie",
    "Solo Travel": "Soloreise",
    "Where the road runs out.": "Der veien slutter.",
    "Honest country guides, trekking routes and the maps I wish I'd had before I left.": "Ærlige landguider, ruter for fjellturer og kartene jeg skulle ønske jeg hadde før jeg dro.",
    "The light, the cold, the patience.": "Lyset, kulden, tålmodigheten.",
    "A thousand sunrises above 4,000 metres.": "Tusen soloppganger over 4 000 meter.",
    "Explore the Journey": "Utforsk reisen",
    "Discover visited destinations, motorcycle routes and stories from the road.": "Oppdag besøkte destinasjoner, motorsykkelruter og historier fra veien.",
    "Map View": "Kartvisning",
    "Grid View": "Rutenettvisning",
    Sponsored: "Sponset",
    Advertisement: "Annonse",
    Explore: "Utforsk",
    "Previous photo": "Forrige bilde",
    "Next photo": "Neste bilde"
  },
  // Turkish
  tr: {
    "The Journal": "Günlük",
    "Stories from the road, the trail, and the saddle.": "Yoldan, patikadan ve seleden hikayeler.",
    "Search stories…": "Hikayelerde ara…",
    All: "Tümü",
    "No stories match that filter yet.": "Henüz bu filtreye uyan hikaye yok.",
    story: "hikaye",
    stories: "hikaye",
    "published so far.": "şimdiye kadar yayınlandı.",
    Stories: "Hikayeler",
    "min read": "dk okuma",
    "Keep reading": "Okumaya devam et",
    "Story not found": "Hikaye bulunamadı",
    "This trail has been moved or doesn't exist.": "Bu rota taşınmış veya mevcut değil.",
    "Back to all stories": "Tüm hikayelere dön",
    "Reviews & Comments": "Değerlendirmeler ve Yorumlar",
    rating: "puan",
    ratings: "puan",
    "Your rating": "Puanınız",
    "Name (optional)": "İsim (isteğe bağlı)",
    "Email (optional, not shown)": "E-posta (isteğe bağlı, gösterilmez)",
    "Share your thoughts…": "Düşüncelerinizi paylaşın…",
    "No account needed. Email is private.": "Hesap gerekmez. E-posta gizlidir.",
    "Post review": "Yorum gönder",
    "Posting…": "Gönderiliyor…",
    "Be the first to leave a review.": "İlk yorum yapan siz olun.",
    "Could not post review": "Yorum gönderilemedi",
    "Please write a review": "Lütfen bir yorum yazın",
    Share: "Paylaş",
    Facebook: "Facebook",
    LinkedIn: "LinkedIn",
    "Copy link": "Bağlantıyı kopyala",
    "Link copied": "Bağlantı kopyalandı",
    "Photo Gallery": "Fotoğraf Galerisi",
    "Traveled on": "Seyahat tarihi",
    Destination: "Destinasyon",
    Destinations: "Destinasyonlar",
    Language: "Dil",
    Home: "Ana Sayfa",
    About: "Hakkında",
    Contact: "İletişim",
    Gallery: "Galeri",
    Map: "Harita",
    Search: "Ara",
    Category: "Kategori",
    Categories: "Kategoriler",
    Tags: "Etiketler",
    Trekking: "Doğa Yürüyüşü",
    Motorcycle: "Motosiklet",
    Overland: "Kara Yolculuğu",
    Culture: "Kültür",
    Photography: "Fotoğrafçılık",
    Guides: "Rehberler",
    Tips: "İpuçları",
    Gear: "Ekipman",
    Close: "Kapat",
    Next: "Sonraki",
    Previous: "Önceki",
    "Read story": "Hikayeyi oku",
    "View destination": "Destinasyonu gör",
    "Popular Stories": "Popüler Hikayeler",
    "Latest Stories": "Son Hikayeler",
    "Featured Story": "Öne Çıkan Hikaye",
    "Solo Travel": "Solo Seyahat",
    "Where the road runs out.": "Yolun bittiği yer.",
    "Honest country guides, trekking routes and the maps I wish I'd had before I left.": "Dürüst ülke rehberleri, doğa yürüyüşü rotaları ve yola çıkmadan önce keşke elimde olsaydı dediğim haritalar.",
    "The light, the cold, the patience.": "Işık, soğuk, sabır.",
    "A thousand sunrises above 4,000 metres.": "4.000 metrenin üzerinde bin gün doğumu.",
    "Explore the Journey": "Yolculuğu Keşfet",
    "Discover visited destinations, motorcycle routes and stories from the road.": "Ziyaret edilen destinasyonları, motosiklet rotalarını ve yoldan hikayeleri keşfedin.",
    "Map View": "Harita Görünümü",
    "Grid View": "Izgara Görünümü",
    Sponsored: "Sponsorlu",
    Advertisement: "Reklam",
    Explore: "Keşfet",
    "Previous photo": "Önceki fotoğraf",
    "Next photo": "Sonraki fotoğraf"
  },
  // Korean
  ko: {
    "The Journal": "저널",
    "Stories from the road, the trail, and the saddle.": "길, 트레일, 그리고 안위 위에서의 이야기들.",
    "Search stories…": "이야기 검색…",
    All: "전체",
    "No stories match that filter yet.": "해당 필터와 일치하는 이야기가 아직 없습니다.",
    story: "이야기",
    stories: "이야기들",
    "published so far.": "현재까지 발행됨.",
    Stories: "이야기들",
    "min read": "분 소요",
    "Keep reading": "계속 읽기",
    "Story not found": "이야기를 찾을 수 없습니다",
    "This trail has been moved or doesn't exist.": "이 경로는 이동되었거나 존재하지 않습니다.",
    "Back to all stories": "모든 이야기로 돌아가기",
    "Reviews & Comments": "리뷰 및 댓글",
    rating: "평점",
    ratings: "평점들",
    "Your rating": "나의 평점",
    "Name (optional)": "이름 (선택)",
    "Email (optional, not shown)": "이메일 (선택, 비공개)",
    "Share your thoughts…": "생각을 공유해주세요…",
    "No account needed. Email is private.": "계정이 필요하지 않습니다. 이메일은 비공개입니다.",
    "Post review": "리뷰 등록",
    "Posting…": "등록 중…",
    "Be the first to leave a review.": "첫 번째 리뷰를 남겨보세요.",
    "Could not post review": "리뷰를 등록할 수 없습니다",
    "Please write a review": "리뷰를 작성해 주세요",
    Share: "공유하기",
    Facebook: "페이스북",
    LinkedIn: "링크드인",
    "Copy link": "링크 복사",
    "Link copied": "링크가 복사되었습니다",
    "Photo Gallery": "사진 갤러리",
    "Traveled on": "여행 날짜",
    Destination: "목적지",
    Destinations: "목적지들",
    Language: "언어",
    Home: "홈",
    About: "소개",
    Contact: "문의",
    Gallery: "갤러리",
    Map: "지도",
    Search: "검색",
    Category: "카테고리",
    Categories: "카테고리 목록",
    Tags: "태그",
    Trekking: "트레킹",
    Motorcycle: "모터사이클",
    Overland: "오버랜드",
    Culture: "문화",
    Photography: "사진",
    Guides: "가이드",
    Tips: "팁",
    Gear: "장비",
    Close: "닫기",
    Next: "다음",
    Previous: "이전",
    "Read story": "이야기 읽기",
    "View destination": "목적지 보기",
    "Popular Stories": "인기 이야기",
    "Latest Stories": "최신 이야기",
    "Featured Story": "추천 이야기",
    "Solo Travel": "솔로 여행",
    "Where the road runs out.": "길이 끝나는 곳.",
    "Honest country guides, trekking routes and the maps I wish I'd had before I left.": "솔직한 국가 가이드, 트레킹 경로 및 출발 전에 알았더라면 좋았을 지도들.",
    "The light, the cold, the patience.": "빛, 추위, 그리고 인내.",
    "A thousand sunrises above 4,000 metres.": "4,000미터 위에서의 천 번의 일출.",
    "Explore the Journey": "여정 탐험하기",
    "Discover visited destinations, motorcycle routes and stories from the road.": "방문한 목적지, 오토바이 경로 및 길 위에서의 이야기를 둘러보세요.",
    "Map View": "지도 보기",
    "Grid View": "그리드 보기",
    Sponsored: "스폰서",
    Advertisement: "광고",
    Explore: "탐험하기",
    "Previous photo": "이전 사진",
    "Next photo": "다음 사진"
  },
  // Chinese (Simplified)
  zh: {
    "The Journal": "日志",
    "Stories from the road, the trail, and the saddle.": "来自公路、小径和车座上的故事。",
    "Search stories…": "搜索故事…",
    All: "全部",
    "No stories match that filter yet.": "暂无符合该筛选条件的故事。",
    story: "故事",
    stories: "故事",
    "published so far.": "迄今已发布。",
    Stories: "故事",
    "min read": "分钟阅读",
    "Keep reading": "继续阅读",
    "Story not found": "未找到故事",
    "This trail has been moved or doesn't exist.": "该路线已被移动或不存在。",
    "Back to all stories": "返回所有故事",
    "Reviews & Comments": "评价与评论",
    rating: "评分",
    ratings: "评分",
    "Your rating": "您的评分",
    "Name (optional)": "姓名（选填）",
    "Email (optional, not shown)": "邮箱（选填，不公开）",
    "Share your thoughts…": "分享您的想法…",
    "No account needed. Email is private.": "无需注册账号。邮箱严格保密。",
    "Post review": "发布评价",
    "Posting…": "发布中…",
    "Be the first to leave a review.": "成为第一个留下评价的人。",
    "Could not post review": "无法发布评价",
    "Please write a review": "请输入评价内容",
    Share: "分享",
    Facebook: "Facebook",
    LinkedIn: "LinkedIn",
    "Copy link": "复制链接",
    "Link copied": "链接已复制",
    "Photo Gallery": "画廊",
    "Traveled on": "旅行时间",
    Destination: "目的地",
    Destinations: "目的地",
    Language: "语言",
    Home: "首页",
    About: "关于",
    Contact: "联系",
    Gallery: "画廊",
    Map: "地图",
    Search: "搜索",
    Category: "分类",
    Categories: "分类列表",
    Tags: "标签",
    Trekking: "徒步",
    Motorcycle: "摩托车",
    Overland: "越野陆行",
    Culture: "文化",
    Photography: "摄影",
    Guides: "指南",
    Tips: "贴士",
    Gear: "装备",
    Close: "关闭",
    Next: "下一页",
    Previous: "上一页",
    "Read story": "阅读故事",
    "View destination": "查看目的地",
    "Popular Stories": "热门故事",
    "Latest Stories": "最新故事",
    "Featured Story": "精选故事",
    "Solo Travel": "独行旅行",
    "Where the road runs out.": "公路尽头之处。",
    "Honest country guides, trekking routes and the maps I wish I'd had before I left.": "真实可靠的国家指南、徒步路线以及我希望在出发前就拥有的地图。",
    "The light, the cold, the patience.": "日光、严寒与耐力。",
    "A thousand sunrises above 4,000 metres.": "海拔4000米之上的千次日出。",
    "Explore the Journey": "探索旅程",
    "Discover visited destinations, motorcycle routes and stories from the road.": "探索曾到访的目的地、摩托车路线及路上的故事。",
    "Map View": "地图视图",
    "Grid View": "网格视图",
    Sponsored: "赞助",
    Advertisement: "广告",
    Explore: "探索",
    "Previous photo": "上一张照片",
    "Next photo": "下一张照片"
  },
  // Japanese
  ja: {
    "The Journal": "ジャーナル",
    "Stories from the road, the trail, and the saddle.": "道、トレイル、そして鞍の上からの物語。",
    "Search stories…": "記事を検索…",
    All: "すべて",
    "No stories match that filter yet.": "条件に一致する記事はまだありません。",
    story: "記事",
    stories: "記事",
    "published so far.": "公開済み。",
    Stories: "記事一覧",
    "min read": "分で読める",
    "Keep reading": "続きを読む",
    "Story not found": "記事が見つかりません",
    "This trail has been moved or doesn't exist.": "このルートは移動されたか存在しません。",
    "Back to all stories": "すべての記事に戻る",
    "Reviews & Comments": "レビューとコメント",
    rating: "評価",
    ratings: "評価",
    "Your rating": "あなたの評価",
    "Name (optional)": "お名前（任意）",
    "Email (optional, not shown)": "メールアドレス（任意・非公開）",
    "Share your thoughts…": "感想を共有する…",
    "No account needed. Email is private.": "アカウント不要。メールアドレスは非公開です。",
    "Post review": "レビューを投稿",
    "Posting…": "投稿中…",
    "Be the first to leave a review.": "最初のレビューを投稿してみましょう。",
    "Could not post review": "レビューを投稿できませんでした",
    "Please write a review": "レビューを入力してください",
    Share: "共有",
    Facebook: "Facebook",
    LinkedIn: "LinkedIn",
    "Copy link": "リンクをコピー",
    "Link copied": "リンクをコピーしました",
    "Photo Gallery": "フォトギャラリー",
    "Traveled on": "旅した日",
    Destination: "目的地",
    Destinations: "目的地一覧",
    Language: "言語",
    Home: "ホーム",
    About: "概要",
    Contact: "お問い合わせ",
    Gallery: "ギャラリー",
    Map: "マップ",
    Search: "検索",
    Category: "カテゴリー",
    Categories: "カテゴリー一覧",
    Tags: "タグ",
    Trekking: "トレッキング",
    Motorcycle: "バイク",
    Overland: "オーバーランド",
    Culture: "文化",
    Photography: "写真",
    Guides: "ガイド",
    Tips: "ヒント",
    Gear: "ギア・装備",
    Close: "閉じる",
    Next: "次へ",
    Previous: "前へ",
    "Read story": "記事を読む",
    "View destination": "目的地を見る",
    "Popular Stories": "人気の記事",
    "Latest Stories": "最新の記事",
    "Featured Story": "注目の記事",
    "Solo Travel": "一人旅",
    "Where the road runs out.": "道の終わり、その先へ。",
    "Honest country guides, trekking routes and the maps I wish I'd had before I left.": "率直な国別ガイド、トレッキングルート、旅立つ前に欲しかったマップ。",
    "The light, the cold, the patience.": "光、寒さ、そして忍耐。",
    "A thousand sunrises above 4,000 metres.": "標高4,000m超での千の日の出。",
    "Explore the Journey": "旅を探求する",
    "Discover visited destinations, motorcycle routes and stories from the road.": "訪れた目的地、バイクツーリングルート、道中のストーリーを発見しましょう。",
    "Map View": "マップ表示",
    "Grid View": "グリッド表示",
    Sponsored: "スポンサー",
    Advertisement: "広告",
    Explore: "探索する",
    "Previous photo": "前の写真",
    "Next photo": "次の写真"
  },
  // Persian (Farsi - RTL)
  fa: {
    "The Journal": "مجله سفر",
    "Stories from the road, the trail, and the saddle.": "داستان‌هایی از جاده، مسیر و زین موتور.",
    "Search stories…": "جستجوی داستان‌ها…",
    All: "همه",
    "No stories match that filter yet.": "هنوز داستانی با این فیلتر مطابقت ندارد.",
    story: "داستان",
    stories: "داستان‌ها",
    "published so far.": "تاکنون منتشر شده است.",
    Stories: "داستان‌ها",
    "min read": "دقیقه مطالعه",
    "Keep reading": "ادامه مطلب",
    "Story not found": "داستان پیدا نشد",
    "This trail has been moved or doesn't exist.": "این مسیر منتقل شده یا وجود ندارد.",
    "Back to all stories": "بازگشت به همه داستان‌ها",
    "Reviews & Comments": "نظرات و دیدگاه‌ها",
    rating: "امتیاز",
    ratings: "امتیازها",
    "Your rating": "امتیاز شما",
    "Name (optional)": "نام (اختیاری)",
    "Email (optional, not shown)": "ایمیل (اختیاری، نمایش داده نمی‌شود)",
    "Share your thoughts…": "دیدگاه خود را به اشتراک بگذارید…",
    "No account needed. Email is private.": "نیازی به حساب نیست. ایمیل محرمانه است.",
    "Post review": "ارسال دیدگاه",
    "Posting…": "در حال ارسال…",
    "Be the first to leave a review.": "اولین کسی باشید که نظر می‌دهد.",
    "Could not post review": "نظر ارسال نشد",
    "Please write a review": "لطفا متنی بنویسید",
    Share: "اشتراک‌گذاری",
    Facebook: "فیس‌بوک",
    LinkedIn: "لینکدین",
    "Copy link": "کپی لینک",
    "Link copied": "لینک کپی شد",
    "Photo Gallery": "گالری تصاویر",
    "Traveled on": "تاریخ سفر",
    Destination: "مقصد",
    Destinations: "مقصدها",
    Language: "زبان",
    Home: "خانه",
    About: "درباره ما",
    Contact: "تماس",
    Gallery: "گالری",
    Map: "نقشه",
    Search: "جستجو",
    Category: "دسته‌بندی",
    Categories: "دسته‌بندی‌ها",
    Tags: "برچسب‌ها",
    Trekking: "کوهنوردی",
    Motorcycle: "موتورسیکلت",
    Overland: "سفر زمینی",
    Culture: "فرهنگ",
    Photography: "عکاسی",
    Guides: "راهنماها",
    Tips: "نکات",
    Gear: "تجهیزات",
    Close: "بستن",
    Next: "بعدی",
    Previous: "قبلی",
    "Read story": "خواندن داستان",
    "View destination": "مشاهده مقصد",
    "Popular Stories": "داستان‌های محبوب",
    "Latest Stories": "آخرین داستان‌ها",
    "Featured Story": "داستان ویژه",
    "Solo Travel": "سفر تک‌نفره",
    "Where the road runs out.": "جایی که جاده به پایان می‌رسد.",
    "Honest country guides, trekking routes and the maps I wish I'd had before I left.": "راهنماهای واقعی کشورها، مسیرهای کوهنوردی و نقشه‌هایی که ای کاش قبل از حرکت داشتم.",
    "The light, the cold, the patience.": "نور، سرما، و صبر.",
    "A thousand sunrises above 4,000 metres.": "هزار طلوع آفتاب بالای ۴۰۰۰ متر.",
    "Explore the Journey": "کاوش در سفر",
    "Discover visited destinations, motorcycle routes and stories from the road.": "مقاصد بازدید شده، مسیرهای موتورسواری و داستان‌های جاده را کشف کنید.",
    "Map View": "نمای نقشه",
    "Grid View": "نمای شبکه‌ای",
    Sponsored: "حامی مالی",
    Advertisement: "تبلیغات",
    Explore: "کاوش",
    "Previous photo": "عکس قبلی",
    "Next photo": "عکس بعدی"
  },
  // Arabic (RTL)
  ar: {
    "The Journal": "المجلة",
    "Stories from the road, the trail, and the saddle.": "قصص من الطريق والمسار وظهر الدراجة.",
    "Search stories…": "البحث في القصص…",
    All: "الكل",
    "No stories match that filter yet.": "لا توجد قصص تطابق هذا الفلتر بعد.",
    story: "قصة",
    stories: "قصص",
    "published so far.": "تم نشرها حتى الآن.",
    Stories: "القصص",
    "min read": "دقائق قراءة",
    "Keep reading": "متابعة القراءة",
    "Story not found": "القصة غير موجودة",
    "This trail has been moved or doesn't exist.": "تم نقل هذا المسار أو أنه غير موجود.",
    "Back to all stories": "العودة إلى كل القصص",
    "Reviews & Comments": "المراجعات والتعليقات",
    rating: "تقييم",
    ratings: "تقييمات",
    "Your rating": "تقييمك",
    "Name (optional)": "الاسم (اختياري)",
    "Email (optional, not shown)": "البريد الإلكتروني (اختياري، غير معلن)",
    "Share your thoughts…": "شاركنا رأيك…",
    "No account needed. Email is private.": "لا يلزم وجود حساب. بريدك الإلكتروني خاص.",
    "Post review": "نشر التقييم",
    "Posting…": "جاري النشر…",
    "Be the first to leave a review.": "كن أول من يترك تقييمًا.",
    "Could not post review": "تعذر نشر التقييم",
    "Please write a review": "يرجى كتابة تقييم",
    Share: "مشاركة",
    Facebook: "فيسبوك",
    LinkedIn: "لينكد إن",
    "Copy link": "نسخ الرابط",
    "Link copied": "تم نسخ الرابط",
    "Photo Gallery": "معرض الصور",
    "Traveled on": "تاريخ الرحلة",
    Destination: "الوجهة",
    Destinations: "الوجهات",
    Language: "اللغة",
    Home: "الرئيسية",
    About: "عن المدونة",
    Contact: "اتصل بنا",
    Gallery: "المعرض",
    Map: "الخريطة",
    Search: "بحث",
    Category: "الفئة",
    Categories: "الفئات",
    Tags: "الوسوم",
    Trekking: "المشي الجبلي",
    Motorcycle: "دراجات نارية",
    Overland: "رحلات برية",
    Culture: "الثقافة",
    Photography: "التصوير",
    Guides: "أدلة",
    Tips: "نصائح",
    Gear: "المعدات",
    Close: "إغلاق",
    Next: "التالي",
    Previous: "السابق",
    "Read story": "قراءة القصة",
    "View destination": "عرض الوجهة",
    "Popular Stories": "قصص شائعة",
    "Latest Stories": "أحدث القصص",
    "Featured Story": "قصة مميزة",
    "Solo Travel": "السفر الفردي",
    "Where the road runs out.": "حيث تنتهي الطرق.",
    "Honest country guides, trekking routes and the maps I wish I'd had before I left.": "أدلة دول صادقة، ومسارات مشي، وخرائط تمنيت لو كانت معي قبل الانطلاق.",
    "The light, the cold, the patience.": "الضوء، البرد، والصبر.",
    "A thousand sunrises above 4,000 metres.": "ألف شروق شمس فوق ارتفاع 4,000 متر.",
    "Explore the Journey": "استكشف الرحلة",
    "Discover visited destinations, motorcycle routes and stories from the road.": "اكتشف الوجهات المزارة، ومسارات الدراجات النارية، والقصص من الطريق.",
    "Map View": "عرض الخريطة",
    "Grid View": "عرض الشبكة",
    Sponsored: "برعاية",
    Advertisement: "إعلان",
    Explore: "استكشف",
    "Previous photo": "الصورة السابقة",
    "Next photo": "الصورة التالية"
  },
  // Urdu (RTL)
  ur: {
    "The Journal": "سفر نامہ",
    "Stories from the road, the trail, and the saddle.": "سڑک، پگڈنڈی اور موٹر سائیکل کی سیٹ سے کہانیاں۔",
    "Search stories…": "کہانیاں تلاش کریں…",
    All: "تمام",
    "No stories match that filter yet.": "اس فلٹر سے مطابقت رکھتی ہوئی کوئی کہانی نہیں ہے۔",
    story: "کہانی",
    stories: "کہانیاں",
    "published so far.": "اب تک شائع ہو چکی ہیں۔",
    Stories: "کہانیاں",
    "min read": "منٹ کا مطالعہ",
    "Keep reading": "مزید پڑھیں",
    "Story not found": "کہانی نہیں ملی",
    "This trail has been moved or doesn't exist.": "یہ راستہ منتقل کر دیا گیا ہے یا موجود نہیں ہے۔",
    "Back to all stories": "تمام کہانیوں پر واپس جائیں",
    "Reviews & Comments": "تجزیے اور تبصرے",
    rating: "درجہ بندی",
    ratings: "درجہ بندیاں",
    "Your rating": "آپ کی درجہ بندی",
    "Name (optional)": "نام (اختیاری)",
    "Email (optional, not shown)": "ای میل (اختیاری، ظاہر نہیں ہوگا)",
    "Share your thoughts…": "اپنی رائے کا اظہار کریں…",
    "No account needed. Email is private.": "کسی اکاؤنٹ کی ضرورت نہیں، ای میل نجی رہے گا۔",
    "Post review": "تبصرہ بھیجیں",
    "Posting…": "ارسال ہو رہا ہے…",
    "Be the first to leave a review.": "تبصرہ کرنے والے پہلے فرد بنیں۔",
    "Could not post review": "تبصرہ ارسال نہ ہو سکا",
    "Please write a review": "برائے مہربانی تبصرہ لکھیں",
    Share: "شیئر کریں",
    Facebook: "فیس بک",
    LinkedIn: "لنکڈ ان",
    "Copy link": "لنک کاپی کریں",
    "Link copied": "لنک کاپی ہو گیا",
    "Photo Gallery": "تصاویری گیلری",
    "Traveled on": "سفر کی تاریخ",
    Destination: "منزل",
    Destinations: "منازل",
    Language: "زبان",
    Home: "ہوم",
    About: "ہمارے بارے میں",
    Contact: "رابطہ کریں",
    Gallery: "گیلری",
    Map: "نقشہ",
    Search: "تلاش",
    Category: "زمرہ",
    Categories: "زمرہ جات",
    Tags: "ٹیگز",
    Trekking: "ٹریکنگ",
    Motorcycle: "موٹر سائیکل",
    Overland: "زمینی سفر",
    Culture: "ثقافت",
    Photography: "عکاسی",
    Guides: "رہنما",
    Tips: "مشورے",
    Gear: "سامان",
    Close: "بند کریں",
    Next: "اگلا",
    Previous: "پچھلا",
    "Read story": "کہانی پڑھیں",
    "View destination": "منزل دیکھیں",
    "Popular Stories": "مقبول کہانیاں",
    "Latest Stories": "تازہ ترین کہانیاں",
    "Featured Story": "نمایاں کہانی",
    "Solo Travel": "تنہا سفر",
    "Where the road runs out.": "جہاں سڑک ختم ہوتی ہے۔",
    "Honest country guides, trekking routes and the maps I wish I'd had before I left.": "ممالک کی سچی گائیڈز، ٹریکنگ کے راستے اور وہ نقشے جو کاش روانگی سے پہلے میرے پاس ہوتے۔",
    "The light, the cold, the patience.": "روشنی، سردی اور صبر۔",
    "A thousand sunrises above 4,000 metres.": "4,000 میٹر کی بلندی پر ایک ہزار طلوعِ آفتاب۔",
    "Explore the Journey": "سفر دریافت کریں",
    "Discover visited destinations, motorcycle routes and stories from the road.": "دیکھی گئی منازل، موٹر سائیکل کے راستے اور راہ کے قصے دریافت کریں۔",
    "Map View": "نقشہ کا نظارہ",
    "Grid View": "گرڈ کا نظارہ",
    Sponsored: "اسپانسر شدہ",
    Advertisement: "اشتہار",
    Explore: "دریافت کریں",
    "Previous photo": "پچھلی تصویر",
    "Next photo": "اگلی تصویر"
  }
};
function getDictionaryTranslation(lang, text) {
  if (!lang || lang === "en" || !text) return null;
  const dict = UI_DICTIONARY[lang];
  if (!dict) return null;
  return dict[text] ?? null;
}
const translateTexts = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  lang: stringType().min(2).max(8),
  texts: arrayType(stringType()).max(300).default([])
}).parse(input ?? {})).handler(createSsrRpc("b77a5bffb98582e79619ef6ddb56139906f9f742c4a164964c7ca6ce1c154ee8"));
const LANGUAGES = [
  { code: "en", label: "English", nativeName: "English" },
  { code: "es", label: "Spanish", nativeName: "Español" },
  { code: "fr", label: "French", nativeName: "Français" },
  { code: "pt", label: "Portuguese", nativeName: "Português" },
  { code: "no", label: "Norwegian", nativeName: "Norsk" },
  { code: "tr", label: "Turkish", nativeName: "Türkçe" },
  { code: "ko", label: "Korean", nativeName: "한국어" },
  { code: "zh", label: "Chinese", nativeName: "中文" },
  { code: "ja", label: "Japanese", nativeName: "日本語" },
  { code: "id", label: "Indonesian", nativeName: "Bahasa Indonesia" },
  { code: "ms", label: "Malay", nativeName: "Bahasa Melayu" },
  { code: "fa", label: "Persian", nativeName: "فارسی", rtl: true },
  { code: "ar", label: "Arabic", nativeName: "العربية", rtl: true },
  { code: "ur", label: "Urdu", nativeName: "اردو", rtl: true }
];
const LANG_STORAGE_KEY = "ndsolo_lang";
const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
function isRtlLang(code) {
  return LANGUAGES.some((l) => l.code === code && l.rtl);
}
function applyDirection(code) {
  if (typeof document === "undefined") return;
  const isRtl = isRtlLang(code);
  document.documentElement.dir = isRtl ? "rtl" : "ltr";
  document.documentElement.lang = code;
}
function readCookie(header, name) {
  const pattern = new RegExp(`(?:^|;\\s*)${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`);
  const match = header.match(pattern);
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}
const SERVER_EVENT_STORAGE_KEY = /* @__PURE__ */ Symbol.for("tanstack-start:event-storage");
function readRequestCookie(name) {
  try {
    const storage = globalThis[SERVER_EVENT_STORAGE_KEY];
    const store = storage?.getStore?.();
    const headers = store?.h3Event?.headers ?? store?.h3Event?.req?.headers;
    const cookieHeader = headers?.get?.("cookie");
    if (!cookieHeader) return null;
    return readCookie(cookieHeader, name);
  } catch {
    return null;
  }
}
function getInitialLang() {
  if (typeof window !== "undefined") {
    return readCookie(document.cookie, LANG_STORAGE_KEY) ?? "en";
  }
  return readRequestCookie(LANG_STORAGE_KEY) ?? "en";
}
function createStore() {
  let lang = getInitialLang();
  let version = 0;
  let error = null;
  let activeRequests = 0;
  let flushScheduled = false;
  const listeners = /* @__PURE__ */ new Set();
  const resolved = /* @__PURE__ */ new Map();
  const pending = /* @__PURE__ */ new Map();
  const inFlight = /* @__PURE__ */ new Set();
  const failed = /* @__PURE__ */ new Set();
  const ctxKey = (l, t) => `${l}${t}`;
  const preloadLang = (targetLang) => {
    if (targetLang === "en") return;
    const dict = UI_DICTIONARY[targetLang];
    if (dict) {
      for (const [text, value] of Object.entries(dict)) {
        resolved.set(ctxKey(targetLang, text), value);
      }
    }
    const map = getLangCache(targetLang);
    map.forEach((value, text) => {
      resolved.set(ctxKey(targetLang, text), value);
    });
  };
  preloadLang(lang);
  const bump = () => {
    version++;
    listeners.forEach((fn) => fn());
  };
  let firstFlushPending = true;
  const scheduleFlush = () => {
    if (flushScheduled) return;
    flushScheduled = true;
    if (firstFlushPending) {
      firstFlushPending = false;
      if (typeof window !== "undefined") {
        window.setTimeout(() => {
          flushScheduled = false;
          runFlush();
        }, 1e3);
      } else {
        flushScheduled = false;
      }
    } else {
      queueMicrotask(() => {
        flushScheduled = false;
        runFlush();
      });
    }
  };
  const runFlush = async () => {
    if (typeof window === "undefined") return;
    for (const [targetLang, texts] of [...pending.entries()]) {
      if (!texts.size) continue;
      const batch = [...texts];
      texts.clear();
      const keys = batch.map((t) => ctxKey(targetLang, t));
      const remaining = keys.filter((k) => !inFlight.has(k) && !failed.has(k));
      const batchForFetch = batch.filter((_, i) => remaining.includes(keys[i]));
      if (!batchForFetch.length) continue;
      keys.forEach((k) => inFlight.add(k));
      activeRequests++;
      bump();
      try {
        const result = await translateTexts({ data: { lang: targetLang, texts: batchForFetch } });
        keys.forEach((k) => {
          const idx = k.indexOf("");
          const text = k.slice(idx + 1);
          const value = result[text];
          if (value) {
            resolved.set(k, value);
            setCached(targetLang, text, value);
          }
        });
        if (failed.size === 0) {
          error = null;
        }
      } catch (e) {
        const failedTexts = batchForFetch;
        failedTexts.forEach((t) => failed.add(ctxKey(targetLang, t)));
        error = "Some translations failed. Showing English until retried.";
        bump();
      } finally {
        keys.forEach((k) => inFlight.delete(k));
        activeRequests--;
      }
    }
    bump();
  };
  const retryFailedTexts = () => {
    if (!failed.size) {
      error = null;
      bump();
      return;
    }
    const texts = [];
    for (const k of failed) {
      const idx = k.indexOf("");
      if (k.slice(0, idx) === lang) texts.push(k.slice(idx + 1));
    }
    failed.clear();
    error = null;
    if (texts.length) {
      let set = pending.get(lang);
      if (!set) {
        set = /* @__PURE__ */ new Set();
        pending.set(lang, set);
      }
      texts.forEach((t) => set.add(t));
      scheduleFlush();
    }
    bump();
  };
  const register = (targetLang, texts) => {
    if (targetLang === "en" || !texts.length) return;
    let added = false;
    for (const text of texts) {
      if (!text) continue;
      const k = ctxKey(targetLang, text);
      if (resolved.has(k) || inFlight.has(k) || failed.has(k)) continue;
      const dictValue = getDictionaryTranslation(targetLang, text);
      if (dictValue) {
        resolved.set(k, dictValue);
        continue;
      }
      const cached = getCached(targetLang, text);
      if (cached) {
        resolved.set(k, cached);
        continue;
      }
      let set = pending.get(targetLang);
      if (!set) {
        set = /* @__PURE__ */ new Set();
        pending.set(targetLang, set);
      }
      if (!set.has(text)) {
        set.add(text);
        added = true;
      }
    }
    if (added) scheduleFlush();
  };
  const get = (targetLang, text) => {
    if (targetLang === "en" || !text) return null;
    const k = ctxKey(targetLang, text);
    const v = resolved.get(k);
    if (v) return v;
    const dictValue = getDictionaryTranslation(targetLang, text);
    if (dictValue) {
      resolved.set(k, dictValue);
      return dictValue;
    }
    const cached = getCached(targetLang, text);
    if (cached) {
      resolved.set(k, cached);
      return cached;
    }
    return null;
  };
  const setLang = (next) => {
    if (!LANGUAGES.some((l) => l.code === next)) return;
    lang = next;
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(LANG_STORAGE_KEY, next);
        document.cookie = `${LANG_STORAGE_KEY}=${encodeURIComponent(next)}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; samesite=lax`;
      }
    } catch {
    }
    applyDirection(next);
    pending.clear();
    inFlight.clear();
    failed.clear();
    error = null;
    preloadLang(next);
    bump();
    if (next !== "en") scheduleFlush();
  };
  const subscribe2 = (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  };
  return {
    // Live getters (not captured values) so subscribers always observe the
    // current lang/version/error/activeRequests and React re-renders on bump().
    get lang() {
      return lang;
    },
    get error() {
      return error;
    },
    get activeRequests() {
      return activeRequests;
    },
    get version() {
      return version;
    },
    subscribe: subscribe2,
    get,
    register,
    setLang,
    retryFailed: retryFailedTexts
  };
}
const TranslationContext = reactExports.createContext(null);
function TranslationProvider({ children }) {
  const store = reactExports.useMemo(() => createStore(), []);
  reactExports.useEffect(() => {
    if (typeof window !== "undefined") {
      applyDirection(store.lang);
    }
  }, [store]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TranslationContext.Provider, { value: store, children });
}
function useStore() {
  const store = reactExports.useContext(TranslationContext);
  if (!store) {
    throw new Error("useT/useTranslations must be used inside <TranslationProvider>");
  }
  reactExports.useSyncExternalStore(
    store.subscribe,
    () => store.version,
    () => store.version
  );
  return store;
}
function useT(text) {
  const store = useStore();
  const lang = store.lang;
  if (lang !== "en" && text) {
    store.register(lang, [text]);
  }
  const translated = store.get(lang, text);
  reactExports.useEffect(() => {
    if (lang !== "en" && text) {
      store.register(lang, [text]);
    }
  }, [store, lang, text]);
  return translated ?? text;
}
function useTranslations() {
  const store = useStore();
  const lang = store.lang;
  return (text) => {
    if (!text || lang === "en") return text;
    const v = store.get(lang, text);
    if (!v) {
      store.register(lang, [text]);
    }
    return v ?? text;
  };
}
function useLanguage() {
  const store = useStore();
  return { lang: store.lang, error: store.error, activeRequests: store.activeRequests };
}
function useSetLanguage() {
  const store = useStore();
  return store.setLang;
}
function SearchDialog({ open, onClose }) {
  const t = useTranslations();
  const [q, setQ] = reactExports.useState("");
  const [results, setResults] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
    else {
      setQ("");
      setResults([]);
    }
  }, [open]);
  reactExports.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  reactExports.useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchSite({ data: { q: q.trim(), limit: 8 } });
        setResults(res.results);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [q]);
  if (!open) return null;
  const go = (r) => {
    onClose();
    if (r.kind === "post") navigate({ to: "/blog/$slug", params: { slug: r.slug } });
    else navigate({ to: "/destinations/$slug", params: { slug: r.slug } });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center px-4 pt-20 sm:pt-32",
      onClick: onClose,
      role: "dialog",
      "aria-modal": "true",
      "aria-label": t("Search"),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-background shadow-2xl",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-b border-border px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: inputRef,
                  value: q,
                  onChange: (e) => setQ(e.target.value),
                  placeholder: t("Search stories…"),
                  className: "flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                }
              ),
              loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: onClose,
                  "aria-label": t("Close"),
                  className: "text-muted-foreground hover:text-foreground",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-h-[60vh] overflow-y-auto", children: [
              q.trim() && !loading && results.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-4 py-10 text-center text-sm text-muted-foreground", children: t("No stories match that filter yet.") }),
              !q.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-4 py-10 text-center text-sm text-muted-foreground", children: t("Search stories…") }),
              results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "py-2", children: results.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => go(r),
                  className: "flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-muted transition-colors",
                  children: [
                    r.kind === "post" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mt-0.5 h-4 w-4 shrink-0 text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-accent" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium", children: r.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: r.kind === "post" ? `Story · ${r.category ?? "Article"}` : `Destination · ${r.country ?? "Travel"}` })
                    ] })
                  ]
                }
              ) }, `${r.kind}-${r.id}`)) })
            ] })
          ]
        }
      )
    }
  );
}
function LanguageSelector({ className }) {
  const { lang, error, activeRequests } = useLanguage();
  const setLang = useSetLanguage();
  const translating = activeRequests > 0;
  const [dismissedError, setDismissedError] = reactExports.useState(false);
  const [menuOpen, setMenuOpen] = reactExports.useState(false);
  const menuRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);
  reactExports.useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setDismissedError(true), 8e3);
    return () => clearTimeout(t);
  }, [error]);
  const handleChange = (value) => {
    setDismissedError(false);
    setMenuOpen(false);
    setLang(value);
  };
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `relative flex items-center notranslate ${className ?? ""}`,
      translate: "no",
      ref: menuRef,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setMenuOpen((v) => !v),
            "aria-label": `Language: ${current.nativeName}`,
            "aria-haspopup": "menu",
            "aria-expanded": menuOpen,
            className: "inline-flex h-9 items-center gap-1.5 rounded-full border border-border/60 bg-transparent px-3 text-xs font-medium text-[#FF7A00] hover:text-[#FF7A00] focus:text-[#FF7A00] focus-visible:text-[#FF7A00] hover:bg-muted/60 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3.5 w-3.5 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#FF7A00]", children: current.nativeName })
            ]
          }
        ),
        menuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            role: "menu",
            className: "absolute right-0 top-full z-[100] mt-2 w-52 overflow-hidden rounded-xl border border-border bg-background shadow-xl rtl:right-auto rtl:left-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground", children: "Language / زبان / 语言" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "py-1 max-h-80 overflow-y-auto", children: LANGUAGES.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  role: "menuitemradio",
                  "aria-checked": l.code === lang,
                  onClick: () => handleChange(l.code),
                  className: `flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-muted focus:bg-muted ${l.code === lang ? "text-[#FF7A00] font-medium bg-muted/40" : "text-foreground hover:text-[#FF7A00] focus:text-[#FF7A00]"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: l.nativeName }),
                      l.nativeName !== l.label && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                        "(",
                        l.label,
                        ")"
                      ] })
                    ] }),
                    l.code === lang && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[#FF7A00]" })
                  ]
                }
              ) }, l.code)) })
            ]
          }
        ),
        translating && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            role: "status",
            "aria-live": "polite",
            className: "fixed left-1/2 top-4 z-[9999] -translate-x-1/2 flex items-center gap-2 rounded-full border border-border bg-background/95 px-4 py-2 text-xs font-medium text-foreground shadow-lg backdrop-blur",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin text-accent", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Translating…" })
            ]
          }
        ),
        error && !dismissedError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            role: "alert",
            "aria-live": "assertive",
            className: "fixed left-1/2 top-4 z-[9999] -translate-x-1/2 flex items-center gap-2 rounded-full border border-destructive/30 bg-background/95 px-4 py-2 text-xs font-medium text-destructive shadow-lg backdrop-blur",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3.5 w-3.5 text-destructive", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error })
            ]
          }
        )
      ]
    }
  );
}
const SITE = {
  name: "ndsolotravel",
  description: "Cinematic stories from solo journeys across Pakistan, the Karakoram, Nanga Parbat, and beyond. Trekking guides, motorcycle adventures, and travel photography.",
  socials: {
    instagram: "https://www.instagram.com/ndsolotravel",
    youtube: "https://youtube.com/",
    twitter: "https://x.com/ndsolotravel",
    facebook: "#",
    linkedin: "#",
    tiktok: "https://www.tiktok.com/@mdsolotravel?lang=en",
    pinterest: "https://www.pinterest.com/ndsolotravel/"
  }
};
const CATEGORIES = [
  "Solo Travel",
  "Motorcycle Adventure Travel",
  "Adventure Travel",
  "Trekking",
  "Hiking",
  "Mountains",
  "Nanga Parbat",
  "Pakistan Tourism",
  "Photography",
  "Travel Tips",
  "Travel Gear",
  "Budget Travel",
  "Travel Stories"
];
const logoPath = "/assets/ndsolo-travel-logo-DrOVnHMo.png";
function TikTokIcon$1({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" }) });
}
function PinterestIcon$1({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" }) });
}
const LINKS = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Stories" },
  { to: "/destinations", label: "Destinations" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" }
];
function Header() {
  const t = useTranslations();
  const [open, setOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [searchOpen, setSearchOpen] = reactExports.useState(false);
  const [signedIn, setSignedIn] = reactExports.useState(false);
  const [isStaff, setIsStaff] = reactExports.useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  async function handleSignOut() {
    try {
      await queryClient.cancelQueries();
      queryClient.clear();
      await supabase.auth.signOut();
      try {
        for (const k of Object.keys(localStorage)) {
          if (k.startsWith("sb-") && k.endsWith("-auth-token")) localStorage.removeItem(k);
        }
      } catch (e) {
      }
      setSignedIn(false);
      setIsStaff(false);
      setOpen(false);
      toast.success(t("Signed out"));
      navigate({ to: "/auth", replace: true });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("Sign out failed"));
    }
  }
  const overHero = pathname === "/" && !scrolled;
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  reactExports.useEffect(() => {
    setOpen(false);
  }, [pathname]);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  reactExports.useEffect(() => {
    const checkRoles = async (uid) => {
      if (!uid) return setIsStaff(false);
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid);
      const roles = (data ?? []).map((r) => r.role);
      setIsStaff(roles.includes("admin") || roles.includes("editor"));
    };
    supabase.auth.getSession().then(({ data }) => {
      setSignedIn(!!data.session);
      checkRoles(data.session?.user.id);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((e, session) => {
      if (e === "SIGNED_IN" || e === "SIGNED_OUT" || e === "USER_UPDATED") {
        setSignedIn(!!session);
        checkRoles(session?.user.id);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  const headerClass = overHero ? "bg-transparent text-white" : "bg-background/85 backdrop-blur-md border-b border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "header",
      {
        className: `fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${headerClass}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex items-center gap-2 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: logoPath,
              alt: "ndsolotravel",
              className: `h-8 w-auto ${overHero ? "brightness-0 invert" : ""}`
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-7 text-sm", children: LINKS.map((l) => {
            const isHashLink = "hash" in l && !!l.hash;
            const active = !isHashLink && (l.to === "/" ? pathname === "/" : pathname === l.to || pathname.startsWith(l.to + "/"));
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: l.to,
                hash: isHashLink ? l.hash : void 0,
                activeOptions: { exact: l.to === "/" },
                className: `relative transition-colors duration-200 ease-in-out ${overHero ? active ? "text-white font-medium" : "text-white/75 hover:text-[#FF7A00]" : active ? "text-accent font-medium" : "text-muted-foreground hover:text-[#FF7A00]"}`,
                children: [
                  t(l.label),
                  active && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      "aria-hidden": true,
                      className: `absolute left-0 right-0 -bottom-1 mx-auto h-px w-6 ${overHero ? "bg-white" : "bg-accent"}`
                    }
                  )
                ]
              },
              `${l.to}-${l.label}`
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageSelector, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setSearchOpen(true),
                "aria-label": t("Search"),
                className: `inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${overHero ? "border-white/30 text-white hover:bg-white/10" : "border-border/60 text-foreground hover:bg-muted/60"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: SITE.socials.instagram,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": "Instagram",
                  className: `inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors ${overHero ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted/60"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: SITE.socials.tiktok,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": "TikTok",
                  className: `inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors ${overHero ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted/60"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(TikTokIcon$1, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: SITE.socials.pinterest,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": "Pinterest",
                  className: `inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors ${overHero ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted/60"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(PinterestIcon$1, { className: "h-4 w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}) }),
            isStaff && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/admin",
                className: `hidden sm:inline-flex items-center rounded-full border px-3 py-2 text-xs font-medium transition-colors ${overHero ? "border-white/30 text-white hover:bg-white/10" : "border-border hover:border-accent"}`,
                children: t("Admin")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: signedIn ? "/account" : "/auth",
                "aria-label": signedIn ? t("Account") : t("Sign in"),
                className: `hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition ${overHero ? "bg-white text-foreground hover:bg-white/90" : "bg-foreground text-background hover:opacity-90"}`,
                children: [
                  signedIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5" }) : null,
                  signedIn ? t("Account") : t("Sign in")
                ]
              }
            ),
            signedIn && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleSignOut,
                "aria-label": t("Sign out"),
                title: t("Sign out"),
                className: `hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${overHero ? "border-white/30 text-white hover:bg-white/10" : "border-border/60 text-foreground hover:bg-muted/60"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setOpen((v) => !v),
                "aria-label": t("Menu"),
                "aria-expanded": open,
                className: `md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border ${overHero ? "border-white/30 text-white" : "border-border"}`,
                children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-4 w-4" })
              }
            )
          ] })
        ] })
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "md:hidden fixed inset-0 z-[60] bg-black/50",
        onClick: () => setOpen(false),
        "aria-hidden": true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: `md:hidden fixed top-0 right-0 z-[70] h-dvh w-[82%] max-w-sm bg-background border-l border-border shadow-2xl transition-transform duration-300 rtl:right-auto rtl:left-0 rtl:border-l-0 rtl:border-r ${open ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"}`,
        "aria-hidden": !open,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: t("Menu") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setOpen(false),
                "aria-label": t("Close menu"),
                className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-col px-3 py-3", children: LINKS.map((l) => {
            const isHashLink = "hash" in l && !!l.hash;
            const active = !isHashLink && (l.to === "/" ? pathname === "/" : pathname === l.to || pathname.startsWith(l.to + "/"));
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: l.to,
                hash: isHashLink ? l.hash : void 0,
                onClick: () => setOpen(false),
                className: `rounded-lg px-4 py-3 text-sm transition-colors duration-200 ease-in-out ${active ? "bg-muted text-accent font-medium" : "text-foreground hover:bg-muted hover:text-[#FF7A00]"}`,
                children: t(l.label)
              },
              `${l.to}-${l.label}`
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 border-t border-border px-5 py-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => {
                  setOpen(false);
                  setSearchOpen(true);
                },
                className: "flex w-full items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-muted",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" }),
                  " ",
                  t("Search")
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: SITE.socials.instagram,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": "Instagram",
                  className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white transition-transform duration-200 hover:scale-110",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: SITE.socials.tiktok,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": "TikTok",
                  className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-200 hover:scale-110",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(TikTokIcon$1, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: SITE.socials.pinterest,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": "Pinterest",
                  className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#E60023] text-white transition-transform duration-200 hover:scale-110",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(PinterestIcon$1, { className: "h-4 w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: t("Theme") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {})
            ] }),
            isStaff && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/admin",
                onClick: () => setOpen(false),
                className: "block w-full rounded-full border border-border px-4 py-2 text-center text-sm font-medium hover:border-accent",
                children: t("Admin")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: signedIn ? "/account" : "/auth",
                onClick: () => setOpen(false),
                className: "block w-full rounded-full bg-foreground px-4 py-2 text-center text-sm font-medium text-background",
                children: signedIn ? t("Account") : t("Sign in")
              }
            ),
            signedIn && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleSignOut,
                className: "flex w-full items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
                  " ",
                  t("Sign out")
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SearchDialog, { open: searchOpen, onClose: () => setSearchOpen(false) })
  ] });
}
const subscribe = createServerFn({
  method: "POST"
}).inputValidator((input) => {
  const raw = input?.data ? input.data : input;
  const email = typeof raw?.email === "string" ? raw.email.trim() : "";
  const sessionId = typeof raw?.sessionId === "string" ? raw.sessionId.trim() : "";
  return objectType({
    email: stringType().email("Please enter a valid email address."),
    sessionId: stringType().optional().default("")
  }).parse({
    email,
    sessionId
  });
}).handler(createSsrRpc("47788b7666be982aca3ef5f15a2fcc6897f28fce0ebb29e9fb1da0ab79c42b13"));
const adminListSubscribers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("720444115414c1dc4c9ac4ddd501401a50a0fce2886ec398bcb73b9ac5519a3f"));
const adminUpdateSubscriberStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => {
  const raw = input?.data ? input.data : input;
  return objectType({
    id: stringType().uuid(),
    status: enumType(["active", "unsubscribed"])
  }).parse(raw);
}).handler(createSsrRpc("36147828ec7f00cb3fa62463e9b7c81359c52057f31406b51e60ec2e09cd0023"));
const adminDeleteSubscriber = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => {
  const raw = input?.data ? input.data : input;
  return objectType({
    id: stringType().uuid()
  }).parse(raw);
}).handler(createSsrRpc("75c289fbf36a05cdded0534cf68c668e0d9e882b0f80347e2e9541902a86093e"));
const contactSchema = objectType({
  name: stringType().trim().min(1, "Please enter your name.").max(120),
  email: stringType().trim().email("Please enter a valid email address.").max(320),
  subject: stringType().trim().max(200).optional().default(""),
  message: stringType().trim().min(1, "Please enter your message.").max(5e3),
  // Honeypot — bots fill all fields; humans never see it
  website: stringType().max(0).optional().default("")
});
const sendContact = createServerFn({
  method: "POST"
}).inputValidator((input) => {
  const raw = input?.data ? input.data : input;
  const payload = {
    name: typeof raw?.name === "string" ? raw.name.trim() : "",
    email: typeof raw?.email === "string" ? raw.email.trim() : "",
    subject: typeof raw?.subject === "string" ? raw.subject.trim() : "",
    message: typeof raw?.message === "string" ? raw.message.trim() : "",
    website: typeof raw?.website === "string" ? raw.website.trim() : ""
  };
  return contactSchema.parse(payload);
}).handler(createSsrRpc("ca369ea727ea5123aa5fee3fbc329cf735853eecfa76d8574d642a4ea46deb77"));
createServerFn({
  method: "POST"
}).handler(createSsrRpc("2c4583f12bce21ae798f1680d431270090538471e946cd081e4b8d8460ec2b1a"));
const MAX_STRING_LEN = 500;
function unwrapInput(input) {
  if (input && typeof input === "object" && "data" in input && input.data !== void 0) {
    return input.data;
  }
  return input ?? {};
}
const recordPageViewAndPing = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  sessionId: stringType().min(1).max(128),
  path: stringType().min(1).max(MAX_STRING_LEN),
  title: stringType().max(MAX_STRING_LEN).optional().nullable(),
  referrer: stringType().max(MAX_STRING_LEN).optional().nullable(),
  deviceType: enumType(["desktop", "mobile", "tablet"]).optional().default("desktop"),
  browser: stringType().max(100).optional().default("Unknown"),
  os: stringType().max(100).optional().default("Unknown"),
  referrerSource: stringType().max(100).optional().default("Direct"),
  isNewPageView: booleanType().optional().default(false)
}).parse(unwrapInput(input))).handler(createSsrRpc("bd812cbe455e2474c467750823c0e04a2d0e066e1033c07ae27a11b9e4f23f8b"));
const getAdminAnalyticsDetails = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  period: enumType(["7d", "30d", "90d", "all"]).optional().default("30d")
}).parse(unwrapInput(input))).handler(createSsrRpc("e3b3a19a4423777ebd71a96db51fd15414149394e1f65993c32fcd8ca8649ea8"));
const SESSION_KEY = "ndsolo:visitor-session";
const HEARTBEAT_INTERVAL_MS = 3e4;
function getVisitorSessionId() {
  if (typeof window === "undefined") return null;
  try {
    let id = window.localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID?.() ?? `v-${Date.now()}-${Math.random().toString(36).slice(2, 14)}`;
      window.localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}
function getDeviceType(ua) {
  if (!ua) return "desktop";
  if (/ipad|tablet|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|windows phone/i.test(ua)) return "mobile";
  return "desktop";
}
function getBrowserName(ua) {
  if (!ua) return "Unknown";
  if (/edg/i.test(ua)) return "Edge";
  if (/chrome|crios/i.test(ua)) return "Chrome";
  if (/firefox|fxios/i.test(ua)) return "Firefox";
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return "Safari";
  if (/opera|opr/i.test(ua)) return "Opera";
  return "Other";
}
function getOSName(ua) {
  if (!ua) return "Unknown";
  if (/win/i.test(ua)) return "Windows";
  if (/mac/i.test(ua) && !/iphone|ipad/i.test(ua)) return "macOS";
  if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
  if (/android/i.test(ua)) return "Android";
  if (/linux/i.test(ua)) return "Linux";
  return "Other";
}
function getReferrerSource(referrer) {
  if (!referrer || typeof window === "undefined") return "Direct";
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    const currentHost = window.location.hostname.toLowerCase();
    if (host === currentHost || host.endsWith(`.${currentHost}`)) return "Direct";
    if (/google|bing|duckduckgo|yahoo|baidu|ecosia|yandex/.test(host)) return "Search Engines";
    if (/twitter|t\.co|x\.com|facebook|instagram|linkedin|reddit|pinterest|t\.me|youtube/.test(host))
      return "Social Media";
    return "Referring Websites";
  } catch {
    return "Direct";
  }
}
function usePageAnalytics(pathname) {
  const lastPathRef = reactExports.useRef(null);
  const trackFn = useServerFn(recordPageViewAndPing);
  const track = reactExports.useCallback(
    async (isNewPage) => {
      if (typeof window === "undefined") return;
      const sessionId = getVisitorSessionId();
      if (!sessionId) return;
      const ua = navigator.userAgent || "";
      const deviceType = getDeviceType(ua);
      const browser = getBrowserName(ua);
      const os = getOSName(ua);
      const referrer = document.referrer || "";
      const referrerSource = getReferrerSource(referrer);
      const title = document.title || pathname;
      try {
        await trackFn({
          data: {
            sessionId,
            path: pathname,
            title,
            referrer,
            deviceType,
            browser,
            os,
            referrerSource,
            isNewPageView: isNewPage
          }
        });
      } catch {
      }
    },
    [pathname, trackFn]
  );
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    const isNew = lastPathRef.current !== pathname;
    lastPathRef.current = pathname;
    void track(isNew);
    const heartbeatTimer = window.setInterval(() => void track(false), HEARTBEAT_INTERVAL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        void track(false);
      } else if (document.visibilityState === "hidden") {
        void track(false);
      }
    };
    const onFocus = () => void track(false);
    const onPageHide = () => void track(false);
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onFocus);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      window.clearInterval(heartbeatTimer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [pathname, track]);
}
function NewsletterForm({ dark = false }) {
  const t = useTranslations();
  const subscribeFn = useServerFn(subscribe);
  const [email, setEmail] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const sessionId = getVisitorSessionId() ?? "";
      const res = await subscribeFn({ data: { email, sessionId } });
      if (res && (res.created === false || res.alreadySubscribed)) {
        toast.info(t("You are already subscribed."));
      } else {
        toast.success(t("Subscribed! Welcome aboard."));
      }
      setEmail("");
    } catch (err) {
      let msg = t("Could not subscribe. Try again.");
      if (err instanceof Error && err.message) {
        msg = err.message;
      }
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }
  const base = "flex-1 rounded-full px-4 py-2.5 text-sm outline-none border transition focus:border-accent";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "flex flex-col gap-2 sm:flex-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "email",
        required: true,
        placeholder: t("Enter your email"),
        value: email,
        onChange: (e) => setEmail(e.target.value),
        className: `${base} ${dark ? "bg-white/5 border-white/15 text-secondary-foreground placeholder:text-secondary-foreground/40" : "bg-background border-border placeholder:text-muted-foreground"}`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "submit",
        disabled: loading,
        className: "rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:opacity-90 transition disabled:opacity-50",
        children: loading ? "…" : t("Subscribe")
      }
    )
  ] });
}
function TikTokIcon({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" }) });
}
function PinterestIcon({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" }) });
}
function Footer() {
  const t = useTranslations();
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "mt-24 border-t border-border bg-secondary text-secondary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "group inline-flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: logoPath,
            alt: "ndsolotravel",
            className: "h-8 w-auto brightness-0 invert transition-[filter] duration-300 ease-in-out group-hover:[filter:none]"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-sm text-sm text-secondary-foreground/70", children: t(SITE.description) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: SITE.socials.instagram,
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": "Instagram",
              className: "inline-flex h-9 w-9 items-center justify-center rounded-full text-white transition-transform duration-200 hover:scale-110",
              style: {
                background: "radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: SITE.socials.tiktok,
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": "TikTok",
              className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-200 hover:scale-110",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TikTokIcon, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: SITE.socials.youtube,
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": "YouTube",
              className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FF0000] text-white transition-transform duration-200 hover:scale-110",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: SITE.socials.twitter,
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": "X",
              className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-200 hover:scale-110",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Twitter, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: SITE.socials.facebook,
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": "Facebook",
              className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2] text-white transition-transform duration-200 hover:scale-110",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: SITE.socials.linkedin,
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": "LinkedIn",
              className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0A66C2] text-white transition-transform duration-200 hover:scale-110",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: SITE.socials.pinterest,
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": "Pinterest",
              className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#E60023] text-white transition-transform duration-200 hover:scale-110",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(PinterestIcon, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageSelector, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold uppercase tracking-wider", children: t("Explore") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2 text-sm text-secondary-foreground/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", className: "hover:text-accent", children: t("Stories") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/destinations", className: "hover:text-accent", children: t("Destinations") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/gallery", className: "hover:text-accent", children: t("Gallery") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "hover:text-accent", children: t("About") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "hover:text-accent", children: t("Contact") }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold uppercase tracking-wider", children: t("Newsletter") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-secondary-foreground/70", children: t("Stories from the road. No spam, ever.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NewsletterForm, { dark: true }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-secondary-foreground/60 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        year,
        " ",
        SITE.name,
        ". ",
        t("All stories made on the move.")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("Built for solo travellers, by a solo traveller.") })
    ] })
  ] }) });
}
function ScrollToTop() {
  const [isVisible, setIsVisible] = reactExports.useState(false);
  const label = useT("Back to top");
  reactExports.useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isVisible && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.button,
    {
      type: "button",
      onClick: scrollToTop,
      "aria-label": label,
      title: label,
      initial: { opacity: 0, scale: 0.8, y: 16 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.8, y: 16 },
      transition: { duration: 0.2, ease: "easeOut" },
      whileHover: { scale: 1.1 },
      whileTap: { scale: 0.9 },
      className: "fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg backdrop-blur-md transition-colors hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-primary/80 dark:hover:bg-primary sm:bottom-8 sm:right-8 sm:h-12 sm:w-12",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "h-5 w-5 stroke-[2.5]" })
    }
  ) });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Off the map" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "This trail doesn't lead anywhere. Let's head back to base camp." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "mt-6 inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90",
        children: "Go home"
      }
    )
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Something went sideways" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "rounded-full border border-border px-4 py-2 text-sm", children: "Go home" })
    ] })
  ] }) });
}
const Route$s = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ndsolotravel — Solo travel, mountains & motorcycles" },
      {
        name: "description",
        content: "Cinematic stories from solo journeys across Pakistan, the Karakoram and Nanga Parbat. Trekking guides, motorcycle adventures and travel photography."
      },
      { name: "author", content: "ndsolotravel" },
      { property: "og:site_name", content: "ndsolotravel" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0F172A" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&family=Inter:wght@400;500;600;700&display=swap"
      },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      ...LANGUAGES.map((l) => ({
        rel: "alternate",
        hrefLang: l.code,
        href: "https://ndsolotravel.com"
      })),
      { rel: "alternate", hrefLang: "x-default", href: "https://ndsolotravel.com" }
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "ndsolotravel",
          description: "Solo travel, trekking, motorcycle adventure, Nanga Parbat and Pakistan tourism."
        })
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScriptOnce, { children: `(()=>{try{const t=localStorage.getItem('theme');const d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})()` }),
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$s.useRouteContext();
  const router2 = useRouter();
  reactExports.useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router2.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => sub.subscription.unsubscribe();
  }, [router2, queryClient]);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TranslationProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: `flex-1 ${isHome ? "" : "pt-16"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center", richColors: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollToTop, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TitleTranslator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageAnalyticsTracker, { pathname })
  ] }) });
}
function PageAnalyticsTracker({ pathname }) {
  usePageAnalytics(pathname);
  return null;
}
function TitleTranslator() {
  const title = typeof document === "undefined" ? "" : document.title;
  const translated = useT(title);
  reactExports.useEffect(() => {
    if (typeof document === "undefined" || !translated || translated === title) return;
    document.title = translated;
  }, [translated, title]);
  return null;
}
const listPosts = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  category: stringType().optional(),
  categories: arrayType(stringType()).optional(),
  tag: stringType().optional(),
  search: stringType().optional(),
  limit: numberType().min(1).max(50).default(24),
  offset: numberType().min(0).default(0),
  featuredOnly: booleanType().optional(),
  sort: enumType(["latest", "popular"]).default("latest"),
  sinceDays: numberType().min(1).max(365).optional()
}).parse(input ?? {})).handler(createSsrRpc("11a3e5221d8be21b9fdddebef660f538b92679319c39b4d5a1df7f1408533287"));
const getPostBySlug = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  slug: stringType().min(1)
}).parse(input)).handler(createSsrRpc("9c8084edff95c284c741e3785ab938a71693bfe26e2c07e4c0272b47d311afc2"));
const listAllPostSlugs = createServerFn({
  method: "GET"
}).handler(createSsrRpc("98f1f07821f4ca35a777ae3a9c3739bd15d263f1786ca97572dcb7a9cd5f9183"));
const getJourneyStats = createServerFn({
  method: "GET"
}).handler(createSsrRpc("71d8fdf30ae9e2f9106b2721993bf34184ed8f34872c023de76a2613f0644775"));
const listDestinations = createServerFn({
  method: "GET"
}).handler(createSsrRpc("1e527b6631307654bc7f81cb758bd7a871fe81f3441e69d22bb529f27b5e4965"));
const getDestinationBySlug = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  slug: stringType()
}).parse(input)).handler(createSsrRpc("42d8c5a0f2ac4a51b2ee36862863046dc42ef21708bdbe47e53e1eb60378f141"));
const BASE_URL = "";
const Route$r = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const posts = await listAllPostSlugs();
        const dests = await listDestinations();
        const staticEntries = [
          { path: "/", priority: "1.0", changefreq: "weekly" },
          { path: "/blog", priority: "0.9", changefreq: "daily" },
          { path: "/destinations", priority: "0.8", changefreq: "weekly" },
          { path: "/gallery", priority: "0.7", changefreq: "weekly" },
          { path: "/about", priority: "0.5", changefreq: "monthly" },
          { path: "/contact", priority: "0.4", changefreq: "monthly" }
        ];
        const postEntries = posts.map((p) => ({
          path: `/blog/${p.slug}`,
          lastmod: p.updated_at,
          changefreq: "monthly",
          priority: "0.8"
        }));
        const destEntries = dests.map((d) => ({
          path: `/destinations/${d.slug}`,
          changefreq: "monthly",
          priority: "0.6"
        }));
        const all = [...staticEntries, ...postEntries, ...destEntries];
        const urls = all.map(
          (e) => `  <url><loc>${BASE_URL}${e.path}</loc>${"lastmod" in e && e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}<changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
    }
  }
});
const $$splitComponentImporter$q = () => import("./map-BTU5dmpx.mjs");
const Route$q = createFileRoute("/map")({
  beforeLoad: () => {
    throw redirect({
      to: "/destinations",
      hash: "interactive-map"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$q, "component")
});
const listGallery = createServerFn({
  method: "GET"
}).handler(createSsrRpc("9af9309080664fa919d9f0ccc1d1b1233ba78f5ec575fcd3aaab715c0a8a455b"));
const qo$1 = queryOptions({
  queryKey: ["gallery"],
  queryFn: () => listGallery()
});
const $$splitComponentImporter$p = () => import("./gallery-BX6nHUqO.mjs");
const Route$p = createFileRoute("/gallery")({
  head: () => ({
    meta: [{
      title: "Gallery — ndsolotravel"
    }, {
      name: "description",
      content: "Travel photography from the Karakoram, Nanga Parbat, Hunza and beyond."
    }, {
      property: "og:title",
      content: "Gallery — ndsolotravel"
    }, {
      property: "og:url",
      content: "/gallery"
    }],
    links: [{
      rel: "canonical",
      href: "/gallery"
    }]
  }),
  loader: ({
    context
  }) => context.queryClient.ensureQueryData(qo$1),
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const $$splitComponentImporter$o = () => import("./destinations-vIosy0PX.mjs");
const Route$o = createFileRoute("/destinations")({
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("./dashboard-BTU5dmpx.mjs");
const Route$n = createFileRoute("/dashboard")({
  beforeLoad: () => {
    throw redirect({
      to: "/admin/analytics"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("./contact-CX57v7nY.mjs");
const Route$m = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact — ndsolotravel"
    }, {
      name: "description",
      content: "Get in touch with ndsolotravel for collaborations, questions, or just to say hi."
    }, {
      property: "og:title",
      content: "Contact — ndsolotravel"
    }, {
      property: "og:description",
      content: "Get in touch with ndsolotravel."
    }, {
      property: "og:url",
      content: "/contact"
    }],
    links: [{
      rel: "canonical",
      href: "/contact"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./blog-9Hd3AP52.mjs");
const Route$l = createFileRoute("/blog")({
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./auth-Cs0qxk-T.mjs");
const authSearchSchema = objectType({
  redirect: stringType().optional(),
  error: stringType().optional()
});
const Route$k = createFileRoute("/auth")({
  validateSearch: authSearchSchema,
  head: () => ({
    meta: [{
      title: "Sign in — ndsolotravel"
    }, {
      name: "description",
      content: "Sign in or create an account to manage CMS and stories."
    }, {
      name: "robots",
      content: "noindex"
    }, {
      property: "og:url",
      content: "/auth"
    }],
    links: [{
      rel: "canonical",
      href: "/auth"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const getBlogAuthorName = createServerFn({
  method: "GET"
}).handler(createSsrRpc("b49bb2994ba1b17ca6b1509bc3b6a6619c694352a9b138448a7ed385f0dbf5a8"));
const getPublicSiteSettings = createServerFn({
  method: "GET"
}).handler(createSsrRpc("5cc46fc601fd1ff52ffd9c8ffb0c64c4007a99684a2adb8466ae7502c456b327"));
const adminGetSettings = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("453b18f745aa96dd18df7e1f0f8568922912665dd1f16e9349f48327f9a275eb"));
const adminUpdateSetting = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  key: stringType().min(1),
  value: stringType(),
  description: stringType().optional()
}).parse(input)).handler(createSsrRpc("bfe1dd602d06788487f81029ae20a9de238587c4a6d102b91961aace569a0438"));
const settingsQO = queryOptions({
  queryKey: ["public-site-settings"],
  queryFn: () => getPublicSiteSettings()
});
const $$splitComponentImporter$j = () => import("./about-B-ntvszX.mjs");
const Route$j = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About — ndsolotravel"
    }, {
      name: "description",
      content: "About ndsolotravel — solo adventure traveller, motorcyclist, photographer, mountain person."
    }, {
      property: "og:title",
      content: "About — ndsolotravel"
    }, {
      property: "og:description",
      content: "About the solo traveller behind ndsolotravel."
    }, {
      property: "og:url",
      content: "/about"
    }],
    links: [{
      rel: "canonical",
      href: "/about"
    }]
  }),
  loader: ({
    context
  }) => context.queryClient.ensureQueryData(settingsQO),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./route-BFsOu0JM.mjs");
const SIGN_IN_ROUTE = "/auth";
const Route$i = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({
    location
  }) => {
    const {
      data,
      error
    } = await supabase.auth.getUser();
    if (error || !data.user) {
      throw redirect({
        to: SIGN_IN_ROUTE,
        search: {
          redirect: location.pathname
        }
      });
    }
    return {
      user: data.user
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const postsQO = queryOptions({
  queryKey: ["home", "posts"],
  queryFn: () => listPosts({
    data: {
      limit: 6
    }
  })
});
const featuredQO = queryOptions({
  queryKey: ["home", "featured"],
  queryFn: () => listPosts({
    data: {
      limit: 1,
      featuredOnly: true
    }
  })
});
const destQO$2 = queryOptions({
  queryKey: ["home", "destinations"],
  queryFn: () => listDestinations()
});
const popularQO = queryOptions({
  queryKey: ["home", "popular"],
  queryFn: () => listPosts({
    data: {
      limit: 3,
      sort: "popular",
      sinceDays: 30
    }
  })
});
const guidesQO = queryOptions({
  queryKey: ["home", "guides"],
  queryFn: () => listPosts({
    data: {
      limit: 3,
      categories: ["Travel Tips", "Travel Gear", "Budget Travel", "Pakistan Tourism"]
    }
  })
});
const galleryQO = queryOptions({
  queryKey: ["home", "gallery"],
  queryFn: () => listGallery()
});
const motoQO = queryOptions({
  queryKey: ["home", "moto"],
  queryFn: () => listPosts({
    data: {
      limit: 1,
      categories: ["Motorcycle Adventure Travel"]
    }
  })
});
const journeyStatsQO = queryOptions({
  queryKey: ["home", "journey-stats"],
  queryFn: () => getJourneyStats()
});
const $$splitComponentImporter$h = () => import("./index-C4v_llYA.mjs");
const Route$h = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "ndsolotravel — Solo travel, mountains & motorcycles"
    }, {
      name: "description",
      content: "Cinematic solo travel stories. Trekking Nanga Parbat, riding the Karakoram, photographing the Himalaya."
    }, {
      property: "og:title",
      content: "ndsolotravel"
    }, {
      property: "og:description",
      content: "Solo travel stories from the Karakoram and beyond."
    }, {
      property: "og:url",
      content: "/"
    }],
    links: [{
      rel: "canonical",
      href: "/"
    }]
  }),
  loader: async ({
    context
  }) => {
    await Promise.all([context.queryClient.ensureQueryData(postsQO), context.queryClient.ensureQueryData(featuredQO), context.queryClient.ensureQueryData(destQO$2), context.queryClient.ensureQueryData(popularQO), context.queryClient.ensureQueryData(guidesQO), context.queryClient.ensureQueryData(galleryQO), context.queryClient.ensureQueryData(motoQO), context.queryClient.ensureQueryData(journeyStatsQO)]);
  },
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const destQO$1 = queryOptions({
  queryKey: ["destinations"],
  queryFn: () => listDestinations()
});
const $$splitComponentImporter$g = () => import("./destinations.index-dPvZrhV8.mjs");
const Route$g = createFileRoute("/destinations/")({
  head: () => ({
    meta: [{
      title: "Destinations — ndsolotravel"
    }, {
      name: "description",
      content: "Country and region guides: Pakistan, Karakoram, Nanga Parbat, Hunza and trekking routes."
    }, {
      property: "og:title",
      content: "Destinations — ndsolotravel"
    }, {
      property: "og:description",
      content: "Country and region guides for solo travellers."
    }, {
      property: "og:url",
      content: "/destinations"
    }],
    links: [{
      rel: "canonical",
      href: "/destinations"
    }]
  }),
  loader: ({
    context
  }) => context.queryClient.ensureQueryData(destQO$1),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const blogQO = (params) => queryOptions({
  queryKey: ["blog", params],
  queryFn: () => listPosts({
    data: {
      limit: 50,
      sort: params.sort ?? "latest",
      category: params.category,
      tag: params.tag,
      search: params.search
    }
  })
});
const destQO = queryOptions({
  queryKey: ["destinations-list"],
  queryFn: () => listDestinations()
});
const authorNameQO$1 = queryOptions({
  queryKey: ["blog-author-name"],
  queryFn: () => getBlogAuthorName()
});
const $$splitComponentImporter$f = () => import("./blog.index-_dqK-WAP.mjs");
const searchSchema = objectType({
  category: stringType().optional(),
  tag: stringType().optional(),
  q: stringType().optional(),
  sort: enumType(["latest", "popular"]).optional(),
  destination: stringType().optional()
});
const Route$f = createFileRoute("/blog/")({
  validateSearch: searchSchema,
  loaderDeps: ({
    search
  }) => search,
  head: () => ({
    meta: [{
      title: "Expedition Stories & Field Journal — ndsolotravel"
    }, {
      name: "description",
      content: "Solo travel stories, trekking journals, motorcycle adventures and travel guides from Pakistan and high-altitude remote borders."
    }, {
      property: "og:title",
      content: "Expedition Stories — ndsolotravel"
    }, {
      property: "og:description",
      content: "Solo travel, motorcycle journeys, and alpine trekking journals."
    }, {
      property: "og:url",
      content: "/blog"
    }],
    links: [{
      rel: "canonical",
      href: "/blog"
    }]
  }),
  loader: async ({
    context,
    deps
  }) => {
    await Promise.all([context.queryClient.ensureQueryData(blogQO({
      category: deps.category,
      tag: deps.tag,
      search: deps.q,
      sort: deps.sort
    })), context.queryClient.ensureQueryData(destQO), context.queryClient.ensureQueryData(authorNameQO$1)]);
  },
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./destinations._slug-DguzIJ7H.mjs");
const $$splitNotFoundComponentImporter$1 = () => import("./destinations._slug-DHwE6F0u.mjs");
const qo = (slug) => queryOptions({
  queryKey: ["destination", slug],
  queryFn: () => getDestinationBySlug({
    data: {
      slug
    }
  })
});
const allDestQO = queryOptions({
  queryKey: ["destinations-all"],
  queryFn: () => listDestinations()
});
const Route$e = createFileRoute("/destinations/$slug")({
  loader: async ({
    params,
    context
  }) => {
    const [d, all] = await Promise.all([context.queryClient.ensureQueryData(qo(params.slug)), context.queryClient.ensureQueryData(allDestQO)]);
    if (!d) throw notFound();
    return {
      destination: d,
      allDestinations: all
    };
  },
  head: ({
    loaderData,
    params
  }) => {
    const d = loaderData?.destination;
    return {
      meta: [{
        title: d ? `${d.title} Travel Guide & Stories — ndsolotravel` : "Destination — ndsolotravel"
      }, {
        name: "description",
        content: d?.description ?? "Country and region travel guide."
      }, {
        property: "og:title",
        content: d?.title ?? "Destination"
      }, {
        property: "og:description",
        content: d?.description ?? ""
      }, {
        property: "og:url",
        content: `/destinations/${params.slug}`
      }, ...d?.featured_image ? [{
        property: "og:image",
        content: d.featured_image
      }] : []],
      links: [{
        rel: "canonical",
        href: `/destinations/${params.slug}`
      }]
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const authorNameQO = queryOptions({
  queryKey: ["blog-author-name"],
  queryFn: () => getBlogAuthorName()
});
const $$splitNotFoundComponentImporter = () => import("./blog._slug-DOo5HLde.mjs");
const $$splitComponentImporter$d = () => import("./blog._slug-DRts7a9g.mjs");
const postQO = (slug) => queryOptions({
  queryKey: ["post", slug],
  queryFn: () => getPostBySlug({
    data: {
      slug
    }
  })
});
const Route$d = createFileRoute("/blog/$slug")({
  loader: async ({
    params,
    context
  }) => {
    const [data, authorName] = await Promise.all([context.queryClient.ensureQueryData(postQO(params.slug)), context.queryClient.ensureQueryData(authorNameQO)]);
    if (!data.post) throw notFound();
    return {
      ...data,
      authorName: authorName || "Noman"
    };
  },
  head: ({
    loaderData,
    params
  }) => {
    const p = loaderData?.post;
    const authorName = p?.author_name || loaderData?.authorName || "Noman";
    const title = p?.seo_title || (p ? `${p.title} — ndsolotravel` : "Story — ndsolotravel");
    const desc = p?.seo_description || p?.excerpt || "A solo travel story from ndsolotravel.";
    const image = p?.og_image_url || p?.cover_image;
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: desc
      }, {
        property: "og:title",
        content: title
      }, {
        property: "og:description",
        content: desc
      }, {
        property: "og:type",
        content: "article"
      }, {
        property: "og:url",
        content: `/blog/${params.slug}`
      }, ...image ? [{
        property: "og:image",
        content: image
      }] : [], ...image ? [{
        name: "twitter:image",
        content: image
      }] : [], {
        name: "twitter:card",
        content: "summary_large_image"
      }],
      links: [{
        rel: "canonical",
        href: `/blog/${params.slug}`
      }],
      scripts: p ? [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: p.title,
          description: desc,
          image: image ?? void 0,
          datePublished: p.published_at ?? p.created_at,
          articleSection: p.category,
          keywords: p.tags?.join(", "),
          author: {
            "@type": "Person",
            name: authorName
          }
        })
      }] : []
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$d, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
const $$splitComponentImporter$c = () => import("./admin-DV1ib_AP.mjs");
const Route$c = createFileRoute("/_authenticated/admin")({
  ssr: false,
  beforeLoad: async () => {
    let roles = [];
    try {
      roles = await getMyRoles();
    } catch {
      throw redirect({
        to: "/auth",
        search: {
          redirect: "/admin"
        }
      });
    }
    if (!roles.includes("admin") && !roles.includes("editor")) {
      throw redirect({
        to: "/auth",
        search: {
          redirect: "/admin",
          error: "unauthorized_admin"
        }
      });
    }
    return {
      roles
    };
  },
  head: () => ({
    meta: [{
      title: "Admin — ndsolotravel"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./account-pVYANxqj.mjs");
const Route$b = createFileRoute("/_authenticated/account")({
  head: () => ({
    meta: [{
      title: "Account — ndsolotravel"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./admin.index-BXi_9PFL.mjs");
const Route$a = createFileRoute("/_authenticated/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./admin.subscribers-CpaT-szj.mjs");
const Route$9 = createFileRoute("/_authenticated/admin/subscribers")({
  head: () => ({
    meta: [{
      title: "Newsletter Subscribers — Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./admin.settings-J2VFWkMr.mjs");
const Route$8 = createFileRoute("/_authenticated/admin/settings")({
  head: () => ({
    meta: [{
      title: "Settings — Admin CMS"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./admin.messages-CJPWNrIF.mjs");
const Route$7 = createFileRoute("/_authenticated/admin/messages")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./admin.gallery-Bqu0WTcR.mjs");
const Route$6 = createFileRoute("/_authenticated/admin/gallery")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./admin.destinations-ByPOggkB.mjs");
const Route$5 = createFileRoute("/_authenticated/admin/destinations")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.comments-MLq3aif8.mjs");
const Route$4 = createFileRoute("/_authenticated/admin/comments")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.analytics-DZubE2G6.mjs");
const Route$3 = createFileRoute("/_authenticated/admin/analytics")({
  head: () => ({
    meta: [{
      title: "Analytics & Hit Counter — Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.posts.index-_XqDS-IQ.mjs");
const Route$2 = createFileRoute("/_authenticated/admin/posts/")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.posts.new-CDV5tjw6.mjs");
const Route$1 = createFileRoute("/_authenticated/admin/posts/new")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.posts._id-C_trZFWB.mjs");
const Route = createFileRoute("/_authenticated/admin/posts/$id")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SitemapDotxmlRoute = Route$r.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$s
});
const MapRoute = Route$q.update({
  id: "/map",
  path: "/map",
  getParentRoute: () => Route$s
});
const GalleryRoute = Route$p.update({
  id: "/gallery",
  path: "/gallery",
  getParentRoute: () => Route$s
});
const DestinationsRoute = Route$o.update({
  id: "/destinations",
  path: "/destinations",
  getParentRoute: () => Route$s
});
const DashboardRoute = Route$n.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$s
});
const ContactRoute = Route$m.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$s
});
const BlogRoute = Route$l.update({
  id: "/blog",
  path: "/blog",
  getParentRoute: () => Route$s
});
const AuthRoute = Route$k.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$s
});
const AboutRoute = Route$j.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$s
});
const AuthenticatedRouteRoute = Route$i.update({
  id: "/_authenticated",
  getParentRoute: () => Route$s
});
const IndexRoute = Route$h.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$s
});
const DestinationsIndexRoute = Route$g.update({
  id: "/",
  path: "/",
  getParentRoute: () => DestinationsRoute
});
const BlogIndexRoute = Route$f.update({
  id: "/",
  path: "/",
  getParentRoute: () => BlogRoute
});
const DestinationsSlugRoute = Route$e.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => DestinationsRoute
});
const BlogSlugRoute = Route$d.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => BlogRoute
});
const AuthenticatedAdminRoute = Route$c.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAccountRoute = Route$b.update({
  id: "/account",
  path: "/account",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAdminIndexRoute = Route$a.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminSubscribersRoute = Route$9.update({
  id: "/subscribers",
  path: "/subscribers",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminSettingsRoute = Route$8.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminMessagesRoute = Route$7.update({
  id: "/messages",
  path: "/messages",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminGalleryRoute = Route$6.update({
  id: "/gallery",
  path: "/gallery",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminDestinationsRoute = Route$5.update({
  id: "/destinations",
  path: "/destinations",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminCommentsRoute = Route$4.update({
  id: "/comments",
  path: "/comments",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminAnalyticsRoute = Route$3.update({
  id: "/analytics",
  path: "/analytics",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminPostsIndexRoute = Route$2.update({
  id: "/posts/",
  path: "/posts/",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminPostsNewRoute = Route$1.update({
  id: "/posts/new",
  path: "/posts/new",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminPostsIdRoute = Route.update({
  id: "/posts/$id",
  path: "/posts/$id",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminRouteChildren = {
  AuthenticatedAdminAnalyticsRoute,
  AuthenticatedAdminCommentsRoute,
  AuthenticatedAdminDestinationsRoute,
  AuthenticatedAdminGalleryRoute,
  AuthenticatedAdminMessagesRoute,
  AuthenticatedAdminSettingsRoute,
  AuthenticatedAdminSubscribersRoute,
  AuthenticatedAdminIndexRoute,
  AuthenticatedAdminPostsIdRoute,
  AuthenticatedAdminPostsNewRoute,
  AuthenticatedAdminPostsIndexRoute
};
const AuthenticatedAdminRouteWithChildren = AuthenticatedAdminRoute._addFileChildren(AuthenticatedAdminRouteChildren);
const AuthenticatedRouteRouteChildren = {
  AuthenticatedAccountRoute,
  AuthenticatedAdminRoute: AuthenticatedAdminRouteWithChildren
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const BlogRouteChildren = {
  BlogSlugRoute,
  BlogIndexRoute
};
const BlogRouteWithChildren = BlogRoute._addFileChildren(BlogRouteChildren);
const DestinationsRouteChildren = {
  DestinationsSlugRoute,
  DestinationsIndexRoute
};
const DestinationsRouteWithChildren = DestinationsRoute._addFileChildren(
  DestinationsRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AboutRoute,
  AuthRoute,
  BlogRoute: BlogRouteWithChildren,
  ContactRoute,
  DashboardRoute,
  DestinationsRoute: DestinationsRouteWithChildren,
  GalleryRoute,
  MapRoute,
  SitemapDotxmlRoute
};
const routeTree = Route$s._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    dehydrate: () => ({
      queryClient: dehydrate(queryClient)
    }),
    hydrate: (data) => {
      if (data && typeof data === "object" && "queryClient" in data) {
        hydrate(queryClient, data.queryClient);
      }
    }
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  guidesQO as A,
  galleryQO as B,
  CATEGORIES as C,
  motoQO as D,
  journeyStatsQO as E,
  router as F,
  NewsletterForm as N,
  Route$k as R,
  SITE as S,
  useServerFn as a,
  Route$f as b,
  blogQO as c,
  destQO as d,
  authorNameQO$1 as e,
  Route$e as f,
  useLanguage as g,
  adminListSubscribers as h,
  adminUpdateSubscriberStatus as i,
  adminDeleteSubscriber as j,
  adminGetSettings as k,
  logoPath as l,
  adminUpdateSetting as m,
  getAdminAnalyticsDetails as n,
  Route as o,
  settingsQO as p,
  qo$1 as q,
  destQO$1 as r,
  sendContact as s,
  Route$d as t,
  useTranslations as u,
  authorNameQO as v,
  postsQO as w,
  featuredQO as x,
  destQO$2 as y,
  popularQO as z
};
