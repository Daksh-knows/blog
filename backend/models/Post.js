const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
      maxlength: [200, "Title cannot be more than 200 characters"],
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
    },
    excerpt: {
      type: String,
      maxlength: [500, "Excerpt cannot be more than 500 characters"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    readTime: {
      type: Number, // in minutes
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate read time before saving (approx 200 words per minute)
PostSchema.pre("save", function (next) {
  if (this.content) {
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / 200) || 1;
  }

  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 150) + "...";
  }

  next();
});

// Index for faster queries
PostSchema.index({ author: 1, createdAt: -1 });
PostSchema.index({ status: 1, createdAt: -1 });
PostSchema.index({ tags: 1 });

module.exports = mongoose.model("Post", PostSchema);
