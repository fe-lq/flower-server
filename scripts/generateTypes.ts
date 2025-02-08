import { writeFileSync } from 'fs';
import path from 'path';
import { getDMMF } from '@prisma/internals';

const mapType = (type: string) => {
  switch (type) {
    case 'Int':
      return 'number';
    case 'String':
    case 'Boolean':
      return type.toLowerCase();
    case 'DateTime':
      return 'string';
    default:
      return type;
  }
};
const commentStr = `
/**
 * 此文件由generateTypes.ts自动生成
 * 不要手动编辑
 */
`;

/**
 * 自定义生成 prisma 类型
 */
async function generate() {
  const schemaPath = path.resolve(__dirname, '../prisma/schema.prisma');
  const dmmf = await getDMMF({ datamodelPath: schemaPath });

  const models = dmmf.datamodel.models;
  const enums = dmmf.datamodel.enums;
  let types = '';
  let enumString = '';
  enums.forEach((item) => {
    const enumName = item.name;
    const enumItems = item.values.map((field) => field.name).join(',\n  ');
    enumString += `export enum ${enumName} {\n  ${enumItems}\n};\n`;
  });
  models.forEach((model) => {
    const modelName = model.name;
    const modelFields = model.fields
      .map((field) => {
        const isNullable = field.isRequired ? '' : '?';
        const isArr = field.isList ? '[]' : '';
        return `${field.name}${isNullable}: ${mapType(field.type)}${isArr};`;
      })
      .join('\n  ');

    types += `export type ${modelName} = {\n  ${modelFields}\n};\n\n`;
  });

  const output = commentStr + `${enumString}\n${types}\n`;

  writeFileSync(path.resolve(__dirname, '../src/types/prismaTypes.ts'), output);
}

generate().catch((e) => {
  console.error(e);
  process.exit(1);
});
