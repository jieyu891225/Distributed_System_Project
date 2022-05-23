const config = require('./dbconfig');
const pg = require('pg');
const LineInfo = require('./line_info');
const client = new pg.Client(config);

client.connect(err => {
    if (err) throw err;
});

async function getLineInfo(user_id){
    const query = `SELECT nick_name, access_token, channel_secret From line_info WHERE user_id='${user_id}';`
    let line_info = [];
    const res = await client.query(query);
    const rows = res.rows;
    rows.map(row => {
        line_info.push(new LineInfo(row['nick_name'], row['access_token'], row['channel_secret'], row['user_id']));
    });
    return line_info;
}

async function updateLineInfo(req){
    console.log(req)
    const query =  `
        INSERT INTO line_info (access_token, channel_secret, user_id, nick_name)
        VALUES ('${req.access_token}', '${req.channel_secret}', '${req.user_id}', '${req.nick_name}')
        ON CONFLICT (user_id, nick_name) DO UPDATE
        SET access_token='${req.access_token}',
            channel_secret='${req.channel_secret}';`;
    const res = await client.query(query).then(result => {
        console.log('Update completed');
    });
    return true;
}

module.exports = {
    getLineInfo:getLineInfo,
    updateLineInfo:updateLineInfo
}