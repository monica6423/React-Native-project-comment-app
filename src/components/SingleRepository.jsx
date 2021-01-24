import React from 'react';
import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import { FlatList, View, StyleSheet, Text } from 'react-native';
import useRepository from '../hooks/useRepository';
import { format } from 'date-fns';

const RepositoryInfo = ({repository}) => {
// Repository's information implemented in the previous exercise
    return (
        <RepositoryItem 
            title={repository.fullName} 
            detail={repository.description}
            lan={repository.language}
            star={repository.stargazersCount}
            forks={repository.forksCount}
            review={repository.reviewCount}
            rating={repository.ratingAverage}
            avatar={repository.ownerAvatarUrl}
            id={repository.id}
            url={repository.url}
            viewURL
        />
)

};
  
const ReviewItem = ({ review }) => {
    return (
        <View>
            <View>
                <Text>{review.rating}</Text>
            </View>
            <View >
                <Text>{review.user.username}</Text> 
                <Text>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text> 
                <Text>{review.text}</Text>
            </View>
        </View>
    )
};
  
const SingleRepository = () => {
    const {id} = useParams();
    const {repository} = useRepository({id});
    if(!repository){
        return (
        <View style={{padding: 16, backgroundColor: '#ffffff'}}>
            <Text>Loading repository..</Text>
        </View>
        )
    }
    const reviews = repository.reviews.edges.map(edge => edge.node);
    console.log('review item', reviews)

    return (
        // <View>
        //     <RepositoryInfo repository={repository}/>
        //     <ReviewItem review={repository.reviews}/> 
        // </View>
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
            // ...
        />
    )
}

export default SingleRepository
