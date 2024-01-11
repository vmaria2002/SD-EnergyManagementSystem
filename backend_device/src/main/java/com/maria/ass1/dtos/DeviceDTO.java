package com.maria.ass1.dtos;

import com.maria.ass1.model.Device;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeviceDTO {
    private Long id;
    private String name;
    private String description;
    private String address;
    private String maxConsumption;
    private Long user_id;

    public DeviceDTO convertEntityToDto(Device device)
    {
        return new DeviceDTO(
                device.getId(),
                device.getName(),
                device.getDescription(),
                device.getAddress(),
                device.getMaxConsumption(),
                device.getUserTable() == null? null: device.getUserTable()
        );
    }

    public Long  getID( Device device){
        if(device.getUserTable().equals(null)){
            return null;
        }else{
            return device.getUserTable();
        }
    }
}
