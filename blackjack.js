// const button = document.querySelector('.buttons');
// button.addEventListener('click', function(e){
//   console.log(e);
// })
const deal = document.querySelector('#deal-button');
deal.addEventListener('click', function(e){
  console.log(e);
  const dealerHand = document.querySelector("#dealer-hand");
  const playerHand = document.querySelector("#player-hand");
  const cardImageOne = document.createElement('img');
  const cardImageTwo = document.createElement('img');
  const cardImageThree = document.createElement('img');
  const cardImageFour = document.createElement('img');
  cardImageOne.setAttribute('src', "/images/QS.jpg")
  cardImageTwo.setAttribute('src', "/images/5C.jpg")
  cardImageThree.setAttribute('src', "/images/4H.jpg")
  cardImageFour.setAttribute('src', "/images/QD.jpg")
  dealerHand.appendChild(cardImageOne)
  dealerHand.appendChild(cardImageTwo)
  playerHand.appendChild(cardImageThree)
  playerHand.appendChild(cardImageFour)
})

const hit = document.querySelector('#hit-button');
hit.addEventListener('click', function(e){
  const playerHand = document.querySelector("#player-hand");
  // const dealerHand = document.querySelector("#dealer-hand");
  const cardImage = document.createElement('img');
  cardImage.setAttribute('src', "/images/4H.jpg")
  playerHand.appendChild(cardImage)
  // dealerHand.appendChild(cardImage)
})

// Building the deck
var suits = ["spades", "diamonds", "clubs", "hearts"];
var points = [1, 2, 3, 4, 5, 5, 7, 8, 8, 10, 11, 12, 13]

function getDeck() {
  let deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < points.length; j++) {
      let card = {point: points[j], suit: suits[i]};
      deck.push(card);
    }
  }

  return deck;
}

console.log(getDeck())