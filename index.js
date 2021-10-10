let products=[
    {
        id:1 ,
        name:'Chocolate',
        rate: 80,
    
        photo:'images/chocolate.png'
    },
    {
        id:2 ,
        name:'Vanilla',
        rate: 90,
        photo:'images/vanilla.png'
    },
    {
        id:3 ,
        name:'Strawberry',
        rate: 95,
        

        photo:'images/strawberry.png'
    
    },
    {
        id:4 ,
        name:'Pista',
        rate: 100,
        

        photo:'images/pista.png'
        
    },
    {
        id:5 ,
        name:'Tender cocunut',
        rate: 105,
        

        photo:'images/tendercocunut.png'
    }
];

 products.forEach((item, i) => {
     $('main>.container> .row').append(`
     <div class="col-md-4">
             <img class="img-fluid" src="${item.photo}" alt="${item.name}"/>
             <div class="row" style="background-color:orchid;padding:6px 24px;">

                 <div class="col-md-4">${item.name}</div>
                 <div class="col-md-4">Rs.${item.rate.toFixed(2)}</div>
             
                 <div class="col-md-4">
                 
                 <button type="button" class="btn btn-link btnAdToCart" onclick="addToCart(${item.id});">Add to Cart</button>
                 </div>
             </div>
        </div> 
     `);
 });

 let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

  const getIndex = id=> cart.indexOf(cart.find(item => item.id===id));

 const popCart = () => {

    if(cart.length > 0){
        $("main .callout").html(`
            <div class="row" >
        `);

        cart.forEach((item, i) => {
            $("main .container .callout .row").append(`
            
            <div class=".col-xs-6 .col-sm-4" >

                <img class="img-thumbnail" src="${products[item.id - 1].photo}" alt="${products[item.id - 1].name}" />

            
                   
                   
                   ${products[item.id-1].name}

                 <button type="button" class="btnRemoveCartItem" onclick="removeCartItem(${item.id})">&minus;</button>


                    <input type="text" name="qty" id="qty${item.id}" value="${item.qty}" />
                    Rs.${products[item.id - 1].rate.toFixed(2)}
                    <button type="button" class="btnRemoveCartItem" onclick="addToCart(${item.id})">&plus;</button>

                
               
            Rs.${(item.qty*products[item.id - 1].rate).toFixed(2)}     
           <button type="button" class="btnRemoveCartItem" onclick="removeCartFullItem(${item.id})">&times;</button>
        </div>
<hr style="height:5px;color:black;margin-top:5px;">
          
        `);
        
    }); 
    $("main .callout").append(`
    </div>
    <div class="row">
            <section>
                <div class=" ">
                    <small>Sub Total</small>
                    <span class="billAmt">Rs.${cart.reduce((accu, item, i) => accu += item.qty*products[i].rate, 0).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
            <div class="">
             <small>Total Bill:</small>
             <span class="billAmt">Rs.${cart.reduce((accu, item, i) => accu += item.qty*products[i].rate, 0).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
          </div>
             <section>
                <button type="button" class="btnReset" onclick="resetCart();">Clear</button>
                <button type="button" class="btnCheckOut" onclick="checkOut();">Checkout</button>
            </section>
        </div>
        `);
  }
    

else{
    $("main .callout").html(`
            <div class="alert">
            <p>Oooooopss............</p>
            <p>you have no items in cart!</p>
            </div>
        `);

}

    cart.reduce((accu, item) => accu += item.qty, 0) < -1 ? $(".cartCount sup").find("sup").css('background','red').text(cart.reduce((accu, item) => accu += item.qty, 0)) :$(".cartCount sup").css('background','red').text(cart.reduce((accu, item) => accu += item.qty, 0))
 }
   popCart();
   


 const addToCart = id => {
    if(cart.length > 0){
    getIndex(id) > -1 ? cart[getIndex(id)].qty += 1 : cart.push({id, qty: 1});
}
else {
    cart.push({id, qty: 1});
}
localStorage.setItem('cart', JSON.stringify(cart));
popCart();

 }

 const removeCartItem=id => {
    if(cart.length >0){
        let val=$('#qty'+id).val();
        if(val>1){

        getIndex(id) > -1 ? cart[getIndex(id)].qty -= 1 :'';
        }
        else{
            getIndex(id) >= -1 ? cart.splice(getIndex(id), 1) :'';


        }

    }
    else{
        getIndex(id) >= -1 ? cart.splice(getIndex(id), 1) :'';


    }
    localStorage.setItem('cart',JSON.stringify(cart));

    popCart();
 }
 const removeCartFullItem=id => {
        getIndex(id) >= -1 ? cart.splice(getIndex(id), 1) :'';


   
    localStorage.setItem('cart',JSON.stringify(cart));

    popCart();
 }


 const resetCart = () => {
    if(confirm("Empty cart?")){
        cart.splice(0,cart.length);
        localStorage.setItem('cart',JSON.stringify(cart));
        popCart();

    }
 }
 const checkOut = () => {
    return; 
}  

$('.cartCount').click(function() {
        $(".callout").toggle();
    
});

