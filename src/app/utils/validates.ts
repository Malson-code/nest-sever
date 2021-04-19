/*
 * @Author: malson
 * @Description:自定义校验规则
 */
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

/** example 样例 */
export function IsXxxxxxxxx(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (
            typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            value.length > relatedValue.length
          );
        },
      },
    });
  };
}

/** 除特殊字符外的数据类型 */
export function IsAlphanumeriOrSymbols(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const alphanumericAndSymbolsReg = /^[\w\s,!"#$%&'()*+,-.\/ :;<=>?@[\]^`{|}~]{1,}$/;
          return alphanumericAndSymbolsReg.test(value);
        },
      },
    });
  };
}
