var cart =[];

const btnCart = document.querySelectorAll('.btnCart');

function adicionarCart(nomeItem,precoItem){
    let item = {
        nome: nomeItem,
        preco: precoItem
    };
    cart.push(item);
}


btnCart.forEach(function(botao){
    botao.addEventListener('click', function(){
        let divCard = botao.closest('.card-body');
        let nomeItem = divCard.querySelector('.card-title').textContent;
        let preco = divCard.querySelector('.card-price').textContent;
        let precoItem = Number(preco.replace('R$','').replace(',','.'));


        adicionarCart(nomeItem, precoItem);
        atualizaTotal()
    })
})

function atualizaTotal(){
    let totalCar = totalCompra();
    document.getElementById('totalCarrinho').innerHTML = `Total: R$ ${totalCar}`
    const carrinhoItems = document.getElementById('carrinhoItems')
    const itemCompra = document.createElement('p');
    itemCompra.classList.add('itemCarrinho');

    nomeCart = cart.map((x) => x.nome);
    precoCart = cart.map((x) => x.preco);

    itemCompra.innerHTML = `${nomeCart.pop()} - ${precoCart.pop()}`
    carrinhoItems.appendChild(itemCompra)
    
}


function totalCompra(){
    var total = 0;

    for (let i=0; i<cart.length;i++){
        total += cart[i].preco
    }

    return total.toFixed(2);
}

