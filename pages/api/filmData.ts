// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import qs from 'query-string';

export type ShowTimesArgs = any

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OMDB.Result>
) {
  const url = qs.stringifyUrl({
    url: "http://www.omdbapi.com/",
    query: {
      ...req.query,
      apikey: process.env.OMDB_API_KEY
    }
  })
  const q = await fetch(url)
  const data = await q.json()
  res.status(200).json(data)
}

export namespace OMDB {
  export interface Result {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
  }

  export interface Rating {
    Source: string;
    Value: string;
  }
}