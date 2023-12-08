var cart = [];

const btnCart = document.querySelectorAll('.btnCart');

function adicionarCart(nomeItem, precoItem) {
    let item = {
        nome: nomeItem,
        preco: precoItem,
        quantidade: 1
    };
    cart.push(item);
}

btnCart.forEach(function(botao) {
    botao.addEventListener('click', function() {
        let divCard = botao.closest('.card-body');
        let nomeItem = divCard.querySelector('.card-title').textContent;
        let preco = divCard.querySelector('.card-price').textContent;
        let precoItem = Number(preco.replace('R$', '').replace(',', '.'));

        let itemIndex = cart.findIndex(item => item.nome === nomeItem);
        if (itemIndex !== -1) {
            cart[itemIndex].quantidade++;
        } else {
            adicionarCart(nomeItem, precoItem);
        }
        atualizaTotal();
    });
});

function removeItem(index) {
    cart.splice(index, 1);
    atualizaTotal();
}

function atualizaTotal() {
    let totalCar = totalCompra();
    document.getElementById('totalCarrinho').innerHTML = `Total: R$ ${totalCar}`;
    const carrinhoItems = document.getElementById('carrinhoItems');
    carrinhoItems.innerHTML = '';

    cart.forEach((item, index) => {
        const itemCompra = document.createElement('div');
        itemCompra.classList.add('itemCarrinho');

        const itemInfo = document.createElement('p');
        itemInfo.innerHTML = `${item.nome} - R$ ${item.preco} - Quantidade: ${item.quantidade}`;
        itemCompra.appendChild(itemInfo);

        const removeButton = document.createElement('button');
        removeButton.innerHTML = 'Remove';
        removeButton.addEventListener('click', () => removeItem(index));
        itemCompra.appendChild(removeButton);

        carrinhoItems.appendChild(itemCompra);
    });
}

function totalCompra() {
    var total = 0;

    for (let i = 0; i < cart.length; i++) {
        total += cart[i].preco * cart[i].quantidade;
    }

    return total.toFixed(2);
}

