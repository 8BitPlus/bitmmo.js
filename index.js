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

var supportedmessages = ['ServerGreeting', 'Chat', 'Move', 'Login',
                         'LoginReply',];
var messages = {};

supportedmessages.forEach(function(item) {
    messages[item] = builder.build(item);
});

module.exports = {
    parseMessage: function(id, size, buffer) {
        try {
            //TODO: Replace this.
            switch (id) {
            case 1: //ServerGreeting
                return messages['ServerGreeting'].decode(buffer);
            case 2: //Chat
                return messages['Chat'].decode(buffer);
            case 3: //Move
                return messages['Move'].decode(buffer);
            case 4: //Login
                return messages['Login'].decode(buffer);
            case 5: //LoginReply
                return messages['LoginReply'].decode(buffer);
            default:
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
