"use client"

import { getResponseQurans } from '@/app/libs/api-libs'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import '../../app/globals.css'

const QuranList = () => {
    const [qurans, setQurans] = useState([])

    useEffect(() => {
        const getQurans = async () => {
            const response = await getResponseQurans()
            setQurans(response)
        }
        getQurans()
    }, [])

  return (
    <div className='grid lg:grid-cols-3 max-sm:grid-cols-2 gap-4 p-12 max-sm:p-4 sekrol'>
        {qurans.map((quran) => {
            return (
                <div key={quran.nomor}>
                    <Link href={`/QuranDetail/${quran.nomor}`}>
                    <div className='flex justify-between bg-slate-300 rounded-lg px-0 py-4 hover:bg-hover hover:text-white hover:transition max-sm:block'>
                        <h1 className='pl-6 max-sm:pl-1'> {quran.nomor}. </h1>
                        <h1 className='text-center max-sm:-mt-6'> {quran.nama_latin} </h1>
                        <p className='pr-6 max-sm:pr-0 text-center'>{quran.jumlah_ayat} Ayat </p>
                    </div>
                    </Link>
                </div>
            )
        })}
    </div>
  )
}

export default QuranList