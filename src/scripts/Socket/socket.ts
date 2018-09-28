import * as SocketIO from 'socket.io-client';

class Socket {
    private _socket: SocketIOClient.Socket = null;

    init() {
        this._socket = SocketIO('http://10.17.0.180:3000');
    }
}

export default new Socket();