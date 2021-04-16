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
const businessDetailsScreen = document.querySelector('.businessDetails')


//functions
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

const createComment = (comment, business) => {
    const commentDiv = document.createElement('div')
    commentDiv.classList.add('comment')
    const userComment = document.createElement('h3')
    userComment.innerText = `${business.user.name}`
    const commentText = document.createElement('p')
    commentText.innerText = comment.text
    commentDiv.append(userComment)
    commentDiv.append(commentText)

    return commentDiv
}

const getUser = async () => {
    const userId = localStorage.getItem('userId')
    const response = await axios.get(`${url}/users/${userId}`)
    return response.data.user
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
    detailsBtn.setAttribute('data-business-id', business.id)
    detailsBtn.classList.add('detailsButton')

    businessDiv.append(imageDiv)
    businessDiv.append(nameDiv)
    businessDiv.append(locationDiv)
    businessDiv.append(descriptionDiv)
    businessDiv.append(detailsBtn)

    // listing a single business
    detailsBtn.addEventListener('click', async (event) => {
        event.preventDefault()
        hideElements(searchResultScreen)
        removeAllChildren(businessDetailsScreen)

        // business info
        const businessId = event.target.getAttribute('data-business-id')
        const response = await axios.get(`${url}/businesses/${businessId}/comments`)
        const business = response.data.business
        const comments = response.data.comments

        const businessImage = document.createElement('img')
        businessImage.src = business.imageUrl
        businessImage.alt = business.name
        const businessName = document.createElement('h2')
        businessName.innerText = business.name
        const description = document.createElement('p')
        description.innerText = business.description
        const createdBy = document.createElement('p')
        createdBy.innerHTML = `-Created by <b>${business.user.name}</b>`

        // comment section
        const commentSection = document.createElement('div')
        commentSection.classList.add('commentSection')
        const addCommentBtn = document.createElement('button')
        addCommentBtn.innerText = 'Add Comment'
        addCommentBtn.classList.add('addCommentBtn')
        const commentForm = document.createElement('form')
        commentForm.classList.add('commentForm')
        const divComment = document.createElement('div')
        const labelComment = document.createElement('label')
        labelComment.setAttribute("for", "commentText")
        labelComment.innerText = "Type your comment"
        const inputComment = document.createElement('input')
        inputComment.setAttribute("type", "text")
        inputComment.setAttribute("name", "commentText")
        inputComment.setAttribute("id", "commentText")
        const submitComment = document.createElement('input')
        submitComment.setAttribute("type", "submit")

        divComment.append(labelComment)
        divComment.append(inputComment)
        divComment.append(submitComment)
        commentForm.append(divComment)

        hideElements(commentForm)

        commentSection.append(addCommentBtn)
        commentSection.append(commentForm)

        for (let comment of comments) {
            const newCommentDiv = createComment(comment, business)
            commentSection.append(newCommentDiv)
        }

        businessDetailsScreen.append(businessImage)
        businessDetailsScreen.append(businessName)
        businessDetailsScreen.append(description)
        businessDetailsScreen.append(createdBy)
        businessDetailsScreen.append(commentSection)

        // add comment form submitted
        commentForm.addEventListener('submit', async (event) => {
            event.preventDefault()
            const commentText = event.target.commentText.value
            const currentUser = await getUser()
            const response = await axios.post(`${url}/businesses/${businessId}/comments`, {
                text: commentText,
                userId: currentUser.id
            })
            const newComment = createComment(response.data.comment, response.data.business)
            commentSection.append(newComment)
            hideElements(commentForm)
        })

        // add comment btn clicked
        addCommentBtn.addEventListener('click', () => {
            showElements(commentForm)
        })

    })

    return businessDiv
}

// event listeners
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

//search
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
signupBttn.addEventListener('click', () => {
    showElements(signupScreen)
    hideElements(loginScreen, searchBarScreen, searchResultScreen)
})

//login
loginBttn.addEventListener('click', () => {
    console.log('hi')
    showElements(loginScreen)
    hideElements(signupScreen, searchBarScreen, searchResultScreen)

})


//logout
logoutBttn.addEventListener('click', () => {
    localStorage.removeItem('userId')
    location.reload();

})


