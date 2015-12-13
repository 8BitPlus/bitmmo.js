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

//TODO: load from protobuf file
messages = [];
messages[1  - 1] = { id:  1, name: 'ServerGreeting', message: null};
messages[2  - 1] = { id:  2, name: 'Chat', message: null};
messages[3  - 1] = { id:  3, name: 'Move', message: null};
messages[4  - 1] = { id:  4, name: 'Login', message: null};
messages[5  - 1] = { id:  5, name: 'LoginReply', message: null};
messages[6  - 1] = { id:  6, name: 'PlayerInfo', message: null};
messages[8  - 1] = { id:  9, name: 'InvAdd', message: null};
messages[33 - 1] = { id: 33, name: 'RegisterRequest', message: null};
messages[34 - 1] = { id: 34, name: 'RegisterSuccess', message: null};
messages[35 - 1] = { id: 35, name: 'ShopRequest', message: null};
messages[36 - 1] = { id: 36, name: 'ShopPage', message: null};
messages[37 - 1] = { id: 37, name: 'UseItem', message: null};
messages[41 - 1] = { id: 41, name: 'Ping', message: null};
messages[42 - 1] = { id: 42, name: 'Stats', message: null};
messages[58 - 1] = { id: 58, name: 'PacketChunk', message: null};


messages.forEach(function(item) {
    if (item != null)
        item['message'] = builder.build(item['name']);
});

module.exports = {
    parseMessage: function(id, size, buffer) {
        try {
            var x = messages[id - 1];
            if (x != null) {
                return x['message'].decode(buffer);
            } else {
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
