import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MeasurementService } from '~/modules/measurement/measurement.service';
import { MeasurementDto } from '~modules/measurement/dto/measurement.dto';
import { PaginationDto } from '~utils/pagination.dto';
import Measurement from '~modules/measurement/measurement.entity';
import { MeasurementCreateDto } from '~modules/measurement/dto/measurement.create.dto';
import { SensorGuard, SensorRequest } from '~modules/sensor/sensor.guard';
import { MeasurementQueryDto } from '~modules/measurement/dto/measurement.query.dto';
import { MeasurementListCreateDto } from '~modules/measurement/dto/measurement.list.create.dto';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';

@Controller('measurements')
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  @Get()
  public async findAll(
    @Query() query: MeasurementQueryDto,
  ): Promise<{ [key: string]: MeasurementDto[] }> {
    const items = await this.measurementService.findAll(query);
    Object.keys(items).map((key) =>
      items[key].map(MeasurementDto.fromMeasurement),
    );
    return items;
  }

  @UseGuards(SensorGuard)
  @Post()
  public async create(
    @Body() data: MeasurementCreateDto,
    @Request() request: SensorRequest,
  ): Promise<MeasurementDto> {
    const measurement = await this.measurementService.create(request, data);
    return MeasurementDto.fromMeasurement(measurement);
  }

  @UseGuards(SensorGuard)
  @Post('/multi')
  public async createMultiple(
    @Body() data: MeasurementListCreateDto,
    @Request() request: SensorRequest,
  ): Promise<MeasurementDto[]> {
    const measurementList = await this.measurementService.createMultiple(
      request,
      data,
    );
    return measurementList.map(MeasurementDto.fromMeasurement);
  }
}
