import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id, first) => {
  const { loading, data, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      repositoryId: id,
      first
    }
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        repositoryId: id,
        first,
        after: data.repository.reviews.pageInfo.endCursor
      },
    });
  };

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result
  };
};

export default useRepository;