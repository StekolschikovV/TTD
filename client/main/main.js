DBtasks = new Ground.Collection(null)
DBstatistik = new Ground.Collection('statistik')

Router.configure({ layoutTemplate: 'main' });
Router.route('/', function () { this.render( 'list' ) });
Router.route('/settings', function () { this.render( 'settings' ) });
Router.route('/statistik', function () { this.render( 'statistik' ) });

// DONE: fix sort save
// DONE: add field in DBhistory (date, completeTask, workedTime, breakTime)
// DONE: to bind events to DBhistory
// DONE: show statistics data
// DONE: statistik date to human-readable format
// DONE: add statistik style
// ...
// ...

