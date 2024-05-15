import nodemailer from 'nodemailer';

const sendingMail = async (to: string, link: string): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'bizmailer24@gmail.com',
      pass: 'rimzqfyxutxdpsdn'
    }
  });

  try {
    const info = await transporter.sendMail({
      from: { name: 'AquaTerra', address: 'bizmailer24@gmail.com' },
      to: to,
      subject: `Активація акаунту в інтернет-магазині AquaTerra`,
      text: '',
      html: `
            <table width="800px">
            <tr>
                <td>
                    <img src="https://aqua-terra.vercel.app/assets/logo-xsY7A0fZ.png" alt="Логотип" width="100">
                </td>
                <td width="180px" style="width:180px; text-align:right"> 
                    <h2>+38 (050) 174 70 15</h2>
                </td>
            </tr>

            <tr>
                <td width="100%" colspan="2" style="border-bottom:3px solid #737373"></td>
            </tr>

            <tr>
              <td colspan="2" style="padding-bottom:25px">
                <h2>Для активації облікового запису в інтернет-магазині AquaTerra перейдіть за посиланням:</h2>
                <a href='${link}'>${link}</a>
              </td>
            </tr>

            <tr>
                <td width="100%" colspan="2" style="height:92px;border-top:1px solid #737373;">
                    <p>+38 (050) 174 70 15</p>
                </td>
            </tr>
            </table>
            `
    });
    console.log('info:', info);
  } catch (error) {
    console.error('Error sending activation mail:', error);
  }
};

export default sendingMail;
