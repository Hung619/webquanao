let items = [
  {
    id: 1,
    name: "Áo Sơ Mi Cuban Torn Cotton Nam Floating Surface Form Relaxed",
    image: require("@/assets/aoSoMi/soMi3.jpg"),
    description: "Áo sơ mi cotton torn Cuban, bề mặt nổi bật, phong cách trẻ trung.",
    price: 349,
    quality: 10,
    size: ["S","M","L"],
    status: "Còn hàng",
    category: "AoSoMi"
  },
  {
    id: 2,
    name: "Áo Sơ Mi Vải Nano Nam Tay Dài Anti-Wrinkle Form Slim",
    image: require("@/assets/aoSoMi/soMi4.webp"),
    description: "Áo sơ mi nano tay dài chống nhăn, phù hợp với công việc.",
    price: 349,
    quality: 10,
    size: ["S","M","L"],
    status: "Còn hàng",
    category: "AoSoMi"
  },
  {
    id: 3,
    name: "Áo Sơ Mi Cuban Seersucker Nam Tay Ngắn Dog Pattern Form Relaxed",
    image: require("@/assets/aoSoMi/soMi5.webp"),
    description: "Áo sơ mi seersucker tay ngắn họa tiết chó, phong cách độc đáo.",
    price: 349,
    quality: 10,
    size: ["S","M","L"],
    status: "Còn hàng",
    category: "AoSoMi"
  },
  {
    id: 4,
    name: "Áo Sơ Mi Oxford Nam Tay Dài Chống Nhăn Form Slim",
    image: require("@/assets/aoSoMi/soMi6.jpg"),
    description: "Áo sơ mi oxford tay dài chống nhăn, phong cách hiện đại.",
    price: 340,
    quality: 10,
    size: ["S","M","L"],
    status: "Còn hàng",
    category: "AoSoMi"
  },
  {
    id: 5,
    name: "Áo Sơ Mi Denim Nam Light Blue Pocket Floating Pattern",
    image: require("@/assets/aoSoMi/soMi9.jpg"),
    description: "Áo sơ mi denim màu xanh nhạt với túi nổi bật.",
    price: 319,
    quality: 10,
    size: ["S","M","L"],
    status: "Còn hàng",
    category: "AoSoMi"
  },
  {
    id: 6,
    name: "Áo Sơ Mi Cuban Linen Nam Tay Ngắn Abstract Twists Form Relaxed",
    image: require("@/assets/aoSoMi/soMi10.webp"),
    description: "Áo sơ mi linen tay ngắn với họa tiết xoắn ốc, phong cách thoải mái.",
    price: 320,
    quality: 10,
    size: ["S","M","L"],
    status: "Còn hàng",
    category: "AoSoMi"
  },
  {
    id: 7,
    name: "Áo Sơ Mi Denim Nam Printed Sack Type",
    image: require("@/assets/aoSoMi/soMi11.jpg"),
    description: "Áo sơ mi denim với kiểu dáng túi in, phong cách hiện đại.",
    price: 289,
    quality: 10,
    size: ["S","M","L"],
    status: "Còn hàng",
    category: "AoSoMi"
  },
  {
    id: 8,
    name: "Áo Sơ Mi Cuban Linen Nam Tay Ngắn Excursion Form Relaxed",
    image: require("@/assets/aoSoMi/soMi12.webp"),
    description: "Áo sơ mi linen tay ngắn cho chuyến đi, phong cách thoải mái.",
    price: 390,
    quality: 10,
    size: ["S","M","L"],
    status: "Còn hàng",
    category: "AoSoMi"
  },
  {
    id: 9,
    name: "Áo Sơ Mi Denim Nam Tay Dài Túi Đắp Form Regular",
    image: require("@/assets/aoSoMi/soMi13.webp"),
    description: "Áo sơ mi denim tay dài với túi đắp, phong cách lịch lãm.",
    price: 450,
    quality: 10,
    size: ["S","M","L"],
    status: "Còn hàng",
    category: "AoSoMi"
  },
  {
    id: 10,
    name: "Áo Sơ Mi Cuban Linen Nam Tay Ngắn Geometric Abstract Form Relaxed",
    image: require("@/assets/aoSoMi/soMi14.webp"),
    description: "Áo sơ mi linen tay ngắn họa tiết hình học, phong cách trẻ trung.",
    price: 320,
    quality: 10,
    size: ["S","M","L"],
    status: "Còn hàng",
    category: "AoSoMi"
  },
  {
    id: 11,
    name: "Set Đồ Thun Cotton Nam Ngắn Dreamscape Monogram Form Relaxed",
    image: require("@/assets/aoSoMi/soMi15.webp"),
    description: "Set đồ thun cotton ngắn với họa tiết monogram, thoải mái.",
    price: 490,
    quality: 10,
    size: ["S","M","L"],
    status: "Còn hàng",
    category: "AoSoMi"
  },
  {
    id: 12,
    name: "Áo Sơ Mi Linen Nam Tay Ngắn Họa Tiết Cuban Floral Printed Bohemian",
    image: require("@/assets/aoSoMi/soMi16.jpg"),
    description: "Áo sơ mi linen tay ngắn với họa tiết hoa văn Bohemian.",
    price: 320,
    quality: 10,
    size: ["S","M","L"],
    status: "Còn hàng",
    category: "AoSoMi"
  },
  {
    id: 13,
    name: "Áo Sơ Mi Linen Nam Tay Ngắn Thêu 3D Cuban Parrot Form Relaxed",
    image: require("@/assets/aoSoMi/soMi17.webp"),
    description: "Áo sơ mi linen tay ngắn với thêu 3D họa tiết vẹt Cuban.",
    price: 350,
    quality: 10,
    size: ["S","M","L"],
    status: "Còn hàng",
    category: "AoSoMi"
  },
  {
    id: 14,
    name: "Áo Sơ Mi Nam Tay Ngắn Cổ Chữ V Baseball New York Form Relaxed",
    image: require("@/assets/aoSoMi/soMi18.webp"),
    description: "Áo sơ mi tay ngắn cổ chữ V, phong cách baseball New York.",
    price: 280,
    quality: 10,
    size: ["S","M","L"],
    status: "Còn hàng",
    category: "AoSoMi"
  },
  {
    id: 15,
    name: "Áo Sơ Mi Linen Nam Tay Ngắn Cuban CigarCraft Form Relaxed",
    image: require("@/assets/aoSoMi/soMi19.webp"),
    description: "Áo sơ mi linen tay ngắn với họa tiết cigar, phong cách thoải mái.",
    price: 320,
    quality: 10,
    size: ["S","M","L"],
    status: "Còn hàng",
    category: "AoSoMi"
  },
  {
    id: 16,
    name: "Áo Sơ Mi Nano Long Sleeves Basic",
    image: require("@/assets/aoSoMi/soMi20.webp"),
    description: "Áo sơ mi nano tay dài cơ bản, dễ phối với mọi trang phục.",
    price: 390,
    quality: 10,
    size: ["S","M","L"],
    status: "Còn hàng",
    category: "AoSoMi"
  }
];

export default items;