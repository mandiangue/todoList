//INITIALIZATION OF SELECTORS
const form = document.querySelector('#formulaire')
const formu = document.querySelector('#forme')
const formGroup = document.querySelector('.form-group')
const inputTache = document.querySelector('#tache')
const listItems = document.querySelector('.list-items')
const submitTache = document.querySelector('.btnSubmit')
const msgAlert = document.querySelector('.message')
const insideContainer = document.querySelector('.inside')
const toutEffacer = document.querySelector('.clearAll')

//EVENT LISTENERS
formu.addEventListener('submit', postTache)
toutEffacer.addEventListener('click', clearAllItems)
window.addEventListener('DOMContentLoaded', loadItemFromLocalStorage)
//VARIABLES
let editID = ''
let editElement
let editFlag = false


// FUNCTION TO CREATE ITEM
function postTache(e) {
    e.preventDefault()
    createElement()
}


// FUNCTION CREATE HTML ELEMENTS
function createElement() {
    const id = new Date().getTime().toString()
    const inputValue = inputTache.value
    if (inputValue !== '' && !editFlag) {

        createHtmlElement(id, inputValue)
        displayAlertMsg("Tâche ajoutée avec succès", "success")

        addToLocalStorage(id, inputValue)
        setToDefault()

    } else if (inputValue !== '' && editFlag) {

        editElement.innerText = inputValue
        displayAlertMsg("Une tâche a été modifiée avec succès", "success")
        editLocalStorage(editID, inputValue)
        setToDefault()
    }
    else {
        displayAlertMsg("Merci de remplir le champ", "danger")

    }
}

// FUNCTION DISPLAY ALERT MESSAGE with SETTIMEOUt
function displayAlertMsg(text, color) {
    msgAlert.textContent = text
    msgAlert.classList.add(`alert-${color}`)

    setTimeout(function () {
        msgAlert.textContent = ''
        msgAlert.classList.remove(`alert-${color}`)

    }, 1000)
}


// FUNCTION CLEAR ALL ITEMS
function clearAllItems() {
    const items = document.querySelectorAll('li')
    if (items.length > 0) {
        items.forEach(function (item) {
            listItems.removeChild(item)
        })
    }
    toutEffacer.classList.add('hide-clear')
    displayAlertMsg("Vous n'avez plus de tâches !", "danger")
    setToDefault()
    localStorage.removeItem('tachelist')

}



// FUNCTION DELETE ITEM
function deleteItem(e) {
    const element = e.currentTarget.parentElement
    const id = element.dataset.id
    listItems.removeChild(element)
    if (listItems.children.length === 0) {
        insideContainer.classList.add('hide-list')
        toutEffacer.classList.add('hide-clear')
    }
    displayAlertMsg("Une tâche a été supprimée", "danger")
    setToDefault()
    removeFromLocalStorage(id)
}

//FUNCTION CRETATE HTML ELEMENT
function createHtmlElement(id, inputValue) {
    const listElement = document.createElement('li')
    const attr = document.createAttribute('data-id')
    attr.value = id
    listElement.setAttributeNode(attr)
    listElement.innerHTML = `<h5> ${inputValue}</h5>
   <i class="far fa-edit editeBtn"></i>
   <i class="far fa-trash-alt deleteBtn"></i>`
    const effacerBtn = listElement.querySelector('.deleteBtn')
    const editerBtn = listElement.querySelector('.editeBtn')

    //EVENT LISTENERS
    effacerBtn.addEventListener('click', deleteItem)
    editerBtn.addEventListener('click', editItem)

    listItems.appendChild(listElement)

    insideContainer.classList.add('show-list')
    toutEffacer.classList.remove('hide-clear')
}


// FUNCTION EDIT ITEM
function editItem(e) {
    const element = e.currentTarget.parentElement
    editElement = e.currentTarget.parentElement
    inputTache.value = editElement.textContent
    editFlag = true
    editID = element.dataset.id
    submitTache.textContent = "Editer"
    
}
//FUNCTION TO SET DEFAULT ALL VARIABLES
function setToDefault() {
    inputTache.value = ''
    editFlag = false
    editID = ''
    submitTache.textContent = 'Envoyer'
}
//FUNCTION TO ADD IN LOCAL STORAGE
function addToLocalStorage(id, inputValue) {
    const taches = { id, inputValue }
    let items = getLocalstorage()
    items.push(taches)
    localStorage.setItem('tachelist', JSON.stringify(items))

}
// FUNCTION GET localSorage
function getLocalstorage() {
    return localStorage.getItem('tachelist') ? JSON.parse(localStorage.getItem('tachelist')) :
        items = []

}
//FUNCTION TO REMOVE ITEM FROM LOCAL STORAGE
function removeFromLocalStorage(id) {
    let items = getLocalstorage()
    items = items.filter(function (item) {
        if (item.id !== id) {
            return item
        }
    })
    localStorage.setItem('tachelist', JSON.stringify(items))
}
//FUNCTION EDIT LOCAL STORAGE

function editLocalStorage(id, inputValue) {
    let items = getLocalstorage()
    items = items.map(function (item) {
        if (item.id === id) {
            item.inputValue = inputValue
        }
        return item
    })
    localStorage.setItem('tachelist', JSON.stringify(items))
   window.location.href ='http://127.0.0.1:5500/page.html'
}

//FUNCTION LOAD ITEMs FROM LOCALSTORAGE
function loadItemFromLocalStorage() {
    let items = getLocalstorage()
    if (items.length > 0) {
        items.forEach(function (item) {

            createHtmlElement(item.id, item.inputValue)

        })

    }
}