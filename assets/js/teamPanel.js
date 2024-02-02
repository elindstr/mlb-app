// TODO: get teamID dynamically
let myTeamId = "109"
let myTeamName 
for (let i = 0; i < team_ids.length; i++) {
    if (myTeamId == team_ids[i][1]) {
        myTeamName = team_ids[i][0]
    }    
};

const teamElement = document.getElementById("teams")

teamElement.addEventListener("change", function() {
    myTeamId = this.value;

    console.log(myTeamId)
    getAsideRoster();
    updateTeamName();

});

// run on load
$(function() {
    // on load, get roster
    getAsideRoster();
    updateTeamName();

})

// handle buttons
$('#teamRosterBtn').on('click', function () {
    getAsideRoster()

    // restore id
    $(".asideSection").attr('id', 'asideSection')

    // make nav button active
    $('.nav').find('*').removeClass('active');
    $(this).addClass('active')
})

$('#teamGamesBtn').on('click', function () {
    getAsideGames()

    // restore id
    $(".asideSection").attr('id', 'asideSectionX')

    // make nav button active
    $('.nav').find('*').removeClass('active');
    $(this).addClass('active')
})

// Teams
const teamIDs = [109, 144, 110, 111, 112, 145, 113, 114, 115, 116, 117, 118, 108, 119, 146, 158, 142, 121, 147, 133, 143, 134, 135, 137, 136, 138, 139, 140, 141, 120]

//update Roster name

function updateTeamName() {
    for (let i = 0; i < team_ids.length; i++) {
        if (myTeamId == team_ids[i][1]) {
            myTeamName = team_ids[i][0]
        }    
    };
// generate aside title
    $("#myTeamName").text(myTeamName);
    
};

// get team roster
async function getAsideRoster() {
    let teamId = myTeamId          
    playersData = await fetchAsideRoster(teamId)
    players = playersData.roster_40.queryResults.row

    $(".asideSection").empty()
    $(".asideSection").addClass("aside-draggable")
    for (p = 0; p < players.length; p++) {

        // get details
        playerID = players[p].player_id
        playerName = players[p].name_display_first_last
        playerImage = await getPlayerImage(playerID, playerName)

        // render
        playerDiv = $("<div>")
            .attr('id', playerID)
            .attr('class', "card asideSection-player")
        playerDiv.append(playerImage, playerName)
        $(".asideSection").append(playerDiv)
    }


}

function fetchAsideRoster(teamId) {
    let url = `https://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id=${teamId}`
    return fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log(data)
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
            let imgHTML = $(`<img src='${imgsrc}' width='35px' alt='Image of ${name_display_first_last}'/>`)
                .prop('outerHTML')
            resolve(imgHTML)
        }

        img.onerror = () => {
            let defaultImgSrc = `./assets/media/players/404.png`
            let imgHTML = $(`<img src='${defaultImgSrc}' width='35px' alt='Default Image'/>`)
                .prop('outerHTML')
            resolve(imgHTML)

            console.log("note: ignore GET error; error handled with default 404 image")
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
    let teamId = myTeamId           
    games = await fetchAsideGames(startDate, endDate, teamId)

    if (games.totalGames > 0) {
        $(".asideSection").empty()

        gamesDisplayLimit = 10
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
                    homeTeamLogo = getTeamLogo(homeTeamid)
                } else {
                    homeTeamLogo = homeTeamName
                }
                let awayTeamLogo
                if (teamIDs.includes(awayTeamid)) {
                    awayTeamLogo = getTeamLogo(awayTeamid)
                } else {
                    awayTeamLogo = awayTeamName
                }


                //render details
                const asideSectionDiv = $('<div>').attr('gamePk', gamePk)
                const asideSectionDt = $(`<span>${dateTimeStr}</span>`)
                const asideSectionTeams = $(`<span>${homeTeamLogo} v. ${awayTeamLogo}</span>`)
                asideSectionDiv.append(asideSectionDt, asideSectionTeams)
                $(".asideSection").append(asideSectionDiv)
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




        // // render asideSection
        // $('#asideSection').empty()
  
        // //   // iterate through result game dates
        // //   for (let d = 0; d < 5; d++) {
            
        // //     $('#gamesDiv').append(`<h3>Games on ${data.dates[d].date}</h3>`)
            
        // //     // iterate through games on that day
        // //     for (let g = 0; g < data.dates[d].games.length; g++) {
      
        // //       // teams playing each other
        // //       let awayTeam = data.dates[d].games[g].teams.away.team.name
        // //       let homeTeam = data.dates[d].games[g].teams.home.team.name
      
        // //       // prepare team logo images
        // //       let mlbTeam_ids = [109,144,110,111,112,145,113,114,115,116,117,118,108,119,146,158,142,121,147,133,143,134,135,137,136,138,139,140,141,120,1536,1490,1547,1512,1531,1535,1493,1510,1546,165,185,189,191,128,153,176,197,298,166,209,148,221,168,205,211,151,172,178,184,186,188,192,212,157,174,177,180,200,202,163,126,127,220,213,156,129,196,187,224,161,167,169,193,206,208,210,125,130,152,175,181,198,201,219,222,223,299,297,204,199,124,150,123,132,195,155,173]
              
        // //       let awayTeam_id = data.dates[d].games[g].teams.away.team.id
        // //       let awayTeam_imgsrc = `../../assets/media/team-logos/${awayTeam_id}.png`
        // //       let awayTeam_img = $('<span><span>') 
        // //       if (mlbTeam_ids.includes(parseInt(awayTeam_id))) {
        // //         awayTeam_img = $(`<img src='${awayTeam_imgsrc}' width='35px' />`)
        // //       } 
        // //       let awayTeam_img_html = awayTeam_img.prop('outerHTML')
      
        // //       let homeTeam_id = data.dates[d].games[g].teams.home.team.id
        // //       let homeTeam_imgsrc = `../../assets/media/team-logos/${homeTeam_id}.png`
        // //       let homeTeam_img = $('<span><span>') 
        // //       if (mlbTeam_ids.includes(parseInt(homeTeam_id))) {
        // //         homeTeam_img = $(`<img src='${homeTeam_imgsrc}' width='35px' />`)
        // //       } 
        // //       let homeTeam_img_html = homeTeam_img.prop('outerHTML')
      
        // //       // render game content to gamesDiv, including the team logo if its an MLB team
        // //       $('#gamesDiv').append(`<p>${awayTeam}${awayTeam_img_html} @ ${homeTeam}${homeTeam_img_html}</p>`)
      
        // // //       $('#gamesDiv').append(`<button id='${data.dates[d].games[g].gamePk}'>View Game</button>`)
        // //     }
        // //   }
      