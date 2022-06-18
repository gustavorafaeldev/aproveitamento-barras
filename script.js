let todasMedidas = new Array
let todasMedidasDiminui = new Array
let listaAproveitamento = new Array
let medidas = new Array

document.querySelector('.medidas').style.display = 'none';
document.querySelector('.medidas--aproveitamento').style.display = 'none';

function limparLista() {
    todasMedidas = [];
    document.querySelector('.medidas p').innerHTML = todasMedidas;
    document.querySelector('.medidas').style.display = 'none';
    document.querySelector('.medidas--aproveitamento').style.display = 'none';
}

function addMedida() {
    let medida = document.querySelector('.controles input');
    if (medida.value <= 6000 && medida.value !=='' ) {
        let medidaInt = parseInt(medida.value);
        todasMedidas.push(medidaInt);
        document.querySelector('.medidas p').innerHTML = todasMedidas;
        document.querySelector('.controles input').value = '';
    } else {
        alert('DIGITE UMA MEDIDA VÁLIDA!')
    }; 
    document.querySelector('.medidas').style.display = 'block';
};

function enterFunc(event) {
    let keyCode = event.keyCode;
    if (keyCode === 13) {
        addMedida();
    };
};

function calculaAproveitamento() {
    todasMedidasDiminui = todasMedidas.slice(0);
    listaAproveitamento = []
    medidas = []

    let maior = 0;
    let saldo = 6000;
    let indice = '';
    while (todasMedidasDiminui.length > 0) {
        let continua = false;
        for(let med of todasMedidasDiminui) {
            if (med > maior && med <= saldo) {
                maior = med;
            };
        };
        if (maior > 0) {
            medidas.push(maior);
            indice = todasMedidasDiminui.indexOf(maior);
            todasMedidasDiminui.splice(indice, 1);
            saldo -= maior;
            maior = 0;
            continua = true;
        };
        if (continua == false || todasMedidasDiminui.length == 0) {
            listaAproveitamento.push(medidas);
            medidas = [];
            saldo = 6000;
        };
    };
    criarLista();
};

function criarLista() {
    if (todasMedidas.length > 0) {
        let elemento = document.querySelector('.lista');
    elemento.innerHTML = '';
    for (let i = 0; i < listaAproveitamento.length; i++) {
        let sobra = 6000;
        let medidas = listaAproveitamento[i].toString();
        let linha = document.createElement('tr');
        let dado = document.createElement('td');
        dado.innerHTML = i + 1;
        let dado2 = document.createElement('td');
        dado2.innerHTML = medidas;
        let dado3 = document.createElement('td');

        listaAproveitamento[i].map((item)=> {
            sobra -= item;
        })

        dado3.innerHTML = sobra;


        linha.appendChild(dado);
        linha.appendChild(dado2);
        linha.appendChild(dado3);
        elemento.appendChild(linha);
    };
        document.querySelector('.medidas--aproveitamento').style.display = 'block';
    };
    
}