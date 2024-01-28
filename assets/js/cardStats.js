// on load, look up current players (TODO: currently the existing players are placeholders; need to load players from localStorage)
$(function() { 
    cards = $('#primary-cards').children()
    for (i = 0; i < cards.length; i++) {
        createFeaturePlayerCard(cards[i].id)
    }
    cards = $('#secondary-cards').children()
    for (i = 0; i < cards.length; i++) {
        createPlayerCard(cards[i].id)
    }
})

// placeholder when no stats available
const na = '-' 

// called by draggableCards.js when a user drags an item to the primary section
async function createFeaturePlayerCard(player_id) {
    // get stats
    const playerDetails = await getPlayerDetails(player_id)
    const primary_position_txt = playerDetails.primary_position_txt
    const team_id = playerDetails.team_id
    const name_display_first_last = playerDetails.name_display_first_last

    // load media (team_id, player_id)
    teamLogo = await getTeamLogo(team_id)
    const playerImage = await getPlayerImage(player_id, name_display_first_last)    // TODO: Debug

    // seasonPositionStats depending on hitter or pitcher
    let seasonPositionStats
    if (primary_position_txt == 'P') {
        seasonPositionStats2023 = await getSeasonPitcherStats(player_id, year=2023)
        seasonPositionStats2022 = await getSeasonPitcherStats(player_id, year=2022)
        careerPositionStats = await getCareerPitcherStats(player_id)
    }
    else {
        seasonPositionStats2023 = await getSeasonHitterStats(player_id, year=2023)
        seasonPositionStats2022 = await getSeasonHitterStats(player_id, year=2022)
        careerPositionStats = await getCareerHitterStats(player_id)
    }

    // create slash line
    if (playerDetails.primary_position_txt == 'P') {
        slashTable = $('<table>')
        slashRow = $('<tr>')
        slashThYear = $('<th></th>')
        slashThERA = $('<th>era</th>')
        slashThWHIP = $('<th>whip</th>')
        slashThIP = $('<th>ip</th>')
        slashThW = $('<th>w</th>')
        slashThGS = $('<th>gs</th>')
        slashThHLD = $('<th>hld</th>')
        slashRow.append(slashThYear, slashThERA, slashThWHIP, slashThIP, slashThW, slashThGS, slashThHLD)
        slashTable.append(slashRow)
  
        slashRow = $('<tr>')
        eraCareer = careerPositionStats? careerPositionStats.era: na
        whipCareer = careerPositionStats? careerPositionStats.whip: na
        ipCareer = careerPositionStats? careerPositionStats.ip: na
        wCareer = careerPositionStats? careerPositionStats.w: na
        gsCareer = careerPositionStats? careerPositionStats.gs: na
        hldCareer = careerPositionStats? careerPositionStats.hld: na
        slashTdYear = $(`<td>Career</td>`)
        slashTdERA = $(`<td>${eraCareer? eraCareer: na}</td>`)
        slashTdWHIP = $(`<td>${whipCareer? whipCareer: na}</td>`)
        slashTdIP = $(`<td>${ipCareer? ipCareer: na}</td>`)
        slashTdW = $(`<td>${wCareer? wCareer: na}</td>`)
        slashTdGS = $(`<td>${gsCareer? gsCareer: na}</td>`)
        slashTdHLD = $(`<td>${hldCareer? hldCareer: na}</td>`)
        slashRow.append(slashTdYear, slashTdERA, slashTdWHIP, slashTdIP, slashTdW, slashTdGS, slashTdHLD)
        slashTable.append(slashRow)
  
        if (seasonPositionStats2023) {
          slashRow = $('<tr>')
          era2023 = seasonPositionStats2023.era
          whip2023 = seasonPositionStats2023.whip
          ip2023 = seasonPositionStats2023.ip
          w2023 = seasonPositionStats2023.w
          gs2023 = seasonPositionStats2023.gs
          hld2023 = seasonPositionStats2023.hld
          slashTdYear = $(`<td>2023</td>`)
          slashTdERA = $(`<td>${era2023? era2023: na}</td>`)
          slashTdWHIP = $(`<td>${whip2023? whip2023: na}</td>`)
          slashTdIP = $(`<td>${ip2023? ip2023: na}</td>`)
          slashTdW = $(`<td>${w2023? w2023: na}</td>`)
          slashTdGS = $(`<td>${gs2023? gs2023: na}</td>`)
          slashTdHLD = $(`<td>${hld2023? hld2023: na}</td>`)
          slashRow.append(slashTdYear, slashTdERA, slashTdWHIP, slashTdIP, slashTdW, slashTdGS, slashTdHLD)
          slashTable.append(slashRow)
        }
  
        if (seasonPositionStats2022) {
          slashRow = $('<tr>')
          era2022 = seasonPositionStats2022.era
          whip2022 = seasonPositionStats2022.whip
          ip2022 = seasonPositionStats2022.ip
          w2022 = seasonPositionStats2022.w
          gs2022 = seasonPositionStats2022.gs
          hld2022 = seasonPositionStats2022.hld
          slashTdYear = $(`<td>2022</td>`)
          slashTdERA = $(`<td>${era2022? era2022: na}</td>`)
          slashTdWHIP = $(`<td>${whip2022? whip2022: na}</td>`)
          slashTdIP = $(`<td>${ip2022? ip2022: na}</td>`)
          slashTdW = $(`<td>${w2022? w2022: na}</td>`)
          slashTdGS = $(`<td>${gs2022? gs2022: na}</td>`)
          slashTdHLD = $(`<td>${hld2022? hld2022: na}</td>`)
          slashRow.append(slashTdYear, slashTdERA, slashTdWHIP, slashTdIP, slashTdW, slashTdGS, slashTdHLD)
          slashTable.append(slashRow)
        }
    }
    else { // hitter
        slashTable = $('<table>')
        slashRow = $('<tr>')
        slashThYear = $('<th></th>')
        slashThERA = $('<th>avg</th>')
        slashThWHIP = $('<th>obp</th>')
        slashThIP = $('<th>slg</th>')
        slashThW = $('<th>ops</th>')
        slashThGS = $('<th>rbi</th>')
        slashThHLD = $('<th>tpa</th>')
        slashRow.append(slashThYear, slashThERA, slashThWHIP, slashThIP, slashThW, slashThGS, slashThHLD)
        slashTable.append(slashRow)
    
        slashRow = $('<tr>')
        eraCareer = careerPositionStats? careerPositionStats.avg: na
        whipCareer = careerPositionStats? careerPositionStats.obp: na
        ipCareer = careerPositionStats? careerPositionStats.slg: na
        wCareer = careerPositionStats? careerPositionStats.ops: na
        gsCareer = careerPositionStats? careerPositionStats.rbi: na
        hldCareer = careerPositionStats? careerPositionStats.tpa: na
        slashTdYear = $(`<td>Career</td>`)
        slashTdERA = $(`<td>${eraCareer? eraCareer: na}</td>`)
        slashTdWHIP = $(`<td>${whipCareer? whipCareer: na}</td>`)
        slashTdIP = $(`<td>${ipCareer? ipCareer: na}</td>`)
        slashTdW = $(`<td>${wCareer? wCareer: na}</td>`)
        slashTdGS = $(`<td>${gsCareer? gsCareer: na}</td>`)
        slashTdHLD = $(`<td>${hldCareer? hldCareer: na}</td>`)
        slashRow.append(slashTdYear, slashTdERA, slashTdWHIP, slashTdIP, slashTdW, slashTdGS, slashTdHLD)
        slashTable.append(slashRow)
        
        if (seasonPositionStats2023) {
            slashRow = $('<tr>')
            era2023 = seasonPositionStats2023.avg
            whip2023 = seasonPositionStats2023.obp
            ip2023 = seasonPositionStats2023.slg
            w2023 = seasonPositionStats2023.ops
            gs2023 = seasonPositionStats2023.rbi
            hld2023 = seasonPositionStats2023.tpa
            slashTdYear = $(`<td>2023</td>`)
            slashTdERA = $(`<td>${era2023? era2023: na}</td>`)
            slashTdWHIP = $(`<td>${whip2023? whip2023: na}</td>`)
            slashTdIP = $(`<td>${ip2023? ip2023: na}</td>`)
            slashTdW = $(`<td>${w2023? w2023: na}</td>`)
            slashTdGS = $(`<td>${gs2023? gs2023: na}</td>`)
            slashTdHLD = $(`<td>${hld2023? hld2023: na}</td>`)
            slashRow.append(slashTdYear, slashTdERA, slashTdWHIP, slashTdIP, slashTdW, slashTdGS, slashTdHLD)
            slashTable.append(slashRow)
        }
    
        if (seasonPositionStats2022) {
            slashRow = $('<tr>')
            era2022 = seasonPositionStats2022.avg
            whip2022 = seasonPositionStats2022.obp
            ip2022 = seasonPositionStats2022.slg
            w2022 = seasonPositionStats2022.ops
            gs2022 = seasonPositionStats2022.rbi
            hld2022 = seasonPositionStats2022.tpa
            slashTdYear = $(`<td>2022</td>`)
            slashTdERA = $(`<td>${era2022? era2022: na}</td>`)
            slashTdWHIP = $(`<td>${whip2022? whip2022: na}</td>`)
            slashTdIP = $(`<td>${ip2022? ip2022: na}</td>`)
            slashTdW = $(`<td>${w2022? w2022: na}</td>`)
            slashTdGS = $(`<td>${gs2022? gs2022: na}</td>`)
            slashTdHLD = $(`<td>${hld2022? hld2022: na}</td>`)
            slashRow.append(slashTdYear, slashTdERA, slashTdWHIP, slashTdIP, slashTdW, slashTdGS, slashTdHLD)
            slashTable.append(slashRow)
        }
    }

    // construct card
    const playerNameSection = $('<span>')
        .attr('class', 'card-player-name')
    playerNameSection.append(playerImage, name_display_first_last)
    teamNameSection = $('<span>')
        .attr('class', 'card-team-name')
    teamNameSection.append(teamLogo) 
    slashTableSection = $('<span>')
        .attr('class', 'slash-table')
    slashTableSection.append(slashTable)
    
    $(`#${player_id}`).empty()
    $(`#${player_id}`).append(playerNameSection, teamNameSection, slashTableSection)
}

// called by autoComplete.js when user selects a player from the search
async function createPlayerCard (player_id) {

    // get stats
    const playerDetails = await getPlayerDetails(player_id)
    const primary_position_txt = playerDetails.primary_position_txt
    const team_id = playerDetails.team_id
    const name_display_first_last = playerDetails.name_display_first_last

    // load media (team_id, player_id)
    //teamLogo = await getTeamLogo(team_id)
    const playerImage = await getPlayerImage(player_id, name_display_first_last)

    const newCard = $('<div>')
        .attr('id', player_id)
        .attr('class', 'card')
    newCard.append(playerImage, name_display_first_last)

    // render to page if player not already there
    if (cardExists = $('#primary-cards').find(`#${player_id}`).length > 0) {
        // pass (player card already in featured section)
    }
    else {
        if ($('#secondary-cards').find(`#${player_id}`).length > 0) {
            // player card already in secondary section: update, but don't duplicate
            $(`#${player_id}`).empty()
            $(`#${player_id}`).replaceWith(newCard)
        }
        else {
            $('#secondary-cards').prepend(newCard)
        }
    }
}

// get image files 
function getTeamLogo(team_id) {
    let imgsrc = `./assets/media/team-logos/${team_id}.png`
    let img = $(`<img src='${imgsrc}' width='35px' alt='Image of Team Logo'/>`)
    let imgHTML = img.prop('outerHTML')
    return imgHTML
}

// TODO: this function works, but it generates a console error: need to debug. 
function getPlayerImage(player_id, name_display_first_last) {
    return new Promise((resolve, reject) => {
        let imgsrc = `./assets/media/players/${player_id}.jpg`;
        let img = new Image();
        img.onload = () => {
            let imgHTML = $(`<img src='${imgsrc}' width='35px' alt='Image of ${name_display_first_last}'/>`).prop('outerHTML');
            resolve(imgHTML);
        };
        img.onerror = () => {
            let defaultImgSrc = `./assets/media/players/404.png`;
            let imgHTML = $(`<img src='${defaultImgSrc}' width='35px' alt='Default Image'/>`).prop('outerHTML');
            resolve(imgHTML);
        };
        img.src = imgsrc;
    });
}

function getPlayerDetails (player_id) {
    url = `https://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id='${player_id}'`
    return fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log(data)
            let playerObject = data.player_info.queryResults.row
            if (playerObject.player_id) {
                return playerObject
            }
        })
            .catch(function (error) {
                console.log(error) 
        })
}

function getSeasonPitcherStats(player_id, year) {
    url = `https://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='R'&season='${year}'&player_id='${player_id}'`
    return fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log(data)
            let playerObject = data.sport_pitching_tm.queryResults.row
            if (playerObject) {
                return playerObject
            }
        })
        .catch(function (error) {
            console.log(error)
        })
}

function getSeasonHitterStats(player_id, year) {
    url = `https://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='${year}'&player_id='${player_id}'`
    return fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log(data)
            let playerObject = data.sport_hitting_tm.queryResults.row

            if (playerObject) {
                return playerObject
            }
        })
        .catch(function (error) {
            console.log(error)
        })
}

function getCareerPitcherStats(player_id, year) {
    url = `https://lookup-service-prod.mlb.com/json/named.sport_career_pitching.bam?league_list_id='mlb'&game_type='R'&player_id='${player_id}'`
    return fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log(data)
            let playerObject = data.sport_career_pitching.queryResults.row
            if (playerObject) {
                return playerObject
            }
        })
        .catch(function (error) {
            console.log(error)
        })
}

function getCareerHitterStats(player_id, year) {
    url = `https://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id='${player_id}'`
    return fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log(data)
            let playerObject = data.sport_career_hitting.queryResults.row

            if (playerObject) {
                return playerObject
            }
            })
        .catch(function (error) {
            console.log(error)
    })
}