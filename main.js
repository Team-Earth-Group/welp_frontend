const url = 'http://localhost:3001'

//bttn
const loginBttn = document.querySelector('.loginButton')
const signupBttn = document.querySelector('.signupButton')


//forms
const signupForm = document.querySelector('.signupForm')
const loginForm = document.querySelector('.loginForm')
const searchBarForm = document.querySelector('.searchBarForm')

//screens
const signupScreen = document.querySelector('.signupScreen')
const loginScreen = document.querySelector('.loginScreen')
const searchResultScreen = document.querySelector('.searchResult')

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

const removeAllChildren = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const addBusiness = (business) => {
    console.log(business);
    const businessDiv = document.createElement('div')
    businessDiv.classList.add('business')
    const imageDiv = document.createElement('div')
    const image = document.createElement('img')
    image.src = business.imageUrl
    image.alt = business.name
    image.classList.add('businessImg')
    imageDiv.append(image)
    const nameDiv = document.createElement('div')
    const name = document.createElement('h3')
    name.innerText = business.name
    nameDiv.append(name)
    const locationDiv = document.createElement('div')
    const location = document.createElement('span')
    location.innerText = business.location
    const descriptionDiv = document.createElement('div')
    const description = document.createElement('p')
    description.innerText = business.description
    descriptionDiv.append(description)
    const detailsBtn = document.createElement('button')
    detailsBtn.innerText = 'View details'
    businessDiv.append(imageDiv)
    businessDiv.append(nameDiv)
    businessDiv.append(locationDiv)
    businessDiv.append(descriptionDiv)
    businessDiv.append(detailsBtn)
    return businessDiv
}

//signup
signupForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    // console.log(event.target.name.value)
    const name = event.target.name.value
    const email = event.target.email.value
    const password = event.target.password.value

    try {
        const user = await axios.post(`${url}/users`, {
            name: name,
            email: email,
            password: password
        })
        const userId = user.data.user.id
        localStorage.setItem('userId', userId)

        alert(`Welcome to Welp, ${user.data.user.name}!`)

    } catch (error) {
        console.log(error)
        alert('Could not signup, please try agin.')
    }

})


//login
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    //console.log('hi')
    const email = event.target.email.value
    const password = event.target.password.value

    try {
        const user = await axios.post(`${url}/users/login`, {
            email: email,
            password: password
        })
        const userId = user.data.user.id
        localStorage.setItem('userId', userId)

        alert(`Welcome back, ${user.data.user.name}!`)
    } catch (error) {
        console.log(error)
        alert('Email or password incorrect, please try agin.')

    }
})


searchBarForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const keyword = event.target.keyword.value
    const location = event.target.location.value
    const response = await axios.get(`${url}/businesses?keyword=${keyword}&location=${location}`)
    const businesses = response.data.businesses

    removeAllChildren(searchResultScreen)
    for (let business of businesses) {
        const businessDiv = addBusiness(business)
        searchResultScreen.appendChild(businessDiv)
    }
})

//logout
// document.querySelector('dont have a logout variable').addEventListener('click', () =>{
//     localStorage.removeItem('userId')
//     location.reload();
// })
