DBtasks = new Ground.Collection(null)
DBstatistik = new Ground.Collection('statistik')

Router.configure({ layoutTemplate: 'main' });
Router.route('/', function () { this.render( 'list' ) });
Router.route('/settings', function () { this.render( 'settings' ) });
Router.route('/statistik', function () { this.render( 'statistik' ) });

// ------------- Primary tasks: -------------
// DONE: fix sort save
// DONE: add field in DBhistory (date, completeTask, workedTime, breakTime)
// DONE: to bind events to DBhistory
// DONE: show statistics data
// DONE: statistik date to human-readable format
// DONE: add statistik style
// TODO: settings (timer sound: on/of, clock ticking sound: on/of, default work time: _25_, default rest time: _5_,)

// ------------- Secondary tasks: -------------
// TODO: fix mobile menu style
// TODO: statistic diagramma
// TODO: style http://www.marinaratimer.com/
// TODO: hide "All tags:" if tags 0
// TODO: add app description
// TODO: add animatin

// ------------- Final tasks: -------------
// TODO: add promo site
// TODO: compile for Win, Mac, Linux
