const { getEvents } = require('../lib/events');

async function test() {
    try {
        console.log('Fetching events...');
        const events = await getEvents();
        console.log('Events result:', JSON.stringify(events, null, 2));

        if (events.past && events.past.length > 0) {
            console.log(`✅ Fetched ${events.past.length} past events`);
        } else {
            console.log('⚠️ No past events found');
        }

        if (events.future && events.future.length > 0) {
            console.log(`✅ Fetched ${events.future.length} future events`);
        } else {
            console.log('⚠️ No future events found');
        }

        if (events.error) {
            console.error('❌ Error in events result:', events.error);
        }

    } catch (error) {
        console.error('❌ Script error:', error);
    }
}

test();
