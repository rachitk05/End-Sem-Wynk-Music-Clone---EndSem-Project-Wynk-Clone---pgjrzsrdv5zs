import { useState, useEffect } from 'react';
import Navbar from "./Components/Navbar.jsx";
import SongSection from "./Components/SongSection.jsx"; // You'll need to create this component

function HomePage() {
    const [trendingSongs, setTrendingSongs] = useState([]);
    const [top20WeekSongs, setTop20WeekSongs] = useState([]);
    const [top50MonthSongs, setTop50MonthSongs] = useState([]);
    const [evergreenMelodies, setEvergreenMelodies] = useState([]);
    const [happySongs, setHappySongs] = useState([]);
    const [romanticSongs, setRomanticSongs] = useState([]);
    const [excitedSongs, setExcitedSongs] = useState([]);
    const [sadSongs, setSadSongs] = useState([]);

    useEffect(() => {
        // Fetch data for each category
        fetchSongsByCategory("Trending songs", setTrendingSongs);
        fetchSongsByCategory("Top 20 of this week", setTop20WeekSongs);
        fetchSongsByCategory("Top 50 of this month", setTop50MonthSongs);
        fetchSongsByCategory("Evergreen melodies", setEvergreenMelodies);
        fetchSongsByMood("happy", setHappySongs);
        fetchSongsByMood("romantic", setRomanticSongs);
        fetchSongsByMood("excited", setExcitedSongs);
        fetchSongsByMood("sad", setSadSongs);
    }, []);

    const fetchSongsByCategory = (category, setter) => {
        fetch(`https://academics.newtonschool.co/api/v1/musicx/song?featured=${category}`, {
            headers: {
                'projectId': 'f104bi07c490'
            }
        })
            .then(response => response.json())
            .then(data => {
                setter(data.data);
            })
            .catch(error => {
                console.error(`Error fetching songs for ${category}:`, error);
            });
    };

    const fetchSongsByMood = (mood, setter) => {
        fetch(`https://academics.newtonschool.co/api/v1/musicx/song?mood=${mood}`, {
            headers: {
                'projectId': 'f104bi07c490'
            }
        })
            .then(response => response.json())
            .then(data => {
                setter(data.data);
            })
            .catch(error => {
                console.error(`Error fetching songs for mood ${mood}:`, error);
            });
    };

    return (
        <>
            <Navbar />
            <div className="text-white bg-gray-900">
                <SongSection title="Trending Songs" songs={trendingSongs} />
                <SongSection title="Top 20 of this week" songs={top20WeekSongs} />
                <SongSection title="Top 50 of this month" songs={top50MonthSongs} />
                <SongSection title="Evergreen Melodies" songs={evergreenMelodies} />
                <SongSection title="Happy Songs" songs={happySongs} />
                <SongSection title="Romantic Songs" songs={romanticSongs} />
                <SongSection title="Excited Songs" songs={excitedSongs} />
                <SongSection title="Sad Songs" songs={sadSongs} />
            </div>
        </>
    );
}

export default HomePage;
