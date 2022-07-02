import type { NextPage } from 'next'
import Head from 'next/head'
import { FilmScreenings } from '../src/components/FilmScreenings'
import { useState } from 'react';
import { addDays, format } from 'date-fns';

const Home: NextPage = () => {
  const [date, setDate] = useState(addDays(new Date(), 2))

  const cinemas = [
    { cinema: "Glasgow Film Theatre", location: "Glasgow", },
    { cinema: "Glasgow IMAX Science Museum", location: "Glasgow", },
    { cinema: "Vue St Enoch", location: "Glasgow", },
    { cinema: "Grosvenor Picture Theatre", location: "Glasgow" },
    { cinema: "Odeon Luxe Glasgow Quay", location: "Glasgow", },
    { cinema: "Everyman", location: "Glasgow", },
  ]

  return (
    <div className='flex flex-col min-h-screen relative'>
      <Head>
        <title>Things going on in Glasgow</title>
        <meta name="description" content="Stuff in Glasgow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className='p-3 bg-gray-100 sticky top-0 z-50'>
        <div className='max-w-3xl mx-auto flex flex-row-reverse items-center justify-between'>
          <div className='font-bold uppercase tracking-wider text-2xl text-gray-700'>
            Films in Glasgow
          </div>

          <div className='flex flex-row space-x-1 items-center text-right'>
            Showing&nbsp;
            <div className='bg-white hover:bg-gray-200 cursor-pointer rounded-md px-2 py-1' onClick={() => setDate(addDays(date, -1))}>&larr;</div>
            <div className='bg-white rounded-md px-2 py-1 text-lg font-bold'>{format(date, "E d MMM")}</div>
            <div className='bg-white hover:bg-gray-200 cursor-pointer rounded-md px-2 py-1' onClick={() => setDate(addDays(date, 1))}>&rarr;</div>
          </div>
        </div>
      </header>

      <main className='h-100 p-3 space-y-6 relative'>
        <div className='max-w-3xl mx-auto'>
          <div className='space-y-8 py-6'>
            {cinemas.map(cinema => <FilmScreenings date={date} key={cinema.cinema} cinema={cinema.cinema} location={cinema.location} />)}
          </div>
        </div>
      </main>

      <footer className='mt-auto p-3 bg-gray-100 text-xs font-mono'>
        <div className='max-w-3xl mx-auto'>
          <a href='https://github.com/janbaykara/eventcal'>Github</a>
        </div>
      </footer>
    </div>
  )
}

export default Home
