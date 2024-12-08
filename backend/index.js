const express = require("express");
const mongoose = require("mongoose");
const dishes = require("./routes/dishesRoutes");
const user = require("./routes/userRoutes");
const cors = require("cors");
const app = express();
const port = 3001;

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello World",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"], //files containing annotation as above
};

const openapiSpecification = swaggerJsdoc(options);

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log("Time :", Date.now());
  next();
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/foodApp53");
  console.log("Database Connected");
}
main().catch((err) => console.log(err));

// const Cat = mongoose.model("Cat", { name: String });

// const Kitty = new Cat({ name: "Zildjian" });
// Kitty.save().then(() => console.log("meowww"));

// const Kitty2 = new Cat({ name: "Bella" });
// Kitty2.save().then(() => console.log("Meowwwwwww"));

// Cat.find().then((kittens) => {
//   console.log(kittens);
// });

app.use("/api", dishes);
app.use("/api", user);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// app.get("/dishes", (req, res) => {
//   res.send([
//     {
//       id: 11,
//       name: "Dosa",
//       img: "https://pipingpotcurry.com/wp-content/uploads/2020/11/Dosa-recipe-plain-sada-dosa-Piping-Pot-Curry.jpg",
//       category: "food",
//       price: 270,
//       quantity: 0,
//     },
//     {
//       id: 7,
//       name: "Idli/Sambhar",
//       img: "https://vaya.in/recipes/wp-content/uploads/2018/02/Idli-and-Sambar-1.jpg",
//       category: "food",
//       price: 180,
//       quantity: 0,
//     },
//     {
//       id: 8,
//       name: "Dal Makhni",
//       img: "https://recipes.timesofindia.com/thumb/53097626.cms?width=1200&height=900",
//       category: "food",
//       price: 180,
//       quantity: 0,
//     },

//     {
//       id: 9,
//       name: "Cold Coffee",
//       img: "https://www.vegrecipesofindia.com/wp-content/uploads/2021/04/cold-coffee-recipe-2.jpg",
//       category: "beverages",
//       price: 80,
//       quantity: 0,
//     },
//     {
//       id: 10,
//       name: " Tea",
//       img: "https://static.toiimg.com/photo/83173328.cms",
//       category: "beverages",
//       price: 30,
//       quantity: 0,
//     },

//     {
//       id: 2,
//       name: " Coke",
//       img: "https://5.imimg.com/data5/SELLER/Default/2021/12/MI/CM/OC/26602448/300-ml-coke-original-500x500.jpg",
//       category: "beverages",
//       price: 55,
//       quantity: 0,
//     },
//     {
//       id: 3,
//       name: "Lassi",
//       img: "https://pipingpotcurry.com/wp-content/uploads/2021/05/Lassi-in-a-glass.jpg",
//       category: "beverages",
//       price: 90,
//       quantity: 0,
//     },
//     {
//       id: 12,
//       name: "Milk",
//       img: "https://m.media-amazon.com/images/I/61lzZAgOCzL.jpg",
//       category: "beverages",
//       price: 40,
//       quantity: 0,
//     },

//     {
//       id: 5,
//       name: "Tandoori Platter",
//       img: "https://images.slurrp.com/prod/recipe_images/better-butter/tandoori-paneer-platter_HX3XOHVHLY0WD9AXFZZG.webp?impolicy=slurrp-20210601&width=1200&height=675",
//       category: "food",
//       price: 295,
//       quantity: 0,
//     },
//     {
//       id: 6,
//       name: "Naan",
//       img: "https://static.toiimg.com/thumb/53338316.cms?width=1200&height=900",
//       category: "food",
//       price: 20,
//       quantity: 0,
//     },
//     {
//       id: 13,
//       name: "Paneer Butter Masala",
//       img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT5kecc5mebmjSS-CrZAKaa_RUwoFa5NOuwg&usqp=CAU",
//       category: "food",
//       price: 240,
//       quantity: 0,
//     },
//     {
//       id: 14,
//       name: "Gol Gappe",
//       img: "https://static.toiimg.com/photo/75107900.cms",
//       category: "food",
//       price: 60,
//       quantity: 0,
//     },
//   ]);
// });
