// SongSection.jsx
import SongCard from "./SongCard.jsx";
import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
const SongSection = ({ title, songs }) => {
    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 6,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 5,
            numScroll: 1
        },
        {
            breakpoint: '1000px',
            numVisible: 4,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '300px',
            numVisible: 1,
            numScroll: 1
        }
    ];


    const SongCarousel = (song) => {
        return <SongCard key={song._id} song={song}/>;
    };

    return (
        <div className="m-16">
            <h2 className="text-4xl font-bold ">{title}</h2>
            <div className={"mx-14"}>
                <Carousel  value={songs} numScroll={2} numVisible={5} circular responsiveOptions={responsiveOptions} itemTemplate={SongCarousel}/>
            </div>
        </div>

)
};



export default SongSection;