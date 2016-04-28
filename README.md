magnet-vorpal
===========

### Usage
Basic
command.js
```
import magnet from 'magnet-core';
import Config from 'magnet-config';
import Logger from 'magnet-bunyan';
import Vorpal from 'magnet-vorpal';

let app = await magnet([
  [Koa, Config],
  Logger,
  Vorpal
]);
```
server/commands/test.js
```
export default {
  description: 'Description of your awesome command',
  options: [
    ['-o, --option <option>', 'Option to pass in'],
  ],
  async action({ log }, args) {
    try {
      const option = args.options.option || {};

      log.info('Do something I\'m giving up on you.');
    } catch (err) {
      log.error(err);
      throw err;
    }
  }
};
```
`node command.js`

`test -o 'yo'`
