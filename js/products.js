// =============================================
// DATOS DE PRODUCTOS - Mon Ami Quilla
// =============================================
// Puedes editar los precios, nombres y descripciones aquí.
// Para agregar una imagen real, cambia el valor de 'gradient'
// por 'image: "img/tu-foto.jpg"' y actualiza el CSS.

const products = [
  // ========== ICOPOR ========== 
  {
    id: 1,
    name: "Letras 3D Decorativas",
    category: "icopor",
    categoryLabel: "Icopor",
    price: 35000,
    originalPrice: 45000,
    description: "Letras en icopor pintadas a mano con diseños temáticos. Perfectas para fiestas, bodas y decoración de hogar. Tamaño personalizable.",
    emoji: "🔠",
    gradient: "linear-gradient(135deg, #FF6B6B, #FFD93D)",
    badge: "Personalizable",
    featured: true,
    available: true,
    tags: ["fiesta", "boda", "decoracion", "cumpleaños"]
  },
  {
    id: 2,
    name: "Corona Floral Icopor",
    category: "icopor",
    categoryLabel: "Icopor",
    price: 55000,
    originalPrice: null,
    description: "Corona decorativa en icopor con flores de foamy y detalles dorados. Perfecta para puertas, bodas y eventos especiales.",
    emoji: "👑",
    gradient: "linear-gradient(135deg, #FF9A9E, #FAD0C4)",
    badge: null,
    featured: true,
    available: true,
    tags: ["boda", "decoracion", "puerta", "floral"]
  },
  {
    id: 3,
    name: "Centro de Mesa Icopor",
    category: "icopor",
    categoryLabel: "Icopor",
    price: 40000,
    originalPrice: null,
    description: "Elegante centro de mesa elaborado en icopor con decoraciones temáticas. Disponible en diferentes estilos y colores.",
    emoji: "🌟",
    gradient: "linear-gradient(135deg, #F7971E, #FFD200)",
    badge: null,
    featured: false,
    available: true,
    tags: ["fiesta", "boda", "mesa", "decoracion"]
  },
  {
    id: 4,
    name: "Número Gigante 3D",
    category: "icopor",
    categoryLabel: "Icopor",
    price: 28000,
    originalPrice: null,
    description: "Números decorativos gigantes en icopor, ideales para cumpleaños y aniversarios. Los pintamos con el diseño que quieras.",
    emoji: "🎂",
    gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
    badge: "Lo más vendido",
    featured: false,
    available: true,
    tags: ["cumpleaños", "aniversario", "numero"]
  },

  // ========== FOAMY ==========
  {
    id: 5,
    name: "Ramo de Flores Foamy",
    category: "foamy",
    categoryLabel: "Foamy",
    price: 45000,
    originalPrice: 60000,
    description: "Hermoso ramo de flores elaborado en foamy con colores vivos y duraderos. El regalo perfecto que nunca se marchita.",
    emoji: "💐",
    gradient: "linear-gradient(135deg, #f953c6, #b91d73)",
    badge: "¡Oferta!",
    featured: true,
    available: true,
    tags: ["regalo", "flores", "amor", "san valentin"]
  },
  {
    id: 6,
    name: "Kit Decoración Baby Shower",
    category: "foamy",
    categoryLabel: "Foamy",
    price: 75000,
    originalPrice: null,
    description: "Kit completo con siluetas, guirnaldas y detalles en foamy para Baby Shower. Incluye 15 piezas decorativas.",
    emoji: "👶",
    gradient: "linear-gradient(135deg, #a18cd1, #fbc2eb)",
    badge: "Kit completo",
    featured: true,
    available: true,
    tags: ["baby shower", "bebe", "fiesta", "kit"]
  },
  {
    id: 7,
    name: "Figuras Temáticas Foamy",
    category: "foamy",
    categoryLabel: "Foamy",
    price: 25000,
    originalPrice: null,
    description: "Figuras decorativas en foamy con diferentes temáticas: princesas, superhéroes, animales, hawaiiana y más. Precio por figura.",
    emoji: "🦄",
    gradient: "linear-gradient(135deg, #43e97b, #38f9d7)",
    badge: null,
    featured: false,
    available: true,
    tags: ["figura", "cumpleaños", "niños", "tematica"]
  },
  {
    id: 8,
    name: "Guirnalda Tropical Foamy",
    category: "foamy",
    categoryLabel: "Foamy",
    price: 30000,
    originalPrice: null,
    description: "Guirnalda tropical con flores y hojas en foamy. Perfecta para fiestas hawaiianas, 15 años y eventos festivos.",
    emoji: "🌺",
    gradient: "linear-gradient(135deg, #f6d365, #fda085)",
    badge: null,
    featured: false,
    available: true,
    tags: ["hawaiiana", "tropical", "guirnalda", "fiesta"]
  },

  // ========== CARTÓN ==========
  {
    id: 9,
    name: "Caja Decorada Personalizada",
    category: "carton",
    categoryLabel: "Cartón",
    price: 50000,
    originalPrice: null,
    description: "Caja decorativa en cartón pintada y personalizada con el diseño que desees. Ideal para regalo o decoración.",
    emoji: "🎁",
    gradient: "linear-gradient(135deg, #ff7e5f, #feb47b)",
    badge: null,
    featured: true,
    available: true,
    tags: ["caja", "regalo", "personalizado", "decoracion"]
  },
  {
    id: 10,
    name: "Marco Porta Retrato",
    category: "carton",
    categoryLabel: "Cartón",
    price: 35000,
    originalPrice: null,
    description: "Porta retrato artesanal en cartón con detalles decorativos únicos. Disponible en diferentes tamaños y diseños.",
    emoji: "🖼️",
    gradient: "linear-gradient(135deg, #667eea, #764ba2)",
    badge: null,
    featured: false,
    available: true,
    tags: ["marco", "foto", "decoracion", "hogar"]
  },
  {
    id: 11,
    name: "Letrero Personalizado Cartón",
    category: "carton",
    categoryLabel: "Cartón",
    price: 40000,
    originalPrice: null,
    description: "Letreros decorativos en cartón con mensajes personalizados. Perfectos para fiestas, salones y fotografías.",
    emoji: "📝",
    gradient: "linear-gradient(135deg, #84fab0, #8fd3f4)",
    badge: "Nuevo",
    featured: false,
    available: true,
    tags: ["letrero", "texto", "personalizado", "fiesta"]
  },
  {
    id: 12,
    name: "Set Decoración Quinceañera",
    category: "carton",
    categoryLabel: "Cartón",
    price: 120000,
    originalPrice: 150000,
    description: "Set completo para quinceañera: corona, letras '15', silueta, porta foto y accesorios adicionales en cartón.",
    emoji: "👸",
    gradient: "linear-gradient(135deg, #ee9ca7, #ffdde1)",
    badge: "¡Oferta!",
    featured: true,
    available: true,
    tags: ["quinceanera", "15 años", "set", "fiesta"]
  }
];

// =============================================
// Utilidades de productos
// =============================================

function getProductById(id) {
  return products.find(p => p.id === parseInt(id));
}

function getProductsByCategory(category) {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
}

function getFeaturedProducts() {
  return products.filter(p => p.featured);
}

function formatPrice(price) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

function searchProducts(query) {
  const q = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.categoryLabel.toLowerCase().includes(q) ||
    p.tags.some(t => t.includes(q))
  );
}

export { products, getProductById, getProductsByCategory, getFeaturedProducts, formatPrice, searchProducts };
