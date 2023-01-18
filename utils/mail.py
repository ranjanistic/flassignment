from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from app.config import Env


def sendEmail(to, subject, message, apikey=None, fromMail=None):
    message = Mail(
        from_email=(fromMail or Env["MAIL_FROM"]),
        to_emails=to,
        subject=subject,
        html_content=message)
    try:
        sg = SendGridAPIClient(apikey or Env['SENDGRID_API_KEY'])
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return response.headers
    except Exception as e:
        print(str(e))
        return False
