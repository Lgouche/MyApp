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
      "POLLO FRESCO/MARINADO",
      "CARNE PICADA",
      "SAN JACOBO",
      "NUGGETS DE POLLO",
      "CHICKEN TENDERS",
      "KEBAB",
      "NUGGETS VEGETARIANOS",
      "CARNE VEGETARIANA"
    ],
    bases: {
      original: {
        descripcion: "SALSA DE QUESO + PATATAS"
      },
      tchoukTchouka: {
        descripcion: "SALSA DE QUESO + PATATAS + TCHOUK-TCHOUKA",
        precio_extra: "0.50€"
      },
      originalPlus: {
        descripcion: "SALSA DE QUESO + PATATAS + CEBOLLA + TOMATES + LECHUGA",
        precio_extra: "1€"
      },
      sinQueso: {
        descripcion: "SIN QUESO",
        precio_extra: "0€"
      },
      sinPatatas: {
        descripcion: "SIN PATATAS",
        precio_extra: "0€"
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
    ],
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
    gratinadoProductos:{
      mozzarella:{precio:"0€"},
      becon:{precio:"0.50€"},
      quesoCabra:{precio:"0.50€"},
      aciutunasVerdes:{precio:"0.50€"},
      aceitunasNegras:{precio:"0.50€"},
      pimientos:{precio:"0.5€"},
      
    }
  },
  
  menus: {
    normal: {
      precio: "2€",
      descripcion: "PATATAS + BEBIDA"
    },
    grande: {
      precio: "2.50€",
      descripcion: "BEBIDA + PATATAS"
    }
  },
  bebidas: [
    { nombre: "Coca-Cola", precio: "1.50€" },
    { nombre: "Fanta", precio: "1.50€" },
    { nombre: "Sprite", precio: "1.50€" },
    { nombre: "Agua", precio: "1.00€" },
    { nombre: "Cerveza", precio: "2.00€" },
  ],
  tacosClasicos: {
    elAutentico: {
      precio: "8€",
      descripcion: "CARNE PICADA, POLLO, SALSA ARGELINA + BBQ Y CHEDDAR"
    },
    elLegendario: {
      precio: "8€",
      descripcion: "SAN JACOBO, CARNE PICADA, SALSA MAGIC UNION Y CEBOLLA FRITA"
    },
    med: {
      precio: "8€",
      descripcion: "CARNE PICADA, TENDERS, SALSA ANDALUZA, CAMPIÑON Y ACEITUNAS VERDES"
    },
    lOriental: {
      precio: "8€",
      descripcion: "POLLO, KEBAB, SALSA MARROQUÍ, PIMIENTOS Y ACEITUNAS NEGRAS"
    }
  },
  tacosGolden: {
    elChef: {
      precio: "9€",
      descripcion: "TENDERS, CARNE PICADA, SALSA ANDALUZA Y TIRAS DE BACON"
    },
    tresQuesos: {
      precio: "9€",
      descripcion: "CARNE PICADA X2 Y LOS TRES IMPRESCINDIBLES: CHEDDAR, GOUDA Y EMMENTAL"
    },
    tacBac: {
      precio: "9€",
      descripcion: "CARNE KEBAB X2, SALSA BIGGY, VACA QUE RÍE Y GOLDEN QUESO"
    },
    piroAbo: {
      precio: "9€",
      descripcion: "SAN JACOBO, NUGGETS, SALSA PILI PILI Y TIRAS DE BACON"
    },
    tacostar: {
      precio: "11.50€",
      descripcion: "SAN JACOBO, TENDERS, KEBAB DE POLLO, SALSA ARGELINA, TIRAS DE BACON Y MOZZARELLA"
    }
  },
  menuInfantil:{
    opcion1:{
      miniTaco:{precio:"5€"},
      nuggets:{precio:"5€"}
    },
    opcion2:{
      postre:{precio:"5€"},
      bebida:{precio:"0€"}
    }
  },
  postres:{
    tartaDeQueso:{precio:"2€"},
    tartaDeChocolate:{precio:"2€"},
    daim:{precio:"2€"},
    toblerone:{precio:"2€"},
  },
  postresMenuInfantil:{
    heladoChocolate:{precio:"0€"},
    heladoVainilla:{precio:"0€"},
  },
  vegano:{
    elVeggie:{
      precio:"8.50€" ,
      descripcion:"CARNE VEGETARIANA, ZANAHORIA, CEBOLLA,PIMIENTOS"
    },
    elHummer:{
      precio:"8.50€" ,
      descripcion:"CARNE VEGETARIANA,CEBOLLA,TOMATE Y LECHUGA"
    },
    specialV:{
      precio:"8.50€" ,
      descripcion:"CARNE VEGETARIANA, PIMIENTOS, CEBOLLA Y AGUACATE"
    },
    oTandori:{
      precio:"8.50€" ,
      descripcion:"CARNE VEGETARIANA, TOMATES CHERRY Y MAIZ"
    }
  },
  entrantes:{
    arosDeCebolla:{precio:"2€"},
    fingersDeMozarella:{precio:"2€"},
    nuggetsDePollo:{precio:"3.50€"},
    chickenTenders:{precio:"6€"},
    bolitasDeCamembert:{precio:"3€"},
    jalapeños:{precio:"3.50€"},
    laBox:{precio:"4.50€"}
  },
  graten:{
    montaña:{
      precio:"8€",
      descripcion:"PATATAS, POLLO Y TIRAS DE BACON G. MOZZARELLA"
    },
    elOslo:{
      precio:"8€",
      descripcion:"PATATAS, CARNE PICADA Y SALSA MAGIC UNION G. MOZZARELLA"
    },
    reclette:{
      precio:"8€",
      descripcion:"PATATAS, TIRAS DE BACON Y RECLETTE G. MOZZARELLA"
    },
    pimientos:{
      precio:"8€",
      descripcion:"PATATAS, TENDERS Y PIMIENTOS G. MOZZARELLA"
    }
  },
  gratenAlGusto:{
    carnes: [
      "POLLO FRESCO/MARINADO",
      "CARNE PICADA",
      "SAN JACOBO",
      "NUGGETS DE POLLO",
      "CHICKEN TENDERS",
      "KEBAB",
      "NUGGETS VEGETARIANOS",
      "CARNE VEGETARIANA"
    ],
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
  }

};

export default menuData;
