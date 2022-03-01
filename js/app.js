



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
    else{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data));
    seachInput.value = '';
    }
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
          <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#photo-details" onclick="loadPhoneData('${phone.slug}')" >More Details</button>
          
          
        </div>
      </div>`;
        phoneDisplay.appendChild(div);

    })
}

const loadPhoneData=id=>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
    
}

const displayPhoneDetails = details =>{
    console.log(details);
   const container = document.getElementById('phone-details');
  
   const div = document.createElement('div');
   div.classList.add('row','g-0');
   div.innerHTML=`<div class="col-md-4">
   <img src="${details.image}" class="img-fluid rounded-start" alt="...">
 </div>
 <div class="col-md-8">
   <div class="card-body">
     <h5 class="card-title">${details.name}</h5>
   <div>
   <p>Release Date:${details.releaseDate ? details.releaseDate :'not available' }</p>
   <p>Main Features</p>
   <ul>
   <li>Storage:${details.mainFeatures.storage}</li>
   <li>Display-size:${details.mainFeatures.displaySize}</li>
   <li>Chip-set:${details.mainFeatures.chipSet}</li>
   <li>Memory:${details.mainFeatures.memory}</li>
   </ul>
   <p>Sensors:</p>
   <ul>
   
  <li>${details.mainFeatures.sensors[0] ? details.mainFeatures.sensors[0] :'not available'}</li> 
  <li>${details.mainFeatures.sensors[1] ? details.mainFeatures.sensors[1] :'not available'}</li> 
  <li>${details.mainFeatures.sensors[2] ? details.mainFeatures.sensors[2] :'not available'}</li> 
  <li>${details.mainFeatures.sensors[3] ? details.mainFeatures.sensors[3] :'not available'}</li> 
  <li>${details.mainFeatures.sensors[4] ? details.mainFeatures.sensors[4] :'not available'}</li> 
  <li>${details.mainFeatures.sensors[5] ? details.mainFeatures.sensors[5] :'not available'}</li> 
  </ul>
  <p>Other Features:</p>
  <ul>
  <li>WLAN:${details.others.WLAN ? details.others.WLAN :'not available'}</li>
  <li>Hotspot:${details.others.hotspot ? details.others.hotspot :'not available'}</li>
  <li>Bluetooth:${details.others.Bluetooth ? details.others.Bluetooth :'not available'}</li>
  <li>GPS:${details.others.GPS ? details.others.GPS :'not available'}</li>
  <li>NFC:${details.others.NFC ? details.others.NFC :'not available'}</li>
  <li>Radio:${details.others.Radio ? details.others.Radio :'not available'}</li>
  <li>USB:${details.others.USB ? details.others.USB :'not available'}</li>
  </ul>

  
   
   </div>
   </div>
 </div>`
 container.appendChild(div);
}
