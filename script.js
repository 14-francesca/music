document.addEventListener("DOMContentLoaded", function (){
    let Trackdata= {};
    
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    console.log(searchInput)
    
    let query = '';
    
    searchInput.addEventListener('change', (e)=>{
    query = (e.target.value);
    console.log(query);
    })
    
    
    
    searchButton.addEventListener('click', function() {
    console.log("performing track Search");
    
    let searchText = query;
    console.log("Search text: " +searchText);
    
    let searchURL = `https://api.spotify.com/v1/search?q=${searchText}&type=track&limit=1`;
    fetch(searchURL, {
    headers: {Authorization: ' Bearer BQA3q3j7KKx6kULk_F8_lEjRck67jifpb8tWnLigIIe50sC5XT3yWdbWJvKdO7UsfkjEhWHis0Yml4VbbeK8ojElVs3Qqka6D42JtN91qnG3-w65Q7Y'}
    })
    .then(resp => resp.json())
    .then(r => {
    console.log(JSON.stringify(r));
    trackData = r;
    displayTrackInfo();
    })
    
    });
    
    
    
    function displayTrackInfo(){
    const albulmNameElement = document.getElementById('albumName')
    const artistNameElement = document.getElementById('artistName')
    const trackNameElement = document.getElementById('trackName')
    const durationElement = document.getElementById('duration')
    const popularityElement = document.getElementById('popularity')
    const albumImageElement = document.getElementById('albumImage')
    
    albulmNameElement.textContent = trackData.tracks.items[0].album.name;
    artistNameElement.textContent = trackData.tracks.items[0].album.artists[0].name;
    trackNameElement.textContent = trackData.tracks.items[0].name;
    durationElement.textContent = formatDuration(trackData.tracks.items[0].duration_ms);
    popularityElement.textContent = trackData.tracks.items[0].popularity;
    albumImageElement.src = trackData.tracks.items[0].album.images[0].url;
    }
    function formatDuration(duration){
    const minutes = Math.floor(duration/6000);
    const seconds = ((duration % 6000) / 1000).toFixed(0);
    return `${minutes}:${(seconds < 10? '0' : '')}${seconds}`;
    }
    
    
    });