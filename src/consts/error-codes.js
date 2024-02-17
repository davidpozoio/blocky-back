/// E1XXX ARE ERRORs OF DATABASE
/// E2xxx ARE AUTH ERRORS

const ERROR_CODES = {
  E1000: {
    CODE: "E1000",
    MESSAGE: "it can't update a note that is deleting",
  },
  E1002: {
    CODE: "E1002",
    MESSAGE: "note id doesn't exist",
  },
  E1003: {
    CODE: "E1003",
    MESSAGE: "note not found",
  },
  E2000: {
    CODE: "E2000",
    MESSAGE: "the username is incorrect",
  },
  E2001: {
    CODE: "E2001",
    MESSAGE: "the password is incorrect",
  },
  E2002: {
    CODE: "E2002",
    MESSAGE: "the username is already taken",
  },
  E2003: {
    CODE: "2003",
    MESSAGE: "jwt not provided",
  },
};

module.exports = ERROR_CODES;
