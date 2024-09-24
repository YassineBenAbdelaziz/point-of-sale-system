import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsNotExpiredDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      propertyName: propertyName,
      name: 'isNotExpiredDate',
      target: object.constructor,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') {
            return false;
          }

          const date = new Date(value);
          const now = new Date();
          return date > now;
        },
        defaultMessage() {
          return `$property must not be an expired date`;
        },
      },
    });
  };
}
