import { MessageBuilder } from '../shared/message';

const APP_ID = 1000017;
const messageBuilder = new MessageBuilder({ appId: APP_ID });

AppSideService({
  onInit() {
    messageBuilder.listen(() => {});
  },
  onRun() {},
  onDestroy() {}
});
