const apiurl="https://fakestoreapi.com/products";
const productlist=document.getElementById("productlist");
const newtitle=document.getElementById("newtitle");
const newprice=document.getElementById("newprice");
const newcategory=document.getElementById("newcategory");
const newimage=document.getElementById("newimage");
const productid=document.getElementById("productid");
const newproductform = document.getElementById("newproductform");
const newdescription = document.getElementById("newdescription");
const searchInput = document.getElementById('searchInput');



let products=[];

async function fetchProductsdetails(){
    try{
const response=await fetch (apiurl);
if(!response.ok) throw new error("network issues while fetching data");

 const products=await response.json();
  console.log(products);
     display(products)
}
    catch(error){
        console.error("error fetching products",error);
console.log(error);

    }
  


  }
 
function display(products){  
  productlist.innerHTML = '';
 if (products.length === 0) {
        productlist.innerHTML = '<p>No products found matching your search.</p>';
        return;
    }
 products.forEach((product)=>{
     const productitem=document.createElement("div");          
        productitem.className="product-item";
        productitem.innerHTML =
        `<span> <h2> ${product.category} </h2>
        <h5>${product.title}</h5>
        <img src="${product.image}" width="100px" height="100px">
        <h6>Price:" ₹${product.price}"</h6>
       
        <p> ${product.description}</p>
        </span>
        <div>
        <button class="btn btn-warning" onclick="editproduct('${product.id}')"><a href='#' class='card-link'> Edit 
            
          </a></button>
        
         <button class="btn btn-danger" onclick="deleteproduct('${product.id}')"><a href='#' class='card-link'> Delete</a></button>

         </div> 
        `;
   productlist.appendChild(productitem);
        // console.log(productitem);
        
    });       
    }
  
fetchProductsdetails();
newproductform.addEventListener("submit", async (e) => {
  e.preventDefault();
const id=productid.value;
console.log(id);

const productdata={
    title:newtitle.value,
    price:newprice.value,
    category:newcategory.value,
    image:newimage.value,
    description:newdescription.value,
};

console.log(productdata);



    if (confirm("Do you want to save the data")){
   if (!id) {
    //save
    await fetch(apiurl, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(productdata),
    });}
  
   console.log("data saved sucessfully",productdata);
  } 
  else {
    //update
    
    await fetch(`${apiurl}/${id}`, {
      method: "PUT",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(productdata),
      
    });console.log(productdata);alert("Do you want to update the data")
       }

fetchProductsdetails();
productid.value="";
newtitle.value="";
newcategory.value="";
newimage.value="";
newprice.value="";
newdescription.value="";
});


async function editproduct(id) {
 
      
 
  const response=await fetch (`${apiurl}/${id}`);
  if (confirm("Do you want to edit the data")){
 const product=await response.json();
  console.log(product);
  
productid.value=product.id;
newtitle.value=product.title;
newcategory.value=product.category;
newprice.value=product.price;
newdescription.value=product.description;
newimage.value=product.image;
  
// console.log(newprice.value);
console.log(product.price);
console.log(newprice.value);
  
  }
} 
 
fetchProductsdetails();



async function deleteproduct(id)

{  const response=await fetch (`${apiurl}/${id}`);
   
   if (confirm("Do you want to delete")){
  await fetch(`${apiurl}/${id}`, {
      method: "DELETE",
     
    }); } const product=await response.json();
        console.log('Product deleted:',product)
  
          fetchProductsdetails();
     
   };
  
     

 async  function searchProducts(){
  
  const response=await fetch (apiurl);
 const products=await response.json();
    const filteredProducts =products.filter(product => 
        product.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
               product.category.toLowerCase().includes(searchInput.value.toLowerCase())
    );
   display(filteredProducts);

    console.log(filteredProducts);

}
  searchProducts()
     fetchProductsdetails();