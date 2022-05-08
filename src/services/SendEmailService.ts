import path from 'path';
import fs from 'fs';

import MailProvider from '@shared/container/providers/MailProvider';

interface IRequest {
  to: {
    email: string;
    name: string;
  };
  subject: string;
  emailFile: string;
  variables: any;
}

export default class SendEmailService {
  private mailProvider = new MailProvider();

  public async execute({ to, subject, emailFile, variables }: IRequest) {
    const templateFile = path.resolve(
      __dirname,
      '..',
      'views',
      `${emailFile}.hbs`,
    );

    const fileExists = fs.existsSync(templateFile);
    if (fileExists) {
      await this.mailProvider.sendMail({
        to,
        subject,
        templateData: {
          file: templateFile,
          variables,
        },
      });
    }
  }
}
