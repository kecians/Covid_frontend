export const getDateTimeString = (string) => {
    let valid_date = "NA"
    if(string){
        let date = new Date(string);
        valid_date = date.toDateString() + ',' + date.getHours() + ':' +  (date.getMinutes().length === 0 ? "0"  : "") +   date.getMinutes();
    }

    return valid_date;


    
    

}