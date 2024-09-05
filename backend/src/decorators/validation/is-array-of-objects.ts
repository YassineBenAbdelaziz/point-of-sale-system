import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

export function IsArrayOfObjects(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isArrayOfObjects',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            Array.isArray(value) &&
            value.every(
              (item) =>
                typeof item === 'object' &&
                item !== null &&
                !Array.isArray(item),
            )
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be an array of objects`;
        },
      },
    });
  };
}
