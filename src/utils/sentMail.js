const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

export const sendMail = (toMail) => {
    const msg = {
        to: toMail,
        from: 'priyankamurkute25@gmail.com',
        subject: 'Testing Send mail',
        text: 'This is Text Message',
        html: '<strong>This is HTML</strong>',
      };
      sgMail.send(msg);
}

