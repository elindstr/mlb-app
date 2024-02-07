// on load, look up any current players
$(function () {
    // cards = $('#primary-cards').children()
    // for (i = 0; i < cards.length; i++) {
    //     createFeaturePlayerCard(cards[i].id)
    // }
    // cards = $('#secondary-cards').children()
    // for (i = 0; i < cards.length; i++) {
    //     createPlayerCard(cards[i].id)
    // }
})

// placeholder when no stats available
const na = '-'

// called by draggableCards.js when a user drags an item to the primary section
async function createFeaturePlayerCard(player_id, element) {

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
        seasonPositionStats2023 = await getSeasonPitcherStats(player_id, year = 2023)
        seasonPositionStats2022 = await getSeasonPitcherStats(player_id, year = 2022)
        careerPositionStats = await getCareerPitcherStats(player_id)
    }
    else {
        seasonPositionStats2023 = await getSeasonHitterStats(player_id, year = 2023)
        seasonPositionStats2022 = await getSeasonHitterStats(player_id, year = 2022)
        careerPositionStats = await getCareerHitterStats(player_id)
    }

    // create slash line
    if (playerDetails.primary_position_txt == 'P') {
        slashTable = $('<table>');
        slashRow = $('<tr>');
        slashThYear = $('<th>Year</th>');
        slashThERA = $('<th>ERA</th>');
        slashThWHIP = $('<th>WHIP</th>');
        slashThBBK = $('<th>K:BB</th>');
        slashRow.append(slashThYear, slashThERA, slashThWHIP, slashThBBK);
        slashTable.append(slashRow);

        slashRow = $('<tr>')
        eraCareer = careerPositionStats ? careerPositionStats.era : na
        whipCareer = careerPositionStats ? careerPositionStats.whip : na
        kbbCareer = careerPositionStats ? careerPositionStats.strikeoutWalkRatio : na
        slashTdYear = $(`<td>Career</td>`)
        slashTdERA = $(`<td>${eraCareer ? eraCareer : na}</td>`)
        slashTdWHIP = $(`<td>${whipCareer ? whipCareer : na}</td>`)
        slashTdKBB = $(`<td>${kbbCareer ? kbbCareer : na}</td>`)
        slashRow.append(slashTdYear, slashTdERA, slashTdWHIP, slashTdKBB)
        slashTable.append(slashRow)

        if (seasonPositionStats2023) {
            slashRow = $('<tr>')
            era2023 = seasonPositionStats2023.era
            whip2023 = seasonPositionStats2023.whip
            kbb2023 = seasonPositionStats2023.strikeoutWalkRatio
            slashTdYear = $(`<td>2023</td>`)
            slashTdERA = $(`<td>${era2023 ? era2023 : na}</td>`)
            slashTdWHIP = $(`<td>${whip2023 ? whip2023 : na}</td>`)
            slashTdKBB = $(`<td>${kbb2023 ? kbb2023 : na}</td>`)
            slashRow.append(slashTdYear, slashTdERA, slashTdWHIP, slashTdKBB)
            slashTable.append(slashRow)
        }

        if (seasonPositionStats2022) {
            slashRow = $('<tr>')
            era2022 = seasonPositionStats2022.era
            whip2022 = seasonPositionStats2022.whip
            kbb2022 = seasonPositionStats2022.strikeoutWalkRatio
            slashTdYear = $(`<td>2022</td>`)
            slashTdERA = $(`<td>${era2022 ? era2022 : na}</td>`)
            slashTdWHIP = $(`<td>${whip2022 ? whip2022 : na}</td>`)
            slashTdKBB = $(`<td>${kbb2022 ? kbb2022 : na}</td>`)
            slashRow.append(slashTdYear, slashTdERA, slashTdWHIP, slashTdKBB)
            slashTable.append(slashRow)
        }
    }
    else { // hitter
        slashTable = $('<table>');
        slashRow = $('<tr>');
        slashThYear = $('<th>Year</th>');
        slashThAvg = $('<th>Avg</th>');
        slashThOBP = $('<th>OBP</th>');
        slashThSLG = $('<th>SLG</th>');;
        slashRow.append(slashThYear, slashThAvg, slashThOBP, slashThSLG);
        slashTable.append(slashRow);

        slashRow = $('<tr>')
        eraCareer = careerPositionStats ? careerPositionStats.avg : na
        whipCareer = careerPositionStats ? careerPositionStats.obp : na
        ipCareer = careerPositionStats ? careerPositionStats.slg : na
        slashTdYear = $(`<td>Career</td>`)
        slashTdERA = $(`<td>${eraCareer ? eraCareer : na}</td>`)
        slashTdWHIP = $(`<td>${whipCareer ? whipCareer : na}</td>`)
        slashTdIP = $(`<td>${ipCareer ? ipCareer : na}</td>`)
        slashRow.append(slashTdYear, slashTdERA, slashTdWHIP, slashTdIP)
        slashTable.append(slashRow)

        if (seasonPositionStats2023) {
            slashRow = $('<tr>')
            era2023 = seasonPositionStats2023.avg
            whip2023 = seasonPositionStats2023.obp
            ip2023 = seasonPositionStats2023.slg
            slashTdYear = $(`<td>2023</td>`)
            slashTdERA = $(`<td>${era2023 ? era2023 : na}</td>`)
            slashTdWHIP = $(`<td>${whip2023 ? whip2023 : na}</td>`)
            slashTdIP = $(`<td>${ip2023 ? ip2023 : na}</td>`)
            slashRow.append(slashTdYear, slashTdERA, slashTdWHIP, slashTdIP)
            slashTable.append(slashRow)
        }

        if (seasonPositionStats2022) {
            slashRow = $('<tr>')
            era2022 = seasonPositionStats2022.avg
            whip2022 = seasonPositionStats2022.obp
            ip2022 = seasonPositionStats2022.slg
            slashTdYear = $(`<td>2022</td>`)
            slashTdERA = $(`<td>${era2022 ? era2022 : na}</td>`)
            slashTdWHIP = $(`<td>${whip2022 ? whip2022 : na}</td>`)
            slashTdIP = $(`<td>${ip2022 ? ip2022 : na}</td>`)
            slashRow.append(slashTdYear, slashTdERA, slashTdWHIP, slashTdIP)
            slashTable.append(slashRow)
        }
    }

    // construct card
    let playerNameSection = $('<span>')
        .attr('class', 'card-player-name')
    const deleteButton = $('<button>')
        .attr('class', 'delete-button')
        .html('&times;')
    playerNameSection.append(playerImage, name_display_first_last, deleteButton)
    teamNameSection = $('<span>')
        .attr('class', 'card-team-name')
    //teamNameSection.append(teamLogo)
    slashTableSection = $('<span>')
        .attr('class', 'slash-table')
    slashTableSection.append(slashTable)

    $(element).empty() //XXX testing 
    $(element).append(playerNameSection, teamNameSection, slashTableSection)
    killDuplicates()
}

// This is stupid. But this is a fix.
async function createFeaturePlayerCardFromScratch(player_id) {

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
        seasonPositionStats2023 = await getSeasonPitcherStats(player_id, year = 2023)
        seasonPositionStats2022 = await getSeasonPitcherStats(player_id, year = 2022)
        careerPositionStats = await getCareerPitcherStats(player_id)
    }
    else {
        seasonPositionStats2023 = await getSeasonHitterStats(player_id, year = 2023)
        seasonPositionStats2022 = await getSeasonHitterStats(player_id, year = 2022)
        careerPositionStats = await getCareerHitterStats(player_id)
    }

    // create slash line
    if (playerDetails.primary_position_txt == 'P') {
        slashTable = $('<table>');
        slashRow = $('<tr>');
        slashThYear = $('<th>Year</th>');
        slashThERA = $('<th>ERA</th>');
        slashThWHIP = $('<th>WHIP</th>');
        slashThBBK = $('<th>K:BB</th>');
        slashRow.append(slashThYear, slashThERA, slashThWHIP, slashThBBK);
        slashTable.append(slashRow);

        slashRow = $('<tr>')
        eraCareer = careerPositionStats ? careerPositionStats.era : na
        whipCareer = careerPositionStats ? careerPositionStats.whip : na
        kbbCareer = careerPositionStats ? careerPositionStats.strikeoutWalkRatio : na
        slashTdYear = $(`<td>Career</td>`)
        slashTdERA = $(`<td>${eraCareer ? eraCareer : na}</td>`)
        slashTdWHIP = $(`<td>${whipCareer ? whipCareer : na}</td>`)
        slashTdKBB = $(`<td>${kbbCareer ? kbbCareer : na}</td>`)
        slashRow.append(slashTdYear, slashTdERA, slashTdWHIP, slashTdKBB)
        slashTable.append(slashRow)

        if (seasonPositionStats2023) {
            slashRow = $('<tr>')
            era2023 = seasonPositionStats2023.era
            whip2023 = seasonPositionStats2023.whip
            kbb2023 = seasonPositionStats2023.strikeoutWalkRatio
            slashTdYear = $(`<td>2023</td>`)
            slashTdERA = $(`<td>${era2023 ? era2023 : na}</td>`)
            slashTdWHIP = $(`<td>${whip2023 ? whip2023 : na}</td>`)
            slashTdKBB = $(`<td>${kbb2023 ? kbb2023 : na}</td>`)
            slashRow.append(slashTdYear, slashTdERA, slashTdWHIP, slashTdKBB)
            slashTable.append(slashRow)
        }

        if (seasonPositionStats2022) {
            slashRow = $('<tr>')
            era2022 = seasonPositionStats2022.era
            whip2022 = seasonPositionStats2022.whip
            kbb2022 = seasonPositionStats2022.strikeoutWalkRatio
            slashTdYear = $(`<td>2022</td>`)
            slashTdERA = $(`<td>${era2022 ? era2022 : na}</td>`)
            slashTdWHIP = $(`<td>${whip2022 ? whip2022 : na}</td>`)
            slashTdKBB = $(`<td>${kbb2022 ? kbb2022 : na}</td>`)
            slashRow.append(slashTdYear, slashTdERA, slashTdWHIP, slashTdKBB)
            slashTable.append(slashRow)
        }
    }
    else { // hitter
        slashTable = $('<table>');
        slashRow = $('<tr>');
        slashThYear = $('<th>Year</th>');
        slashThAvg = $('<th>Avg</th>');
        slashThOBP = $('<th>OBP</th>');
        slashThSLG = $('<th>SLG</th>');;
        slashRow.append(slashThYear, slashThAvg, slashThOBP, slashThSLG);
        slashTable.append(slashRow);

        slashRow = $('<tr>')
        eraCareer = careerPositionStats ? careerPositionStats.avg : na
        whipCareer = careerPositionStats ? careerPositionStats.obp : na
        ipCareer = careerPositionStats ? careerPositionStats.slg : na
        slashTdYear = $(`<td>Career</td>`)
        slashTdERA = $(`<td>${eraCareer ? eraCareer : na}</td>`)
        slashTdWHIP = $(`<td>${whipCareer ? whipCareer : na}</td>`)
        slashTdIP = $(`<td>${ipCareer ? ipCareer : na}</td>`)
        slashRow.append(slashTdYear, slashTdERA, slashTdWHIP, slashTdIP)
        slashTable.append(slashRow)

        if (seasonPositionStats2023) {
            slashRow = $('<tr>')
            era2023 = seasonPositionStats2023.avg
            whip2023 = seasonPositionStats2023.obp
            ip2023 = seasonPositionStats2023.slg
            slashTdYear = $(`<td>2023</td>`)
            slashTdERA = $(`<td>${era2023 ? era2023 : na}</td>`)
            slashTdWHIP = $(`<td>${whip2023 ? whip2023 : na}</td>`)
            slashTdIP = $(`<td>${ip2023 ? ip2023 : na}</td>`)
            slashRow.append(slashTdYear, slashTdERA, slashTdWHIP, slashTdIP)
            slashTable.append(slashRow)
        }

        if (seasonPositionStats2022) {
            slashRow = $('<tr>')
            era2022 = seasonPositionStats2022.avg
            whip2022 = seasonPositionStats2022.obp
            ip2022 = seasonPositionStats2022.slg
            slashTdYear = $(`<td>2022</td>`)
            slashTdERA = $(`<td>${era2022 ? era2022 : na}</td>`)
            slashTdWHIP = $(`<td>${whip2022 ? whip2022 : na}</td>`)
            slashTdIP = $(`<td>${ip2022 ? ip2022 : na}</td>`)
            slashRow.append(slashTdYear, slashTdERA, slashTdWHIP, slashTdIP)
            slashTable.append(slashRow)
        }
    }

    // construct card
    let playerNameSection = $('<span>')
    .attr('class', 'card-player-name');
    
    const deleteButton = $('<button>')
    .attr('class', 'delete-button')
    .html('&times;');
    playerNameSection.append(playerImage, name_display_first_last, deleteButton);

    let teamNameSection = $('<span>')
    .attr('class', 'card-team-name');
    //teamNameSection.append(teamLogo);

    let slashTableSection = $('<span>')
    .attr('class', 'slash-table');
    slashTableSection.append(slashTable);

    let newCard = $('<div>')        
        .attr('data-id', player_id)
        .attr('class', 'card')
         
    newCard.append(playerNameSection, teamNameSection, slashTableSection);

    $('#primary-cards').append(newCard);
    checkforEmptyDropBoxes()
    killDuplicates()
} 


$('#primary-cards').on('click', '.delete-button', function () {
    $(this).parent().parent().remove()
    checkforEmptyDropBoxes()
});
$('#secondary-cards').on('click', '.delete-button', function () {
    $(this).parent().remove()
    checkforEmptyDropBoxes()
});

$('#secondary-cards').on('click', '.promote-button', function () {
    
    // if two features, demote second card
    if ($('#primary-cards').children().length === 2) {
        const demotedPlayerId = $('#primary-cards').children().eq(1).attr('data-id');
        //console.log(demotedPlayerId)
        $('#primary-cards').children().eq(1).remove();
        createPlayerCard(demotedPlayerId); // Assuming this function exists
    }

    const promotedPlayerId = $(this).parent().attr('data-id');
    //console.log(promotedPlayerId)

    // remove element from #secondary-cards
    $(this).parent().remove()

    // promote promotedPlayerId to #primary-cards
    createFeaturePlayerCardFromScratch(promotedPlayerId)
});


// called by autoComplete.js when user selects a player from the search
async function createPlayerCard(player_id) {
    //console.log("new player card", player_id)

    // get stats
    const playerDetails = await getPlayerDetails(player_id)
    const primary_position_txt = playerDetails.primary_position_txt
    const team_id = playerDetails.team_id
    const name_display_first_last = playerDetails.name_display_first_last

    // load media (team_id, player_id)
    //teamLogo = await getTeamLogo(team_id)
    const playerImage = await getPlayerImage(player_id, name_display_first_last)

    const newCard = $('<div>')
        .attr('data-id', player_id) //XXX testing without id
        .attr('class', 'card')

    const deleteButton = $('<button>')
        .attr('class', 'delete-button')
        .html('&times;')
    
    const promoteButton = $('<button>')
        .attr('class', 'promote-button')
        .html('&uarr;')

    newCard.append(promoteButton, playerImage, name_display_first_last, deleteButton)

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

    killDuplicates()
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

function getPlayerDetails(player_id) {
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
    url = `https://statsapi.mlb.com/api/v1/people/${player_id}?hydrate=stats(sportId=1,group=[pitching],type=season,season=${year})`
    //url = `https://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='R'&season='${year}'&player_id='${player_id}'`
    return fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            //console.log(data)
            let playerObject = data.people[0].stats
            if (playerObject) {
                return data.people[0].stats[0].splits[0].stat
            }
        })
        .catch(function (error) {
            console.log(error)
        })
}

function getSeasonHitterStats(player_id, year) {
    url = `https://statsapi.mlb.com/api/v1/people/${player_id}?hydrate=stats(sportId=1,group=[hitting],type=season,season=${year})`
    //url = `https://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='${year}'&player_id='${player_id}'`
    return fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            //console.log(data)
            let playerObject = data.people[0].stats
            if (playerObject) {
                return data.people[0].stats[0].splits[0].stat
            }
        })
        .catch(function (error) {
            console.log(error)
        })
}

function getCareerPitcherStats(player_id, year) {
    url = `https://statsapi.mlb.com/api/v1/people/${player_id}?hydrate=stats(sportId=1,group=[pitching],type=[career])` 
    //url = `https://lookup-service-prod.mlb.com/json/named.sport_career_pitching.bam?league_list_id='mlb'&game_type='R'&player_id='${player_id}'`
    return fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log(data)
            let playerObject = data.people[0].stats
            if (playerObject) {
                return data.people[0].stats[0].splits[0].stat
            }
        })
        .catch(function (error) {
            console.log(error)
        })
}

function getCareerHitterStats(player_id, year) {
    url = `https://statsapi.mlb.com/api/v1/people/${player_id}?hydrate=stats(sportId=1,group=[hitting],type=[career])` 
    //url = `https://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id='${player_id}'`
    return fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log(data)
            let playerObject = data.people[0].stats
            if (playerObject) {
                return data.people[0].stats[0].splits[0].stat
            }
        })
        .catch(function (error) {
            console.log(error)
        })
}