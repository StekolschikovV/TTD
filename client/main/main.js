import { Mongo } from 'meteor/mongo'

Meteor.startup(function() {
    DBtasks = new Ground.Collection(null)
    Details = new Ground.Collection("details");
    Details.insert({ "title": '111' })


    Router.configure({ layoutTemplate: 'main' });
    Router.route('/', function () { this.render( 'list' ) });
    Router.route('/settings', function () { this.render( 'settings' ) });
    Router.route('/statistik', function () { this.render( 'statistik' ) });


})



