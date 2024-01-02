let transporter = require('../config/mail.js')

const activateUserAccount = async (params) => 
{

    await transporter.sendMail(
    {    

        from: '"CONEXPRO" <contacto@conexproenlinea.com>',
        to: params.email,
        subject: "🥳 Activa tu cuenta!",
        html: `
              <h2>¡Gracias por registrarte! 🎉</h2>
              <p>Para activar tu cuenta haga click en el enlace a continuación, si no es así, ignore este mensaje.</p>
              <a href="`+params.url+ `" class="btn">Activar mi cuenta</a>
              `

    });

}

const recoverUserPassword = async (params) => 
{

    await transporter.sendMail(
    {    

        from: '"CONEXPRO" <contacto@conexproenlinea.com>',
        to: params.email,
        subject: "🔓 Aquí tienes tu contraseña!",
        html: `
              <h2>¡Aquí tienes tu contraseña!</h2>
              <p>Porque solicitastes recuperar tu contraseña te ha llegado este correo.</p>
              <p class="password" style="color:#091F40; font-size: 35px; font-weight: bold; margin-top: 10px;">`+params.password+`</p>
              `

    });

}

module.exports = {
    activateUserAccount,
    recoverUserPassword
}