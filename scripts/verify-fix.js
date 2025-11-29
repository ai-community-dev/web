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
            const page = json.data.page || [];
            const events = page.map(item => item.data);

            console.log('Mapped events count:', events.length);
            if (events.length > 0) {
                const first = events[0];
                console.log('First event name:', first.name);
                console.log('First event id:', first.id);
                if (first.name && first.id) {
                    console.log('✅ Structure looks correct!');
                } else {
                    console.log('❌ Structure is still wrong');
                }
            }
        } catch (e) {
            console.error(e);
        }
    });
}).on('error', (err) => {
    console.error('Error: ' + err.message);
});
