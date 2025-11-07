import React, {
  useState,
  useEffect,
  type FormEvent,
  type ChangeEvent,
} from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import type { Post, PaginatedResponse } from "../types/index";
import { AxiosError } from "axios";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (): Promise<void> => {
    try {
      const response = await api.get<PaginatedResponse<Post>>("/posts");
      setPosts(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.get<PaginatedResponse<Post>>(
        `/posts?search=${search}`
      );
      setPosts(response.data.data);
    } catch (error) {
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to BlogHub</h1>
        <p className="text-gray-600 text-lg">
          Discover amazing stories and ideas
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-8 max-w-2xl mx-auto">
        <div className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            placeholder="Search posts..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length === 0 ? (
          <div className="col-span-full text-center text-gray-600">
            No posts found
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <Link to={`/post/${post._id}`}>
                <h2 className="text-2xl font-bold mb-2 hover:text-blue-600">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>By {post.author?.name}</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="mt-4 flex gap-2 flex-wrap">
                {post.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                to={`/post/${post._id}`}
                className="mt-4 inline-block text-blue-600 hover:underline"
              >
                Read more →
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
