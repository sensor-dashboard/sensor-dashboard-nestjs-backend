import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { IsNumber, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class MeasurementCreateDto {
  @IsNotEmpty()
  @IsNumber({})
  public measurement: number;

  @IsEnum(MeasurementTypeEnum)
  public measurementType: MeasurementTypeEnum;

  @IsOptional()
  @IsNumber()
  public timeAgo?: number; // seconds between measurements
}
