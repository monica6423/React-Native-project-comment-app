import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';
import useRepositories from '../hooks/useRepositories'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({repositories}) => {

    const repositoryNodes = repositories
      ? repositories.repositories.edges.map(edge => edge.node)
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
        id={item.id}
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

const RepositoryList = () => {
  const repositories =  useRepositories()
  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;