var Generator = require('yeoman-generator');

module.exports = class extends Generator {

  prompting() {

    // check if the current directory is git
    // if not, don't crash, just log a message
    // we check if isGit by trying to read the config file in .git folder
    var isGit = Boolean(`${this.destinationRoot()}/.git/config`);
    var done;

    if (isGit) {

      done = this.async();
      this.spawnCommandSync('git', ['remote', 'add', 'origin',
        this.options.gitrepo]);
      console.log('Git remote added!');
      done();

    }
    else {

      console.log('Not a git repo, can\'t add a remote.');
      console.log('Please "git init" first.');

    }

  }

};
