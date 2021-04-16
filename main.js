const url = 'http://localhost:3001'

//bttn
const logoutBttn = document.querySelector('.logoutButton')
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
const searchBarScreen = document.querySelector('.searchBar')

const hideElements = (...elements) => {
    for (let element of elements) {
        element.classList.add('hidden');
    }
}

const showElements = (...elements) => {
    for (let element of elements) {
        element.classList.remove('hidden');
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
    const image = document.createElement('img')
    image.src = business.imageUrl
    image.alt = business.name
    const name = document.createElement('h3')
    name.innerText = business.name
    const location = document.createElement('span')
    location.innerText = business.location
    const description = document.createElement('p')
    description.innerText = business.description
    const detailsBtn = document.createElement('button')
    detailsBtn.innerText = 'View details'
    businessDiv.append(image)
    businessDiv.append(name)
    businessDiv.append(location)
    businessDiv.append(description)
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
        showElements(searchResultScreen, logoutBttn)
        hideElements(signupScreen, loginBttn)

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
        showElements(searchResultScreen, logoutBttn)
        hideElements(loginScreen, loginBttn, signupBttn)

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
//signup button
signupBttn.addEventListener('click', () =>{
    showElements(signupScreen)
    hideElements(loginScreen, searchBarScreen, searchResultScreen)
})

//login
loginBttn.addEventListener('click', () =>{
    console.log('hi')
    showElements(loginScreen)
    hideElements(signupScreen, searchBarScreen, searchResultScreen)

})

//logout
logoutBttn.addEventListener('click', () =>{
    localStorage.removeItem('userId')
    location.reload();

})

// listing a single business
