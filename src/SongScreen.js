import { View, Text, Button } from 'react-native';

const SongScreen = ({route, navigation}) => {
    let songArr = route.params;

  return (
    <View>
        {songArr.map(song => (
            <Button
            onPress={() => console.log(song.href)}
            key={song.name}
            title ={song.name} />
        ))}
    </View>
  )
};


export default SongScreen;