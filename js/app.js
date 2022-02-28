const loadData = () => {
    const seachInput = document.getElementById('search-input');
    const searchText = seachInput.value.toLowerCase();
    if (searchText == "") {
        const noResult = document.getElementById('no-result');
        const p = document.createElement('p');
        p.innerText = 'please search by a phone name';
        noResult.appendChild(p);
    }
    //fetching data for phones
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data));
    seachInput.value = '';

}
const noOfResults = results => {
    const noResult = document.getElementById('no-result');
    const p = document.createElement('p');
    p.innerText = `${results.length} results found`;
    noResult.appendChild(p);

}

const displayData = phones => {
    noOfResults(phones);

    const phoneDisplay = document.getElementById('phones');
    phones.forEach(phone => {

        const div = document.createElement('div');
        div.classList.add('col');
        
        div.innerHTML = ` <div class="card">
        <div class="p-2 ">
        <img src="${phone.image}" class="card-img-top w-75" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.brand}</h5>
          <p class="card-text">${phone.phone_name}</p>
          </div>
          <div class="text-end mb-2 me-2">
          <a href="#" class="btn btn-primary text-end">Explore</a>
          </div>
        </div>
      </div>`;
        phoneDisplay.appendChild(div);

    })
}