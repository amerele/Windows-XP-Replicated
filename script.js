let tabela = document.querySelector("#tabela");
let reiniciar = document.querySelector("#restart");
let dif = document.querySelector("#diff");
let fechar = document.querySelector(".exit");
let abrir = document.querySelector('.app');

let modelo = [];
let dificuldade = [];

const init = (dificuldade) => {
  tabela.onclick = clicar;
  tabela.oncontextmenu = bandeirinha;
  novoJogo();
  criarBombas();
  gerarNumeros();
  console.log(modelo);
};

const novoJogo = () => {
  let tbody = "";
  //gerando tabela html
  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      tbody += "<td></td>";
    }
    tbody += "</tr>";
  }
  tabela.innerHTML = tbody;
  //gerando matriz-modelo
  for (let i = 0; i <= linhas; i++) {
    modelo[i] = new Array(colunas).fill(0);
    tbody += "<tr>";
  }
};
const criarBombas = () => {
  for (let i = 0; i <= bombas; i++) {
    let x = Math.floor(Math.random() * linhas);
    let y = Math.floor(Math.random() * colunas);
    modelo[x][y] = -1;
  }
};
const aumentarArredores = (x, y) =>{
    var count = 0;
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (i >= 0 && i < linhas && j >= 0 && j < colunas) {
                if (modelo[i][j] == -1) {
                    count++;
                }
            }
        }
    }
    modelo[x][y] = count;
}
const gerarNumeros = () =>{
    for (let i = 0; i <= linhas; i++) {
        for (let j = 0; j <= colunas; j++) {
            if (modelo[i][j] != -1) {
                aumentarArredores(i, j);
            }
        }
    }
}

const mostrarBombas = () => {
  tabela.onclick = undefined;
  tabela.oncontextmenu = undefined;
  event.target.style.background = "red";
  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      if (modelo[i][j] == -1) {
        let tembomba = tabela.rows[i].cells[j];
        tembomba.innerHTML = "&#128163;";
      }
    }
  }
};
const checarNulos = (x, y) => {
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i >= 0 && i < linhas && j >= 0 && j < colunas) {
        cell = tabela.rows[i].cells[j];
        if (cell.className !== "nulo") {
          switch (modelo[i][j]) {
            case -1:
              break;
            case 0:
              cell.className = "nulo";
              checarNulos(i, j);
              break;
            default:
              cell.innerHTML = modelo[i][j];
              cell.className = "n"+modelo[i][j];
          }
        }
      }
    }
  }
};
const clicar = (event) => {
  var square = event.target;
  var x = square.parentNode.rowIndex;
  var y = square.cellIndex;

  switch (modelo[x][y]) {
    case -1:
      mostrarBombas();
      break;
    case 0:
      checarNulos(x,y);
      break;
    default:
      square.innerHTML = modelo[x][y];
      square.className = "n"+modelo[x][y];
      break;
  }
};
const bandeirinha = (event) =>{
  var square = event.target;
  if (square.className == "bandeira"){
    square.innerHTML = "";
    square.className = "";
  } else {
    square.className = "bandeira";
    square.innerHTML = "&#127988"
  } 
  return false;
}
const changedif = () =>{
  switch(dif.value){
    case "normal":
      dificuldade = [linhas = 10, colunas = 10, bombas = 15];
      break;
    default:
      dificuldade = [linhas = 15, colunas = 15, bombas = 30];
    }
  init(dificuldade);
}

fechar.onclick = () =>{
  document.querySelector('.cont').style.display = 'none'
  document.querySelector('.minesweeper').style.display = 'none'
  abrir.style.display = 'flex'
}
abrir.ondblclick = () =>{
  abrir.style.display = 'none'
  document.querySelector('.cont').style.display = 'block'
}
reiniciar.onclick = changedif;
onload = changedif;
