'use strict'

// Get elements
const newsContainer = document.getElementById('news-container')
const nextBtn = document.getElementById('btn-next')
const prevBtn = document.getElementById('btn-prev')
const pageNumb = document.getElementById('page-num')


// Api kye and default page
let apiKey = 'a25b97f4390240ea98733135c73127d2'
let page = 1 

// Get current user settings from local storage
if (getTempSetting() == null) {
    tempSettings = []
} else {
    tempSettings = getTempSetting()
}

// Set value for pageSize and category
let [pageSize, category] = tempSettings

// Fetch news from newsAPI
const getNews = async function (category, pageSize, page, apiKey) {
    try {
        const news = await fetch(`http://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`)

        // console.log(news.status)
        if (news.status != 200) throw new Error('Problem getting data')

        const data = await news.json()

        renderNews(data)

        return data
    } catch (err) {
        console.error(`${ err }`)
    }
}

// Render news based on current user's settings
if (tempSettings.length == 0) {
    
    getNews('general', 5, page, apiKey)
} else {
    if (pageSize == null || pageSize == '') {
        getNews(category, 5, page, apiKey)
    } else {
        getNews(category, pageSize, page, apiKey)
    }
}


// Render news function
const renderNews = function (data) {
    for (let i = 0; i < data.articles.length; i++) {
        const article = document.createElement('article')
        article.style.display = 'flex'
        article.style.border = "1.5px solid rgba(0, 0, 0, 0.1)"
        article.style.marginBottom = '5px'
        article.innerHTML = `
        <img class="img-thumbnail" style="width: 650px; height:auto;" src="${data.articles[i].urlToImage}"/>
        <div style="margin: 20px 20px; width: auto;">
            <h3>${data.articles[i].title}</h3>
            <p>${data.articles[i].description}</p>
            <button class="btn btn-primary" onclick="document.location='${data.articles[i].url}'">View</button>
        </div>
        `
        newsContainer.appendChild(article)
    }

    // Hide previous button if page number is 1
    page == 1 ? prevBtn.style.display = 'none' : prevBtn.style.display = 'initial'

    // Hide next button if cannot get any more articles
    let maxPage = Math.ceil(data.totalResults / pageSize)
    page == maxPage ? nextBtn.style.display = 'none' : nextBtn.style.display = 'initial'
}

// Next button 
nextBtn.addEventListener('click', function () {
    newsContainer.innerHTML = ''
    page++
    pageNumb.textContent = page
    getNews(category, pageSize, page, apiKey)
})

// Previous button
prevBtn.addEventListener('click', function () {
    newsContainer.innerHTML = ''
    page--
    pageNumb.textContent = page
    getNews(category, pageSize, page, apiKey)
});
