package ProjectDoge.StudentSoup.dto.satisfaction;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class SatisfactionCallDto {

    private int[][] score;

    private double[] avg;

    private List<String> comment;

    public SatisfactionCallDto(int[][] score, double[] avg, List<String> comment){
        this.score = score;
        this.avg = avg;
        this.comment = comment;
    }
}
