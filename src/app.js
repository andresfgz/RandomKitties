const BASE_API = 'https://api.thecatapi.com/v1/';

async function getRandomKitties(API) {
    const API_RANDOM = `${API}images/search?limit=3`
    const res = await fetch(API_RANDOM);
    const data = await res.json();

    const sectionRandom = document.getElementById('kittiesContainer');
    sectionRandom.innerHTML = "";

    data?.forEach(cat => {      
        const mainDiv = document.createElement('div');
        const img = document.createElement('img');
        const favIconContainer = document.createElement('div');
        const icon = document.createElement('a');
        const iconFa = document.createElement('i');

        mainDiv.classList = 'container w-52 min-w-full relative';
        img.classList = 'block w-full rounded-lg max-h-52 min-h-52'
        img.src = cat.url;
        favIconContainer.classList = 'absolute inset-0 h-full w-full opacity-100 ease-in duration-300'   
        icon.classList ="icon text-white absolute text-center hover:text-red-600";
        icon.title = "Kittie Image";
        icon.onclick = () => addKittieToFavourite(cat.id);
        iconFa.classList = 'fa fa-heart-o';

        icon.appendChild(iconFa);
        favIconContainer.appendChild(icon);
        mainDiv.appendChild(favIconContainer);
        mainDiv.appendChild(img);

        sectionRandom.appendChild(mainDiv);
    });
};

async function loadFavouritesMichis(API) { 
    const API_FAVOURITES = `${API}favourites`
    const res = await fetch(API_FAVOURITES, {
        headers: {
          'x-api-key': 'YOUR API KEY HERE https://docs.thecatapi.com/',
          'content-type': 'application/json'
        }
      });
    const data = await res.json();

    if(res.status === 200) {
        const sectionRandom = document.getElementById('kittiesFavNUploadedContainer');
        sectionRandom.innerHTML = "";
        data.forEach(fav => {        
            const mainDiv = document.createElement('div');
            const img = document.createElement('img');
            const favIconContainer = document.createElement('div');
            const icon = document.createElement('a');
            const iconFa = document.createElement('i');

            mainDiv.classList = 'container w-52 min-w-full relative';
            img.classList = 'block w-full rounded-lg max-h-52 min-h-52'
            img.src = fav.image.url;
            favIconContainer.classList = 'absolute inset-0 h-full w-full opacity-100 ease-in duration-300'   
            icon.classList ="icon text-red-600 absolute text-center";
            icon.title = "Kittie Image";
            icon.onclick = () => removeFromFavourites(fav.id);
            iconFa.classList = 'fa fa-heart-o';

            icon.appendChild(iconFa);
            favIconContainer.appendChild(icon);
            mainDiv.appendChild(favIconContainer);
            mainDiv.appendChild(img);

            sectionRandom.appendChild(mainDiv);
        });
    }      
}

async function addKittieToFavourite (kittieId) {
    const res = await fetch(`${BASE_API}favourites`, {
        method: 'POST',
        headers: {
            'x-api-key': 'YOUR API KEY HERE https://docs.thecatapi.com/',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            image_id: kittieId.toString(),
        })
    });

    const data = await res.json();

    if(data.message === "SUCCESS") {
        getRandomKitties(BASE_API);
        loadFavouritesMichis(BASE_API);
    }
}

async function removeFromFavourites(kittieId) {
    const res = await fetch(`${BASE_API}favourites/${kittieId}`,{
        method: 'DELETE',
        headers: {
          'x-api-key': 'YOUR API KEY HERE https://docs.thecatapi.com/',
          'content-type': 'application/json'
        }
    });

    const data = await res.json();

    if(res.status === 200) {
        loadFavouritesMichis(BASE_API);
    }
}

async function uploadKittie(){
    
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);
    
    const res = await fetch(`${BASE_API}images/upload`, {
        method: 'POST',
        headers: {
          'x-api-key': 'YOUR API KEY HERE https://docs.thecatapi.com/',
        },
        body: formData,
    });
    
    const data = await res.json();
    if(data.approved === 1) {
        loadFavouritesMichis(BASE_API);
    }
}


getRandomKitties(BASE_API);
loadFavouritesMichis(BASE_API);
