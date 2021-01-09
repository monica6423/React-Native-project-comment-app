import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
    const { data, error, loading } = useQuery(GET_REPOSITORIES, {fetchPolicy: 'cache-and-network',});
    // const [repositories, setRepositories] = useState();

    // const fetchRepositories = async () => {
    //   const response = await fetch('http://192.168.1.105:5000/api/repositories');
    //   const json = await response.json();
    //   setRepositories(json);
    // };
  
    // useEffect(() => {
    //   fetchRepositories();
    // }, []);
  
    // Get the nodes from the edges array
    const repositoryNodes = data
      ? data.repositories.edges.map(edge => edge.node)
      : [];


    const renderItem = ({ item }) => (
        <RepositoryItem 
        title={item.fullName} 
        detail={item.description}
        lan={item.language}
        star={item.stargazersCount}
        forks={item.forksCount}
        review={item.reviewCount}
        rating={item.ratingAverage}
        avatar={item.ownerAvatarUrl}
        />
    );
    
    return (
        <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        // other props
        />
    );
};

export default RepositoryList;