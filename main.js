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
const searchResultScreen = document.querySelector('.searchResultContainer')
const searchBarScreen = document.querySelector('.searchBar')
const businessDetailsScreen = document.querySelector('.businessPage')
const homeScreen = document.querySelector('.home')

//constants
const ratings = [1, 2, 3, 4, 5]

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

const createComment = (comment, user) => {
    const commentDiv = document.createElement('div')
    commentDiv.classList.add('comments')
    const userCommentDiv = document.createElement('div')
    userCommentDiv.classList.add('commentUserName')
    const userComment = document.createElement('h3')
    userComment.innerText = `${user.name}`
    userCommentDiv.append(userComment)
    const commentRatingDiv = document.createElement('div')
    commentRatingDiv.classList.add('headline')
    const commentRating = document.createElement('h4')
    commentRating.innerText = `${comment.rating} stars`
    commentRatingDiv.append(commentRating)
    const commentTextDiv = document.createElement('div')
    commentTextDiv.classList.add('usersComment')
    const commentText = document.createElement('p')
    commentText.innerText = comment.text
    commentTextDiv.append(commentText)
    commentDiv.append(userCommentDiv)
    commentDiv.append(commentRatingDiv)
    commentDiv.append(commentTextDiv)

    return commentDiv
}

const getUser = async () => {
    const userId = localStorage.getItem('userId')
    const response = await axios.get(`${url}/users/${userId}`)
    return response.data.user
}

const insertAfter = (newNode, referenceNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

const addBusiness = (business) => {
    const businessDiv = document.createElement('div')
    businessDiv.classList.add('business')
    const imageDiv = document.createElement('div')
    imageDiv.classList.add('businessImg')
    const image = document.createElement('img')
    image.src = business.imageUrl
    image.alt = business.name
    imageDiv.append(image)
    const nameDiv = document.createElement('div')
    const name = document.createElement('h3')
    name.innerText = business.name
    nameDiv.append(name)
    const locationDiv = document.createElement('div')
    const location = document.createElement('h5')
    location.innerText = business.location
    locationDiv.append(location)
    const descriptionDiv = document.createElement('div')
    const description = document.createElement('h6')
    description.innerText = business.description
    descriptionDiv.append(description)
    const detailsBtn = document.createElement('button')
    detailsBtn.innerText = 'View more'
    detailsBtn.setAttribute('data-business-id', business.id)
    detailsBtn.classList.add('moreInfo')

    businessDiv.append(imageDiv)
    businessDiv.append(nameDiv)
    businessDiv.append(locationDiv)
    businessDiv.append(descriptionDiv)
    businessDiv.append(detailsBtn)

    // listing a single business
    detailsBtn.addEventListener('click', async (event) => {
        event.preventDefault()
        hideElements(homeScreen)
        removeAllChildren(businessDetailsScreen)
        showElements(businessDetailsScreen)
        const returnBtnDiv = document.createElement('div')
        returnBtnDiv.classList.add('returnButtonDiv')
        const returnBtn = document.createElement('button')
        returnBtn.innerText = 'Return'
        returnBtn.classList.add('returnButton')
        returnBtnDiv.append(returnBtn)

        returnBtn.addEventListener('click', (event) => {
            hideElements(businessDetailsScreen)
            removeAllChildren(businessDetailsScreen)
            showElements(homeScreen)
        })
        // business info
        const businessId = event.target.getAttribute('data-business-id')
        const response = await axios.get(`${url}/businesses/${businessId}/comments`)
        const business = response.data.business
        const comments = response.data.comments

        const businessImageDiv = document.createElement('div')
        businessImageDiv.classList.add('businessPageImgDiv')
        const businessImage = document.createElement('img')
        businessImage.src = business.imageUrl
        businessImage.alt = business.name
        businessImage.classList.add('businessPageImg')
        businessImageDiv.append(businessImage)

        const businessNameDiv = document.createElement('div')
        businessNameDiv.classList.add('bussinessPageName')
        const businessName = document.createElement('h2')
        businessName.innerText = business.name
        businessNameDiv.append(businessName)

        const businessAddressDiv = document.createElement('div')
        businessAddressDiv.classList.add('businessAddress')
        const businessAddress = document.createElement('h5')
        businessAddress.innerText = business.location
        businessAddressDiv.append(businessAddress)

        const businessTypeDiv = document.createElement('div')
        businessTypeDiv.classList.add('bussinessType')
        const businessType = document.createElement('h6')
        businessType.innerText = business.type
        businessTypeDiv.append(businessType)

        const descriptionDiv = document.createElement('div')
        descriptionDiv.classList.add('businessPageDescription')
        const description = document.createElement('p')
        description.innerText = business.description
        descriptionDiv.append(description)

        const createdByDiv = document.createElement('div')
        createdByDiv.classList.add('bussinessType')
        const createdBy = document.createElement('h3')
        createdBy.innerText = business.user.name
        createdByDiv.append(createdBy)

        // comment section
        const commentSection = document.createElement('div')
        commentSection.classList.add('commentSection')
        const addCommentBtnDiv = document.createElement('div')
        addCommentBtnDiv.classList.add('addReview')
        const addCommentBtn = document.createElement('button')
        addCommentBtn.innerText = 'Add Comment'
        addCommentBtn.classList.add('addReviewButton')
        addCommentBtnDiv.append(addCommentBtn)

        const formHolder = document.createElement('div')
        formHolder.classList.add('formHolder')
        const commentForm = document.createElement('form')
        const divComment = document.createElement('div')
        divComment.classList.add('inputComment')
        const inputComment = document.createElement('input')
        inputComment.setAttribute("type", "text")
        inputComment.setAttribute("name", "commentText")
        inputComment.setAttribute("id", "commentText")
        inputComment.setAttribute("placeholder", "Write a review")
        const ratingComment = document.createElement('select')
        ratingComment.classList.add('rating')
        //create and append the options
        for (let i = 0; i < ratings.length; i++) {
            let option = document.createElement("option");
            option.value = ratings[i];
            option.text = ratings[i];
            ratingComment.appendChild(option);
        }
        const submitComment = document.createElement('button')
        submitComment.innerText = "Submit"

        divComment.append(inputComment)
        divComment.append(ratingComment)
        divComment.append(submitComment)
        commentForm.append(divComment)
        formHolder.append(commentForm)

        hideElements(formHolder)

        commentSection.append(addCommentBtnDiv)
        commentSection.append(formHolder)

        for (let comment of comments) {
            const newCommentDiv = createComment(comment, comment.user)
            commentSection.append(newCommentDiv)
        }
        businessDetailsScreen.append(returnBtnDiv)
        businessDetailsScreen.append(businessImageDiv)
        businessDetailsScreen.append(businessNameDiv)
        businessDetailsScreen.append(businessAddressDiv)
        businessDetailsScreen.append(businessTypeDiv)
        businessDetailsScreen.append(descriptionDiv)
        businessDetailsScreen.append(createdByDiv)
        businessDetailsScreen.append(commentSection)

        // add comment form submitted
        commentForm.addEventListener('submit', async (event) => {
            event.preventDefault()
            const commentText = event.target.commentText.value
            const currentUser = await getUser()
            const response = await axios.post(`${url}/businesses/${businessId}/comments`, {
                text: commentText,
                userId: currentUser.id,
                rating: ratingComment.value
            })
            const newComment = createComment(response.data.comment, currentUser)
            insertAfter(newComment, addCommentBtnDiv)
            hideElements(formHolder)
        })

        // add comment btn clicked
        addCommentBtn.addEventListener('click', () => {
            showElements(formHolder)
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
        alert('Could not signup, please try agin.')
    }

})


//login
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()
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
    const keyword = event.target.elements[0].value
    const location = event.target.location.value
    const response = await axios.get(`${url}/businesses?keyword=${keyword}&location=${location}`)
    const businesses = response.data.businesses
    removeAllChildren(searchResultScreen)
    showElements(searchResultScreen)
    const searchResults = document.createElement('div')
    searchResults.classList.add('searchResult')
    for (let business of businesses) {
        const businessDiv = addBusiness(business)
        searchResults.append(businessDiv)
    }
    searchResultScreen.append(searchResults)
})
//signup button
signupBttn.addEventListener('click', () => {
    showElements(signupScreen)
    hideElements(loginScreen, searchBarScreen, searchResultScreen)
})

//login
loginBttn.addEventListener('click', () => {
    showElements(loginScreen)
    hideElements(signupScreen, searchBarScreen, searchResultScreen)

})


//logout
logoutBttn.addEventListener('click', () => {
    localStorage.removeItem('userId')
    location.reload();
})


