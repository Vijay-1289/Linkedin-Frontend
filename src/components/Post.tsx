
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";

interface PostProps {
  username: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
}

const Post = ({
  username,
  avatar,
  content,
  image,
  likes: initialLikes,
  comments,
  shares,
}: PostProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="glass-card rounded-xl p-4 mb-6 w-full max-w-2xl mx-auto feed-item">
      <div className="flex items-center mb-4">
        <img
          src={avatar}
          alt={username}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-3">
          <h3 className="font-medium text-gray-900">{username}</h3>
          <p className="text-sm text-gray-500">Just now</p>
        </div>
      </div>

      <p className="text-gray-800 mb-4">{content}</p>

      {image && (
        <img
          src={image}
          alt="Post content"
          className="rounded-lg w-full object-cover mb-4"
          style={{ maxHeight: "512px" }}
        />
      )}

      <div className="flex items-center justify-between pt-4 border-t">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 ${
            isLiked ? "text-rose-500" : "text-gray-500"
          } hover:text-rose-600 transition-colors duration-200`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
          <span>{likes}</span>
        </button>

        <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-600 transition-colors duration-200">
          <MessageCircle className="w-5 h-5" />
          <span>{comments}</span>
        </button>

        <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-600 transition-colors duration-200">
          <Share2 className="w-5 h-5" />
          <span>{shares}</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
