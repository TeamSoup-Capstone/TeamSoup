package ProjectDoge.StudentSoup.service.satisfaction;

import ProjectDoge.StudentSoup.dto.satisfaction.SatisfactionCallDto;
import ProjectDoge.StudentSoup.entity.satisfaction.Satisfaction;
import ProjectDoge.StudentSoup.repository.satisfaction.SatisfactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SatisfactionFindService {

    private final SatisfactionRepository satisfactionRepository;

    static final int N = 8;
    public SatisfactionCallDto getSatisfaction(){
        int[][] result = new int[N][5];
        double[] avg = new double[N];
        List<String> comments = new ArrayList<>();
        List<Satisfaction> satisfactions = satisfactionRepository.findAll();

        for(Satisfaction satisfaction : satisfactions){
            String scores = satisfaction.getScore();
            for(int i=0; i<N; i++){
                int score = scores.charAt(i)-'0';
                result[i][5-score]++;
                avg[i] += score;
            }
            if(satisfaction.getComment()!=null && !satisfaction.getComment().trim().equals("")){
                comments.add(satisfaction.getComment());
            }
        }

        int cnt = satisfactions.size();
        for(int i=0; i<N; i++){
            avg[i] /= cnt;
        }

        SatisfactionCallDto dto = new SatisfactionCallDto(result, avg, comments);

        return dto;
    }
}
