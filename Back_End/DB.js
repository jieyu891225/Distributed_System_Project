const config = require('./dbconfig');
const pg = require('pg');
const LineInfo = require('./line_info');
const client = new pg.Client(config);

client.connect(err => {
    if (err) throw err;
});

async function getLineInfo(){
    const query = `SELECT * From Line_Info;`
    let line_info = [];
    const res = await client.query(query);
    const rows = res.rows;
    rows.map(row => {
        line_info.push(new LineInfo(row['nick_name'], row['access_token'], row['channel_secret']));
    });
    return line_info;
}

async function updateLineInfo(info){
    const query =  `UPDATE Line_Info SET Access_Token='${info.access_token}',Channel_Secret='${info.channel_secret}' WHERE Nick_Name='${info.nick_name}';`;
    const res = await client.query(query) 
        .then(result => {
        console.log('Update completed');
    });
    return true;
}

module.exports = {
    getLineInfo:getLineInfo,
    updateLineInfo:updateLineInfo
}