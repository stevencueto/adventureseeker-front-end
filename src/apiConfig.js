let APILink

const apiUrls = {
    production: "https://adventureseekerapi.herokuapp.com/",
    development: "http://localhost:8000/"
}

if (window.location.hostname === "localhost") {
    APILink = apiUrls.development
} else {
    APILink = apiUrls.production
}

export default APILink