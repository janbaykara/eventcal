import useSWR from "swr";
import qs from "query-string";
import { ShowTimes, ShowTimesArgs } from '../../pages/api/showtimes';
import { fetcher } from '../swr';
import { isSameDay, parse } from "date-fns";
import { OMDB } from "../../pages/api/filmData";

export const FilmScreenings = ({ date = new Date(), ...showTimesArgs }: ShowTimesArgs & { date?: Date }) => {
  const showtimes = useShowtimes(showTimesArgs)
  const moviesForThisDate = showtimes.data?.showtimes?.find(day => !!day.date && isSameDay(parse(day.date, "d MMM", new Date()), date))?.movies

  return !!showtimes.data ?
    !moviesForThisDate || !moviesForThisDate?.length ? (
      <section>
        <div className="text-2xl font-bold">{showTimesArgs.cinema}</div>
        <div>Nothing found</div>
      </section>
    ) : (
      <section>
        <h3 className="text-2xl font-bold sticky top-[60px] pt-3 pb-2 backdrop-blur backdrop-filter bg-white bg-opacity-70">
          <a href={showtimes.data.knowledge_graph.website}>
            {showtimes.data.knowledge_graph.title}
          </a>
        </h3>
        <div className="divide-y">
          {moviesForThisDate.map(movie => (
            <article key={movie.link} className='py-3 last:pb-0 flex flex-row space-x-3 items-center'>
              <FilmPoster t={movie.name} type="movie" />
              <div>
                <h4 className='pb-2'><a href={movie.link}>{movie.name}</a></h4>
                <div className="space-y-2">
                  {movie.showing.map((showing, i) =>
                    <div key={i} className="flex flex-row items-center">
                      <div className="text-gray-500 text-sm w-36">
                        {showing.type}
                      </div>
                      <div className="grid gap-2 grid-cols-4 md:grid-cols-8">
                        {showing.time.map(time => (
                          <div key={time} className='px-2 py-1 border border-gray-300 rounded-md text-xs'>
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
  return <div className='bg-gray-100 rounded-md bg-cover bg-center w-[60px] h-[90px]' style={{
    backgroundImage: `url(${movie.data?.Poster})`
  }} />
}

function useMovie(args: any) {
  const url = qs.stringifyUrl({
    url: "/api/filmData",
    query: args
  })

  return useSWR<OMDB.Result>(url, fetcher, {
    revalidateIfStale: false,
    // revalidateOnMount: false,
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
  }
  )
}