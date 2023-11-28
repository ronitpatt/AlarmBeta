import React, {useState} from 'react';
import { Text, View } from 'react-native';
import { Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { spotifyCredentials } from './secret';
import { encode } from 'base-64';


const Separator = () => <View style={styles.separator} />;

const SoundScreen = ({navigation}) => {

  const [accessToken, setAccessToken] = useState("")
  const [refreshToken, setRefreshToken] = useState("")
  const [expirationTime, setExpirationTime] = useState(new Date())
  const [userID, setUserID] = useState("")

  const showPlaylists = (playlistArr, accessToken) => {
    // navigation.navigate('Playlists', {params: playlistArr})
    navigation.navigate('Playlists', {
      playlistArr: playlistArr, 
      accessToken: accessToken})
  }

  const showRecs = (recArr) => {
    navigation.navigate('Songs', {
      songsArr: recArr,
      accessToken: accessToken});
  }

  const redirectUri = AuthSession.makeRedirectUri({
    scheme: 'alarmify'
  });
  // console.log(redirectUri);

  const scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                   'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                   'playlist-modify-private','user-read-recently-played','user-top-read', 'user-read-private', 'user-read-email'];

  const getAuthorizationCode = async () => {
    try {
      const credentials = spotifyCredentials; //we wrote this function above
      const redirectUrl = redirectUri; //this will be something like https://auth.expo.io/@your-username/your-app-slug
      const result = await AuthSession.loadAsync({
        clientId: credentials.clientId,
        clientSecret: credentials.clientSecret,
        redirectUri: redirectUrl,
        scopes: scopesArr,
      }, 'https://accounts.spotify.com')
      // console.log(result)
      const codeVerifier = result.codeVerifier;
      // console.log(codeVerifier)
      const newResult = await result.promptAsync('https://accounts.spotify.com/authorize')
      // console.log(newResult)
      return [codeVerifier, newResult.params.code];
      // console.log(code)
      // return result.params.code
      } catch (err) {
        console.error(err)
      }
    };

  const getTokens = async () => {
    try {
      const codePair = await getAuthorizationCode(); //we wrote this function above
      const codeVerifier = codePair[0]
      const authorizationCode = codePair[1]
      // console.log(codePair);
      const credentials = spotifyCredentials; //we wrote this function above (could also run this outside of the functions and store the credentials in local scope)
      const credsB64 = encode(`${credentials.clientId}:${credentials.clientSecret}`);
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credsB64}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&code=${authorizationCode}&code_verifier=${codeVerifier}&redirect_uri=${
          redirectUri
        }`,
      });
      const responseJson = await response.json();
      // console.log(responseJson)
      // destructure the response and rename the properties to be in camelCase to satisfy my linter ;)
      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: expiresIn,
      } = responseJson;
  
      const expirationTime = new Date().getTime() + expiresIn * 1000;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setExpirationTime(expirationTime);

    } catch (err) {
        console.error(err);
    }
  };

  const refreshTokens = async () => {
    try {
      const credentials = spotifyCredentials //we wrote this function above
      const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
      const refreshToken = refreshToken;
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credsB64}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        await getTokens();
      } else {
        const {
          access_token: newAccessToken,
          refresh_token: newRefreshToken,
          expires_in: expiresIn,
        } = responseJson;
  
        const expirationTime = new Date().getTime() + expiresIn * 1000;
        setAccessToken(newAccessToken);
        if (newRefreshToken) {
          setRefreshToken(newRefreshToken);
        }
        setExpirationTime(expirationTime);
      } 
    }
    catch (err) {
    console.error(err)
    }
  };

  // async function componentDidMount() {
  //   const tokenExpirationTime = expirationTime;
  //   if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
  //     await refreshTokens();
  //   } else {
  //     this.setState({ accessTokenAvailable: true });
  //   }
  // };

  const getPlaylists = async (uri, accessToken, playlistArr) => {
    try {
      while (uri !== null) {
        // console.log(accessToken)
        const response = await fetch(uri, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const responseJSON = await response.json()
        // console.log(responseJSON)
        const playlists = responseJSON.items;
        const next = responseJSON.next;
        // console.log(playlists);
        playlists.forEach(playlist => {
          let playlistObj = {
            name: playlist.name,
            tracks: playlist.tracks.href,
            img: playlist.images,
          }
          let num = playlistArr.push(playlistObj)
        });
        let newPlaylistArr = getPlaylists(next, accessToken, playlistArr);
        //console.log(playlistArr)
        return newPlaylistArr;
      }
      return playlistArr;
    }
    catch (err) {
      console.error(err)
    }
  };

  const getRecs = async () => {
    try {
      const rec_url = 'https://api.spotify.com/v1/recommendations?limit=5&market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=country%2C+pop%2C+rap&seed_tracks=0c6xIDDpzE81m2q797ordA';
      const response = await fetch(rec_url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const responseJSON = await response.json();
      const songRecs = responseJSON.tracks;

      const recArr = []
      songRecs.forEach(rec => {
        let recObj = {
          name: rec.name,
          img: rec.album.images,
          href: rec.uri,
        }
        recArr.push(recObj)
      })
      return recArr;
    }
    catch (err) {
      console.error(err)
    }
  }

    return (
        <View>
    
        <SafeAreaView>
          <View style={{paddingTop: 10}}></View>
          <View style={styles.buttonStyle}>
            <Button
                onPress={() => {getTokens()}}
                title="Connect to Spotify"
                />
          </View>
            <Separator />
          <View style={styles.buttonStyle}>
            <Button
                onPress={() => {
                  getPlaylists('https://api.spotify.com/v1/me/playlists?limit=50', accessToken, []).then((playlistArr) => {
                    // Now you can use playlistArr after it has been resolved
                    showPlaylists(playlistArr, accessToken);
                  }).catch((error) => {
                    console.error(error);
                  });
                }}
                title="Pick a Song"
                /> 
          </View> 
            <Separator />
          <View style={styles.buttonStyle}>
            <Button
                onPress={() => {
                    getRecs().then((recArr) => {
                      showRecs(recArr);
                    }).catch((error) => {
                      console.error(error);
                    });
                  }}
                title="Get a Recommendation"
                /> 
          </View> 
            <Separator />
          <View style={styles.buttonStyle}>
            <Button
                onPress={() => {
                    console.log('You tapped the button!');
                }}
                title="Share with Friends"
                /> 
          </View>
          </SafeAreaView> 
        </View>
      );
    };

    const styles = StyleSheet.create({
    sound: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    buttonStyle: {
        margin: 5,
        alignItems: 'left', 
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
        margin: 5
    }
    });
    
export default SoundScreen;