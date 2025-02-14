
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";

const Index = () => {
  const posts = [
    {
      username: "Sarah Anderson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      content: "Just launched my new portfolio! Check it out and let me know what you think 🎨",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=800&fit=crop",
      likes: 124,
      comments: 8,
      shares: 3,
    },
    {
      username: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      content: "Had an amazing time at the design conference today. Met so many talented people and learned a ton!",
      likes: 89,
      comments: 12,
      shares: 2,
    },
    {
      username: "Emily Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      content: "Working on something exciting! Can't wait to share it with you all soon.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=800&fit=crop",
      likes: 232,
      comments: 15,
      shares: 7,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-20 px-4 max-w-4xl mx-auto">
        <div className="space-y-6">
          {posts.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
