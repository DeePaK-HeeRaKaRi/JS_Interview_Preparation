async function getProducts(){
    let responseData= await fetch(`https://api.jsonbin.io/v3/b/638974d4a3c728450edd19b7`)
    let response =await responseData.json()
    return response
}
 
async function filtersData(){
    let responseFiltersData=await fetch(`https://api.jsonbin.io/v3/b/6389742ea3c728450edd194a`)
    let response=await responseFiltersData.json()
    return response
}

async function renderProducts(){
    let products = await getProducts()
    // console.log(products.record.products)
    showProducts(products.record.products)
    searchFilters(products.record.products)
}

async function getFilters(){
    let fetchFilters=await filtersData()
    let fetchProducts = await getProducts()
    // console.log('colors',filterColors.record.filters.colors)
    let productList=fetchProducts.record.products
    let filterColors=fetchFilters.record.filters.colors
    let filterPrices=fetchFilters.record.filters.prices
    showColors(filterColors,productList)
    priceFilter(filterPrices,productList)
}
function showProducts(products){
    let productsList=document.querySelector('.productsList')
    let html=''
    products.map((data) => {
        // console.log(data)
        html+=`<div class="items item1">
        <div class="productImage">
            <img src=${data.imageUrl}>
        </div>
        <p>${data.name}</p>
        <p>${data.rating == undefined ? '' : data.rating}</p>
        <div class="price">
            <span class="finalPrice">${data.finalPrice == undefined ? '' :data.finalPrice}</span>
            <span class="discount"><s>${data.mrp == undefined ? '' :data.mrp}</s></span>
            <span class="offer">${data.discount == undefined ? '' :data.discount}</span>
        </div>
    </div>`
    })
    productsList.innerHTML=html
    let Low_To_High = document.querySelector('.low_to_high')
    Low_To_High.addEventListener('click',()=>{
        ascendingOrder(products)
    })
    let High_To_Low=document.querySelector('.high_to_low')
    High_To_Low.addEventListener('click',() => {
        descendingOrder(products)
    })
}
 
function ascendingOrder(products){
    products.sort((a,b) => {
        let aPrice=Number(a.finalPrice)
        let bPrice=Number(b.finalPrice)
        if(aPrice<bPrice){
            return -1
        }
        if(aPrice>bPrice){
            return 1
        }
        return 0
    })
    filteredProducts(products)
}

function descendingOrder(products){
    products.sort((a,b) => {
        let aPrice=Number(a.finalPrice)
        let bPrice=Number(b.finalPrice)
        if(aPrice<bPrice){
            return 1
        }
        if(aPrice>bPrice){
            return -1
        }
        return 0
    })
    filteredProducts(products)
}
function filteredProducts(products){
    let productsList=document.querySelector('.productsList')
    let html=''
    products.map((data) => {
        // console.log(data)
        html+=`<div class="items item1">
        <div class="productImage">
            <img src=${data.imageUrl}>
        </div>
        <p>${data.name}</p>
        <p>${data.rating == undefined ? '' : data.rating}</p>
        <div class="price">
            <span class="finalPrice">${data.finalPrice == undefined ? '' :data.finalPrice}</span>
            <span class="discount strike"><s>${data.mrp == undefined ? '' :data.mrp}</s></span>
            <span class="offer">${data.discount == undefined ? '' :data.discount}</span>
        </div>
    </div>`
    })
    productsList.innerHTML=html
}
var filteredArrayColors=[]
function checkedFilter(products,e){
    let tempDeepCopyOfProducts = [...products]
    let checkedColor=tempDeepCopyOfProducts.filter(value => value.color===e.target.value)
    let checkedColors=[...filteredArrayColors,...checkedColor]
    filteredArrayColors=[...checkedColors]
    // filteredProducts(checkedColors)
    filteredProducts(checkedColor.length>0 ? checkedColors : filteredArrayColors)
}
function uncheckedFilter(products,e){
    let tempDeepCopyOfProducts = [...filteredArrayColors]
    let uncheckedColor=tempDeepCopyOfProducts.filter(value => value.color!==e.target.value)
    filteredArrayColors=[...uncheckedColor]
    filteredProducts(uncheckedColor.length>0 ? uncheckedColor : products)
}
function showColors(colors,products){
    console.log('colors',colors,products)
    let colorContainer=document.querySelector('.color')
    let html=''
    colors.map((color) => {
        html+=`<input type="checkbox" value=${color.value} class=checked-${color.name}><span>${color.name}</span><br>`
    })
    colorContainer.innerHTML=html
    let blue=document.querySelector('.checked-Blue')
    let black=document.querySelector('.checked-Black')
    let pink=document.querySelector('.checked-Pink')
    let olive=document.querySelector('.checked-Olive')
    let red=document.querySelector('.checked-Red')
    let yellow=document.querySelector('.checked-Yellow')
    // var filteredArrayColors=[]
    var uncheckedColors=[]
    blue.addEventListener('click',(e)=>{
        if(blue.checked){
            checkedFilter(products,e)
        }
        else{
            uncheckedFilter(products,e)
        }
    })
    black.addEventListener('click',(e)=> {
         
        if(black.checked){
            checkedFilter(products,e)
        }
        else{
            uncheckedFilter(products,e)
        }
    })

    // same thing for all
    pink.addEventListener('click',(e)=> {
        if(pink.checked){
            checkedFilter(products,e)
        }
        else{
            uncheckedFilter(products,e)
        }
    })
    olive.addEventListener('click',(e)=> {
        if(olive.checked){
            checkedFilter(products,e)
        }else{
            uncheckedFilter(products,e)
        }
    })
    red.addEventListener('click',(e)=> {
        if(red.checked){
            checkedFilter(products,e)
        }else{
            uncheckedFilter(products,e)
        }
    })
    yellow.addEventListener('click',(e)=> {
        if(yellow.checked){
            // let tempDeepCopyOfProducts = [...products]
            // let checkedYellow=tempDeepCopyOfProducts.filter(value => value.color===e.target.value)
            // var checkedColors=[...filteredArrayColors,...checkedYellow]
            // filteredArrayColors=[...checkedColors]
            // filteredProducts(checkedColors)
            checkedFilter(products,e)
        }else{
            // let tempDeepCopyOfProducts = [...filteredArrayColors]
            // let uncheckedYellow=tempDeepCopyOfProducts.filter(value => value.color!==e.target.value)
            // filteredArrayColors=[...uncheckedYellow]
            // filteredProducts(uncheckedYellow.length>0 ? uncheckedYellow : products)
            uncheckedFilter(products,e)
        }
    })
}
function searchFilters(products){
    // console.log('insearched filter')
    let searchInput=document.querySelector('.search')
    let timer
    let count=0
    searchInput.onkeyup= (e) => {
        // console.log(e.target.value)
        let searchData=e.target.value
        let searchedProducts=[]
        clearTimeout(timer)
        timer=setTimeout(() => {
            console.log(count++)
            if(searchData){
                searchedProducts=products.filter((data) => {
                    return data.name.toLowerCase().includes(searchData.toLowerCase())
                })
                console.log(searchedProducts)
                filteredProducts(searchedProducts)
            }else if(filteredArrayColors.length>0){
                filteredProducts(filteredArrayColors)
            }else{
                filteredProducts(products)
            }
        },500) 
    }
}
function priceFilter(prices,products){
    let minimum=document.querySelector('.getMinimum')
    let maximum=document.querySelector('.getMaximum')
    let price=document.querySelector('.priceFilter')
    price.addEventListener('click',() => {
        let minPrice=Number(minimum.value)
        let maxPrice=Number(maximum.value)
        console.log(minPrice,maxPrice,filteredArrayColors)
        let productsPriceFilter
        if(filteredArrayColors.length>0){
            productsPriceFilter=filteredArrayColors.filter((value)=>{
                return value.finalPrice>=minPrice && value.finalPrice<=maxPrice
            }) 
        }else{
            productsPriceFilter=products.filter((value)=>{
                return value.finalPrice>=minPrice && value.finalPrice<=maxPrice
            }) 
        }
        if(productsPriceFilter){
            filteredProducts(productsPriceFilter)
        }
        minimum.value=''
        maximum.value=''
    })
    
    // minimum.onkeyup=(e) => {
    //     console.log('mini',e.target.value)
    // }
    // maximum.onkeyup=(e) => {
    //     console.log('maxi',e.target.value)
    // }

    // minimum.addEventListener('click',(e) => {
    //     console.log('mini',e.target.value)
    // })
    // maximum.addEventListener('click',(e) => {
    //     console.log('maxi',e.target.value)
    // })
}
renderProducts()
getFilters()

const dropDownButton=document.querySelector('.priceDropDownSubmit')
const dropDownValue=document.querySelector('.priceDropDownValue')
dropDownButton.addEventListener('click',(e)=>{
    console.log(dropDownValue.value)
})