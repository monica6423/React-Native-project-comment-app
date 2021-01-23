import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';

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
export default function RepositoryItem({id, avatar, title, detail, lan, star, forks, review, rating }) {
    const onPress = () => {
      console.log('press!!', id)
    }
    return (
    <View>
      <TouchableOpacity
        onPress={onPress}
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
      </TouchableOpacity>
    </View>
    )
}
