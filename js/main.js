const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || []

// cria os elementos que estão no local storage
itens.forEach((elemento) => {
    criaElemento(elemento)
})

// identifica clique no botao 'adicionar'
form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    // criacao de um objeto com os valores nome e quantidade juntos
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    
    // confere se o item existe na lista
    const existe = itens.find( elemento => elemento.nome === nome.value );

    //  se o item ja esta na lista, atualiza lista, se nao cria elemento
    if (existe) {
        itemAtual.id = existe.id 

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        // criando id somando 1 ao ultimo id utlizado para evitar problemas com a exclusao
        itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0;  

        criaElemento(itemAtual);
    
        // adiciona os itens ao final da lista
        itens.push(itemAtual);
    }


    // adicionando itens no local storage
    localStorage.setItem("itens", JSON.stringify(itens));

    // esvazia o input apos adicionar
    nome.value = "";
    quantidade.value = "";
})

// funcao de criaçao do elemento
function criaElemento(item) {
    // cria o elemnto li
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    // cria o elemento strong e insere o valor quantidade dentro
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id

    // insere o elemento strong como 'child' e o nome dentro do li
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id))

    // adiciona o li/novoItem na lista de itens do site
    lista.appendChild(novoItem);


}

// atualiza valor do elemento caso ja exista
function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";
    elementoBotao.classList.add("botao-x");

    elementoBotao.addEventListener("click", function () {
        deletaElemento(this.parentNode, id);
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove();

    // remover item da lista
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    // escrever no local storage
    localStorage.setItem("itens", JSON.stringify(itens));
}