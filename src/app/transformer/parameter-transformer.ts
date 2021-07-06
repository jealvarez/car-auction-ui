import * as _ from 'lodash';

export class ParameterTransformer {

  public static transformSnakeCaseToCamelCase(object: Object): Object {
    const camelCase = {};
    // tslint:disable-next-line:forin
    for (const key in object) {
      camelCase[_.camelCase(key)] = object[key];
    }

    return camelCase;
  }

  public static transformCamelCaseToSnakeCase(object: Object): Object {
    const snakeCase = {};
    // tslint:disable-next-line:forin
    for (const property in object) {
      snakeCase[_.snakeCase(property)] = object[property];
    }

    return snakeCase;
  }

  public static joinParameters(object: Object): string {
    const post = [];
    // tslint:disable-next-line:forin
    for (const property in object) {
      post.push(encodeURIComponent(property) + '=' + encodeURIComponent(object[property]));
    }

    return post.join('&');
  }

}
