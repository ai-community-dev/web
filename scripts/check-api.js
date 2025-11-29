const https = require('https');

const url = 'https://json.commudle.com/api/v2/community_groups/public/events?community_group_id=tfug&limit=2&when=past';

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log('Keys in root:', Object.keys(json));
            if (json.data) {
                console.log('Keys in data:', Object.keys(json.data));
                if (json.data.page) {
                    console.log('Page is array:', Array.isArray(json.data.page));
                    console.log('Page length:', json.data.page.length);
                    if (json.data.page.length > 0) {
                        console.log('First event keys:', Object.keys(json.data.page[0]));
                    }
                } else {
                    console.log('No page key in data');
                }
            }
        } catch (e) {
            console.error(e);
        }
    });
}).on('error', (err) => {
    console.error('Error: ' + err.message);
});
