import { View, Button, StyleSheet, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Default from '../assets/default_playlist.png';


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
            img: song.track.album.images,
        }
        //console.log(songObj.img);
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


  // playlists.map(playlist => {
  //   console.log("playlist: ", playlist);
  //   if(playlist.img[0] && playlist.img[0].length)
  //   {
  //     // img for playlist exists
  //     console.log("playlist.img[0]: ", playlist.img[0].url)
  //   }  
  // })

  return (
    <ScrollView>
        {playlists.map(playlist => (
          <View style={styles.playlists}>
              <Button 
              key={playlist.name}
              onPress={() => {
                  getTracks(playlist.tracks, accessToken).then((songsArr) => {
                      navigation.navigate("Songs", songsArr);
                  }).catch((error) => {
                      console.error(error);
                    });
              }}
              title={playlist.name}/>

              {playlist.img && playlist.img.length > 0 && playlist.img[0].url ? (
                <Image source={{ uri: playlist.img[0].url }} key={playlist.name} style={styles.pic} />
                ) : (
                  // cannot find this image:
                  // <Image source={{ uri: "../assets/default_playlist.png" }} key={playlist.name} style={styles.pic} />
                  null
              )}

              </View>
        ))}
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  playlists: {
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0'
  },
  pic: {
    width: 66,
    height: 58,
  },
});

export default PlaylistScreen;