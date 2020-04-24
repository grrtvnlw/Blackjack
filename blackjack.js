// Building the deck
const suits = ["spades", "diamonds", "clubs", "hearts"];
const points = [1, 2, 3, 4, 5, 5, 7, 8, 8, 10, 11, 12, 13]

// function to create our deck
function makeDeck() {
  let deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < points.length; j++) {
      const card = {point: points[j], suit: suits[i]};
      deck.push(card);
    }
  }

  return deck;
}

// shuffle function built using the Fisher-Yates Shuffle algorithm
function shuffle(array) {
  let currentIndex = array.length, tempValue, randomIndex;

  // while the array is not empty
  while (0 != currentIndex) {
    // choose a random index
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // swap random element with the current element
    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }

  return array;

}

let deck = makeDeck()
console.log(deck);
shuffle(deck);
console.log(deck);
let dealerHandArray = [];
let playerHandArray = [];

const deal = document.querySelector('#deal-button');
deal.addEventListener('click', function(e){
  console.log(e);
  const dealerHand = document.querySelector("#dealer-hand");
  const playerHand = document.querySelector("#player-hand");
  const currentCard = deck[Math.floor(Math.random() * deck.length)]
  const cardInHand = deck.pop(currentCard)
  console.log(cardInHand)
  const cardImageOne = document.createElement('img');
  const cardImageTwo = document.createElement('img');
  const cardImageThree = document.createElement('img');
  const cardImageFour = document.createElement('img');
  cardImageOne.setAttribute('src', "/images/5_of_spades.png")
  cardImageTwo.setAttribute('src', "/images/king_of_diamonds.png")
  cardImageThree.setAttribute('src', "/images/8_of_clubs.png")
  cardImageFour.setAttribute('src', "/images/9_of_diamonds.png")
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
  cardImage.setAttribute('src', "/images/jack_of_clubs2.png")
  playerHand.appendChild(cardImage)
  // dealerHand.appendChild(cardImage)
})

// console.log(getDeck())

// Deal the Deck


// Get Image
function getCardImageURL(card) {

}