var cart = [];


const btnCart = document.querySelectorAll('.btnCart');
const fullCart = document.getElementById('fullCart');
const emptyCart = document.getElementById('emptyCart');
const btnSalvar = document.getElementById('btnSalvar');

btnSalvar.addEventListener('click', function(){
    sessionStorage.setItem('valorFinal',JSON.stringify(cart));
    window.location.href='pedido.html';
    
})

function atualizaCart(){
if (cart.length == 0){
    fullCart.style.display = 'none'
    emptyCart.style.display = 'flex'
} else {
    fullCart.style.display = 'flex'
    fullCart.classList.add('flex-column','gap-1')
    emptyCart.style.display = 'none'
}
}


function adicionarCart(nomeItem, precoItem) {
    let item = {
        nome: nomeItem,
        preco: precoItem,
        quantidade: 1
    };
    cart.push(item);
    atualizaCart();
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
            const toastElement = document.getElementById('liveToast');
            const toastInstance = new bootstrap.Toast(toastElement);
            toastInstance.show();
        }
        atualizaTotal();
        atualizaCart();
    });
});

function removeItem(index) {
    cart.splice(index, 1);
    atualizaTotal();
    atualizaCart();
}

function atualizaTotal() {
    let totalCar = totalCompra();
    document.getElementById('totalCarrinho').innerHTML = `<b>Total</b>: R$ ${totalCar}`;
    const carrinho = document.getElementById('carrinho');
    carrinho.innerHTML = '';

    cart.forEach((item, index) => {
        const itemCompra = document.createElement('div');
        itemCompra.classList.add('itemCompra')
        const itemInfo = document.createElement('div');
        itemInfo.classList.add('itemInfo');

        const itemNomePreco = document.createElement('p');
        itemNomePreco.innerHTML = `<b>${item.nome} </b>   <small> R$ ${item.preco} </small>`;
        itemInfo.appendChild(itemNomePreco);

        const itemQtd = document.createElement('p');
        itemQtd.innerHTML = `<small> Quantidade: ${item.quantidade} </small>`
        itemInfo.appendChild(itemQtd);

        const removeButton = document.createElement('button');
        removeButton.classList.add('btn','icon-link')
        removeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-x-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
      </svg> Remover `;
        removeButton.addEventListener('click', () => removeItem(index));
        itemCompra.appendChild(itemInfo);
        itemCompra.appendChild(removeButton);

        carrinho.appendChild(itemCompra);
        
    });
}

function totalCompra() {
    var total = 0;

    for (let i = 0; i < cart.length; i++) {
        total += cart[i].preco * cart[i].quantidade;
    }

    return total.toFixed(2);
}
