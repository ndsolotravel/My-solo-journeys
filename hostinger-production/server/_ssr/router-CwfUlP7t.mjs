import { b as QueryClient, h as hydrate, d as dehydrate } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQueryClient, a as useQuery, q as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, b as useRouterState, O as Outlet, H as HeadContent, S as ScriptOnce, d as Scripts, e as createFileRoute, l as lazyRouteComponent, f as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { y as notFound, z as redirect, m as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster, t as toast } from "../_libs/sonner.mjs";
import { u as createSsrRpc, g as getMyRoles } from "./admin.functions-67-zmleM.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { supabase } from "./client-BaIz-VBI.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BO6ULLpK.mjs";
import { r as resolveMediaUrl } from "./media-fm7scLsn.mjs";
import { S as Search, U as User, L as LogOut, X, M as Menu, I as Instagram, Y as Youtube, T as Twitter, F as Facebook, a as Linkedin, A as ArrowUp, C as CircleCheckBig, b as Sparkles, c as Mail, d as Megaphone, e as MessageSquareCode, f as ArrowRight, g as Cookie, G as Globe, h as LoaderCircle, i as CircleAlert, j as Sun, k as Moon, l as FileText, m as MapPin } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import { o as objectType, s as stringType, e as enumType, n as numberType, b as booleanType, a as arrayType, u as unionType, r as recordType } from "../_libs/zod.mjs";
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
const appCss = "/assets/styles-Chq4yXpw.css";
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
}).validator((input) => objectType({
  q: stringType().min(1).max(120),
  limit: numberType().min(1).max(20).default(8)
}).parse(input)).handler(createSsrRpc("a6fe99b6c5dcc70449cba6ff172f26fdfca262543e0dcc863e3d4993fb3c4e61"));
const STORAGE_PREFIX = "ndsolo_tr_";
const memoryCache = /* @__PURE__ */ new Map();
const pendingStorageSaves = /* @__PURE__ */ new Map();
function getLangCache(lang) {
  if (memoryCache.has(lang)) {
    return memoryCache.get(lang);
  }
  const map = /* @__PURE__ */ new Map();
  memoryCache.set(lang, map);
  if (typeof window !== "undefined") {
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
  }
  return map;
}
function getCached(lang, text) {
  if (!lang || !text) return null;
  const map = getLangCache(lang);
  return map.get(text) ?? null;
}
function scheduleStorageSave(lang) {
  if (typeof window === "undefined") return;
  if (pendingStorageSaves.has(lang)) return;
  const timer = window.setTimeout(() => {
    pendingStorageSaves.delete(lang);
    try {
      const map = memoryCache.get(lang);
      if (!map) return;
      const obj = {};
      map.forEach((v, k) => {
        obj[k] = v;
      });
      window.localStorage.setItem(`${STORAGE_PREFIX}${lang}`, JSON.stringify(obj));
    } catch {
    }
  }, 100);
  pendingStorageSaves.set(lang, timer);
}
function setCachedBatch(lang, entries) {
  if (!lang || !entries) return;
  const map = getLangCache(lang);
  let changed = false;
  for (const [text, value] of Object.entries(entries)) {
    if (text && value) {
      map.set(text, value);
      changed = true;
    }
  }
  if (changed) {
    scheduleStorageSave(lang);
  }
}
const UI_DICTIONARY = {
  "id": {
    "The Journal": "Jurnal",
    "Stories from the road, the trail, and the saddle.": "Cerita dari jalan, jalur, dan pelana.",
    "Search stories…": "Cari cerita…",
    "All": "Semua",
    "No stories match that filter yet.": "Belum ada cerita yang cocok dengan filter itu.",
    "story": "cerita",
    "stories": "cerita",
    "published so far.": "dipublikasikan sejauh ini.",
    "Stories": "Cerita",
    "min read": "menit baca",
    "Keep reading": "Lanjutkan membaca",
    "Story not found": "Cerita tidak ditemukan",
    "This trail has been moved or doesn't exist.": "Jalur ini telah dipindahkan atau tidak ada.",
    "Back to all stories": "Kembali ke semua cerita",
    "Reviews & Comments": "Ulasan & Komentar",
    "rating": "penilaian",
    "ratings": "penilaian",
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
    "Share": "Bagikan",
    "Facebook": "Facebook",
    "LinkedIn": "LinkedIn",
    "Copy link": "Salin tautan",
    "Link copied": "Tautan disalin",
    "Photo Gallery": "Galeri Foto",
    "Traveled on": "Dijelajahi pada",
    "Destination": "Destinasi",
    "Destinations": "Destinasi",
    "Language": "Bahasa",
    "Home": "Beranda",
    "About": "Tentang",
    "Contact": "Kontak",
    "Gallery": "Galeri",
    "Map": "Peta",
    "Search": "Cari",
    "Category": "Kategori",
    "Categories": "Kategori",
    "Tags": "Tag",
    "Trekking": "Trekking",
    "Motorcycle": "Sepeda Motor",
    "Overland": "Overland",
    "Culture": "Budaya",
    "Photography": "Fotografi",
    "Guides": "Panduan",
    "Tips": "Tips",
    "Gear": "Perlengkapan",
    "Close": "Tutup",
    "Next": "Berikutnya",
    "Previous": "Sebelumnya",
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
    "Sponsored": "Sponsor",
    "Advertisement": "Iklan",
    "Explore": "Jelajahi",
    "Previous photo": "Foto sebelumnya",
    "Next photo": "Foto berikutnya",
    "Stories from the high places": "Cerita dari tempat tinggi",
    "Most people only fly over.": "Kebanyakan orang hanya terbang di atasnya.",
    "Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world's wildest borders.": "Ekspedisi tunggal, perjalanan sepeda motor, dan catatan harian trekking dari Pakistan, Karakoram, dan perbatasan terliar di dunia.",
    "Solo · Slow · Cinematic": "Solo · Lambat · Sinematik",
    "Read the stories": "Baca ceritanya",
    "Explore destinations": "Jelajahi tujuan",
    "Featured Expeditions": "Ekspedisi Unggulan",
    "Handpicked long-form stories and remote trail guides.": "Cerita panjang yang dipilih sendiri dan panduan perjalanan jarak jauh.",
    "All expeditions": "Semua ekspedisi",
    "Fresh dispatches from the high passes, trails, and solitary highways.": "Kiriman baru dari jalan raya, jalan setapak, dan jalan raya terpencil.",
    "View all stories": "Lihat semua cerita",
    "Explore Topics": "Jelajahi Topik",
    "Deep dives and curated journeys into the wild — each backed by published stories and route guides.": "Penyelaman mendalam dan perjalanan pilihan ke alam liar — masing-masing didukung oleh cerita yang diterbitkan dan panduan rute.",
    "All topics": "Semua topik",
    "By the numbers": "Berdasarkan angka",
    "Journey in numbers": "Perjalanan dalam jumlah",
    "A quiet tally of countries crossed, trips ridden and photographs made along the way.": "Penghitungan tenang negara-negara yang dilintasi, perjalanan yang dilakukan, dan foto-foto yang diambil sepanjang perjalanan.",
    "Countries Visited": "Negara yang Dikunjungi",
    "Solo Motorcycle Trips": "Perjalanan Sepeda Motor Sendirian",
    "Photos Captured": "Foto Diambil",
    "Kilometres Traveled": "Kilometer Perjalanan",
    "Field Notes & Photography": "Catatan Lapangan & Fotografi",
    "Visual Journal": "Jurnal Visual",
    "Moments captured in silence above 4,000 metres across the Karakoram and Himalaya.": "Momen diabadikan dalam keheningan di atas 4.000 meter melintasi Karakoram dan Himalaya.",
    "Full gallery": "Galeri lengkap",
    "Where to Go": "Ke mana harus pergi",
    "Iconic base camps, alpine valleys, and high-altitude highways.": "Base camp yang ikonik, lembah pegunungan, dan jalan raya di dataran tinggi.",
    "All destinations": "Semua tujuan",
    "Join the Journey": "Bergabunglah dengan Perjalanan",
    "Get the next dispatch": "Dapatkan kiriman berikutnya",
    "One email when a new expedition story drops. No spam, no algorithm noise.": "Satu email saat cerita ekspedisi baru muncul. Tidak ada spam, tidak ada gangguan algoritma.",
    "Read full story": "Baca cerita selengkapnya",
    "Explore Topic": "Jelajahi Topik",
    "Spotlight": "Sorotan",
    "Recent destination": "Tujuan terkini",
    "Latest trip": "Perjalanan terbaru",
    "Longest journey": "Perjalanan terpanjang",
    "Trending": "Sedang tren",
    "Curated": "Dikurasi",
    "Journeys": "Perjalanan",
    "Grid": "jaringan",
    "View destinations as map or grid": "Lihat tujuan sebagai peta atau kisi"
  },
  "ms": {
    "The Journal": "Jurnal",
    "Stories from the road, the trail, and the saddle.": "Kisah dari jalan, laluan, dan pelana.",
    "Search stories…": "Cari kisah…",
    "All": "Semua",
    "No stories match that filter yet.": "Tiada kisah yang sepadan dengan penapis itu lagi.",
    "story": "kisah",
    "stories": "kisah",
    "published so far.": "diterbitkan setakat ini.",
    "Stories": "Kisah",
    "min read": "minit bacaan",
    "Keep reading": "Teruskan membaca",
    "Story not found": "Kisah tidak ditemui",
    "This trail has been moved or doesn't exist.": "Laluan ini telah dipindahkan atau tidak wujud.",
    "Back to all stories": "Kembali ke semua kisah",
    "Reviews & Comments": "Ulasan & Komen",
    "rating": "penilaian",
    "ratings": "penilaian",
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
    "Share": "Kongsi",
    "Facebook": "Facebook",
    "LinkedIn": "LinkedIn",
    "Copy link": "Salin pautan",
    "Link copied": "Pautan disalin",
    "Photo Gallery": "Galeri Foto",
    "Traveled on": "Pengembaraan pada",
    "Destination": "Destinasi",
    "Destinations": "Destinasi",
    "Language": "Bahasa",
    "Home": "Laman Utama",
    "About": "Perihal",
    "Contact": "Hubungi",
    "Gallery": "Galeri",
    "Map": "Peta",
    "Search": "Cari",
    "Category": "Kategori",
    "Categories": "Kategori",
    "Tags": "Tag",
    "Trekking": "Trekking",
    "Motorcycle": "Motosikal",
    "Overland": "Kembara Darat",
    "Culture": "Budaya",
    "Photography": "Fotografi",
    "Guides": "Panduan",
    "Tips": "Petua",
    "Gear": "Peralatan",
    "Close": "Tutup",
    "Next": "Seterusnya",
    "Previous": "Sebelumnya",
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
    "Sponsored": "Ditaja",
    "Advertisement": "Iklan",
    "Explore": "Terokai",
    "Previous photo": "Foto sebelumnya",
    "Next photo": "Foto seterusnya",
    "Stories from the high places": "Cerita dari tempat tinggi",
    "Most people only fly over.": "Kebanyakan orang hanya terbang.",
    "Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world's wildest borders.": "Ekspedisi solo, perjalanan motosikal dan diari trekking dari Pakistan, Karakoram dan sempadan paling liar di dunia.",
    "Solo · Slow · Cinematic": "Solo · Perlahan · Sinematik",
    "Read the stories": "Baca cerita",
    "Explore destinations": "Teroka destinasi",
    "Featured Expeditions": "Ekspedisi Pilihan",
    "Handpicked long-form stories and remote trail guides.": "Cerita bentuk panjang yang dipilih sendiri dan panduan jejak jauh.",
    "All expeditions": "Semua ekspedisi",
    "Fresh dispatches from the high passes, trails, and solitary highways.": "Penghantaran segar dari laluan tinggi, denai dan lebuh raya bersendirian.",
    "View all stories": "Lihat semua cerita",
    "Explore Topics": "Terokai Topik",
    "Deep dives and curated journeys into the wild — each backed by published stories and route guides.": "Penyelaman mendalam dan perjalanan terpilih ke alam liar — masing-masing disokong oleh cerita yang diterbitkan dan panduan laluan.",
    "All topics": "Semua topik",
    "By the numbers": "Dengan nombor",
    "Journey in numbers": "Perjalanan dalam angka",
    "A quiet tally of countries crossed, trips ridden and photographs made along the way.": "Satu pengiraan tenang negara yang melintasi, perjalanan yang ditunggangi dan gambar yang dibuat sepanjang perjalanan.",
    "Countries Visited": "Negara yang Dilawati",
    "Solo Motorcycle Trips": "Perjalanan Motosikal Solo",
    "Photos Captured": "Foto Dirakam",
    "Kilometres Traveled": "Kilometer Perjalanan",
    "Field Notes & Photography": "Nota Lapangan & Fotografi",
    "Visual Journal": "Jurnal Visual",
    "Moments captured in silence above 4,000 metres across the Karakoram and Himalaya.": "Detik-detik yang dirakam dalam senyap melebihi 4,000 meter merentasi Karakoram dan Himalaya.",
    "Full gallery": "Galeri penuh",
    "Where to Go": "Ke mana hendak pergi",
    "Iconic base camps, alpine valleys, and high-altitude highways.": "Kem pangkalan ikonik, lembah alpine dan lebuh raya altitud tinggi.",
    "All destinations": "Semua destinasi",
    "Join the Journey": "Sertai Perjalanan",
    "Get the next dispatch": "Dapatkan penghantaran seterusnya",
    "One email when a new expedition story drops. No spam, no algorithm noise.": "Satu e-mel apabila cerita ekspedisi baharu dikeluarkan. Tiada spam, tiada bunyi algoritma.",
    "Read full story": "Baca cerita penuh",
    "Explore Topic": "Terokai Topik",
    "Spotlight": "Sorotan",
    "Recent destination": "Destinasi terkini",
    "Latest trip": "Perjalanan terkini",
    "Longest journey": "Perjalanan terpanjang",
    "Trending": "Trending",
    "Curated": "Dipilih susun",
    "Journeys": "Perjalanan",
    "Grid": "Grid",
    "View destinations as map or grid": "Lihat destinasi sebagai peta atau grid"
  },
  "es": {
    "The Journal": "El Diario",
    "Stories from the road, the trail, and the saddle.": "Historias de la carretera, el sendero y la silla.",
    "Search stories…": "Buscar historias…",
    "All": "Todos",
    "No stories match that filter yet.": "No hay historias que coincidan con ese filtro.",
    "story": "historia",
    "stories": "historias",
    "published so far.": "publicadas hasta ahora.",
    "Stories": "Historias",
    "min read": "min de lectura",
    "Keep reading": "Seguir leyendo",
    "Story not found": "Historia no encontrada",
    "This trail has been moved or doesn't exist.": "Este sendero se ha movido o no existe.",
    "Back to all stories": "Volver a todas las historias",
    "Reviews & Comments": "Reseñas y comentarios",
    "rating": "valoración",
    "ratings": "valoraciones",
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
    "Share": "Compartir",
    "Facebook": "Facebook",
    "LinkedIn": "LinkedIn",
    "Copy link": "Copiar enlace",
    "Link copied": "Enlace copiado",
    "Photo Gallery": "Galería de fotos",
    "Traveled on": "Viajado en",
    "Destination": "Destino",
    "Destinations": "Destinos",
    "Language": "Idioma",
    "Home": "Inicio",
    "About": "Acerca de",
    "Contact": "Contacto",
    "Gallery": "Galería",
    "Map": "Mapa",
    "Search": "Buscar",
    "Category": "Categoría",
    "Categories": "Categorías",
    "Tags": "Etiquetas",
    "Trekking": "Senderismo",
    "Motorcycle": "Motocicleta",
    "Overland": "Overland",
    "Culture": "Cultura",
    "Photography": "Fotografía",
    "Guides": "Guías",
    "Tips": "Consejos",
    "Gear": "Equipo",
    "Close": "Cerrar",
    "Next": "Siguiente",
    "Previous": "Anterior",
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
    "Sponsored": "Patrocinado",
    "Advertisement": "Anuncio",
    "Explore": "Explorar",
    "Previous photo": "Foto anterior",
    "Next photo": "Foto siguiente",
    "Stories from the high places": "Historias de los lugares altos",
    "Most people only fly over.": "La mayoría de la gente sólo sobrevuela.",
    "Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world's wildest borders.": "Expediciones en solitario, viajes en motocicleta y diarios de trekking desde Pakistán, el Karakoram y las fronteras más salvajes del mundo.",
    "Solo · Slow · Cinematic": "Solo · Lento · Cinemático",
    "Read the stories": "leer las historias",
    "Explore destinations": "Explorar destinos",
    "Featured Expeditions": "Expediciones destacadas",
    "Handpicked long-form stories and remote trail guides.": "Historias extensas cuidadosamente seleccionadas y guías de senderos remotos.",
    "All expeditions": "Todas las expediciones",
    "Fresh dispatches from the high passes, trails, and solitary highways.": "Nuevos despachos desde los pasos altos, senderos y carreteras solitarias.",
    "View all stories": "Ver todas las historias",
    "Explore Topics": "Explorar temas",
    "Deep dives and curated journeys into the wild — each backed by published stories and route guides.": "Inmersiones profundas y viajes seleccionados a la naturaleza, cada uno respaldado por historias publicadas y guías de ruta.",
    "All topics": "Todos los temas",
    "By the numbers": "Por los números",
    "Journey in numbers": "Viaje en números",
    "A quiet tally of countries crossed, trips ridden and photographs made along the way.": "Un silencioso recuento de países atravesados, viajes realizados y fotografías realizadas a lo largo del camino.",
    "Countries Visited": "Países visitados",
    "Solo Motorcycle Trips": "Viajes en moto en solitario",
    "Photos Captured": "Fotos capturadas",
    "Kilometres Traveled": "Kilómetros recorridos",
    "Field Notes & Photography": "Notas de campo y fotografía",
    "Visual Journal": "Diario visual",
    "Moments captured in silence above 4,000 metres across the Karakoram and Himalaya.": "Momentos capturados en silencio a más de 4.000 metros de altura a través del Karakoram y el Himalaya.",
    "Full gallery": "Galería completa",
    "Where to Go": "Adónde ir",
    "Iconic base camps, alpine valleys, and high-altitude highways.": "Campamentos base icónicos, valles alpinos y carreteras de gran altitud.",
    "All destinations": "Todos los destinos",
    "Join the Journey": "Únase al viaje",
    "Get the next dispatch": "Obtenga el próximo envío",
    "One email when a new expedition story drops. No spam, no algorithm noise.": "Un correo electrónico cuando aparece una nueva historia de expedición. Sin spam, sin ruido de algoritmo.",
    "Read full story": "Leer historia completa",
    "Explore Topic": "Explorar tema",
    "Spotlight": "Foco",
    "Recent destination": "Destino reciente",
    "Latest trip": "último viaje",
    "Longest journey": "viaje más largo",
    "Trending": "Tendencia",
    "Curated": "Curado",
    "Journeys": "Viajes",
    "Grid": "Cuadrícula",
    "View destinations as map or grid": "Ver destinos como mapa o cuadrícula"
  },
  "fr": {
    "The Journal": "Le Journal",
    "Stories from the road, the trail, and the saddle.": "Récits de la route, des sentiers et de la selle.",
    "Search stories…": "Rechercher des récits…",
    "All": "Tous",
    "No stories match that filter yet.": "Aucun récit ne correspond à ce filtre.",
    "story": "récit",
    "stories": "récits",
    "published so far.": "publiés à ce jour.",
    "Stories": "Récits",
    "min read": "min de lecture",
    "Keep reading": "Continuer la lecture",
    "Story not found": "Récit introuvable",
    "This trail has been moved or doesn't exist.": "Ce sentier a été déplacé ou n'existe pas.",
    "Back to all stories": "Retour à tous les récits",
    "Reviews & Comments": "Avis et commentaires",
    "rating": "note",
    "ratings": "notes",
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
    "Share": "Partager",
    "Facebook": "Facebook",
    "LinkedIn": "LinkedIn",
    "Copy link": "Copier le lien",
    "Link copied": "Lien copié",
    "Photo Gallery": "Galerie photo",
    "Traveled on": "Voyagé le",
    "Destination": "Destination",
    "Destinations": "Destinations",
    "Language": "Langue",
    "Home": "Accueil",
    "About": "À propos",
    "Contact": "Contact",
    "Gallery": "Galerie",
    "Map": "Carte",
    "Search": "Rechercher",
    "Category": "Catégorie",
    "Categories": "Catégories",
    "Tags": "Étiquettes",
    "Trekking": "Trekking",
    "Motorcycle": "Moto",
    "Overland": "Overland",
    "Culture": "Culture",
    "Photography": "Photographie",
    "Guides": "Guides",
    "Tips": "Conseils",
    "Gear": "Équipement",
    "Close": "Fermer",
    "Next": "Suivant",
    "Previous": "Précédent",
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
    "Sponsored": "Sponsorisé",
    "Advertisement": "Publicité",
    "Explore": "Explorer",
    "Previous photo": "Photo précédente",
    "Next photo": "Photo suivante",
    "Stories from the high places": "Histoires des hauts lieux",
    "Most people only fly over.": "La plupart des gens ne font que survoler.",
    "Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world's wildest borders.": "Expéditions en solo, voyages à moto et carnets de trekking du Pakistan, du Karakoram et des frontières les plus sauvages du monde.",
    "Solo · Slow · Cinematic": "Solo · Lent · Cinématographique",
    "Read the stories": "Lire les histoires",
    "Explore destinations": "Explorer les destinations",
    "Featured Expeditions": "Expéditions en vedette",
    "Handpicked long-form stories and remote trail guides.": "Histoires longues triées sur le volet et guides de sentiers à distance.",
    "All expeditions": "Toutes les expéditions",
    "Fresh dispatches from the high passes, trails, and solitary highways.": "De nouvelles dépêches en provenance des hauts cols, des sentiers et des autoroutes solitaires.",
    "View all stories": "Voir toutes les histoires",
    "Explore Topics": "Explorer les sujets",
    "Deep dives and curated journeys into the wild — each backed by published stories and route guides.": "Des plongées approfondies et des voyages organisés dans la nature, chacun soutenu par des histoires publiées et des guides d'itinéraire.",
    "All topics": "Tous les sujets",
    "By the numbers": "En chiffres",
    "Journey in numbers": "Voyage en chiffres",
    "A quiet tally of countries crossed, trips ridden and photographs made along the way.": "Un décompte tranquille des pays traversés, des voyages effectués et des photographies prises en cours de route.",
    "Countries Visited": "Pays visités",
    "Solo Motorcycle Trips": "Voyages en moto en solo",
    "Photos Captured": "Photos capturées",
    "Kilometres Traveled": "Kilomètres parcourus",
    "Field Notes & Photography": "Notes de terrain et photographie",
    "Visual Journal": "Journal visuel",
    "Moments captured in silence above 4,000 metres across the Karakoram and Himalaya.": "Des instants capturés en silence au-dessus de 4 000 mètres à travers le Karakoram et l'Himalaya.",
    "Full gallery": "Galerie complète",
    "Where to Go": "Où aller",
    "Iconic base camps, alpine valleys, and high-altitude highways.": "Camps de base emblématiques, vallées alpines et autoroutes de haute altitude.",
    "All destinations": "Toutes les destinations",
    "Join the Journey": "Rejoignez le voyage",
    "Get the next dispatch": "Recevez la prochaine expédition",
    "One email when a new expedition story drops. No spam, no algorithm noise.": "Un e-mail lorsqu'une nouvelle histoire d'expédition tombe. Pas de spam, pas de bruit d'algorithme.",
    "Read full story": "Lire l'histoire complète",
    "Explore Topic": "Explorer le sujet",
    "Spotlight": "Pleins feux",
    "Recent destination": "Destination récente",
    "Latest trip": "Dernier voyage",
    "Longest journey": "Le plus long voyage",
    "Trending": "Tendance",
    "Curated": "Organisé",
    "Journeys": "Voyages",
    "Grid": "Grille",
    "View destinations as map or grid": "Afficher les destinations sous forme de carte ou de grille"
  },
  "pt": {
    "The Journal": "O Diário",
    "Stories from the road, the trail, and the saddle.": "Histórias da estrada, da trilha e do selim.",
    "Search stories…": "Pesquisar histórias…",
    "All": "Todos",
    "No stories match that filter yet.": "Nenhuma história corresponde a esse filtro.",
    "story": "história",
    "stories": "histórias",
    "published so far.": "publicadas até agora.",
    "Stories": "Histórias",
    "min read": "min de leitura",
    "Keep reading": "Continuar lendo",
    "Story not found": "História não encontrada",
    "This trail has been moved or doesn't exist.": "Esta trilha foi movida ou não existe.",
    "Back to all stories": "Voltar a todas as histórias",
    "Reviews & Comments": "Avaliações e comentários",
    "rating": "avaliação",
    "ratings": "avaliações",
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
    "Share": "Compartilhar",
    "Facebook": "Facebook",
    "LinkedIn": "LinkedIn",
    "Copy link": "Copiar link",
    "Link copied": "Link copiado",
    "Photo Gallery": "Galeria de Fotos",
    "Traveled on": "Viajou em",
    "Destination": "Destino",
    "Destinations": "Destinos",
    "Language": "Idioma",
    "Home": "Início",
    "About": "Sobre",
    "Contact": "Contato",
    "Gallery": "Galeria",
    "Map": "Mapa",
    "Search": "Pesquisar",
    "Category": "Categoria",
    "Categories": "Categorias",
    "Tags": "Tags",
    "Trekking": "Trekking",
    "Motorcycle": "Motocicleta",
    "Overland": "Overland",
    "Culture": "Cultura",
    "Photography": "Fotografia",
    "Guides": "Guias",
    "Tips": "Dicas",
    "Gear": "Equipamentos",
    "Close": "Fechar",
    "Next": "Próximo",
    "Previous": "Anterior",
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
    "Sponsored": "Patrocinado",
    "Advertisement": "Anúncio",
    "Explore": "Explorar",
    "Previous photo": "Foto anterior",
    "Next photo": "Próxima foto",
    "Stories from the high places": "Histórias dos lugares altos",
    "Most people only fly over.": "A maioria das pessoas apenas voa.",
    "Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world's wildest borders.": "Expedições individuais, viagens de motocicleta e diários de trekking do Paquistão, do Karakoram e das fronteiras mais selvagens do mundo.",
    "Solo · Slow · Cinematic": "Solo · Lento · Cinematográfico",
    "Read the stories": "Leia as histórias",
    "Explore destinations": "Explorar destinos",
    "Featured Expeditions": "Expedições em destaque",
    "Handpicked long-form stories and remote trail guides.": "Histórias longas escolhidas a dedo e guias de trilhas remotas.",
    "All expeditions": "Todas as expedições",
    "Fresh dispatches from the high passes, trails, and solitary highways.": "Novidades de passagens altas, trilhas e rodovias solitárias.",
    "View all stories": "Ver todas as histórias",
    "Explore Topics": "Explorar tópicos",
    "Deep dives and curated journeys into the wild — each backed by published stories and route guides.": "Mergulhos profundos e viagens selecionadas pela natureza, cada um apoiado por histórias publicadas e guias de rotas.",
    "All topics": "Todos os tópicos",
    "By the numbers": "Pelos números",
    "Journey in numbers": "Viagem em números",
    "A quiet tally of countries crossed, trips ridden and photographs made along the way.": "Um registo tranquilo de países atravessados, viagens realizadas e fotografias tiradas ao longo do caminho.",
    "Countries Visited": "Países visitados",
    "Solo Motorcycle Trips": "Viagens individuais de motocicleta",
    "Photos Captured": "Fotos capturadas",
    "Kilometres Traveled": "Quilômetros percorridos",
    "Field Notes & Photography": "Notas de campo e fotografia",
    "Visual Journal": "Diário Visual",
    "Moments captured in silence above 4,000 metres across the Karakoram and Himalaya.": "Momentos capturados em silêncio acima de 4.000 metros através do Karakoram e do Himalaia.",
    "Full gallery": "Galeria completa",
    "Where to Go": "Para onde ir",
    "Iconic base camps, alpine valleys, and high-altitude highways.": "Acampamentos base icônicos, vales alpinos e rodovias de alta altitude.",
    "All destinations": "Todos os destinos",
    "Join the Journey": "Junte-se à jornada",
    "Get the next dispatch": "Receba o próximo despacho",
    "One email when a new expedition story drops. No spam, no algorithm noise.": "Um e-mail quando uma nova história de expedição for lançada. Sem spam, sem ruído de algoritmo.",
    "Read full story": "Leia a história completa",
    "Explore Topic": "Explorar tópico",
    "Spotlight": "Destaque",
    "Recent destination": "Destino recente",
    "Latest trip": "Última viagem",
    "Longest journey": "Viagem mais longa",
    "Trending": "Tendências",
    "Curated": "Curadoria",
    "Journeys": "Jornadas",
    "Grid": "Grade",
    "View destinations as map or grid": "Ver destinos como mapa ou grade"
  },
  "no": {
    "The Journal": "Journalen",
    "Stories from the road, the trail, and the saddle.": "Historier fra veien, stien og salen.",
    "Search stories…": "Søk etter historier…",
    "All": "Alle",
    "No stories match that filter yet.": "Ingen historier passer til det filteret ennå.",
    "story": "historie",
    "stories": "historier",
    "published so far.": "publisert så langt.",
    "Stories": "Historier",
    "min read": "min lesing",
    "Keep reading": "Les videre",
    "Story not found": "Historie ikke funnet",
    "This trail has been moved or doesn't exist.": "Denne stien har blitt flyttet eller finnes ikke.",
    "Back to all stories": "Tilbake til alle historier",
    "Reviews & Comments": "Anmeldelser og kommentarer",
    "rating": "vurdering",
    "ratings": "vurderinger",
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
    "Share": "Del",
    "Facebook": "Facebook",
    "LinkedIn": "LinkedIn",
    "Copy link": "Kopier lenke",
    "Link copied": "Lenke kopiert",
    "Photo Gallery": "Fotogalleri",
    "Traveled on": "Reiste den",
    "Destination": "Destinasjon",
    "Destinations": "Destinasjoner",
    "Language": "Språk",
    "Home": "Hjem",
    "About": "Om",
    "Contact": "Kontakt",
    "Gallery": "Galleri",
    "Map": "Kart",
    "Search": "Søk",
    "Category": "Kategori",
    "Categories": "Kategorier",
    "Tags": "Tagger",
    "Trekking": "Fjelltur",
    "Motorcycle": "Motorsykkel",
    "Overland": "Overland",
    "Culture": "Kultur",
    "Photography": "Fotografering",
    "Guides": "Guider",
    "Tips": "Tips",
    "Gear": "Utstyr",
    "Close": "Lukk",
    "Next": "Neste",
    "Previous": "Forrige",
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
    "Sponsored": "Sponset",
    "Advertisement": "Annonse",
    "Explore": "Utforsk",
    "Previous photo": "Forrige bilde",
    "Next photo": "Neste bilde",
    "Stories from the high places": "Historier fra de høye steder",
    "Most people only fly over.": "De fleste flyr bare over.",
    "Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world's wildest borders.": "Soloekspedisjoner, motorsykkelreiser og trekkingdagbøker fra Pakistan, Karakoram og verdens villeste grenser.",
    "Solo · Slow · Cinematic": "Solo · Sakte · Kinematisk",
    "Read the stories": "Les historiene",
    "Explore destinations": "Utforsk reisemål",
    "Featured Expeditions": "Utvalgte ekspedisjoner",
    "Handpicked long-form stories and remote trail guides.": "Håndplukkede historier i lang form og eksterne stiguider.",
    "All expeditions": "Alle ekspedisjoner",
    "Fresh dispatches from the high passes, trails, and solitary highways.": "Friske sendinger fra de høye passene, stiene og ensomme motorveiene.",
    "View all stories": "Se alle historiene",
    "Explore Topics": "Utforsk emner",
    "Deep dives and curated journeys into the wild — each backed by published stories and route guides.": "Dypdykk og kuraterte reiser ut i naturen – hver støttet av publiserte historier og ruteguider.",
    "All topics": "Alle emner",
    "By the numbers": "Etter tallene",
    "Journey in numbers": "Reise i tall",
    "A quiet tally of countries crossed, trips ridden and photographs made along the way.": "En stille opptelling av land krysset, turer ridd og fotografier tatt underveis.",
    "Countries Visited": "Land som er besøkt",
    "Solo Motorcycle Trips": "Solo motorsykkelturer",
    "Photos Captured": "Bilder tatt",
    "Kilometres Traveled": "Kilometer tilbakelagt",
    "Field Notes & Photography": "Feltnotater og fotografering",
    "Visual Journal": "Visual Journal",
    "Moments captured in silence above 4,000 metres across the Karakoram and Himalaya.": "Øyeblikk fanget i stillhet over 4000 meter over Karakoram og Himalaya.",
    "Full gallery": "Fullt galleri",
    "Where to Go": "Hvor å gå",
    "Iconic base camps, alpine valleys, and high-altitude highways.": "Ikoniske baseleirer, alpine daler og høye motorveier.",
    "All destinations": "Alle destinasjoner",
    "Join the Journey": "Bli med på reisen",
    "Get the next dispatch": "Få neste utsendelse",
    "One email when a new expedition story drops. No spam, no algorithm noise.": "Én e-post når en ny ekspedisjonshistorie kommer. Ingen spam, ingen algoritmestøy.",
    "Read full story": "Les hele historien",
    "Explore Topic": "Utforsk emne",
    "Spotlight": "Søkelys",
    "Recent destination": "Nylig destinasjon",
    "Latest trip": "Siste tur",
    "Longest journey": "Lengste reise",
    "Trending": "På vei opp",
    "Curated": "Kuratert",
    "Journeys": "Reiser",
    "Grid": "Rutenett",
    "View destinations as map or grid": "Vis destinasjoner som kart eller rutenett"
  },
  "tr": {
    "The Journal": "Günlük",
    "Stories from the road, the trail, and the saddle.": "Yoldan, patikadan ve seleden hikayeler.",
    "Search stories…": "Hikayelerde ara…",
    "All": "Tümü",
    "No stories match that filter yet.": "Henüz bu filtreye uyan hikaye yok.",
    "story": "hikaye",
    "stories": "hikaye",
    "published so far.": "şimdiye kadar yayınlandı.",
    "Stories": "Hikayeler",
    "min read": "dk okuma",
    "Keep reading": "Okumaya devam et",
    "Story not found": "Hikaye bulunamadı",
    "This trail has been moved or doesn't exist.": "Bu rota taşınmış veya mevcut değil.",
    "Back to all stories": "Tüm hikayelere dön",
    "Reviews & Comments": "Değerlendirmeler ve Yorumlar",
    "rating": "puan",
    "ratings": "puan",
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
    "Share": "Paylaş",
    "Facebook": "Facebook",
    "LinkedIn": "LinkedIn",
    "Copy link": "Bağlantıyı kopyala",
    "Link copied": "Bağlantı kopyalandı",
    "Photo Gallery": "Fotoğraf Galerisi",
    "Traveled on": "Seyahat tarihi",
    "Destination": "Destinasyon",
    "Destinations": "Destinasyonlar",
    "Language": "Dil",
    "Home": "Ana Sayfa",
    "About": "Hakkında",
    "Contact": "İletişim",
    "Gallery": "Galeri",
    "Map": "Harita",
    "Search": "Ara",
    "Category": "Kategori",
    "Categories": "Kategoriler",
    "Tags": "Etiketler",
    "Trekking": "Doğa Yürüyüşü",
    "Motorcycle": "Motosiklet",
    "Overland": "Kara Yolculuğu",
    "Culture": "Kültür",
    "Photography": "Fotoğrafçılık",
    "Guides": "Rehberler",
    "Tips": "İpuçları",
    "Gear": "Ekipman",
    "Close": "Kapat",
    "Next": "Sonraki",
    "Previous": "Önceki",
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
    "Sponsored": "Sponsorlu",
    "Advertisement": "Reklam",
    "Explore": "Keşfet",
    "Previous photo": "Önceki fotoğraf",
    "Next photo": "Sonraki fotoğraf",
    "Stories from the high places": "Yüksek yerlerden hikayeler",
    "Most people only fly over.": "Çoğu insan sadece üzerinden uçuyor.",
    "Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world's wildest borders.": "Pakistan'dan, Karakoram'dan ve dünyanın en vahşi sınırlarından tek başına keşif gezileri, motosiklet yolculukları ve yürüyüş günlükleri.",
    "Solo · Slow · Cinematic": "Solo · Yavaş · Sinematik",
    "Read the stories": "Hikayeleri okuyun",
    "Explore destinations": "Destinasyonları keşfedin",
    "Featured Expeditions": "Öne Çıkan Keşif Gezileri",
    "Handpicked long-form stories and remote trail guides.": "Özenle seçilmiş uzun biçimli hikayeler ve uzaktan iz kılavuzları.",
    "All expeditions": "Tüm keşif seferleri",
    "Fresh dispatches from the high passes, trails, and solitary highways.": "Yüksek geçitlerden, patikalardan ve ıssız otoyollardan yeni haberler.",
    "View all stories": "Tüm hikayeleri görüntüle",
    "Explore Topics": "Konuları Keşfedin",
    "Deep dives and curated journeys into the wild — each backed by published stories and route guides.": "Her biri yayınlanmış hikayeler ve rota kılavuzlarıyla desteklenen, vahşi doğaya yapılan derin dalışlar ve özenle seçilmiş yolculuklar.",
    "All topics": "Tüm konular",
    "By the numbers": "Sayılara göre",
    "Journey in numbers": "Rakamlarla yolculuk",
    "A quiet tally of countries crossed, trips ridden and photographs made along the way.": "Geçilen ülkelerin, yapılan gezilerin ve yol boyunca çekilen fotoğrafların sessiz bir çetelesi.",
    "Countries Visited": "Ziyaret Edilen Ülkeler",
    "Solo Motorcycle Trips": "Yalnız Motosiklet Gezileri",
    "Photos Captured": "Çekilen fotoğraflar",
    "Kilometres Traveled": "Kat Edilen Kilometre",
    "Field Notes & Photography": "Saha Notları ve Fotoğrafçılık",
    "Visual Journal": "Görsel Günlük",
    "Moments captured in silence above 4,000 metres across the Karakoram and Himalaya.": "Karakurum ve Himalayalar'da 4.000 metrenin üzerinde sessizlik içinde çekilen anlar.",
    "Full gallery": "Tam galeri",
    "Where to Go": "Nereye Gidilir",
    "Iconic base camps, alpine valleys, and high-altitude highways.": "İkonik ana kamplar, dağ vadileri ve yüksek rakımlı otoyollar.",
    "All destinations": "Tüm destinasyonlar",
    "Join the Journey": "Yolculuğa Katılın",
    "Get the next dispatch": "Bir sonraki gönderiyi alın",
    "One email when a new expedition story drops. No spam, no algorithm noise.": "Yeni bir keşif gezisi hikayesi yayınlandığında bir e-posta. Spam yok, algoritma gürültüsü yok.",
    "Read full story": "Hikayenin tamamını okuyun",
    "Explore Topic": "Konuyu Keşfet",
    "Spotlight": "Gündem",
    "Recent destination": "Son varış noktası",
    "Latest trip": "Son yolculuk",
    "Longest journey": "En uzun yolculuk",
    "Trending": "Trend olan",
    "Curated": "Küratörlü",
    "Journeys": "Yolculuklar",
    "Grid": "Izgara",
    "View destinations as map or grid": "Hedefleri harita veya tablo olarak görüntüleyin"
  },
  "ko": {
    "The Journal": "저널",
    "Stories from the road, the trail, and the saddle.": "길, 트레일, 그리고 안위 위에서의 이야기들.",
    "Search stories…": "이야기 검색…",
    "All": "전체",
    "No stories match that filter yet.": "해당 필터와 일치하는 이야기가 아직 없습니다.",
    "story": "이야기",
    "stories": "이야기들",
    "published so far.": "현재까지 발행됨.",
    "Stories": "이야기들",
    "min read": "분 소요",
    "Keep reading": "계속 읽기",
    "Story not found": "이야기를 찾을 수 없습니다",
    "This trail has been moved or doesn't exist.": "이 경로는 이동되었거나 존재하지 않습니다.",
    "Back to all stories": "모든 이야기로 돌아가기",
    "Reviews & Comments": "리뷰 및 댓글",
    "rating": "평점",
    "ratings": "평점들",
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
    "Share": "공유하기",
    "Facebook": "페이스북",
    "LinkedIn": "링크드인",
    "Copy link": "링크 복사",
    "Link copied": "링크가 복사되었습니다",
    "Photo Gallery": "사진 갤러리",
    "Traveled on": "여행 날짜",
    "Destination": "목적지",
    "Destinations": "목적지들",
    "Language": "언어",
    "Home": "홈",
    "About": "소개",
    "Contact": "문의",
    "Gallery": "갤러리",
    "Map": "지도",
    "Search": "검색",
    "Category": "카테고리",
    "Categories": "카테고리 목록",
    "Tags": "태그",
    "Trekking": "트레킹",
    "Motorcycle": "모터사이클",
    "Overland": "오버랜드",
    "Culture": "문화",
    "Photography": "사진",
    "Guides": "가이드",
    "Tips": "팁",
    "Gear": "장비",
    "Close": "닫기",
    "Next": "다음",
    "Previous": "이전",
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
    "Sponsored": "스폰서",
    "Advertisement": "광고",
    "Explore": "탐험하기",
    "Previous photo": "이전 사진",
    "Next photo": "다음 사진",
    "Stories from the high places": "높은 곳에서 전해지는 이야기",
    "Most people only fly over.": "대부분의 사람들은 단지 날아갑니다.",
    "Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world's wildest borders.": "파키스탄, 카라코람 및 세계에서 가장 거친 국경 지역의 개인 탐험, 오토바이 여행 및 트레킹 일기입니다.",
    "Solo · Slow · Cinematic": "솔로 · 슬로우 · 시네마틱",
    "Read the stories": "이야기 읽기",
    "Explore destinations": "목적지 탐색",
    "Featured Expeditions": "특집 탐험",
    "Handpicked long-form stories and remote trail guides.": "엄선된 장편 스토리와 원격 트레일 가이드.",
    "All expeditions": "모든 탐사",
    "Fresh dispatches from the high passes, trails, and solitary highways.": "높은 고개, 산책로, 외로운 고속도로에서 신선한 소식을 전해드립니다.",
    "View all stories": "모든 스토리 보기",
    "Explore Topics": "주제 탐색",
    "Deep dives and curated journeys into the wild — each backed by published stories and route guides.": "야생으로의 심층 다이빙과 엄선된 여행 - 각각 게시된 스토리와 경로 가이드가 뒷받침됩니다.",
    "All topics": "모든 주제",
    "By the numbers": "숫자로",
    "Journey in numbers": "숫자로 여행",
    "A quiet tally of countries crossed, trips ridden and photographs made along the way.": "교차하는 국가, 여행, 그리고 길을 따라 찍은 사진의 조용한 집계입니다.",
    "Countries Visited": "방문한 국가",
    "Solo Motorcycle Trips": "솔로 오토바이 여행",
    "Photos Captured": "캡처된 사진",
    "Kilometres Traveled": "이동한 킬로미터",
    "Field Notes & Photography": "현장 메모 및 사진",
    "Visual Journal": "비주얼 저널",
    "Moments captured in silence above 4,000 metres across the Karakoram and Himalaya.": "카라코람과 히말라야를 가로지르는 4,000미터 상공에서 침묵 속에 포착된 순간들입니다.",
    "Full gallery": "전체 갤러리",
    "Where to Go": "어디로 갈까?",
    "Iconic base camps, alpine valleys, and high-altitude highways.": "상징적인 베이스 캠프, 고산 계곡, 고지대 고속도로.",
    "All destinations": "모든 목적지",
    "Join the Journey": "여행에 동참하세요",
    "Get the next dispatch": "다음 파견 받기",
    "One email when a new expedition story drops. No spam, no algorithm noise.": "새로운 탐험 이야기가 나오면 이메일 한 통. 스팸도 없고 알고리즘 소음도 없습니다.",
    "Read full story": "전체 기사 읽기",
    "Explore Topic": "주제 탐색",
    "Spotlight": "스포트라이트",
    "Recent destination": "최근 목적지",
    "Latest trip": "최근 여행",
    "Longest journey": "가장 긴 여행",
    "Trending": "인기 급상승",
    "Curated": "선별됨",
    "Journeys": "여행",
    "Grid": "그리드",
    "View destinations as map or grid": "목적지를 지도나 그리드로 보기"
  },
  "zh": {
    "The Journal": "日志",
    "Stories from the road, the trail, and the saddle.": "来自公路、小径和车座上的故事。",
    "Search stories…": "搜索故事…",
    "All": "全部",
    "No stories match that filter yet.": "暂无符合该筛选条件的故事。",
    "story": "故事",
    "stories": "故事",
    "published so far.": "迄今已发布。",
    "Stories": "故事",
    "min read": "分钟阅读",
    "Keep reading": "继续阅读",
    "Story not found": "未找到故事",
    "This trail has been moved or doesn't exist.": "该路线已被移动或不存在。",
    "Back to all stories": "返回所有故事",
    "Reviews & Comments": "评价与评论",
    "rating": "评分",
    "ratings": "评分",
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
    "Share": "分享",
    "Facebook": "Facebook",
    "LinkedIn": "LinkedIn",
    "Copy link": "复制链接",
    "Link copied": "链接已复制",
    "Photo Gallery": "画廊",
    "Traveled on": "旅行时间",
    "Destination": "目的地",
    "Destinations": "目的地",
    "Language": "语言",
    "Home": "首页",
    "About": "关于",
    "Contact": "联系",
    "Gallery": "画廊",
    "Map": "地图",
    "Search": "搜索",
    "Category": "分类",
    "Categories": "分类列表",
    "Tags": "标签",
    "Trekking": "徒步",
    "Motorcycle": "摩托车",
    "Overland": "越野陆行",
    "Culture": "文化",
    "Photography": "摄影",
    "Guides": "指南",
    "Tips": "贴士",
    "Gear": "装备",
    "Close": "关闭",
    "Next": "下一页",
    "Previous": "上一页",
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
    "Sponsored": "赞助",
    "Advertisement": "广告",
    "Explore": "探索",
    "Previous photo": "上一张照片",
    "Next photo": "下一张照片",
    "Stories from the high places": "来自高处的故事",
    "Most people only fly over.": "大多数人只是飞过去。",
    "Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world's wildest borders.": "来自巴基斯坦、喀喇昆仑山脉和世界上最狂野边境的单人探险、摩托车之旅和徒步日记。",
    "Solo · Slow · Cinematic": "独奏·缓慢·电影",
    "Read the stories": "阅读故事",
    "Explore destinations": "探索目的地",
    "Featured Expeditions": "特色探险",
    "Handpicked long-form stories and remote trail guides.": "精心挑选的长篇故事和远程路线指南。",
    "All expeditions": "所有探险",
    "Fresh dispatches from the high passes, trails, and solitary highways.": "来自高山口、小径和偏僻的高速公路的新鲜消息。",
    "View all stories": "查看所有故事",
    "Explore Topics": "探索主题",
    "Deep dives and curated journeys into the wild — each backed by published stories and route guides.": "深度潜水和精心策划的野外之旅——每项都有已发表的故事和路线指南支持。",
    "All topics": "所有主题",
    "By the numbers": "从数字来看",
    "Journey in numbers": "数字之旅",
    "A quiet tally of countries crossed, trips ridden and photographs made along the way.": "悄悄记录沿途穿越的国家、骑行的旅行和拍摄的照片。",
    "Countries Visited": "访问国家",
    "Solo Motorcycle Trips": "独自摩托车旅行",
    "Photos Captured": "拍摄的照片",
    "Kilometres Traveled": "行驶公里数",
    "Field Notes & Photography": "田野笔记和摄影",
    "Visual Journal": "视觉杂志",
    "Moments captured in silence above 4,000 metres across the Karakoram and Himalaya.": "横跨喀喇昆仑山脉和喜马拉雅山，在海拔 4,000 米以上的沉默中捕捉精彩瞬间。",
    "Full gallery": "完整画廊",
    "Where to Go": "去哪里",
    "Iconic base camps, alpine valleys, and high-altitude highways.": "标志性的大本营、高山山谷和高海拔公路。",
    "All destinations": "所有目的地",
    "Join the Journey": "加入旅程",
    "Get the next dispatch": "获取下一次调度",
    "One email when a new expedition story drops. No spam, no algorithm noise.": "当新的探险故事发布时，一封电子邮件。没有垃圾邮件，没有算法噪音。",
    "Read full story": "阅读全文",
    "Explore Topic": "探索主题",
    "Spotlight": "聚光灯",
    "Recent destination": "最近的目的地",
    "Latest trip": "最新行程",
    "Longest journey": "最长的旅程",
    "Trending": "流行趋势",
    "Curated": "策划",
    "Journeys": "旅程",
    "Grid": "网格",
    "View destinations as map or grid": "以地图或网格形式查看目的地"
  },
  "ja": {
    "The Journal": "ジャーナル",
    "Stories from the road, the trail, and the saddle.": "道、トレイル、そして鞍の上からの物語。",
    "Search stories…": "記事を検索…",
    "All": "すべて",
    "No stories match that filter yet.": "条件に一致する記事はまだありません。",
    "story": "記事",
    "stories": "記事",
    "published so far.": "公開済み。",
    "Stories": "記事一覧",
    "min read": "分で読める",
    "Keep reading": "続きを読む",
    "Story not found": "記事が見つかりません",
    "This trail has been moved or doesn't exist.": "このルートは移動されたか存在しません。",
    "Back to all stories": "すべての記事に戻る",
    "Reviews & Comments": "レビューとコメント",
    "rating": "評価",
    "ratings": "評価",
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
    "Share": "共有",
    "Facebook": "Facebook",
    "LinkedIn": "LinkedIn",
    "Copy link": "リンクをコピー",
    "Link copied": "リンクをコピーしました",
    "Photo Gallery": "フォトギャラリー",
    "Traveled on": "旅した日",
    "Destination": "目的地",
    "Destinations": "目的地一覧",
    "Language": "言語",
    "Home": "ホーム",
    "About": "概要",
    "Contact": "お問い合わせ",
    "Gallery": "ギャラリー",
    "Map": "地図",
    "Search": "検索",
    "Category": "カテゴリー",
    "Categories": "カテゴリー一覧",
    "Tags": "タグ",
    "Trekking": "トレッキング",
    "Motorcycle": "バイク",
    "Overland": "オーバーランド",
    "Culture": "文化",
    "Photography": "写真",
    "Guides": "ガイド",
    "Tips": "ヒント",
    "Gear": "ギア・装備",
    "Close": "閉じる",
    "Next": "次へ",
    "Previous": "前へ",
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
    "Sponsored": "スポンサー",
    "Advertisement": "広告",
    "Explore": "探索する",
    "Previous photo": "前の写真",
    "Next photo": "次の写真",
    "Stories from the high places": "高いところからの物語",
    "Most people only fly over.": "ほとんどの人は上空を飛ぶだけです。",
    "Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world's wildest borders.": "パキスタン、カラコルム、そして世界で最も荒々しい国境からの一人遠征、バイク旅、トレッキング日記。",
    "Solo · Slow · Cinematic": "ソロ・スロー・シネマティック",
    "Read the stories": "ストーリーを読む",
    "Explore destinations": "目的地を探索する",
    "Featured Expeditions": "注目の遠征",
    "Handpicked long-form stories and remote trail guides.": "厳選された長編ストーリーとリモート トレイル ガイド。",
    "All expeditions": "すべての遠征",
    "Fresh dispatches from the high passes, trails, and solitary highways.": "高原の峠、小道、孤独な高速道路から新鮮な情報を発信します。",
    "View all stories": "すべてのストーリーを見る",
    "Explore Topics": "トピックを探索する",
    "Deep dives and curated journeys into the wild — each backed by published stories and route guides.": "ディープダイブと厳選された野生の旅 - それぞれが出版されたストーリーとルートガイドに裏付けられています。",
    "All topics": "すべてのトピック",
    "By the numbers": "数字で見ると",
    "Journey in numbers": "数字の旅",
    "A quiet tally of countries crossed, trips ridden and photographs made along the way.": "旅した国、乗った旅、途中で撮った写真を静かに集計。",
    "Countries Visited": "訪問国",
    "Solo Motorcycle Trips": "バイク一人旅",
    "Photos Captured": "撮影した写真",
    "Kilometres Traveled": "走行キロメートル",
    "Field Notes & Photography": "フィールドノートと写真",
    "Visual Journal": "ビジュアルジャーナル",
    "Moments captured in silence above 4,000 metres across the Karakoram and Himalaya.": "カラコルムとヒマラヤ山脈の標高 4,000 メートル上空で静寂の中で捉えられた瞬間。",
    "Full gallery": "フルギャラリー",
    "Where to Go": "どこへ行くか",
    "Iconic base camps, alpine valleys, and high-altitude highways.": "象徴的なベースキャンプ、高山の渓谷、高地の高速道路。",
    "All destinations": "すべての目的地",
    "Join the Journey": "旅に参加しましょう",
    "Get the next dispatch": "次の派遣を取得する",
    "One email when a new expedition story drops. No spam, no algorithm noise.": "新しい遠征ストーリーがドロップされると 1 通のメールが送信されます。スパムやアルゴリズムのノイズはありません。",
    "Read full story": "全文を読む",
    "Explore Topic": "トピックを探索する",
    "Spotlight": "スポットライト",
    "Recent destination": "最近の目的地",
    "Latest trip": "最近の旅行",
    "Longest journey": "最長の旅",
    "Trending": "トレンド",
    "Curated": "厳選された",
    "Journeys": "旅",
    "Grid": "グリッド",
    "View destinations as map or grid": "目的地を地図またはグリッドで表示"
  },
  "fa": {
    "The Journal": "مجله سفر",
    "Stories from the road, the trail, and the saddle.": "داستان‌هایی از جاده، مسیر و زین موتور.",
    "Search stories…": "جستجوی داستان‌ها…",
    "All": "همه",
    "No stories match that filter yet.": "هنوز داستانی با این فیلتر مطابقت ندارد.",
    "story": "داستان",
    "stories": "داستان‌ها",
    "published so far.": "تاکنون منتشر شده است.",
    "Stories": "داستان‌ها",
    "min read": "دقیقه مطالعه",
    "Keep reading": "ادامه مطلب",
    "Story not found": "داستان پیدا نشد",
    "This trail has been moved or doesn't exist.": "این مسیر منتقل شده یا وجود ندارد.",
    "Back to all stories": "بازگشت به همه داستان‌ها",
    "Reviews & Comments": "نظرات و دیدگاه‌ها",
    "rating": "امتیاز",
    "ratings": "امتیازها",
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
    "Share": "اشتراک‌گذاری",
    "Facebook": "فیس‌بوک",
    "LinkedIn": "لینکدین",
    "Copy link": "کپی لینک",
    "Link copied": "لینک کپی شد",
    "Photo Gallery": "گالری تصاویر",
    "Traveled on": "تاریخ سفر",
    "Destination": "مقصد",
    "Destinations": "مقصدها",
    "Language": "زبان",
    "Home": "خانه",
    "About": "درباره ما",
    "Contact": "تماس",
    "Gallery": "گالری",
    "Map": "نقشه",
    "Search": "جستجو",
    "Category": "دسته‌بندی",
    "Categories": "دسته‌بندی‌ها",
    "Tags": "برچسب‌ها",
    "Trekking": "کوهنوردی",
    "Motorcycle": "موتورسیکلت",
    "Overland": "سفر زمینی",
    "Culture": "فرهنگ",
    "Photography": "عکاسی",
    "Guides": "راهنماها",
    "Tips": "نکات",
    "Gear": "تجهیزات",
    "Close": "بستن",
    "Next": "بعدی",
    "Previous": "قبلی",
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
    "Sponsored": "حامی مالی",
    "Advertisement": "تبلیغات",
    "Explore": "کاوش",
    "Previous photo": "عکس قبلی",
    "Next photo": "عکس بعدی",
    "Stories from the high places": "داستان هایی از مکان های مرتفع",
    "Most people only fly over.": "بیشتر مردم فقط بر فراز آن پرواز می کنند.",
    "Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world's wildest borders.": "سفرهای انفرادی، سفرهای موتورسیکلت و یادداشت‌های کوهنوردی از پاکستان، قراقورام و وحشی‌ترین مرزهای جهان.",
    "Solo · Slow · Cinematic": "انفرادی · آهسته · سینمایی",
    "Read the stories": "داستان ها را بخوانید",
    "Explore destinations": "مقاصد را کاوش کنید",
    "Featured Expeditions": "اکسپدیشن های ویژه",
    "Handpicked long-form stories and remote trail guides.": "داستان‌های طولانی و راهنماهای راه دور دست‌چین شده.",
    "All expeditions": "همه اکسپدیشن ها",
    "Fresh dispatches from the high passes, trails, and solitary highways.": "ارسال های تازه از گردنه های مرتفع، مسیرها و بزرگراه های منفرد.",
    "View all stories": "مشاهده همه داستان ها",
    "Explore Topics": "موضوعات را کاوش کنید",
    "Deep dives and curated journeys into the wild — each backed by published stories and route guides.": "غواصی های عمیق و سفرهای تنظیم شده به طبیعت - هر کدام با داستان های منتشر شده و راهنمای مسیر پشتیبانی می شوند.",
    "All topics": "همه موضوعات",
    "By the numbers": "با اعداد",
    "Journey in numbers": "سفر در اعداد",
    "A quiet tally of countries crossed, trips ridden and photographs made along the way.": "شماری آرام از کشورهایی که از آن عبور کرده‌اند، سفرهایی که سوار شده‌اند و عکس‌هایی که در طول مسیر گرفته شده‌اند.",
    "Countries Visited": "کشورهای بازدید شده",
    "Solo Motorcycle Trips": "سفرهای انفرادی موتور سیکلت",
    "Photos Captured": "عکس های گرفته شده",
    "Kilometres Traveled": "کیلومترهای پیموده شده",
    "Field Notes & Photography": "یادداشت های میدانی و عکاسی",
    "Visual Journal": "مجله تصویری",
    "Moments captured in silence above 4,000 metres across the Karakoram and Himalaya.": "لحظاتی که در سکوت بالای 4000 متر در سراسر قراقورام و هیمالیا ثبت شده است.",
    "Full gallery": "گالری کامل",
    "Where to Go": "کجا برو",
    "Iconic base camps, alpine valleys, and high-altitude highways.": "کمپ‌های اصلی نمادین، دره‌های آلپ، و بزرگراه‌های مرتفع.",
    "All destinations": "همه مقاصد",
    "Join the Journey": "به سفر بپیوندید",
    "Get the next dispatch": "ارسال بعدی را دریافت کنید",
    "One email when a new expedition story drops. No spam, no algorithm noise.": "یک ایمیل وقتی داستان اکسپدیشن جدید منتشر می شود. بدون هرزنامه، بدون نویز الگوریتم.",
    "Read full story": "داستان را کامل بخوانید",
    "Explore Topic": "موضوع را کاوش کنید",
    "Spotlight": "کانون توجه",
    "Recent destination": "مقصد اخیر",
    "Latest trip": "آخرین سفر",
    "Longest journey": "طولانی ترین سفر",
    "Trending": "پرطرفدار",
    "Curated": "سرپرستی",
    "Journeys": "سفرها",
    "Grid": "شبکه",
    "View destinations as map or grid": "مقاصد را به صورت نقشه یا شبکه مشاهده کنید"
  },
  "ar": {
    "The Journal": "المجلة",
    "Stories from the road, the trail, and the saddle.": "قصص من الطريق والمسار وظهر الدراجة.",
    "Search stories…": "البحث في القصص…",
    "All": "الكل",
    "No stories match that filter yet.": "لا توجد قصص تطابق هذا الفلتر بعد.",
    "story": "قصة",
    "stories": "قصص",
    "published so far.": "تم نشرها حتى الآن.",
    "Stories": "القصص",
    "min read": "دقائق قراءة",
    "Keep reading": "متابعة القراءة",
    "Story not found": "القصة غير موجودة",
    "This trail has been moved or doesn't exist.": "تم نقل هذا المسار أو أنه غير موجود.",
    "Back to all stories": "العودة إلى كل القصص",
    "Reviews & Comments": "المراجعات والتعليقات",
    "rating": "تقييم",
    "ratings": "تقييمات",
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
    "Share": "مشاركة",
    "Facebook": "فيسبوك",
    "LinkedIn": "لينكد إن",
    "Copy link": "نسخ الرابط",
    "Link copied": "تم نسخ الرابط",
    "Photo Gallery": "معرض الصور",
    "Traveled on": "تاريخ الرحلة",
    "Destination": "الوجهة",
    "Destinations": "الوجهات",
    "Language": "اللغة",
    "Home": "الرئيسية",
    "About": "عن المدونة",
    "Contact": "اتصل بنا",
    "Gallery": "المعرض",
    "Map": "خريطة",
    "Search": "بحث",
    "Category": "الفئة",
    "Categories": "الفئات",
    "Tags": "الوسوم",
    "Trekking": "المشي الجبلي",
    "Motorcycle": "دراجات نارية",
    "Overland": "رحلات برية",
    "Culture": "الثقافة",
    "Photography": "التصوير",
    "Guides": "أدلة",
    "Tips": "نصائح",
    "Gear": "المعدات",
    "Close": "إغلاق",
    "Next": "التالي",
    "Previous": "السابق",
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
    "Sponsored": "برعاية",
    "Advertisement": "إعلان",
    "Explore": "استكشف",
    "Previous photo": "الصورة السابقة",
    "Next photo": "الصورة التالية",
    "Stories from the high places": "قصص من الأماكن المرتفعة",
    "Most people only fly over.": "معظم الناس يطيرون فقط.",
    "Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world's wildest borders.": "رحلات استكشافية فردية ورحلات بالدراجات النارية ومذكرات الرحلات من باكستان وكاراكورام وأعنف حدود العالم.",
    "Solo · Slow · Cinematic": "منفرد · بطيء · سينمائي",
    "Read the stories": "اقرأ القصص",
    "Explore destinations": "استكشاف الوجهات",
    "Featured Expeditions": "الرحلات الاستكشافية المميزة",
    "Handpicked long-form stories and remote trail guides.": "قصص طويلة منتقاة بعناية وأدلة درب عن بعد.",
    "All expeditions": "جميع البعثات",
    "Fresh dispatches from the high passes, trails, and solitary highways.": "رسائل جديدة من الممرات العالية والممرات والطرق السريعة المنعزلة.",
    "View all stories": "عرض جميع القصص",
    "Explore Topics": "استكشاف المواضيع",
    "Deep dives and curated journeys into the wild — each backed by published stories and route guides.": "غوص عميق ورحلات منظمة إلى البرية - كل منها مدعوم بقصص منشورة وأدلة طريق.",
    "All topics": "جميع المواضيع",
    "By the numbers": "بالأرقام",
    "Journey in numbers": "رحلة في أرقام",
    "A quiet tally of countries crossed, trips ridden and photographs made along the way.": "سجل هادئ للبلدان التي عبرتها، والرحلات التي تم قطعها، والصور الفوتوغرافية التي تم التقاطها على طول الطريق.",
    "Countries Visited": "الدول التي تمت زيارتها",
    "Solo Motorcycle Trips": "رحلات الدراجات النارية المنفردة",
    "Photos Captured": "الصور الملتقطة",
    "Kilometres Traveled": "الكيلومترات المقطوعة",
    "Field Notes & Photography": "الملاحظات الميدانية والتصوير الفوتوغرافي",
    "Visual Journal": "المجلة المرئية",
    "Moments captured in silence above 4,000 metres across the Karakoram and Himalaya.": "لحظات تم التقاطها في صمت فوق 4000 متر عبر كاراكورام والهيمالايا.",
    "Full gallery": "معرض كامل",
    "Where to Go": "أين تذهب",
    "Iconic base camps, alpine valleys, and high-altitude highways.": "معسكرات القاعدة الشهيرة والوديان الألبية والطرق السريعة على ارتفاعات عالية.",
    "All destinations": "جميع الوجهات",
    "Join the Journey": "انضم إلى الرحلة",
    "Get the next dispatch": "الحصول على الإرسالية القادمة",
    "One email when a new expedition story drops. No spam, no algorithm noise.": "بريد إلكتروني واحد عند ظهور قصة رحلة استكشافية جديدة. لا البريد العشوائي، لا ضجيج الخوارزمية.",
    "Read full story": "قراءة القصة كاملة",
    "Explore Topic": "استكشاف الموضوع",
    "Spotlight": "تسليط الضوء",
    "Recent destination": "الوجهة الأخيرة",
    "Latest trip": "آخر رحلة",
    "Longest journey": "أطول رحلة",
    "Trending": "تتجه",
    "Curated": "برعاية",
    "Journeys": "الرحلات",
    "Grid": "الشبكة",
    "View destinations as map or grid": "عرض الوجهات كخريطة أو شبكة"
  },
  "ur": {
    "The Journal": "سفر نامہ",
    "Stories from the road, the trail, and the saddle.": "سڑک، پگڈنڈی اور موٹر سائیکل کی سیٹ سے کہانیاں۔",
    "Search stories…": "کہانیاں تلاش کریں…",
    "All": "تمام",
    "No stories match that filter yet.": "اس فلٹر سے مطابقت رکھتی ہوئی کوئی کہانی نہیں ہے۔",
    "story": "کہانی",
    "stories": "کہانیاں",
    "published so far.": "اب تک شائع ہو چکی ہیں۔",
    "Stories": "کہانیاں",
    "min read": "منٹ کا مطالعہ",
    "Keep reading": "مزید پڑھیں",
    "Story not found": "کہانی نہیں ملی",
    "This trail has been moved or doesn't exist.": "یہ راستہ منتقل کر دیا گیا ہے یا موجود نہیں ہے۔",
    "Back to all stories": "تمام کہانیوں پر واپس جائیں",
    "Reviews & Comments": "تجزیے اور تبصرے",
    "rating": "درجہ بندی",
    "ratings": "درجہ بندیاں",
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
    "Share": "شیئر کریں",
    "Facebook": "فیس بک",
    "LinkedIn": "لنکڈ ان",
    "Copy link": "لنک کاپی کریں",
    "Link copied": "لنک کاپی ہو گیا",
    "Photo Gallery": "تصاویری گیلری",
    "Traveled on": "سفر کی تاریخ",
    "Destination": "منزل",
    "Destinations": "منازل",
    "Language": "زبان",
    "Home": "ہوم",
    "About": "ہمارے بارے میں",
    "Contact": "رابطہ کریں",
    "Gallery": "گیلری",
    "Map": "نقشہ",
    "Search": "تلاش",
    "Category": "زمرہ",
    "Categories": "زمرہ جات",
    "Tags": "ٹیگز",
    "Trekking": "ٹریکنگ",
    "Motorcycle": "موٹر سائیکل",
    "Overland": "زمینی سفر",
    "Culture": "ثقافت",
    "Photography": "عکاسی",
    "Guides": "رہنما",
    "Tips": "مشورے",
    "Gear": "سامان",
    "Close": "بند کریں",
    "Next": "اگلا",
    "Previous": "پچھلا",
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
    "Sponsored": "اسپانسر شدہ",
    "Advertisement": "اشتہار",
    "Explore": "دریافت کریں",
    "Previous photo": "پچھلی تصویر",
    "Next photo": "اگلی تصویر",
    "Stories from the high places": "اونچی جگہوں سے کہانیاں",
    "Most people only fly over.": "زیادہ تر لوگ صرف اڑتے ہیں۔",
    "Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world's wildest borders.": "پاکستان، قراقرم اور دنیا کی جنگلی سرحدوں سے سولو مہمات، موٹر سائیکل کے سفر اور ٹریکنگ ڈائری۔",
    "Solo · Slow · Cinematic": "سولو · سست · سنیما",
    "Read the stories": "کہانیاں پڑھیں",
    "Explore destinations": "منزلیں دریافت کریں۔",
    "Featured Expeditions": "نمایاں مہمات",
    "Handpicked long-form stories and remote trail guides.": "ہاتھ سے چنی ہوئی لمبی شکل کی کہانیاں اور دور دراز کے گائیڈز۔",
    "All expeditions": "تمام مہمات",
    "Fresh dispatches from the high passes, trails, and solitary highways.": "ہائی پاسز، پگڈنڈیوں، اور تنہا شاہراہوں سے تازہ ترسیل۔",
    "View all stories": "تمام کہانیاں دیکھیں",
    "Explore Topics": "عنوانات دریافت کریں۔",
    "Deep dives and curated journeys into the wild — each backed by published stories and route guides.": "جنگل میں گہرے غوطے اور تیار شدہ سفر — ہر ایک کو شائع شدہ کہانیوں اور روٹ گائیڈز کی حمایت حاصل ہے۔",
    "All topics": "تمام موضوعات",
    "By the numbers": "نمبروں سے",
    "Journey in numbers": "تعداد میں سفر",
    "A quiet tally of countries crossed, trips ridden and photographs made along the way.": "گزرے ہوئے ممالک، سفروں اور راستے میں بنائی گئی تصاویر کی ایک خاموش تعداد۔",
    "Countries Visited": "ممالک کا دورہ کیا۔",
    "Solo Motorcycle Trips": "سولو موٹر سائیکل ٹرپس",
    "Photos Captured": "تصاویر کھینچی گئیں۔",
    "Kilometres Traveled": "کلومیٹر کا سفر کیا۔",
    "Field Notes & Photography": "فیلڈ نوٹس اور فوٹوگرافی۔",
    "Visual Journal": "بصری جرنل",
    "Moments captured in silence above 4,000 metres across the Karakoram and Himalaya.": "قراقرم اور ہمالیہ کے پار 4,000 میٹر سے اوپر خاموشی میں قید لمحات۔",
    "Full gallery": "مکمل گیلری",
    "Where to Go": "کہاں جانا ہے۔",
    "Iconic base camps, alpine valleys, and high-altitude highways.": "مشہور بیس کیمپ، الپائن وادیاں، اور اونچائی والی شاہراہیں۔",
    "All destinations": "تمام منزلیں",
    "Join the Journey": "سفر میں شامل ہوں۔",
    "Get the next dispatch": "اگلی ڈسپیچ حاصل کریں۔",
    "One email when a new expedition story drops. No spam, no algorithm noise.": "ایک ای میل جب ایک نئی مہم کی کہانی گرتی ہے۔ کوئی سپیم، کوئی الگورتھم شور نہیں۔",
    "Read full story": "مکمل کہانی پڑھیں",
    "Explore Topic": "موضوع دریافت کریں۔",
    "Spotlight": "اسپاٹ لائٹ",
    "Recent destination": "حالیہ منزل",
    "Latest trip": "تازہ ترین سفر",
    "Longest journey": "طویل ترین سفر",
    "Trending": "ٹرینڈنگ",
    "Curated": "کیوریٹڈ",
    "Journeys": "سفر",
    "Grid": "گرڈ",
    "View destinations as map or grid": "مقامات کو نقشہ یا گرڈ کے بطور دیکھیں"
  }
};
const LEGAL_DICTIONARY = {
  "id": {
    "Privacy Policy": "Kebijakan Privasi",
    "Disclaimer": "Penafian",
    "Legal": "Hukum",
    "Legal Pages": "Halaman Hukum",
    "Terms & Conditions": "Syarat & Ketentuan",
    "Last updated: August 2026": "Terakhir diperbarui: Agustus 2026",
    "All stories made on the move.": "Semua cerita dibuat saat bepergian.",
    "Built for solo travellers, by a solo traveller.": "Dibuat untuk pelancong solo, oleh pelancong solo.",
    "1. Information We Collect": "1. Informasi yang Kami Kumpulkan",
    "2. How We Use Your Information": "2. Cara Kami Menggunakan Informasi Anda",
    "3. Cookies": "3. Cookie",
    "4. Third-Party Services": "4. Layanan Pihak Ketiga",
    "5. Data Retention": "5. Retensi Data",
    "6. Your Rights": "6. Hak-Hak Anda",
    "7. Changes to This Policy": "7. Perubahan pada Kebijakan Ini",
    "8. Contact Us": "8. Hubungi Kami",
    "General Information": "Informasi Umum",
    "Travel Advice": "Saran Perjalanan",
    "External Links": "Tautan Eksternal",
    "Professional Advice": "Saran Profesional",
    "Photos and Media": "Foto dan Media",
    "Consent": "Persetujuan"
  },
  "ms": {
    "Privacy Policy": "Dasar Privasi",
    "Disclaimer": "Penafian",
    "Legal": "Undang-undang",
    "Legal Pages": "Halaman Undang-undang",
    "Terms & Conditions": "Terma & Syarat",
    "Last updated: August 2026": "Kemas kini terakhir: Ogos 2026",
    "All stories made on the move.": "Semua cerita dibuat semasa dalam perjalanan.",
    "Built for solo travellers, by a solo traveller.": "Dibina untuk pengembara solo, oleh pengembara solo.",
    "1. Information We Collect": "1. Maklumat yang Kami Kumpul",
    "2. How We Use Your Information": "2. Cara Kami Menggunakan Maklumat Anda",
    "3. Cookies": "3. Kuki",
    "4. Third-Party Services": "4. Perkhidmatan Pihak Ketiga",
    "5. Data Retention": "5. Pengekalan Data",
    "6. Your Rights": "6. Hak Anda",
    "7. Changes to This Policy": "7. Perubahan kepada Dasar Ini",
    "8. Contact Us": "8. Hubungi Kami",
    "General Information": "Maklumat Umum",
    "Travel Advice": "Nasihat Perjalanan",
    "External Links": "Pautan Luar",
    "Professional Advice": "Nasihat Profesional",
    "Photos and Media": "Foto dan Media",
    "Consent": "Persetujuan"
  },
  "es": {
    "Privacy Policy": "Política de Privacidad",
    "Disclaimer": "Descargo de Responsabilidad",
    "Legal": "Legal",
    "Legal Pages": "Páginas Legales",
    "Terms & Conditions": "Términos y Condiciones",
    "Last updated: August 2026": "Última actualización: agosto de 2026",
    "All stories made on the move.": "Todas las historias hechas en movimiento.",
    "Built for solo travellers, by a solo traveller.": "Creado para viajeros solitarios, por un viajero solitario.",
    "1. Information We Collect": "1. Información que recopilamos",
    "2. How We Use Your Information": "2. Cómo utilizamos su información",
    "3. Cookies": "3. Cookies",
    "4. Third-Party Services": "4. Servicios de terceros",
    "5. Data Retention": "5. Retención de datos",
    "6. Your Rights": "6. Sus derechos",
    "7. Changes to This Policy": "7. Cambios en esta política",
    "8. Contact Us": "8. Contáctenos",
    "General Information": "Información general",
    "Travel Advice": "Consejos de viaje",
    "External Links": "Enlaces externos",
    "Professional Advice": "Asesoramiento profesional",
    "Photos and Media": "Fotos y medios",
    "Consent": "Consentimiento"
  },
  "fr": {
    "Privacy Policy": "Politique de Confidentialité",
    "Disclaimer": "Avis de Non-responsabilité",
    "Legal": "Mentions Légales",
    "Legal Pages": "Pages Légales",
    "Terms & Conditions": "Conditions Générales",
    "Last updated: August 2026": "Dernière mise à jour : août 2026",
    "All stories made on the move.": "Toutes les histoires vécues en voyage.",
    "Built for solo travellers, by a solo traveller.": "Créé pour les voyageurs solitaires, par un voyageur solitaire.",
    "1. Information We Collect": "1. Informations que nous collectons",
    "2. How We Use Your Information": "2. Comment nous utilisons vos informations",
    "3. Cookies": "3. Cookies",
    "4. Third-Party Services": "4. Services tiers",
    "5. Data Retention": "5. Conservation des données",
    "6. Your Rights": "6. Vos droits",
    "7. Changes to This Policy": "7. Modifications apportées à cette politique",
    "8. Contact Us": "8. Contactez-nous",
    "General Information": "Informations générales",
    "Travel Advice": "Conseils aux voyageurs",
    "External Links": "Liens externes",
    "Professional Advice": "Conseils professionnels",
    "Photos and Media": "Photos et médias",
    "Consent": "Consentement"
  },
  "pt": {
    "Privacy Policy": "Política de Privacidade",
    "Disclaimer": "Isenção de Responsabilidade",
    "Legal": "Legal",
    "Legal Pages": "Páginas Legais",
    "Terms & Conditions": "Termos e Condições",
    "Last updated: August 2026": "Última atualização: agosto de 2026",
    "All stories made on the move.": "Todas as histórias feitas em movimento.",
    "Built for solo travellers, by a solo traveller.": "Criado para viajantes solo, por um viajante solo.",
    "1. Information We Collect": "1. Informações que coletamos",
    "2. How We Use Your Information": "2. Como usamos suas informações",
    "3. Cookies": "3. Cookies",
    "4. Third-Party Services": "4. Serviços de terceiros",
    "5. Data Retention": "5. Retenção de dados",
    "6. Your Rights": "6. Seus direitos",
    "7. Changes to This Policy": "7. Alterações nesta política",
    "8. Contact Us": "8. Fale conosco",
    "General Information": "Informações gerais",
    "Travel Advice": "Dicas de viagem",
    "External Links": "Links externos",
    "Professional Advice": "Aconselhamento profissional",
    "Photos and Media": "Fotos e mídia",
    "Consent": "Consentimento"
  },
  "no": {
    "Privacy Policy": "Personvernerklæring",
    "Disclaimer": "Ansvarsfraskrivelse",
    "Legal": "Juridisk",
    "Legal Pages": "Juridiske Sider",
    "Terms & Conditions": "Vilkår og betingelser",
    "Last updated: August 2026": "Sist oppdatert: august 2026",
    "All stories made on the move.": "Alle historier skapt på farten.",
    "Built for solo travellers, by a solo traveller.": "Laget for soloreisende, av en soloreisende.",
    "1. Information We Collect": "1. Informasjon vi samler inn",
    "2. How We Use Your Information": "2. Hvordan vi bruker informasjonen din",
    "3. Cookies": "3. Informasjonskapsler",
    "4. Third-Party Services": "4. Tredjepartstjenester",
    "5. Data Retention": "5. Datalagring",
    "6. Your Rights": "6. Dine rettigheter",
    "7. Changes to This Policy": "7. Endringer i denne erklæringen",
    "8. Contact Us": "8. Kontakt oss",
    "General Information": "Generell informasjon",
    "Travel Advice": "Reiseråd",
    "External Links": "Eksterne lenker",
    "Professional Advice": "Faglige råd",
    "Photos and Media": "Bilder og media",
    "Consent": "Samtykke"
  },
  "tr": {
    "Privacy Policy": "Gizlilik Politikası",
    "Disclaimer": "Sorumluluk Reddi",
    "Legal": "Yasal",
    "Legal Pages": "Yasal Sayfalar",
    "Terms & Conditions": "Şartlar ve Koşullar",
    "Last updated: August 2026": "Son güncelleme: Ağustos 2026",
    "All stories made on the move.": "Yoldayken yazılan tüm hikayeler.",
    "Built for solo travellers, by a solo traveller.": "Yalnız seyahat edenler için, yalnız bir gezgin tarafından yapıldı.",
    "1. Information We Collect": "1. Topladığımız Bilgiler",
    "2. How We Use Your Information": "2. Bilgilerinizi Nasıl Kullanıyoruz",
    "3. Cookies": "3. Çerezler",
    "4. Third-Party Services": "4. Üçüncü Taraf Hizmetleri",
    "5. Data Retention": "5. Veri Saklama",
    "6. Your Rights": "6. Haklarınız",
    "7. Changes to This Policy": "7. Bu Politikadaki Değişiklikler",
    "8. Contact Us": "8. Bize Ulaşın",
    "General Information": "Genel Bilgiler",
    "Travel Advice": "Seyahat Tavsiyeleri",
    "External Links": "Harici Bağlantılar",
    "Professional Advice": "Profesyonel Tavsiye",
    "Photos and Media": "Fotoğraflar ve Medya",
    "Consent": "Rıza"
  },
  "ko": {
    "Privacy Policy": "개인정보 처리방침",
    "Disclaimer": "면책 조항",
    "Legal": "법적 고지",
    "Legal Pages": "법적 페이지",
    "Terms & Conditions": "이용 약관",
    "Last updated: August 2026": "최종 업데이트: 2026년 8월",
    "All stories made on the move.": "이동 중에 만들어진 모든 이야기.",
    "Built for solo travellers, by a solo traveller.": "나홀로 여행자를 위해, 나홀로 여행자가 만들었습니다.",
    "1. Information We Collect": "1. 당사가 수집하는 정보",
    "2. How We Use Your Information": "2. 정보 사용 방법",
    "3. Cookies": "3. 쿠키",
    "4. Third-Party Services": "4. 제3자 서비스",
    "5. Data Retention": "5. 데이터 보관",
    "6. Your Rights": "6. 귀하의 권리",
    "7. Changes to This Policy": "7. 정책 변경 사항",
    "8. Contact Us": "8. 문의하기",
    "General Information": "일반 정보",
    "Travel Advice": "여행 조언",
    "External Links": "외부 링크",
    "Professional Advice": "전문가 조언",
    "Photos and Media": "사진 및 미디어",
    "Consent": "동의"
  },
  "zh": {
    "Privacy Policy": "隐私政策",
    "Disclaimer": "免责声明",
    "Legal": "法律条款",
    "Legal Pages": "法律页面",
    "Terms & Conditions": "条款与条件",
    "Last updated: August 2026": "最后更新：2026年8月",
    "All stories made on the move.": "在旅途中书写的所有故事。",
    "Built for solo travellers, by a solo traveller.": "专为独自旅行者打造，源自独自旅行者。",
    "1. Information We Collect": "1. 我们收集的信息",
    "2. How We Use Your Information": "2. 我们如何使用您的信息",
    "3. Cookies": "3. Cookie",
    "4. Third-Party Services": "4. 第三方服务",
    "5. Data Retention": "5. 数据保留",
    "6. Your Rights": "6. 您的权利",
    "7. Changes to This Policy": "7. 本政策的变更",
    "8. Contact Us": "8. 联系我们",
    "General Information": "一般信息",
    "Travel Advice": "旅行建议",
    "External Links": "外部链接",
    "Professional Advice": "专业建议",
    "Photos and Media": "照片与媒体",
    "Consent": "同意"
  },
  "ja": {
    "Privacy Policy": "プライバシーポリシー",
    "Disclaimer": "免責事項",
    "Legal": "法的情報",
    "Legal Pages": "法的ページ",
    "Terms & Conditions": "利用規約",
    "Last updated: August 2026": "最終更新日: 2026年8月",
    "All stories made on the move.": "旅の途中で生まれたすべての物語。",
    "Built for solo travellers, by a solo traveller.": "一人旅をする人のために、一人旅の旅人が制作。",
    "1. Information We Collect": "1. 収集する情報",
    "2. How We Use Your Information": "2. 情報の利用目的",
    "3. Cookies": "3. クッキー",
    "4. Third-Party Services": "4. サードパーティサービス",
    "5. Data Retention": "5. データ保持",
    "6. Your Rights": "6. お客様の権利",
    "7. Changes to This Policy": "7. 本方針の変更",
    "8. Contact Us": "8. お問い合わせ",
    "General Information": "一般情報",
    "Travel Advice": "旅行のアドバイス",
    "External Links": "外部リンク",
    "Professional Advice": "専門的な助言",
    "Photos and Media": "写真とメディア",
    "Consent": "同意"
  },
  "fa": {
    "Privacy Policy": "سیاست حفظ حریم خصوصی",
    "Disclaimer": "سلب مسئولیت",
    "Legal": "حقوقی",
    "Legal Pages": "صفحات قانونی",
    "Terms & Conditions": "شرایط و ضوابط",
    "Last updated: August 2026": "آخرین به‌روزرسانی: اوت ۲۰۲۶",
    "All stories made on the move.": "تمام داستان‌ها در سفر ساخته شده‌اند.",
    "Built for solo travellers, by a solo traveller.": "ساخته شده برای مسافران تنها، توسط یک مسافر تنها.",
    "1. Information We Collect": "۱. اطلاعاتی که جمع‌آوری می‌کنیم",
    "2. How We Use Your Information": "۲. نحوه استفاده از اطلاعات شما",
    "3. Cookies": "۳. کوکی‌ها",
    "4. Third-Party Services": "۴. خدمات شخص ثالث",
    "5. Data Retention": "۵. نگهداری داده‌ها",
    "6. Your Rights": "۶. حقوق شما",
    "7. Changes to This Policy": "۷. تغییرات در این سیاست",
    "8. Contact Us": "۸. تماس با ما",
    "General Information": "اطلاعات عمومی",
    "Travel Advice": "توصیه‌های سفر",
    "External Links": "پیوندهای خارجی",
    "Professional Advice": "توصیه حرفه‌ای",
    "Photos and Media": "عکس‌ها و رسانه‌ها",
    "Consent": "رضایت"
  },
  "ar": {
    "Privacy Policy": "سياسة الخصوصية",
    "Disclaimer": "إخلاء المسؤولية",
    "Legal": "قانوني",
    "Legal Pages": "الصفحات القانونية",
    "Terms & Conditions": "الشروط والأحكام",
    "Last updated: August 2026": "آخر تحديث: أغسطس 2026",
    "All stories made on the move.": "جميع القصص تم صنعها أثناء التنقل.",
    "Built for solo travellers, by a solo traveller.": "صُمم للمسافرين المنفردين، بواسطة مسافر منفرد.",
    "1. Information We Collect": "1. المعلومات التي نجمعها",
    "2. How We Use Your Information": "2. كيف نستخدم معلوماتك",
    "3. Cookies": "3. ملفات تعريف الارتباط",
    "4. Third-Party Services": "4. خدمات الطرف الثالث",
    "5. Data Retention": "5. الاحتفاظ بالبيانات",
    "6. Your Rights": "6. حقوقك",
    "7. Changes to This Policy": "7. التغييرات في هذه السياسة",
    "8. Contact Us": "8. اتصل بنا",
    "General Information": "معلومات عامة",
    "Travel Advice": "نصائح السفر",
    "External Links": "روابط خارجية",
    "Professional Advice": "مشورة مهنية",
    "Photos and Media": "الصور والوسائط",
    "Consent": "الموافقة"
  },
  "ur": {
    "Privacy Policy": "رازداری کی پالیسی",
    "Disclaimer": "دستبرداری",
    "Legal": "قانونی",
    "Legal Pages": "قانونی صفحات",
    "Terms & Conditions": "شرائط و ضوابط",
    "Last updated: August 2026": "آخری تازہ کاری: اگست 2026",
    "All stories made on the move.": "راستے میں بنی تمام کہانیاں۔",
    "Built for solo travellers, by a solo traveller.": "تنہا مسافروں کے لیے، ایک تنہا مسافر کا بنایا ہوا۔",
    "1. Information We Collect": "1. وہ معلومات جو ہم جمع کرتے ہیں",
    "2. How We Use Your Information": "2. ہم آپ کی معلومات کیسے استعمال کرتے ہیں",
    "3. Cookies": "3. کوکیز",
    "4. Third-Party Services": "4. تیسرے فریق کی خدمات",
    "5. Data Retention": "5. ڈیٹا کا برقرار رکھنا",
    "6. Your Rights": "6. آپ کے حقوق",
    "7. Changes to This Policy": "7. اس پالیسی میں تبدیلیاں",
    "8. Contact Us": "8. ہم سے رابطہ کریں",
    "General Information": "عام معلومات",
    "Travel Advice": "سفری مشورے",
    "External Links": "بیرونی روابط",
    "Professional Advice": "پیشہ ورانہ مشورہ",
    "Photos and Media": "تصاویر اور میڈیا",
    "Consent": "رضامندی"
  }
};
function getDictionaryTranslation(lang, text) {
  if (!lang || lang === "en" || !text) return null;
  const legal = LEGAL_DICTIONARY[lang]?.[text];
  if (legal) return legal;
  const dict = UI_DICTIONARY[lang];
  if (!dict) return null;
  return dict[text] ?? null;
}
const translateTexts = createServerFn({
  method: "POST"
}).validator((input) => objectType({
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
    const legal = LEGAL_DICTIONARY[targetLang];
    if (legal) {
      for (const [text, value] of Object.entries(legal)) {
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
        }, 50);
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
        const batchCache = {};
        keys.forEach((k) => {
          const idx = k.indexOf("");
          const text = k.slice(idx + 1);
          const trimmed = text.trim();
          const value = result[text] || result[trimmed];
          if (value) {
            resolved.set(k, value);
            resolved.set(ctxKey(targetLang, trimmed), value);
            batchCache[text] = value;
            batchCache[trimmed] = value;
          }
        });
        setCachedBatch(targetLang, batchCache);
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
    for (const rawText of texts) {
      if (!rawText) continue;
      const text = rawText.trim();
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
    const trimmed = text.trim();
    const k = ctxKey(targetLang, text);
    const kTrimmed = ctxKey(targetLang, trimmed);
    const v = resolved.get(k) ?? resolved.get(kTrimmed);
    if (v) return v;
    const dictValue = getDictionaryTranslation(targetLang, text) ?? getDictionaryTranslation(targetLang, trimmed);
    if (dictValue) {
      resolved.set(k, dictValue);
      resolved.set(kTrimmed, dictValue);
      return dictValue;
    }
    const cached = getCached(targetLang, text) ?? getCached(targetLang, trimmed);
    if (cached) {
      resolved.set(k, cached);
      resolved.set(kTrimmed, cached);
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
const logoPath = "/assets/ndsolo-travel-logo-DrOVnHMo.png";
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
const subscribe = createServerFn({
  method: "POST"
}).validator((input) => {
  const raw = input && typeof input === "object" && "data" in input ? input.data : input;
  const record = raw && typeof raw === "object" ? raw : {};
  const email = typeof record.email === "string" ? record.email.trim() : "";
  const sessionId = typeof record.sessionId === "string" ? record.sessionId.trim() : "";
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
}).middleware([requireSupabaseAuth]).validator((input) => {
  const raw = input && typeof input === "object" && "data" in input ? input.data : input;
  return objectType({
    id: stringType().uuid(),
    status: enumType(["active", "unsubscribed"])
  }).parse(raw);
}).handler(createSsrRpc("36147828ec7f00cb3fa62463e9b7c81359c52057f31406b51e60ec2e09cd0023"));
const adminDeleteSubscriber = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((input) => {
  const raw = input && typeof input === "object" && "data" in input ? input.data : input;
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
}).validator((input) => {
  const raw = input && typeof input === "object" && "data" in input ? input.data : input;
  const record = raw && typeof raw === "object" ? raw : {};
  const payload = {
    name: typeof record.name === "string" ? record.name.trim() : "",
    email: typeof record.email === "string" ? record.email.trim() : "",
    subject: typeof record.subject === "string" ? record.subject.trim() : "",
    message: typeof record.message === "string" ? record.message.trim() : "",
    website: typeof record.website === "string" ? record.website.trim() : ""
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
}).validator((input) => objectType({
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
}).middleware([requireSupabaseAuth]).validator((input) => objectType({
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
const COOKIE_CONSENT_KEY = "ndsolo_cookie_consent";
const COOKIE_CONSENT_DISMISSED_KEY = "ndsolo_cookie_consent_dismissed";
const COOKIE_CONSENT_DATE_KEY = "ndsolo_cookie_consent_date";
function getCookieConsent() {
  if (typeof window === "undefined") return null;
  try {
    const val = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (val === "accepted" || val === "rejected") {
      return val;
    }
    return null;
  } catch {
    return null;
  }
}
function isConsentDismissedThisSession() {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(COOKIE_CONSENT_DISMISSED_KEY) === "1";
  } catch {
    return false;
  }
}
function syncGoogleConsentMode(status) {
  if (typeof window === "undefined") return;
  const isGranted = status === "accepted";
  const consentState = isGranted ? "granted" : "denied";
  try {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: consentState,
        ad_storage: consentState,
        ad_user_data: consentState,
        ad_personalization: consentState
      });
    }
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "cookie_consent_update",
        cookie_consent: status
      });
    }
  } catch {
  }
}
function acceptCookies() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    window.localStorage.setItem(COOKIE_CONSENT_DATE_KEY, (/* @__PURE__ */ new Date()).toISOString());
    window.sessionStorage.removeItem(COOKIE_CONSENT_DISMISSED_KEY);
  } catch {
  }
  syncGoogleConsentMode("accepted");
  try {
    window.dispatchEvent(
      new CustomEvent("cookie_consent_updated", { detail: { consent: "accepted" } })
    );
  } catch {
  }
}
function rejectCookies() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    window.localStorage.setItem(COOKIE_CONSENT_DATE_KEY, (/* @__PURE__ */ new Date()).toISOString());
    window.sessionStorage.removeItem(COOKIE_CONSENT_DISMISSED_KEY);
  } catch {
  }
  syncGoogleConsentMode("rejected");
  try {
    window.dispatchEvent(
      new CustomEvent("cookie_consent_updated", { detail: { consent: "rejected" } })
    );
  } catch {
  }
}
function dismissCookieForSession() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(COOKIE_CONSENT_DISMISSED_KEY, "1");
  } catch {
  }
  try {
    window.dispatchEvent(
      new CustomEvent("cookie_consent_updated", { detail: { consent: "dismissed_session" } })
    );
  } catch {
  }
}
function openCookieConsentModal() {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent("open_cookie_consent"));
  } catch {
  }
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "relative mt-24 border-t border-border bg-secondary text-secondary-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "aria-hidden": "true",
        className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8", children: [
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap gap-2.5 sm:gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: SITE.socials.instagram,
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "Instagram",
                className: "inline-flex h-9 w-9 items-center justify-center rounded-full text-white transition-transform duration-200 hover:scale-110 hover:ring-2 hover:ring-accent/60 hover:ring-offset-2 hover:ring-offset-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary shrink-0",
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
                className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-200 hover:scale-110 hover:ring-2 hover:ring-accent/60 hover:ring-offset-2 hover:ring-offset-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary shrink-0",
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
                className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FF0000] text-white transition-transform duration-200 hover:scale-110 hover:ring-2 hover:ring-accent/60 hover:ring-offset-2 hover:ring-offset-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary shrink-0",
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
                className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-200 hover:scale-110 hover:ring-2 hover:ring-accent/60 hover:ring-offset-2 hover:ring-offset-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary shrink-0",
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
                className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2] text-white transition-transform duration-200 hover:scale-110 hover:ring-2 hover:ring-accent/60 hover:ring-offset-2 hover:ring-offset-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary shrink-0",
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
                className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0A66C2] text-white transition-transform duration-200 hover:scale-110 hover:ring-2 hover:ring-accent/60 hover:ring-offset-2 hover:ring-offset-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary shrink-0",
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
                className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#E60023] text-white transition-transform duration-200 hover:scale-110 hover:ring-2 hover:ring-accent/60 hover:ring-offset-2 hover:ring-offset-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary shrink-0",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(PinterestIcon, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageSelector, {}) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold uppercase tracking-wider", children: t("Explore") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2 text-sm text-secondary-foreground/70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", className: "transition-colors duration-200 hover:text-accent", children: t("Stories") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/destinations", className: "transition-colors duration-200 hover:text-accent", children: t("Destinations") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/gallery", className: "transition-colors duration-200 hover:text-accent", children: t("Gallery") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "transition-colors duration-200 hover:text-accent", children: t("About") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "transition-colors duration-200 hover:text-accent", children: t("Contact") }) })
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/privacy-policy", className: "hover:text-accent transition-colors", children: t("Privacy Policy") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/disclaimer", className: "hover:text-accent transition-colors", children: t("Disclaimer") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: openCookieConsentModal,
              className: "hover:text-accent transition-colors cursor-pointer",
              children: t("Cookie Preferences")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", "aria-hidden": "true", children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hidden sm:inline", children: t("Built for solo travellers, by a solo traveller.") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sm:hidden", children: t("Built for solo travellers, by a solo traveller.") })
      ] })
    ] })
  ] });
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
const STORAGE_KEY = "ndsolotravel_newsletter_popup";
const SUPPRESS_HOURS = 168;
const TRIGGER_DELAY_MS = 1e4;
const SCROLL_THRESHOLD = 0.5;
function getSuppressedUntil() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const ts = parseInt(raw, 10);
    return isNaN(ts) ? null : ts;
  } catch {
    return null;
  }
}
function suppress() {
  try {
    const until = Date.now() + SUPPRESS_HOURS * 60 * 60 * 1e3;
    localStorage.setItem(STORAGE_KEY, String(until));
  } catch {
  }
}
function isSuppressed() {
  const until = getSuppressedUntil();
  return until !== null && Date.now() < until;
}
function NewsletterPopup() {
  const t = useTranslations();
  const subscribeFn = useServerFn(subscribe);
  const [open, setOpen] = reactExports.useState(false);
  const [email, setEmail] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const dismissedThisSession = reactExports.useRef(false);
  const triggered = reactExports.useRef(false);
  const close = reactExports.useCallback(() => {
    setOpen(false);
    dismiss();
  }, []);
  const dismiss = reactExports.useCallback(() => {
    dismissedThisSession.current = true;
    suppress();
  }, []);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    if (isSuppressed()) return;
    const show = () => {
      if (triggered.current || dismissedThisSession.current) return;
      triggered.current = true;
      setOpen(true);
    };
    const timer = setTimeout(show, TRIGGER_DELAY_MS);
    const onScroll = () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled >= SCROLL_THRESHOLD) {
        show();
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  reactExports.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const sessionId = getVisitorSessionId() ?? "";
      const res = await subscribeFn({ data: { email, sessionId } });
      if (res && (res.created === false || res.alreadySubscribed)) {
        setResult("already");
      } else {
        setResult("success");
      }
      suppress();
    } catch (err) {
      let msg = "Could not subscribe. Try again.";
      if (err instanceof Error && err.message) msg = err.message;
      setError(msg);
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-[110] flex items-center justify-center p-4",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.25 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            onClick: close,
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-border bg-background shadow-2xl",
            initial: { opacity: 0, scale: 0.92, y: 20 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.92, y: 20 },
            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: close,
                  "aria-label": "Close",
                  className: "absolute right-3 top-3 z-20 rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground cursor-pointer",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full bg-gradient-to-r from-accent via-accent/60 to-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pt-6 pb-5 sm:px-8 sm:pt-8", children: result === "success" || result === "already" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center py-4 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { scale: 0 },
                    animate: { scale: 1 },
                    transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.1 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-12 w-12 text-success" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-xl font-bold text-foreground", children: result === "success" ? t("Welcome Aboard!") : t("You're Already Subscribed") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground", children: result === "success" ? t("You'll receive solo travel stories, motorcycle adventures, and trekking diaries in your inbox.") : t("You're already on the journey with us. Keep exploring!") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: close,
                    className: "mt-5 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground hover:opacity-90 transition cursor-pointer",
                    children: t("Close")
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-accent/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-accent" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground", children: t("Join the Journey") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground", children: t(
                  "Get new solo travel stories, motorcycle adventures, trekking diaries, and travel updates delivered to your inbox."
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "mt-5 space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "email",
                        required: true,
                        placeholder: t("Enter your email"),
                        value: email,
                        onChange: (e) => {
                          setEmail(e.target.value);
                          setError(null);
                        },
                        className: "w-full rounded-xl border border-border bg-muted/30 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-accent focus:ring-1 focus:ring-accent/30"
                      }
                    )
                  ] }),
                  error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: error }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "submit",
                      disabled: loading,
                      className: "w-full rounded-xl bg-accent py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90 transition disabled:opacity-50 cursor-pointer",
                      children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground" }),
                        t("Subscribing...")
                      ] }) : t("Join the Journey")
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-center text-[11px] text-muted-foreground/60", children: t("No spam. Unsubscribe anytime.") })
              ] }) })
            ]
          }
        )
      ]
    }
  ) });
}
const DEFAULT_PUBLIC_POPUP_MESSAGE = {
  message: "This site is under construction and testing. Please suggest any UI/UX changes and report errors. Thanks for visiting ‘ndsolotravel’ Blogs.",
  start_at: (/* @__PURE__ */ new Date()).toISOString(),
  end_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3).toISOString(),
  updated_at: (/* @__PURE__ */ new Date()).toISOString()
};
const getActivePublicMessage = createServerFn({
  method: "GET"
}).handler(createSsrRpc("c55211b61bcd27379d4eb12c629034b1d51bbac438d76fce5c618527be342262"));
const adminGetPublicMessage = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("0ac3c0c7e3bd6449b88bf9e9bf78bba822626bc00b1d55fcd99d9ac232885844"));
const adminUpdatePublicMessage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((input) => {
  const raw = input && typeof input === "object" && "data" in input ? input.data : input;
  return objectType({
    title: stringType().trim().default("Site Notice & Feedback"),
    message: stringType().trim().min(1, "Message text cannot be empty"),
    enabled: booleanType().optional(),
    is_enabled: booleanType().optional(),
    start_at: stringType().min(1, "Start Date/Time is required"),
    end_at: stringType().min(1, "End Date/Time is required")
  }).parse(raw);
}).handler(createSsrRpc("b9bc4347398f7d94f2ecaa1859fac61574c8fc3b649c4ea3041ec6b57262cf08"));
function PublicMessagePopup() {
  const getActiveFn = useServerFn(getActivePublicMessage);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdminRoute = pathname.startsWith("/admin");
  const { data: messageData } = useQuery({
    queryKey: ["active-public-message"],
    queryFn: () => getActiveFn(),
    staleTime: 1e3 * 60 * 3,
    // 3 minutes cache
    enabled: !isAdminRoute
  });
  const [isOpen, setIsOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (typeof window === "undefined" || !messageData || isAdminRoute) {
      setIsOpen(false);
      return;
    }
    const storageKey = `ndsolo_popup_dismissed_${messageData.id}_${messageData.updated_at || messageData.message.slice(0, 20)}`;
    try {
      const alreadyDismissed = sessionStorage.getItem(storageKey);
      if (alreadyDismissed === "1") {
        setIsOpen(false);
        return;
      }
    } catch {
    }
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, [messageData, isAdminRoute]);
  const handleClose = reactExports.useCallback(() => {
    if (messageData) {
      const storageKey = `ndsolo_popup_dismissed_${messageData.id}_${messageData.updated_at || messageData.message.slice(0, 20)}`;
      try {
        sessionStorage.setItem(storageKey, "1");
      } catch {
      }
    }
    setIsOpen(false);
  }, [messageData]);
  reactExports.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);
  if (!messageData || isAdminRoute) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "public-message-title",
      className: "fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: { duration: 0.25 },
            onClick: handleClose,
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.94, y: 16 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.94, y: 16 },
            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
            onClick: (e) => e.stopPropagation(),
            className: "relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-border/80 bg-background/95 p-6 shadow-2xl backdrop-blur-md sm:p-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-accent via-accent/70 to-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleClose,
                  "aria-label": "Close message",
                  className: "absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent/15 text-accent shadow-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 pr-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent uppercase tracking-wider", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquareCode, { className: "h-3 w-3" }),
                    " Site Notice & Feedback"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      id: "public-message-title",
                      className: "font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl",
                      children: messageData.title || "Welcome to ndsolotravel"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-2xl border border-border/60 bg-muted/20 p-4 sm:p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-foreground/90 sm:text-base whitespace-pre-line font-normal", children: messageData.message }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/contact",
                    search: { subject: "UI/UX Feedback & Error Report" },
                    onClick: handleClose,
                    className: "inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition cursor-pointer",
                    children: [
                      "Suggest UI/UX / Report Error",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleClose,
                    className: "inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2.5 text-xs font-semibold text-background shadow-xs hover:opacity-90 transition cursor-pointer",
                    children: "Got It"
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  ) });
}
function CookieConsentPopup() {
  const t = useTranslations();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdminRoute = pathname.startsWith("/admin");
  const [isOpen, setIsOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (typeof window === "undefined" || isAdminRoute) {
      setIsOpen(false);
      return;
    }
    const existingConsent = getCookieConsent();
    const isDismissed = isConsentDismissedThisSession();
    if (!existingConsent && !isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [isAdminRoute]);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    const handleOpen = () => {
      setIsOpen(true);
    };
    window.addEventListener("open_cookie_consent", handleOpen);
    return () => window.removeEventListener("open_cookie_consent", handleOpen);
  }, []);
  const handleAccept = reactExports.useCallback(() => {
    acceptCookies();
    setIsOpen(false);
  }, []);
  const handleReject = reactExports.useCallback(() => {
    rejectCookies();
    setIsOpen(false);
  }, []);
  const handleClose = reactExports.useCallback(() => {
    dismissCookieForSession();
    setIsOpen(false);
  }, []);
  reactExports.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, handleClose]);
  if (isAdminRoute) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
    "aside",
    {
      role: "region",
      "aria-label": t("Cookie consent"),
      "aria-describedby": "cookie-consent-description",
      className: "fixed bottom-3 inset-x-3 sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-xl md:max-w-2xl z-[95] pb-[max(0.25rem,env(safe-area-inset-bottom))]",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24, scale: 0.98 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 16, scale: 0.98 },
          transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          className: "relative overflow-hidden rounded-2xl border border-border/80 bg-background/95 dark:bg-card/95 p-4 sm:p-5 shadow-2xl backdrop-blur-md transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-amber-500 to-brand/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleClose,
                "aria-label": t("Close cookie consent for this session"),
                title: t("Close without saving preference (dismiss for session)"),
                className: "absolute right-3.5 top-3.5 rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 sm:gap-3.5 pr-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand shadow-xs dark:bg-brand/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Cookie, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm sm:text-base font-bold tracking-tight text-foreground", children: t("We value your privacy") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    id: "cookie-consent-description",
                    className: "text-xs sm:text-sm leading-relaxed text-muted-foreground",
                    children: [
                      t(
                        "We use cookies to improve user experience, website functionality, analytics, and performance. You can accept all cookies, reject non-essential cookies, or close this notice to decide later."
                      ),
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Link,
                        {
                          to: "/privacy-policy",
                          className: "inline-block text-brand font-medium underline underline-offset-2 hover:opacity-80 transition-opacity",
                          children: t("Privacy Policy")
                        }
                      )
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center justify-between sm:justify-end gap-2 pt-2 border-t border-border/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleClose,
                  title: t("Close without choosing (dismiss for this session)"),
                  className: "rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer",
                  children: t("Close")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleReject,
                    title: t("Reject non-essential cookies and remember choice"),
                    className: "rounded-full border border-border bg-background hover:bg-muted text-foreground px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer shadow-xs",
                    children: t("Reject")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleAccept,
                    title: t("Accept all cookies and remember choice"),
                    className: "rounded-full bg-brand text-brand-foreground hover:bg-brand/90 px-4.5 py-1.5 text-xs sm:text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer shadow-sm hover:shadow",
                    children: t("Accept")
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  ) });
}
function ReadingProgressBar() {
  const barRef = reactExports.useRef(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    let ticking = false;
    let currentProgress = 0;
    let isVisible = false;
    const updateProgress = () => {
      ticking = false;
      const el = barRef.current;
      if (!el) return;
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.offsetHeight,
        document.body.offsetHeight
      );
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const scrollable = docHeight - viewportHeight;
      if (scrollable <= 15) {
        if (isVisible) {
          el.style.opacity = "0";
          isVisible = false;
        }
        return;
      }
      if (!isVisible) {
        el.style.opacity = "1";
        isVisible = true;
      }
      const scrollTop = Math.max(
        window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0,
        0
      );
      const progress = Math.min(Math.max(scrollTop / scrollable, 0), 1);
      if (Math.abs(progress - currentProgress) > 5e-4 || progress === 0 || progress === 1) {
        currentProgress = progress;
        el.style.transform = `scaleX(${progress})`;
      }
    };
    const requestUpdate = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateProgress);
      }
    };
    if (barRef.current) {
      barRef.current.style.transform = "scaleX(0)";
      currentProgress = 0;
    }
    const initialTimer = setTimeout(updateProgress, 50);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    let resizeObserver = null;
    if (typeof ResizeObserver !== "undefined" && document.body) {
      resizeObserver = new ResizeObserver(() => {
        requestUpdate();
      });
      resizeObserver.observe(document.body);
      if (document.documentElement) {
        resizeObserver.observe(document.documentElement);
      }
    }
    return () => {
      clearTimeout(initialTimer);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [pathname]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-x-0 top-0 z-[60] h-[3px] w-full pointer-events-none overflow-hidden",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref: barRef,
          className: "h-full w-full bg-gradient-to-r from-accent via-accent to-[#FFA040] shadow-[0_0_8px_rgba(255,122,0,0.6)] origin-left will-change-transform",
          style: {
            transform: "scaleX(0)",
            opacity: 0,
            transition: "transform 75ms ease-out, opacity 250ms ease-out"
          }
        }
      )
    }
  );
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
const Route$D = createRootRouteWithContext()({
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
      { name: "theme-color", content: "#0F172A" },
      { name: "referrer", content: "strict-origin-when-cross-origin" }
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
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap"
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScriptOnce, { children: `(()=>{try{const t=localStorage.getItem('theme');const d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');}catch(e){}})()` }),
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$D.useRouteContext();
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
  const isAdmin = pathname.startsWith("/admin");
  const shellClass = isAdmin ? "flex min-h-screen flex-col md:h-dvh md:overflow-hidden" : "flex min-h-screen flex-col overflow-x-clip";
  const mainClass = `flex-1 ${isHome ? "" : "pt-16"} ${isAdmin ? "md:min-h-0 md:overflow-y-auto md:overflow-x-hidden" : ""}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TranslationProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ReadingProgressBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: shellClass, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: mainClass, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
      !isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center", richColors: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollToTop, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewsletterPopup, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PublicMessagePopup, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CookieConsentPopup, {}),
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
}).validator((input) => objectType({
  category: stringType().optional(),
  categories: arrayType(stringType()).optional(),
  tag: stringType().optional(),
  destination: stringType().optional(),
  search: stringType().optional(),
  limit: numberType().min(1).max(50).default(24),
  offset: numberType().min(0).default(0),
  featuredOnly: booleanType().optional(),
  sort: enumType(["latest", "popular"]).default("latest"),
  sinceDays: numberType().min(1).max(365).optional()
}).parse(input ?? {})).handler(createSsrRpc("11a3e5221d8be21b9fdddebef660f538b92679319c39b4d5a1df7f1408533287"));
const getPostBySlug = createServerFn({
  method: "GET"
}).validator((input) => objectType({
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
}).validator((input) => objectType({
  slug: stringType()
}).parse(input)).handler(createSsrRpc("42d8c5a0f2ac4a51b2ee36862863046dc42ef21708bdbe47e53e1eb60378f141"));
function slugify(text) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const listCategories = createServerFn({
  method: "GET"
}).handler(createSsrRpc("11f09a767096a7c8056f64f933b9d4604fa74357d694e1436af5782976dc3b74"));
const getCategoryBySlug = createServerFn({
  method: "GET"
}).validator((input) => objectType({
  slug: stringType().min(1)
}).parse(input)).handler(createSsrRpc("36c6a4e76a76bf4a189af9bbed4e4d6439e9a4acdb9c4f52ab791b173a03cbe1"));
const adminListCategories = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("85dbbed3f83f5c7974101e536e5abd4a20f4781da47096aacd133095d93fc1f1"));
const adminUpsertCategory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((input) => objectType({
  id: stringType().optional(),
  name: stringType().min(1, "Category name is required").max(100),
  slug: stringType().max(100).optional(),
  description: stringType().max(500).optional().nullable(),
  image_url: stringType().optional().nullable(),
  status: enumType(["active", "inactive"]).default("active"),
  display_order: numberType().int().default(0),
  seo_title: stringType().max(200).optional().nullable(),
  seo_description: stringType().max(500).optional().nullable()
}).parse(input)).handler(createSsrRpc("4184e107b02cc5d3386f814d73d2a7f40796b5b94d0a73f13fa8faa643f6df33"));
const adminDeleteCategory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((input) => objectType({
  id: stringType().min(1)
}).parse(input)).handler(createSsrRpc("1032c4f50ff9d1b08d12ac5e025fafed9684ba93d59634e544902732947b5f98"));
const BASE_URL = "";
const Route$C = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const posts = await listAllPostSlugs();
        const dests = await listDestinations();
        let categories = [];
        try {
          categories = await listCategories();
        } catch {
        }
        const staticEntries = [
          { path: "/", priority: "1.0", changefreq: "weekly" },
          { path: "/blog", priority: "0.9", changefreq: "daily" },
          { path: "/destinations", priority: "0.8", changefreq: "weekly" },
          { path: "/gallery", priority: "0.7", changefreq: "weekly" },
          { path: "/about", priority: "0.5", changefreq: "monthly" },
          { path: "/contact", priority: "0.4", changefreq: "monthly" },
          { path: "/privacy-policy", priority: "0.3", changefreq: "monthly" },
          { path: "/disclaimer", priority: "0.3", changefreq: "monthly" }
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
        const categoryEntries = categories.filter((c) => (c.post_count ?? 0) > 0).map((c) => ({
          path: `/category/${c.slug}`,
          changefreq: "weekly",
          priority: "0.7"
        }));
        const all = [...staticEntries, ...postEntries, ...destEntries, ...categoryEntries];
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
const DEFAULT_LEGAL_PAGES = {
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    content: `*Last updated: August 2026*

## 1. Information We Collect
When you visit ndsolotravel.com, we may automatically collect certain information about your device, including your web browser, IP address, time zone, and some cookies. We also collect information about how you interact with our site, including pages viewed and links clicked.

If you subscribe to our newsletter, comment on a post, or contact us, we may collect your name, email address, and any information you voluntarily provide.

## 2. How We Use Your Information
We use the information we collect to:
- Operate and maintain the ndsolotravel website
- Send newsletters and updates if you have subscribed
- Respond to your messages and comments
- Improve our content and user experience
- Monitor and analyze usage patterns and trends
- Protect against unauthorized access and ensure site security

## 3. Cookies
ndsolotravel uses cookies to enhance your browsing experience. Cookies are small data files stored on your device that help us understand how you use our site. You can control cookies through your browser settings. Disabling cookies may affect site functionality.

## 4. Third-Party Services
We may use third-party services such as analytics providers, email marketing platforms, and content delivery networks. These services may collect information about your interactions with our site. We do not sell your personal information to third parties.

## 5. Data Retention
We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law.

## 6. Your Rights
You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us at [contact@ndsolotravel.com](mailto:contact@ndsolotravel.com).

## 7. Changes to This Policy
We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.

## 8. Contact Us
If you have any questions about this Privacy Policy, please contact us at [contact@ndsolotravel.com](mailto:contact@ndsolotravel.com).`,
    seo_title: "Privacy Policy — ndsolotravel",
    seo_description: "Privacy Policy for ndsolotravel. Learn how we collect, use, and protect your personal information.",
    hero_image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=2000&q=80",
    published: true
  },
  disclaimer: {
    slug: "disclaimer",
    title: "Disclaimer",
    content: `*Last updated: August 2026*

## General Information
The information provided on ndsolotravel.com is for general informational and educational purposes only. All content is published in good faith and for general information purposes. While we strive to keep information accurate and up to date, we make no warranties about the completeness, reliability, or suitability of this information.

## Travel Advice
Travel involves inherent risks. The travel stories, guides, tips, and recommendations shared on ndsolotravel are based on personal experiences and are intended for informational purposes only. Travel conditions, regulations, weather, and safety situations can change rapidly and without notice.

Always conduct your own research and exercise personal judgment before undertaking any travel. We recommend consulting official travel advisories, local authorities, and qualified professionals for the most current information regarding safety, health, and entry requirements for any destination.

## External Links
ndsolotravel may contain links to external websites that are not operated or maintained by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.

## Professional Advice
Content on ndsolotravel should not be construed as professional advice of any kind, including but not limited to medical, legal, or financial advice. Always seek the guidance of qualified professionals with any questions you may have regarding travel safety, health precautions, or other matters.

## Photos and Media
All photographs and media content on ndsolotravel are the property of ndsolotravel unless otherwise noted. Unauthorized use, reproduction, or distribution without written permission is prohibited.

## Consent
By using our website, you hereby consent to our disclaimer and agree to its terms. If you do not agree with any part of this disclaimer, please discontinue use of our website.

## Contact Us
If you have any questions about this Disclaimer, please contact us at [contact@ndsolotravel.com](mailto:contact@ndsolotravel.com).`,
    seo_title: "Disclaimer — ndsolotravel",
    seo_description: "Disclaimer for ndsolotravel. Read about the terms and conditions for using our travel content and resources.",
    hero_image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=2000&q=80",
    published: true
  }
};
const getLegalPageBySlug = createServerFn({
  method: "GET"
}).validator((input) => objectType({
  slug: stringType().min(1)
}).parse(input)).handler(createSsrRpc("778ec9633cb0adcb3eb8cb30c2a7968a85e3490a27fccb0807eaacfbd6dd15b2"));
const adminListLegalPages = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("56452cb7e711caee85d85482cc59588f72ad00e02c519971992aaf7576ba8ef3"));
createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).validator((input) => objectType({
  slug: stringType().min(1)
}).parse(input)).handler(createSsrRpc("0cba286ad598fb5f9554cd4673826fb7d9646b907528efe28484beb04f47758c"));
const adminUpsertLegalPage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((input) => objectType({
  slug: stringType().min(1),
  title: stringType().min(1),
  content: stringType(),
  seo_title: stringType().nullable().optional(),
  seo_description: stringType().nullable().optional(),
  hero_image: stringType().nullable().optional(),
  published: booleanType().default(true)
}).parse(input)).handler(createSsrRpc("937009e7484166943d38c7957e6d738ecb9686e3d926481b72569119f35d5c81"));
const $$splitComponentImporter$B = () => import("./privacy-policy-DOr653y9.mjs");
const Route$B = createFileRoute("/privacy-policy")({
  loader: async () => {
    return await getLegalPageBySlug({
      data: {
        slug: "privacy-policy"
      }
    });
  },
  head: ({
    loaderData
  }) => {
    const page = loaderData?.legalPage;
    const title = page?.seo_title || (page?.title ? `${page.title} — ndsolotravel` : "Privacy Policy — ndsolotravel");
    const description = page?.seo_description || "Privacy Policy for ndsolotravel. Learn how we collect, use, and protect your personal information.";
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: description
      }, {
        property: "og:title",
        content: title
      }, {
        property: "og:description",
        content: description
      }, {
        property: "og:url",
        content: "/privacy-policy"
      }],
      links: [{
        rel: "canonical",
        href: "/privacy-policy"
      }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [{
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://ndsolotravel.com"
          }, {
            "@type": "ListItem",
            position: 2,
            name: page?.title || "Privacy Policy"
          }]
        })
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$B, "component")
});
const $$splitComponentImporter$A = () => import("./map-BTU5dmpx.mjs");
const Route$A = createFileRoute("/map")({
  beforeLoad: () => {
    throw redirect({
      to: "/destinations",
      hash: "interactive-map"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$A, "component")
});
const listGallery = createServerFn({
  method: "GET"
}).handler(createSsrRpc("9af9309080664fa919d9f0ccc1d1b1233ba78f5ec575fcd3aaab715c0a8a455b"));
const qo$1 = queryOptions({
  queryKey: ["gallery"],
  queryFn: () => listGallery()
});
const $$splitComponentImporter$z = () => import("./gallery-CSIeJNGe.mjs");
const Route$z = createFileRoute("/gallery")({
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
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://ndsolotravel.com"
        }, {
          "@type": "ListItem",
          position: 2,
          name: "Gallery"
        }]
      })
    }]
  }),
  loader: ({
    context
  }) => context.queryClient.ensureQueryData(qo$1),
  component: lazyRouteComponent($$splitComponentImporter$z, "component")
});
const $$splitComponentImporter$y = () => import("./disclaimer-BG2GJROo.mjs");
const Route$y = createFileRoute("/disclaimer")({
  loader: async () => {
    return await getLegalPageBySlug({
      data: {
        slug: "disclaimer"
      }
    });
  },
  head: ({
    loaderData
  }) => {
    const page = loaderData?.legalPage;
    const title = page?.seo_title || (page?.title ? `${page.title} — ndsolotravel` : "Disclaimer — ndsolotravel");
    const description = page?.seo_description || "Disclaimer for ndsolotravel. Read about the terms and conditions for using our travel content and resources.";
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: description
      }, {
        property: "og:title",
        content: title
      }, {
        property: "og:description",
        content: description
      }, {
        property: "og:url",
        content: "/disclaimer"
      }],
      links: [{
        rel: "canonical",
        href: "/disclaimer"
      }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [{
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://ndsolotravel.com"
          }, {
            "@type": "ListItem",
            position: 2,
            name: page?.title || "Disclaimer"
          }]
        })
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$y, "component")
});
const $$splitComponentImporter$x = () => import("./destinations-vIosy0PX.mjs");
const Route$x = createFileRoute("/destinations")({
  component: lazyRouteComponent($$splitComponentImporter$x, "component")
});
const $$splitComponentImporter$w = () => import("./dashboard-BTU5dmpx.mjs");
const Route$w = createFileRoute("/dashboard")({
  beforeLoad: () => {
    throw redirect({
      to: "/admin/analytics"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$w, "component")
});
const $$splitComponentImporter$v = () => import("./contact-Br9sazaG.mjs");
const Route$v = createFileRoute("/contact")({
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
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://ndsolotravel.com"
        }, {
          "@type": "ListItem",
          position: 2,
          name: "Contact"
        }]
      })
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$v, "component")
});
const $$splitComponentImporter$u = () => import("./blog-9Hd3AP52.mjs");
const Route$u = createFileRoute("/blog")({
  component: lazyRouteComponent($$splitComponentImporter$u, "component")
});
const $$splitComponentImporter$t = () => import("./auth-BGsW52UL.mjs");
const authSearchSchema = objectType({
  redirect: stringType().optional(),
  error: stringType().optional()
});
const Route$t = createFileRoute("/auth")({
  validateSearch: authSearchSchema,
  head: () => ({
    meta: [{
      title: "Sign In — ndsolotravel"
    }, {
      name: "description",
      content: "Sign in with your credentials to access the CMS or your account."
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }, {
      property: "og:url",
      content: "/auth"
    }],
    links: [{
      rel: "canonical",
      href: "/auth"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$t, "component")
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
}).middleware([requireSupabaseAuth]).validator((input) => objectType({
  key: stringType().min(1),
  value: stringType(),
  description: stringType().optional()
}).parse(input)).handler(createSsrRpc("bfe1dd602d06788487f81029ae20a9de238587c4a6d102b91961aace569a0438"));
const settingsQO = queryOptions({
  queryKey: ["public-site-settings"],
  queryFn: () => getPublicSiteSettings()
});
const $$splitComponentImporter$s = () => import("./about-DsWYM64V.mjs");
const Route$s = createFileRoute("/about")({
  head: ({
    loaderData
  }) => {
    const title = loaderData?.about_seo_title || "About Hussain & NDSOLOTRAVEL — Solo Motorcycle Adventure Travel";
    const description = loaderData?.about_seo_description || "Meet Hussain, the engineer and solo explorer behind NDSOLOTRAVEL. Documenting raw motorcycle expeditions, high-altitude Himalayan treks, and stories across 27 countries.";
    const ogTitle = loaderData?.about_og_title || title;
    const ogDesc = loaderData?.about_og_description || description;
    const ogImg = loaderData?.about_og_image ? resolveMediaUrl(loaderData.about_og_image) : void 0;
    const canonical = loaderData?.about_canonical_url || "/about";
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: description
      }, {
        property: "og:title",
        content: ogTitle
      }, {
        property: "og:description",
        content: ogDesc
      }, ...ogImg ? [{
        property: "og:image",
        content: ogImg
      }] : [], {
        property: "og:url",
        content: canonical
      }],
      links: [{
        rel: "canonical",
        href: canonical
      }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [{
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://ndsolotravel.com"
          }, {
            "@type": "ListItem",
            position: 2,
            name: "About"
          }]
        })
      }]
    };
  },
  loader: ({
    context
  }) => context.queryClient.ensureQueryData(settingsQO),
  component: lazyRouteComponent($$splitComponentImporter$s, "component")
});
const $$splitComponentImporter$r = () => import("./route-BFsOu0JM.mjs");
const SIGN_IN_ROUTE = "/auth";
const Route$r = createFileRoute("/_authenticated")({
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
  component: lazyRouteComponent($$splitComponentImporter$r, "component")
});
const HOMEPAGE_KEYS = [
  // Hero Banner
  "homepage_hero_mode",
  "homepage_hero_post_id",
  "homepage_hero_images_mode",
  "homepage_hero_image",
  "homepage_hero_image_2",
  "homepage_hero_image_3",
  "homepage_hero_badge",
  "homepage_hero_title",
  "homepage_hero_title_highlight",
  "homepage_hero_description",
  "homepage_hero_button_text",
  "homepage_hero_button_link",
  "homepage_hero_secondary_button_text",
  "homepage_hero_secondary_button_link",
  // Journey in Numbers
  "homepage_stat_countries_mode",
  "homepage_stat_countries",
  "homepage_stat_trips",
  "homepage_stat_photos",
  "homepage_stat_photos_suffix",
  "homepage_stat_kilometres",
  "homepage_stat_kilometres_suffix",
  "homepage_stat_days",
  // Featured / Latest Blog Post
  "homepage_featured_mode",
  "homepage_featured_post_id"
];
const getHomepageConfig = createServerFn({
  method: "GET"
}).handler(createSsrRpc("ed839ac608e04e2b639d981cb6f852fa1aeb890692636d81932865c4d88aa08c"));
const adminGetHomepageEditor = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("2c83b3f1c75595fb9433f21f8203d59a19d372de43711193f4d2661393212e46"));
const adminSaveHomepageSettings = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((input) => {
  const raw = input ?? {};
  const settings = {};
  for (const key of HOMEPAGE_KEYS) {
    const value = raw[key];
    if (typeof value === "string") settings[key] = value;
  }
  const flat = typeof raw.settings === "object" ? raw.settings : settings;
  return objectType({
    settings: recordType(stringType())
  }).parse({
    settings: flat
  });
}).handler(createSsrRpc("3e97ad3a62fc506fb723a5239d751961bd75cff65bde1dcc51d7ac0d10a99c0c"));
const listActiveTopics = createServerFn({
  method: "GET"
}).handler(createSsrRpc("9161b4436f201e809bf5082c23fa618ba73a6a57ac9f0eb8d0f3c04852e32d0d"));
const getTopicCluster = createServerFn({
  method: "GET"
}).validator((input) => objectType({
  slug: stringType().min(1)
}).parse(input)).handler(createSsrRpc("8c6e7c8fac799d8bc78df9bc76e4b36e6d4e852682711602c40868363265359f"));
const slugifyNews = (s) => s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
const listActiveBreakingNews = createServerFn({
  method: "GET"
}).handler(createSsrRpc("486857c8379099907b55d46ffdf446e4a695401a89b8881496b2b96cab631c1a"));
const getNewsBySlug = createServerFn({
  method: "GET"
}).validator((i) => objectType({
  slug: stringType().min(1)
}).parse(i)).handler(createSsrRpc("61a9150fa218b72ed0c6bb9ad2f4443dcd173e369c003c759c6b9c53413600a1"));
const adminListNews = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("584ce841751771fbef6119f99552b491ccebe94a948e7f3bed85100b354de852"));
createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  id: stringType().uuid()
}).parse(i)).handler(createSsrRpc("b56f884a287c0306c0fb06adf8aaa620bbe1bb3b1901cc25d9178aa8d506afd7"));
const adminUpsertNews = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  id: stringType().uuid().optional(),
  title: stringType().min(1, "Headline / Title is required"),
  slug: stringType().optional(),
  summary: stringType().nullable().optional(),
  content: stringType().optional(),
  image_url: stringType().nullable().optional(),
  status: enumType(["draft", "published"]).default("draft"),
  is_breaking: booleanType().default(true),
  is_active: booleanType().default(true),
  display_order: numberType().int().default(0),
  published_at: stringType().optional(),
  expires_at: stringType().nullable().optional()
}).parse(i)).handler(createSsrRpc("48e2a0283115b28497c09e9e66c78ce0455d953cb099457800b4d638580447e3"));
const adminDeleteNews = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  id: stringType().uuid()
}).parse(i)).handler(createSsrRpc("b6826ab77e000899a4d100302815e39fd62a663f61924c668747fd79f74de277"));
const adminToggleNewsField = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  id: stringType().uuid(),
  field: enumType(["status", "is_breaking", "is_active"]),
  value: unionType([booleanType(), enumType(["draft", "published"])])
}).parse(i)).handler(createSsrRpc("6b29b55bfd05b4cb01529beef06ba2ff9b94857498899a07140b95ba7889c19f"));
const postsQO = queryOptions({
  queryKey: ["home", "posts"],
  queryFn: () => listPosts({
    data: {
      limit: 12
    }
  })
});
const featuredQO = queryOptions({
  queryKey: ["home", "featured"],
  queryFn: () => listPosts({
    data: {
      limit: 4,
      featuredOnly: true
    }
  })
});
const destQO$2 = queryOptions({
  queryKey: ["home", "destinations"],
  queryFn: () => listDestinations()
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
const homepageQO = queryOptions({
  queryKey: ["home", "homepage-config"],
  queryFn: () => getHomepageConfig()
});
const topicsQO = queryOptions({
  queryKey: ["home", "active-topics"],
  queryFn: () => listActiveTopics()
});
const breakingNewsQO = queryOptions({
  queryKey: ["home", "breaking-news"],
  queryFn: () => listActiveBreakingNews()
});
const $$splitComponentImporter$q = () => import("./index-jhq95v6c.mjs");
const Route$q = createFileRoute("/")({
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
    await Promise.all([context.queryClient.ensureQueryData(postsQO), context.queryClient.ensureQueryData(featuredQO), context.queryClient.ensureQueryData(destQO$2), context.queryClient.ensureQueryData(galleryQO), context.queryClient.ensureQueryData(motoQO), context.queryClient.ensureQueryData(journeyStatsQO), context.queryClient.ensureQueryData(homepageQO), context.queryClient.ensureQueryData(topicsQO), context.queryClient.ensureQueryData(breakingNewsQO)]);
  },
  component: lazyRouteComponent($$splitComponentImporter$q, "component")
});
const destQO$1 = queryOptions({
  queryKey: ["destinations"],
  queryFn: () => listDestinations()
});
const $$splitComponentImporter$p = () => import("./destinations.index-8bDakuA1.mjs");
const Route$p = createFileRoute("/destinations/")({
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
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://ndsolotravel.com"
        }, {
          "@type": "ListItem",
          position: 2,
          name: "Destinations"
        }]
      })
    }]
  }),
  loader: ({
    context
  }) => context.queryClient.ensureQueryData(destQO$1),
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const blogQO = (params) => queryOptions({
  queryKey: ["blog", params],
  queryFn: () => listPosts({
    data: {
      limit: 50,
      sort: params.sort ?? "latest",
      category: params.category,
      tag: params.tag,
      search: params.search,
      destination: params.destination
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
const activeTopicsQO = queryOptions({
  queryKey: ["active-topics"],
  queryFn: () => listActiveTopics()
});
const categoriesQO = queryOptions({
  queryKey: ["categories-list"],
  queryFn: () => listCategories()
});
const $$splitComponentImporter$o = () => import("./blog.index-D8Ac6HaK.mjs");
const searchSchema = objectType({
  category: stringType().optional(),
  tag: stringType().optional(),
  q: stringType().optional(),
  sort: enumType(["latest", "popular"]).optional(),
  destination: stringType().optional()
});
const Route$o = createFileRoute("/blog/")({
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
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://ndsolotravel.com"
        }, {
          "@type": "ListItem",
          position: 2,
          name: "Stories"
        }]
      })
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
      sort: deps.sort,
      destination: deps.destination
    })), context.queryClient.ensureQueryData(destQO), context.queryClient.ensureQueryData(authorNameQO$1), context.queryClient.ensureQueryData(activeTopicsQO), context.queryClient.ensureQueryData(categoriesQO)]);
  },
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("./topics._slug-FtZ6g5bN.mjs");
const topicQO = (slug) => queryOptions({
  queryKey: ["topic-cluster", slug],
  queryFn: () => getTopicCluster({
    data: {
      slug
    }
  })
});
const Route$n = createFileRoute("/topics/$slug")({
  head: ({
    loaderData
  }) => {
    const ld = loaderData;
    const t = ld?.topic;
    if (!t) return {};
    const title = `${t.title} — ndsolotravel`;
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: t.description
      }, {
        property: "og:title",
        content: title
      }, {
        property: "og:description",
        content: t.description
      }, {
        property: "og:url",
        content: `/topics/${t.slug}`
      }, {
        property: "og:image",
        content: t.heroImage
      }],
      links: [{
        rel: "canonical",
        href: `/topics/${t.slug}`
      }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [{
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://ndsolotravel.com"
          }, {
            "@type": "ListItem",
            position: 2,
            name: "Topics",
            item: "https://ndsolotravel.com/blog"
          }, {
            "@type": "ListItem",
            position: 3,
            name: t.title
          }]
        })
      }, {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: t.title,
          description: t.description,
          url: `https://ndsolotravel.com/topics/${t.slug}`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: t.posts.slice(0, 10).map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://ndsolotravel.com/blog/${p.slug}`,
              name: p.title
            }))
          }
        })
      }]
    };
  },
  loader: async ({
    context,
    params
  }) => {
    const topic = await context.queryClient.ensureQueryData(topicQO(params.slug));
    if (!topic || topic.posts.length === 0) throw notFound();
    return {
      topic
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitNotFoundComponentImporter$2 = () => import("./news._slug-BJm7Ekvs.mjs");
const $$splitComponentImporter$m = () => import("./news._slug-CsEsKdKP.mjs");
const Route$m = createFileRoute("/news/$slug")({
  loader: async ({
    params
  }) => {
    const item = await getNewsBySlug({
      data: {
        slug: params.slug
      }
    });
    if (!item) {
      throw notFound();
    }
    return {
      newsItem: item
    };
  },
  head: ({
    loaderData
  }) => {
    const item = loaderData?.newsItem;
    if (!item) {
      return {
        meta: [{
          title: "News Dispatch Not Found — ndsolotravel"
        }]
      };
    }
    return {
      meta: [{
        title: `${item.title} — ndsolotravel News`
      }, {
        name: "description",
        content: item.summary || item.title
      }, {
        property: "og:title",
        content: item.title
      }, {
        property: "og:description",
        content: item.summary || item.title
      }, {
        property: "og:type",
        content: "article"
      }, ...item.image_url ? [{
        property: "og:image",
        content: resolveMediaUrl(item.image_url)
      }] : []],
      links: [{
        rel: "canonical",
        href: `/news/${item.slug}`
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$m, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$2, "notFoundComponent")
});
const $$splitComponentImporter$l = () => import("./destinations._slug-CmRRpZ7Y.mjs");
const $$splitNotFoundComponentImporter$1 = () => import("./destinations._slug-DEfDeEXQ.mjs");
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
const Route$l = createFileRoute("/destinations/$slug")({
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
      }],
      scripts: d ? [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [{
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://ndsolotravel.com"
          }, {
            "@type": "ListItem",
            position: 2,
            name: "Destinations",
            item: "https://ndsolotravel.com/destinations"
          }, {
            "@type": "ListItem",
            position: 3,
            name: d.title
          }]
        })
      }] : []
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./category._slug-DMMunxH2.mjs");
const categoryQO = (slug) => queryOptions({
  queryKey: ["category-page", slug],
  queryFn: () => getCategoryBySlug({
    data: {
      slug
    }
  })
});
const Route$k = createFileRoute("/category/$slug")({
  head: ({
    loaderData
  }) => {
    const data = loaderData;
    const cat = data?.category;
    if (!cat) return {};
    const pageTitle = cat.seo_title || `${cat.name} — Solo Travel Stories & Guides | ndsolotravel`;
    const metaDesc = cat.seo_description || cat.description || `Explore solo travel journeys, mountain stories, and guides under ${cat.name}.`;
    const canonicalUrl = `https://ndsolotravel.com/category/${cat.slug}`;
    const rawHeroImg = cat.image_url || data.posts[0]?.cover_image || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80";
    const heroImg = resolveMediaUrl(rawHeroImg);
    return {
      meta: [{
        title: pageTitle
      }, {
        name: "description",
        content: metaDesc
      }, {
        property: "og:title",
        content: pageTitle
      }, {
        property: "og:description",
        content: metaDesc
      }, {
        property: "og:url",
        content: canonicalUrl
      }, {
        property: "og:image",
        content: heroImg
      }, {
        name: "twitter:card",
        content: "summary_large_image"
      }, {
        name: "twitter:title",
        content: pageTitle
      }, {
        name: "twitter:description",
        content: metaDesc
      }, {
        name: "twitter:image",
        content: heroImg
      }],
      links: [{
        rel: "canonical",
        href: canonicalUrl
      }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [{
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://ndsolotravel.com"
          }, {
            "@type": "ListItem",
            position: 2,
            name: "Stories",
            item: "https://ndsolotravel.com/blog"
          }, {
            "@type": "ListItem",
            position: 3,
            name: cat.name,
            item: canonicalUrl
          }]
        })
      }, {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: cat.name,
          description: metaDesc,
          url: canonicalUrl,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: data.posts.length,
            itemListElement: data.posts.slice(0, 20).map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://ndsolotravel.com/blog/${p.slug}`,
              name: p.title
            }))
          }
        })
      }]
    };
  },
  loader: async ({
    context,
    params
  }) => {
    const res = await context.queryClient.ensureQueryData(categoryQO(params.slug));
    if (!res || !res.category) {
      throw notFound();
    }
    return res;
  },
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const authorNameQO = queryOptions({
  queryKey: ["blog-author-name"],
  queryFn: () => getBlogAuthorName()
});
const $$splitNotFoundComponentImporter = () => import("./blog._slug-DOo5HLde.mjs");
const $$splitComponentImporter$j = () => import("./blog._slug-BBchiaIz.mjs");
const postQO = (slug) => queryOptions({
  queryKey: ["post", slug],
  queryFn: () => getPostBySlug({
    data: {
      slug
    }
  })
});
const Route$j = createFileRoute("/blog/$slug")({
  loader: async ({
    params,
    context
  }) => {
    const [data, authorName] = await Promise.all([context.queryClient.ensureQueryData(postQO(params.slug)), context.queryClient.ensureQueryData(authorNameQO)]);
    if (!data.post) throw notFound();
    return {
      ...data,
      authorName: authorName || "Hussain"
    };
  },
  head: ({
    loaderData,
    params
  }) => {
    const p = loaderData?.post;
    const authorName = p?.author_name || loaderData?.authorName || "Hussain";
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
          "@type": "BreadcrumbList",
          itemListElement: [{
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://ndsolotravel.com"
          }, {
            "@type": "ListItem",
            position: 2,
            name: "Stories",
            item: "https://ndsolotravel.com/blog"
          }, {
            "@type": "ListItem",
            position: 3,
            name: p.title
          }]
        })
      }, {
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
  component: lazyRouteComponent($$splitComponentImporter$j, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
const $$splitComponentImporter$i = () => import("./admin-ZtfHfCyK.mjs");
const Route$i = createFileRoute("/_authenticated/admin")({
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
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./account-5hTp2g-v.mjs");
const Route$h = createFileRoute("/_authenticated/account")({
  head: () => ({
    meta: [{
      title: "Account — ndsolotravel"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./admin.index-CJbGUW_y.mjs");
const Route$g = createFileRoute("/_authenticated/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./admin.subscribers-BtqpDKx6.mjs");
const Route$f = createFileRoute("/_authenticated/admin/subscribers")({
  head: () => ({
    meta: [{
      title: "Newsletter Subscribers — Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./admin.settings-BZS_QvE3.mjs");
const Route$e = createFileRoute("/_authenticated/admin/settings")({
  head: () => ({
    meta: [{
      title: "Settings — Admin CMS"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./admin.public-message-D-OL23WH.mjs");
const Route$d = createFileRoute("/_authenticated/admin/public-message")({
  head: () => ({
    meta: [{
      title: "Public Message — Admin CMS"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./admin.news-ntWbw8tN.mjs");
const Route$c = createFileRoute("/_authenticated/admin/news")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./admin.messages-BW0Q1XIh.mjs");
const Route$b = createFileRoute("/_authenticated/admin/messages")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./admin.legal-BgkSSd5F.mjs");
const Route$a = createFileRoute("/_authenticated/admin/legal")({
  ssr: false,
  head: () => ({
    meta: [{
      title: "Legal Pages — Admin CMS"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./admin.homepage-CWvl1fN9.mjs");
const Route$9 = createFileRoute("/_authenticated/admin/homepage")({
  ssr: false,
  head: () => ({
    meta: [{
      title: "Homepage Management — Admin CMS"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./admin.gallery--2NSh4Pa.mjs");
const Route$8 = createFileRoute("/_authenticated/admin/gallery")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./admin.destinations-Cqvrxubm.mjs");
const Route$7 = createFileRoute("/_authenticated/admin/destinations")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./admin.comments-BAa5lRBO.mjs");
const Route$6 = createFileRoute("/_authenticated/admin/comments")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./admin.categories-ClNrikmn.mjs");
const Route$5 = createFileRoute("/_authenticated/admin/categories")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.analytics-UqLr5Acd.mjs");
const Route$4 = createFileRoute("/_authenticated/admin/analytics")({
  head: () => ({
    meta: [{
      title: "Analytics & Hit Counter — Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.about-Bk4ysNl3.mjs");
const Route$3 = createFileRoute("/_authenticated/admin/about")({
  ssr: false,
  head: () => ({
    meta: [{
      title: "About Page Management — Admin CMS"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.posts.index-BrlE7AAU.mjs");
const Route$2 = createFileRoute("/_authenticated/admin/posts/")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.posts.new-D-122oj8.mjs");
const Route$1 = createFileRoute("/_authenticated/admin/posts/new")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.posts._id-BNKIOKM4.mjs");
const Route = createFileRoute("/_authenticated/admin/posts/$id")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SitemapDotxmlRoute = Route$C.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$D
});
const PrivacyPolicyRoute = Route$B.update({
  id: "/privacy-policy",
  path: "/privacy-policy",
  getParentRoute: () => Route$D
});
const MapRoute = Route$A.update({
  id: "/map",
  path: "/map",
  getParentRoute: () => Route$D
});
const GalleryRoute = Route$z.update({
  id: "/gallery",
  path: "/gallery",
  getParentRoute: () => Route$D
});
const DisclaimerRoute = Route$y.update({
  id: "/disclaimer",
  path: "/disclaimer",
  getParentRoute: () => Route$D
});
const DestinationsRoute = Route$x.update({
  id: "/destinations",
  path: "/destinations",
  getParentRoute: () => Route$D
});
const DashboardRoute = Route$w.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$D
});
const ContactRoute = Route$v.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$D
});
const BlogRoute = Route$u.update({
  id: "/blog",
  path: "/blog",
  getParentRoute: () => Route$D
});
const AuthRoute = Route$t.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$D
});
const AboutRoute = Route$s.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$D
});
const AuthenticatedRouteRoute = Route$r.update({
  id: "/_authenticated",
  getParentRoute: () => Route$D
});
const IndexRoute = Route$q.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$D
});
const DestinationsIndexRoute = Route$p.update({
  id: "/",
  path: "/",
  getParentRoute: () => DestinationsRoute
});
const BlogIndexRoute = Route$o.update({
  id: "/",
  path: "/",
  getParentRoute: () => BlogRoute
});
const TopicsSlugRoute = Route$n.update({
  id: "/topics/$slug",
  path: "/topics/$slug",
  getParentRoute: () => Route$D
});
const NewsSlugRoute = Route$m.update({
  id: "/news/$slug",
  path: "/news/$slug",
  getParentRoute: () => Route$D
});
const DestinationsSlugRoute = Route$l.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => DestinationsRoute
});
const CategorySlugRoute = Route$k.update({
  id: "/category/$slug",
  path: "/category/$slug",
  getParentRoute: () => Route$D
});
const BlogSlugRoute = Route$j.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => BlogRoute
});
const AuthenticatedAdminRoute = Route$i.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAccountRoute = Route$h.update({
  id: "/account",
  path: "/account",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAdminIndexRoute = Route$g.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminSubscribersRoute = Route$f.update({
  id: "/subscribers",
  path: "/subscribers",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminSettingsRoute = Route$e.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminPublicMessageRoute = Route$d.update({
  id: "/public-message",
  path: "/public-message",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminNewsRoute = Route$c.update({
  id: "/news",
  path: "/news",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminMessagesRoute = Route$b.update({
  id: "/messages",
  path: "/messages",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminLegalRoute = Route$a.update({
  id: "/legal",
  path: "/legal",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminHomepageRoute = Route$9.update({
  id: "/homepage",
  path: "/homepage",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminGalleryRoute = Route$8.update({
  id: "/gallery",
  path: "/gallery",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminDestinationsRoute = Route$7.update({
  id: "/destinations",
  path: "/destinations",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminCommentsRoute = Route$6.update({
  id: "/comments",
  path: "/comments",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminCategoriesRoute = Route$5.update({
  id: "/categories",
  path: "/categories",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminAnalyticsRoute = Route$4.update({
  id: "/analytics",
  path: "/analytics",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminAboutRoute = Route$3.update({
  id: "/about",
  path: "/about",
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
  AuthenticatedAdminAboutRoute,
  AuthenticatedAdminAnalyticsRoute,
  AuthenticatedAdminCategoriesRoute,
  AuthenticatedAdminCommentsRoute,
  AuthenticatedAdminDestinationsRoute,
  AuthenticatedAdminGalleryRoute,
  AuthenticatedAdminHomepageRoute,
  AuthenticatedAdminLegalRoute,
  AuthenticatedAdminMessagesRoute,
  AuthenticatedAdminNewsRoute,
  AuthenticatedAdminPublicMessageRoute,
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
  DisclaimerRoute,
  GalleryRoute,
  MapRoute,
  PrivacyPolicyRoute,
  SitemapDotxmlRoute,
  CategorySlugRoute,
  NewsSlugRoute,
  TopicsSlugRoute
};
const routeTree = Route$D._addFileChildren(rootRouteChildren)._addFileTypes();
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
  topicsQO as $,
  adminUpdatePublicMessage as A,
  adminListNews as B,
  CATEGORIES as C,
  DEFAULT_PUBLIC_POPUP_MESSAGE as D,
  adminUpsertNews as E,
  adminDeleteNews as F,
  adminToggleNewsField as G,
  slugifyNews as H,
  adminListLegalPages as I,
  adminUpsertLegalPage as J,
  DEFAULT_LEGAL_PAGES as K,
  adminGetHomepageEditor as L,
  adminSaveHomepageSettings as M,
  adminListCategories as N,
  adminUpsertCategory as O,
  adminDeleteCategory as P,
  slugify as Q,
  Route$B as R,
  SITE as S,
  getAdminAnalyticsDetails as T,
  Route as U,
  Route$j as V,
  authorNameQO as W,
  NewsletterForm as X,
  postsQO as Y,
  featuredQO as Z,
  destQO$2 as _,
  Route$y as a,
  galleryQO as a0,
  motoQO as a1,
  journeyStatsQO as a2,
  homepageQO as a3,
  breakingNewsQO as a4,
  router as a5,
  useServerFn as b,
  useLanguage as c,
  Route$t as d,
  settingsQO as e,
  destQO$1 as f,
  Route$o as g,
  blogQO as h,
  destQO as i,
  activeTopicsQO as j,
  categoriesQO as k,
  logoPath as l,
  authorNameQO$1 as m,
  Route$n as n,
  Route$m as o,
  Route$l as p,
  qo$1 as q,
  Route$k as r,
  sendContact as s,
  adminListSubscribers as t,
  useTranslations as u,
  adminUpdateSubscriberStatus as v,
  adminDeleteSubscriber as w,
  adminGetSettings as x,
  adminUpdateSetting as y,
  adminGetPublicMessage as z
};
