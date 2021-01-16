import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CategoryCreateDto } from '~modules/category/dto/category.create.dto';
import { CategoryUpdateDto } from '~modules/category/dto/category.update.dto';
import { UserRequest } from '~modules/user/jwt.guard';
import { PaginationQueryDto } from '~utils/pagination.query.dto';
import {
  Category,
  CategoryId,
  CategoryWhereInterface,
} from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  public async findAll(
    where: CategoryWhereInterface,
    options: { relations?: string[] },
    pagination: PaginationQueryDto,
  ): Promise<Pagination<Category>> {
    const results = await paginate<Category>(
      this.categoryRepository,
      pagination,
      {
        ...options,
        where,
      },
    );

    return results;
  }

  public async find(
    where: CategoryWhereInterface,
    options?: { relations: string[] },
  ): Promise<Category> {
    const category = await this.categoryRepository.findOne(where, options);

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }

  public async create(
    request: UserRequest,
    data: CategoryCreateDto,
  ): Promise<Category> {
    const category = new Category();
    category.name = data.name;

    await Category.save(category);

    return category;
  }

  public async update(
    request: UserRequest,
    id: CategoryId,
    data: CategoryUpdateDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOneOrFail({ id });

    if (!request.user?.isAdmin) {
      throw new ForbiddenException();
    }
    if (data.name) {
      category.name = data.name;
    }

    await Category.save(category);

    return category;
  }

  public async delete(
    request: UserRequest,
    where: CategoryWhereInterface,
  ): Promise<boolean> {
    const category = await this.find(where);

    if (!request.user?.isAdmin) {
      throw new ForbiddenException();
    }

    await Category.remove(category);

    return true;
  }
}