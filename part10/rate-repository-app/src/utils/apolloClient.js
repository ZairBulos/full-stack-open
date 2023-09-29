import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';
import { createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: Constants.manifest.extra.apolloUri,
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;