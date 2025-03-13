"use client";

import React, { useState } from "react";
import Pagination from "../Common/Pagination";
import { useAccount } from "wagmi";

interface Comment {
  user: string;
  avatar: string;
  time: string;
  content: string;
}

interface CommentsComponentProps {
  comments: Comment[];
  itemsPerPage?: number;
  handlePostComment?: any;
  t: any;
}

const CommentsComponent: React.FC<CommentsComponentProps> = ({
  comments,
  itemsPerPage = 5,
  handlePostComment,
  t,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [newComment, setNewComment] = useState("");

  const totalPages = Math.ceil(comments.length / itemsPerPage);
  const currentData = comments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const { isConnected } = useAccount();

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      handlePostComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Input Comment Section */}
      {isConnected && (
        <div className="bg-[#3A3A3A] rounded-lg overflow-hidden">
          <textarea
            className="w-full p-4 bg-[#3A3A3A] text-white placeholder-gray-500 resize-none outline-none"
            rows={4}
            placeholder={t("write_your_comment")}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            maxLength={256}
          />
          <div className="flex justify-between items-center px-4 py-2">
            <span className="text-white text-base font-normal">
              {newComment.length}/256
            </span>
            <button
              className="
             bg-gradient-to-r 
                from-[#AF46FF] 
                  to-[#2E0BF1]
                  rounded-[4px]
             
                  transition-shadow
                  duration-300
                  px-12 py-2
                  text-white
                  font-semibold
                   text-white
            "
              onClick={handleCommentSubmit}
            >
              {t("submit")}
            </button>
          </div>
        </div>
      )}

      {/* Comments List */}
      <div className="flex flex-col gap-0.5">
        {currentData.map((comment, index) => (
          <div
            key={index}
            className={`${index % 2 === 1 ? "bg-bgTd" : "bg-[#252525]"}  
          border-b border-[#fff] last:border-none
          p-3 py-2 flex items-start`}
          >
            <div className="flex-1 font-normal">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center border border-[#FBB215] rounded-[4px] ">
                  <img
                    src={comment.avatar}
                    alt={comment.user}
                    className="w-8 h-8 rounded-[4px]  mr-3"
                  />
                  <span className="text-white text-sm  truncate mr-3">
                    {comment.user}
                  </span>
                </div>
                <span className="text-[#ADADAD] text-sm">{comment.time}</span>
              </div>
              <p className="text-white text-sm mt-2 break-anywhere">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default CommentsComponent;
