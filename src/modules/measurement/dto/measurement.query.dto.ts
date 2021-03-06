import { ArrayMinSize, IsArray, IsEnum, Matches } from 'class-validator';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { SensorId } from '~modules/sensor/sensor.entity';
import { DateRange } from '~utils/date.range';

export class MeasurementQueryDto {
  @ArrayMinSize(1)
  @IsArray()
  public readonly sensorIds?: SensorId[];

  @Matches(DateRange.regex)
  public readonly createdAtRange?: string;

  @IsArray()
  @IsEnum(MeasurementTypeEnum, { each: true })
  @ArrayMinSize(1)
  public readonly measurementTypes?: MeasurementTypeEnum[];
}
