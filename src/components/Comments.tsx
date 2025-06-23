import Image from "next/image";
import { formatDate } from "@/utils/format-date";
import { IComment } from "@/interfaces/posts";

interface CommentsProps {
  comment: IComment;
  commentImage?: string;
  commentName?: string;
}

export const Comments = ({
  comment,
  commentImage,
  commentName,
}: CommentsProps) => {
  return (
    <div key={comment.id} className="flex w-full items-center gap-4">
      <Image
        src="https://i.pravatar.cc/"
        alt="Alvaro"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="bg-background-tertiary flex w-full flex-col gap-2 rounded-md p-3">
        <div className="flex items-center justify-between">
          <b>{comment.name}</b>
          <span className="text-sm text-gray-400">
            {formatDate(comment.createdAt)}
          </span>
        </div>
        {commentImage && (
          <Image
            src={commentImage}
            alt={commentName || "Comment image"}
            width={100}
            height={100}
            className="rounded-md"
          />
        )}
        <p>{comment.content}</p>
      </div>
    </div>
  );
};
