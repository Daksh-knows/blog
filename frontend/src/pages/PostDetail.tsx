import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import type { Post, ApiResponse } from "../types/index";

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async (): Promise<void> => {
    try {
      const response = await api.get<ApiResponse<Post>>(`/posts/${id}`);
      setPost(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch post");
      navigate("/");
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
        <div className="text-xl">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Post not found</div>
      </div>
    );
  }

  const isAuthor = user && post.author._id === user.id;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center justify-between mb-6 text-gray-600">
          <div className="flex items-center gap-4">
            <span>By {post.author?.name}</span>
            <span>•</span>
            <span>{formatDate(post.createdAt)}</span>
            <span>•</span>
            <span>{post.readTime} min read</span>
          </div>
          {isAuthor && (
            <button
              onClick={() => navigate(`/edit-post/${post._id}`)}
              className="text-blue-600 hover:underline"
            >
              Edit Post
            </button>
          )}
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {post.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>

        {post.updatedAt !== post.createdAt && (
          <div className="mt-8 text-sm text-gray-500">
            Last updated: {formatDate(post.updatedAt)}
          </div>
        )}
      </article>
    </div>
  );
};

export default PostDetail;
