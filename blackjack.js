// Building the deck
const suits = ["spades", "diamonds", "clubs", "hearts"];
const points = [1, 2, 3, 4, 5, 5, 7, 8, 8, 10, 11, 12, 13]

// Assigning arrays for Player Hand and Dealer Hand
let dealerHandArray = [];
let playerHandArray = [];

// Assigning score values for Player and Dealer
let dScore = 0;
let pScore = 0;

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

// Deal the Deck function
function dealDeck(deck) {
  dealerHandArray.push(deck.pop())
  playerHandArray.push(deck.pop())
  dealerHandArray.push(deck.pop())
  playerHandArray.push(deck.pop())
}

// Display points and keep score
function calculatePoints(array) {
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

// Build the bust function
function bust() {
  return "You lose"
  
}

// Build the hit function for Player
function hitPlayer(array) {
    const messages = document.querySelector("#messages");
    const messageDiv = document.createElement('div');
    newCard = deck.pop();
    array.push(newCard);
    if (calculatePoints(array) > 21) {
      messageDiv.innerHTML = "Player busted";
      messages.appendChild(messageDiv)
      console.log("Player busted");
      hit.removeEventListener('click', function(e){});
      return
    } else if (calculatePoints(array) == 21) {
      messageDiv.innerHTML = "Player Blackjack!";
      messages.appendChild(messageDiv)
      console.log("Player Blackjack!") 
    }
    else {
      return array;
    }
}

// Build the hit function for Dealer
function hitDealer(array) {
  const messages = document.querySelector("#messages");
  const messageDiv = document.createElement('div');
  newCard = deck.pop()
  array.push(newCard)
  if (calculatePoints(array) > 21) {
    messageDiv.innerHTML = "Dealer busted";
    messages.appendChild(messageDiv)
    console.log("Dealer busted");
    hit.removeEventListener('click', function(e){});
    return
  } else if (calculatePoints(array) == 21) {
    messageDiv.innerHTML = "Dealer Blackjack!";
    messages.appendChild(messageDiv)
    console.log("Dealer Blackjack!");
  }
  else {
    return array;
  }
}

// Build the function for checking score
function checkScore(dealer, player) {
  const messages = document.querySelector("#messages");
  const messageDiv = document.createElement('div');
  let dealerFinal = dealer;
  let playerFinal = player;

  if (dealerFinal > playerFinal && dealerFinal < 21) {
    messageDiv.innerHTML = "Dealer Wins!";
    messages.appendChild(messageDiv)
  } else if (playerFinal > dealerFinal && playerFinal < 21) {
    messageDiv.innerHTML = "Player Wins!";
    messages.appendChild(messageDiv)
  } else if (playerFinal == dealerFinal) {
    messageDiv.innerHTML = "Push 😑";
    messages.appendChild(messageDiv)
  }
}

// deal event listener
const deal = document.querySelector('#deal-button');
deal.addEventListener('click', function(e){
  let dealerHand = document.querySelector("#dealer-hand");
  let playerHand = document.querySelector("#player-hand");
  let dealerPoints = document.querySelector("#dealer-points");
  let playerPoints = document.querySelector("#player-points");
  let messages = document.querySelector("#messages");
  if (dealerPoints.innerHTML == "") {
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
    dealerScore = renderScore(calculatePoints(dealerHandArray));
    playerScore = renderScore(calculatePoints(playerHandArray));
    dealerPoints.innerHTML = dealerScore;
    playerPoints.innerHTML = playerScore;
  }
  else if (dealerPoints.innerHTML != "") {
    dealerHand.innerHTML = "";
    playerHand.innerHTML = "";
    dealerPoints.innerHTML = "";
    playerPoints.innerHTML = "";
    messages.innerHTML = "";
    dealerHandArray = [];
    playerHandArray = [];
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
    dealerScore = renderScore(calculatePoints(dealerHandArray));
    playerScore = renderScore(calculatePoints(playerHandArray));
    dealerPoints.innerHTML = dealerScore;
    playerPoints.innerHTML = playerScore;
  }
});

const hit = document.querySelector('#hit-button');
hit.addEventListener('click', function(e){
  const playerHand = document.querySelector("#player-hand");
  const dealerHand = document.querySelector("#dealer-hand");
  const dealerPoints = document.querySelector("#dealer-points");
  const playerPoints = document.querySelector("#player-points");
  hitPlayer(playerHandArray)
  const cardImagePlayer = document.createElement('img');
  cardImagePlayer.src = getCardImageURL(playerHandArray[playerHandArray.length - 1])
  playerHand.appendChild(cardImagePlayer)
  playerScore = renderScore(calculatePoints(playerHandArray));
  playerPoints.innerHTML = playerScore;
});

const stand = document.querySelector('#stand-button');
stand.addEventListener('click', function(e){
  const dealerPoints = document.querySelector("#dealer-points");
  const dealerHand = document.querySelector("#dealer-hand");
  console.log("stand")
  console.log(calculatePoints(dealerHandArray))
  while (calculatePoints(dealerHandArray) <= 17) {
    hitDealer(dealerHandArray)
    const cardImageDealer = document.createElement('img');
    cardImageDealer.src = getCardImageURL(dealerHandArray[dealerHandArray.length - 1])
    dealerHand.appendChild(cardImageDealer)
    dealerScore = renderScore(calculatePoints(dealerHandArray));
    dealerPoints.innerHTML = dealerScore;
  }
  checkScore(calculatePoints(dealerHandArray), calculatePoints(playerHandArray))
});

// console.log(getDeck())

