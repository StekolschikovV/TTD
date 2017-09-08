DBtasks = new Ground.Collection(null)
DBstatistik = new Ground.Collection('statistik')

Router.configure({ layoutTemplate: 'main' });
Router.route('/', function () { this.render( 'list' ) });
Router.route('/settings', function () { this.render( 'settings' ) });
Router.route('/statistik', function () { this.render( 'statistik' ) });

// DONE: fix sort save
// TODO: add field in DBhistory (date, completeTask, workedTime, breakTime)
// TODO: to bind events to DBhistory
// TODO: display data statistics
