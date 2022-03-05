const cards = document.querySelector(".cards");
const nextPage = document.querySelector(".next");
const backPage = document.querySelector(".back");

const pagination = { //Faz a paginação dos cards
  page: 1,
  pageItensShow: 9,

  next: () => {
    pagination.page++;
  },
  back: () => {
    pagination.page--;
  },
};

function fillCards() { //Preenche os cards com as infos dos pokemons e retorna o card completo
  divitens = document.createElement("div");
  divitens.setAttribute("class", "itens");
  let cardComplete = cards.appendChild(divitens);
  return cardComplete;
}

async function createElements(element) { //
  fillCards()
  
  let name = element.name.english;
  let Hp = element.base.HP;
  let attack = element.base.Attack;
  let defense = element.base.Defense;
  let speed = element.base.Speed;
  let image = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${fixZero(element.id)}.png`;

  createNames(name);
  createHp(Hp);
  createAttack(attack);
  createDeffense(defense);
  createSpeed(speed);
  setImages(image);
}

async function cardsPoke(action) {
  try {
    const resultPoke = await fetch("https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json");
    const resultJSON = await resultPoke.json();

    let page = pagination.page - 1;
    let start = page * pagination.pageItensShow;
    let end = start + pagination.pageItensShow

    cards.innerHTML = "";
    let sli = resultJSON.slice(start, end);
  
    sli.forEach(createElements);
    action === "next" ? pagination.next() : pagination.back()

  } catch (error) {
    console.log(error, "Ocorreu um erro inesperado");
  }
}


cardsPoke('next');
nextPage.addEventListener("click", () => cardsPoke("next"));
backPage.addEventListener("click", () => cardsPoke("back"));

function fixZero(zero) {
  return zero < 10 ? "00" + zero : "0" + zero && zero > 100 ? zero : "0" + zero;
}

function createNames(name) {
  const pName = document.createElement("p");
  pName.setAttribute("class", "name");
  pName.innerHTML = name;
  divitens.appendChild(pName);
}

function createHp(Hp) {
  const pHp = document.createElement("p");
  pHp.setAttribute("class", "hp");
  pHp.innerHTML = `HP: ${Hp}`;
  divitens.appendChild(pHp);
}

function createAttack(attack) {
  const pAttack = document.createElement("p");
  pAttack.setAttribute("class", "attack");
  pAttack.innerHTML = `ATTACK: ${attack}`;
  divitens.appendChild(pAttack);
}

function createDeffense(defense) {
  const pDefense = document.createElement("p");
  pDefense.setAttribute("class", "defense");
  pDefense.innerHTML = `DEFENSE: ${defense}`;
  divitens.appendChild(pDefense);
}

function createSpeed(speed) {
  const pSpeed = document.createElement("p");
  pSpeed.setAttribute("class", "speed");
  pSpeed.innerHTML = `SPEED: ${speed}`;
  divitens.appendChild(pSpeed);
}

function setImages(image) {
  const img = document.createElement("img");
  img.setAttribute("src", image);
  divitens.appendChild(img);
}


