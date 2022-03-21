console.log('Client side javascript loaded')


const searchForm = document.querySelector('form')
const searchKey = document.querySelector('input')
const locationParagraph = document.querySelector('#locationParagraph')
const forecastParagraph = document.querySelector('#forecastParagraph')

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    locationParagraph.textContent='Loading...'
    forecastParagraph.textContent=''
    fetch('/weather?address=' + searchKey.value)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    locationParagraph.textContent=data.error
                }
                else {

                    locationParagraph.textContent = data.location
                    forecastParagraph.textContent = data.forecast
                }
            })
        })
})