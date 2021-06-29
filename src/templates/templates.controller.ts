import type { FindOneTemplateResponseDTO } from './dto/find-one-template.response.dto';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ControllerName } from './templates.constant';
import { ResponseMessage } from '@/http/constant';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { FindOneTemplateRequestDTO } from './dto/find-one-template.request.dto';
import { PaginationRequestDTO } from '@/http/pagination.request.dto';
import type { FindAllTemplatesResponseDTO } from './dto/find-all-templates.response.dto';
import { CreateTemplateRequestDTO } from './dto/create-template.request.dto';
import { TemplateEntity } from './templates.entity';
import { UpdateTemplateRequestDTO } from './dto/update-template.request.dto';

@ApiTags(ControllerName)
@Controller(ControllerName)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TemplatesController {
  constructor(private templatesService: TemplatesService) {}

  @Get()
  async findAll(@Query() params: PaginationRequestDTO): Promise<FindAllTemplatesResponseDTO> {
    const [list, total] = await this.templatesService.findAll(params);
    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessage.QuerySuccess,
      data: {
        list,
        current: params.current,
        pageSize: params.pageSize,
        total,
      },
    };
  }

  @Get(':id')
  async findOne(@Param() params: FindOneTemplateRequestDTO): Promise<FindOneTemplateResponseDTO> {
    const data = await this.templatesService.findOne(params.id);
    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessage.QuerySuccess,
      data,
    };
  }

  @Post()
  async create(@Body() body: CreateTemplateRequestDTO): Promise<FindOneTemplateResponseDTO> {
    const item = new TemplateEntity({
      ...body,
    });
    const data = await this.templatesService.save(item);
    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessage.CreateSuccess,
      data,
    };
  }

  @Put(':id')
  async update(
    @Param() params: FindOneTemplateRequestDTO,
    @Body() body: UpdateTemplateRequestDTO,
  ): Promise<FindOneTemplateResponseDTO> {
    const item = await this.templatesService.findOne(params.id);
    const data = await this.templatesService.save({
      ...item,
      ...body,
    });
    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessage.QuerySuccess,
      data,
    };
  }
}