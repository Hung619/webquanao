let items = [
    {
        id: 1,
        name: "Áo Sơ Mi Oxford Nam Tay Ngắn Sọc Mịn Form Regular",
        image: require("@/assets/aoSoMi/soMi1.jpg"),
        description: "Áo sơ mi nam sọc mịn, kiểu dáng thanh lịch.",
        price: 319,
        quality: 10,
        size: ["S","M","L"],
        status: "Còn hàng",
        category: "home"
    },
    {
        id: 2,
        name: "Áo Sơ Mi Cotton Nam Tay Dài Comfortable Stripe Form Regular",
        image: require("@/assets/aoSoMi/soMi2.webp"),
        description: "Áo sơ mi cotton thoáng mát, phù hợp mọi hoàn cảnh.",
        price: 349,
        quality: 10,
        size: ["S","M","L"],
        status: "Còn hàng",
        category: "home"
    },
    {
        id: 3,
        name: "Áo Sơ Mi Oxford Nam Tay Dài Chống Nhăn Form Slim",
        image: require("@/assets/aoSoMi/soMi6.jpg"),
        description: "Sơ mi chống nhăn, phong cách slimfit trẻ trung.",
        price: 349,
        quality: 10,
        size: ["S","M","L"],
        status: "Còn hàng",
        category: "home"
    },
    {
        id: 4,
        name: "Áo Sơ Mi Oxford Nam Tay Dài Kẻ Sọc Cloth Woven Form Regular",
        image: require("@/assets/aoSoMi/soMi8.jpg"),
        description: "Thiết kế kẻ sọc tinh tế, phong cách lịch lãm.",
        price: 349,
        quality: 10,
        size: ["S","M","L"],
        status: "Còn hàng",
        category: "home"
    },
    {
        id: 5,
        name: "Quần Jean Nam Đen Trơn Ống Ôm All Black Form Skinny",
        image: require("@/assets/quanJean/quanJean5.jpg"),
        description: "Quần jean đen ôm sát, phong cách all-black cá tính.",
        price: 499,
        quality: 10,
        size: ["S","M","L"],
        status: "Còn hàng",
        category: "home"
    },
    {
        id: 6,
        name: "Quần Jean Nam Xanh Trơn Ống Ôm Modern Vibe Form Slim",
        image: require("@/assets/quanJean/quanJean6.webp"),
        description: "Quần jean xanh trơn hiện đại, dáng slimfit thanh lịch.",
        price: 590,
        quality: 10,
        size: ["S","M","L"],
        status: "Còn hàng",
        category: "home"
    },
    {
        id: 7,
        name: "Quần Jean Nam Xanh Nhạt Ống Ôm Rách Form Slim",
        image: require("@/assets/quanJean/quanJean7.webp"),
        description: "Phong cách rách nhẹ, phù hợp với phong cách trẻ trung.",
        price: 549,
        quality: 10,
        size: ["S","M","L"],
        status: "Còn hàng",
        category: "home"
    },
    {
        id: 8,
        name: "Quần Jean Nam Trắng Trơn Ống Ôm Form Skinny",
        image: require("@/assets/quanJean/quanJean8.webp"),
        description: "Quần jean trắng trơn, dáng skinny thời thượng.",
        price: 440,
        quality: 10,
        size: ["S","M","L"],
        status: "Còn hàng",
        category: "home"
    },
    {
        id: 9,
        name: "Áo Thun Nam Họa Tiết Wander Around The City Form Regular",
        image: require("@/assets/aoThun/thun6.webp"),
        description: "Áo thun họa tiết độc đáo, phù hợp đi dạo thành phố.",
        price: 319,
        quality: 10,
        size: ["S","M","L"],
        status: "Còn hàng",
        category: "home"
    },
    {
        id: 10,
        name: "Áo Thun Nam Họa Tiết Lavish Pattern Form Regular",
        image: require("@/assets/aoThun/thun8.webp"),
        description: "Thiết kế họa tiết sang trọng, phù hợp mọi dịp.",
        price: 349,
        quality: 10,
        size: ["S","M","L"],
        status: "Còn hàng",
        category: "home"
    },
    {
        id: 11,
        name: "Áo Thun Nam Họa Tiết Thêu Typo Hand-Draw Form Regular",
        image: require("@/assets/aoThun/thun5.webp"),
        description: "Áo thun thêu tay, mang phong cách độc đáo.",
        price: 289,
        quality: 10,
        size: ["S","M","L"],
        status: "Còn hàng",
        category: "home"
    },
    {
        id: 12,
        name: "Áo Thun Nam Ombre Họa Tiết In Orgnls Form Regular",
        image: require("@/assets/aoThun/thun1.webp"),
        description: "Áo thun ombre với họa tiết in nổi bật.",
        price: 349,
        quality: 10,
        size: ["S","M","L"],
        status: "Còn hàng",
        category: "home"
    },
    {
        id: 13,
        name: "Quần Short Nỉ Nam Đánh Bông Quai Túi Form Regular",
        image: require("@/assets/quanShort/short1.jpg"),
        description: "Quần short nỉ thoải mái, thiết kế đơn giản.",
        price: 289,
        quality: 10,
        size: ["S","M","L"],
        status: "Còn hàng",
        category: "home"
    },
    {
        id: 14,
        name: "Quần Short Nỉ Chân Cua Túi Hộp Cargo Nam Form Regular",
        image: require("@/assets/quanShort/short3.jpg"),
        description: "Quần short cargo túi hộp, phong cách năng động.",
        price: 419,
        quality: 10,
        size: ["S","M","L"],
        status: "Còn hàng",
        category: "home"
    },
    {
        id: 15,
        name: "Quần Short Denim Nam Wash Basic Color Form Slim",
        image: require("@/assets/quanShort/short7.jpg"),
        description: "Quần short denim wash basic, dễ phối đồ.",
        price: 390,
        quality: 10,
        size: ["S","M","L"],
        status: "Còn hàng",
        category: "home"
    },
    {
        id: 16,
        name: "Quần Short Jean Nam Wash Xám Form Regular",
        image: require("@/assets/quanShort/short6.jpg"),
        description: "Quần short jean màu xám, phong cách hiện đại.",
        price: 400,
        quality: 10,
        size: ["S","M","L"],
        status: "Còn hàng",
        category: "home"
    }
];

export default items;
