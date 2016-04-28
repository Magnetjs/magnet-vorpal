import Base from 'magnet-core/dist/base';
import Vorpal from 'vorpal';
import path from 'path';
import requireAll from 'require-all';
import isEmpty from 'lodash/isEmpty';
import defaultConfig from './config/vorpal';

export default class VorpalMagnet extends Base {
  async setup() {
    this.app.vorpal = Vorpal();

    const folderPath = path.resolve(
      process.cwd(),
      this.config.commandPath || 'server/commands'
    );

    const commands = requireAll(folderPath);

    for (const key of Object.keys(commands)) {
      if (!isEmpty(commands[key]) && commands[key].default) {
        commands[key] = commands[key].default;
        const name = commands[key].command || key;

        // Apply vorpal config
        // https://github.com/dthree/vorpal/wiki/api-%7C-vorpal.command#api
        let command = this.app.vorpal.command(name);

        if (commands[key].options) {
          for (let option of commands[key].options) {
            command.option.apply(command, option);
          }
        }

        let commonCommands = [
          'alias',
          'autocomplete',
          'description',
          'help',
          'hidden',
          'types',
          'validate',
        ];
        for (const commonCommand of commonCommands) {
          if (commands[key][commonCommand]) {
            command[commonCommand](commands[key][commonCommand]);
          }
        }

        let functionCommands = ['action', 'cancel'];
        for (const functionCommand of functionCommands) {
          if (commands[key][functionCommand]) {
            command[functionCommand](async (args) => {
              return await commands[key][functionCommand].call(this, this.app, args);
            });
          }
        }
      }
    }
  }

  async start() {
    this.app.vorpal
      .delimiter('$')
      .show();
  }
}
