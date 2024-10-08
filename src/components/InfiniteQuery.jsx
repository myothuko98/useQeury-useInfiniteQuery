import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPosts = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`
  );
  return data;
};

const dataList = async ({ page }) => {
  const offset = page ? page : 0;
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`
  );
  const data = await res.json();
  console.log('data = ', data);
  return {
    results: data.results,
    offset: offset + 10,
  };
};

const InfiniteQuery = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['infinitePosts'],
    queryFn: ({ pageParam }) => fetchPosts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred: {error.message}</p>;

  return (
    <div
      style={{
        border: '1px solid black',
        overflow: 'auto',
      }}
    >
      <h1>Infinite Posts</h1>
      {data?.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.map((post) => (
            <p key={post.id}>{post.title}</p>
          ))}
        </React.Fragment>
      ))}
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? 'Load More'
          : 'No more posts'}
      </button>
    </div>
  );
};

export default InfiniteQuery;
