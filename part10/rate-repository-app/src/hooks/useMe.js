import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useMe = (includeReviews = false) => {
  const { loading, data, refetch } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: {
      includeReviews
    }
  });

  return {
    me: data?.me,
    loading,
    refetch,
  }
};

export default useMe;