import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";
import { Button, Textarea } from "flowbite-react";

interface User {
  username: string;
  profilePicture: string;
}

interface Comment {
  content: string;
  createdAt: string;
  userId: string;
  likes: string[];
  commentId: string;
  numberOfLikes: number;
  onLike: (commentId: string) => void;
  onEdit: (comment: any, editedContent: string) => void;
  onDelete: (commentId: string) => void;
}

export default function Comment({
  content,
  createdAt,
  userId,
  onLike,
  onEdit,
  likes,
  commentId,
  numberOfLikes,
  onDelete,
}: Comment) {
  const [user, setUser] = useState<User>({ username: "", profilePicture: "" });
  const { currentUser } = useSelector((state: any) => state.user);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>(content);
  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(editedContent);
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getUser();
  }, [userId]);

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(commentId, editedContent);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(createdAt).fromNow()}
          </span>
        </div>

        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{content}</p>
            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
              <button
                type="button"
                onClick={() => onLike(commentId)}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  likes.includes(currentUser._id) &&
                  "!text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {numberOfLikes > 0 &&
                  numberOfLikes +
                    " " +
                    (numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === userId || currentUser.isAdmin) && (
                  <>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="text-gray-400 hover:text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(commentId)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
