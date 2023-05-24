
function showCourses() {
    var courseList = document.getElementById("course-list");
    courseList.style.display = "block";
}

function selectCourse(courseName) {
    var searchInput = courseName;
    document.getElementById("search-input").value = searchInput;
    searchVideos();
    var courseList = document.getElementById("course-list");
    courseList.style.display = "none";
}

function searchVideos() {
    var searchInput = document.getElementById("search-input").value.trim();
    if (searchInput !== "") {
        var videoList = document.querySelector("#video-list .videos");
        videoList.innerHTML = "";

        // Make a request to the YouTube Data API to fetch videos based on the search query
        // Replace 'YOUR_API_KEY' with your actual YouTube Data API key

        var apiKey = 'AIzaSyDOCLSAw9J22WsXSzcq5vpeitzJ9qHEmLM';
        var apiUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + encodeURIComponent(searchInput) + '&type=video&key=' + apiKey;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.items.length > 0) {
                    data.items.forEach(item => {
                        var videoId = item.id.videoId;
                        var videoContainer = document.createElement("div");
                        videoContainer.classList.add("video-container");
                        var iframe = document.createElement("iframe");
                        iframe.src = "https://www.youtube.com/embed/" + videoId;
                        iframe.allow = "autoplay; encrypted-media";
                        iframe.allowFullscreen = true;
                        videoContainer.appendChild(iframe);
                        videoList.appendChild(videoContainer);
                    });
                } else {
                    videoList.innerHTML = "<p>No videos found for the search query.</p>";
                }
            })
            .catch(error => console.log(error));
    } 
}
