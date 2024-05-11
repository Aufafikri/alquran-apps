"use client"

import React, { useState, useEffect } from 'react';
import { getQuransDetails } from '@/app/libs/api-libs';
import Link from 'next/link';

const cleanHtmlText = (htmlText) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlText;
    return tempElement.textContent || tempElement.innerText || '';
};

const Page = ({ params }) => {
    const [quranDetails, setQuranDetails] = useState(null);

    useEffect(() => {
        const fetchQuranDetails = async () => {
            try {
                const response = await getQuransDetails(params.id);
                const cleanedResponse = {
                    ...response,
                    nama: cleanHtmlText(response.nama),
                    arti: cleanHtmlText(response.arti)
                };
                setQuranDetails(cleanedResponse);
            } catch (error) {
                console.error('Error fetching Quran details:', error);
            }
        };

        fetchQuranDetails();
    }, [params.id]);

    return (
        <div className='min-h-screen p-4 flex justify-center items-center bg-slate-100'>
            <div className='flex justify-center items-center lg:max-w-2xl max-sm:max-w-4xl'>
                {quranDetails && (
                    <div>
                        <h1 className='text-center font-bold text-5xl mt-2'>{quranDetails.nama}</h1>
                        <h1 className='text-center font-semibold'> {quranDetails.nama_latin} </h1>
                        <h1 className='text-center font-medium mb-5 italic'> ({quranDetails.jumlah_ayat}) </h1>
                        <div className='flex justify-between'>
                        <Link href={`/Surat/${quranDetails.nomor}`} className='font-bold hover:text-hover ml-6 text-black max-sm:ml-4'>Tentang Surat</Link>
                        <audio controls className='mb-5 max-sm:mr-0 text-white'>
                            <source src={quranDetails.audio} type='audio/mp3' color='green' />
                        </audio>
                        </div>
                        <ul className='p-8'>
                            {quranDetails.ayat.map((ayat) => (
                                <li key={ayat.id}>
                                    <p className='font-bold lg:text-4xl max-sm:text-3xl mb-4 flex justify-between'> <span className='text-lg mr-6'> {ayat.nomor}.  </span> {cleanHtmlText(ayat.ar)}</p>
                                    <p className='mb-2 font-semibold'>{cleanHtmlText(ayat.tr)}</p>
                                    <p className='mb-10'>{cleanHtmlText(ayat.idn)}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
