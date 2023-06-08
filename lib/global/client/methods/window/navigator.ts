export default function navigator(self: Window | any) {
    if ('serviceWorker' in self.navigator) {
        self.__dynamic.sw = self.navigator.serviceWorker;

        delete self.navigator.serviceWorker;
        delete self.Navigator.prototype.serviceWorker;
    }

    self.navigator.sendBeacon = self.__dynamic.wrap(self.navigator.sendBeacon,
        function(this: Navigator, target: Function, ...args: Array<string>) {
            if (args[0]) {
                args[0] = self.__dynamic.url.encode(args[0], self.__dynamic.meta);
            }

            return Reflect.apply(target, this, args) as boolean;
        }
    );

    /*if (self.navigator.getUserMedia) {
        self.navigator.getUserMedia = self.__dynamic.wrap(self.navigator.getUserMedia,
            function(this: MediaDevices, target: Function, ...args: Array<MediaStreamConstraints>) {
                console.log(args);

                return Reflect.apply(target, this, args) as Promise<MediaStream>;
            }
        );

        self.navigator.webkitGetUserMedia = self.navigator.getUserMedia;
    }*/
}