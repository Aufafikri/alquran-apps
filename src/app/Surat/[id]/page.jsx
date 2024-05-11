"use client"

import { getQuransDetails } from "@/app/libs/api-libs";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const cleanHtmlText = (htmlText) => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = htmlText;
  return tempElement.textContent || tempElement.innerText || '';
};

const Page = ({ params }) => {
  const [quranDetails, setQuranDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getQuransDetails(params.id);
        const cleanedResponse = {
          ...response,
          nama_latin: cleanHtmlText(response.nama_latin),
          arti: cleanHtmlText(response.arti),
          deskripsi: cleanHtmlText(response.deskripsi),
          tempat_turun: cleanHtmlText(response.tempat_turun),
        };
        setQuranDetails(cleanedResponse);
      } catch (error) {
        console.error('Error fetching Quran details:', error);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <div className="min-h-screen p-4 flex justify-center">
      <div className="justify-center items-center">
        {quranDetails && (
          <>
            <h1 className="text-2xl font-bold text-center">
              {quranDetails.nama_latin}
            </h1>
            <h1 className="text-center font-semibold -mt-1">
              {quranDetails.arti}
            </h1>
            <div className="flex justify-center items-center max-w-5xl text-justify mt-3">
              <h1 className="font-semibold">
                {quranDetails.deskripsi}
              </h1>
            </div>
            <div className="flex justify-center mt-4 text-center font-semibold text-xl max-sm:text-left max-sm:text-base max-sm:font-bold">
              <div className="max-sm:mr-auto">
              <h1>Surat Ke: {quranDetails.nomor} </h1>
              <h1>Tempat Turun: {quranDetails.tempat_turun}</h1>
              <h1>Jumlah Ayat: {quranDetails.jumlah_ayat}</h1>
              </div>
            </div>
            <div className="flex justify-center mt-6 max-sm:block max-sm:mb-4">
              <Link href={`/QuranDetail/${quranDetails.nomor}`} className="p-4 bg-slate-900 text-white rounded-md max-sm:p-3 hover:bg-slate-800">Baca Surat {quranDetails.nama_latin}</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
