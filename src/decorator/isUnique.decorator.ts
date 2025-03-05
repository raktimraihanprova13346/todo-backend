/**
 * Decorator to validate if a field's value is unique within the database.
 * entity - The target entity for uniqueness check.
 * property - The property of the entity to validate uniqueness against.
 * dataSource - The data source from which to access the repository.
 * validationOptions - Additional validation options. can be used for error message
 */
import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';
import {
  registerDecorator,
  ValidationArguments,
  ValidatorOptions,
} from 'class-validator';

export function IsUnique<T>(
  entity: EntityTarget<T>,
  property: keyof T,
  dataSource: DataSource,
  validationOptions?: ValidatorOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          try {
            const repo = dataSource.getRepository(
              entity as EntityTarget<ObjectLiteral>,
            );
            const existing = await repo.findOne({
              where: { [property as string]: value as unknown },
            });
            return !existing;
          } catch (e) {
            return false;
          }
        },
      },
    });
  };
}