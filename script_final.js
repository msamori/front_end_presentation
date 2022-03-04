// loadPoems() searchs poetry.com api for a phrase.
// poemOfTheDay(), poemADay(), poetryDaily() display iframe with appropriate url to poetry site.
// clock() displays the clock in hh:mm:ss format.
// dealCards() pulls three unique tarot card images and displays them.
// replaceFirstCard(), replaceSecondCard(), replaceThirdCard() hide the respective img and set src to empty string.
// moon() calculates moon phase. most of this code is from: https://jasonsturges.medium.com/moons-lunar-phase-in-javascript-a5219acbfe6e.

async function loadPoems() {
	document.getElementById("window").style.display = "none";
	let searchTerm = document.getElementById("searchTerm").value;
	let url = `https://www.abbreviations.com/services/v2/poetry.php?uid=10060&tokenid=JKyFBYJ3L7Xqy092&term=${searchTerm}&format=json`;

	const response = await fetch(url);
	const RickandMorty = await response.json();

	let output = ``;
	for (let i = 0; i < RickandMorty["result"].length; i++) {
		let work = RickandMorty["result"][i];
		let title = work["title"];
		let poet = work["poet"];
		let test = work["poem"];
		let result = (title + "\n\n" + "by " + poet + "\n\n" + test);
		output += (result + "\n\n" + "------------------------------------------------------------" + "\n\n");
	}

	document.getElementById("search").innerText = output;
	document.getElementById("search").style.display = "flex";
	document.getElementById("searchTerm").value = '';
}


function poemOfTheDay() {
	const window = document.getElementById("window");
	let url = "https://www.poetryfoundation.org/poems/poem-of-the-day";
	window.src = url;
	window.style.display = "flex";
	document.getElementById("search").style.display = "none";
}

function poemADay() {
	const window = document.getElementById("window");
	let url = "https://poets.org/poem-a-day";
	window.src = url;
	window.style.display = "flex";
	document.getElementById("search").style.display = "none";
}

function poetryDaily() {
	const window = document.getElementById("window");
	let url = "https://poems.com/todays-poem/";
	window.src = url;
	window.style.display = "flex";
	document.getElementById("search").style.display = "none";
}

function clock() {

	function leadingZero(num) {
		if (num < 10) num = "0" + num;
		return num;
	}

	const TIME = new Date();
	let h = leadingZero(TIME.getHours());
	let m = leadingZero(TIME.getMinutes());
	let s = leadingZero(TIME.getSeconds());
	let display = h + ":" + m + ":" + s;
	document.getElementById("myClock").innerText = display;
	setTimeout(clock, 1000);
}

function dealCards() {
	let card1 = document.getElementById("card1");
	let card2 = document.getElementById("card2");
	let card3 = document.getElementById("card3");
	let layout = new Set();
	let deckKeys = [...Array(77).keys()];
	let numCards = 0;

	while (numCards != 3) {
		let randomKey = deckKeys[Math.floor(Math.random() * deckKeys.length)];
		let randomCard = `https://gfx.tarot.com/images/site/decks/marseilles/full_size/${randomKey}.jpg`
		layout.add(randomCard);
		numCards = layout.size;
	}

	let cards = [...layout];
	card1.src = cards[0];
	card2.src = cards[1];
	card3.src = cards[2];

	card1.style.display = "flex";
	card2.style.display = "flex";
	card3.style.display = "flex";
}

function replaceFirstCard() {
	card1.style.display = "none";
	card1.src = '';
}

function replaceSecondCard() {
	card2.style.display = "none";
	card2.src = '';
}

function replaceThirdCard() {
	card3.style.display = "none";
	card3.src = '';
}

function moon() {
  
  let inputDate = '';
  
  if (document.getElementById("phaseDate").value == 0){
    inputDate = new Date();
  }
  else{
    inputDate = new Date(String(document.getElementById("phaseDate").value));
  }

	function getJulianDate(inputDate) {
		const time = inputDate.getTime();
		const tzoffset = inputDate.getTimezoneOffset()

		return (time / 86400000) - (tzoffset / 1440) + 2440587.5;
	}

	const LUNAR_MONTH = 29.530588853;
	function getLunarAge(inputDate) {
		const percent = getLunarAgePercent(inputDate);
		const age = percent * LUNAR_MONTH;

		return age;
	}

	function getLunarAgePercent(inputDate) {

		return normalize((getJulianDate(inputDate) - 2451550.1) / LUNAR_MONTH);
	}

	function normalize(value) {
		value = value - Math.floor(value);
		if (value < 0) value = value + 1;

		return value;
	}

	function getLunarPhase(inputDate){
		const age = getLunarAge(inputDate);
		let phase ='';
		if (age < 1.84566) phase = "https://tidesandcurrents.noaa.gov/images/astronomical/newsmall.gif";
		else if (age < 5.53699) phase = "https://tidesandcurrents.noaa.gov/images/astronomical/waxcresm.jpg";
		else if (age < 9.22831) phase = "https://tidesandcurrents.noaa.gov/images/astronomical/firstqm.jpg";
		else if (age < 12.91963) phase = "https://tidesandcurrents.noaa.gov/images/astronomical/waxgibm.jpg";
		else if (age < 16.61096) phase = "https://tidesandcurrents.noaa.gov/images/astronomical/fullm.jpg";
		else if (age < 20.30228) phase = "https://tidesandcurrents.noaa.gov/images/astronomical/wangibm.jpg";
		else if (age < 23.99361) phase = "https://tidesandcurrents.noaa.gov/images/astronomical/lastqm.jpg";
		else if (age < 27.68493) phase = "https://tidesandcurrents.noaa.gov/images/astronomical/wancresm.jpg";
		else phase = "https://tidesandcurrents.noaa.gov/images/astronomical/newsmall.gif";

		return phase;
	}

	document.getElementById('moonPic').src = getLunarPhase(inputDate);
  
}