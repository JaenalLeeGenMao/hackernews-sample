// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { fetchWithTimeout } from "../../lib/fetchWithTimeout"

const BASE_URL = "https://hacker-news.firebaseio.com/v0/"

export const getItem = async (id) => {
    let result
    try {
        const response = await fetchWithTimeout(`${BASE_URL}/item/${id}.json?print=pretty`, {
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
            const id = req.query.id
            res.status(200).json(await getItem(id))
            break
        default:
            res.status(404)
            break
    }
}
