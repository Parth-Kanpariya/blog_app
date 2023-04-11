import React from 'react';
import BlogList from '../component/BlogList';

function Home({ searchQuery }) {
  return (
    <div>
      <BlogList query={searchQuery} />
    </div>
  );
}

export default Home;
