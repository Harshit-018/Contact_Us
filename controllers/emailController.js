const resend = require("resend");

exports.sendEmail = async (req, res) => {
  const resendy = new resend.Resend(process.env.RESEND_API_KEY);

  const { name, from, to, email, company, message } = req.body;

  try {
    const data = await resendy.emails.send({
      from: "onboarding@resend.dev",
      to: "agrahariharshit07@gmail.com",
      subject: "Contact Us",
      html: `<p>Name: ${name}<br> Email Address: ${email}<br> Company Name: ${company}<br> Message: ${message}</p>`,
      tags: [
        {
          name: "category",
          value: "confirm_email",
        },
      ],
    });

    if (data.statusCode) {
      const { message } = { ...data };
      throw new Error(message);
    }

    res.status(200).json({
      status: "success",
      success: true,
      data: {
        emailRef: data,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message || "Something went wrong",
    });
  }
};
