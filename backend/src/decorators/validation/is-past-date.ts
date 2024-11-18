import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPastDate(
  minYears?: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      propertyName: propertyName,
      name: 'isPastDate',
      target: object.constructor,
      options: validationOptions,
      constraints: [minYears],
      validator: {
        validate(value: any, validationArgs?: any) {
          if (typeof value !== 'string') {
            return false;
          }

          const date = new Date(value);
          const now = new Date();

          if (date >= now) {
            return false;
          }

          if (validationArgs?.constraints?.[0]) {
            const minYears = validationArgs.constraints[0];
            const minDate = new Date();
            minDate.setFullYear(minDate.getFullYear() - minYears);
            return date < minDate;
          }
          return true;
        },
        defaultMessage(validationArguments) {
          if (validationArguments?.constraints?.[0]) {
            return `$property must be a date in the past and at least ${
              validationArguments.constraints[0]
            } years ago`;
          }
          return `$property must be a date in the past`;
        },
      },
    });
  };
}
