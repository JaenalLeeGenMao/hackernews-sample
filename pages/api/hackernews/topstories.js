// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { fetchWithTimeout } from "../../lib/fetchWithTimeout"

const BASE_URL = "https://hacker-news.firebaseio.com/v0/"

export const getTopStories = async () => {
    let result
    try {
        const response = await fetchWithTimeout(`${BASE_URL}/topstories.json?print=pretty`, {
            method: 'GET',
            cache: 'no-cache',
            timeout: 5 * 1000
        });
        result = await response.json();
        return result;
      } catch (error) {
        // Timeouts if the request takes
        // longer than 6 seconds
        console.log(error.name === 'AbortError');
        return result
    }
}

export default async (req, res) => {

    switch(req.method) {
        case 'GET':
            res.status(200).json(await getTopStories())
            break
        default:
            res.status(404)
            break
    }
}
