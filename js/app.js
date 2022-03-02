
const toggleSpinner=(show)=>{

    const spinner = document.getElementById('spinner');
    spinner.style.display=show;

}
const toggleSearchresult=(show)=>{

    const spinner = document.getElementById('phones');
    spinner.style.display=show;

}

const singlePhoneResult=(show)=>{
    const spinner = document.getElementById('modal-dialog-box');
    spinner.style.display=show;

}

//loading all phones data

const loadAllPhoneData = async() => {
    const seachInput = document.getElementById('search-input');
    const searchText = seachInput.value.toLowerCase();
    toggleSpinner('block');
    toggleSearchresult('none');
    singlePhoneResult('none');
    if (searchText == "") {
      
        const noResult = document.getElementById('no-result');
        noResult.textContent = '';
       
        const p = document.createElement('p');
       
        p.innerText = 'please search by a phone name';
        noResult.appendChild(p);
    }
    //fetching data for phones
    else{
        const noResult = document.getElementById('no-result');
    noResult.textContent = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res=await fetch(url);
    const data=await res.json();
       displayAllPhone(data.data);
       
   
    }
}

//displaying 20 phones

const displayAllPhone = phones => {
    noOfResults(phones);
    toggleSpinner('none');
    toggleSearchresult('flex');

const phoneOnPage=phones.slice(0,20);


    const phoneDisplay = document.getElementById('phones');
    phoneDisplay.textContent='';

    
    phoneOnPage.forEach(phone => {
        
        const div = document.createElement('div');
        div.classList.add("col-lg-4");
      
        div.innerHTML = `<div class="card shadow border-0 ">
        <img src="${phone.image}" class="card-img-top w-75 p-2" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.brand}</h5>
          <p class="card-text">${phone.phone_name}</p>
          <button type="button" class="btn btn-success"  onclick="loadSinglePhoneData('${
            phone.slug
          }')">More Details</button>
        </div>
      </div>
      `;
        phoneDisplay.appendChild(div);

    })
    //creating a button to display more than 20 elements
    if(phones.length >= 20){
    const div=document.createElement('div');
    div.classList.add="row";
    div.innerHTML=`<button id="show"type="button" class="btn btn-info "  onclick='loadOtherData()'
       >Show more</button>`;
       phoneDisplay.appendChild(div);
    }
    else{
    const seachInput = document.getElementById('search-input');
    seachInput.value='';
    
    }
   
  
        
    }
    //function shows how many result shows by search
    const noOfResults = results => {
        const noResult = document.getElementById('no-result');
      
        const p = document.createElement('p');
        p.innerText = `${results.length} results found`;
       
        noResult.appendChild(p);
        
        
    
    }

    //to display other phones loading data
    const loadOtherData=async()=>{
        const noResult = document.getElementById('no-result');
        noResult.textContent = '';
        const seachInput = document.getElementById('search-input');
        const searchText = seachInput.value.toLowerCase();
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res=await fetch(url);
    const data=await res.json();
       showOtherPhone(data.data);
       seachInput.value='';
      

    }
//to show other phones
    const showOtherPhone=phones=>{
        const btn=document.getElementById('show');
        btn.style.display='none';
        const restPhones =phones.slice(20);
        const phoneDisplay = document.getElementById('phones');
        
    
        
        restPhones.forEach(phone => {
            
            const div = document.createElement('div');
            div.classList.add("col-lg-4");
          
            div.innerHTML = `<div class="card shadow border-0">
            <img src="${phone.image}" class="card-img-top w-75 p-2" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone.brand}</h5>
              <p class="card-text">${phone.phone_name}</p>
              <button type="button" class="btn btn-success"  onclick="loadSinglePhoneData('${
                phone.slug
              }')">More Details</button>
            </div>
          </div>
          `;
            phoneDisplay.appendChild(div);
    
        })
    }

   
//loading single phone data



const loadSinglePhoneData=id=>{
    const noResult = document.getElementById('no-result');
        noResult.textContent = '';
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySinglePhoneDetails(data.data));
    
}
//displaying single phone details

const displaySinglePhoneDetails = details =>{
    
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
          <h5 class="fw-bold">Main Features:</h5>
          <p>
<span class="fw-bold">Storage:</span>${details.mainFeatures.storage},
<span class="fw-bold">Display-size:</span>${details.mainFeatures.displaySize},
<span class="fw-bold">Chip-set:</span>${details.mainFeatures.chipSet},
<span class="fw-bold">Memory:</span>${details.mainFeatures.memory}
</p>
<h5 class="fw-bold">Sensors:</h5>
<p>

${details.mainFeatures.sensors[0] ? details.mainFeatures.sensors[0] :'not available'},
${details.mainFeatures.sensors[1] ? details.mainFeatures.sensors[1] :'not available'},
${details.mainFeatures.sensors[2] ? details.mainFeatures.sensors[2] :'not available'},
${details.mainFeatures.sensors[3] ? details.mainFeatures.sensors[3] :'not available'},
${details.mainFeatures.sensors[4] ? details.mainFeatures.sensors[4] :'not available'},
${details.mainFeatures.sensors[5] ? details.mainFeatures.sensors[5] :'not available'}
</p>
<h5 class="fw-bold">Other Features:</h5>
<p>
<span class="fw-bold">WLAN:</span>${details?.others?.WLAN ? details.others.WLAN :'not available'},
<span class="fw-bold">Hotspot:</span>${details.others?.hotspot ? details.others.hotspot :'not available'},
<span class="fw-bold">Bluetooth:</span>${details.others?.Bluetooth ? details.others.Bluetooth :'not available'},
<span class="fw-bold">GPS:</span>${details.others?.GPS ? details.others.GPS :'not available'},
<span class="fw-bold">NFC:</span>${details.others?.NFC ? details.others.NFC :'not available'},
<span class="fw-bold">Radio:</span>${details.others?.Radio ? details.others.Radio :'not available'},
<span class="fw-bold">USB:</span>${details.others?.USB ? details.others.USB :'not available'}
</p>
          </div>
      </div>
  `;

  
  parentDetailsContainer.appendChild(modalContent); 
};

   

