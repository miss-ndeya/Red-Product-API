const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());

// _______________________________________
// Ajout des headers pour éviter des erreurs
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

const hotelRoutes = require("./routes/hotel");
app.use("/api/hotels", hotelRoutes);

const userRoutes = require("./routes/user");
app.use("/api/auth", userRoutes);

const path = require("path");
app.use("/images", express.static(path.join(__dirname, "images")));

mongoose
  .connect(
    "mongodb+srv://miss-ndeya:ab1eva30@cluster0.vkdj52n.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.error("Connexion à MongoDB échouée !", err));

module.exports = app;

// app.get('/api/hotels', (req, res, next) => {
//     // const hotels = [
//     //   {
//     //     _id: 'oeihfzeoi',
//     //     title: 'Mon premier objet',
//     //     description: 'Les infos de mon premier objet',
//     //     imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//     //     price: 4900,
//     //     userId: 'qsomihvqios',
//     //   },
//     //   {
//     //     _id: 'oeihfzeomoihi',
//     //     title: 'Mon deuxième objet',
//     //     description: 'Les infos de mon deuxième objet',
//     //     imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//     //     price: 2900,
//     //     userId: 'qsomihvqios',
//     //   },
//     // ];
//     const hotels = [
//         {
//           imageUrl:
//             "https://s3-alpha-sig.figma.com/img/2ace/93dd/d9dc9cfc7b2bd9d9a279634ee238b1c0?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CSc8H2q9w38KJzxWERnLckfSXn3ivnwkbj3goxThtaHeVlqa0wcjnEkqYJjFtbRjhBJ594GBcqYHSSgc~19Qh9LRzFG3FBCluc75pm-wIEwm6TUJtwdhDHXjfUhpvc4m2GnCs444ddGW6CYLy4ud4kmIW8xu9KBeTD-VQih92vrVGJBYSBUkRDpVT2ELRkKLHteede~z7VSdWci8q1wpzW4URQ5siw6RCA6Xe03K1RA81mQVGrzmTvRUTKMeBaNnZBe0xeE-zEaYeXZJj95IrWHVaWAzpAm64coU09pS-e0wVCAgTx4EMNEsnUTfIVJKnfV-kYvjqWmrsrTA8rMPig__",
//           address: "Boulevard Martin Luther King Dakar, 11500",
//           namehotel: "Hôtel Terrou-Bi",
//           price: 25000 ,
//           userId: 'qsomihvqios',
//           devise: " XOF par nuit",        },
//         {
//           imageUrl:
//             "https://s3-alpha-sig.figma.com/img/7b8b/867f/f42dd9b09b585c713f1faaf1e9d5efa9?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FC~71MpZHk5XuGaHnnAu0FmKksnptQSfjRDXvL-a2oSFo9c94wMm7-ZXDONhTh3J2hzeQInTaojSllIN8VSSXKR~-QHmpObhzxQ4bKXtmf7YBn6dM5Vo4oTF9~39OL5NQ0mzDpbIBbSh~B0PWOnSLMoiuTebBXpiJOi6UaxqAbFaQ8Ena72LDSS7j-qS0rkrXn-EiRcNe3QWAi0oho6lcMaRsLI1lyvNPnjHzpB3oZEabHzA~18xkpIMWTJQ4OGk721hsU1OF3V0eY77nB7Ysh6zNa3RayabJO-kt-HAVcrhXzJPeLRyuK2LE2VnrUw8w2iLba1suZ92xa8d~kwumg__",
//           address: "Rte des Almadies, Dakar",
//           namehotel: "King Fahd Palace",
//           price: 20000 ,
//           userId: 'qsomihvqios',
//           devise: " XOF par nuit"
//         },
//         {
//           imageUrl:
//             "https://s3-alpha-sig.figma.com/img/f9c7/1de4/bc8679a33e4414f8a5da273c04b95cbb?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VMt8t9mrlWpvux~fTM-YVSmenCI22Et7Ts3nArx07d1TfXX9nWt7rV3Ehq9LoVrjCV3voTPoz1JlkvoEWVMdcOE0TK4jOvUKRCbapsjjXpVBctr82bC42lzli9TxgRAi5JM0ky0BZttM6Ocv0krZ8yk96kHjISsBaIVT7fG~hrlrVF3lXq-Nmr~eLVc6yk6OzDCj804saZdMQNRgh3LZNEe26LUCVyCuAjZ2AgI5uMsc1ZnLgfw1CoU8vpwcfnBxqFu3sTs0oI-nNwdj3bros5VQ5yXuHdFW82OlwJbQ2lZRgylT7aDbHMQScQPB4WVwL2Zu~E2-YSaXBK42sbkERg__",
//           address: "Rte de la Corniche O, Dakar 16868",
//           namehotel: "Radisson Blu Hotel",
//           price: 22000 ,
//           userId: 'qsomihvqios',
//           devise: " XOF par nuit"
//         },
//         {
//           imageUrl:
//             "https://s3-alpha-sig.figma.com/img/c7ad/a3dc/7f94b97e81de5166530f7716e3ac4fda?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jeY3yesGmrkNBClSdUKkrUwftvY57UwFkxDEWBkucEuAVBKo-1nvknJwHirpdg19oajxD8MeWF8XTCfbvSTxAAWZbwjwho6FmRTEg3OHLQL5Yrl6Iw4PfOGfOQPtfrn8x0w4e7kFE05NpEcnmks54LoOBJFzt6zj1ZPG~goxfwdQwEnucQjzDYjZjzZE82ZF1jzy2bFQUCTv9alUpe2yOFpUUlH~wKNlSiHmAoMsElTHVrla1e420Jz1W28BfWciDgUlEMKF7oUFYPToUznKdwM-eHEcY4yaND9FuaTkrpKRl9S4rL-K~Zw8PsdMEpiOiv4tOV7BbhoL5mRVjJS~bw__",
//           address: "Place de l'Independance, 10 Rue PL 29, Dakar",
//           namehotel: "Pullman Dakar Teranga",
//           price: 30000 ,
//           userId: 'qsomihvqios',
//           devise: " XOF par nuit"
//         },
//         {
//           imageUrl:
//             "https://s3-alpha-sig.figma.com/img/7aa3/fa98/a5c573e7a6a70708802dac0779ef4cc6?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SvQk5rXkUCUeNP8UJkWc~Djj2f6Q2JZi5UD6COYOMOzUNh-OpRPHsmajUQFYeCK0VkmsH5RL1jsiUzQyMtcnaZJObNnEYJxCC55-6ScvpB75~bJ9d8Q3bsQDdD4RrKd6pNhUffwybIwfhhjeAdpQWMwuFg76z~zobEKDTOlNNcZiiE660Pe0H54vWaIqvTVCmPzp~-p5shgLJjyd7KcW2byf8x~j3s4AGN4CoiLCJg1QO5niw~NmisZgJTfkkjiXrmoWkM9PS4tcRRiMSvTxVboX~I-BtBQpaOAOpkxR3XQBnBoPMglhk~ckN3pzW9WK-GdQLdgOpLzrk0qeXMvHkw__",
//           address: "Hôtel Lac Rose",
//           namehotel: "Lac Rose, Dakar",
//           price: 25000,
//           userId: 'qsomihvqios',
//           devise: " XOF pa nuit",
//         },
//         {
//           imageUrl:
//             "https://s3-alpha-sig.figma.com/img/e2f0/475c/b31fc8aaa791f94943e72ebe5afef4fc?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qQCqgjynyVuGbXucHZbZPU3c~FaKadsoEtsxm~57H-mrAZrweLnW1CUwaeF6Qji~-114w~K8wAwT-ypZaMBoQ2QTplZBIjEkUaWogIex2SCiRFEPcYFc-4Zntk3n0Apowd2MSYEQYl~85dBogNgIKj8JSGXGaeiz6D8Sq58iybSBMoyTLvVgGUkKBCBlIjOwUeU5O8TPi9kz6KT7eoPH9HqfNowwP53YMrkJwY4EETgtCHvh0ZyAj8lVtV8ebVXk41juOSqIvZLiVUTmD2EeEKVc94lby4m9xl25AsU8Ys05X1IrMalPhJOPkMv774yJFe9Xf2fcxx3zzA6moyGQCw__",
//           address: "Mbour, Sénégal ",
//           namehotel: "Hôtel Saly",
//           price: 20000,
//           userId: 'qsomihvqios',
//           devise: " XOF par nuit"
//         },
//         {
//           imageUrl:
//             "https://s3-alpha-sig.figma.com/img/e480/cb32/120fa58c6a70bd87d0dc0eabfcb5fd43?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NuEbH1n8gc6FJ~0lGxX3Wzcch6JrwdznChqtjmTp-RCriutXt3EV6EG4McCzuRUpyT9YRvsJC9Tjv2Oeza6JQMpBkytS~4dc-lhis7GH0x5nQUlqSiu3HDvxm3-wJ3viQd8ARKpk0hJXJkbf-Sfx0RWkEDUSo2eKsK00uqahxhr85U~KgEnPXgHXCyGTkf2IK3OJ1tJOPT7XV1DnLO6Tq5EyGfSpr7HTMARlFpl~7c-zAKHIMFQTiAI9Pee0GfabKOLE3h43ED8hmw9OOOal6JnDDaYCk1TAD2vRLVl3kVrPHxc1m6k5xk~dUiHMxzKSnMCp0zWU~uhZfiBS10V9wA__",
//           address: "BP64, Saly 23000",
//           namehotel: "Palm Beach Resort & Spa",
//           price: 22000,
//           userId: 'qsomihvqios',
//           devise: " XOF par nuit"
//         },
//         {
//           imageUrl:
//             "https://s3-alpha-sig.figma.com/img/c2da/843a/742c66e1b32bac5a3423f97769ec294e?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OEBYDcid32Vbyvqoy7f82onmQdrUHSnlt0gnDEGylIG3E6wNjz7VLBibLMz7iHW5o4fJ3h9kBe5BZXdzkuS~pdItL44Y1e6uHRLiyshVTzVkWNIy9D05UAcscWq-ljEzvY62-AOGIVZm7nCBrBldj6wDM47aQM24FEEJr~RnYpJQP3ugOzExLRFGEnL-mevbm7TVKf90fHqdedySvO5YLrkicVzDQJx4Fv8HD41a~9dExfaRawf6Tr~EErNWd6VYQUjWtWg8590oi7jsSITnc9smW-1hiN4I0cPD-x4lSTN-mha68~50VO-XDAJ2KfAucjdeB02p3cRgUe4g5ur-gg__",
//           address: "Place de l'Independance, 10 Rue PL 29, Dakar",
//           namehotel: "Pullman Dakar Teranga",
//           price: 30000,
//           userId: 'qsomihvqios',
//           devise: " XOF par nuit"
//         },
//       ];
//     res.status(200).json(hotels);
//   });
