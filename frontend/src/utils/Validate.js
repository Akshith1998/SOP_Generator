export const Validate = (Fields, Values) => {
  const errors = {};
  const email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  for (let obj of Fields) {
    if (obj["name"] === "email") {
      if (Values[obj["name"]] === "") {
        errors.email = "email is required";
      } else if (!email_pattern.test(Values[obj["name"]])) {
        errors.email = "email is not matching";
      }
    } else {
      if (obj["type"] === "text") {
        if (Values[obj["name"]].length < 3) {
          errors.text = "enter atleast three letters";
        }
      } else {
        if (Values[obj["name"]].length < 1) {
          errors.number = "enter atleast one digit";
        }
      }
    }
  }
  return errors;
};
