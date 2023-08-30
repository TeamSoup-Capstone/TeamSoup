package ProjectDoge.StudentSoup.entity.satisfaction;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Satisfaction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String score;

    private String comment;


    public Satisfaction setDto(String comment,String score){
        this.score = score;
        this.comment = comment;
    return this;
    }


}
