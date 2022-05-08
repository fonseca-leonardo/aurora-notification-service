import nodemailer, { Transporter } from 'nodemailer';
import MailTemplateProvider from '../MailTemplateProvider';
import ISendMailDTO from './dtos/ISendMailDTO';

export default class MailProvider {
  private client: Transporter;
  private mailtemplateProvider: MailTemplateProvider;

  constructor() {
    this.client = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    this.mailtemplateProvider = new MailTemplateProvider();
  }

  public async sendMail({ to, subject, from, templateData }: ISendMailDTO) {
    await this.client.sendMail({
      from: {
        name: from?.name || 'App Aurora',
        address: from?.email || 'noreply@drenapps.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailtemplateProvider.parse(templateData),
    });
  }
}
