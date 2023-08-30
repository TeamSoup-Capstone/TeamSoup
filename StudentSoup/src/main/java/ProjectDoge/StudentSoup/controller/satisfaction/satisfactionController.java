package ProjectDoge.StudentSoup.controller.satisfaction;

import ProjectDoge.StudentSoup.dto.satisfaction.SatisfactionCallDto;
import ProjectDoge.StudentSoup.dto.satisfaction.SatisfactionDto;
import ProjectDoge.StudentSoup.service.satisfaction.SatisfactionFindService;
import ProjectDoge.StudentSoup.service.satisfaction.SatisfactionRegisterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
public class satisfactionController {

    private  final SatisfactionRegisterService satisfactionRegisterService;

    private final SatisfactionFindService satisfactionFindService;
    @PostMapping("/satisfaction")
    public Long createSatisfaction(@RequestBody() SatisfactionDto dto){
        log.info("살려주세요");
        Long satisfactionId = satisfactionRegisterService.join(dto);
        return satisfactionId;
    }

    @GetMapping("/satisfactions")
    public SatisfactionCallDto getSatisfaction(){
        return satisfactionFindService.getSatisfaction();
    }

}
