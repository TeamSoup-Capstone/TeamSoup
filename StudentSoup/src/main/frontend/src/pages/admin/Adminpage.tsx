import React, { Fragment, useEffect, useState } from 'react';
import './adminpage.scss';
import axiosInstance from 'apis/utils/AxiosInterceptor';
import AdminNavbar from './AdminNavbar';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

interface MemberType {
  departmentId: number;
  departmentName: string;
  email: string;
  fileName: string | null;
  id: string;
  memberClassification: string;
  memberId: number;
  nickname: string;
  registrationDate: string;
  schoolId: number;
  schoolName: string;
}

const Adminpage = () => {
  const [members, setMembers] = useState<MemberType[]>([]);
  const navigate = useNavigate();
  const MemberList = async () => {
    await axiosInstance
      .get('admin/members', { params: { field: null, value: '' } })
      .then(res => {
        setMembers(res.data.members);
      })
      .catch(err => {
        console.error(err);
      });
  };
  useEffect(() => {
    MemberList();
  }, []);
  const handleUserClick = async (memberName: string, memberId: number) => {
    Swal.fire({
      title: `${memberName}`,
      html: `
        <div>
          <button id="edit-menu" class="custom-swal-button">로그 보기</button>
          <button id="delete-restaurant" class="custom-swal-button">회원 삭제</button>
        </div>
      `,
      showConfirmButton: false,
      focusConfirm: false,
      willOpen: () => {
        document.getElementById('edit-menu')?.addEventListener('click', () => {
          navigate('/admin/userlog', { state: { memberId, memberName } });
          Swal.close();
        });
        document.getElementById('delete-restaurant')?.addEventListener('click', () => {
          Swal.fire({
            title: `${memberName} 회원을 삭제하시겠습니까?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
          }).then(async () => {
            await axiosInstance.get(`/admin/member/delete/${memberId}`).then(() => {
              Swal.fire(`성공적으로 ${memberName} 회원을 삭제하였습니다.`, '', 'success');
              MemberList();
            });
          });
        });
      },
    });
  };

  return (
    <Fragment>
      <AdminNavbar />
      <div className="adminpage-maincontainer">
        <h2>회원 관리 페이지</h2>
        <table className="adminpage-table">
          <thead>
            <tr>
              <th>닉네임</th>
              <th>이메일</th>
              <th>가입일</th>
              <th>학교이름</th>
              <th>학과이름</th>
              <th>분류</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr
                onClick={async () => await handleUserClick(member.nickname, member.memberId)}
                key={member.memberId}
              >
                <td>{member.nickname}</td>
                <td>{member.email}</td>
                <td>{member.registrationDate}</td>
                <td>{member.schoolName}</td>
                <td>{member.departmentName}</td>
                <td>{member.memberClassification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Adminpage;
