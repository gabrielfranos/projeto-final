var valorFinal = sessionStorage.getItem('valorFinal');
        var cart = JSON.parse(valorFinal);
        var cartContainer = document.getElementById('cartContainer');
        cart.forEach(function (item) {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('itemDiv')
            const itemInfo = document.createElement('div');
            itemInfo.classList.add('itemInfo');

            const itemNomePreco = document.createElement('p');
            itemNomePreco.innerHTML = `<b>${item.nome} </b>   <small> R$ ${item.preco} </small>`;
            itemInfo.appendChild(itemNomePreco);

            const itemQtd = document.createElement('p');
            itemQtd.innerHTML = `<small> Quantidade: ${item.quantidade} </small>`
            itemInfo.appendChild(itemQtd);


            itemDiv.appendChild(itemInfo);

            cartContainer.appendChild(itemDiv);
        });
        var subtotal = 0;
        for (let i = 0; i < cart.length; i++) {
            subtotal += cart[i].preco * cart[i].quantidade;
        }
        var subtotalp = document.getElementById('subtotalp');
        subtotalp.innerHTML = `R$ ${subtotal.toFixed(2)}`

        var fretep = document.getElementById('fretep');
        if (subtotal >= 400){
            var frete = 0;
            fretep.innerHTML = `Grátis!`
        } else {    
            var frete = 25;
            fretep.innerHTML = `R$ ${frete.toFixed(2)}`
        }
        
        var totalp = document.getElementById('totalp')
        totalp.innerHTML = "R$ " + (subtotal+frete).toFixed(2)
        