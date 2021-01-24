import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';
import useRepositories from '../hooks/useRepositories'
import { Menu, Divider, Provider, Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


const ItemSeparator = () => <View style={styles.separator} />;
const MenuButton = ({ onPress, text }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View><Text>{text}</Text></View>
    </TouchableWithoutFeedback>
  );
};
const orderOptions = {
  latest: 'Latest repositories',
  highestRated: 'Highest rated repositories',
  lowestRated: 'Lowest rated repositories',
};

const OrderMenu = ({order, setOrder}) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        style={{
          marginLeft: 8,
          marginTop: 48,
        }}
        anchor={<MenuButton onPress={openMenu} text={orderOptions[order]} />}>
          <Menu.Item title="Sort repositories by.." disabled />
          <Divider />
          <Menu.Item onPress={() => {
            setOrder('latest');
            closeMenu();
            }} title={orderOptions.latest} />
          <Menu.Item onPress={() => {
            setOrder('highestRated');
            closeMenu();
            }} title={orderOptions.highestRated} />
          <Menu.Item onPress={() => {
            setOrder('lowestRated');
            closeMenu();
            }} title={orderOptions.lowestRated} />
      </Menu>
    </View>
  );
}

const SearchBar = ({ order, setOrder}) => {
  return(
    <OrderMenu order={order} setOrder={setOrder}/>
  )
}

const RepositoryListContainer = ({repositories, order, setOrder}) => {

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
      <Provider>
        <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        ListHeaderComponent={<SearchBar order={order} setOrder={setOrder}/>}
        // other props
        />
      </Provider>
    );
};

const RepositoryList = () => {
  const [ order, setOrder] = useState('latest');

  let variables = {first: 8};
  if (order === 'latest') {
    variables.orderBy = 'CREATED_AT';
    variables.orderDirection = 'DESC';
  }else {
    variables.orderBy = 'RATING_AVERAGE';
    order === 'highestRated' ? variables.orderDirection = 'DESC':variables.orderDirection = 'ASC';
  }
  
  const repositories =  useRepositories(variables)


  return <RepositoryListContainer 
    repositories={repositories} 
    order={order}
    setOrder={setOrder}
    />;
};

export default RepositoryList;