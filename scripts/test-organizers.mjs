
async function fetchCommunityOrganizers(communityId) {
    try {
        const response = await fetch(`https://json.commudle.com/api/v2/user_roles_users/public_get_community_leaders_by_role?community_id=${communityId}&user_role_name=organizer`, {
            headers: {
                'User-Agent': 'Next.js Server',
                Accept: 'application/json',
            }
        });

        if (!response.ok) {
            console.log('Response not ok:', response.status);
            return [];
        }

        const data = await response.json();
        return (data.data?.users || []).map((user) => ({
            id: user.id,
            name: user.name,
            image_url: user.photo?.url || user.avatar || '/globe.svg',
            url: user.username ? `https://www.commudle.com/users/${user.username}` : undefined
        }));
    } catch (error) {
        console.error(`Error fetching organizers for community ${communityId}:`, error);
        return [];
    }
}

console.log('Fetching organizers for community 64...');
const organizers = await fetchCommunityOrganizers(64);
console.log('Organizers:', JSON.stringify(organizers, null, 2));
