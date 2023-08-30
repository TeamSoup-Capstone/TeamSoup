import React, { Fragment, useEffect, useState } from 'react';
import './adminuserlog.scss';
import { useLocation } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import MyPagination from 'pages/mypage/components/MyPagination';
import { detailCount, preViewBoard, preViewReply, preViewReview } from 'apis/api/MyPageAPI';
import {
  type PreviewReviewResponse,
  type DetailCountResponse,
  type PreViewBoardResponse,
  type PreViewReplyResponse,
} from 'interfaces/MyPageTypes';

const AdminUserLog = () => {
  const [content, setContent] = useState<string>('board');
  const [currentPage, setCurrentpage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const [replycurrentPage, setReplyCurrentpage] = useState(1);
  const [replypostPerPage, setReplyPostPerPage] = useState(6);
  const [selectedOption, setSelectedOption] = useState('all');
  const [reviewcurrentPage, setReviewCurrentpage] = useState(1);
  const [reviewpostPerPage, setReviewPostPerPage] = useState(6);
  const [contentCount, setContentCount] = useState<DetailCountResponse>();
  const [boardList, setBoardList] = useState<PreViewBoardResponse>();
  const [replyList, setReplyList] = useState<PreViewReplyResponse>();
  const [reviewList, setReviewList] = useState<PreviewReviewResponse>();
  const { state } = useLocation();

  const userName = state.memberName;
  const userId = state.memberId;
  console.log(userName);
  console.log(userId);

  useEffect(() => {
    if (userId) {
      detailCount(userId)
        .then(res => {
          setContentCount(res);
        })
        .catch(err => {
          console.error(err);
        });
      preViewBoard(userId, currentPage - 1, postPerPage)
        .then(res => {
          setBoardList(res);
        })
        .catch(err => {
          console.error(err);
        });
      preViewReply(userId, replycurrentPage - 1, replypostPerPage)
        .then(res => {
          setReplyList(res);
        })
        .catch(err => {
          console.error(err);
        });
      preViewReview(userId, selectedOption, reviewcurrentPage - 1, 3)
        .then(res => {
          console.log(res);
          setReviewList(res);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [currentPage, replycurrentPage, reviewcurrentPage, selectedOption]);
  const handleBoardPageChange = (e: any) => {
    setCurrentpage(e);
  };
  const handleReplyPageChange = (e: any) => {
    setReplyCurrentpage(e);
  };
  const handleReviewPageChange = (e: any) => {
    setReviewCurrentpage(e);
  };
  return (
    <Fragment>
      <AdminNavbar />
      <div className="adminpage-maincontainer">
        <div className="adminuserlog-container">
          <h2>{userName} 회원의 게시글/댓글</h2>
          <div className="adminuserlog-bordercontainer">
            <div
              onClick={() => {
                setContent('board');
              }}
              className={
                content === 'board'
                  ? 'adminuserlog-borderbuttonboard adminuserlog-borderbuttonboardactive'
                  : 'adminuserlog-borderbuttonboard'
              }
            >
              게시글 ({contentCount?.boardWriteCount})
            </div>
            <div
              onClick={() => {
                setContent('reply');
              }}
              className={
                content === 'reply'
                  ? 'adminuserlog-borderbuttonreply adminuserlog-borderbuttonreplyactive'
                  : 'adminuserlog-borderbuttonreply'
              }
            >
              댓글 ({contentCount?.boardReplyWriteCount})
            </div>
          </div>
          {content === 'board' && (
            <>
              <table className="adminuserlog-boardtable">
                <thead>
                  <tr>
                    <th>제목</th>
                    <th>작성일</th>
                    <th>조회수</th>
                    <th>좋아요</th>
                  </tr>
                </thead>
                <tbody>
                  {boardList?.content?.map((board, index) => (
                    <tr key={`board-${board.boardId}-${index}`}>
                      <td
                        id={board.boardId.toString()}
                        style={{
                          textDecoration: 'none',
                        }}
                      >
                        {board.title}
                      </td>
                      <td>{board.writeDate}</td>
                      <td>{board.viewCount}</td>
                      <td>{board.likedCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="adminuserlog-pagenation">
                {boardList?.totalElements !== undefined && (
                  <MyPagination
                    currentPage={currentPage}
                    itemsCount={boardList.totalElements}
                    itemsPerPage={postPerPage}
                    onChange={handleBoardPageChange}
                  />
                )}
              </div>
            </>
          )}

          {content === 'reply' && (
            <>
              <table className="adminuserlog-boardtable">
                <thead>
                  <tr>
                    <th>내용</th>
                    <th>작성일</th>
                    <th>좋아요</th>
                  </tr>
                </thead>
                <tbody>
                  {replyList?.content?.map((reply, index) => (
                    <tr key={`reply-${reply.boardId}-${index}`}>
                      <td
                        id={reply.boardId.toString()}
                        style={{
                          textDecoration: 'none',
                        }}
                      >
                        {reply.content}
                      </td>
                      <td>{reply.writeDate}</td>
                      <td>{reply.likedCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="adminuserlog-pagenation">
                {replyList?.totalElements !== undefined && (
                  <MyPagination
                    currentPage={replycurrentPage}
                    itemsCount={replyList.totalElements}
                    itemsPerPage={replypostPerPage}
                    onChange={handleReplyPageChange}
                  />
                )}
              </div>
            </>
          )}
        </div>
        <div className="adminuserlog-reviewcontainer">
          <h2>{userName} 회원의 리뷰</h2>
          <table className="adminuserlog-reviewboardtable">
            <thead>
              <tr>
                <th>제목</th>
                <th>작성일</th>
                <th>조회수</th>
                <th>좋아요</th>
              </tr>
            </thead>
            <tbody>
              {reviewList?.content?.map((review, index) => (
                <tr key={`review-${review.restaurantId}-${index}`}>
                  <td
                    id={review.restaurantId.toString()}
                    style={{
                      textDecoration: 'none',
                    }}
                  >
                    {review.content}
                  </td>
                  <td>{review.writeDate}</td>
                  <td>{review.likedCount}</td>
                  <td>{review.starLiked}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="adminuserlog-pagination">
            {reviewList?.totalElements !== undefined && (
              <MyPagination
                currentPage={reviewcurrentPage}
                itemsCount={reviewList.totalElements}
                itemsPerPage={reviewpostPerPage}
                onChange={handleReviewPageChange}
              />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminUserLog;
