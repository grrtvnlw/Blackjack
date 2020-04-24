// Building the deck
const suits = ["spades", "diamonds", "clubs", "hearts"];
const points = [1, 2, 3, 4, 5, 5, 7, 8, 8, 10, 11, 12, 13]

// Assigning arrays for Player Hand and Dealer Hand
let dealerHandArray = [];
let playerHandArray = [];

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
  let currentIndex = array.length;
  let randomIndex = 0;
  let tempValue = 0;

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

// build function for getting a card image URL
function getCardImageURL(card) {
  if (card.point < 2) {
    // console.log `images/ace_of_${card.suit}.png`
    return `/images/ace_of_${card.suit}.png`;
  } else if (card.point <= 10) {
    // console.log(card.suit, card.point);
    return `/images/${card.point}_of_${card.suit}.png`;
  } else if (card.point == 11) {
    // console.log(card.suit, card.point);
    return `/images/jack_of_${card.suit}.png`;
  } else if (card.point == 12) {
    // console.log(card.suit, card.point);
    return `/images/queen_of_${card.suit}.png`;
  } else if (card.point == 13) {
    // console.log(card.suit, card.point);
    return `/images/king_of_${card.suit}.png`;
  }
}

// build a render function for rendering the card image
function renderImage(url) {
  return `
    <div class="image">
      <img src='${url}' />
    </div>
  `
}

// build a render function for rendering the point total
function renderScore(score) {
  return `
    <div class="score">
      ${score}
    </div>
  `
}

// testing area
let deck = makeDeck();
console.log(deck);
shuffle(deck);
console.log(deck[2]);
// let url = getCardImageURL(deck[2]);
// console.log(url);
// const test = document.querySelector('#messages');
// test.innerHTML = renderImage(url);

// Deal the Deck function
function dealDeck(deck) {
  dealerHandArray.push(deck.pop())
  playerHandArray.push(deck.pop())
  dealerHandArray.push(deck.pop())
  playerHandArray.push(deck.pop())
}


// Display points and keep score
function scoreKeeper(array) {
  let score = 0;
  array.forEach(function (card) {
    if (card.point >= 10) {
      score += 10
    } else {
      score += card.point;
    }
  })
  return score;
}

console.log(playerHandArray)
console.log(dealerHandArray)

// Build the hit function
function hitMe(deck) {

}

// deal event listener
const deal = document.querySelector('#deal-button');
deal.addEventListener('click', function(e){
  const dealerHand = document.querySelector("#dealer-hand");
  const playerHand = document.querySelector("#player-hand");
  const dealerScore = document.querySelector("#dealer-points");
  const playerScore = document.querySelector("#player-points");
  dealDeck(deck)
  const cardImageOne = document.createElement('img');
  const cardImageTwo = document.createElement('img');
  const cardImageThree = document.createElement('img');
  const cardImageFour = document.createElement('img');
  cardImageOne.src = getCardImageURL(dealerHandArray[0])
  cardImageTwo.src = getCardImageURL(dealerHandArray[1])
  cardImageThree.src = getCardImageURL(playerHandArray[0])
  cardImageFour.src = getCardImageURL(playerHandArray[1])
  dealerHand.appendChild(cardImageOne)
  dealerHand.appendChild(cardImageTwo)
  playerHand.appendChild(cardImageThree)
  playerHand.appendChild(cardImageFour)
  dealerScore.innerHTML = renderScore(scoreKeeper(dealerHandArray));
  playerScore.innerHTML = renderScore(scoreKeeper(playerHandArray))
})

const hit = document.querySelector('#hit-button');
hit.addEventListener('click', function(e){
  const playerHand = document.querySelector("#player-hand");
  const dealerHand = document.querySelector("#dealer-hand");
  // const cardImage = renderImage(getCardImageURL(deck[2]))

  const cardImage = document.createElement('img');
  cardImage.src = getCardImageURL(deck[4])
  // cardImage.setAttribute('src', "/images/jack_of_clubs2.png")
  // playerHand.innerHTML = cardImage;
  playerHand.appendChild(cardImage)
  dealerHand.appendChild(cardImage)
})

// console.log(getDeck())




// Get Image