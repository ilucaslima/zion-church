import Image from "next/image";
import { formatDate } from "@/utils/format-date";
import { IComment } from "@/interfaces/posts";

interface CommentsProps {
  comment: IComment;
}

export const Comments = ({ comment }: CommentsProps) => {
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
          <b>Júnior Soares</b>
          <span className="text-sm text-gray-400">
            {formatDate(comment.createdAt)}
          </span>
        </div>
        <p>{comment.content}</p>
      </div>
    </div>
  );
};
