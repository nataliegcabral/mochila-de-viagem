const form = document.querySelector('#novoItem')

form.addEventListener('submit', (evento) => {
    evento.preventDefault()
    //previnir de enviar para a própria página, que tá como padrão

    
    
    criaElemento(evento.target.elements['nome'].value, evento.target.elements['quantidade'].value)
    
})

function criaElemento(nome, quantidade) {

    const novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = quantidade
    
    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += nome

    const lista = document.querySelector('#lista')

    lista.appendChild(novoItem)

}


