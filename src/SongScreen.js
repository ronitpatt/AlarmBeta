import { View, Button, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const SongScreen = ({route, navigation}) => {
    let songArr = route.params.songsArr;
    let accessToken = route.params.accessToken;

  return (
    <ScrollView>
    <View>
        {songArr.map(song => (
          <View style={styles.songPanel} key={song.name}>
            <Button
            title = {song.name.length >= 25 ? song.name.slice(0,25)+'...' : song.name} 
            onPress={() => {
                console.log(song.href);
                navigation.navigate('Details', {name: song.name, href: song.href, accessToken: accessToken});
            }}
            key={song.name} />
            <Image style={styles.pic} source={{ 
              uri: song.img[0].url, 
            }} />
            </View>
        ))}
    </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  songPanel: {
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
})


export default SongScreen;