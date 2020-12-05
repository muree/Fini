import React, { useContext } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import AuthContext from '../auth/context'
import Icon from '../components/Icon'
import ListItem from '../components/ListItem'
import ListItemSeparator from '../components/ListItemSeparator'
import Screen from '../components/Screen'
import colors from '../config/colors'

const menuItems = [
  {
    title: 'My Listings',
    icon: {
      name: 'format-list-bulleted',
      backgroundColor: colors.primary
    }
  },
  {
    title: 'My Messages',
    icon: {
      name: 'email',
      backgroundColor: colors.secondary
    },
    targetScreen: 'Messages'
  }
]

export default function AccountScreen({ navigation: { navigate }}) {
  const { user, setUser } = useContext(AuthContext);
  
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={ user.name}
          subTitle={user.email}
          image={require('../assets/olowogoke_seun.jpg')}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={menuItem => menuItem.title}
          renderItem={({item}) => (
            <ListItem
              title={item.title}
              IconComponent={<Icon name={item.icon.name} backgroundColor={item.icon.backgroundColor} />}
              onPress={() => navigate(item.targetScreen)}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        />
      </View>
      <ListItem
        title='Sign out'
        IconComponent={<Icon name='logout' backgroundColor='#ffe66d' />}
        onPress={() => setUser(null) }
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10
  },
  screen: {
    backgroundColor: colors.lightGrey
  }
})