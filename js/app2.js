
const loadAllPhone = async (satas, searchText) => {
    // console.log(searchText);
    
    // fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
    // .then(res => res.json())
    // .then(data => console.log(data.data))
    
    
    const respons = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText ? searchText : "iphone"}`);
    const data = await respons.json();
    
    
    if (satas) {
        displayAllPhone(data.data);
    }
    else {
        displayAllPhone(data.data.slice(0, 6));
    }
    
    document.getElementById('spinnar').classList.add('d-none')

}


const displayAllPhone = (phones) => {
    document.getElementById('phones-container').innerHTML = "";
    const phoneContainer = document.getElementById('phones-container');
    phones.forEach(phone => {
        console.log(phone);
        
        const div = document.createElement('div');
        div.innerHTML =
            `
           <div class="card  bg-base-100 w-96 mx-auto shadow-xl">
        <div class="m-3">
            <img class="w-80 mx-auto h-full object-cover" src=${phone.image} 
            class="rounded-xl" />
        </div>
        <div class="card-body items-center text-center">
            <h2 class="card-title font-extrabold">${phone.phone_name}</h2>
            <p class="text-gray-500 font-bold">${phone.slug}</p>
            <h2>${phone.brand}</h2>
            <div class="card-actions">
             <button class="btn" onclick="displayDitals('${phone.slug}')">open modal</button>
            </div>
        </div>
        </div>
        `;
        phoneContainer.append(div)
    });


}


const hendalShowAll = () => {
    loadAllPhone(true)

}

const hendalSearch = () => {
    document.getElementById('spinnar').classList.remove('d-none')
    // console.log('hello');

    const searchText = document.getElementById('search-field').value

    setTimeout(function () {
        loadAllPhone(false, searchText)
    }, 3000)
}

const displayDitals = async(slugs) => {
    const respons = await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`);
    const data = await respons.json();
    console.log(data.data);

    const {brand, image, slug} = data.data;

    const modal = document.getElementById('my_modal_1');

    modal.innerHTML= 
        `
        <div class="modal-box w-11/12 max-w-5xl">
              <h3 class="text-lg font-bold">${brand}</h3>
              <p class="py-4">${slug}</p>
              <h2>${image}<h2>
              <div class="modal-action">
                <form method="dialog">
                  <button class="btn">Close</button>
                </form>
              </div>
            </div>
        
        `


        modal.showModal();
    
    
}



loadAllPhone(false, 'iphone')