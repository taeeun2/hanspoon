package com.hansol.hanspoon.dto;

import com.hansol.hanspoon.entity.ChartDataInterface;
import com.hansol.hanspoon.entity.ChartDataInterfaceAge;
import com.hansol.hanspoon.entity.ChartDataInterfaceGender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class ChartDataDto {
    private String type;
    private long count;

    public ChartDataDto(ChartDataInterface i){
        this.type = i.getType();
        this.count = i.getCount();
    }

    public ChartDataDto(ChartDataInterfaceGender i){
        this.type = i.getType().getDescription();
        this.count = i.getCount();
    }

    public ChartDataDto(ChartDataInterfaceAge i){
        this.type = i.getType().getDescription();
        this.count = i.getCount();
    }
}
