// menuData.js

const menuData = {
  alGusto: {
    tallas: {
      M: { precio: "5.50€", carnes: 1 },
      L: { precio: "7.50€", carnes: 2 },
      XL: { precio: "9.50€", carnes: 3 },
      XXL: { precio: "11.50€", carnes: 4 },
    },
    carnes: [
      "Pollo fresco/marinado",
      "Carne picada",
      "San Jacobo",
      "Nuggets de pollo",
      "Chicken Tenders",
      "Kebab",
      "Nuggets vegetarianos",
      "Carne vegetariana"
    ],
    bases: {
      original: {
        descripcion: "Salsa de queso + patatas"
      },
      tchoukTchouka: {
        descripcion: "Salsa de queso + patatas + Tchouk-Tchouka",
        precio_extra: "0.50€"
      },
      originalPlus: {
        descripcion: "Salsa de queso + patatas + cebolla + tomates + lechuga",
        precio_extra: "1€"
      }
    },
    salsas: [
      "Argelina",
      "Barbacoa",
      "Biggy Burger",
      "Chili Thaï",
      "Cream Cheese",
      "Marroquí",
      "Andaluza",
      "Magic Onion",
      "Samurai",
      "Pili Pili",
      "Americana",
      "Salsa Kebab"
    ]
  },
  extras: [
    { nombre: "Gouda", precio: "0.50€" },
    { nombre: "Cheddar", precio: "0.50€" },
    { nombre: "Mozarella", precio: "0.50€" },
    { nombre: "Vaca que ríe", precio: "0.50€" },
    { nombre: "Queso de cabra", precio: "0.50€" },
    { nombre: "Aceitunas verdes", precio: "0.50€" },
    { nombre: "Aceitunas negras", precio: "0.50€" },
    { nombre: "Pimientos", precio: "0.50€" },
    { nombre: "Aros de cebolla", precio: "0.50€" },
    { nombre: "Tiras de bacon", precio: "0.70€" },
    { nombre: "Champiñones", precio: "0.70€" }
  ],
  gratinar: {
    M: { precio: "1€" },
    L: { precio: "1€" },
    XL: { precio: "1.50€" },
    XXL: { precio: "1.50€" }
  },
  menus: {
    normal: {
      precio: "2€",
      descripcion: "Patatas + bebida"
    },
    grande: {
      precio: "2.50€",
      descripcion: "Bebida + patatas"
    }
  },
  bebidas: [
    { nombre: "Coca-Cola", precio: "1.50€" },
    { nombre: "Fanta", precio: "1.50€" },
    { nombre: "Sprite", precio: "1.50€" },
    { nombre: "Agua", precio: "1.00€" },
    { nombre: "Cerveza", precio: "2.00€" }
  ],
  tacosClasicos: {
    elAutentico: {
      precio: "8€",
      descripcion: "Carne picada, pollo, salsa argelina + BBQ y cheddar"
    },
    elLegendario: {
      precio: "8€",
      descripcion: "San Jacobo, carne picada, salsa Magic Union y cebolla frita"
    },
    med: {
      precio: "8€",
      descripcion: "Carne picada, tenders, salsa andaluza, champiñon y aceitunas verdes"
    },
    lOriental: {
      precio: "8€",
      descripcion: "Pollo, kebab, salsa marroquí, pimientos y aceitunas negras"
    }
  },
  tacosGolden: {
    elChef: {
      precio: "9€",
      descripcion: "Tenders, carne picada, salsa andaluza y tiras de bacon"
    },
    tresQuesos: {
      precio: "9€",
      descripcion: "Carne picada x2 y los tres imprescindibles: Cheddar, Gouda y Emmental"
    },
    tacBac: {
      precio: "9€",
      descripcion: "Carne kebab x2, salsa Biggy, vaca que ríe y golden queso"
    },
    piroAbo: {
      precio: "9€",
      descripcion: "San Jacobo, nuggets, salsa Pili Pili y tiras de bacon"
    }
  },
  especiales: {
    tacostar: {
      precio: "11.50€",
      descripcion: "San Jacobo, tenders, kebab de pollo, salsa argelina, tiras de bacon y mozzarella"
    }
  }
};

export default menuData;