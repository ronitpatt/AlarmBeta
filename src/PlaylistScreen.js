import { View, Text, Button } from 'react-native';


const getTracks = async (uri, accessToken) => { // https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks
    try {
        console.log(uri)
        const response = await fetch(uri, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const responseJSON = await response.json()
      const items = responseJSON.items;
    //   console.log(items)
      const songArr = []
      items.map(song => {
        // console.log(song);
        let songObj = {
            name: song.track.name,
            artists: song.track.artists,
            href: song.track.uri,
        }
        let num = songArr.push(songObj);
      })
      return songArr;
    }
    catch (err) {
        console.error(err)
    }
  };

const PlaylistScreen = ({route, navigation}) => {
  let playlists = [];
  playlists = route.params.playlistArr;
  let accessToken = route.params.accessToken;
//   playlists.map(playlist => {
//     console.log(playlist.name)
//   })

  return (
    <View>
        {playlists.map(playlist => (
            <Button 
            onPress={() => {
                getTracks(playlist.tracks, accessToken).then((songsArr) => {
                    navigation.navigate("Songs", songsArr);
                }).catch((error) => {
                    console.error(error);
                  });
            }}
            title={playlist.name}/>
        ))}
    </View>
  )
};

export default PlaylistScreen;