import nodemailer from "nodemailer";

export const registrationEmail = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "GMAIL",
      port: process.env.GMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.MAILPASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Registration Successful",
      html: `<h2>Dear ${firstName} ${lastName}</h2>

<h3>Welcome to LMS.</h3>

<p><strong>Here are your registration details:</strong></p>
<ul>
<li>Name: ${firstName} ${lastName}</li>
<li>Email: ${email}</li>
<li>Password:${password}</li>
</ul>

<p>Use this Email & Password for login.</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: "Registration mail send successfully...!",
      data: info,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in send registration mail",
    });
  }
};

export const leaveRequestMail = async (req, res) => {
  const { firstName, lastName, email, startDate, endDate, reason, leaveType } =
    req.body;

  const trasporter = nodemailer.createTransport({
    service: "GMAIL",
    port: process.env.GMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.MAILPASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "Leave Request",
    html: `<h2>You got leave request from ${firstName} ${lastName}</h2>
      <h3>Leave Details</h3>
      <ul>
        <li>Email : ${email}</li>
        <li>Start Date: ${startDate}</li>
        <li>End Date: ${endDate}</li>
        <li>Leave Type: ${leaveType}</li>
        <li>Reason: ${reason}</li>
      </ul> `,
  };
  try {
    const info = await trasporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Leave request sent...", data: info });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error in sending leave request mail" });
  }
};

export const leaveApprovedMail = async (req, res) => {
  const { leaveType, email, startDate, endDate } = req.body;

  const trasporter = nodemailer.createTransport({
    service: "GMAIL",
    port: process.env.GMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.MAILPASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Leave Approved",
    html: `<h4>Your ${leaveType} 
    <p>From</p> 
    <p><strong>"${startDate}"</strong></p>
    <p>To</p> 
    <p><strong>"${endDate}"</strong> is <strong>Approved</p>
    </h4>`,
  };
  try {
    const info = await trasporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: "Leave approved mail sent...",
      data: info,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in sending leave approved mail",
    });
  }
};


export const leaveCanceledMail = async (req, res) => {
  const { leaveType, email, startDate, endDate } = req.body;

  const trasporter = nodemailer.createTransport({
    service: "GMAIL",
    port: process.env.GMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.MAILPASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Leave Canceled",
    html: `<h4>Your ${leaveType} 
    <p>From</p> 
    <p><strong>"${startDate}"</strong></p>
    <p>To</p> 
    <p><strong>"${endDate}"</strong> is <strong>Canceled</p>
    </h4>`,
  };
  try {
    const info = await trasporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: "Leave canceled mail sent...",
      data: info,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in sending leave approved mail",
    });
  }
};


export const cronRunMail = async (req, res) => {

  const trasporter = nodemailer.createTransport({
    service: "GMAIL",
    port: process.env.GMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.MAILPASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "Cron Run",
    html: `<h4>Leave Added</h4>`,
  };
  try {
    const info = await trasporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: "Cron run successfully...!",
      data: info,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in running cron",
    });
  }
};