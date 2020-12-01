import axios from 'axios';
import moment from 'moment';

async function getEvent(url){
    
    let name = "";
    let start_date = "";
    let response = await axios(url);
    if(response.err){
        name = "ERROR";
        start_date = "ERROR"
    } else {
        name = response.data.name.full;
        start_date = new Date(response.data.timeline.checkIn.begin).toString();
        start_date = moment(start_date).format('Do MMMM YYYY')
    }
    return {start_date: start_date, name: name};
}

export default getEvent;