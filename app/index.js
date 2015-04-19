'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the sensational ' + chalk.red('Leetcode') + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'problemName',
            message: 'Enter the name of LeetCode problem',
            default: 'My LeetCode problem'
        }, {
            type: 'confirm',
            name: 'addSpecs',
            message: 'Would you want to add some initial specs?',
            default: false
        }];

        this.prompt(prompts, function (props) {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        }.bind(this));
    },

    writing: {
        files: function () {
            this.mkdir(this.destinationPath('solutions/' + this.props.problemName));
            var testDestinationPath = _.template(this.destinationPath('solutions/<%= problemName %>/<%= problemName %>.json'));
            var solutionDestinationPath = _.template(this.destinationPath('solutions/<%= problemName %>/<%= problemName %>.js'));
            this.template(
                this.templatePath('_test.json'),
                testDestinationPath({problemName: this.props.problemName}),
                {
                    specs: [],
                    entryPoint: ''
                }
            );
            this.template(
                this.templatePath('_solution.js'),
                solutionDestinationPath({problemName: this.props.problemName})
            )
        }
    },

    install: function () {
        //this.installDependencies();
    }
});
