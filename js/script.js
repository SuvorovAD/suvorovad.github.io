function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    
    testWebP(function (support) {
    
    if (support == true) {
    document.querySelector('body').classList.add('webp');
    }else{
    document.querySelector('body').classList.add('no-webp');
    }
    });
function check() {
    const check = document.querySelectorAll('input');
    for(let i = 0; i < check.length; i++) {
        if(check[i].type == 'checkbox') {
            check[i].checked=true;
        }
    
    }
    const button = document.getElementById('check')
    button.textContent = 'Снять все'
    button.setAttribute('onclick','uncheck()'); 
}

function uncheck() {
    const check = document.querySelectorAll('input');
    for(let i = 0; i < check.length; i++) {
        if(check[i].type == 'checkbox') {
            check[i].checked=false;
        }
    
    }
    const button = document.getElementById('check')
    button.textContent = 'Выбрать всех'
    button.setAttribute('onclick','check()'); 
}

let newPlayers = 0;

function addPlayer() {
    const choicePlayers = document.querySelector('.choice__players');
    choicePlayers.insertAdjacentHTML('beforeend', 
    `
        <div class="choice__player player checkbox">
            <input class="custom-checkbox" type="checkbox" id="${newPlayers}">
            <label for="${newPlayers}"></label>
            <input type="text"class="choice__input in-real-time" placeholder="Введите имя">
        </div>
    `)
    newPlayers++
}

function generation() {
    let button = document.getElementById('main-button')
    let quantityMafia = document.getElementById('mafia')
    let quantityDon = document.getElementById('don')
    let quantityDoctor = document.getElementById('doctor')
    let quantityCommissar = document.getElementById('commissiar')

    function quantityRoles (quantity) {
        if (quantity.value !== ''){
            if (button.parentElement.querySelector('div')){
                button.parentElement.removeChild(button.parentElement.querySelector('div'))
            }
            return quantity.value
        }
        else {
            quantity.classList.add('error')
            if (!button.parentElement.querySelector('div')){
                button.insertAdjacentHTML('afterend', '<div>Введите корректные данные</div>')
                return undefined
            }
        }
    }
    quantityMafia = quantityRoles(quantityMafia)
    quantityDon = quantityRoles(quantityDon)
    quantityDoctor = quantityRoles(quantityDoctor)
    quantityCommissar = quantityRoles(quantityCommissar)
    


    let names = []
    let checked = document.querySelectorAll('input:checked');
    for (let i = 0; i < checked.length; i++) {
        const el = checked[i];
        if(el.parentElement.querySelector('.in-real-time')){
            const inputValue = el.parentElement.querySelector('.in-real-time')
            if (inputValue.value !== '') {
                names.push(inputValue.value)
            }
            
        }
        else if(el.parentElement.querySelector('label')){
            const labelValue = el.parentElement.querySelector('label')
            names.push(labelValue.textContent)
        }
        

    }
    let randomMafia = []
    let randomDon = []
    let randomDoctor = []
    let randomCommissar = []

    
    if (quantityCommissar !== undefined && quantityDoctor !== undefined && quantityDon !== undefined && quantityMafia !== undefined) {
        if ((parseInt(quantityCommissar, 10) + parseInt(quantityDoctor, 10) + parseInt(quantityDon, 10) + parseInt(quantityMafia, 10)) <= names.length){
            if (button.parentElement.querySelector('div')){
                button.parentElement.removeChild(button.parentElement.querySelector('div'))
            }
            function fillingArray(quantity,random) {
                for (let i = 0; i < parseInt(quantity, 10); i++) {
                    let name = names[Math.floor(Math.random() * names.length)]
                    random[i] = name
                    names.splice(names.indexOf(name),1)
                }
            }

            fillingArray(quantityCommissar,randomCommissar)
            fillingArray(quantityDoctor,randomDoctor)
            fillingArray(quantityDon,randomDon)
            fillingArray(quantityMafia,randomMafia)
            let spanMafia = document.querySelector('.mafia').querySelector('span')
            let spanDon = document.querySelector('.don').querySelector('span')
            let spanDoctor = document.querySelector('.doctor').querySelector('span')
            let spanCommissar = document.querySelector('.сommissar').querySelector('span')
            spanMafia.textContent = randomMafia.join(', ')
            spanDon.textContent = randomDon.join(', ')
            spanDoctor.textContent = randomDoctor.join(', ')
            spanCommissar.textContent = randomCommissar.join(', ')
        }
        else {
            if (!button.parentElement.querySelector('div')){
                button.insertAdjacentHTML('afterend', '<div>Выберите больше игроков или меньше ролей</div>')
            }
        }
    }

}
const inputs = document.querySelectorAll('input');

inputs.forEach(el => {
    el.addEventListener('blur', e => {
        if(e.target.value) {
            e.target.classList.add('dirty');
        } else {
            e.target.classList.remove('dirty');
        }
    })
})