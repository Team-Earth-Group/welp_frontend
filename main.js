const url = 'http://localhost:3000/'

//bttn
const loginBttn = document.querySelector('.loginbutton')
const signupBttn = document.querySelector('.signupButton')


//forms
const singupForm = document.querySelector('.signupForm')
const loginForm = document.querySelector('.loginForm')
const searchBarForm = document.querySelector('.searchBarForm')

const signupScreen = document.querySelector('.signupScreen')
const loginScreen = document.querySelector('.lognScreen')


const hideElements = (...elements) => {
    for (let element of elements) {
        element.classList.add('hide');
    }
}

const showElements = (...elements) => {
    for (let element of elements) {
        element.classList.remove('hide');
    }
}

searchBarForm.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log(event.target)
})




