import * as SocketIO from 'socket.io-client';

class Socket {
    private _socket: SocketIOClient.Socket = null;

    init() {
        this._socket = SocketIO('http://10.17.0.180:3000',);

        this._attachEventListners();
    }

    private _attachEventListners() {

        this._socket.on('handshake', (payload: any) => console.log('handshake: ', payload))

        this._socket.on('connect_error', (error: {}) => {
            console.log('SocketIO error (probably the server is not running): \n', error);
            this._socket.close();
        })

    }
}

export default new Socket();