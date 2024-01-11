package dtos;


import lombok.Getter;
import lombok.Setter;
import model.Monitorizare;
@Getter
@Setter
public class MonitorizareDTO {
    private Long id;
    private String timestamp;
    private float measurementValue;
    private int deviceId;

    public MonitorizareDTO(String timestamp, float measurementValue, int deviceId) {
        this.timestamp = timestamp;
        this.measurementValue = measurementValue;
        this.deviceId = deviceId;
    }
}
