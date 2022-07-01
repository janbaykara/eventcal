import type { NextPage } from 'next'
import Head from 'next/head'
import { FilmScreenings } from '../src/components/FilmScreenings'
import { useState } from 'react';
import { DatePicker } from '../src/components/DatePicker';
import { addDays, format } from 'date-fns';
import { Popover } from '@headlessui/react'
import { usePopper } from 'react-popper'

const Home: NextPage = () => {
  const [date, setDate] = useState(new Date())
  let [referenceElement, setReferenceElement] = useState()
  let [popperElement, setPopperElement] = useState()
  let { styles, attributes } = usePopper(referenceElement, popperElement)

  const cinemas = [
    { cinema: "Glasgow Film Theatre", location: "Glasgow", },
    { cinema: "Glasgow IMAX Science Museum", location: "Glasgow", },
    { cinema: "Vue St Enoch", location: "Glasgow", },
    { cinema: "Odeon Luxe Glasgow Quay", location: "Glasgow", },
  ]

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>Things going on in Glasgow</title>
        <meta name="description" content="Stuff in Glasgow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className='font-bold uppercase tracking-wide p-4 bg-gray-100'>
        Things to do in Glasgow
      </header>

      <main className='h-100 p-4 space-y-6 relative'>
        <div className='flex flex-row space-x-1'>
          <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-md px-2 py-1' onClick={() => setDate(addDays(date, -1))}>&larr;</div>
          <Popover>
            <Popover.Button ref={setReferenceElement}>
              <div className='bg-gray-100 hover:bg-gray-200 rounded-md px-2 py-1'>{format(date, "d MMM")}</div>
            </Popover.Button>
            <Popover.Panel
              ref={setPopperElement}
              style={styles.popper}
              className='z-50 bg-white'
              {...attributes.popper}
            >
              <DatePicker date={date} handleSelectDate={date => setDate(date as any)} />
            </Popover.Panel>
          </Popover>
          <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-md px-2 py-1' onClick={() => setDate(addDays(date, 1))}>&rarr;</div>
        </div>
        <div className='space-y-6'>
          {cinemas.map(cinema => <FilmScreenings date={date} key={cinema.cinema} cinema={cinema.cinema} location={cinema.location} />)}
        </div>
      </main>

      <footer className='mt-auto p-4 bg-gray-100 text-xs font-mono'>
        <a href='github.com/janbaykara/eventcal'>Github</a>
      </footer>
    </div>
  )
}

export default Home
