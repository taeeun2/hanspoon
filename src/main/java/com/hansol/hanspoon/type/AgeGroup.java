package com.hansol.hanspoon.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum AgeGroup {

   TWENTY("20대"),
   THIRTY("30대"),
   FORTY("40대"),
   FIFTY("50대"),
   OVER_SIXTY("60대 이상");
   private final String description;
}
