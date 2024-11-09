import axios from 'axios';
import {PlaylistWidget} from '../../DashboardComponents/PlaylistWidget'

export interface Widget {
  id: string;
  cover: string;
  owner: string;
  title: string;
  genres: string[];
  component: React.ReactNode;
}

export interface WidgetData {
  id: string;
  cover: string;
  owner: Owner;
  name: string;
  title: string;
}

export interface Owner {
  display_name: string;
}

export const fetchPlaylists = async (accessToken:string): Promise<WidgetData[]> => {
  // calls the getplaylists endpoint to get the playlists from the user's spotify account
  // returns an array of Widgets that the dashboard can use to display the playlists
  try {
    const response = await axios.get('http://localhost:8000/api/spotify/playlists', {
      params: {
        spotifyToken: accessToken,
      }
    });

    const data = response.data;

    console.log('Playlists:', data);

    const widgetsData: WidgetData[] = data.items.map((playlist: any) => ({
      id: playlist.id,
      cover: playlist.images?.[0]?.url || '',
      owner: playlist.owner.display_name,
      title: playlist.name,
    }));

    return widgetsData ;
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return [];
  }
};

export const buildWidgets = async (playlists: WidgetData[], accessToken:string): Promise<Widget[]> => {
  // get playlist data from fetchPlaylists

  // for each playlist, use the id to get the tracks

  const widgets: Widget[] = await Promise.all(playlists.map(async (playlist: WidgetData) => {
    console.log('Playlist:', playlist);
    console.log('access token:', accessToken);
    const response = await axios.get(`http://localhost:8000/api/spotify/playlists/${playlist.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('Playlist in playlistUtils:', response.data);
    // const tracks = response.data.tracks.items;

    // const artists = tracks.map((track: any) => track.track.artists[0].id);

    // const genres = await Promise.all(artists.map(async (artist: string) => {
    //   const response = await axios.get(`http://localhost:8000/api/spotify/artist/${artist}`, {
    //     params: {
    //       spotifyToken: accessToken,
    //     }
    //   });
      

    //   return getGenres(response.data.genres, accessToken);
    // }));

    return {
      id: playlist.id,
      cover: playlist.cover,
      owner: playlist.owner.display_name,
      title: playlist.title,
      genres: [],
      component: (
        <PlaylistWidget
          key={playlist.id}
          cover={playlist.cover}
          owner={playlist.owner.display_name}
          title={playlist.title}
        />
      )
    };
  }));


  // use the id to get the tracks
  // for each track, get the artist
  // for each artist, get the genre 

  // count the genres, get top genres
  // return top 3 genres
  return [];
};

export const getGenres = async (genres: string[], accessToken: string): Promise<string[]> => {

  console.log('Genres:', genres);
  return [];
};


export const returnWidgets = async (): Promise<Widget[]> => { 
  
  const accessToken = window.localStorage.getItem('spotify_token');

  if (!accessToken) {
    console.error('No access token found');
    return [];
  }


  const playlists_data = await fetchPlaylists(accessToken);
  console.log(playlists_data)

  const playlists_with_genres = await buildWidgets(playlists_data, accessToken);


  // const widgets: Widget[] = playlists_with_genres.map((playlist: any) => ({
  //   id: playlist.id,
  //   cover: playlist.images?.[0]?.url || '',
  //   owner: playlist.owner.display_name,
  //   title: playlist.name,
  //   genres: [],
  //   component: (
  //     <PlaylistWidget
  //       key={playlist.id}
  //       cover={playlist.images?.[0]?.url || ''}
  //       owner={playlist.owner.display_name}
  //       title={playlist.name}
  //     />
  //   )
  // }));
  
  return []
};