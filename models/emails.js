let transporter = require('../config/mail.js')

const activateUserAccount = async (params) => {

    console.log(params)
    await transporter.sendMail({    

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

module.exports = {
    activateUserAccount
}