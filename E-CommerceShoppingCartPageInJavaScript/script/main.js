const decreaseNumber = (inputFieldId, itemPrice) =>{
    var product_total_amt = document.getElementById('product_total_amt');
    var itemval = document.getElementById(inputFieldId);
    var itemPriceValue = document.getElementById(itemPrice);
    var total_cart_amt = document.getElementById('total_cart_amt');
    var shipping_chare = document.getElementById('shipping_chare');
    // console.log(itemval.value);
    if(itemval.value <= 0){
        itemval.value = 0;
        alert('Negative quantity not allowed');
    }
    else{
        itemval.value = parseInt(itemval.value) - 1;
        itemval.style.backgroundColor = '#fff';
        itemval.style.color = 'black';
        itemPriceValue.innerHTML = parseInt(itemPriceValue.innerHTML) - 15;
        product_total_amt.innerHTML = parseInt(product_total_amt.innerHTML) - 15;
        if(parseInt(product_total_amt.innerHTML) == 0 )
            total_cart_amt.innerHTML= 0; 
        else   
            total_cart_amt.innerHTML = parseInt(product_total_amt.innerHTML) + parseInt(shipping_chare.innerHTML);
    
    }

}

const increaseNumber = (inputFieldId, itemPrice) =>{
    var product_total_amt = document.getElementById('product_total_amt');
    var itemval = document.getElementById(inputFieldId);
    var itemPriceValue = document.getElementById(itemPrice);
    var total_cart_amt = document.getElementById('total_cart_amt');
    var shipping_chare = document.getElementById('shipping_chare');
    
    // console.log(itemval.value);
    if(itemval.value >= 5){
        itemval.value = 5;
        alert('max 5 allowed');
        itemval.style.backgroundColor = 'red';
        itemval.style.color = '#fff';
    }
    else{
        itemval.value = parseInt(itemval.value) + 1;
        itemPriceValue.innerHTML = parseInt(itemPriceValue.innerHTML) + 15;
        product_total_amt.innerHTML = parseInt(product_total_amt.innerHTML) + 15;
        if(parseInt(product_total_amt.innerHTML) == 0 )
            total_cart_amt.innerHTML= 0; 
        else   
            total_cart_amt.innerHTML = parseInt(product_total_amt.innerHTML) + parseInt(shipping_chare.innerHTML);
        
    }

}

var discout_code = () => {
    var discount_code1 = document.getElementById('discount_code1');
    if (discount_code1.value  === 'Avinash' && parseInt(document.getElementById('total_cart_amt').innerHTML) > 0 )
    document.getElementById('total_cart_amt').innerHTML = parseInt(document.getElementById('total_cart_amt').innerHTML) - 15;
        //total_cart_amt.innerHTML = parseInt(product_total_amt.innerHTML) - 15;
    else
        alert("code is invalid");
}
