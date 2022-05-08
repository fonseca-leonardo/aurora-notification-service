import SendEmailService from '@services/SendEmailService';
import IQueueConsumer from '@shared/container/providers/QueueProvider/models/IQueueConsumer';

const appConsumers: Array<IQueueConsumer> = [
  {
    topic: 'send-email',
    func: async value => {
      const json = value?.toString();

      if (json) {
        const { to, subject, emailFile, variables } = JSON.parse(json);

        const sendEmail = new SendEmailService();

        await sendEmail.execute({ to, subject, emailFile, variables });
      }
    },
  },
];

export default appConsumers;
