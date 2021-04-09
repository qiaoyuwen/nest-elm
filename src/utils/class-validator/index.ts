import lodash from 'lodash';

export const validateIfNotUndefined = (propertyName: string) => {
  return (object: any) => !lodash.isUndefined(object[propertyName]);
};
