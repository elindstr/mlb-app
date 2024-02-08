// global variable
let myTeamId

// Modal-team selector
const teamID = document.getElementById("teamID")
teamID.addEventListener("change", function() {getTeamId = this.value;})

// show modal
var modal = document.getElementById('teamModal');
$(window).on('load',function() {
    let storageTeamId = localStorage.getItem('getTeamId')
    if (storageTeamId > 0 ) { // pass
    } else {$('#teamModal').modal('show');
    }
});

function filterTeam() { 
    //update Modal team storage
    try {
        getteam = localStorage.setItem('getTeamId', getTeamId);

        myTeamId = getTeamId;
        updateTeam();
        $('#teamModal').modal('hide');
    } catch {
    }
}

// team selector
const teamsSelector = document.getElementById("teamsSelector")
teamsSelector.addEventListener("change", function() {
    myTeamId = this.value;
    updateTeam()
})

function updateTeam() {

    // update local storage
    localStorage.setItem('myTeamId', myTeamId);

    // update selector value
    document.getElementById("teamsSelector").value = myTeamId

    // update team content
    getAsideRoster()
    getFieldImage()
    getTeamStadiumWeather()

    // update active tab
    $('#teamRosterBtn').removeClass('inactive')
    $('#teamGamesBtn').addClass('inactive');
    $('#teamRoster').addClass('active show')
}

// handle side table buttons
$('#teamRosterBtn').on('click', function () {
    updateTeam()
})

$('#teamGamesBtn').on('click', function () {
    getAsideGames()

    // update active tab
    $('#teamRosterBtn').addClass('inactive')
    $('#teamGamesBtn').removeClass('inactive');
})

$('#asideGames').on('click', '.team-logo-button', function () {
    myTeamId = $(this).attr('data-id')
    // console.log("new team:", myTeamId)
    updateTeam()
})

// Teams
const teamIDs = [109, 144, 110, 111, 112, 145, 113, 114, 115, 116, 117, 118, 108, 119, 146, 158, 142, 121, 147, 133, 143, 134, 135, 137, 136, 138, 139, 140, 141, 120]

function getFieldImage() {
    let imgsrc = `url(./assets/media/fields/${myTeamId}.jpg)`
    document.querySelector('body').style.backgroundImage = imgsrc
}

async function getTeamStadiumWeather() {
    teamAPI = await fetchTeamAPI()
    //console.log(teamAPI)
    teamCity = teamAPI.teams[0].locationName
    teamStadium = teamAPI.teams[0].venue.name
    cityGeoAPI = await fetchCityLatLon(teamCity)
    cityLat = cityGeoAPI[0].lat
    cityLon = cityGeoAPI[0].lon
    cityWeatherAPI = await fetchCityWeather(cityLat, cityLon)
    //console.log(cityWeatherAPI)
    teamWeatherTemp = cityWeatherAPI.list[0].main.temp
    teamWeatherDescription = cityWeatherAPI.list[0].weather[0].main
    
    $('#teamWeather').text(`Currently ${parseInt(teamWeatherTemp)}°, ${teamWeatherDescription}`)
    $('#teamStadium').text(`@ ${teamStadium}`)
}

// get team roster
async function getAsideRoster() {  
    const players = await fetchAsideRoster()
    $("#asideGames").empty()
    $("#asideRoster").empty()

    for (p = 0; p < players.length; p++) {
        // get details
        const playerID = players[p].person.id
        const playerName = players[p].person.fullName
        const playerPosition = players[p].position.abbreviation
        const playerImage = await getPlayerImage(playerID, playerName)

        // render
        let playerDiv = $("<div>")
            .attr('id', playerID)
            .attr('data-id', playerID)
            .attr('class', "card asideSection-player")
        playerDiv.append(playerImage, playerName)
        $('#asideRoster').append(playerDiv)
    }
}

function fetchAsideRoster() {
    url =  `https://statsapi.mlb.com/api/v1/teams/${myTeamId}/roster/`
    //let url = `https://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id=${myTeamId}`
    return fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            //console.log(data)
            return data.roster
                
        })
        .catch(function (error) {
            console.log(error)
        })
}

function fetchTeamAPI() {
    let url = `https://statsapi.mlb.com/api/v1/teams/${myTeamId}`
    return fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            return data
                
        })
        .catch(function (error) {
            console.log(error)
        })
}

function fetchCityLatLon(teamCity) {
    let url = `https://api.openweathermap.org/geo/1.0/direct?q=${teamCity}&limit=1&appid=0a46e3a36e6ff99db3768d2451ea6ee6`
    return fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            return data
        })
        .catch(function (error) {
            console.log(error)
        })
}

function fetchCityWeather(cityLat, cityLon) {
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=0a46e3a36e6ff99db3768d2451ea6ee6&units=imperial`
    return fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            return data
        })
        .catch(function (error) {
            console.log(error)
        })
}


// TODO: this function works, but it generates a console error; still searching for a method to suppress this error msg. After development phase, we can swap this for a fetch function that won't generate a console error; but that will generate a CORS error when testing locally.
function getPlayerImage(player_id, name_display_first_last) {
    return new Promise((resolve, reject) => {
        let imgsrc = `./assets/media/players/${player_id}.jpg`
        let img = new Image()

        img.onload = () => {
            let imgHTML = $(`<img src='${imgsrc}' alt='Image of ${name_display_first_last}'/>`)
                .prop('outerHTML')
            resolve(imgHTML)
        }

        img.onerror = () => {
            let defaultImgSrc = `./assets/media/players/404.png`
            let imgHTML = $(`<img src='${defaultImgSrc}' alt='Default Image'/>`)
                .prop('outerHTML')
            resolve(imgHTML)

            //console.log("note: ignore GET error; error handled with default 404 image")
        }

        img.src = imgsrc
    })
}

// get dates 
let today = new Date()
let todayStr = 
    today.getFullYear() + '-' + 
    String(today.getMonth() + 1).padStart(2, '0') + '-' + 
    String(today.getDate()).padStart(2, '0')
let seasonEnd = 
    today.getFullYear() + '-' + '12' + '-' + '01' 

// get upcoming games
async function getAsideGames() {
    let startDate = todayStr
    let endDate =  seasonEnd         
    games = await fetchAsideGames(startDate, endDate, myTeamId)

    if (games.totalGames > 0) {
        $("#asideGames").empty()
        $("#asideRoster").empty()

        gamesDisplayLimit = 20
        for (d = 0; d < gamesDisplayLimit; d++) {
            for (g = 0; g < games.dates[d].totalGames; g++) {

                // get details
                const gamePk = games.dates[d].games[g].gamePk
                const dT = new Date(games.dates[d].games[g].officialDate);
                const dateTimeStr = 
                    String(dT.getUTCMonth() + 1).padStart(2, '0') + '/' + 
                    String(dT.getUTCDate()).padStart(2, '0')
                const homeTeamid = games.dates[d].games[g].teams.home.team.id
                const homeTeamName = games.dates[d].games[g].teams.home.team.name
                const awayTeamid = games.dates[d].games[g].teams.away.team.id
                const awayTeamName = games.dates[d].games[g].teams.away.team.name
                
                let homeTeamLogo
                if (teamIDs.includes(homeTeamid)) {
                    homeTeamLogoImg = getTeamLogo(homeTeamid)
                    homeTeamLogo = $('<button>')
                        .addClass('team-logo-button')
                        .html(homeTeamLogoImg)
                        .attr('data-id', homeTeamid)

                } else {
                    homeTeamLogo = $('<span>')
                        .text(homeTeamName)
                        .addClass('minorLeagueTiny')
                }
                let awayTeamLogo
                if (teamIDs.includes(awayTeamid)) {
                    awayTeamLogoImg = getTeamLogo(awayTeamid)
                    awayTeamLogo = $('<button>')
                    .addClass('team-logo-button')
                    .html(awayTeamLogoImg)
                    .attr('data-id', awayTeamid)

                } else {
                    awayTeamLogo = $('<span>')
                        .text(awayTeamName)
                        .addClass('minorLeagueTiny')
                }
                
                //render details
                const asideSectionDiv = $('<div>')
                    .attr('gamePk', gamePk)
                    .attr('class', 'schedule-game')
                const asideSectionDt = $('<span>').text(dateTimeStr)
                const asideSpace = $('<span>').html('<br>')
                const asideSectionVs = $('<span>').text(' v ')
                const asideSectionTeams = $('<span>').append(homeTeamLogo, asideSectionVs, awayTeamLogo)
                
                asideSectionDiv.append(asideSectionDt, asideSpace, asideSectionTeams)
                $("#asideGames").append(asideSectionDiv)
            }
        }
    }
}

function fetchAsideGames(startDate, endDate, teamId) {
    let url = `https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${startDate}&endDate=${endDate}&teamId=${teamId}`
    return fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            //console.log(data)
            return data
             
        })
        .catch(function (error) {
            console.log(error)
        })
  }

  function getTeamLogo(team_id) {
    let imgsrc = `./assets/media/team-logos/${team_id}.png`
    let img = $(`<img src='${imgsrc}' width='35px' alt='Image of Team Logo'/>`)
    let imgHTML = img.prop('outerHTML')
    return imgHTML
  }
