import React, { Fragment, useEffect, useState } from 'react';
import './adminsatisfaction.scss';
import AdminNavbar from './AdminNavbar';
import axiosInstance from 'apis/utils/AxiosInterceptor';

const AdminSatisfaction = () => {
  const [avg, setAvg] = useState([]);
  const [score, setScore] = useState<any>([]);
  const [comment, setComment] = useState([]);
  const questions = [
    '본 웹사이트에대해 전반적으로 만족하십니까?',
    '메뉴에 대한 정보의 정확성이 높았습니까?',
    '커뮤니티(게시판)기능 등을 통해 원하는 정보를 제공을 수집할수 있었습니까?',
    '반응형 웹 페이지가 정상적으로 작동하였습니까?',
    '원하는 기능들에 대한 접근성이 좋았습니까?',
    '해당페이지 기타시설에 대해 만족하셨습니까?',
    '원하는 기능이 찾기 쉽도록 UX에서 얼마나 만족하셨습니까?',
    '관리자는 친절하나요?',
  ];
  useEffect(() => {
    axiosInstance
      .get('/satisfactions')
      .then(res => {
        console.log(res.data);
        setAvg(res.data.avg);
        setComment(res.data.comment);
        setScore(res.data.score);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <Fragment>
      <AdminNavbar />
      <div className="adminpage-maincontainer">
        <h2 className="adminsatisfaction-h2">만족도 조사 통계</h2>
        <table className="adminsatisfaction-satisfaction-table">
          <thead>
            <tr>
              <th></th>
              <th>문항 / 만족도</th>
              <th>매우 만족(5점)</th>
              <th>만족(4점)</th>
              <th>보통(3점)</th>
              <th>부족(2점)</th>
              <th>매우 부족(1점)</th>
              <th>통계</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{question}</td>
                {score[idx]?.map((score: any, idx: any) => (
                  <td key={idx}>{score}</td>
                ))}
                <td>{Number.isNaN(avg[idx]) ? 0 : ` ${avg[idx]}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="adminsatisfaction-commentcontainer">
          <h2>기타 코멘트 리스트</h2>
          <table className="adminsatisfaction-satisfaction-table">
            <thead>
              <tr>
                <th></th>
                <th>기타 리스트</th>
              </tr>
            </thead>
            <tbody>
              {comment.map((comment, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminSatisfaction;
