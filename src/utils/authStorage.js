import AsyncStorage from '@react-native-community/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token for the storage
    const accessToken = await AsyncStorage.getItem(`${this.namespace}`);
    return accessToken;
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    try {
        await AsyncStorage.setItem(`${this.namespace}`,accessToken)
    }catch(error){
        console.log(error)
    }
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}`);
  }
}

export default AuthStorage;