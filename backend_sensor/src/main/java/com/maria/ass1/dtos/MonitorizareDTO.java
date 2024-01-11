package com.maria.ass1.dtos;

import com.maria.ass1.model.Monitorizare;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Folosesc aceasta clasa, fiindca cnd citesc trimit sub aceasta forma!
 * Le deserializez!
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
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

    public MonitorizareDTO convertEntityToDto(Monitorizare monitorizare)
    {
        return new MonitorizareDTO(
                monitorizare.getId(),
                monitorizare.getTimestamp(),
                monitorizare.getMeasurement_value(),
                monitorizare.getDevice_id()
        );
    }


}
