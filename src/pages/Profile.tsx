import { useState } from "react";
import { Image, Share2, Send, Edit2, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Post from "@/components/Post";

const Profile = () => {
  const [postContent, setPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [userProfile, setUserProfile] = useState({
    name: "Sarah Anderson",
    username: "@sarahanderson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    bio: "Digital designer & photographer 📸 | Creating beautiful experiences through design",
    posts: [
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
        username: "Sarah Anderson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        content: "Working on something exciting! Can't wait to share it with you all soon.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=800&fit=crop",
        likes: 232,
        comments: 15,
        shares: 7,
      },
    ],
  });

  const [editForm, setEditForm] = useState({
    name: userProfile.name,
    username: userProfile.username,
    bio: userProfile.bio,
  });

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserProfile(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    setUserProfile(prev => ({
      ...prev,
      name: editForm.name,
      username: editForm.username,
      bio: editForm.bio,
    }));
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out my post!",
          text: postContent,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  const handlePost = () => {
    // Here we would typically send the post to a backend
    console.log("Post content:", postContent);
    console.log("Selected image:", selectedImage);
    setPostContent("");
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-20 px-4 max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="glass-card rounded-xl p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                <AvatarFallback>{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <label className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="hidden"
                />
                <Camera className="w-4 h-4 text-gray-600" />
              </label>
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Name"
                    className="mb-2"
                  />
                  <Input
                    value={editForm.username}
                    onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="Username"
                    className="mb-2"
                  />
                  <Textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Bio"
                    className="mb-4"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSaveProfile}>Save</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{userProfile.name}</h1>
                      <p className="text-gray-600">{userProfile.username}</p>
                    </div>
                    <Button variant="outline" size="icon" onClick={() => setIsEditing(true)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="mt-2 text-gray-800">{userProfile.bio}</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Create Post */}
        <div className="glass-card rounded-xl p-6 mb-6">
          <Textarea
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="mb-4"
          />
          
          {selectedImage && (
            <div className="mb-4 relative">
              <img
                src={selectedImage}
                alt="Selected"
                className="rounded-lg w-full object-cover max-h-96"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 p-1 bg-gray-900/50 rounded-full text-white"
              >
                ×
              </button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="relative">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Image className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
            <Button onClick={handlePost}>
              <Send className="w-4 h-4 mr-2" />
              Post
            </Button>
          </div>
        </div>

        {/* User Posts */}
        <div className="space-y-6">
          {userProfile.posts.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Profile;
