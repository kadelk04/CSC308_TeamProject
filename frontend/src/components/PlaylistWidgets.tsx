import React, { useEffect, useState } from 'react';
import { PlaylistWidget } from '../DashboardComponents/PlaylistWidget'; // Adjust import path if necessary
import { fetchPlaylists, Playlist } from '../components/data/FetchPlaylists'; // Adjust import path if necessary

export const PlaylistWidgets = () => {
    const [widgets, setWidgets] = useState<any[]>([]);

    useEffect(() => {
        const getPlaylists = async () => {
            const fetchedPlaylists: Playlist[] | null = await fetchPlaylists();
            if (fetchedPlaylists) {
                const widgetsData = fetchedPlaylists.map((playlist: Playlist) => ({
                    id: playlist.id,
                    component: (
                        <PlaylistWidget
                            key={playlist.id}
                            cover={playlist.images?.[0]?.url || ''}
                            title={playlist.name}
                            tags={playlist.genres || []}
                        />
                    ),
                }));
                setWidgets(widgetsData);
            }
        };

        getPlaylists();
    }, []);

    return widgets;
};
