import useSWR from "swr";
import qs from "query-string";
import { ShowTimes, ShowTimesArgs } from '../../pages/api/showtimes';
import { fetcher } from '../swr';
import { isSameDay, parse } from "date-fns";
import { OMDB } from "../../pages/api/filmData";

export const FilmScreenings = ({ date = new Date(), ...showTimesArgs }: ShowTimesArgs & { date?: Date }) => {
  const showtimes = useShowtimes(showTimesArgs)

  return !!showtimes.data ?
    !showtimes.data?.showtimes?.[0] ? (
      <section>
        <div className="text-lg font-bold">{showTimesArgs.cinema}</div>
        <div>None found</div>
      </section>
    ) : (
      <section>
        <h3 className="text-lg font-bold sticky top-0 bg-white bg-opacity-70">{showtimes.data.knowledge_graph.title}</h3>
        <div className="divide-y">
          {showtimes.data.showtimes.find(day => !!day.date && isSameDay(parse(day.date, "d MMM", new Date()), date))?.movies?.map(movie => (
            <article key={movie.link} className='py-3 last:pb-0 flex flex-row space-x-2'>
              <FilmPoster title={movie.name} />
              <div>
                <h4 className='pb-2'><a href={movie.link}>{movie.name}</a></h4>
                <div className="space-y-2">
                  {movie.showing.map((showing, i) =>
                    <div key={i} className="flex flex-row items-center">
                      <div className="text-gray-500 text-sm w-36">
                        {showing.type}
                      </div>
                      <div className="space-x-2">
                        {showing.time.map(time => (
                          <div key={time} className='hover:bg-green-100 px-2 py-1 border inline-block border-gray-300 rounded-md text-xs'>
                            <a href={movie.link}>{time}</a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    ) : <div>Loading showtimes for <b>{showTimesArgs.cinema}</b></div>
}

// export const busyness = ({ place }: { place: ShowTimes.Result['knowledge_graph'] }) => {
//   return place.popular_times.graph_results.monday.find(day => day.time === "10 am")?.info
// }


function useShowtimes(showTimesArgs: ShowTimesArgs) {
  const url = qs.stringifyUrl({
    url: "/api/showtimes",
    query: {
      ...showTimesArgs,
      // cache by date
      date: (new Date()).toDateString()
    }
  })

  return useSWR<ShowTimes.Result>(url, fetcher, {
    revalidateIfStale: false,
    // revalidateOnMount: false,
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
  }
  )
}

export const FilmPoster = (args: any) => {
  const movie = useMovie(args)
  return <div className='bg-gray-100 rounded-md bg-cover bg-center w-24 h-40' style={movie.data ? { backgroundImage: `url(${movie.data.Poster})` } : {}} />
}

function useMovie(args: any) {
  const url = qs.stringifyUrl({
    url: "/api/filmData",
    query: args
  })

  return useSWR<OMDB.Result>(url, fetcher, {
    revalidateIfStale: false,
    // revalidateOnMount: false,
    // revalidateOnReconnect: false,
    // revalidateOnFocus: false,
  }
  )
}