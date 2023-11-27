import { View, Text, Button } from 'react-native';

const SongScreen = ({route, navigation}) => {
    let songArr = route.params.songsArr;
    let accessToken = route.params.accessToken;

  return (
    <View>
        {songArr.map(song => (
            <Button
            onPress={() => {
                console.log(song.href);
                navigation.navigate('Details', {name: song.name, href: song.href, accessToken: accessToken});
            }}
            key={song.name}
            title ={song.name} />
        ))}
    </View>
  )
};


export default SongScreen;