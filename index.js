/* Copyright (C) 2015 maaatts
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>. */

var fs = require('fs');
var Long = require('long');
var ProtoBuf = require('protobufjs');
var path = require('path');

var builder = ProtoBuf.loadProtoFile(path.resolve(__dirname, 'bitmmo.proto'))

var messages = [
    { id: 1, name: 'ServerGreeting', message: null},
    { id: 2, name: 'Chat', message: null},
    { id: 3, name: 'Move', message: null},
    { id: 4, name: 'Login', message: null},
    { id: 5, name: 'LoginReply', message: null},
    { id: 6, name: 'PlayerInfo', message: null},
    { id: 7, name: 'AttachedItem', message: null},
];

messages.forEach(function(item) {
    item['message'] = builder.build(item['name']);
});

module.exports = {
    parseMessage: function(id, size, buffer) {
        try {
            var x = messages[id - 1];
            if (x != null) {
                return x['message'].decode(buffer);
            } else {
                console.log("I don't know what #%d is!", id);
                return null;
            }
        } catch (ex) {
    	    console.log("#%d : %s", id, ex.toString());
    	    console.log(buffer);
        	return null;
        }
    },
    messages: messages,
}
