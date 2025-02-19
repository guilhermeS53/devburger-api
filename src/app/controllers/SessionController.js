import * as Yup from "yup";

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const isValid = await schema.isValid(req.body);

    const emailOrPasswordIncorrect = () =>
      res
        .status(401)
        .json({ error: "Make sure you have a valid email and password" });

    if (!isValid) {
      return emailOrPasswordIncorrect();
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return emailOrPasswordIncorrect();
    }

    const isSamePassword = await user.checkPassword(password);

    if (!isSamePassword) {
      return emailOrPasswordIncorrect();
    }

    return res.json({
      id: user.id,
      name: user.name,
      email: email,
      admin: user.admin,
    });
  }
}

export default new SessionController();
