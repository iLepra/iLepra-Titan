/*global module:false*/
module.exports = function(grunt) {

// Project configuration.
    grunt.initConfig({
        concat: {
            logic: {
                src: [
                    'Resources/html/js/templates.js',
                    'Resources/html/js/main.js', 
                    'Resources/html/js/counters.js', 
                    'Resources/html/js/handlers.js',
                    'Resources/html/js/mystuff.js', 
                    'Resources/html/js/inbox.js', 
                    'Resources/html/js/posts.js', 
                    'Resources/html/js/comments.js',
                    'Resources/html/js/more.js', 
                    'Resources/html/js/favs.js', 
                    'Resources/html/js/profile.js', 
                    'Resources/html/js/subs.js', 
                    'Resources/html/js/gov.js', 
                    'Resources/html/js/chat.js'],
                dest: 'Resources/html/js/logic.concat.js'
            }
        },
        min: {
            logic: {
                src: ['Resources/html/js/logic.concat.js'],
                dest: 'Resources/html/js/logic.min.js'
            }
        },
        uglify: {
            mangle: {toplevel: false},
            squeeze: {dead_code: false}
        }
    });

// Default task.
    grunt.registerTask('default', 'concat min');

};