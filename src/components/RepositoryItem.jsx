import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';
import { useHistory } from "react-router-dom";
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
    avatar: {
      width: 66,
      height: 58,
    },
    lanBox: {
      backgroundColor: '#0264D7',
      color: 'white'
    }
    
});
export default function RepositoryItem({id, avatar, title, detail, lan, star, forks, review, rating, url, viewURL }) {
  const history = useHistory();  
  const openURL = () => {
    Linking.openURL(url);
  }
  const onPress = (id) => {
      console.log('press!!', id)
      history.push(`/${id}`);
    }
    return (
    <View>
      <TouchableOpacity
        onPress={ () => onPress(id)}
      >
        <Image
          style={styles.avatar}
          source={{
              uri: `${avatar}`
            }}
        />
        <Text color="textPrimary" fontWeight="bold">Full name: {title}</Text>
        <Text color="textSecondary">Description: {detail}</Text>
        <Text style={styles.lanBox}>{lan}</Text>
        <Text color="textPrimary" fontWeight="bold">{star}</Text>
        <Text color="textPrimary" fontWeight="bold">{forks}</Text>
        <Text color="textPrimary" fontWeight="bold">{review}</Text>
        <Text color="textPrimary" fontWeight="bold">{rating}</Text>
        {viewURL&&(
          <View style={styles.btnContainer}>
            <Text onPress={()=>openURL()}>Open in GitHub</Text>
          </View>)}
      </TouchableOpacity>
    </View>
    )
}
