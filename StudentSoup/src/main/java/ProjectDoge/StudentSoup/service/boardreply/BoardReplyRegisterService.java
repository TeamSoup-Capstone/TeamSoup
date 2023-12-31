package ProjectDoge.StudentSoup.service.boardreply;


import ProjectDoge.StudentSoup.dto.boardreply.BoardReplyReqDto;
import ProjectDoge.StudentSoup.entity.board.Board;
import ProjectDoge.StudentSoup.entity.board.BoardCategory;
import ProjectDoge.StudentSoup.entity.board.BoardReply;
import ProjectDoge.StudentSoup.entity.member.Member;
import ProjectDoge.StudentSoup.entity.member.MemberClassification;
import ProjectDoge.StudentSoup.exception.admin.MemberClassificationNotAdminException;
import ProjectDoge.StudentSoup.repository.boardreply.BoardReplyRepository;
import ProjectDoge.StudentSoup.repository.member.MemberRepository;
import ProjectDoge.StudentSoup.service.board.BoardFindService;
import ProjectDoge.StudentSoup.service.member.MemberFindService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardReplyRegisterService {

    private final BoardFindService boardFindService;
    private final MemberFindService memberFindService;
    private final BoardReplyRepository boardReplyRepository;
    private final BoardReplyValidationService boardReplyValidationService;

    private final MemberRepository memberRepository;

    @Transactional
    public Long join(BoardReplyReqDto dto,String memberId){
        log.info("게시글 댓글 등록 서비스가 실행됐습니다.");
        boardReplyValidationService.checkContent(dto.getContent());
        BoardReply boardReply;
        if(isReply(dto)){
            boardReply = createBoardReply(dto,memberId);
        } else {
            boardReply = createNestedBoardReply(dto);
        }
        BoardReply reply = boardReplyRepository.save(boardReply);
        log.info("게시글 댓글 등록 서비스가 실행됐습니다.");
        return reply.getReplyId();
    }


    private boolean isReply(BoardReplyReqDto dto) {
        return dto.getLevel() == 0;
    }

    private BoardReply createBoardReply(BoardReplyReqDto dto,String memberId){
        setCreateReplyDtoValue(dto);
        Board board = boardFindService.findOne(dto.getBoardId());
        Member member = memberRepository.findById(memberId).orElse(null);
        checkCustomerServiceRole(board,member);
        return new BoardReply().createBoardReply(member, board, dto);
    }

    private void checkCustomerServiceRole(Board board, Member member) {
        if(board.getBoardCategory().equals(BoardCategory.CUSTOMERSERVICE) && !member.getMemberClassification().equals(MemberClassification.ADMIN)){
            throw new MemberClassificationNotAdminException("로그인 한 회원은 운영자가 아닙니다.");
        }
    }

    private void setCreateReplyDtoValue(BoardReplyReqDto dto) {
        int seq = boardReplyRepository.findMaxSeqByBoardId(dto.getBoardId())
                        .orElse(0);
        dto.setSeq(seq + 1);
        dto.setDepth(0);
    }

    private BoardReply createNestedBoardReply(BoardReplyReqDto dto){
        setCreateBoardNestedDtoValue(dto);
        Board board = boardFindService.findOne(dto.getBoardId());
        Member member = memberFindService.findOne(dto.getMemberId());
        return new BoardReply().createBoardReply(member, board, dto);
    }

    private void setCreateBoardNestedDtoValue(BoardReplyReqDto dto){
        int depth = boardReplyRepository.findMaxDepthByReplyId(dto.getBoardId(), dto.getSeq())
                .orElse(0);
        dto.setDepth(depth + 1);
    }
}
