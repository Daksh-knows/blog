import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import type { Post, ApiResponse } from "../types/index";
import { AxiosError } from "axios";

interface FormData {
  title: string;
  content: string;
  excerpt: string;
  status: "draft" | "published";
  tags: string;
}

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    excerpt: "",
    status: "draft",
    tags: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async (): Promise<void> => {
    try {
      const response = await api.get<ApiResponse<Post>>(`/posts/${id}`);
      const post = response.data.data;
      setFormData({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || "",
        status: post.status,
        tags: post.tags?.join(", ") || "",
      });
    } catch (error) {
      toast.error("Failed to fetch post");
      navigate("/dashboard");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const postData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      await api.put(`/posts/${id}`, postData);
      toast.success("Post updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError.response?.data?.message || "Failed to update post"
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8"
      >
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-semibold">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
            maxLength={200}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-semibold">
            Excerpt (Optional)
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            maxLength={500}
            placeholder="A brief summary of your post..."
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-semibold">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={15}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
            placeholder="Write your blog post content here..."
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-semibold">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="e.g., technology, javascript, web development"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-semibold">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Updating..." : "Update Post"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
