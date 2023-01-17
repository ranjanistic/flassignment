from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from app.config import Env

def sendEmail(to, subject, message):
    message = Mail(
    from_email=Env["MAIL_FROM"],
    to_emails=to,
    subject=subject,
    html_content=message)
    try:
        sg = SendGridAPIClient(Env['SENDGRID_API_KEY'])
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return response.headers
    except Exception as e:
        print(str(e))
        return False
