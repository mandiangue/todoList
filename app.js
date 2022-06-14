const msgAlert = document.querySelector('.message')
const form = document.querySelector('.forme')
const inputName = document.querySelector('.name')
const inputPassword = document.querySelector('.password')
const buttonSubmit = document.querySelector('.btnSubmit')

//ADEVEN LISTENER
buttonSubmit.addEventListener('click', envoieForm)


//ENVOI FORMULAIRE
function envoieForm(e){
    e.preventDefault()
    const name = 'testeur'
    const password = 'test'
    const nameValue = inputName.value
    const passwordValue = inputPassword.value
   if(nameValue === '' || passwordValue === ''){
       displayAlertMsg('Merci de remplir les champs', 'danger')
   }else if(nameValue !== name || passwordValue !== password){
    displayAlertMsg('Identifiant ou mot de passe invalide', 'danger')
   }else{
       displayAlertMsg('connexion réussie', 'success')
   }
   window.location.href ='http://127.0.0.1:5500/page.html'
}




//FUNCTION DISPLAY MESSAGE ALERT
function displayAlertMsg(text, color) {
    msgAlert.textContent = text
    msgAlert.classList.add(`alert-${color}`)

    setTimeout(function () {
        msgAlert.textContent = ''
        msgAlert.classList.remove(`alert-${color}`)

    }, 1000)
}