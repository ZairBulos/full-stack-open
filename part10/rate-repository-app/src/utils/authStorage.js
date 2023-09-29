import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const accessToken = await AsyncStorage.getItem(`${this.namespace}:token`);
    return accessToken ? JSON.parse(accessToken) : '';
  }

  async setAccessToken(accessToken) {
    const accessTokenJSON = JSON.stringify(accessToken);
    await AsyncStorage.setItem(`${this.namespace}:token`, accessTokenJSON);
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;