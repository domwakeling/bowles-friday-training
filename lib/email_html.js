export const htmlBody = (rooturl, token) => (
  `<!DOCTYPE html
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bowles Email</title>

    </head>

    <body style="margin:0;background-color:#f7f9ff;color:#111111;font-family:sans-serif;">
        <center class="wrapper" style="width:100%;table-layout:fixed;background-color:#f7f9ff;padding-bottom:60px;">
            <table class="main" width="100%"
                style="background-color:#ffffff;margin:0 auto;width:100%;max-width:600px;border-spacing:0;">
                <!-- TOP BORDER -->
                <tr>
                    <td height="8" style="padding:0;background-color: #394C8F;"></td>
                </tr>
                <!-- LOGO SECTION -->
                <tr>
                    <td style="padding:0;">
                        <table class="column" width="100%" style="border-spacing:0;padding-left:8px;padding-right:8px;">
                            <tr>
                                <td width="60px" style="padding:0;">
                                    <img width="50px" height="50px" alt="Bowles Ski Racing Club logo"
                                        src="http://bowles-friday-training.vercel.app/bowles_colour_120.png"
                                        style="border:0;">
                                </td>
                                <td style="padding:0;">
                                    <h1 style="font-size: 24px; padding-top: 20px">Bowles Ski Racing Club</h1>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- BODY SECTION -->
                <tr>
                    <td style="padding:0;">
                        <table class="column" style="border-spacing:0;padding-left:8px;padding-right:8px;">
                            <tr>
                                <td style="padding:0;">
                                    <h2 style="font-size: 20px;">
                                        Password reset request
                                    </h2>
                                </td>
                            </tr>
                            <tr>
                                <td class="row" style="padding:0;padding-bottom:16px;">
                                    There has been a request to reset your password for the Bowles Ski
                                    Racing Club's training booking app.
                                </td>
                            </tr>
                            <tr>
                                <td class="row" style="padding:0;padding-bottom:16px;">
                                    Please click on <a href="${rooturl}/forget-password/${token}">this link</a> to reset your password.
                                </td>
                            </tr>
                            <tr>
                                <td class="row" style="padding:0;padding-bottom:16px;">
                                    If you did not request a password reset, please contact Dom Wakeling.
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- FOOTER SECTION -->
                <tr class="footer" style="background-color:#394C8F;color:white;width:100%;text-align:center;">
                    <td style="padding:0;padding-top: 16px; padding-bottom: 8px;">
                        <table width="100%" style="border-spacing:0;">
                            <tr>
                                <td class="row" style="padding:0;padding-bottom:16px;text-align: center; color: white;">
                                    BOWLES SKI RACING CLUB</td>
                            </tr>
                            <tr>
                                <td style="padding:0;">
                                    <table style="border-spacing:0;width: 91x; margin: 0 auto;">
                                        <tr>
                                            <td style="padding:0;">
                                                <a href="https://www.instagram.com/bowlesskiracingclub/">
                                                    <img width="30px" alt="Bowles instagram"
                                                        src="http://bowles-friday-training.vercel.app/white-instagram.png"
                                                        style="border:0;">
                                                </a>
                                                <a href="https://www.facebook.com/groups/82476572419">
                                                    <img width="30px" alt="Bowles facebook"
                                                        src="http://bowles-friday-training.vercel.app/white-facebook.png"
                                                        style="border:0;">
                                                </a>
                                                <a href="https://twitter.com/BowlesSkiRacing">
                                                    <img width="30px" alt="Bowles twitter"
                                                        src="http://bowles-friday-training.vercel.app/white-twitter.png"
                                                        style="border:0;">
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </center>
    </body>
    </html>`
);

export const textBody = (rooturl, token) => (
  `There has been a request to reset your password for the Bowles Ski Racing Club's training booking app.\n\n
    Please click on <a href="${rooturl}/forget-password/${token}">this link</a> to reset your password.\n\n
    If you did not request a password reset, please contact Dom Wakeling.`
);
