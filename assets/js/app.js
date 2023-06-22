const result = document.querySelector('#resultado');
const form = document.querySelector('#formulario');
const city = document.querySelector('#ciudad');
const country = document.querySelector('#pais');


form.addEventListener('submit',(e)=>{
    e.preventDefault();

    if(city.value ==='' || country.value ===''){
        showError('Ambos campos son obligatorios');
        return
    }
callAPI(city.value,country.value);


})

function callAPI(city,country){
    const apiId ='e0c15b8e93223e5c828fbf46a5d20e5f';
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;


    fetch(url)
    .then(data=>{
        return data.json();
    })
    .then(dataJSON =>{
        if(dataJSON.cod ==='404'){
            showError('Ciudad no encontrada');
        }else{
            clearHTML();
            showWeather(dataJSON);
        }
        
    })
    .catch(error =>{
        console.error(error);
    })
}

function showWeather(data){
    const {name,main:{temp,temp_min,temp_max},weather:[arr]} = data;

    const content = document.createElement('div');

    const tempCelcius = temperaturaC(temp);
    const min = temperaturaC(temp_min);
    const max = temperaturaC(temp_max);

    content.innerHTML = `
    <h5>Temperatura en ${name}</h5>
    <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="imagen de temperatura"
    <h2>temp ${tempCelcius} °C</h2>
    <p>Min: ${min} °C</p>
    <p>Max: ${max} °C</p>
    `;
    
    result.appendChild(content);

}

function temperaturaC(temperatura){
    return parseInt(temperatura -  273.15);
}


function showError(message){
    
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(()=>{
        alert.remove();
    },3000);
}

function clearHTML(){
    result.innerHTML='';
}