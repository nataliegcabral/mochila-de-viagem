const form = document.querySelector('#novoItem')
const lista = document.querySelector('#lista')
const itens = JSON.parse(localStorage.getItem('itens')) || []

itens.forEach( (elemento) => {
    criaElemento(elemento)
})

form.addEventListener('submit', (evento) => {
    evento.preventDefault()
    //previnir de enviar para a própria página, que tá como padrão

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome === nome.value)

        const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;
        //lê-se como: se não existe nada no array, o id é 0, se tiver algo no id, quero achar no úlitmo elemento, o id e adicionar 1 a ele
        //operador ternário (?): se positivo (primeira condição) ? : se negativo (segunda posição) 

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }



    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = "";
    quantidade.value = "";
})

function criaElemento(item) {

    const novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)

    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)
    
    
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}


function botaoDeleta(id) {
    const elementoBotao = document.createElement('button')
    elementoBotao.innerText = 'x'

    elementoBotao.addEventListener('click', function() {
        deletaElemento(this.parentNode, id)
    })
    //arrow function não permite que seja usado o 'this', que serve para especificar que aquele elemento foi clicado.

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}