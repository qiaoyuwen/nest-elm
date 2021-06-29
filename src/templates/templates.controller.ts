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
  Request,
  Delete,
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
import type { AdminEntity } from '@/admins/admins.entity';
import { GetValueRequestDTO } from './dto/get-value-request.dto';

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

  @Post()
  async create(
    @Body() body: CreateTemplateRequestDTO,
    @Request() req: { user: AdminEntity },
  ): Promise<FindOneTemplateResponseDTO> {
    const item = new TemplateEntity({
      ...body,
      admin: req.user,
    });
    const data = await this.templatesService.save(item);
    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessage.CreateSuccess,
      data,
    };
  }

  @Get('getValue')
  async getValue(@Query() params: GetValueRequestDTO) {
    const data = await this.templatesService.getValue(params.tableName, params.fieldName);
    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessage.QuerySuccess,
      data,
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

  @Delete(':id')
  async remove(@Param() params: FindOneTemplateRequestDTO): Promise<FindOneTemplateResponseDTO> {
    await this.templatesService.remove(params.id);
    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessage.DeleteSuccess,
    };
  }
}
