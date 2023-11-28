import { View, Button, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const SongScreen = ({route, navigation}) => {
    let songArr = route.params.songsArr;
    console.log(songArr);
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
            {song.img && song.img.length > 0 && song.img[0].url ? (
                <Image source={{ uri: song.img[0].url }} style={styles.pic} />
                ) : (
                <Image source={{ uri: "https://drive.google.com/file/d/1eR2liZW-XvxVKnWdaYUB2IPY58kVevfz/view?usp=sharing" }} style={styles.pic} />
            )}
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