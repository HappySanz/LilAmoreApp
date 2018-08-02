import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';

const window = Dimensions.get('window');
const uri = this._retrieveData;
const value ='';

_retrieveData = async () => {
  try {
    value = await AsyncStorage.getItem('img_url') || '';
   } catch (error) {
     // Error retrieving data
   }
   alert(value)
   return value
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
});

<<<<<<< HEAD
export default function Menu({ 
 }) {
=======
export default function Menu({ onItemSelected }) {
  
>>>>>>> eed37959f928799ee6cbe491108b0e5503e36d1e
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri }}/>
        <Text style={styles.name}>Your name</Text>
      </View>
      <Text
        onPress={() => onItemSelected('About')}
        style={styles.item}>
        About
      </Text>
      <Text
        onPress={() => onItemSelected('Contacts')}
        style={styles.item}>
        Contacts
      </Text>
    </ScrollView>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
