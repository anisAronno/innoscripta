import BlogList from '../components/blog/BlogList';

const Home = () => {
  return (
    <div className="min-h-screen p-2">
      <div className="w-full mx-auto  gap-8">
        <BlogList></BlogList>
      </div>
    </div>
  );
};

export default Home;
