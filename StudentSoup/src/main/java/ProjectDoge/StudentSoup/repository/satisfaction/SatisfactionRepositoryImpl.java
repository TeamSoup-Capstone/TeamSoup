package ProjectDoge.StudentSoup.repository.satisfaction;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class SatisfactionRepositoryImpl implements SatisfactionRepositoryCustom{

    private final JPAQueryFactory queryFactory;


}
