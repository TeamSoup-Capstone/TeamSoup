import React, { useState } from 'react';
import './satisfaction.scss';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Satisfaction = () => {
  const navigate = useNavigate();
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

  const [scores, setScores] = useState(Array(questions.length).fill(0));
  const [content, setContent] = useState<string>('');

  const handleScoreChange = (idx: number, score: number) => {
    const newScores = [...scores];
    newScores[idx] = score;
    setScores(newScores);
  };
  const handleSubmit = async () => {
    if (scores.includes(0)) {
      Swal.fire('실패', '항목들을 전부 선택해주세요.', 'error');
      return;
    }
    await axios
      .post('/satisfaction', {
        star: [...scores],
        comment: content,
      })
      .then(res => {
        Swal.fire({
          icon: 'success',
          title: '만족도 조사 등록 완료',
          text: '만족도 조사에 참여해주셔서 감사합니다!',
          timer: 3000,
          showConfirmButton: true,
          confirmButtonText: '확인',
          showCancelButton: false,
          timerProgressBar: true,
        })
          .then(() => {
            navigate('/');
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.error(err);
      });
  };
  return (
    <div className="satisfaction-maincontainer">
      <h1>만족도 조사</h1>
      <table className="satisfaction-table">
        <thead>
          <tr>
            <th></th>
            <th>문항 / 만족도</th>
            <th>매우 만족(5점)</th>
            <th>만족(4점)</th>
            <th>보통(3점)</th>
            <th>부족(2점)</th>
            <th>매우 부족(1점)</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{question}</td>
              {[5, 4, 3, 2, 1].map(score => (
                <td key={score}>
                  <input
                    type="radio"
                    name={`question-${idx}`}
                    value={score}
                    onChange={() => handleScoreChange(idx, score)}
                    required
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="satisfaction-textarea">
        <p>
          (기타) 원하는 점이나 문제점이 있다면 자유롭게 써주세요.(설문에대한 익명성을 보장합니다)
        </p>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="제한없이 작성 가능합니다."
          rows={4}
          style={{ width: '80%' }}
        />

        <button className="satisfaction-submitbutton" onClick={handleSubmit}>
          제출하기
        </button>
      </div>
    </div>
  );
};

export default Satisfaction;
