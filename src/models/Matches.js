import axios from 'axios';
import moment from 'moment';

async function getMatches(url){
    let team_urls = [];
    let matches = [];
    let response = await axios.get(url)

    if(response.err){
        matches = "ERROR";
    } else {
        response.data.forEach(element => {
            let start = element.beginAt;
            let team1 = element.participants[0].id;
            let team1_points = element.participants[0].points[0];
            let team2 = element.participants[1].id;
            let team2_points = element.participants[1].points[0];
            let winner = element.participants[0].place;
            let result = false;
            if(winner == 1){ 
                result = true;
            }
            let team_url = "https://api.eslgaming.com/play/v1/teams/"
            team_urls.push(team_url + team1, team_url+team2)
            let date = moment(start).format('hh:mm')
            matches.push({start: start, team1: team1, team1_points: team1_points, team2: team2, team2_points: team2_points, winner: result, date: date})
        })
    }

    let promises = []
    let results = []
    console.log(team_urls)
    team_urls.forEach(element => {
        promises.push(axios.get(element).catch(() => {return "Team Not Found.";}))
    })

    let responses = null;
    try {
        responses = await Promise.all(promises);
    } catch (err) {
        console.log(err)
    }
    
    responses.forEach(element => {
        try {
            results.push(element)
        } catch (err) {
            results.push("ERROR")
        }
    })

    console.log(results)
    let team_arr = []
    for (let index = 0; index < results.length; index++) {
        let t1 = results[index];
        let t2 = results[index + 1];
        if(t1 != "Team Not Found."){
            t1 = results[index].data.name;
        }
        if(t2 != "Team Not Found."){
            t2 = results[index+1].data.name;
        }              
        team_arr.push({team1: t1, team2: t2})
        index++;
    }

    for(let index = 0; index < matches.length; index++){
        matches[index].team1 = team_arr[index].team1;
        matches[index].team2 = team_arr[index].team2;
    }

    console.log(matches)

    return matches
}

export default getMatches;