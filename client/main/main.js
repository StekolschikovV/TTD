DBtasks = new Ground.Collection(null)

Router.configure({ layoutTemplate: 'main' });
Router.route('/', function () { this.render( 'list' ) });
Router.route('/settings', function () { this.render( 'settings' ) });
Router.route('/statistik', function () { this.render( 'statistik' ) });
