exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("metadata")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("metadata").insert([
        {
          token_id: 1,
          name: "Halloween hat",
          collection: "Art",
          asset_id: "105234",
          image:
            "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
          external_url:
            "https://www.iconfinder.com/icons/204344/hat_halloween_witch_icon",
          description: "Super rare halloween hat for trick and treet!",
        },
        {
          token_id: 2,
          name: "Men Grey Suit",
          collection: "Art",
          asset_id: "342592",
          image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
          external_url: "http://screenr.com/q3t",
          description: "Classy suit for sale",
        },
        {
          token_id: 3,
          name: "DANVOUY Womens T Shirt Casual Cotton Short",
          collection: "Virtual Worlds",
          asset_id: "523412",
          image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
          external_url:
            "http://ewiesion.com/2011/01/21/news-from-e-learning-2-0",
          description: "Comfortable clothing, casual yet well-fit",
        },
        {
          token_id: 4,
          name: "Basketball Kobe shoes",
          collection: "Virtual Worlds",
          asset_id: "253324",
          image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
          external_url:
            "https://eportfolio.sevengardens.net/view/view.php?id=11",
          description: "Become a legend now!",
        },
        {
          token_id: 5,
          name: "Party Nails",
          collection: "Sports",
          asset_id: "521972",
          image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
          external_url:
            "http://sourceforge.net/apps/mediawiki/learningapps/index.php?title=LTI4Mahara_English",
          description: "Ready for Party? Polish your nails!",
        },
        {
          token_id: 6,
          name: "Santa Claus Hat",
          collection: "Sports",
          asset_id: "923712",
          image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
          external_url: "https://www.youtube.com/watch?v=aQeGtIzUH8Y",
          description: "Be a Santa Claus in Finland!",
        },
        {
          token_id: 7,
          name: "Jordan 3",
          collection: "Trading Cards",
          asset_id: "882861",
          image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
          external_url:
            "https://mahara.org/interaction/forum/topic.php?id=8392",
          description: "Fly Like Jordan Baby",
        },
        {
          token_id: 8,
          name: "Artsy Banksy",
          collection: "Trading Cards",
          asset_id: "821624",
          image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
          external_url: "https://mahara.org/view/view.php?id=36871",
          description: "Mural painting for sale",
        },
        {
          token_id: 9,
          name: "Picasso to the Moon",
          collection: "Exclusive Events",
          asset_id: "452152",
          image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
          external_url:
            "https://www.youtube.com/watch?v=uXWov-JGtvs&feature=youtu.be",
          description: "Reach the Moon by chanelling Picasso",
        },
        {
          token_id: 10,
          name: "PG-13",
          collection: "Exclusive Events",
          asset_id: "724511",
          image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
          external_url:
            "https://blog.branch.io/deep-linking-from-url-and-uri-schemes-to-universal-links-app-links-and-beyond/",
          description: "Dunk like PG over Birdman!",
        },
        {
          token_id: 11,
          name: "PG-14",
          collection: "Avatars",
          asset_id: "724511",
          image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
          external_url:
            "https://blog.branch.io/deep-linking-from-url-and-uri-schemes-to-universal-links-app-links-and-beyond/",
          description: "Dunk like PG over Birdman!",
        },
        {
          token_id: 12,
          name: "PG-15",
          collection: "Avatars",
          asset_id: "724511",
          image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
          external_url:
            "https://blog.branch.io/deep-linking-from-url-and-uri-schemes-to-universal-links-app-links-and-beyond/",
          description: "Dunk like PG over Birdman!",
        },
      ]);
    });
};
