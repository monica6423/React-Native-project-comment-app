import React from 'react'
import { View, Image, StyleSheet } from 'react-native';
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
export default function RepositoryItem({avatar, title, detail, lan, star, forks, review, rating }) {
    return (
    <View>
      <Image
        style={styles.avatar}
        source={{
            uri: `${avatar}`
          }}
      />
      <Text color="textPrimary" fontWeight="bold">Full name: {title}</Text>
      <Text color="textSecondary">dddDescription: {detail}</Text>
      <Text style={styles.lanBox}>{lan}</Text>
      <Text color="textPrimary" fontWeight="bold">{star}</Text>
      <Text color="textPrimary" fontWeight="bold">{forks}</Text>
      <Text color="textPrimary" fontWeight="bold">{review}</Text>
      <Text color="textPrimary" fontWeight="bold">{rating}</Text>
    </View>
    )
}
