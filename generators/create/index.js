var Generator = require('yeoman-generator');

module.exports = class extends Generator {

  prompting() {

    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Your name',
      store: true
    },
    {
      type: 'input',
      name: 'appname',
      message: 'Your project name',
      default: this.appname.replace(/\s+/g, '-') // Default to current folder name
    }]).then((answers) => {

      this.appname = answers.appname;
      this.name = answers.name;

      return this.prompt([{
        type: 'input',
        name: 'gitrepo',
        message: 'Your git repository URL',
        default: `https://github.com/semiosBIO/${answers.appname}.git` // Default to current appname
      }]).then((answer) => {

        this.gitrepo = answer.gitrepo;

      });

    });

  }
  writing() {

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('./index.js'),
      { }
    );
    this.fs.copyTpl(
      this.templatePath('build.sh'),
      this.destinationPath('./build.sh'),
      { name: this.appname }
    );
    this.fs.copyTpl(
      this.templatePath('context.js'),
      this.destinationPath('./context.js'),
      { }
    );
    this.fs.copyTpl(
      this.templatePath('test.js'),
      this.destinationPath('./test.js'),
      { }
    );
    this.fs.copyTpl(
      this.templatePath('.eslintrc.json'),
      this.destinationPath('./.eslintrc.json'),
      { }
    );
    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('./.gitignore'),
      { }
    );

  }
  installing() {

    var options = {
      // skip prompts
      'skip-name': false,
      'skip-description': false,
      'skip-version': false,
      'skip-main': false,
      'skip-test': false,
      'skip-repo': false,
      'skip-keywords': false,
      'skip-author': false,
      'skip-license': false,

      // supply alternative defaults
      name: this.appname,
      version: '1.0.0',
      description: '',
      main: 'index.js',
      test: 'echo \'Error: no test specified\' && exit 1',
      repo: this.gitrepo,
      keywords: [],
      author: this.name,
      license: 'ISC',

      // configure run script defaults
      scripts: {
        test: 'echo \'Error: no test specified\' && exit 1'
      },
      dependencies: {
        colors: '^1.1.2',
        'is-lambda': '^1.0.1',
        lodash: '^4.17.4'
      },
      devDependencies: {
        eslint: '^3.12.1',
        'eslint-config-airbnb': '^13.0.0',
        'eslint-plugin-import': '^2.2.0',
        'eslint-plugin-jsx-a11y': '^2.2.3',
        'eslint-plugin-react': '^6.8.0',
        minimist: '^1.2.0'
      }
    };

    this.composeWith(require.resolve('generator-npm-init/app'), options);

    this.composeWith(require.resolve('generator-git-init'));

    this.composeWith('semios-lambda-template:git', { gitrepo: this.gitrepo });

    this.installDependencies({
      bower: false,
    });

  }
};
