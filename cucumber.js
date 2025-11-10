module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['features/step_definitions/*.ts'],
    format: ['progress', 'html:cucumber-report.html'],
    language: 'es',
    paths: ['features/*.feature']
  }
};