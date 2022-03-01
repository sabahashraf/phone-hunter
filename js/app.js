const toggleSpinner=(show)=>{

    const spinner = document.getElementById('spinner');
    spinner.style.display=show;

}
const toggleSearchresult=(show)=>{

    const spinner = document.getElementById('phones');
    spinner.style.display=show;

}



const loadData = () => {
    const seachInput = document.getElementById('search-input');
    const searchText = seachInput.value.toLowerCase();
    toggleSpinner('block');
    toggleSearchresult('none');
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
    const noResult = document.getElementById('no-result');
    noResult.textContent = '';
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
    phoneDisplay.textContent='';
    
    phones?.forEach(phone => {
        
        const div = document.createElement('div');
        div.classList.add('col');
      
        div.innerHTML = ` <div class="card">
        <img src="${phone.image}" class="card-img-top w-75 p-2" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.brand}</h5>
          <p class="card-text">${phone.phone_name}</p>
          <button type="button" class="btn btn-success"  onclick="loadPhoneData('${
            phone.slug
          }')">More Details</button>
        </div>
      </div>`;
        phoneDisplay.appendChild(div);

    })
    toggleSpinner('none');
    toggleSearchresult('block');
}

const loadPhoneData=id=>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
    
}

const displayPhoneDetails = details =>{
    console.log(details);
    const parentDetailsContainer = document.getElementById("modal-dialog-box");
    parentDetailsContainer.textContent = "";
    parentDetailsContainer.style.display='block';
  const modalContent = document.createElement("div");
  modalContent.classList.add("row", "g-3","w-75");
  modalContent.innerHTML = `
      <div class="col-md-3 ">
      <img src="${details.image}" class="img-fluid rounded-start ms-3 my-5 py-3"; alt="...">
      </div>
      <div class="col-md-6">
         
          <div class="card-body text-start">
          <h3 class="card-title">${details.name}</h3>
          <p>Release Date:${details.releaseDate ? details.releaseDate :'not available' }</p>
          <p>Main Features</p>
          <p>
Storage:${details.mainFeatures.storage},
Display-size:${details.mainFeatures.displaySize},
Chip-set:${details.mainFeatures.chipSet},
Memory:${details.mainFeatures.memory}
</p>
<p>Sensors:</p>
<p>

${details.mainFeatures.sensors[0] ? details.mainFeatures.sensors[0] :'not available'},
${details.mainFeatures.sensors[1] ? details.mainFeatures.sensors[1] :'not available'},
${details.mainFeatures.sensors[2] ? details.mainFeatures.sensors[2] :'not available'},
${details.mainFeatures.sensors[3] ? details.mainFeatures.sensors[3] :'not available'},
${details.mainFeatures.sensors[4] ? details.mainFeatures.sensors[4] :'not available'},
${details.mainFeatures.sensors[5] ? details.mainFeatures.sensors[5] :'not available'}
</p>
<p>Other Features:</p>
<p>
WLAN:${details?.others?.WLAN ? details.others.WLAN :'not available'},
Hotspot:${details.others?.hotspot ? details.others.hotspot :'not available'},
Bluetooth:${details.others?.Bluetooth ? details.others.Bluetooth :'not available'},
GPS:${details.others?.GPS ? details.others.GPS :'not available'},
NFC:${details.others?.NFC ? details.others.NFC :'not available'},
Radio:${details.others?.Radio ? details.others.Radio :'not available'},
USB:${details.others?.USB ? details.others.USB :'not available'}
</p>
          </div>
      </div>
  `;

  
  parentDetailsContainer.appendChild(modalContent); 
};

   

