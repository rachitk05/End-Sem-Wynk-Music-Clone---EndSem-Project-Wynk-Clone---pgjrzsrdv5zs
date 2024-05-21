import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faCirclePause } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { useAuth } from './AuthContext';
import {useNavigate} from "react-router-dom"; // Import the custom hook


const SongCard = ({ song }) => {
    const navigate = useNavigate();
    const { _id, title, thumbnail, artist } = song;
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const audioRef = useRef(new Audio());
    const { auth: jwtToken } = useAuth(); // Get the token from the context

    useEffect(() => {
        const handlePauseAll = (event) => {
            if (event.detail.audioId !== _id) {
                if (isPlaying) {
                    setIsPlaying(false);
                    audioRef.current.pause();
                }
            }
        };

        window.addEventListener('pauseAll', handlePauseAll);

        return () => {
            window.removeEventListener('pauseAll', handlePauseAll);
        };
    }, [isPlaying, _id]);

    useEffect(() => {
        audioRef.current.addEventListener('ended', () => {
            setIsPlaying(false);
        });
        return () => {
            audioRef.current.removeEventListener('ended', () => {
                setIsPlaying(false);
            });
        };
    }, []);

    const getArtistNames = () => {
        return artist.map(artist => artist.name).join(', ');
    };

    const fetchSongDetails = async () => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/musicx/song/${_id}`, {
                headers: {
                    'accept': 'application/json',
                    'projectID': 'f104bi07c490',
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            const data = await response.json();
            const { audio_url } = data.data;
            setAudioUrl(audio_url);
        } catch (error) {
            console.error('Error fetching song details:', error);
            navigate('/signup');        }
    };

    const handlePlayPause = async () => {
        if (!audioUrl) {
            await fetchSongDetails();
        }
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            // Dispatch a custom event to pause all other audios
            const event = new CustomEvent('pauseAll', { detail: { audioId: _id } });
            window.dispatchEvent(event);

            audioRef.current.src = audioUrl;
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="p-2 m-1">
            <div className="flex-col items-center w-48">
                <img src={thumbnail} alt={title} className="h-42 w-42 rounded-2xl my-4" />
                <h3 className="text-lg font-normal truncate">{title}</h3>
                <p className="text-gray-500 text-xs truncate">{getArtistNames()}</p>
                <FontAwesomeIcon
                    className="relative left-36 bottom-24 bg-transparent size-7 ml-3 cursor-pointer"
                    icon={isPlaying ? faCirclePause : faCirclePlay}
                    onClick={handlePlayPause}
                />
            </div>
        </div>
    );
};

export default SongCard;
